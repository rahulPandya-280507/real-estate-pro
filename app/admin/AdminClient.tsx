"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function AdminClient() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
  });

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = async (e: any) => {
    const files = Array.from(e.target.files) as File[];

    setLoading(true);

    const uploadedImages: string[] = [];

    for (const file of files) {
      const reader = new FileReader();

      const base64 = await new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ image: base64 }),
      });

      const data = await res.json();
      console.log("UPLOAD RESPONSE:", data);
      if (data.url) {
        uploadedImages.push(data.url);
      } else {
        console.error("Upload failed:", data);
      }
    }

    setImages(uploadedImages);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    await fetch("/api/properties", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        images, // ✅ send array
      }),
    });

    alert("Property Added!");
  };

  // ... ALL your existing logic here (unchanged)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Admin Panel</h1>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

        <div className="space-y-4">
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black"
          />

          <input
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black"
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black"
          />

          {/* 🔥 MULTIPLE IMAGE INPUT */}
          <label className="block">
            <span className="text-gray-700 font-medium">Upload Images</span>

            <input
              type="file"
              multiple
              onChange={handleImages}
              className="mt-2 w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white hover:file:bg-gray-800"
            />
          </label>

          {/* 🔥 LOADING STATE */}
          {loading && (
            <p className="text-sm text-gray-600">Uploading images...</p>
          )}

          {/* 🔥 PREVIEW IMAGES */}
          <div className="flex gap-2 flex-wrap">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                className="h-16 w-20 object-cover rounded"
              />
            ))}
          </div>

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Add Property
        </button>
      </div>
    </div>
  );
}
