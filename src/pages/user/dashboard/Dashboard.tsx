import {
  Sparkles,
  Calendar,
  Sun,
  Moon,
  TrendingUp,
  TrendingDown,
  Minus,
  Heart,
  Briefcase,
  Activity,
  ShieldPlus,
  Wallet,
  Plane,
  ArrowRight,
  Loader2,
  AlertCircle,
  Dices,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../lib/AuthContext";
import { useGetMe } from "../../../api/queries/useUser";
import { useDailyReading } from "../../../api/queries/useUserDashboard";
import userService from "../../../api/services/userService";
import type { MoodTrend } from "../../../types/dashboard";

const COLOR_SWATCH: Record<string, string> = {
  Red: "#dc2626",
  Pink: "#ec4899",
  Yellow: "#eab308",
  Blue: "#2563eb",
  White: "#f3f4f6",
  Orange: "#ea580c",
  Green: "#16a34a",
  Grey: "#9ca3af",
  Multicolor: "linear-gradient(90deg,#ef4444,#f59e0b,#10b981,#3b82f6,#8b5cf6)",
};

const TRAVEL_TIPS = [
  "Aaj yatra ke liye accha samay hai. Subah nikalna shubh rahega.",
  "Kisi purane sheher ki yaad aa sakti hai. Naye travel plan bana sakte hain.",
  "Aaj kisi nayi jagah ke baare me jaankari milegi.",
  "Chhoti yatra se mann khush rahega. Shopping ka mauka milega.",
  "Ghar se door koi acchi khabar milegi. Aaj travel related decision accha rahega.",
  "Aaj apne sapno ke destination ke baare me soch sakte hain.",
  "Kisi dost ya rishtedaar ke ghar jaane ka mauka milega.",
];

function getTravelTip(dateIso: string): string {
  const d = new Date(dateIso + "T00:00:00");
  const dayOfYear = Math.floor(
    (d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24),
  );
  return TRAVEL_TIPS[dayOfYear % TRAVEL_TIPS.length];
}

function TrendIcon({ trend }: { trend: MoodTrend }) {
  if (trend === "RISING") return <TrendingUp className="h-6 w-6 text-white" />;
  if (trend === "LOW") return <TrendingDown className="h-6 w-6 text-white" />;
  return <Minus className="h-6 w-6 text-white" />;
}

export default function UserDashboard() {
  const { user } = useAuth();
  const { data: me } = useGetMe();
  const { data, isLoading, isError, refetch } = useDailyReading();

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
          Couldn't load your daily reading
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

  const swatch = COLOR_SWATCH[data.luckyColor] || "#e5e7eb";
  const avatarSrc = userService.absoluteAvatarUrl(me?.avatarUrl);
  const travelTip = getTravelTip(data.readingDate);

  return (
    <div className="space-y-5">
      {/* ======================= ROW 1: HEADER ======================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="text-ink-500 mt-1 text-sm">
            Your cosmic journey continues today
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
            <Calendar className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-semibold text-ink-900">
              {new Date(data.readingDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
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
                {user?.name?.[0]?.toUpperCase() || "U"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ======================= ROW 2: DAILY READING ======================= */}
      <div className="bg-white rounded-2xl border border-ink-100 p-5">
        <h2 className="text-base font-bold text-ink-900 mb-4">
          Your Daily Reading
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Your Sign */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-4 text-white shadow-md">
            <div className="text-[10px] uppercase tracking-wider opacity-90 font-semibold mb-2">
              Your Sign
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{data.zodiacSign}</span>
              <span className="text-4xl opacity-95">{data.zodiacSymbol}</span>
            </div>
          </div>

          {/* Lucky Number */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-4 text-white shadow-md">
            <div className="text-[10px] uppercase tracking-wider opacity-90 font-semibold mb-2">
              Lucky Number
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{data.luckyNumber}</span>
              <Dices className="h-9 w-9 opacity-95" />
            </div>
          </div>

          {/* Lucky Color */}
          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-4 text-white shadow-md">
            <div className="text-[10px] uppercase tracking-wider opacity-90 font-semibold mb-2">
              Lucky Color
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold truncate">
                {data.luckyColor}
              </span>
              <div
                className="h-9 w-9 rounded-full border-2 border-white shadow-sm shrink-0"
                style={{
                  background:
                    typeof swatch === "string" && swatch.startsWith("linear")
                      ? swatch
                      : swatch,
                }}
              />
            </div>
          </div>

          {/* Energy Level */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white shadow-md">
            <div className="text-[10px] uppercase tracking-wider opacity-90 font-semibold mb-2">
              Energy Level
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{data.energyLevel}%</span>
              <TrendIcon trend={data.moodTrend} />
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/30 overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-all duration-700"
                style={{ width: `${data.energyLevel}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ======================= ROW 3: QUICK INSIGHTS ======================= */}
      <div>
        <h2 className="text-base font-bold text-ink-900 mb-3">
          Quick Insights
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Daily Horoscope */}
          <Link
            to="/user/horoscope"
            className="group bg-gradient-to-br from-orange-50 to-amber-100 rounded-2xl p-6 min-h-[140px] border border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shrink-0 group-hover:scale-110 transition-transform">
              <Sun className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-base font-bold text-ink-900">
                Daily Horoscope
              </div>
              <div className="text-xs text-ink-600 mt-1">
                Your cosmic forecast today
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-orange-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all shrink-0" />
          </Link>

          {/* Birth Chart */}
          <Link
            to="/user/kundali"
            className="group bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl p-6 min-h-[140px] border border-indigo-200 hover:border-indigo-400 hover:shadow-lg transition-all flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shrink-0 group-hover:scale-110 transition-transform">
              <Moon className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-base font-bold text-ink-900">
                Birth Chart
              </div>
              <div className="text-xs text-ink-600 mt-1">
                Explore your natal positions
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-indigo-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0" />
          </Link>

          {/* Ask AI Astrologer */}
          <Link
            to="/user/chat"
            className="group bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl p-6 min-h-[140px] border border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-base font-bold text-ink-900">
                Ask AI Astrologer
              </div>
              <div className="text-xs text-ink-600 mt-1">
                Get personal guidance
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-amber-500 group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        </div>
      </div>

      {/* ======================= ROW 4: 60:40 ======================= */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Today's Cosmic Forecast (60%) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-ink-100 p-6 min-h-[460px] relative overflow-hidden">
          <h2 className="text-2xl lg:text-3xl font-bold text-ink-900 mb-4">
            Today's Cosmic Forecast
          </h2>

          <div className="flex items-start gap-4">
            <p className="flex-1 text-sm text-ink-700 leading-relaxed whitespace-pre-wrap">
              {data.forecastText || "Aapka aaj ka forecast uplabdh nahi hai."}
            </p>

            <div className="shrink-0 hidden sm:flex items-center justify-center w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 relative">
              <div className="absolute inset-0 rounded-full border-2 border-amber-300/50" />
              <div className="absolute inset-3 rounded-full border border-amber-400/40" />
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                <span className="text-3xl lg:text-4xl">🪐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Highlights (40%) — 6 rows */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-ink-100 p-6 min-h-[460px]">
          <h2 className="text-2xl lg:text-3xl font-bold text-ink-900 mb-5">
            Daily Highlights
          </h2>

          <div className="space-y-4">
            {/* Love */}
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 shrink-0">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-base font-bold text-ink-900 mb-1">
                  Love
                </div>
                <div className="text-xs text-ink-600 leading-relaxed">
                  {data.loveText || "No update today"}
                </div>
              </div>
            </div>

            {/* Career */}
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shrink-0">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-base font-bold text-ink-900 mb-1">
                  Career
                </div>
                <div className="text-xs text-ink-600 leading-relaxed">
                  {data.careerText || "No update today"}
                </div>
              </div>
            </div>

            {/* Health */}
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 shrink-0">
                <ShieldPlus className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-base font-bold text-ink-900 mb-1">
                  Health
                </div>
                <div className="text-xs text-ink-600 leading-relaxed">
                  {data.wellnessText || "No update today"}
                </div>
              </div>
            </div>

            {/* Finance */}
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 shrink-0">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-base font-bold text-ink-900 mb-1">
                  Finance
                </div>
                <div className="text-xs text-ink-600 leading-relaxed">
                  {data.financeText || "No update today"}
                </div>
              </div>
            </div>

            {/* Travel */}
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 shrink-0">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-base font-bold text-ink-900 mb-1">
                  Travel
                </div>
                <div className="text-xs text-ink-600 leading-relaxed">
                  {travelTip}
                </div>
              </div>
            </div>

            {/* Wellness */}
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-green-500 to-lime-500 shrink-0">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-base font-bold text-ink-900 mb-1">
                  Wellness
                </div>
                <div className="text-xs text-ink-600 leading-relaxed">
                  {data.wellnessText ||
                    "Take care of your mind and body today."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
