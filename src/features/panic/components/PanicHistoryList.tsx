// src/features/panic/PanicHistory.tsx
"use client";

import { useState, useEffect } from "react";
import { fetchPanics } from "@/features/panic/services/panicService";
import PanicCard from "@/components/PanicCard";
import { Panic } from "../types";

interface PanicHistoryProps {
  token: string;
}

export default function PanicHistory({ token }: PanicHistoryProps) {
  const [panics, setPanics] = useState<Panic[]>([]);
  const [statusId, setStatusId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const refreshPanics = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPanics(token, statusId);
        setPanics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch panics");
      } finally {
        setLoading(false);
      }
    };

    refreshPanics();
  }, [token, statusId]); // Dependencies remain token and statusId

  return (
    <div className="p-4 border rounded">
      <h3 className="text-xl font-semibold mb-2">Panic History</h3>
      <div className="mb-4">
        <label className="mr-2">Filter by Status:</label>
        <select
          value={statusId || ""}
          onChange={(e) => setStatusId(e.target.value ? parseInt(e.target.value) : undefined)}
          className="border p-1 rounded"
        >
          <option value="">All</option>
          <option value="1">In Progress</option>
          <option value="2">Cancelled</option>
          <option value="3">Resolved</option>
        </select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : panics.length === 0 ? (
        <p>No panics found.</p>
      ) : (
        panics.map((panic) => <PanicCard key={panic.id} panic={panic} token={token} />)
      )}
    </div>
  );
}