import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { placeService } from "../services/placeService";
import { usePlaceStore } from "../stores/placeStore";
import type { PlaceDetail } from "../types/place";

export const usePlaces = () => {
  const { places, loading, error, setPlaces, setLoading, setError } =
    usePlaceStore();

  const query = useQuery({
    queryKey: ["places"],
    queryFn: placeService.getPlaces,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  useEffect(() => {
    setLoading(query.isLoading);
    setError(query.error?.message || null);

    if (query.data?.data) {
      setPlaces(query.data.data);
    }
  }, [
    query.isLoading,
    query.error,
    query.data,
    setPlaces,
    setLoading,
    setError,
  ]);

  return {
    places,
    loading,
    error,
    refetch: query.refetch,
  };
};

export const usePlaceDetail = (
  id: string | number | undefined,
  date?: string
) => {
  const query = useQuery<{ data: PlaceDetail }, Error>({
    queryKey: ["placeDetail", id, date],
    queryFn: () => placeService.getPlaceDetail(id!, date),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  return {
    place: query.data?.data,
    loading: query.isLoading,
    error: query.error?.message || null,
    refetch: query.refetch,
  };
};
