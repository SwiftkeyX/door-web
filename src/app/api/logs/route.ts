import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { pet_name, message } = await req.json();

        if (!pet_name || !message) {
            return NextResponse.json(
                { error: "pet_name and message are required" },
                { status: 400 }
            );
        }

        const log = await prisma.log.create({
            data: {
                pet_name,
                message,
                time: new Date(), // Ensure `time` is set explicitly
            },
        });

        return NextResponse.json(log);
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json(
            { error: "Failed to save log" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const logs = await prisma.log.findMany({
            orderBy: { time: "desc" },
        });

        return NextResponse.json(logs);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch logs" },
            { status: 500 }
        );
    }
    // fff
}
