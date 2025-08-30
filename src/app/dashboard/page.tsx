"use client"
// src/app/dashboard/page.tsx
import { useSession, signOut } from "next-auth/react";
import PanicDashboard from "@/components/PanicDashboard";

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) {
    return null; // Middleware handles redirection
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">BatSignal Dashboard</h1>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
        <PanicDashboard />
      </div>
    </div>
  );
}