import {
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
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
  
  // Zodiac image path
  const zodiacImg = `/zodiac/${data.zodiacSign?.toLowerCase()}.png`;

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

      {/* DAILY READING */}
      <div className="bg-white rounded-2xl border border-ink-100 p-5">
        <h2 className="text-base font-bold text-ink-900 mb-4">
          Your Daily Reading
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Your Sign */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-4 text-white shadow-md relative overflow-hidden">
            <div className="text-[10px] uppercase tracking-wider opacity-90 font-semibold mb-2">
              Your Sign
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{data.zodiacSign}</span>
              <div className="h-10 w-10 shrink-0">
                <img 
                  src={zodiacImg} 
                  alt={data.zodiacSign}
                  className="h-full w-full object-contain drop-shadow-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).parentElement!.innerHTML = 
                      `<span class="text-4xl opacity-95">${data.zodiacSymbol}</span>`;
                  }}
                />
              </div>
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

      {/* ROW 3: QUICK INSIGHTS */}
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
            <div className="p-3 rounded-xl bg-ink-50 border border-orange-200 shrink-0 group-hover:scale-110 transition-transform overflow-hidden shadow-sm">
              <img 
                src="/general/time.png" 
                alt="Daily Horoscope"
                className="h-6 w-6 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-orange-500"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';
                }}
              />
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
            <div className="p-3 rounded-xl bg-ink-50 border border-indigo-200 shrink-0 group-hover:scale-110 transition-transform overflow-hidden shadow-sm">
              <img 
                src="/general/birth.png" 
                alt="Birth Chart"
                className="h-6 w-6 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-indigo-500"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';
                }}
              />
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
            <div className="p-3 rounded-xl bg-ink-50 border border-amber-200 shrink-0 group-hover:scale-110 transition-transform overflow-hidden shadow-sm">
              <img 
                src="/general/ai.png" 
                alt="Ask AI"
                className="h-6 w-6 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-amber-500"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>';
                }}
              />
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

      {/* ROW 4: 60:40 */}
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
              <div className="h-10 w-10 rounded-lg bg-ink-50 border border-pink-100 shrink-0 overflow-hidden shadow-sm">
                <img 
                  src="/general/love.png" 
                  alt="Love"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full bg-gradient-to-br from-pink-500 to-rose-500 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg></div>';
                  }}
                />
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
              <div className="h-10 w-10 rounded-lg bg-ink-50 border border-blue-100 shrink-0 overflow-hidden shadow-sm">
                <img 
                  src="/general/career.png" 
                  alt="Career"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg></div>';
                  }}
                />
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
              <div className="h-10 w-10 rounded-lg bg-ink-50 border border-teal-100 shrink-0 overflow-hidden shadow-sm">
                <img 
                  src="/general/health.png" 
                  alt="Health"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full bg-gradient-to-br from-teal-500 to-emerald-500 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="M12 8v4"></path><path d="M10 10h4"></path></svg></div>';
                  }}
                />
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
              <div className="h-10 w-10 rounded-lg bg-ink-50 border border-yellow-100 shrink-0 overflow-hidden shadow-sm">
                <img 
                  src="/general/finance.png" 
                  alt="Finance"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full bg-gradient-to-br from-yellow-500 to-amber-600 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg></div>';
                  }}
                />
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
              <div className="h-10 w-10 rounded-lg bg-ink-50 border border-sky-100 shrink-0 overflow-hidden shadow-sm">
                <img 
                  src="/general/travel.png" 
                  alt="Travel"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full bg-gradient-to-br from-sky-500 to-blue-600 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg></div>';
                  }}
                />
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
              <div className="h-10 w-10 rounded-lg bg-ink-50 border border-green-100 shrink-0 overflow-hidden shadow-sm">
                <img 
                  src="/general/wellness.png" 
                  alt="Wellness"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full bg-gradient-to-br from-green-500 to-lime-500 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path></svg></div>';
                  }}
                />
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