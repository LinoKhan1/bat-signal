// src/features/panic/PanicForm.tsx
"use client";

import { useState } from "react";
import { sendPanic } from "@/features/panic/services/panicService";

interface PanicFormProps {
  token: string;
}

export default function PanicForm({ token }: PanicFormProps) {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [panicType, setPanicType] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!longitude || !latitude) {
      setError("Longitude and latitude are required");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await sendPanic(token, { longitude, latitude, panic_type: panicType, details });
      setSuccess("Panic sent successfully");
      setLongitude("");
      setLatitude("");
      setPanicType("");
      setDetails("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send panic");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 p-4 border rounded">
      <h3 className="text-xl font-semibold mb-2">Send Panic</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Longitude:</label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Latitude:</label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Panic Type:</label>
          <input
            type="text"
            value={panicType}
            onChange={(e) => setPanicType(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Details:</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Sending..." : "Send Panic"}
        </button>
      </form>
    </div>
  );
}