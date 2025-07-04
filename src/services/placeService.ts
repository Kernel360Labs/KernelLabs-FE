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
  return timeSlots.map((slot) => {
    // status 필드가 이미 있는 경우 그대로 사용
    if (slot.status) {
      return {
        time: slot.time,
        status: slot.status,
      };
    }
    // available 필드가 있는 경우 변환
    if (slot.hasOwnProperty("available")) {
      return {
        time: slot.time,
        status: slot.available ? "AVAILABLE" : "UNAVAILABLE",
      };
    }
    // 기본값
    return {
      time: slot.time,
      status: "AVAILABLE",
    };
  });
};

// 날짜를 YYYY-MM-DD (KST 기준, 항상 00:00:00로 고정)로 변환하는 함수
function getKSTDateString(date: Date) {
  // 항상 00:00:00로 맞추고 변환
  const localDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0
  );
  const kst = new Date(localDate.getTime() + 9 * 60 * 60 * 1000);
  const year = kst.getUTCFullYear();
  const month = String(kst.getUTCMonth() + 1).padStart(2, "0");
  const day = String(kst.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

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
    const payload = {
      placeId: Number(data.placeId),
      password: String(data.password),
      reservationDate:
        typeof data.reservationDate === "string"
          ? data.reservationDate
          : getKSTDateString(data.reservationDate),
      timeSlots: data.timeSlots.map(String),
    };

    // 빈 값/undefined/null 제거
    (Object.keys(payload) as (keyof typeof payload)[]).forEach((key) => {
      if (
        payload[key] === undefined ||
        payload[key] === null ||
        (typeof payload[key] === "string" && payload[key].trim() === "") ||
        (Array.isArray(payload[key]) && payload[key].length === 0)
      ) {
        delete payload[key];
      }
    });

    console.log("예약 요청 데이터:", payload);

    const response = await axios.post<ReservationResponse>(
      `${API_BASE_URL}/reservations`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  },
  checkReservation: async (
    reservationId: string,
    password: string
  ): Promise<ReservationResponse> => {
    const response = await axios.post<ReservationResponse>(
      `${API_BASE_URL}/reservations/${reservationId}`,
      { password }
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
