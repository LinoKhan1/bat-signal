"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { logout } = useAuth();
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header className="bg-white rounded-[50px] shadow-md p-4 flex justify-between items-center">
      <div className="">
        <h3 className="font-bold text-deep-black flex items-center gap-2">
          BatSignal PMS
        </h3>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-deep-black">Welcome {session?.user?.name || "User"}</span>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 secondary"
        >
          Logout
        </button>
      </div>
    </header>
  );
}