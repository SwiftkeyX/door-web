"use client";

import { useEffect, useState } from "react";
import connectMqtt from "@/lib/mqttService";

const Home = () => {
    const [lock, setLock] = useState<boolean>(false); // Set initial value for the lock state
    const [open, setOpen] = useState<boolean>(false); // Set initial value for the door state
    const [mqttClient, setMqttClient] = useState<any>(null); // Store mqtt client

    useEffect(() => {
        console.log("Test in client");

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
    }, []); // Only run once on mount

    const toggleLock = () => {
        setLock((prevLock) => {
            const newLockState = !prevLock;
            if (mqttClient) {
                // Publish the lock state when the button is clicked
                mqttClient.publish("lock", newLockState ? "true" : "false");
            }
            return newLockState;
        });
    };

    const toggleDoor = () => {
        setOpen((prevOpen) => {
            const newDoorState = !prevOpen;
            if (mqttClient) {
                // Publish the door state when the button is clicked
                mqttClient.publish("door", newDoorState ? "true" : "false");
            }
            return newDoorState;
        });
    };

    return (
        <div>
            <h1>Welcome to the MQTT Client</h1>
            <p>Lock is {lock ? "locked" : "unlocked"}</p>
            <button onClick={toggleLock}>{lock ? "Unlock" : "Lock"}</button>

            <p>Door is {open ? "open" : "closed"}</p>
            <button onClick={toggleDoor}>
                {open ? "Close Door" : "Open Door"}
            </button>
        </div>
    );
};

export default Home;
