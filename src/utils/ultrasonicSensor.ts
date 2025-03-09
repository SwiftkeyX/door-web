import { sensorNotification } from "@/utils/sensorNotification";

export async function ultrasonicSensor() {
    try {
        // Fetch distance data
        const distanceResponse = await fetch("/api/sensor", { method: "GET" });
        if (!distanceResponse.ok) {
            throw new Error("Error fetching distance");
        }
        const distanceData = await distanceResponse.json();
        const distance = distanceData.received;

        console.log(`Distance received: ${distance} cm`);

        if (distance <= 20) {
            // Fetch the latest image
            const imageResponse = await fetch("/api/cam", { method: "GET" });
            if (!imageResponse.ok) {
                throw new Error("Error fetching image");
            }

            // Extract filePath correctly
            const { filePath } = await imageResponse.json();
            console.log(`Image Responseeeeeee: ${imageResponse}`);
            console.log(`Image URL: ${filePath}`);

            const userId = "Ucfe39b482a1f368e86e6852c7ca74832";
            const message = "Something is near!";

            // Send notification with the image URL
            const ans = await sensorNotification(userId, message, filePath);
            return ans;
        }
    } catch (error) {
        console.error("Failed to fetch distance or image:", error);
    }
}
