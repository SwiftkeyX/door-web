"use client";

import { useMqtt } from "@/utils/providers/MqttProvider";
import {
    DoorLogWithPet,
    useDoorLogQueries,
} from "@/utils/query/useDoorLogQueries";
import React, { useEffect } from "react";

function DoorLogHistory() {
    const { doorLogs, fetchDoorLogs } = useDoorLogQueries();
    const { client } = useMqtt();

    useEffect(() => {
        if (client == null) return;
        client.on("message", (topic, msg) => {
            const message = String(msg);

            if (topic == "log/door") {
                if (message == "update") {
                    console.log("update");
                    fetchDoorLogs();
                }
            }
        });
    }, [client]);

    function processLog(log: DoorLogWithPet) {
        if (log.pet == null) {
            const action = log.rfid_index == 0 ? "enter" : "leave";
            return `${log.uid.toUpperCase()} attempted to ${action}, but it was not allowed to.`;
        } else {
            const action = log.rfid_index == 0 ? "entered" : "left";
            return `${log.pet.pet_name} (${log.uid.toUpperCase()}) ${action}.`;
        }
    }

    useEffect(() => {
        console.log("DOOR LOGS:", doorLogs);
    }, [doorLogs]);

    return (
        <div className="text-lg rounded-2xl bg-[#f3f3f3] px-4 py-2 flex flex-col h-[200px] overflow-y-auto ">
            {doorLogs.length == 0 && "No logs yet"}
            {doorLogs.length > 0 &&
                doorLogs.map((log, i) => (
                    <div key={i} className="grid grid-cols-[240px_1fr]">
                        <span className="font-bold">
                            {log.created_at.toLocaleDateString()},{" "}
                            {log.created_at.toLocaleTimeString()}
                        </span>
                        <span>{processLog(log)}</span>
                    </div>
                ))}
        </div>
    );
}

export default DoorLogHistory;
