import { create } from "zustand";
import type { Place } from "../types/place";
import type { ReservationResponse } from "../types/place";

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

// 예약 상태 관리
interface ReservationState {
  reserving: boolean;
  reservationError: string | null;
  reservationResult: ReservationResponse | null;
  setReserving: (b: boolean) => void;
  setReservationError: (e: string | null) => void;
  setReservationResult: (r: ReservationResponse | null) => void;
  resetReservation: () => void;
}

export const useReservationStore = create<ReservationState>((set) => ({
  reserving: false,
  reservationError: null,
  reservationResult: null,
  setReserving: (b) => set({ reserving: b }),
  setReservationError: (e) => set({ reservationError: e }),
  setReservationResult: (r) => set({ reservationResult: r }),
  resetReservation: () =>
    set({ reserving: false, reservationError: null, reservationResult: null }),
}));
