"use client";

import { useState, useEffect } from "react";
import { ultrasonicSensor } from "@/utils/ultrasonicSensor";
import { ultrasonicLog } from "@/utils/ultrasonicLog";

export default function LogHistory() {
    const [logs, setLogs] = useState<
        { time: string; message: string; pet_name: string }[]
    >([]);
    const [isCooldown, setIsCooldown] = useState(false);

    // GET LOG HISTORY
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await fetch("/api/logs");
                const data = await res.json();
                console.log("dataaaaaaa", data);
                if (typeof data === "object" && !Array.isArray(data)) {
                    setLogs([]); // If `data` is an object (and not an array), set logs to an empty array
                } else {
                    setLogs(data); // Otherwise, set logs to `data`
                }
                console.log("success in fetch data from database", data);
            } catch (error) {
                console.error("Failed to fetch logs:", error);
            }
        };

        fetchLogs();
    }, []);

    // SAVE LOG FROM ULTRASONIC SENSOR
    useEffect(() => {
        const logFunction = async () => {
            if (isCooldown) return;

            try {
                const ultrasoicDetect = await ultrasonicSensor();
                if (
                    ultrasoicDetect ===
                    "Something is near (sent notification to LINE)"
                ) {
                    const newLog = await ultrasonicLog();
                    setLogs((prevLogs) => [newLog, ...prevLogs]);
                    setIsCooldown(true);
                    setTimeout(() => setIsCooldown(false), 1_000); //1วินาที
                }
            } catch (error) {
                console.error("Failed to fetch distance:", error);
            }
        };

        const interval = setInterval(logFunction, 1000);
        return () => clearInterval(interval);
    }, [isCooldown]);

    console.log(`logssssssssssssss`, logs);
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Detection Log</h2>
            <div className="w-full h-[200px] overflow-y-auto rounded-2xl text-lg bg-[#f3f3f3] p-2">
                {/* <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Time</th>
                        <th className="border p-2">Message</th>
                    </tr>
                </thead> */}
                {logs.length === 0 ? (
                    <ul>
                        <span className=" p-2 text-center">
                            No detections yet
                        </span>
                    </ul>
                ) : (
                    logs &&
                    logs.map((log, index) => (
                        <ul key={index} className=" p-[0.05rem]">
                            <span className="font-[700] p-2">
                                {log.time
                                    ? new Date(log.time).toLocaleString()
                                    : "N/A"}
                            </span>
                            {/* <td className="border p-2">{log.pet_name="DefaultPet"? "" : log.pet_name}</td> */}
                            {log.pet_name && log.pet_name === "DefaultPet" ? (
                                ""
                            ) : (
                                <span>{log.pet_name}</span>
                            )}
                            <span className=" p-2">{log.message}</span>
                        </ul>
                    ))
                )}
            </div>
        </div>
    );
}
