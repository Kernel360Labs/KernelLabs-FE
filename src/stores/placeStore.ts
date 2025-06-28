import { create } from "zustand";
import type { Place } from "../types/place";

interface PlaceState {
  places: Place[];
  loading: boolean;
  error: string | null;
  setPlaces: (places: Place[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const usePlaceStore = create<PlaceState>((set) => ({
  places: [],
  loading: false,
  error: null,
  setPlaces: (places) => set({ places }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({ places: [], loading: false, error: null }),
}));
