"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!res || res.error) {
      setError("Invalid email or password");
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT SIDE - Branding */}
      <div className="hidden md:flex w-1/2 bg-black text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Nimbalkar Properties
          </h1>
          <p className="text-gray-300 text-lg max-w-md">
            Manage your listings, upload properties, and control your real estate platform seamlessly.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Login */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Admin Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="text-sm text-gray-900">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-black outline-none text-black"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none text-black"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Authorized access only
          </p>
        </div>
      </div>
    </div>
  );
}