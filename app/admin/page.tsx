"use client";

import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    image: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setForm({ ...form, image: reader.result });
      }
    };
  };

  const handleSubmit = async () => {
    let imageUrl = form.image;

    if (form.image.startsWith("data:")) {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ image: form.image }),
      });

      const data = await res.json();
      imageUrl = data.url;
    }

    await fetch("/api/properties", {
      method: "POST",
      body: JSON.stringify({ ...form, image: imageUrl }),
    });

    alert("Property Added!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <div className="p-10 max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-5 text-gray-900">Admin Panel</h1>
          <div className="space-y-4">
            <input
              name="title"
              placeholder="Title"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg 
text-gray-900 placeholder-gray-500 
focus:outline-none focus:ring-2 focus:ring-black 
focus:scale-[1.01] transition"
            />
            <input
              name="price"
              placeholder="Price"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg 
text-gray-900 placeholder-gray-500 
focus:outline-none focus:ring-2 focus:ring-black 
focus:scale-[1.01] transition"
            />
            <input
              name="location"
              placeholder="Location"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg 
text-gray-900 placeholder-gray-500 
focus:outline-none focus:ring-2 focus:ring-black 
focus:scale-[1.01] transition"
            />

            <label className="block mb-4">
              <span className="text-gray-700 font-medium">Upload Image</span>
              <input
                type="file"
                onChange={handleImage}
                className="mt-2 w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white hover:file:bg-gray-800"
              />
            </label>

            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg 
text-gray-900 placeholder-gray-500 
focus:outline-none focus:ring-2 focus:ring-black 
focus:scale-[1.01] transition"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Add Property
          </button>
        </div>
      </div>
    </div>
  );
}
