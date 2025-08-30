// app/api/auth/proxy/route.ts
/**
 * Proxy route to forward login requests to external API.
 * Allows Next.js frontend to interact with backend without exposing full URL.
 */
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // backend login endpoint base

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Forward request to backend
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Return backend response directly
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login failed via proxy";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
