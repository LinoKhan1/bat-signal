// src/components/PanicCard.tsx
"use client";

import { useState } from "react";
import { cancelPanic } from "../features/panic/services/panicService";
import { Panic } from "../features/panic/types";

interface PanicCardProps {
  panic: Panic;
  token: string;
}

export default function PanicCard({ panic, token }: PanicCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async () => {
    if (panic.status.id !== 1) return; // Only allow cancellation for "In Progress"
    setLoading(true);
    setError(null);
    try {
      await cancelPanic(token, panic.id);
      setError("Panic cancelled successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel panic");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[50px] bg-white  p-[50px] mb-2">
      <h3 className="text-deep-black font-bold mb-[24px]">{panic.panic_type} Alert!</h3>
      <p className="text-gray-600">ID: {panic.id}</p>
      <p className="text-gray-600">Location: ({panic.latitude}, {panic.longitude})</p>
      <p className="text-gray-600">Type: {panic.panic_type}</p>
      <p className="text-gray-600">Details: {panic.details || "No details"}</p>
      <p className="text-gray-600">Status: {panic.status.name}</p>
      <p className="text-gray-600">Created: {new Date(panic.created_at).toLocaleString()}</p>
      {panic.status.id === 1 && (
        <button
          onClick={handleCancel}
          disabled={loading}
          className="mt-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
        >
          {loading ? "Cancelling..." : "Cancel"}
        </button>
      )}
      {error && <p className={error.includes("success") ? "text-green-500" : "text-red-500"}>{error}</p>}
    </div>
  );
}