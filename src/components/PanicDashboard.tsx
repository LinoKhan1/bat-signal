// src/components/PanicDashboard.tsx
"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import PanicForm from "@/features/panic/components/PanicForm";
import PanicHistory from "@/features/panic/components/PanicHistoryList";

export default function PanicDashboard() {
  const { token, loading: authLoading, error: authError } = useAuth();

  if (authLoading) return <div>Loading dashboard...</div>;
  if (authError) return <div>Error: {authError}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Panic Dashboard</h2>
      {token ? (
        <>
          <PanicForm token={token} />
          <PanicHistory token={token} />
        </>
      ) : (
        <p>No token available. Please log in.</p>
      )}
    </div>
  );
}