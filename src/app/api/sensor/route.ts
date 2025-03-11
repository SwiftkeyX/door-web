import { NextRequest, NextResponse } from "next/server";
import { canSendNotification } from '@/utils/debounce';

let latestDistance: number | null = null;
let lastNotificationTime = 0;
const DEBOUNCE_DELAY = 60_000;

export async function GET() {
    const now = Date.now();
    const shouldNotify = latestDistance !== null && 
                        latestDistance <= 20 && 
                        now - lastNotificationTime >= DEBOUNCE_DELAY;
    
    if (shouldNotify) {
        lastNotificationTime = now;
        return NextResponse.json({ received: latestDistance, canNotify: true });
    }
    return NextResponse.json({ received: latestDistance ?? "No data yet", canNotify: false });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        latestDistance = body.distance;
        return NextResponse.json({ status: "success", received: latestDistance });
    } catch (error) {
        return NextResponse.json({ status: "error", message: "Invalid request" }, { status: 400 });
    }
}