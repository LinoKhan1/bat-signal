// Import necessary modules for the proxy route
import { NextResponse } from "next/server";
import axios from "axios";

// Define the proxy route to forward authentication requests
export async function POST(req: Request) {
  // Extract credentials from the incoming request
  const credentials = await req.json();

  try {
    // Forward the request to the external API
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    // Return the response from the external API
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    // Handle errors from the external API call
    const message = error instanceof Error ? error.message : "Proxy request failed";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}