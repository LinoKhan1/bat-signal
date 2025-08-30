// src/app/api/panic/history/route.ts
/**
 * GET /api/panic/history
 * Fetch panic history, optionally filtered by status_id.
 * Requires user authentication.
 */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import axios from "axios";

// Handler for GET requests to fetch panic history
export async function GET(req: Request) {
  // Get the user session to check authentication
  const session = await getServerSession(authOptions);
  if (!session?.user?.token) {
    return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  }
  // Parse the request URL to extract query parameters
  const url = new URL(req.url);
  const statusId = url.searchParams.get("status_id") ? parseInt(url.searchParams.get("status_id")!) : undefined;

  // Make a request to the external API to fetch panic history
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/panic/history`, {
      headers: { Authorization: `Bearer ${session.user.token}` },
      params: { status_id: statusId },
    });
    // Return the fetched data as a JSON response
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch panic history";
    return NextResponse.json({ status: "error", message }, { status: 400 });
  }
}