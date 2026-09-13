import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/api-client";
import type { ApiResponse } from "../../types/auth";
import type {
  ReportDosha,
  ReportGemstone,
  ReportGeneral,
  ReportRemedy,
} from "../../types/report";

export function useReportGeneral(enabled: boolean) {
  return useQuery({
    queryKey: ["report", "general"],
    queryFn: async (): Promise<ReportGeneral[]> => {
      const res = await apiClient.get<ApiResponse<ReportGeneral[]>>(
        "/user/report/general",
      );
      return res.data.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}

export function useReportRemedies(enabled: boolean) {
  return useQuery({
    queryKey: ["report", "remedies"],
    queryFn: async (): Promise<ReportRemedy[]> => {
      const res = await apiClient.get<ApiResponse<ReportRemedy[]>>(
        "/user/report/remedies",
      );
      return res.data.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}

export function useReportDoshas(enabled: boolean) {
  return useQuery({
    queryKey: ["report", "doshas"],
    queryFn: async (): Promise<ReportDosha[]> => {
      const res = await apiClient.get<ApiResponse<ReportDosha[]>>(
        "/user/report/doshas",
      );
      return res.data.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}

export function useReportGemstones(enabled: boolean) {
  return useQuery({
    queryKey: ["report", "gemstones"],
    queryFn: async (): Promise<ReportGemstone[]> => {
      const res = await apiClient.get<ApiResponse<ReportGemstone[]>>(
        "/user/report/gemstones",
      );
      return res.data.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
