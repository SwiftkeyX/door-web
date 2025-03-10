import connectMqtt from "@/lib/mqttService";
import { MqttClient } from "mqtt";
import React, { useEffect, useState } from "react";

interface UseMqttClientProps {
    topics?: string[];
}

export function useMqttClient(props?: UseMqttClientProps) {
    const [mqttClient, setMqttClient] = useState<MqttClient | null>(null);

    useEffect(() => {
        const client = connectMqtt(); // Connect MQTT client
        setMqttClient(client); // Save client to state

        client.on("connect", () => {
            console.log("Client-side connected to MQTT broker");

            if (props?.topics) {
                client.subscribe(props.topics);
            }
        });

        return () => {
            if (client) {
                if (props?.topics) {
                    client.unsubscribe(props?.topics);
                }
                client.end();
            }
        };
    }, []);

    return mqttClient;
}
