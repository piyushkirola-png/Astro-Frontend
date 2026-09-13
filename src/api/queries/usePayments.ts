import { useQuery } from "@tanstack/react-query";
import paymentService from "../services/paymentService";

export function useWalletPackages() {
  return useQuery({
    queryKey: ["payments", "wallet", "packages"],
    queryFn: () => paymentService.getWalletPackages(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useReportCategory() {
  return useQuery({
    queryKey: ["payments", "report", "category"],
    queryFn: () => paymentService.getReportCategory(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useHasPurchasedReport() {
  return useQuery({
    queryKey: ["payments", "has-purchased", "REPORT"],
    queryFn: () => paymentService.hasPurchasedReport(),
    staleTime: 30 * 1000,
  });
}

export function useWalletBalance() {
  return useQuery({
    queryKey: ["payments", "wallet", "balance"],
    queryFn: () => paymentService.getWalletBalance(),
    staleTime: 10 * 1000,
    refetchInterval: 15 * 1000,
  });
}

export function usePaymentHistory() {
  return useQuery({
    queryKey: ["payments", "history"],
    queryFn: () => paymentService.getHistory(),
    staleTime: 30 * 1000,
  });
}
