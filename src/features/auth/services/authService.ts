// src/features/auth/services/authService.ts
/**
 * Service to handle user authentication via proxy route.
 * All login requests are sent to /api/auth/proxy instead of directly to backend.
 */
import axios from "axios";
import { LoginRequest, LoginResponse } from "../types";

// Use local proxy route
const PROXY_URL = "/api/auth/proxy";

// Generic API response structure
interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

// Function to log in a user
export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await axios.post<ApiResponse<LoginResponse>>(
      PROXY_URL,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (err: unknown) {
    let message = "Login failed";
    if (typeof err === "object" && err !== null) {
      const maybeAxiosError = err as { response?: { data?: { message?: string } }; message?: string };
      message = maybeAxiosError.response?.data?.message || maybeAxiosError.message || message;
    }
    throw new Error(message);
  }
}
