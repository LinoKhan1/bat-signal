// src/features/panic/services/panicService.ts
/**
 * Panic Service
 * Handles API interactions related to panic actions.
 */
import apiClient from "../../common/utils/apiClient";
import { ApiResponse, SendPanicResponse, FetchPanicsResponse, Panic } from "../types";

const API_BASE_URL = "/panic"; // Base route for panic-related API endpoints

/**
 * Send a new panic request to the backend.
 * 
 * @param token - User's authentication token for authorization
 * @param payload - Object containing longitude, latitude, panic type (optional), and details (optional)
 * @returns panic_id of the newly created panic record
 * @throws Error if the request fails
 */
export const sendPanic = async (
  token: string,
  payload: { longitude: string; latitude: string; panic_type?: string; details?: string }
): Promise<number> => {
  try {
    // POST request to send panic with provided payload and auth header
    const response = await apiClient.post<ApiResponse<SendPanicResponse>>(
      `${API_BASE_URL}/send`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // Return panic_id from API response
    return response.data.data.panic_id;
  } catch (error: unknown) {
    // Extract error message or fallback to a default one
    const message = error instanceof Error ? error.message : "Failed to send panic";
    throw new Error(message);
  }
};

/**
 * Cancel an existing panic request.
 * 
 * @param token - User's authentication token for authorization
 * @param panicId - ID of the panic to cancel
 * @returns void
 * @throws Error if the request fails
 */
export const cancelPanic = async (token: string, panicId: number): Promise<void> => {
  try {
    // POST request to cancel a panic by panicId
    await apiClient.post<ApiResponse<object>>(
      `${API_BASE_URL}/cancel`,
      { panic_id: panicId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to cancel panic";
    throw new Error(message);
  }
};

/**
 * Fetch panic history for the authenticated user.
 * 
 * @param token - User's authentication token for authorization
 * @param statusId - Optional filter by status ID
 * @returns List of panic records
 * @throws Error if the request fails
 */
export const fetchPanics = async (token: string, statusId?: number): Promise<Panic[]> => {
  try {
    // If statusId provided, add as query param; otherwise send empty object
    const params = statusId ? { status_id: statusId } : {};
    
    // GET request to retrieve panic history
    const response = await apiClient.get<ApiResponse<FetchPanicsResponse>>(
      `${API_BASE_URL}/history`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params,
      }
    );
    // Return list of panics from API response
    return response.data.data.panics;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch panics";
    throw new Error(message);
  }
};
