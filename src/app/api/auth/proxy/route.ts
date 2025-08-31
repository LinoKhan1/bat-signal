// Import necessary modules for the proxy route
import { NextResponse } from "next/server";
import axios from "axios";

// Define the proxy route to forward authentication requests
export async function POST(req: Request) {
  // Extract credentials from the incoming request
  const credentials = await req.json();
  console.log("Proxy received credentials:", credentials);

  try {
    // Forward the request to the external API with appropriate headers
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
    console.log("Proxy forwarded response:", response.data);

    // Ensure the response matches the expected ApiResponse format
    if (response.status === 200) {
      return NextResponse.json({
        status: "success",
        message: "Login successful",
        data: response.data, // Forward the data from the external API
      });
    } else {
      throw new Error(`External API error: ${response.statusText}`);
    }
  } catch (error: unknown) {
    // Handle errors from the external API call
    const message = error instanceof Error ? error.message : "Proxy request failed";
    console.log("Proxy error:", message);
    return NextResponse.json(
      { status: "error", message },
      { status: 401 } // Unauthorized status code
    );
  }
}