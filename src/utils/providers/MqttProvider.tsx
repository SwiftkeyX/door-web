"use client";

import connectMqtt from "@/lib/mqttService";
import { MqttClient } from "mqtt";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

interface MqttContextProps {
    client: MqttClient | null;
}

const MqttContext = createContext<MqttContextProps | undefined>(undefined);

interface MqttProviderProps {
    children: ReactNode;
    topics?: string[];
}

export function MqttProvider({ children, topics }: MqttProviderProps) {
    const [client, setClient] = useState<MqttClient | null>(null);

    useEffect(() => {
        const mqttClient = connectMqtt(); // Connect MQTT client
        setClient(mqttClient);

        console.log("MQTT Provider initialized");

        mqttClient.on("connect", () => {
            console.log("MQTT connected");

            if (topics?.length) {
                mqttClient.subscribe(topics);
                console.log("Subscribed to topics:", topics);
            }
        });

        return () => {
            if (mqttClient) {
                if (topics?.length) {
                    mqttClient.unsubscribe(topics);
                    console.log("Unsubscribed from topics:", topics);
                }
                mqttClient.end();
            }
        };
    }, [topics]);

    return (
        <MqttContext.Provider value={{ client }}>
            {children}
        </MqttContext.Provider>
    );
}

export function useMqtt() {
    const context = useContext(MqttContext);
    if (!context) {
        throw new Error("useMqtt must be used within an MqttProvider");
    }
    return context;
}
