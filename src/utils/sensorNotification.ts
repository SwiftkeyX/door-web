import axios from "axios";

export async function sensorNotification(userId: string, message: string, imageUrl: string) {
    try {
        const { data } = await axios.post("/api/notification", { userId, message, imageUrl }, {
            headers: { "Content-Type": "application/json" },
        });

        if (data.success)
            return "Something is near (sent notification to LINE)";
    } catch (error) {
        console.error("Error sending message:", error);
        // return "Failed to send message.";
    }
}
