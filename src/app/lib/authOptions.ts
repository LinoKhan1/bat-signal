/**
 * Authentication options for NextAuth configuration.
 * This file sets up the authentication providers, pages, and callbacks.
 * It uses CredentialsProvider for email/password authentication.
 */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/features/auth/services/authService";

// Export authentication options for NextAuth configuration
export const authOptions: NextAuthOptions = {
  // Define authentication providers
  providers: [
    // Configure CredentialsProvider for email/password login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // Authorize function to validate user credentials
      async authorize(credentials) {
        // Check if email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          // Attempt to log in the user and return user data
          const data = await loginUser({
            email: credentials.email,
            password: credentials.password,
          });
          return { id: "1", token: data.api_access_token, name: credentials.email };
        } catch (error) {
          // Propagate any errors from the login attempt
          throw error;
        }
      },
    }),
  ],
  // Custom pages for authentication flow
  pages: {
    // Redirect to login page for sign-in
    signIn: "/login",
  },
  // Callback functions to customize authentication behavior
  callbacks: {
    // JWT callback to add custom data to the token
    async jwt({ token, user }) {
      // Add token to JWT if user data is present
      if (user) {
        token.token = user.token;
      }
      return token;
    },
    // Session callback to enrich the session object
    async session({ session, token }) {
      // Add token to session user if available
      if (session.user) {
        session.user.token = token.token as string;
      }
      return session;
    },
  },
  // Secret key for signing the JWT, sourced from environment variables
  secret: process.env.NEXT_AUTH_SECRET,
};