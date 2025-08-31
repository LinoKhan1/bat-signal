"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import Header from "./Header";
import PanicForm from "@/features/panic/components/PanicForm";
import PanicHistory from "@/features/panic/components/PanicHistoryList";

export default function PanicDashboard() {
  const { token } = useAuth();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="grid grid-cols-12 gap-6 p-2 md:p-6">
        <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
          <PanicForm token={token!} />
        </div>
        <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
          <PanicHistory token={token!} />
        </div>
      </div>
    </div>
  );
}
