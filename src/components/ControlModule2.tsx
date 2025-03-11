"use client";

import { useMqttClient } from "@/utils/useMqttClient";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function ControlModule2() {
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const [isWaitingForResponse, setIsWaitingForResponse] =
        useState<boolean>(false);

    const [isDoorOpen, setIsDoorOpen] = useState<boolean | null>(null);
    const [isLocked, setIsLocked] = useState<boolean | null>(null);

    const mqttClient = useMqttClient({
        topics: ["status", "door/status/res", "lock/status/res"],
    });

    function ping() {
        if (mqttClient == null) return;
        if (isWaitingForResponse) return;

        mqttClient.publish("status", "ping");
        setIsWaitingForResponse(true);
        console.log("Waiting for response from board...");

        setTimeout(() => {
            if (isWaitingForResponse) {
                console.log("No response");
                setIsOnline(false);
                setIsWaitingForResponse(false);
            }
        }, 5000);
    }

    function handleDoor() {
        if (isDoorOpen == null) return;

        if (isLocked) {
            return;
        }

        mqttClient?.publish("door", !isDoorOpen ? "true" : "false");
        if (isDoorOpen) {
            toast.success("Successfully closed door!");
        } else {
            toast.success("Successfully opened door!");
        }
    }

    function handleLock() {
        if (isLocked == null) return;

        if (isDoorOpen) {
            return;
        }

        mqttClient?.publish("lock", !isLocked ? "true" : "false");
        if (isLocked) {
            toast.success("Successfully unlocked door!");
        } else {
            toast.success("Successfully locked door!");
        }
    }

    useEffect(() => {
        if (mqttClient == null) return;

        mqttClient.on("message", (topic, msg) => {
            const message = String(msg);
            switch (topic) {
                case "status": {
                    console.log(message);
                    if (message == "online") {
                        setIsOnline(true);
                        setIsWaitingForResponse(false);
                        console.log("Board responded");
                    }
                    break;
                }
                case "door/status/res": {
                    if (message == "true") {
                        setIsDoorOpen(true);
                    } else if (message == "false") {
                        setIsDoorOpen(false);
                    }
                    break;
                }
                case "lock/status/res": {
                    if (message == "true") {
                        setIsLocked(true);
                    } else if (message == "false") {
                        setIsLocked(false);
                    }
                    break;
                }
            }
        });

        ping();
        mqttClient.publish("door/status/req", "ping");
        mqttClient.publish("lock/status/req", "ping");

        const pingInterval = setInterval(ping, 20000);

        return () => {
            clearInterval(pingInterval);
        };
    }, [mqttClient]);

    return (
        <div className="flex flex-col gap-y-2">
            <Toaster position="bottom-right" />

            <div className="bg-[#f3f3f3] p-4 rounded-2xl text-xl grid grid-cols-2">
                Board Status:{" "}
                <div className="flex justify-end px-2">
                    {isOnline ? (
                        <div className="font-bold text-green-600 flex flex-row items-center gap-x-2">
                            <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                            Online
                        </div>
                    ) : (
                        <div className="font-bold text-red-700 flex flex-row items-center gap-x-2">
                            <div className="w-4 h-4 bg-red-700 rounded-full"></div>
                            Offline
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-[#f3f3f3] p-4 rounded-2xl">
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_130px] gap-y-2">
                    <div className="">
                        <div className="text-2xl font-bold mb-1">
                            Door Status
                        </div>

                        <div className="grid grid-cols-[75px_1fr] text-xl">
                            <div>Status:</div>
                            <div
                                className={clsx("font-bold", {
                                    "text-green-700": isDoorOpen == true,
                                    "text-red-800": isDoorOpen == false,
                                    "text-gray-400": isDoorOpen == null,
                                })}
                            >
                                {isDoorOpen == true
                                    ? "Open"
                                    : isDoorOpen == false
                                    ? "Closed"
                                    : "Unknown"}
                            </div>
                        </div>

                        <div className="grid grid-cols-[75px_1fr] text-xl">
                            <div>Lock:</div>
                            <div
                                className={clsx("font-bold", {
                                    "text-green-700": isLocked == true,
                                    "text-red-800": isLocked == false,
                                    "text-gray-400": isLocked == null,
                                })}
                            >
                                {isLocked == true
                                    ? "Locked"
                                    : isLocked == false
                                    ? "Unlocked"
                                    : "Unknown"}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row md:flex-col items-center justify-center gap-y-1 gap-x-2">
                        <button
                            disabled={isDoorOpen == null || isLocked == true}
                            onClick={() => handleDoor()}
                            className={clsx(
                                "rounded-xl text-white text-2xl font-bold w-full h-[40px]",
                                {
                                    "bg-green-700 cursor-pointer":
                                        isDoorOpen == false &&
                                        isLocked == false,
                                    "bg-red-800 cursor-pointer":
                                        isDoorOpen == true && isLocked == false,
                                    "bg-gray-300 cursor-default":
                                        isDoorOpen == null || isLocked,
                                }
                            )}
                        >
                            {isDoorOpen
                                ? "CLOSE"
                                : isDoorOpen == false
                                ? "OPEN"
                                : "-"}
                        </button>
                        <button
                            disabled={isLocked == null || isDoorOpen == true}
                            onClick={() => handleLock()}
                            className={clsx(
                                "rounded-xl text-white text-2xl font-bold w-full h-[40px]",
                                {
                                    "bg-gray-300 cursor-default":
                                        isLocked == null || isDoorOpen,
                                    "bg-green-700 cursor-pointer":
                                        isLocked == false &&
                                        isDoorOpen == false,
                                    "bg-red-800 cursor-pointer":
                                        isLocked == true && isDoorOpen == false,
                                }
                            )}
                        >
                            {isLocked
                                ? "UNLOCK"
                                : isLocked == false
                                ? "LOCK"
                                : "-"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ControlModule2;
