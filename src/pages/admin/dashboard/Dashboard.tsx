import {
  Users,
  IndianRupee,
  Activity,
  TrendingUp,
  BarChart3,
  ArrowRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
} from 'recharts';
import { useAuth } from '../../../lib/AuthContext';
import { useAdminStats } from '../../../api/queries/useAdmin';

// Helpers
function fmtDay(iso: string) {
  // "2026-09-05" → "05 Sep"
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

function fmtCurrency(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const { data, isLoading, isError, refetch } = useAdminStats();

  // Loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    );
  }

  // Error
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

  // Chart data
  const revenueData = data.revenueByDay.map((d) => ({
    day: fmtDay(d.date),
    value: d.value,
  }));

  const aiUsageData = data.aiUsageByDay.map((d) => ({
    day: fmtDay(d.date),
    value: d.value,
  }));

  const maxAi = Math.max(...aiUsageData.map((d) => d.value), 5);
  const maxRev = Math.max(...revenueData.map((d) => d.value), 100);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">
          Welcome back, {user?.name || 'Admin'}
        </h1>
        <p className="text-ink-500 mt-1 text-sm">
          Here's an overview of your platform
        </p>
      </div>

      {/* ---------- Stat Cards ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Users */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-ink-500 uppercase tracking-wider">
              Total Users
            </span>
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <Users className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="text-3xl font-bold text-ink-900">
            {data.totalUsers.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-ink-400 mt-1">
            All registered accounts
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-ink-500 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
              <IndianRupee className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="text-3xl font-bold text-ink-900">
            {fmtCurrency(data.totalRevenue)}
          </div>
          <div className="text-xs text-ink-400 mt-1">
            {data.totalRevenue === 0
              ? 'Payments module coming soon'
              : 'Lifetime earnings'}
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-ink-500 uppercase tracking-wider">
              Active Sessions
            </span>
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
              <Activity className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="text-3xl font-bold text-ink-900">
            {data.activeSessions.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-ink-400 mt-1">
            Total chat sessions
          </div>
        </div>
      </div>

      {/* ---------- Charts ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Overview — Line Chart */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-ink-900 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary-500" />
                Revenue Overview
              </h2>
              <p className="text-[11px] text-ink-500 mt-0.5">
                Last 7 days
              </p>
            </div>
          </div>

          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <LineChart
                data={revenueData}
                margin={{ top: 5, right: 10, bottom: 0, left: -20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, maxRev]}
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: '1px solid #e5e5e5',
                  }}
                  formatter={(v: any) => [`₹${v}`, 'Revenue']}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#b8862a"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#b8862a' }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {data.totalRevenue === 0 && (
            <p className="text-[11px] text-center text-ink-400 mt-2">
              Chart will populate once payments are tracked.
            </p>
          )}
        </div>

        {/* AI Usage — Bar Chart */}
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

          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <BarChart
                data={aiUsageData}
                margin={{ top: 5, right: 10, bottom: 0, left: -20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, maxAi]}
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: '1px solid #e5e5e5',
                  }}
                  formatter={(v: any) => [v, 'Messages']}
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

      {/* ---------- Quick Links ---------- */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link
          to="/admin/users"
          className="group bg-white rounded-2xl p-5 border border-ink-100 hover:border-accent-300 hover:shadow-lg transition-all flex items-center justify-between"
        >
          <div>
            <h3 className="text-base font-bold text-ink-900">Manage Users</h3>
            <p className="text-sm text-ink-500 mt-1">
              View, edit, and manage all users
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-ink-400 group-hover:text-accent-500 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          to="/admin/profile"
          className="group bg-white rounded-2xl p-5 border border-ink-100 hover:border-accent-300 hover:shadow-lg transition-all flex items-center justify-between"
        >
          <div>
            <h3 className="text-base font-bold text-ink-900">My Profile</h3>
            <p className="text-sm text-ink-500 mt-1">
              Update your admin information
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-ink-400 group-hover:text-accent-500 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
}