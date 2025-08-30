"use client";

import { useState, useEffect } from "react";
import { fetchPanics } from "@/features/panic/services/panicService";
import PanicCard from "@/features/panic/components/PanicCard";
import { Panic } from "../types";


interface PanicHistoryProps {
  token: string;
}

export default function PanicHistory({ token }: PanicHistoryProps) {
  const [panics, setPanics] = useState<Panic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const refreshPanics = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPanics(token);
        setPanics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch panics");
      } finally {
        setLoading(false);
      }
    };

    refreshPanics();
  }, [token]); // Removed statusId dependency

  return (
    <div className="p-4 rounded ">
      <h3 className="text-xl font-semibold mb-[50px]">Panic History</h3>
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