import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

let requested = false;

export const GET = async (req: NextRequest, res: NextRequest) => {
    return NextResponse.json(requested);
};

export const POST = async (req: NextRequest, res: NextResponse) => {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    if (!file) {
        return NextResponse.json(
            { error: "No files received." },
            { status: 400 }
        );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");
    console.log(filename);
    try {
        await writeFile(
            path.join(process.cwd(), "public/uploads/" + filename),
            buffer
        );
        requested = false;
        return NextResponse.json({ message: "success", status: 201 });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ message: "failed", status: 500 });
    }
};
