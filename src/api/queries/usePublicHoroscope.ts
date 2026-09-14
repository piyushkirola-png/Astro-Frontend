import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/api-client";
import type { ApiResponse } from "../../types/auth";
import type {
  PublicHoroscopeCard,
  PublicHoroscopeDetail,
} from "../../types/horoscope";

export function usePublicHoroscopeHub(period: string = "today") {
  return useQuery({
    queryKey: ["public", "horoscope", "hub", period],
    queryFn: async (): Promise<PublicHoroscopeCard[]> => {
      const res = await apiClient.get<ApiResponse<PublicHoroscopeCard[]>>(
        `/horoscope/${period}`,
      );
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublicHoroscopeDetail(
  period: string,
  zodiac: string | undefined,
) {
  return useQuery({
    queryKey: ["public", "horoscope", "detail", period, zodiac],
    queryFn: async (): Promise<PublicHoroscopeDetail> => {
      const res = await apiClient.get<ApiResponse<PublicHoroscopeDetail>>(
        `/horoscope/${period}/${zodiac}`,
      );
      return res.data.data;
    },
    enabled: !!zodiac,
    staleTime: 5 * 60 * 1000,
  });
}