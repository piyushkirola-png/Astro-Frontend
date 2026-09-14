import { useMemo, useState } from "react";
import {
  Activity,
  Loader2,
  AlertCircle,
  Clock,
  MessageSquare,
  IndianRupee,
  RefreshCw,
  Search,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/api-client";
import type { ApiResponse } from "../../../types/auth";
import type { AiUsageLog } from "../../../types/aiUsage";
import { useAiUsage } from "../../../api/queries/useAiUsage";
import type { ChatSessionSummary } from "../../../types/chat";

export default function AiUsage() {
  const { data, isLoading, isError, refetch, isRefetching } = useAiUsage();
  const [search, setSearch] = useState("");

  const sessionsQuery = useQuery({
    queryKey: ["chat", "sessions"],
    queryFn: async (): Promise<ChatSessionSummary[]> => {
      const res =
        await apiClient.get<ApiResponse<ChatSessionSummary[]>>(
          "/chat/sessions",
        );
      return res.data.data;
    },
    staleTime: 30 * 1000,
  });

  const sessionMap = useMemo(() => {
    const m = new Map<number, string>();
    (sessionsQuery.data ?? []).forEach((s) => m.set(s.id, s.title));
    return m;
  }, [sessionsQuery.data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter((log) => {
      const title = sessionMap.get(log.sessionId) ?? "";
      return title.toLowerCase().includes(q) || log.usageDate.includes(q);
    });
  }, [data, search, sessionMap]);

  const totals = useMemo(() => {
    if (!data) return { seconds: 0, rupees: 0, messages: 0 };
    return data.reduce(
      (acc, l) => ({
        seconds: acc.seconds + (l.secondsUsed ?? 0),
        rupees: acc.rupees + Number(l.rupeesDeducted ?? 0),
        messages: acc.messages + (l.messageCount ?? 0),
      }),
      { seconds: 0, rupees: 0, messages: 0 },
    );
  }, [data]);

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
        <p className="text-sm text-ink-700 mb-3">Failed to load usage logs</p>
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
            AI Usage Logs
          </h1>
          <p className="text-ink-500 mt-1 text-sm">
            See how your chat time has been used
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isRefetching}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border border-ink-200 text-sm font-semibold text-ink-700 hover:bg-ink-50 disabled:opacity-60 transition self-start sm:self-auto"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Time Used"
          value={formatSeconds(totals.seconds)}
          icon={<Clock className="h-4 w-4 text-white" />}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          label="Total Messages"
          value={totals.messages.toLocaleString("en-IN")}
          icon={<MessageSquare className="h-4 w-4 text-white" />}
          gradient="from-purple-500 to-indigo-500"
        />
        <StatCard
          label="Total Value Used"
          value={`₹${totals.rupees.toFixed(2)}`}
          icon={<IndianRupee className="h-4 w-4 text-white" />}
          gradient="from-green-500 to-emerald-500"
        />
      </div>

      {data.length === 0 ? (
        <div className="bg-white rounded-2xl border border-ink-100 p-12 text-center">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 mb-4">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-lg font-bold text-ink-900 mb-1">No usage yet</h2>
          <p className="text-sm text-ink-500 max-w-md mx-auto">
            Start a chat with Jyotish AI to see your usage logs here.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-ink-100 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by session title or date..."
                className="w-full rounded-xl border border-ink-200 pl-10 pr-3 py-2.5 text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="bg-ink-50/70 text-left text-[11px] uppercase tracking-wider text-ink-500 font-semibold">
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Session</th>
                    <th className="px-4 py-3 text-right">Messages</th>
                    <th className="px-4 py-3 text-right">Time Used</th>
                    <th className="px-4 py-3 text-right">₹ Deducted</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-sm text-ink-500"
                      >
                        No logs match "{search}"
                      </td>
                    </tr>
                  ) : (
                    filtered.map((log) => (
                      <tr
                        key={log.id}
                        className="border-t border-ink-100 hover:bg-ink-50/40 transition"
                      >
                        <td className="px-4 py-3 text-ink-700 whitespace-nowrap text-xs">
                          {formatDate(log.usageDate)}
                        </td>
                        <td className="px-4 py-3 text-ink-900 whitespace-nowrap">
                          {sessionMap.get(log.sessionId) ?? "Deleted session"}
                        </td>
                        <td className="px-4 py-3 text-ink-700 whitespace-nowrap text-right font-mono text-xs">
                          {log.messageCount ?? 0}
                        </td>
                        <td className="px-4 py-3 text-ink-700 whitespace-nowrap text-right font-mono text-xs">
                          {formatSeconds(log.secondsUsed ?? 0)}
                        </td>
                        <td className="px-4 py-3 text-ink-900 whitespace-nowrap text-right font-semibold">
                          ₹{Number(log.rupeesDeducted ?? 0).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  gradient,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-ink-500 uppercase tracking-wider">
          {label}
        </span>
        <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient}`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl lg:text-3xl font-bold text-ink-900">{value}</div>
    </div>
  );
}

function formatSeconds(secs: number): string {
  if (!secs) return "0:00";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
