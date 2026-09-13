import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  CreditCard,
  Sparkles,
  Clock,
  FileText,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
} from "lucide-react";
import {
  useWalletPackages,
  useReportCategory,
  useHasPurchasedReport,
  usePaymentHistory,
} from "../../../api/queries/usePayments";
import {
  useInitiateWallet,
  useInitiateReport,
} from "../../../api/mutations/paymentMutations";
import paymentService from "../../../api/services/paymentService";
import GatewayPickerModal from "../../../components/payment/GatewayPickerModal";
import { useAuth } from '../../../lib/AuthContext';
import PaymentSuccessModal from "../../../components/payment/PaymentSuccessModal";
import type { PaymentRecord } from "../../../types/payment";

type PendingIntent =
  | { kind: "wallet"; packageId: number; amount: number; label: string }
  | { kind: "report"; amount: number; label: string }
  | null;

interface ReturnState {
  status: "SUCCESS" | "FAILED" | "PENDING" | null;
  amount: number | null;
  productLabel: string | null;
  secondsCredited: number | null;
  orderId: string | null;
}

export default function UserPayments() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const initialTab =
    (searchParams.get("tab") as "recharge" | "report" | "history" | null) ??
    "recharge";
  const initialFilter = searchParams.get("filter");

  const [tab, setTab] = useState<"recharge" | "report" | "history">(
    initialTab === "history" ||
      initialTab === "report" ||
      initialTab === "recharge"
      ? initialTab
      : "recharge",
  );
  const [walletFilter, setWalletFilter] = useState<boolean>(
    initialFilter === "wallet",
  );
  const [intent, setIntent] = useState<PendingIntent>(null);
  const [returnState, setReturnState] = useState<ReturnState>({
    status: null,
    amount: null,
    productLabel: null,
    secondsCredited: null,
    orderId: null,
  });

  const initiateWallet = useInitiateWallet();
  const initiateReport = useInitiateReport();

  useEffect(() => {
    const statusParam = searchParams.get("status");
    const merchantTxnIdParam = searchParams.get("merchant_txn_id");
    const transactionIdParam = searchParams.get("transaction_id");

    if (statusParam !== "return" && !merchantTxnIdParam && !transactionIdParam)
      return;

    const orderIdParam = searchParams.get("order_id") || merchantTxnIdParam;

    const run = async () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["chat"] });

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["payments"] });
      }, 3000);

      try {
        const fresh = await paymentService.getHistory();

        const latest = orderIdParam
          ? fresh.find((p) => p.gatewayOrderId === orderIdParam)
          : fresh[0];

        if (latest) {
          setReturnState({
            status:
              latest.status === "SUCCESS"
                ? "SUCCESS"
                : latest.status === "FAILED"
                  ? "FAILED"
                  : "PENDING",
            amount: Number(latest.amount),
            productLabel:
              latest.categoryCode === "REPORT"
                ? "Kundali Report"
                : latest.secondsCredited
                  ? `Chat Recharge · ${Math.round(
                    latest.secondsCredited / 60,
                  )} min`
                  : "Chat Recharge",
            secondsCredited: latest.secondsCredited,
            orderId: latest.gatewayOrderId,
          });
        } else {
          setReturnState({
            status: "PENDING",
            amount: null,
            productLabel: null,
            secondsCredited: null,
            orderId: orderIdParam,
          });
        }
      } catch {
        setReturnState({
          status: "PENDING",
          amount: null,
          productLabel: null,
          secondsCredited: null,
          orderId: orderIdParam,
        });
      }
    };

    run();

    const clean = new URLSearchParams(searchParams);
    clean.delete("status");
    clean.delete("order_id");
    clean.delete("transaction_id");
    clean.delete("merchant_txn_id");
    clean.delete("amount");
    clean.delete("paid_amount");
    clean.delete("payment_mode");
    clean.delete("timestamp");
    clean.delete("signature");
    setSearchParams(clean, { replace: true });
  }, [searchParams, setSearchParams, queryClient]);

  const closeModal = () => setIntent(null);

  const closeSuccessModal = () => {
    setReturnState({
      status: null,
      amount: null,
      productLabel: null,
      secondsCredited: null,
      orderId: null,
    });
  };

  const handleGatewaySelect = (gatewayCode: string) => {
    if (!intent) return;

    if (intent.kind === "wallet") {
      initiateWallet.mutate(
        { packageId: intent.packageId, gateway: gatewayCode },
        {
          onSuccess: (data) => {
            window.location.href = data.paymentLink;
          },
        },
      );
    } else {
      initiateReport.mutate(
        { gateway: gatewayCode },
        {
          onSuccess: (data) => {
            window.location.href = data.paymentLink;
          },
        },
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">
          Payments
        </h1>
        <p className="text-ink-500 mt-1 text-sm">
          Recharge your chat wallet or unlock your Kundali Report
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 p-2 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          <TabButton
            active={tab === "recharge"}
            onClick={() => setTab("recharge")}
            icon={<Clock className="h-4 w-4" />}
            label="Chat Recharge"
          />
          <TabButton
            active={tab === "report"}
            onClick={() => setTab("report")}
            icon={<FileText className="h-4 w-4" />}
            label="Kundali Report"
          />
          <TabButton
            active={tab === "history"}
            onClick={() => setTab("history")}
            icon={<CreditCard className="h-4 w-4" />}
            label="History"
          />
        </div>
      </div>

      {tab === "recharge" && <RechargeTab onBuy={setIntent} />}
      {tab === "report" && <ReportTab onBuy={setIntent} />}
      {tab === "history" && (
        <HistoryTab
          walletOnly={walletFilter}
          onClearFilter={() => {
            setWalletFilter(false);
            const clean = new URLSearchParams(searchParams);
            clean.delete("filter");
            setSearchParams(clean, { replace: true });
          }}
        />
      )}

      <GatewayPickerModal
        open={intent !== null}
        onClose={closeModal}
        amount={intent?.amount ?? 0}
        productLabel={intent?.label ?? ""}
        onSelect={handleGatewaySelect}
        loading={initiateWallet.isPending || initiateReport.isPending}
      />

      <PaymentSuccessModal
        open={returnState.status !== null}
        onClose={closeSuccessModal}
        status={returnState.status}
        amount={returnState.amount}
        productLabel={returnState.productLabel}
        secondsCredited={returnState.secondsCredited}
        orderId={returnState.orderId}
        onGoToHistory={() => setTab("history")}
      />

      {initiateWallet.isError && (
        <ErrorBanner
          message={
            (initiateWallet.error as any)?.response?.data?.message ||
            "Payment initiation failed. Please try again."
          }
        />
      )}
      {initiateReport.isError && (
        <ErrorBanner
          message={
            (initiateReport.error as any)?.response?.data?.message ||
            "Payment initiation failed. Please try again."
          }
        />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${active
          ? "bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-md"
          : "text-ink-600 hover:bg-ink-50"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

function RechargeTab({ onBuy }: { onBuy: (intent: PendingIntent) => void }) {
  const { data: packages, isLoading, isError, refetch } = useWalletPackages();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError || !packages) {
    return (
      <ErrorCard onRetry={() => refetch()} message="Failed to load packages" />
    );
  }

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-5 w-5" />
          <h2 className="text-base font-bold">Recharge Your Chat Wallet</h2>
        </div>
        <p className="text-sm text-white/90">
          Add more time with Jyotish AI. New users get 2 minutes free.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-2xl border border-ink-100 p-5 hover:border-primary-300 hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-ink-900">
                  {pkg.label}
                </div>
                <div className="text-[11px] text-ink-500">
                  {pkg.secondsCredited} seconds
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl font-bold text-ink-900">
                  ₹{pkg.amount}
                </span>
                <span className="text-[11px] text-ink-500 font-medium">
                  + 18% GST
                </span>
              </div>
              <div className="text-[11px] text-ink-500 mt-0.5">
                Total: ₹{(Number(pkg.amount) * 1.18).toFixed(2)}
              </div>
            </div>

            <button
              onClick={() =>
                onBuy({
                  kind: "wallet",
                  packageId: pkg.id,
                  amount: pkg.amount,
                  label: pkg.label,
                })
              }
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold hover:shadow-lg transition"
            >
              <CreditCard className="h-4 w-4" />
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportTab({ onBuy }: { onBuy: (intent: PendingIntent) => void }) {
  const { data: category, isLoading, isError, refetch } = useReportCategory();
  const { data: purchasedData } = useHasPurchasedReport();

  const purchased = purchasedData?.purchased ?? false;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError || !category) {
    return (
      <ErrorCard
        onRetry={() => refetch()}
        message="Failed to load report details"
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-ink-100 p-6 lg:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white shrink-0">
            <FileText className="h-7 w-7" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-ink-900">{category.name}</h2>
            <p className="text-sm text-ink-500 mt-1">
              {category.description ||
                "Full Vedic analysis of your birth chart"}
            </p>
          </div>
        </div>

        <div className="border-t border-ink-100 pt-5 mb-6">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-sm text-ink-500">One-time price</span>
            <div className="text-right">
              <span className="text-3xl font-bold text-ink-900">
                ₹{category.amount}
              </span>
              <span className="text-[11px] text-ink-500 font-medium ml-2">
                + 18% GST
              </span>
            </div>
          </div>
          <div className="text-right text-[11px] text-ink-500 mb-2">
            Total: ₹{(Number(category.amount) * 1.18).toFixed(2)}
          </div>
          <p className="text-xs text-ink-400">
            Lifetime access · Instant delivery to your email
          </p>
        </div>

        {purchased ? (
          <div className="bg-success-50 border border-success-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-success-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-success-700">
                Already purchased
              </div>
              <div className="text-xs text-success-600 mt-0.5">
                Your Kundali Report is unlocked. View it in the Kundali section.
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() =>
              onBuy({
                kind: "report",
                amount: category.amount,
                label: category.name,
              })
            }
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold hover:shadow-lg transition"
          >
            <CreditCard className="h-4 w-4" />
            Buy Now for ₹{(Number(category.amount) * 1.18).toFixed(2)}
          </button>
        )}
      </div>
    </div>
  );
}

function HistoryTab({
  walletOnly,
  onClearFilter,
}: {
  walletOnly?: boolean;
  onClearFilter?: () => void;
}) {
  const { data: history, isLoading, isError, refetch } = usePaymentHistory();
  const [downloading, setDownloading] = useState<string | null>(null);
  const { showToast } = useAuth();

  const handleDownload = async (orderId: string) => {
    setDownloading(orderId);
    try {
      await paymentService.downloadInvoice(orderId);
      showToast('Invoice downloaded successfully');
    } catch (e) {
      console.error('Download failed', e);
      showToast('Failed to download invoice');
    } finally {
      setDownloading(null);
    }
  };

  const filtered = walletOnly
    ? (history ?? []).filter((p) => p.categoryCode === "WALLET")
    : (history ?? []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError || !history) {
    return (
      <ErrorCard onRetry={() => refetch()} message="Failed to load history" />
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-ink-100 p-12 text-center">
        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4">
          <CreditCard className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-lg font-bold text-ink-900 mb-1">
          {walletOnly ? "No wallet recharges yet" : "No payments yet"}
        </h2>
        <p className="text-sm text-ink-500 max-w-md mx-auto">
          {walletOnly
            ? "Your wallet recharges will appear here."
            : "Your chat recharges and report purchases will appear here."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {walletOnly && (
        <div className="bg-primary-50 border border-primary-200 rounded-xl px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-primary-700 font-semibold">
            <CreditCard className="h-4 w-4" />
            Showing wallet recharges only
          </div>
          <button
            onClick={onClearFilter}
            className="text-xs font-semibold text-primary-600 hover:text-primary-800"
          >
            Clear filter
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="bg-ink-50/70 text-left text-[11px] uppercase tracking-wider text-ink-500 font-semibold">
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-ink-100 hover:bg-ink-50/40 transition"
                >
                  <td className="px-4 py-3 font-mono text-xs text-ink-700 whitespace-nowrap">
                    {row.gatewayOrderId}
                  </td>
                  <td className="px-4 py-3 text-ink-900 whitespace-nowrap">
                    {productLabel(row)}
                  </td>
                  <td className="px-4 py-3 font-semibold text-ink-900 whitespace-nowrap">
                    ₹{row.amount}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3 text-ink-600 whitespace-nowrap text-xs">
                    {formatDate(row.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleDownload(row.gatewayOrderId)}
                      disabled={downloading === row.gatewayOrderId}
                      title="Download Invoice"
                      className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-ink-200 text-ink-600 hover:bg-ink-50 hover:border-primary-300 hover:text-primary-600 disabled:opacity-50 transition"
                    >
                      {downloading === row.gatewayOrderId ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = status?.toUpperCase();
  if (s === "SUCCESS") {
    return (
      <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-green-100 text-green-700">
        Success
      </span>
    );
  }
  if (s === "FAILED") {
    return (
      <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-red-100 text-red-700">
        Failed
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-700">
      {status}
    </span>
  );
}

function ErrorCard({
  onRetry,
  message,
}: {
  onRetry: () => void;
  message: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-10 text-center">
      <AlertCircle className="h-7 w-7 text-danger-500 mx-auto mb-3" />
      <p className="text-sm text-ink-700 mb-3">{message}</p>
      <button
        onClick={onRetry}
        className="rounded-lg px-4 py-2 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50"
      >
        Retry
      </button>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="bg-danger-50 border border-danger-200 rounded-xl p-4 flex items-start gap-3">
      <XCircle className="h-5 w-5 text-danger-600 shrink-0 mt-0.5" />
      <div>
        <div className="text-sm font-semibold text-danger-700">
          Payment initiation failed
        </div>
        <div className="text-xs text-danger-600 mt-0.5">{message}</div>
      </div>
    </div>
  );
}

function productLabel(row: PaymentRecord): string {
  if (row.categoryCode === "REPORT") return "Kundali Report";
  if (row.categoryCode === "WALLET") {
    if (row.secondsCredited) {
      const mins = Math.round(row.secondsCredited / 60);
      return `Chat Recharge · ${mins} min`;
    }
    return "Chat Recharge";
  }
  return row.notes || "Payment";
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
