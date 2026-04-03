import { connectDB } from "@/lib/mongodb";
import Property from "@/models/Property";

export async function GET() {
  await connectDB();

  await Property.deleteMany(); // clears old data

  await Property.insertMany([
    {
      title: "Modern 2BHK Apartment",
      price: "₹75,00,000",
      location: "Koregaon Park, Pune",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      description: "Spacious apartment in prime location",
    },
    {
      title: "Luxury Villa with Garden",
      price: "₹2.5 Cr",
      location: "Baner, Pune",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      description: "Beautiful villa with private garden",
    },
    {
      title: "1BHK Budget Flat",
      price: "₹40,00,000",
      location: "Wakad, Pune",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      description: "Affordable and well-connected",
    },
  ]);

  return Response.json({ message: "Dummy data added!" });
}