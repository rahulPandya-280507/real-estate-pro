import Navbar from "@/components/Navbar";
import ImageGallery from "../../../components/ImageGallery";

async function getProperty(id: string) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/properties`, {
      cache: "no-store",
    });

    const properties = await res.json();

    return properties.find((p: any) => String(p._id) === id);
  } catch (error) {
    console.error("ERROR FETCHING PROPERTY:", error);
    return null;
  }
}

export default async function PropertyPage({ params }: any) {
  const { id } = await params;

  const property = await getProperty(id);

  if (!property) {
    return (
      <div className="p-10 text-center text-gray-900">
        Property not found
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="px-4 md:px-10 py-10 bg-gray-50 min-h-screen">
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* 🔥 IMAGE GALLERY */}
          <ImageGallery images={property.images || [property.image]} />

          {/* DETAILS */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {property.title}
            </h1>

            <p className="text-gray-600 mt-2 text-lg">
              {property.location}
            </p>

            <p className="text-2xl md:text-3xl font-bold mt-4 text-black">
              {property.price}
            </p>

            <p className="mt-6 text-gray-700 leading-relaxed">
              {property.description}
            </p>

            <button className="mt-8 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 active:scale-95 transition">
              Contact Broker
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}