// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/features/auth/services/authService";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const data = await loginUser({
            email: credentials.email,
            password: credentials.password,
          });
          return { id: "1", token: data.api_access_token, name: credentials.email };
        } catch (error) {
          console.log(error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.token = token.token as string;
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET, // Set this in .env.local
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };