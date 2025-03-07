import { Mutex } from "async-mutex";
import { NextRequest, NextResponse } from "next/server";

let openState = false;
let mutex = new Mutex();

export async function GET(req: NextRequest) {
    // Return the current openState as JSON
    return NextResponse.json(openState);
}

export async function POST(req: NextRequest) {
    const release = await mutex.acquire(); // Lock the mutex

    try {
        // Read the body content of the POST request
        const newOpenState = await req.text();

        // Validate the request body
        if (newOpenState !== "true" && newOpenState !== "false") {
            return NextResponse.json(
                { status: "error", message: "Invalid request" },
                { status: 400 }
            );
        }

        // Set the new openState value based on the request
        openState = newOpenState === "true";

        // Return a success response
        return NextResponse.json({
            status: "success",
        });
    } finally {
        release(); // Release the lock, allowing other requests to acquire the mutex
    }
}
