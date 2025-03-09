// lib/mqttService.ts (update)
import mqtt, { MqttClient } from "mqtt";

const connectMqtt = () => {
    const options = {
        clientId: process.env.NEXT_PUBLIC_MQTT_CLIENTID,
        username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
        password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
        reconnectPeriod: 1000,
    };

    const client: MqttClient = mqtt.connect(
        process.env.NEXT_PUBLIC_MQTT_URI as string,
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
