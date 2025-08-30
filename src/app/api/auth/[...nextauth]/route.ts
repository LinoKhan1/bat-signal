/**
 * API route for NextAuth authentication.
 * Handles authentication requests using the configured auth options.
 * Supports both GET and POST methods.
 */
import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

// Create NextAuth handler with the provided auth options
const handler = NextAuth(authOptions);
// NextAuth handles both GET and POST requests
export { handler as GET, handler as POST };