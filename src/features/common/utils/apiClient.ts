// src/features/common/utils/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api", // Base URL for internal API routes
  headers: {
    "Content-Type": "application/json",
  },
});

const handleRequestError = (error: unknown): never => {
  const message = error instanceof Error ? error.message : "An unexpected error occurred";
  throw new Error(message);
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => handleRequestError(error)
);

export default apiClient;