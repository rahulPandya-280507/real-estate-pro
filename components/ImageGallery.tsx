"use client";

import { useState } from "react";

export default function ImageGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        className="w-full h-[40vh] md:h-[60vh] object-cover rounded-2xl"
      />
    );
  }

  return (
    <div>
      <div className="relative">
        <img
          src={images[index]}
          className="w-full h-[40vh] md:h-[60vh] object-cover rounded-2xl"
        />

        <button
          onClick={() =>
            setIndex((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            )
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded"
        >
          ←
        </button>

        <button
          onClick={() =>
            setIndex((prev) => (prev + 1) % images.length)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded"
        >
          →
        </button>
      </div>

      <div className="flex gap-2 mt-4 overflow-x-auto">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setIndex(i)}
            className={`h-16 w-24 object-cover rounded cursor-pointer ${
              index === i ? "border-2 border-black" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}