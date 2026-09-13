import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/api-client";
import type { ApiResponse } from "../../types/auth";
import type { HoroscopeContent, HoroscopePeriod } from "../../types/horoscope";

export function useUserHoroscope(period: HoroscopePeriod) {
  return useQuery({
    queryKey: ["user", "horoscope", period],
    queryFn: async (): Promise<HoroscopeContent> => {
      const res = await apiClient.get<ApiResponse<HoroscopeContent>>(
        "/user/horoscope",
        { params: { period } },
      );
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
