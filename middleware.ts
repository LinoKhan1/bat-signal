import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Get token from cookies (NextAuth or custom token)
  const token = req.cookies.get("next-auth.session-token"); // adjust if you use a different cookie

  // If no token, redirect to login page
  if (!token) {
    const loginUrl = new URL("/", req.url); // redirect to home page
    return NextResponse.redirect(loginUrl);
  }

  // If token exists, allow request to continue
  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/panic/:path*"],
};
