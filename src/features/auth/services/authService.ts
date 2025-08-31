/**
 * Service to handle user authentication.
 * This includes sending login requests to the backend API
 * and processing the responses.
 */
import axios from "axios";
import { LoginRequest, LoginResponse } from "../types";

// Generic API response structure
interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}
// Function to log in a user via the internal proxy route
export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    // Make a POST request to the internal proxy route
    const response = await axios.post<ApiResponse<LoginResponse>>(
      "/api/auth/proxy", // Relative path to the local proxy route
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    // Check if the response indicates success
    if (response.data.status === "success") {
      return response.data.data; // { api_access_token }
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (err: unknown) {
    let message = "Login failed";

    // Handle potential Axios error object to extract a meaningful message
    if (typeof err === "object" && err !== null) {
      const maybeAxiosError = err as { response?: { data?: { message?: string } }; message?: string };
      message = maybeAxiosError.response?.data?.message || maybeAxiosError.message || message;
    }
    throw new Error(message);
  }
}