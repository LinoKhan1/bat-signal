// src/features/auth/services/authService.ts
/**
 * Service to handle user authentication.
 * This includes sending login requests to the backend API
 * and processing the responses.
 */
import axios from "axios";
import { LoginRequest, LoginResponse } from "../types";

// Base URL for the API, set in environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Generic API response structure
interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}
// Function to log in a user
export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    // Make a POST request to the login endpoint
    const response = await axios.post<ApiResponse<LoginResponse>>(
      `${API_BASE_URL}/login`,
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

    // Attempt to extract a more specific error message
    if (typeof err === "object" && err !== null) {
      // Axios errors usually have response.data.message
      const maybeAxiosError = err as { response?: { data?: { message?: string } }; message?: string };
      message = maybeAxiosError.response?.data?.message || maybeAxiosError.message || message;
    }
    throw new Error(message);
  }
}
