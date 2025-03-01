"use client";

import { useState, useEffect } from "react";
import { ultrasonicSensor } from "@/utils/ultrasonicSensor";

export default function LogHistory() {
    const [logs, setLogs] = useState<{ time: string; message: string }[]>([]);

    useEffect(() => {
        const logFunction = async () => {
            try {
                const ultrasoicDetect = await ultrasonicSensor();
                console.log("log", logs);

                if (ultrasoicDetect && ultrasoicDetect == "Something is near (sent notification to LINE)") {
                    const newLog = {
                        time: new Date().toLocaleTimeString(),
                        message: "Something is near!",
                    };

                    setLogs((prevLogs) => [newLog, ...prevLogs]); // Add new log at the top
                }
            } catch (error) {
                console.error("Failed to fetch distance:", error);
            }
        };

        logFunction();
        const interval = setInterval(logFunction, 1000); // Check every second

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Detection Log</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Time</th>
                        <th className="border p-2">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.length === 0 ? (
                        <tr>
                            <td className="border p-2 text-center" colSpan={2}>
                                No detections yet
                            </td>
                        </tr>
                    ) : (
                        logs.map((log, index) => (
                            <tr key={index} className="border">
                                <td className="border p-2">{log.time}</td>
                                <td className="border p-2">{log.message}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
