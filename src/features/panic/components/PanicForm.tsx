"use client";

import { useState } from "react";
import { sendPanic } from "@/features/panic/services/panicService";

// Props for the PanicForm component
interface PanicFormProps {
  token: string;
}

// PanicForm component
export default function PanicForm({ token }: PanicFormProps) {

  // State variables for form fields and status messages
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [panicType, setPanicType] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle form submission
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

  // Render the form
  return (
    <div className="lg:sticky lg:top-6 mt-[30px] md:mt-[75px]">
      <div className="bg-white rounded-[25px] md:rounded-[50px] p-[25px]">
        <h3 className="text-xl font-semibold mb-6">Send Panic</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-6">
            <div className="w-1/2">
              <label className="block mb-1">Longitude:</label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1">Latitude:</label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
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
            className="primary w-full"
          >
            {loading ? "Sending..." : "Send Panic"}
          </button>
        </form>
      </div>
    </div>
  );
}