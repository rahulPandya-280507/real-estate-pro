import Link from "next/link";

export default function PropertyCard({ property }: any) {
  return (
    <Link href={`/property/${property._id}`}>
      <div
        className="bg-white rounded-2xl overflow-hidden border border-gray-100 
shadow-sm hover:shadow-2xl hover:-translate-y-1 
transition duration-300 ease-in-out cursor-pointer"
      >
        <div className="overflow-hidden">
          <img
            src={property.image}
            className="w-full h-56 object-cover transition duration-300 hover:scale-110"
          />
        </div>

        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-900">
            {property.title}
          </h2>

          <p className="text-gray-500 mt-1">{property.location}</p>

          <p className="text-lg font-bold mt-3 text-black">{property.price}</p>
        </div>
      </div>
    </Link>
  );
}
