"use client";

import React, { useState, useEffect } from "react";
import { closeLock } from "@/utils/closeLock";
import { getLockStatus } from "@/utils/getLockStatus";

const ControlModule = () => {
    const [isLocked, setIsLocked] = useState<boolean | null>(null);
 
    useEffect(() => {
        const fetchStatus = async () => {
            const status = await getLockStatus();
            if (status !== isLocked) { // อัปเดตเฉพาะเมื่อสถานะเปลี่ยนแปลง
                setIsLocked(status);
            }
        };
    
        fetchStatus();
    
        // ตั้ง interval ในการดึงข้อมูลใหม่หากจำเป็น
        const interval = setInterval(fetchStatus, 2000); // อัปเดตทุก 2 วินาที
    
        return () => clearInterval(interval); // ทำการเคลียร์ interval เมื่อคอมโพเนนต์ถูก unmount
    }, [isLocked]); // เพิ่ม isLocked เป็น dependency

    const toggleLock = async () => {
        console.log("lockkk22222222", isLocked)
        const newLockState = !isLocked; // สลับสถานะ
        await closeLock(newLockState);
        setIsLocked(newLockState);
    };


    return (
        <div className="bg-amber-200 rounded-2xl p-5 flex justify-between items-center">
            <div>
                <div className="text-[1.2rem] font-bold">Door State</div>
                <div>
                    Currently : <span>{isLocked ? "LOCKED 🔒" : "UNLOCKED 🔓"}</span>
                </div>
            </div>
        
            <div className="flex gap-2">
                <button
                    onClick={toggleLock}
                    className="text-[1.2rem] font-bold bg-green-700 text-white px-3 py-1 rounded-2xl"
                >
                    {isLocked ? "Unlock" : "Lock"}
                </button>
            </div>
        </div>
    );
};

export default ControlModule;