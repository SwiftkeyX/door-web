import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export interface PetPatchRequest {
    pet_name: string;
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body: PetPatchRequest = await req.json();

    try {
        await prisma.pet.update({
            where: { id: Number.parseInt(id) },
            data: {
                pet_name: body.pet_name,
            },
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            {
                error: `Failed to update pet ${id}`,
            },
            { status: 500 }
        );
    }

    return NextResponse.json({
        message: "Updated successfully",
    });
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        await prisma.pet.delete({
            where: { id: Number.parseInt(id) },
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            {
                error: `Failed to delete pet ${id}`,
            },
            { status: 500 }
        );
    }

    return NextResponse.json({
        message: "Deleted successfully",
    });
}
