/**
 * Service to handle user authentication.
 * This includes sending login requests to the backend API
 * and processing the responses.
 */
import apiClient from "../../common/utils/apiClient";
import { LoginRequest, LoginResponse } from "../types";

// Generic API response structure
interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

/**
 * Function to log in a user via the internal proxy route
 */
export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const targetUrl = "/auth/proxy"; // relative URL, apiClient should add `/api`

    console.log("Attempting login with credentials:", credentials);
    console.log("Target URL:", targetUrl);
    console.log("apiClient baseURL:", apiClient.defaults.baseURL);

    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      targetUrl,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("Proxy response received:", response.data);

    // Validate response
    if (response.data?.status === "success" && response.data.data) {
      return response.data.data; // { api_access_token }
    } else {
      throw new Error(response.data?.message || "Login failed: Invalid response");
    }
  } catch (err: unknown) {
    let message = "Login failed";

    if (typeof err === "object" && err !== null) {
      const maybeAxiosError = err as { 
        response?: { data?: { message?: string } }; 
        message?: string 
      };
      message = maybeAxiosError.response?.data?.message || maybeAxiosError.message || message;
    }

    console.error("Login error caught:", message);
    throw new Error(message);
  }
}
