// src/features/auth/services/authService.ts
import axios from "axios";
import { LoginRequest, LoginResponse } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  try {
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

    if (response.data.status === "success") {
      return response.data.data; // { api_access_token }
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (err: unknown) {
    let message = "Login failed";

    if (typeof err === "object" && err !== null) {
      // Axios errors usually have response.data.message
      const maybeAxiosError = err as { response?: { data?: { message?: string } }; message?: string };
      message = maybeAxiosError.response?.data?.message || maybeAxiosError.message || message;
    }

    throw new Error(message);
  }
}
