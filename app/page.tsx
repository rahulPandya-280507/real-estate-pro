import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";

async function getProperties() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/properties`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }

    return res.json();
  } catch (error) {
    console.error("FETCH ERROR:", error);
    return [];
  }
}

export default async function Home() {
  const properties = await getProperties();

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <div className="relative h-[60vh] w-full">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute w-full h-full bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Find Your Dream Home
          </h1>

          <p className="text-lg md:text-xl mb-6 text-gray-200">
            Explore premium properties in prime locations
          </p>

          <div className="bg-white rounded-full flex items-center px-4 py-2 w-full max-w-xl shadow-lg">
            <input
              type="text"
              placeholder="Search by location..."
              className="flex-1 outline-none text-gray-800 px-2"
            />
            <button className="bg-black text-white px-4 py-2 rounded-full">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* PROPERTIES */}
      <div className="px-4 md:px-10 py-14 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Available Properties
        </h2>

        {properties.length === 0 ? (
          <p className="text-center text-gray-600">No properties found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {properties.map((p: any) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
