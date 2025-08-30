// src/features/panic/types.ts

/**
 * Generic API Response structure
 * @template T - Represents the shape of the data payload returned by the API
 */
export interface ApiResponse<T> {
  status: string; // Status of the API call (e.g., "success", "error")
  message: string; // Informational or error message from the API
  data: T; // The actual response payload (type depends on context)
}

/**
 * Response structure for sending a panic
 */
export interface SendPanicResponse {
  panic_id: number; // Unique identifier of the panic created
}

/**
 * Response structure for fetching multiple panics
 */
export interface FetchPanicsResponse {
  panics: Panic[]; // List of panic records
}

/**
 * Panic object structure
 * Represents an individual panic record returned by the API
 */
export interface Panic {
  id: number; // Unique panic identifier
  longitude: string; // Longitude coordinate of panic location
  latitude: string; // Latitude coordinate of panic location
  panic_type: string; // Type/category of panic (e.g., "medical", "security")
  details: string; // Additional details or description about the panic
  created_at: string; // Timestamp when panic was created
  status: { 
    id: number; // Unique identifier of the panic status
    name: string; // Human-readable name of the panic status (e.g., "Active", "Resolved")
  };
}
