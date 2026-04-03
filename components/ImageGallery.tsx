"use client";

import { useEffect, useState } from "react";

export default function ImageGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div>
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={images[index]}
          className="w-full h-[40vh] md:h-[60vh] object-cover transition-all duration-500"
        />

        {/* Left */}
        <button
          onClick={() =>
            setIndex((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            )
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 text-white px-3 py-1 rounded-full"
        >
          ←
        </button>

        {/* Right */}
        <button
          onClick={() =>
            setIndex((prev) => (prev + 1) % images.length)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 text-white px-3 py-1 rounded-full"
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              index === i ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}