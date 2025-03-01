import { sensorNotification } from "@/utils/sensorNotification";

export async function ultrasonicSensor() {
    try {
        const response = await fetch("/api/sensor", { method: "GET" });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error fetching distance");
        }

        const distance = data.received;
        console.log(`Distance received: ${distance} cm`);

        if (distance <= 20) {
            const userId = "Ucfe39b482a1f368e86e6852c7ca74832";
            const message = "Something is near!";
            const ans = await sensorNotification(userId, message);
            return ans;
        } 
    } catch (error) {
        console.error("Failed to fetch distance:", error);
        // return "Error fetching distance";
    }
}
