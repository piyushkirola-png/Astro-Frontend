import { useMutation } from '@tanstack/react-query';
import paymentService from '../services/paymentService';
import type {
  InitiateReportRequest,
  InitiateWalletRequest,
} from '../../types/payment';

export function useInitiateReport() {
  return useMutation({
    mutationFn: (payload: InitiateReportRequest) =>
      paymentService.initiateReport(payload),
  });
}

export function useInitiateWallet() {
  return useMutation({
    mutationFn: (payload: InitiateWalletRequest) =>
      paymentService.initiateWallet(payload),
  });
}