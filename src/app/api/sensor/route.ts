import { NextRequest, NextResponse } from "next/server";

let latestDistance: number | null = null; // Store the last received distance

export async function GET() {
    // Ensure we return a valid JSON response, even if no data is available
    return NextResponse.json({ received: latestDistance ?? "No data yet" });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Received distance:", body.distance);

        latestDistance = body.distance; // Store the received distance

        return NextResponse.json({ status: "success", received: latestDistance });
    } catch (error) {
        return NextResponse.json({ status: "error", message: "Invalid request" }, { status: 400 });
    }
}