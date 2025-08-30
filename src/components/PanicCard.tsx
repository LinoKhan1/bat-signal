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
    <div className="border p-2 rounded mb-2">
      <p>ID: {panic.id}</p>
      <p>Location: ({panic.latitude}, {panic.longitude})</p>
      <p>Type: {panic.panic_type}</p>
      <p>Details: {panic.details || "No details"}</p>
      <p>Status: {panic.status.name}</p>
      <p>Created: {new Date(panic.created_at).toLocaleString()}</p>
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