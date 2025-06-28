import axios from "axios";
import { API_BASE_URL } from "../api";
import type {
  PlacesResponse,
  PlaceDetailResponse,
  ReservationRequest,
  ReservationResponse,
} from "../types/place";

export const placeService = {
  getPlaces: async (): Promise<PlacesResponse> => {
    const response = await axios.get<PlacesResponse>(`${API_BASE_URL}/places`);
    return response.data;
  },
  getPlaceDetail: async (
    id: string | number,
    date?: string
  ): Promise<PlaceDetailResponse> => {
    let url = `${API_BASE_URL}/places/${id}`;
    if (date) {
      url += `?date=${date}`;
    }
    const response = await axios.get<PlaceDetailResponse>(url);
    return response.data;
  },
  reserve: async (data: ReservationRequest): Promise<ReservationResponse> => {
    const response = await axios.post<ReservationResponse>(
      `${API_BASE_URL}/reservations`,
      data
    );
    return response.data;
  },
  checkReservation: async (
    reservationId: string,
    password: string
  ): Promise<ReservationResponse> => {
    const response = await axios.get<ReservationResponse>(
      `${API_BASE_URL}/reservations/${reservationId}`,
      { data: { password } }
    );
    return response.data;
  },
};
