"use client"

import { useSession } from "next-auth/react";
import PanicDashboard from "@/components/PanicDashboard";

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) {
    return null; // Middleware handles redirection
  }

  return (
    <PanicDashboard />
  );
}