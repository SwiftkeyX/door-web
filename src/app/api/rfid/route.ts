import { NextRequest, NextResponse } from "next/server";

interface RfidData {
    rfid: string | null;
    updatedAt: Date | null;
}

let latestData: RfidData = {
    rfid: null,
    updatedAt: null,
};

export async function GET() {
    return NextResponse.json(latestData);
}

export async function POST(req: NextRequest) {
    try {
        const rfid = await req.text();
        console.log("Received RFID:", rfid);

        latestData.rfid = rfid;
        latestData.updatedAt = new Date();

        return NextResponse.json({
            status: "success",
        });
    } catch (error) {
        return NextResponse.json(
            { status: "error", message: "Invalid request" },
            { status: 400 }
        );
    }
}
