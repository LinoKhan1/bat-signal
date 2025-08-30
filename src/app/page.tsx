// src/app/page.tsx
"use client"; // Required for useRouter

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginForm from "@/features/auth/components/LoginForm";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Redirect to dashboard if authenticated
  if (session) {
    router.push("/dashboard");
    return null; // Return null while redirecting (component unmounts)
  }

  return <LoginForm />;
}