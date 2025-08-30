// src/features/common/utils/apiClient.ts
/**
 * API Client Utility
 */
import axios from "axios";

// Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: "/api", // Base URL for internal API routes
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle request errors
const handleRequestError = (error: unknown): never => {
  const message = error instanceof Error ? error.message : "An unexpected error occurred";
  throw new Error(message);
};

// Add a request interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => handleRequestError(error)
);

export default apiClient;