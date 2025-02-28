"use client";

import { useState, useEffect } from "react";

export default function DistanceDisplay() {
    const [distance, setDistance] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDistance = async () => {
            try {
                const response = await fetch("/api/sensor", { method: "GET" });
                const data = await response.json();
                
                if (response.ok) {
                    setDistance(data.received);
                } else {
                    console.error("Error fetching distance:", data.message);
                }
            } catch (error) {
                console.error("Failed to fetch distance:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDistance();
        const interval = setInterval(fetchDistance, 1000); // Fetch every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold">Sensor Distance</h1>
            {loading ? (
                <p>Loading...</p>
            ) : distance !== null ? (
                <p className="text-xl">Distance: <strong>{distance} cm</strong></p>
            ) : (
                <p className="text-red-500">No data received</p>
            )}
        </div>
    );
}