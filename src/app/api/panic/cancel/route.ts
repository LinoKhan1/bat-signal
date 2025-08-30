// src/app/api/panic/cancel/route.ts
/**
 * API route to cancel a panic alert.
 * Requires user authentication via NextAuth.
 * Accepts POST requests with a JSON body containing the panic_id.
 * Forwards the request to an external API endpoint with the user's token.
 */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import axios from "axios";

// Handle POST requests to cancel a panic alert
export async function POST(req: Request) {
  // Get the current user session
  const session = await getServerSession(authOptions);
  if (!session?.user?.token) {
    return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  }
  // Parse the request body to get the panic_id
  const { panic_id } = await req.json();

  if (!panic_id || typeof panic_id !== "number") {
    return NextResponse.json(
      { status: "error", message: "Panic ID is required and must be a number" },
      { status: 400 }
    );
  }

  // Forward the cancel request to the external API
  try {
    // Make a POST request to the external panic cancel endpoint
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/panic/cancel`,
      { panic_id },
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // Return the response from the external API
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    // Handle errors from the external API request
    const message = error instanceof Error ? error.message : "Failed to cancel panic";
    return NextResponse.json({ status: "error", message }, { status: 400 });
  }
}