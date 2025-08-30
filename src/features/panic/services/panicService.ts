// src/features/panic/services/panicService.ts
import axios from "axios";
import { ApiResponse, SendPanicResponse, FetchPanicsResponse, Panic } from "../types";

const API_BASE_URL = "/api/panic"; // Relative to the app's base URL

export const sendPanic = async (token: string, payload: { longitude: string; latitude: string; panic_type?: string; details?: string }): Promise<number> => {
  try {
    const response = await axios.post<ApiResponse<SendPanicResponse>>(`${API_BASE_URL}/send`, payload, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return response.data.data.panic_id;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to send panic";
    throw new Error(message);
  }
};

export const cancelPanic = async (token: string, panicId: number): Promise<void> => {
  try {
    await axios.post<ApiResponse<object>>(`${API_BASE_URL}/cancel`, { panic_id: panicId }, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to cancel panic";
    throw new Error(message);
  }
};

export const fetchPanics = async (token: string, statusId?: number): Promise<Panic[]> => {
  try {
    const params = statusId ? { status_id: statusId } : {};
    const response = await axios.get<ApiResponse<FetchPanicsResponse>>(`${API_BASE_URL}/history`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return response.data.data.panics;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch panics";
    throw new Error(message);
  }
};