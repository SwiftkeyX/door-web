import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file received or invalid file type" }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "uploads" }, (error, response) => {
        if (error) reject(error);
        else resolve(response as UploadApiResponse); // Explicitly cast response
      }).end(buffer);
    });

    return NextResponse.json({ message: "success", filePath: result.secure_url });
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
};

export const GET = async () => {
    try {
      // Fetch the latest image uploaded to Cloudinary
      const { resources } = await cloudinary.search
        .expression("folder:uploads") // Replace with your Cloudinary folder
        .sort_by("created_at", "desc") // Get the latest uploaded image
        .max_results(1)
        .execute();
  
      if (resources.length === 0) {
        return NextResponse.json({ error: "No images found" }, { status: 404 });
      }
  
      const latestImageUrl = resources[0].secure_url;
  
      return NextResponse.json({ message: "success", filePath: latestImageUrl });
    } catch (error) {
      console.error("Error fetching latest file from Cloudinary:", error);
      return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
    }
  };


