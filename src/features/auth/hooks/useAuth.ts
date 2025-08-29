"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { AuthState, User } from "../types";

export function useAuth() {
  const { data: session, status } = useSession();
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    loading: true,
    error: null,
  });

  // Sync session with authState
  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated" && session?.user) {
      const user = session.user as User;
      setAuthState({ token: user.token || null, loading: false, error: null });
    } else {
      setAuthState({ token: null, loading: false, error: null });
    }
  }, [status, session]);

  // Login via NextAuth credentials
  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // prevent full page reload
      });

      if (result?.error) {
        setAuthState((prev) => ({ ...prev, loading: false, error: result.error }));
      } else {
        setAuthState((prev) => ({ ...prev, loading: false, error: null }));
      }
    } catch (error) {
      if (error instanceof Error) {
        setAuthState((prev) => ({ ...prev, loading: false, error: error.message }));
      } else {
        setAuthState((prev) => ({ ...prev, loading: false, error: "An unknown error occurred" }));
      }
    }
  };

  const logout = async () => {
    await signOut({ callbackUrl: "/login" });
    setAuthState({ token: null, loading: false, error: null });
  };

  return {
    ...authState,
    login,
    logout,
  };
}
