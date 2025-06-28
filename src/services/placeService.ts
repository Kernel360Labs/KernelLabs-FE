import axios from "axios";
import { API_BASE_URL } from "../api";
import type { PlacesResponse, PlaceDetailResponse } from "../types/place";

export const placeService = {
  getPlaces: async (): Promise<PlacesResponse> => {
    const response = await axios.get<PlacesResponse>(`${API_BASE_URL}/places`);
    return response.data;
  },
  getPlaceDetail: async (id: string | number): Promise<PlaceDetailResponse> => {
    const response = await axios.get<PlaceDetailResponse>(
      `${API_BASE_URL}/places/${id}`
    );
    return response.data;
  },
};
