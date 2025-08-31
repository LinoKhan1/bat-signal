// src/app/api/auth/proxy/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const credentials = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    // just forward exactly what external API returns
    return NextResponse.json(data, { status: response.status });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Auth proxy error:", error.message);
    } else {
      console.error("Auth proxy error: Unknown error", error);
    }

    return NextResponse.json(
      { status: "error", message: "Proxy request failed" },
      { status: 500 }
    );
  }
}
