import connectMqtt from "@/lib/mqttService";
import { Pet, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { NextRequest, NextResponse } from "next/server";

interface DoorLogPostRequest {
    rfid: number;
    uid_str: string;
    opened: boolean;
}

export async function GET(req: NextRequest) {
    try {
        const logs = await prisma.doorLog.findMany({
            include: {
                pet: true,
            },
            orderBy: {
                created_at: "desc",
            },
        });
        return NextResponse.json(logs);
    } catch (error) {
        return NextResponse.json(
            {
                error: "DB error",
            },
            {
                status: 500,
            }
        );
    }
}

function publishLog() {
    const client = connectMqtt();
    client.on("connect", () => {
        client.publish("log/door", "update");
        client.end();
    });
}

export async function POST(req: NextRequest) {
    const body: DoorLogPostRequest = await req.json();

    try {
        console.log(body);

        const pet = await prisma.pet.findUnique({
            where: { uid: body.uid_str.toUpperCase() },
        });

        const _ =
            pet == null
                ? await prisma.doorLog.create({
                      data: {
                          uid: body.uid_str,
                          pet_id: null,
                          rfid_index: body.rfid,
                          opened: body.opened,
                      },
                  })
                : await prisma.doorLog.create({
                      data: {
                          uid: body.uid_str,
                          pet_id: pet.id,
                          rfid_index: body.rfid,
                          opened: body.opened,
                      },
                  });

        publishLog();

        return NextResponse.json({
            message: "success",
        });
    } catch {
        return NextResponse.json(
            {
                error: "DB error",
            },
            {
                status: 500,
            }
        );
    }
}
