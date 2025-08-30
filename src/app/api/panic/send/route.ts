// src/app/api/panic/send/route.ts
/**
 * API route to handle sending panic alerts.
 * Requires user authentication.
 */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/common/utils/authOptions";
import axios from "axios";

// Handle POST requests to send a panic alert
export async function POST(req: Request) {
  // Retrieve the authenticated user session
  const session = await getServerSession(authOptions);
  // Check if the user is authenticated and has a valid token
  if (!session?.user?.token) {
    return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  }
  
  // Extract panic data from the request body
  const { longitude, latitude, panic_type, details } = await req.json();

  // Validate that longitude and latitude are provided
  if (!longitude || !latitude) {
    return NextResponse.json(
      { status: "error", message: "Longitude and latitude are required" },
      { status: 400 }
    );
  }

  try {
    // Send the panic alert to the external API
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/panic/send`,
      { longitude, latitude, panic_type, details },
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // Return the successful response from the API
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    // Handle any errors during the API call and return an error response
    const message = error instanceof Error ? error.message : "Failed to send panic";
    return NextResponse.json({ status: "error", message }, { status: 400 });
  }
}