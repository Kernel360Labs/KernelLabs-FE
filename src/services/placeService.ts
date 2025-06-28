import axios from "axios";
import { API_BASE_URL } from "../api";
import type { PlacesResponse } from "../types/place";

export const placeService = {
  getPlaces: async (): Promise<PlacesResponse> => {
    const response = await axios.get<PlacesResponse>(`${API_BASE_URL}/places`);
    return response.data;
  },
};
