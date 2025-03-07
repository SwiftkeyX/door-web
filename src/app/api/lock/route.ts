import { Mutex } from "async-mutex";
import { NextRequest, NextResponse } from "next/server";

let lockState = false;
let mutex = new Mutex();

export async function GET(req: NextRequest) {
    // Return the current lockState as JSON
    return NextResponse.json(lockState);
}

export async function POST(req: NextRequest) {
    const release = await mutex.acquire(); // Lock the mutex

    try {
        // Read the body content of the POST request
        const newLockState = await req.text();

        // Validate the request body
        if (newLockState !== "true" && newLockState !== "false") {
            return NextResponse.json(
                { status: "error", message: "Invalid request" },
                { status: 400 }
            );
        }

        // Set the new lockState value based on the request
        lockState = newLockState === "true";

        // Return a success response
        return NextResponse.json({
            status: "success",
        });
    } finally {
        release(); // Release the lock, allowing other requests to acquire the mutex
    }
}
