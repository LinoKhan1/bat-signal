"use client";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Image from "next/image";

// LoginForm Component
export default function LoginForm() {
  // State for email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  // Render the login form
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-12">
      <h1 className="text-center text-deep-black mb-8 py-[50px]">BatSignal PMS</h1>
      <div className="rounded-[50px] max-w-4xl w-full bg-white shadow-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-6">
            <Image
              src="/batman.jpg"
              alt="Batman Signal"
              width={500}
              height={500}
              className="w-full h-[500px] rounded-[50px] object-cover"
            />
          </div>
          <div className="col-span-12 md:col-span-6 flex items-center p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <h3 className="text-deep-black font-bold mb-4">Sign In</h3>
              <div className="flex flex-col">
                <label className="mb-1 text-[20px] font-medium text-deep-black">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium text-[20px] text-deep-black">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border  border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-4 disabled:opacity-50 primary"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}