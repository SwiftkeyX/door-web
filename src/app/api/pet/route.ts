import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface PetPostRequest {
    uid: string;
    pet_name: string;
}
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const pets = await prisma.pet.findMany();

    if (searchParams.get("uids") === "true") {
        return NextResponse.json(pets.map((pet) => pet.uid));
        // return new NextResponse(pets.map((pet) => pet.uid).join(","), {
        //     headers: {
        //         "Content-Type": "text/plain",
        //     },
        // });
    }

    return NextResponse.json(pets);
}

export async function POST(req: NextRequest) {
    const body: PetPostRequest = await req.json();

    const existingPet = await prisma.pet.findUnique({
        where: {
            uid: body.uid,
        },
    });

    if (existingPet != null) {
        return NextResponse.json(
            {
                error: `Pet with UID ${body.uid} already exists`,
            },
            { status: 400 }
        );
    }

    try {
        await prisma.pet.create({
            data: {
                uid: body.uid,
                pet_name: body.pet_name,
            },
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Failed to post pet",
            },
            { status: 500 }
        );
    }

    return NextResponse.json({
        message: "Created pet successfully",
    });
}
