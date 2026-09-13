import {
  Users,
  IndianRupee,
  MessageSquare,
  CreditCard,
  TrendingUp,
  BarChart3,
  Loader2,
  AlertCircle,
  Calendar,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { useAuth } from "../../../lib/AuthContext";
import { useGetMe } from "../../../api/queries/useUser";
import { useAdminStats } from "../../../api/queries/useAdmin";
import userService from "../../../api/services/userService";

const BAR_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

const PIE_COLORS: Record<string, string> = {
  SUCCESS: "#22c55e",
  PENDING: "#eab308",
  FAILED: "#ef4444",
};

function fmtDay(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

function fmtCurrency(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function fmtStatusLabel(s: string) {
  if (!s) return "Unknown";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const { data: me } = useGetMe();
  const { data, isLoading, isError, refetch } = useAdminStats();

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
        <h2 className="text-base font-bold text-ink-900 mb-1">
          Couldn't load dashboard stats
        </h2>
        <p className="text-xs text-ink-500 mb-4">
          Please try again in a moment.
        </p>
        <button
          onClick={() => refetch()}
          className="rounded-lg px-4 py-2 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50"
        >
          Retry
        </button>
      </div>
    );
  }

  const revenueData = data.revenueByDay.map((d) => ({
    day: fmtDay(d.date),
    value: d.value,
  }));

  const aiUsageData = data.aiUsageByDay.map((d) => ({
    day: fmtDay(d.date),
    value: d.value,
  }));

  const durationData = (data.revenueByDuration ?? []).map((d) => ({
    label: d.label,
    value: d.value,
  }));

  const statusData = (data.statusDistribution ?? []).map((d) => ({
    status: d.status,
    label: fmtStatusLabel(d.status),
    value: d.value,
  }));

  const maxAi = Math.max(...aiUsageData.map((d) => d.value), 5);
  const maxRev = Math.max(...revenueData.map((d) => d.value), 100);
  const maxDuration = Math.max(...durationData.map((d) => d.value), 100);

  const avatarSrc = userService.absoluteAvatarUrl(me?.avatarUrl);
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">
            Welcome back, {user?.name || "Admin"}
          </h1>
          <p className="text-ink-500 mt-1 text-sm">
            Here's an overview of your platform
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
            <Calendar className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-semibold text-ink-900">{today}</span>
          </div>
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary-300 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm font-bold text-white">
                {user?.name?.[0]?.toUpperCase() || "A"}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"
          value={data.totalUsers.toLocaleString("en-IN")}
          icon={<Users className="h-4 w-4 text-white" />}
          gradient="from-blue-500 to-cyan-500"
          hint="Registered users"
        />

        <StatCard
          label="Total Revenue"
          value={fmtCurrency(data.totalRevenue)}
          icon={<IndianRupee className="h-4 w-4 text-white" />}
          gradient="from-green-500 to-emerald-500"
          hint={
            data.totalRevenue === 0 ? "No payments yet" : "Lifetime earnings"
          }
        />

        <StatCard
          label="Total Messages"
          value={data.totalMessages.toLocaleString("en-IN")}
          icon={<MessageSquare className="h-4 w-4 text-white" />}
          gradient="from-purple-500 to-indigo-500"
          hint="All-time chat messages"
        />

        <StatCard
          label="Total Payments"
          value={data.totalPayments.toLocaleString("en-IN")}
          icon={<CreditCard className="h-4 w-4 text-white" />}
          gradient="from-amber-500 to-orange-500"
          hint="All payment attempts"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-ink-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-ink-900 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary-500" />
                Revenue Overview
              </h2>
              <p className="text-[11px] text-ink-500 mt-0.5">Last 7 days</p>
            </div>
          </div>

          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <LineChart
                data={revenueData}
                margin={{ top: 5, right: 10, bottom: 20, left: -10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                  label={{
                    value: "Date",
                    position: "insideBottom",
                    offset: -10,
                    style: { fontSize: 11, fill: "#6b7280" },
                  }}
                />
                <YAxis
                  domain={[0, maxRev]}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                  label={{
                    value: "Revenue (₹)",
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      fontSize: 11,
                      fill: "#6b7280",
                      textAnchor: "middle",
                    },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: "1px solid #e5e5e5",
                  }}
                  formatter={(v: any) => [`₹${v}`, "Revenue"]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#b8862a"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#b8862a" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-ink-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-ink-900 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary-500" />
                AI Usage
              </h2>
              <p className="text-[11px] text-ink-500 mt-0.5">
                User messages · Last 7 days
              </p>
            </div>
          </div>

          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <BarChart
                data={aiUsageData}
                margin={{ top: 5, right: 10, bottom: 20, left: -10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                  label={{
                    value: "Date",
                    position: "insideBottom",
                    offset: -10,
                    style: { fontSize: 11, fill: "#6b7280" },
                  }}
                />
                <YAxis
                  domain={[0, maxAi]}
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                  label={{
                    value: "Messages",
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      fontSize: 11,
                      fill: "#6b7280",
                      textAnchor: "middle",
                    },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: "1px solid #e5e5e5",
                  }}
                  formatter={(v: any) => [v, "Messages"]}
                />
                <Bar
                  dataKey="value"
                  fill="#b8862a"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-ink-100 p-5">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-ink-900 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary-500" />
              Revenue by Chat Duration
            </h2>
            <p className="text-[11px] text-ink-500 mt-0.5">
              Which minutes users buy most
            </p>
          </div>

          {durationData.length === 0 ||
          durationData.every((d) => d.value === 0) ? (
            <div className="h-[260px] flex items-center justify-center text-center">
              <div>
                <BarChart3 className="h-8 w-8 text-ink-300 mx-auto mb-2" />
                <p className="text-sm text-ink-500">No wallet recharges yet</p>
                <p className="text-[11px] text-ink-400 mt-1">
                  Data will appear once users start buying
                </p>
              </div>
            </div>
          ) : (
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart
                  data={durationData}
                  margin={{ top: 5, right: 10, bottom: 20, left: -10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: "Duration Slab",
                      position: "insideBottom",
                      offset: -10,
                      style: { fontSize: 11, fill: "#6b7280" },
                    }}
                  />
                  <YAxis
                    domain={[0, maxDuration]}
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: "Revenue (₹)",
                      angle: -90,
                      position: "insideLeft",
                      style: {
                        fontSize: 11,
                        fill: "#6b7280",
                        textAnchor: "middle",
                      },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      fontSize: 12,
                      borderRadius: 8,
                      border: "1px solid #e5e5e5",
                    }}
                    formatter={(v: any) => [`₹${v}`, "Revenue"]}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                    {durationData.map((_, idx) => (
                      <Cell
                        key={idx}
                        fill={BAR_COLORS[idx % BAR_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-ink-100 p-5">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-ink-900 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary-500" />
              Payment Status Distribution
            </h2>
            <p className="text-[11px] text-ink-500 mt-0.5">
              All-time payment outcomes
            </p>
          </div>

          {statusData.length === 0 || statusData.every((d) => d.value === 0) ? (
            <div className="h-[260px] flex items-center justify-center text-center">
              <div>
                <CreditCard className="h-8 w-8 text-ink-300 mx-auto mb-2" />
                <p className="text-sm text-ink-500">No payments yet</p>
                <p className="text-[11px] text-ink-400 mt-1">
                  Data will appear once payments are made
                </p>
              </div>
            </div>
          ) : (
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                    label={(entry: any) => `${entry.label}: ${entry.value}`}
                    labelLine={false}
                  >
                    {statusData.map((entry, idx) => (
                      <Cell
                        key={idx}
                        fill={PIE_COLORS[entry.status] || "#94a3b8"}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      fontSize: 12,
                      borderRadius: 8,
                      border: "1px solid #e5e5e5",
                    }}
                    formatter={(v: any) => [v, "Payments"]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  gradient,
  hint,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
  hint?: string;
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
      <div className="text-3xl font-bold text-ink-900">{value}</div>
      {hint && <div className="text-xs text-ink-400 mt-1">{hint}</div>}
    </div>
  );
}
