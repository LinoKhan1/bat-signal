/**
 * Types and interfaces for authentication features.
 * This includes request/response payloads, user/session structures,
 */
// Request payload for login API call
export interface LoginRequest {
  email: string;
  password: string;
}

// Response structure from login API call
export interface LoginResponse {
  api_access_token: string;
}

// Represents a user object in the app
export interface User {
  id: string; // User identifier
  token: string; // Custom property for api_access_token
  name?: string; // Optional display name
  email?: string; // Optional email
}

// Represents a NextAuth session object
export interface Session {
  user: User; // Authenticated user
  expires: string; // Session expiry time
}

// Represents the authentication state in Redux/Context
export interface AuthState {
  token: string | null; // JWT token (null if not logged in)
  loading: boolean; // Loading state for async actions
  error: string | null; // Error message if login fails
}

// Extend NextAuth's default User type with custom fields
import { DefaultUser } from "next-auth";
declare module "next-auth" {
  interface User extends DefaultUser {
    token: string; // Custom token property (api_access_token)
  }
}

// Extend NextAuth's default Session type with custom user
import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User; // Custom User type (includes token)
  }
}
