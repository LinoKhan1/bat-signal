/**
 * Custom hook for authentication using NextAuth.js
 * Manages login, logout, and authentication state.
 */
"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { AuthState, User } from "../types";

// Custom authentication hook
export function useAuth() {
  // Get NextAuth session data and authentication status
  const { data: session, status } = useSession();

  // Local state for authentication (token, loading, error)
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    loading: true,
    error: null,
  });

  /**
   * Sync session with local authentication state
   * - While "loading", do nothing
   * - If "authenticated", extract user token
   * - If not authenticated, reset state
   */
  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated" && session?.user) {
      const user = session.user as User;
      setAuthState({ token: user.token || null, loading: false, error: null });
    } else {
      setAuthState({ token: null, loading: false, error: null });
    }
  }, [status, session]);

  // Login using NextAuth signIn with credentials provider
  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // prevent full page reload
      });

      // Handle error returned by NextAuth
      if (result?.error) {
        setAuthState((prev) => ({ ...prev, loading: false, error: result.error }));
      } else {
        setAuthState((prev) => ({ ...prev, loading: false, error: null }));
      }
    } catch (error) {
      // Handle unexpected runtime errors
      if (error instanceof Error) {
        setAuthState((prev) => ({ ...prev, loading: false, error: error.message }));
      } else {
        setAuthState((prev) => ({ ...prev, loading: false, error: "An unknown error occurred" }));
      }
    }
  };

  // Logout using NextAuth signOut
  const logout = async () => {
    await signOut({ callbackUrl: "/" });
    setAuthState({ token: null, loading: false, error: null });
  };

  // Return auth state and actions
  return {
    ...authState,
    login,
    logout,
  };
}
