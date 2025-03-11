// lib/mqttService.ts (update)
import mqtt, { MqttClient } from "mqtt";

const connectMqtt = () => {
    const options: mqtt.IClientOptions = {
        clientId: `nextjs-client-${Math.random().toString(16).slice(2)}`,
        username: "postman",
        password: "Cia123123",
        keepalive: 60,
        clean: true,
        reconnectPeriod: 1000,
    };

    const client: MqttClient = mqtt.connect(
        "wss://87551fa9e51248908034dbe24e14f5d3.s2.eu.hivemq.cloud:8884/mqtt",
        options
    );

    client.on("connect", () => {
        console.log("Connected to MQTT broker");
    });

    client.on("error", (err) => {
        console.error("MQTT connection error:", err);
        client.end();
    });

    return client;
};

export default connectMqtt;
