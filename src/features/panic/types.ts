// src/features/panic/types.ts

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface SendPanicResponse {
  panic_id: number;
}


export interface FetchPanicsResponse {
  panics: Panic[];
}

export interface Panic {
  id: number;
  longitude: string;
  latitude: string;
  panic_type: string;
  details: string;
  created_at: string;
  status: { id: number; name: string };
}