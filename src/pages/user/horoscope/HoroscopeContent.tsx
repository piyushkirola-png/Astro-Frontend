import {
  Loader2,
  AlertCircle,
  Dice5,
  Palette,
  Heart,
  Briefcase,
  ShieldPlus,
  Wallet,
} from "lucide-react";
import { useUserHoroscope } from "../../../api/queries/useUserHoroscope";
import type { HoroscopePeriod } from "../../../types/horoscope";

const COLOR_HEX: Record<string, string> = {
  Red: "#dc2626",
  Pink: "#ec4899",
  Yellow: "#eab308",
  Blue: "#2563eb",
  White: "#f3f4f6",
  Orange: "#ea580c",
  Green: "#16a34a",
  Grey: "#9ca3af",
  Purple: "#8b5cf6",
  Maroon: "#7f1d1d",
};

// Section image mapping
const SECTION_IMAGES: Record<string, string> = {
  Love: "/general/love.png",
  Career: "/general/career.png",
  Health: "/general/health.png",
  Money: "/general/money.png",
};

interface Props {
  period: HoroscopePeriod;
}

export default function HoroscopeContent({ period }: Props) {
  const { data, isLoading, isError, error, refetch } = useUserHoroscope(period);

  const showLucky =
    period === "today" || period === "yesterday" || period === "tomorrow";

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-ink-100 p-16 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-2xl border border-ink-100 p-10 text-center">
        <AlertCircle className="h-7 w-7 text-danger-500 mx-auto mb-3" />
        <h2 className="text-base font-bold text-ink-900 mb-1">
          Couldn't load horoscope
        </h2>
        <p className="text-xs text-ink-500 mb-4">
          {(error as any)?.response?.data?.message ||
            "Please try again in a moment."}
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

  if (!data) return null;

  return (
    <div className="space-y-5">
      {showLucky && (data.luckyNumber !== null || data.luckyColor) && (
        <div className="grid grid-cols-2 gap-4">
          {data.luckyNumber !== null && (
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-4 text-white shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Dice5 className="h-4 w-4 opacity-90" />
                <span className="text-[10px] uppercase tracking-wider opacity-90 font-semibold">
                  Lucky Number
                </span>
              </div>
              <div className="text-3xl font-bold">{data.luckyNumber}</div>
            </div>
          )}

          {data.luckyColor && (
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-4 text-white shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="h-4 w-4 opacity-90" />
                <span className="text-[10px] uppercase tracking-wider opacity-90 font-semibold">
                  Lucky Color
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold truncate">
                  {data.luckyColor}
                </span>
                <div
                  className="h-9 w-9 rounded-full border-2 border-white shadow-sm shrink-0"
                  style={{
                    background: COLOR_HEX[data.luckyColor] || "#e5e7eb",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <SectionCard
          image={SECTION_IMAGES["Love"]}
          fallbackIcon={<Heart className="h-5 w-5 text-white" />}
          iconBg="from-pink-500 to-rose-500"
          title="Love"
          text={data.loveText}
        />
        <SectionCard
          image={SECTION_IMAGES["Career"]}
          fallbackIcon={<Briefcase className="h-5 w-5 text-white" />}
          iconBg="from-blue-500 to-cyan-500"
          title="Career"
          text={data.careerText}
        />
        <SectionCard
          image={SECTION_IMAGES["Health"]}
          fallbackIcon={<ShieldPlus className="h-5 w-5 text-white" />}
          iconBg="from-teal-500 to-emerald-500"
          title="Health"
          text={data.healthText}
        />
        <SectionCard
          image={SECTION_IMAGES["Money"]}
          fallbackIcon={<Wallet className="h-5 w-5 text-white" />}
          iconBg="from-yellow-500 to-amber-600"
          title="Money"
          text={data.moneyText}
        />
      </div>
    </div>
  );
}

function SectionCard({
  image,
  fallbackIcon,
  iconBg,
  title,
  text,
}: {
  image?: string;
  fallbackIcon: React.ReactNode;
  iconBg: string;
  title: string;
  text: string | null;
}) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-5">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`h-10 w-10 rounded-xl bg-ink-50 border border-ink-100 flex items-center justify-center shrink-0 overflow-hidden shadow-sm`}
        >
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  parent.className = `h-10 w-10 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center shrink-0`;
                  parent.innerHTML = "";
                  parent.appendChild((() => {
                    const div = document.createElement("div");
                    if (title === "Love") div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>';
                    else if (title === "Career") div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>';
                    else if (title === "Health") div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="M12 8v4"></path><path d="M10 10h4"></path></svg>';
                    else if (title === "Money") div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>';
                    return div;
                  })(),
                  );
                }
              }}
            />
          ) : (
            <div
              className={`h-full w-full bg-gradient-to-br ${iconBg} flex items-center justify-center`}
            >
              {fallbackIcon}
            </div>
          )}
        </div>
        <h3 className="text-base font-bold text-ink-900">{title}</h3>
      </div>
      <p className="text-sm text-ink-700 leading-relaxed whitespace-pre-line">
        {text || "No update today."}
      </p>
    </div>
  );
}