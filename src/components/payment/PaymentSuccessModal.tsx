import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, XCircle, Clock, FileText, ArrowRight } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  status: 'SUCCESS' | 'FAILED' | 'PENDING' | null;
  amount: number | null;
  productLabel: string | null;
  secondsCredited?: number | null;
  orderId?: string | null;
  onGoToHistory?: () => void;
}

export default function PaymentSuccessModal({
  open,
  onClose,
  status,
  amount,
  productLabel,
  secondsCredited,
  orderId,
  onGoToHistory,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      onClose();
    }, 6000);
    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;

  const isSuccess = status === 'SUCCESS';
  const isFailed = status === 'FAILED';
  const isPending = status === 'PENDING' || !status;

  const mins = secondsCredited ? Math.round(secondsCredited / 60) : 0;

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pt-7 px-6">
          {isSuccess && (
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
          )}
          {isFailed && (
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 mb-4">
              <XCircle className="h-8 w-8 text-white" />
            </div>
          )}
          {isPending && (
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
          )}

          <h2 className="text-lg font-bold text-ink-900 mb-1">
            {isSuccess && 'Payment Successful'}
            {isFailed && 'Payment Failed'}
            {isPending && 'Payment Processing'}
          </h2>
          <p className="text-sm text-ink-500 mb-5">
            {isSuccess &&
              `Your ${productLabel || 'payment'} is confirmed.`}
            {isFailed && 'Something went wrong. Please try again.'}
            {isPending &&
              'Your payment is being processed. This may take a few seconds.'}
          </p>

          {isSuccess && amount !== null && (
            <div className="bg-ink-50 rounded-xl p-4 mb-5 text-left space-y-2">
              {productLabel && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-500 inline-flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    Product
                  </span>
                  <span className="font-semibold text-ink-900">
                    {productLabel}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-xs">
                <span className="text-ink-500">Amount Paid</span>
                <span className="font-bold text-ink-900">₹{amount}</span>
              </div>
              {secondsCredited ? (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-500">Time Added</span>
                  <span className="font-semibold text-green-700">
                    {secondsCredited}s · {mins} min
                  </span>
                </div>
              ) : null}
              {orderId && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-500">Order ID</span>
                  <span className="font-mono text-[10px] text-ink-700 truncate max-w-[180px]">
                    {orderId}
                  </span>
                </div>
              )}
            </div>
          )}

          {isPending && (
            <p className="text-xs text-ink-400 mb-5">
              Refresh the History tab in a few seconds to see the updated
              status.
            </p>
          )}
        </div>

        <div className="px-6 pb-6">
          {isSuccess && onGoToHistory ? (
            <button
              onClick={() => {
                onGoToHistory();
                onClose();
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold hover:shadow-lg transition"
            >
              View in History
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold hover:shadow-lg transition"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}