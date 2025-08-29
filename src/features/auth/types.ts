// src/features/auth/types.ts

// Existing types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  api_access_token: string;
}

export interface User {
  id: string;
  token: string; // Custom property for api_access_token
  name?: string;
  email?: string;
}

export interface Session {
  user: User;
  expires: string;
}

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Extend NextAuth types
import { DefaultUser } from "next-auth";
declare module "next-auth" {
  interface User extends DefaultUser {
    token: string;
  }
}

import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
}