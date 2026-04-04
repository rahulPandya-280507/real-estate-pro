"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-gray-900">
          Nimbalkar properties
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
          <a href="/" className="hover:text-black">Home</a>
          <a href="#" className="hover:text-black">Properties</a>
          <a href="/admin" className="hover:text-black">Admin</a>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-gray-900 text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3 text-gray-700">
          <a href="/" className="block">Home</a>
          <a href="#" className="block">Properties</a>
          <a href="/admin" className="block">Admin</a>
        </div>
      )}
    </div>
  );
}