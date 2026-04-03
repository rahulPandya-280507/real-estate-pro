import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  const body = await req.json();

  const upload = await cloudinary.uploader.upload(body.image, {
    folder: "real-estate",
  });

  return Response.json({ url: upload.secure_url });
}