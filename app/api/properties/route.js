import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";

export async function GET() {
  await connectDB();

  const properties = await Property.find();

  return Response.json(properties);
}

export async function POST(req) {
  await connectDB();

  const data = await req.json();

  const property = await Property.create(data);

  return Response.json(property);
}