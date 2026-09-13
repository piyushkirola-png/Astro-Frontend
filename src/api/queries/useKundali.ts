import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/api-client";
import type { ApiResponse } from "../../types/auth";
import type {
  DashaPeriod,
  KundaliBasic,
  KundaliChart,
  PlanetaryPosition,
} from "../../types/kundali";

export function useKundaliBasic() {
  return useQuery({
    queryKey: ["user", "kundali", "basic"],
    queryFn: async (): Promise<KundaliBasic> => {
      const res = await apiClient.get<ApiResponse<KundaliBasic>>(
        "/user/kundali/basic",
      );
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useKundaliCharts() {
  return useQuery({
    queryKey: ["user", "kundali", "charts"],
    queryFn: async (): Promise<KundaliChart[]> => {
      const res = await apiClient.get<ApiResponse<KundaliChart[]>>(
        "/user/kundali/charts",
      );
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function usePlanetaryPositions() {
  return useQuery({
    queryKey: ["user", "kundali", "planetary"],
    queryFn: async (): Promise<PlanetaryPosition[]> => {
      const res = await apiClient.get<ApiResponse<PlanetaryPosition[]>>(
        "/user/kundali/planetary",
      );
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useDashaPeriods() {
  return useQuery({
    queryKey: ["user", "kundali", "dasha"],
    queryFn: async (): Promise<DashaPeriod[]> => {
      const res = await apiClient.get<ApiResponse<DashaPeriod[]>>(
        "/user/kundali/dasha",
      );
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
