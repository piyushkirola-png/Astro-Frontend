import { Link } from "react-router-dom";
import {
  Wallet as WalletIcon,
  Clock,
  Plus,
  ArrowRight,
  Loader2,
  AlertCircle,
  CreditCard,
} from "lucide-react";
import {
  useWalletBalance,
  usePaymentHistory,
} from "../../../api/queries/usePayments";
import type { PaymentRecord } from "../../../types/payment";

export default function Wallet() {
  const { data: balance, isLoading: balanceLoading } = useWalletBalance();
  const { data: history, isLoading: historyLoading } = usePaymentHistory();

  const walletHistory: PaymentRecord[] = (history ?? [])
    .filter((p) => p.categoryCode === "WALLET" && p.status === "SUCCESS")
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">Wallet</h1>
        <p className="text-ink-500 mt-1 text-sm">
          Your chat balance and recharge history
        </p>
      </div>

      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-11 w-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <WalletIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-white/70 font-semibold">
                Available Balance
              </div>
              <div className="text-[10px] text-white/60">
                Chat time with Jyotish AI
              </div>
            </div>
          </div>

          {balanceLoading ? (
            <div className="flex items-center gap-3 h-20">
              <Loader2 className="h-6 w-6 animate-spin text-white/80" />
            </div>
          ) : (
            <div className="mb-6">
              <div className="text-5xl lg:text-6xl font-bold tracking-tight">
                ₹{Number(balance?.valueRupees ?? 0).toFixed(2)}
              </div>
              <div className="text-white/70 text-sm mt-1">
                {balance?.minutes ?? 0} min {balance?.remainingSeconds ?? 0}s
                remaining
              </div>
            </div>
          )}

          <Link
            to="/user/payments"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-white text-primary-700 text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Plus className="h-4 w-4" />
            Recharge Wallet
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-100">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-ink-500" />
            <h2 className="text-sm font-bold text-ink-900">Recent Recharges</h2>
          </div>
          <Link
            to="/user/payments?tab=history&filter=wallet"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700"
          >
            View All
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {historyLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-5 w-5 animate-spin text-primary-500" />
          </div>
        ) : walletHistory.length === 0 ? (
          <div className="p-10 text-center">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 mb-4">
              <CreditCard className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-base font-bold text-ink-900 mb-1">
              No recharges yet
            </h3>
            <p className="text-sm text-ink-500 max-w-sm mx-auto mb-5">
              Recharge your wallet to keep chatting with Jyotish AI.
            </p>
            <Link
              to="/user/payments"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold hover:shadow-lg transition"
            >
              <Plus className="h-4 w-4" />
              Recharge Now
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-ink-100">
            {walletHistory.map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-between px-5 py-4 hover:bg-ink-50/40 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white shrink-0">
                    <Plus className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-ink-900 truncate">
                      {row.secondsCredited
                        ? `+${Math.round(row.secondsCredited / 60)} min`
                        : "Recharge"}
                    </div>
                    <div className="text-[11px] text-ink-500 font-mono truncate">
                      {row.gatewayOrderId}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-ink-900">
                    ₹{row.amount}
                  </div>
                  <div className="text-[11px] text-ink-500">
                    {formatDate(row.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
