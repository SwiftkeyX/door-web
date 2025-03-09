import { NextResponse, NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

export const POST = async (req: NextRequest) => {
  try {
    // Parse the form data
    const data = await req.formData();
    const file = data.get("file");

    // Check if the file exists and is a File object
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file received or invalid file type" }, { status: 400 });
    }

    // Create 'public/uploads' folder if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true }); // Ensures the directory exists

    // Define new file path
    const newPath = path.join(uploadDir, `${Date.now()}_${file.name}`);

    // Convert file to buffer and save it
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(newPath, buffer);

    return NextResponse.json({ message: "success", filename: newPath });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }
};