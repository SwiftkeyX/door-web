"use client";

import React, { useState, useEffect } from "react";
import { closeLock } from "@/utils/closeLock";
import { getLockStatus } from "@/utils/getLockStatus";
import { getDoorStatus } from "@/utils/getDoorStatus";
import { closeDoor } from "@/utils/closeDoor";

const ControlModule = () => {
    const [isLocked, setIsLocked] = useState<boolean | null>(null);
    const [isDoor, setIsDoor] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchStatus = async () => {
            const status = await getLockStatus();
            const doorStatus = await getDoorStatus();
            setIsDoor(doorStatus);
            setIsLocked(status);
        };
        fetchStatus();
    }, []);

    const toggleLock = async () => {
        const newLockState = !isLocked; // สลับสถานะ
        await closeLock(newLockState);
        setIsLocked(newLockState);
    };

    const toggleDoor = async () => {
        const newLockState = !isDoor; // สลับสถานะ
        await closeDoor(newLockState);
        setIsDoor(newLockState);
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
                    {isDoor ? "Close" : "Door"}
                </button>
            </div>
            
        </div>
    );
};

export default ControlModule;
