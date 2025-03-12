import { sensorNotification } from "@/utils/sensorNotification";

export async function ultrasonicSensor() {
    try {
        const distanceResponse = await fetch("/api/sensor", { method: "GET" });
        if (!distanceResponse.ok) {
            throw new Error("Error fetching distance");
        }
        const distanceData = await distanceResponse.json();
        const { received: distance, canNotify } = distanceData;

        console.log(
            `Distance received: ${distance} cm, Can notify: ${canNotify}`
        );

        if (distance <= 20 && canNotify) {
            const imageResponse = await fetch("/api/cam", { method: "GET" });
            if (!imageResponse.ok) {
                throw new Error("Error fetching image");
            }

            const { filePath } = await imageResponse.json();
            console.log(`Image Response: ${imageResponse}`);
            console.log(`Image URL: ${filePath}`);

            const userId = "Udede1397a0f9a90d80e0c3bd7d7f55d4";
            const message = "Something is near!";

            const ans = await sensorNotification(userId, message, filePath);
            return ans;
        }
        return null;
    } catch (error) {
        console.error("Failed to fetch distance or image:", error);
        return null;
    }
}
