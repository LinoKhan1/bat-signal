// src/app/dashboard/PanicDashboard.tsx
"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";

export default function PanicDashboard() {
  const { token, loading, error } = useAuth();

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Panic Controls</h2>
      {/* Add Send Panic, Cancel Panic, History components here */}
      {token ? <p>Authenticated with token: {token}</p> : <p>No token available</p>}
    </div>
  );
}