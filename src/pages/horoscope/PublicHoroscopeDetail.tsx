import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Loader2,
  AlertCircle,
  ArrowLeft,
  Phone,
  Palette,
  Hash,
  Clock,
  Smile,
  Sun,
  Sparkles,
  Gem,
  Heart,
  TrendingUp,
  Briefcase,
  Activity,
} from "lucide-react";
import { usePublicHoroscopeDetail } from "../../api/queries/usePublicHoroscope";
import type { PublicHoroscopePeriod } from "./PublicHoroscopeHub";

interface Props {
  period: PublicHoroscopePeriod;
  periodLabel: string;
  urlSlug?: string;
}

export default function PublicHoroscopeDetail({
  period,
  periodLabel,
  urlSlug,
}: Props) {
  const { zodiac } = useParams<{ zodiac: string }>();
  const navigate = useNavigate();
  const slug = urlSlug ?? period;

  const { data, isLoading, isError, refetch } = usePublicHoroscopeDetail(
    period,
    zodiac,
  );

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-ink-50">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-ink-50 p-4">
        <div className="bg-white rounded-2xl border border-ink-100 p-10 text-center max-w-md">
          <AlertCircle className="h-7 w-7 text-danger-500 mx-auto mb-3" />
          <p className="text-sm text-ink-700 mb-4">Failed to load horoscope</p>
          <button
            onClick={() => refetch()}
            className="rounded-lg px-4 py-2 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50 mr-2"
          >
            Retry
          </button>
          <button
            onClick={() => navigate(`/horoscope/${slug}-horoscope`)}
            className="rounded-lg px-4 py-2 bg-primary-600 text-white text-xs font-semibold hover:bg-primary-700"
          >
            Back to Hub
          </button>
        </div>
      </div>
    );
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const displayName =
    data.zodiac.charAt(0) + data.zodiac.slice(1).toLowerCase();

  return (
    <>
      {/* HEADER */}
      <section className="relative pt-28 pb-10 overflow-hidden bg-ink-50">
        <div className="absolute inset-0 mesh-gradient opacity-60" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-400/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-400/15 blur-[120px] rounded-full" />

        <div className="relative container-8xl">
          <Link
            to={`/horoscope/${slug}-horoscope`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-500 hover:text-primary-600 mb-4 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to All Signs
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="shrink-0 flex items-center justify-center w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 shadow-2xl shadow-accent-500/30">
              <span className="text-5xl lg:text-6xl">{data.symbolEmoji}</span>
            </div>

            <div>
              <h1 className="text-3xl lg:text-5xl font-bold text-ink-900 tracking-tight">
                {displayName} {periodLabel} Horoscope
              </h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3">
                <span className="text-sm font-semibold text-primary-600">
                  {data.sanskritName} · {data.symbolEmoji}
                </span>
                <span className="text-xs text-ink-400">·</span>
                <span className="text-sm text-ink-500">{data.dateRange}</span>
              </div>
              <p className="text-sm text-ink-500 mt-2">{today}</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOROSCOPE MAIN TEXT */}
      <section className="py-12 bg-white">
        <div className="container-8xl max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold text-ink-900 mb-6">
            {displayName} Horoscope {periodLabel}
          </h2>

          <div className="bg-gradient-to-br from-amber-50/60 to-orange-50/40 border border-amber-100 rounded-2xl p-6 lg:p-8 mb-6">
            <p className="text-base lg:text-lg text-ink-700 leading-relaxed">
              {data.mainText}
            </p>
          </div>

          <button
            onClick={() =>
              navigate(
                `/chat-with-astrologer?sign=${data.zodiac.toLowerCase()}`,
              )
            }
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold hover:shadow-lg transition"
          >
            <Phone className="h-4 w-4" />
            Talk to {displayName} expert
          </button>
        </div>
      </section>

      {/* LUCKY TODAY */}
      <section className="py-12 bg-ink-50">
        <div className="container-8xl max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold text-ink-900 mb-6">
            Lucky {periodLabel}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <LuckyCard
              icon={<Palette className="h-5 w-5 text-white" />}
              label="Lucky Colour"
              value={data.luckyColor}
              gradient="from-pink-500 to-rose-500"
            />
            <LuckyCard
              icon={<Hash className="h-5 w-5 text-white" />}
              label="Lucky Number"
              value={String(data.luckyNumber)}
              gradient="from-blue-500 to-cyan-500"
            />
            <LuckyCard
              icon={<Clock className="h-5 w-5 text-white" />}
              label="Auspicious Time"
              value={data.auspiciousTime}
              gradient="from-purple-500 to-indigo-500"
            />
            <LuckyCard
              icon={<Smile className="h-5 w-5 text-white" />}
              label="Mood"
              value={data.mood}
              gradient="from-green-500 to-emerald-500"
            />
            <LuckyCard
              icon={<Sun className="h-5 w-5 text-white" />}
              label="Ruling Planet"
              value={data.rulingPlanet}
              gradient="from-orange-500 to-amber-500"
            />
            <LuckyCard
              icon={<Sparkles className="h-5 w-5 text-white" />}
              label="Symbol"
              value={data.symbol}
              gradient="from-teal-500 to-green-500"
            />
            <LuckyCard
              icon={<Sparkles className="h-5 w-5 text-white" />}
              label="Tarot Card"
              value={data.tarotCard}
              gradient="from-indigo-500 to-violet-500"
            />
            <LuckyCard
              icon={<Gem className="h-5 w-5 text-white" />}
              label="Lucky Stone"
              value={data.luckyStone}
              gradient="from-red-500 to-pink-500"
            />
          </div>
        </div>
      </section>

      {/* AREA OF LIFE */}
      <section className="py-12 bg-white">
        <div className="container-8xl max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold text-ink-900 mb-4">
            {periodLabel} by Area of Life
          </h2>
          <p className="text-sm text-ink-500 mb-8 max-w-2xl">
            How this period scores across your four key areas — love, finance,
            career and health. It shows where to lean in, where to hold back,
            and where the stars are quietly working in your favour.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            <AreaCard
              icon={<Heart className="h-5 w-5 text-white" />}
              iconGradient="from-pink-500 to-rose-500"
              title={`${displayName} Love`}
              score={data.loveScore}
              text={data.loveText}
            />
            <AreaCard
              icon={<TrendingUp className="h-5 w-5 text-white" />}
              iconGradient="from-green-500 to-emerald-500"
              title={`${displayName} Finance`}
              score={data.financeScore}
              text={data.financeText}
            />
            <AreaCard
              icon={<Briefcase className="h-5 w-5 text-white" />}
              iconGradient="from-blue-500 to-cyan-500"
              title={`${displayName} Career`}
              score={data.careerScore}
              text={data.careerText}
            />
            <AreaCard
              icon={<Activity className="h-5 w-5 text-white" />}
              iconGradient="from-orange-500 to-amber-500"
              title={`${displayName} Health`}
              score={data.healthScore}
              text={data.healthText}
            />
          </div>
        </div>
      </section>
    </>
  );
}

// SUB-COMPONENTS

function LuckyCard({
  icon,
  label,
  value,
  gradient,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  gradient: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-4 hover:border-accent-300 hover:shadow-md transition">
      <div
        className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${gradient} mb-3`}
      >
        {icon}
      </div>
      <div className="text-[10px] uppercase tracking-wider font-bold text-ink-400 mb-1">
        {label}
      </div>
      <div className="text-sm font-bold text-ink-900 leading-snug">
        {value}
      </div>
    </div>
  );
}

function AreaCard({
  icon,
  iconGradient,
  title,
  score,
  text,
}: {
  icon: React.ReactNode;
  iconGradient: string;
  title: string;
  score: number;
  text: string;
}) {
  return (
    <div className="bg-ink-50 rounded-2xl border border-ink-100 p-5 lg:p-6 hover:border-accent-300 hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${iconGradient}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-ink-900">{title}</h3>
        </div>
        <div className="text-2xl font-bold text-ink-900">{score}%</div>
      </div>

      <div className="w-full h-1.5 rounded-full bg-ink-200 overflow-hidden mb-4">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${iconGradient} transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="text-xs lg:text-sm text-ink-600 leading-relaxed">
        {text}
      </p>
    </div>
  );
}