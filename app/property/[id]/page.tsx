import Navbar from "@/components/Navbar";

async function getProperty(id: string) {
  const res = await fetch(`http://localhost:3000/api/properties`, {
    cache: "no-store",
  });

  const properties = await res.json();
  console.log("All properties:", properties);
  console.log("URL ID:", id);
  return properties.find((p: any) => p._id.toString() === id);
}

export default async function PropertyPage({ params }: any) {
  const { id } = await params;

  const property = await getProperty(id);

  if (!property) return <div>Property not found</div>;

  return (
    <div>
      <Navbar />

      <div className="px-4 md:px-10 py-10 bg-gray-50 min-h-screen">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <img
            src={property.image}
            className="w-full h-[40vh] md:h-[60vh] object-cover rounded-2xl shadow-md"
          />

          {/* Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {property.title}
            </h1>

            <p className="text-gray-600 mt-2 text-lg">{property.location}</p>

            <p className="text-2xl md:text-3xl font-bold mt-4 text-black">
              {property.price}
            </p>

            <p className="mt-6 text-gray-700 leading-relaxed">
              {property.description}
            </p>

            <button
              className="bg-black text-white px-6 py-3 rounded-lg 
hover:bg-gray-800 active:scale-95 transition 
duration-150 ease-in-out font-medium"
            >
              Contact Broker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
