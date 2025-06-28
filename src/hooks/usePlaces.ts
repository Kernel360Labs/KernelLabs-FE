import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { placeService } from "../services/placeService";
import { usePlaceStore } from "../stores/placeStore";

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
