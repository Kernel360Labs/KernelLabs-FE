import axios from "axios";
import { API_BASE_URL } from "../api";
import type {
  PlacesResponse,
  PlaceDetailResponse,
  ReservationRequest,
  ReservationResponse,
} from "../types/place";

// available 필드를 status로 변환하는 함수
const transformTimeSlots = (timeSlots: any[]) => {
  return timeSlots.map((slot) => ({
    time: slot.time,
    status: slot.available ? "AVAILABLE" : "UNAVAILABLE",
  }));
};

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

    // timeSlots 변환 (available -> status)
    if (response.data.data.timeSlots) {
      response.data.data.timeSlots = transformTimeSlots(
        response.data.data.timeSlots
      );
    }

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
  deleteReservation: async (
    reservationId: string,
    password: string
  ): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/reservations/${reservationId}`, {
      data: { password },
    });
  },
  getPlaceScheduleForEdit: async (
    placeId: string | number,
    date: string,
    editingReservationId: string | number
  ): Promise<PlaceDetailResponse> => {
    const response = await axios.get<PlaceDetailResponse>(
      `${API_BASE_URL}/places/${placeId}?date=${date}&editingReservationId=${editingReservationId}`
    );

    // timeSlots 변환 (available -> status)
    if (response.data.data.timeSlots) {
      response.data.data.timeSlots = transformTimeSlots(
        response.data.data.timeSlots
      );
    }

    return response.data;
  },
  updateReservation: async (
    reservationId: string | number,
    data: {
      password: string;
      newReservationDate: string;
      newTimeSlots: string[];
    }
  ): Promise<ReservationResponse> => {
    try {
      const response = await axios.patch<ReservationResponse>(
        `${API_BASE_URL}/reservations/${reservationId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      // CORS 오류인 경우 POST 요청으로 재시도
      if (error.message?.includes("CORS") || error.code === "ERR_FAILED") {
        console.log("PATCH 요청 실패, POST 요청으로 재시도...");
        const response = await axios.post<ReservationResponse>(
          `${API_BASE_URL}/reservations/${reservationId}/update`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      }
      throw error;
    }
  },
};
