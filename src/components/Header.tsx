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
    <header className="m-4 bg-white rounded-[50px] shadow-md p-4 flex justify-between items-center">
      <div>
        {/* Smaller text on mobile, larger on bigger screens */}
        <h3 className="font-bold text-deep-black flex items-center gap-2 text-base sm:text-lg lg:text-xl">
          BatSignal PMS
        </h3>
      </div>
      <div className="flex items-center gap-4">
        {/* Hidden on mobile & md, shown only from lg */}
        <span className="hidden lg:inline text-deep-black">
          Welcome {session?.user?.name || "User"}
        </span>
        <button
          onClick={handleLogout}
          className="secondary"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
