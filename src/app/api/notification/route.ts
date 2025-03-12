import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;

export async function POST(req: NextRequest) {
    try {
        const { userId, message, imageUrl } = await req.json();

        if (!userId || (!message && !imageUrl)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing userId, message, or imageUrl",
                },
                { status: 400 }
            );
        }

        const url = "https://api.line.me/v2/bot/message/push";
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
        };

        const body: any = {
            to: userId,
            messages: [],
        };

        if (message) {
            body.messages.push({ type: "text", text: message });
        }

        if (imageUrl) {
            // Use the image URL as the original content URL and preview image URL
            body.messages.push({
                type: "image",
                originalContentUrl: imageUrl,
                previewImageUrl: imageUrl,
            });
        }

        const response = await axios.post(url, body, { headers });

        return NextResponse.json({
            success: true,
            data: response.data || "Message sent successfully",
        });
    } catch (error: any) {
        console.error("LINE API Error:", error.response?.data || error.message);
        return NextResponse.json(
            { success: false, error: error.response?.data || "Unknown error" },
            { status: 500 }
        );
    }
}
