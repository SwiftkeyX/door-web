"use client";

import React, { useState, useEffect } from "react";
import { closeLock } from "@/utils/closeLock";
import { getLockStatus } from "@/utils/getLockStatus";
import { getDoorStatus } from "@/utils/getDoorStatus";
import { closeDoor } from "@/utils/closeDoor";
import { MqttClient } from "mqtt";
import connectMqtt from "@/lib/mqttService";

const ControlModule = () => {
    const [isLocked, setIsLocked] = useState<boolean | null>(null);
    const [isDoor, setIsDoor] = useState<boolean | null>(null);
    const [mqttClient, setMqttClient] = useState<MqttClient | null>(null); // Store mqtt client

    useEffect(() => {
        const fetchStatus = async () => {
            const status = await getLockStatus();
            const doorStatus = await getDoorStatus();
            setIsDoor(doorStatus);
            setIsLocked(status);
        };
        fetchStatus();

        const client = connectMqtt(); // Connect MQTT client
        setMqttClient(client); // Save client to state

        client.on("connect", () => {
            console.log("Client-side connected to MQTT broker");
        });

        // Clean up connection when component unmounts
        return () => {
            if (client) {
                client.end();
            }
        };
    }, []);

    const toggleLock = async () => {
        const newLockState = !isLocked; // สลับสถานะ
        await closeLock(newLockState);
        setIsLocked(newLockState);
        mqttClient?.publish("lock", newLockState ? "true" : "false");
    };

    const toggleDoor = async () => {
        const newLockState = !isDoor; // สลับสถานะ
        await closeDoor(newLockState);
        setIsDoor(newLockState);
        mqttClient?.publish("door", newLockState ? "true" : "false");
    };

    return (
        <div className="bg-amber-200 rounded-2xl p-5 flex justify-between items-center">
            <div>
                <div className="text-[1.2rem] font-bold">Door State</div>
                <div>
                    Currently :{" "}
                    <span>{isLocked ? "LOCKED 🔒" : "UNLOCKED 🔓"}</span>
                </div>
            </div>
            <div className="flex space-x-3">
                <button
                    onClick={toggleLock}
                    className="text-[1.2rem] font-bold bg-green-700 text-white px-3 py-1 rounded-2xl"
                >
                    {isLocked ? "Unlock" : "Lock"}
                </button>
                <button
                    onClick={toggleDoor}
                    className="text-[1.2rem] font-bold bg-green-700 text-white px-3 py-1 rounded-2xl"
                >
                    {isDoor ? "Close" : "Open"}
                </button>
            </div>
        </div>
    );
};

export default ControlModule;
