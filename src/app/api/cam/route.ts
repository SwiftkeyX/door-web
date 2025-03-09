import { NextResponse, NextRequest } from "next/server";
import { writeFile, unlink, readdir } from "fs/promises";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

// Define the upload directory
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

// Function to delete all files in the upload directory
async function clearUploadDirectory() {
  try {
    const files = await readdir(UPLOAD_DIR);
    for (const file of files) {
      await unlink(path.join(UPLOAD_DIR, file));
      console.log(`Deleted file: ${file}`);
    }
    console.log("Upload directory cleared.");
  } catch (error) {
    console.error("Error clearing upload directory:", error);
  }
}

export const POST = async (req: NextRequest) => {
  try {
    // Parse the form data
    const data = await req.formData();
    const file = data.get("file");

    // Check if the file exists and is a File object
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file received or invalid file type" }, { status: 400 });
    }

    // Ensure the upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Check the number of files in the upload directory
    const files = await readdir(UPLOAD_DIR);
    if (files.length >= 5) {
      // Clear the upload directory if there are 5 or more files
      await clearUploadDirectory();
    }

    // Define new file path
    const newFilename = `${Date.now()}_${file.name}`;
    const newPath = path.join(UPLOAD_DIR, newFilename);

    // Convert file to buffer and save it
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(newPath, buffer);

    return NextResponse.json({ message: "success", filename: newFilename });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }
};

// GET endpoint to fetch the latest file path
export const GET = async () => {
    try {
        // Read all files in the upload directory
        const files = await fs.readdir(UPLOAD_DIR);
        if (files.length === 0) {
            return NextResponse.json({ error: "No file available" }, { status: 404 });
        }

        // Find the latest file by timestamp (assuming filenames start with timestamps)
        const latestFile = files.sort().reverse()[0];

        // Construct the full URL of the latest image
        // const fullUrl = `http://localhost:3000/public/uploads/${latestFile}`;
        const fullUrl = `https://door-web.vercel.app//public/uploads/${latestFile}`;

        return NextResponse.json({ message: "success", filePath: fullUrl });
    } catch (error) {
        console.error("Error fetching latest file path:", error);
        return NextResponse.json({ error: "Failed to fetch latest file path" }, { status: 500 });
    }

};
