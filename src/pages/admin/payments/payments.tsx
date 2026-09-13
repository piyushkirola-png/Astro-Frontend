import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Loader2,
  AlertCircle,
  RefreshCw,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
} from "lucide-react";
import adminService from "../../../api/services/adminService";
import { useAuth } from "../../../lib/AuthContext";
import type { AdminPaymentRecord } from "../../../types/admin";

const PAGE_SIZE = 10;

export default function AdminPayments() {
  const { showToast } = useAuth();
  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ["admin", "payments", "all"],
    queryFn: () => adminService.listAllPayments(),
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
    staleTime: 10_000,
  });

  const [orderIdFilter, setOrderIdFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [gatewayFilter, setGatewayFilter] = useState("ALL");

  const [draftOrderId, setDraftOrderId] = useState("");
  const [draftStatus, setDraftStatus] = useState("ALL");
  const [draftGateway, setDraftGateway] = useState("ALL");

  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (orderId: string) => {
    setDownloading(orderId);
    try {
      await adminService.downloadInvoice(orderId);
      showToast("Invoice downloaded successfully");
    } catch (e) {
      console.error("Download failed", e);
      showToast("Failed to download invoice");
    } finally {
      setDownloading(null);
    }
  };

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!filterOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
        setDraftOrderId(orderIdFilter);
        setDraftStatus(statusFilter);
        setDraftGateway(gatewayFilter);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFilterOpen(false);
        setDraftOrderId(orderIdFilter);
        setDraftStatus(statusFilter);
        setDraftGateway(gatewayFilter);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, [filterOpen, orderIdFilter, statusFilter, gatewayFilter]);

  const openFilter = () => {
    setDraftOrderId(orderIdFilter);
    setDraftStatus(statusFilter);
    setDraftGateway(gatewayFilter);
    setFilterOpen(true);
  };

  const applyFilter = () => {
    setOrderIdFilter(draftOrderId);
    setStatusFilter(draftStatus);
    setGatewayFilter(draftGateway);
    setPage(1);
    setFilterOpen(false);
    showToast("Filter applied successfully");
  };

  const clearFilter = () => {
    setDraftOrderId("");
    setDraftStatus("ALL");
    setDraftGateway("ALL");
    setOrderIdFilter("");
    setStatusFilter("ALL");
    setGatewayFilter("ALL");
    setPage(1);
    setFilterOpen(false);
    showToast("Filter cleared successfully");
  };

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((p) => {
      if (
        orderIdFilter &&
        !p.gatewayOrderId.toLowerCase().includes(orderIdFilter.toLowerCase())
      ) {
        return false;
      }
      if (statusFilter !== "ALL" && p.status !== statusFilter) return false;
      if (gatewayFilter !== "ALL" && p.gateway !== gatewayFilter) return false;
      return true;
    });
  }, [data, orderIdFilter, statusFilter, gatewayFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const hasFilters =
    orderIdFilter !== "" || statusFilter !== "ALL" || gatewayFilter !== "ALL";

  const successCount = data?.filter((p) => p.status === "SUCCESS").length ?? 0;
  const pendingCount = data?.filter((p) => p.status === "PENDING").length ?? 0;
  const failedCount = data?.filter((p) => p.status === "FAILED").length ?? 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="bg-white rounded-2xl border border-ink-100 p-10 text-center">
        <AlertCircle className="h-7 w-7 text-danger-500 mx-auto mb-3" />
        <p className="text-sm text-ink-700 mb-3">Failed to load Payments</p>
        <button
          onClick={() => refetch()}
          className="rounded-lg px-4 py-2 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">
            Payments
          </h1>
          <p className="text-ink-500 mt-1 text-sm">
            All payment activity across the platform
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div ref={filterRef} className="relative">
            <button
              onClick={() => (filterOpen ? setFilterOpen(false) : openFilter())}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border text-sm font-semibold transition ${
                hasFilters
                  ? "border-primary-300 bg-primary-50 text-primary-700 hover:bg-primary-100"
                  : "border-ink-200 text-ink-700 hover:bg-ink-50"
              }`}
            >
              <Filter className="h-4 w-4" />
              Filter
              {hasFilters && (
                <span className="ml-1 h-4 w-4 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center">
                  !
                </span>
              )}
            </button>

            {filterOpen && (
              <div className="absolute right-0 mt-2 w-[520px] max-w-[90vw] bg-white rounded-2xl border border-ink-100 shadow-2xl z-50 p-4">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-ink-100">
                  <span className="text-xs font-bold text-ink-900 uppercase tracking-wider">
                    Filters
                  </span>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="p-1 rounded hover:bg-ink-100 text-ink-500"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-ink-500 uppercase tracking-wider mb-1">
                      Order ID
                    </label>
                    <input
                      type="text"
                      value={draftOrderId}
                      onChange={(e) => setDraftOrderId(e.target.value)}
                      placeholder="Search ORD-..."
                      className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-primary-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-ink-500 uppercase tracking-wider mb-1">
                      Status
                    </label>
                    <select
                      value={draftStatus}
                      onChange={(e) => setDraftStatus(e.target.value)}
                      className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-primary-400"
                    >
                      <option value="ALL">All</option>
                      <option value="SUCCESS">Success</option>
                      <option value="PENDING">Pending</option>
                      <option value="FAILED">Failed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-ink-500 uppercase tracking-wider mb-1">
                      Gateway
                    </label>
                    <select
                      value={draftGateway}
                      onChange={(e) => setDraftGateway(e.target.value)}
                      className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-primary-400"
                    >
                      <option value="ALL">All</option>
                      <option value="CASHFREE">Cashfree</option>
                      <option value="SABPAISA">SabPaisa</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-ink-100">
                  <button
                    onClick={clearFilter}
                    className="flex-1 rounded-lg px-3 py-2 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50 transition"
                  >
                    Clear
                  </button>
                  <button
                    onClick={applyFilter}
                    className="flex-1 rounded-lg px-3 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-xs font-semibold hover:shadow-md transition"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={async () => {
              await refetch();
              showToast("Refreshed successfully");
            }}
            disabled={isRefetching}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border border-ink-200 text-sm font-semibold text-ink-700 hover:bg-ink-50 disabled:opacity-60 transition"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-ink-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-ink-500 uppercase tracking-wider">
              Successful
            </span>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-ink-900">{successCount}</div>
        </div>

        <div className="bg-white rounded-2xl border border-ink-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-ink-500 uppercase tracking-wider">
              Pending
            </span>
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <div className="text-3xl font-bold text-ink-900">{pendingCount}</div>
        </div>

        <div className="bg-white rounded-2xl border border-ink-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-ink-500 uppercase tracking-wider">
              Failed
            </span>
            <AlertCircle className="h-5 w-5 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-ink-900">{failedCount}</div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-ink-100 p-12 text-center">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4">
            <CreditCard className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-lg font-bold text-ink-900 mb-1">
            {hasFilters ? "No matching transactions" : "No transactions yet"}
          </h2>
          <p className="text-sm text-ink-500 max-w-md mx-auto">
            {hasFilters
              ? "Try clearing filters or broadening your search."
              : "User payments will appear here once they start buying."}
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1080px] text-sm">
                <thead>
                  <tr className="bg-ink-50/70 text-left text-[11px] uppercase tracking-wider text-ink-500 font-semibold">
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Gateway</th>
                    <th className="px-4 py-3">UTR</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((row) => (
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
                      <td className="px-4 py-3 text-ink-600 whitespace-nowrap">
                        {row.gateway}
                      </td>
                      <td className="px-4 py-3 text-ink-600 font-mono text-xs whitespace-nowrap">
                        {row.utr || "—"}
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

          <div className="flex items-center justify-between bg-white rounded-2xl border border-ink-100 px-4 py-3">
            <div className="text-xs text-ink-500">
              Showing{" "}
              <span className="font-semibold text-ink-900">
                {(currentPage - 1) * PAGE_SIZE + 1}
              </span>
              {" – "}
              <span className="font-semibold text-ink-900">
                {Math.min(currentPage * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-ink-900">
                {filtered.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-ink-200 text-ink-700 hover:bg-ink-50 disabled:opacity-40 transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-semibold text-ink-700 px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-ink-200 text-ink-700 hover:bg-ink-50 disabled:opacity-40 transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}
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

function productLabel(row: AdminPaymentRecord): string {
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
