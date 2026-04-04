"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res || res.error) {
      setError("Invalid credentials");
      return;
    }

    // 🔥 simple + stable redirect
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button className="w-full bg-black text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}