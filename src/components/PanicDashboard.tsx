"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import Header from "./Header";
import PanicForm from "@/features/panic/components/PanicForm";
import PanicHistory from "@/features/panic/components/PanicHistoryList";

export default function PanicDashboard() {
  const { token, loading: authLoading, error: authError } = useAuth();

  if (authLoading) return <div>Loading dashboard...</div>;
  if (authError) return <div>Error: {authError}</div>;
  if (!token) return <div>No token available. Please log in.</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="grid grid-cols-12 gap-6 p-6">
        {/* Form comes first on mobile and md, spans 12 there. On lg, col-span-5 */}
        <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
          <PanicForm token={token} />
        </div>

        {/* History comes second on mobile and md, spans 12 there. On lg, col-span-7 */}
        <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
          <PanicHistory token={token} />
        </div>
      </div>
    </div>
  );
}
