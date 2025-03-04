import { NextRequest, NextResponse } from "next/server";

let lockState = false;

export async function GET(req: NextRequest) {
    return NextResponse.json(lockState);
}

export async function POST(req: NextRequest) {
    const newLockState = await req.text();

    if (newLockState != "true" && newLockState != "false") {
        return NextResponse.json(
            { status: "error", message: "Invalid request" },
            { status: 400 }
        );
    }

    lockState = newLockState === "true";

    return NextResponse.json({
        status: "success",
    });
}
