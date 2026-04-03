import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.image) {
      return Response.json({ error: "No image provided" }, { status: 400 });
    }

    const upload = await cloudinary.uploader.upload(body.image, {
      folder: "real-estate",
    });

    if (!upload.secure_url) {
      return Response.json({ error: "Upload failed" }, { status: 500 });
    }

    return Response.json({ url: upload.secure_url });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return Response.json({ error: "Upload crashed" }, { status: 500 });
  }
}