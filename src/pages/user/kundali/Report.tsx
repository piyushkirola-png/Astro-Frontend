import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Lock,
  FileText,
  Loader2,
  AlertCircle,
  Heart,
  Shield,
  Gem,
  ArrowRight,
} from "lucide-react";
import {
  useReportGeneral,
  useReportRemedies,
  useReportDoshas,
  useReportGemstones,
} from "../../../api/queries/useReport";
import { useHasPurchasedReport } from "../../../api/queries/usePayments";

type Tab = "general" | "remedies" | "dosha" | "gemstone";

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: "general", label: "General", icon: FileText },
  { id: "remedies", label: "Remedies", icon: Heart },
  { id: "dosha", label: "Dosha", icon: Shield },
  { id: "gemstone", label: "Gemstone", icon: Gem },
];

// Helper to convert DB names to image paths reliably
const getDoshaImage = (doshaName: string) => {
  if (!doshaName) return null;
  const normalized = doshaName.toLowerCase().replace(/\s+/g, "-");
  // Map known DB names to your exact filenames
  if (normalized.includes("mangal") || normalized.includes("manglik")) return "/dosha/mangal-dosha.png";
  if (normalized.includes("kaal") || normalized.includes("sarp")) return "/dosha/kaalsharp-dosha.png";
  if (normalized.includes("pitru")) return "/dosha/pitru-dosha.png";
  if (normalized.includes("sade") || normalized.includes("sati")) return "/dosha/sadesati-dosha.png";
  if (normalized.includes("grahan")) return "/dosha/grahana-dosha.png";
  
  // Fallback if the name matches exactly
  return `/dosha/${normalized}.png`;
};

const getGemstoneImage = (gemstoneName: string) => {
  if (!gemstoneName) return null;
  const normalized = gemstoneName.toLowerCase().replace(/\s+/g, "-");
  // List of your exact filenames
  const validGemstones = [
    "amethyst", "blue-sapphire", "citrine", "diamond", "emerald",
    "green-tourmaline", "moonstone", "opal", "pearl", "peridot",
    "red-coral", "red-garnet", "ruby", "yellow-sapphire"
  ];
  
  if (validGemstones.includes(normalized)) {
    return `/gemstone/${normalized}.png`;
  }
  
  // Basic fuzzy matching for common variations
  if (normalized.includes("sapphire")) {
    if (normalized.includes("blue")) return "/gemstone/blue-sapphire.png";
    if (normalized.includes("yellow")) return "/gemstone/yellow-sapphire.png";
  }
  if (normalized.includes("coral")) return "/gemstone/red-coral.png";
  if (normalized.includes("garnet")) return "/gemstone/red-garnet.png";
  if (normalized.includes("tourmaline")) return "/gemstone/green-tourmaline.png";

  // Fallback attempt
  return `/gemstone/${normalized}.png`;
};

export default function KundaliReport() {
  const [tab, setTab] = useState<Tab>("general");
  const navigate = useNavigate();
  const { data: purchasedData, isLoading: purchaseLoading } =
    useHasPurchasedReport();

  const purchased = purchasedData?.purchased ?? false;

  if (purchaseLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!purchased) {
    return <Paywall navigate={navigate} />;
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">
          Kundali Report
        </h1>
        <p className="text-ink-500 mt-1 text-sm">
          Your complete Vedic analysis — 4 detailed sections
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 p-2 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {TABS.map((t) => {
            const active = tab === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  active
                    ? "bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-md"
                    : "text-ink-600 hover:bg-ink-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-[400px]">
        {tab === "general" && <GeneralTab />}
        {tab === "remedies" && <RemediesTab />}
        {tab === "dosha" && <DoshaTab />}
        {tab === "gemstone" && <GemstoneTab />}
      </div>
    </div>
  );
}

function Paywall({ navigate }: { navigate: any }) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">
          Kundali Report
        </h1>
        <p className="text-ink-500 mt-1 text-sm">
          Unlock your complete Vedic analysis
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-accent-500 p-6 lg:p-8 text-white">
          <div className="inline-flex p-3 rounded-2xl bg-white/20 mb-4">
            <Lock className="h-7 w-7" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">
            Unlock Your Full Kundali Report
          </h2>
          <p className="text-white/90 text-sm lg:text-base max-w-lg">
            Get deep insights into your destiny, remedies, doshas, and lucky
            gemstones — all in one comprehensive report.
          </p>
        </div>

        <div className="p-6 lg:p-8">
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <Feature
              title="General Analysis"
              desc="Career, love, health, wealth, and personality insights"
            />
            <Feature
              title="Personalized Remedies"
              desc="Vedic remedies tailored to your chart"
            />
            <Feature
              title="Dosha Detection"
              desc="Identify Mangal, Kaal Sarp, Sade Sati, and more"
            />
            <Feature
              title="Gemstone Guide"
              desc="Which gemstone to wear, how, and when"
            />
          </div>

          <div className="flex items-baseline justify-between border-t border-ink-100 pt-6 mb-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold">
                One-time price
              </div>
              <div className="flex items-baseline gap-2 flex-wrap mt-1">
                <span className="text-3xl font-bold text-ink-900">₹500</span>
                <span className="text-[11px] text-ink-500 font-medium">
                  + 18% GST
                </span>
              </div>
              <div className="text-[11px] text-ink-500 mt-0.5">
                Total: ₹590.00
              </div>
            </div>
            <div className="text-right text-xs text-ink-500">
              Lifetime access
              <br />
              Instant delivery
            </div>
          </div>

          <button
            onClick={() => navigate("/user/payments")}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold hover:shadow-lg transition"
          >
            <Sparkles className="h-4 w-4" />
            Buy Report for ₹590.00
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="text-center text-xs text-ink-400 mt-3">
            Secure payment via UPI
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white shrink-0 mt-0.5">
        <Sparkles className="h-4 w-4" />
      </div>
      <div>
        <div className="text-sm font-bold text-ink-900">{title}</div>
        <div className="text-xs text-ink-500 mt-0.5">{desc}</div>
      </div>
    </div>
  );
}

function GeneralTab() {
  const { data, isLoading, isError, refetch } = useReportGeneral(true);

  if (isLoading) return <Loading />;
  if (isError || !data) return <ErrorCard onRetry={() => refetch()} />;
  if (data.length === 0)
    return <EmptyCard message="No general analysis available yet." />;

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl border border-ink-100 p-5 lg:p-6"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white shrink-0 mt-0.5">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold">
                {item.section}
              </div>
              <h3 className="text-base font-bold text-ink-900 mt-0.5">
                {item.title}
              </h3>
            </div>
          </div>
          <p className="text-sm text-ink-700 leading-relaxed whitespace-pre-line">
            {item.content}
          </p>
        </div>
      ))}
    </div>
  );
}

function RemediesTab() {
  const { data, isLoading, isError, refetch } = useReportRemedies(true);

  if (isLoading) return <Loading />;
  if (isError || !data) return <ErrorCard onRetry={() => refetch()} />;
  if (data.length === 0)
    return <EmptyCard message="No remedies available yet." />;

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl border border-ink-100 p-5 lg:p-6"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white shrink-0 mt-0.5">
              <Heart className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold">
                {item.category}
              </div>
              <h3 className="text-base font-bold text-ink-900 mt-0.5">
                {item.title}
              </h3>
            </div>
          </div>
          <p className="text-sm text-ink-700 leading-relaxed whitespace-pre-line">
            {item.content}
          </p>
        </div>
      ))}
    </div>
  );
}

function DoshaTab() {
  const { data, isLoading, isError, refetch } = useReportDoshas(true);

  if (isLoading) return <Loading />;
  if (isError || !data) return <ErrorCard onRetry={() => refetch()} />;
  if (data.length === 0)
    return <EmptyCard message="No dosha analysis available yet." />;

  return (
    <div className="space-y-4">
      {data.map((item) => {
        const imgSrc = getDoshaImage(item.doshaName);

        return (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-ink-100 p-5 lg:p-6"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-3">
                {/* Dosha Image */}
                <div className="h-12 w-12 rounded-xl bg-ink-50 border border-ink-100 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={item.doshaName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to icon if image fails to load
                        (e.target as HTMLImageElement).style.display = "none";
                        (e.target as HTMLImageElement).parentElement!.innerHTML =
                          '<div class="flex items-center justify-center w-full h-full bg-gradient-to-br from-amber-500 to-orange-500 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg></div>';
                      }}
                    />
                  ) : (
                    <Shield className="h-5 w-5 text-amber-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink-900">
                    {item.doshaName}
                  </h3>
                  <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold mt-0.5">
                    Severity: {item.severity}
                  </div>
                </div>
              </div>
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider shrink-0 ${
                  item.present
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {item.present ? "Present" : "Not Present"}
              </span>
            </div>
            <p className="text-sm text-ink-700 leading-relaxed mb-3 whitespace-pre-line">
              {item.description}
            </p>
            {item.remedy && (
              <div className="bg-accent-50/60 border border-accent-200 rounded-xl p-3">
                <div className="text-[11px] uppercase tracking-wider text-accent-700 font-semibold mb-1">
                  Remedy
                </div>
                <p className="text-xs text-ink-700 leading-relaxed">
                  {item.remedy}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function GemstoneTab() {
  const { data, isLoading, isError, refetch } = useReportGemstones(true);

  if (isLoading) return <Loading />;
  if (isError || !data) return <ErrorCard onRetry={() => refetch()} />;
  if (data.length === 0)
    return <EmptyCard message="No gemstone guide available yet." />;

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {data.map((item) => {
        const imgSrc = getGemstoneImage(item.gemstone);

        return (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-ink-100 p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              {/* Gemstone Image */}
              <div className="h-14 w-14 rounded-xl bg-ink-50 border border-ink-100 flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={item.gemstone}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to icon
                      (e.target as HTMLImageElement).style.display = "none";
                      (e.target as HTMLImageElement).parentElement!.innerHTML =
                        '<div class="flex items-center justify-center w-full h-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"></path><path d="M11 3 8 9l4 13 4-13-3-6"></path><path d="M2 9h20"></path></svg></div>';
                    }}
                  />
                ) : (
                  <Gem className="h-6 w-6 text-purple-500" />
                )}
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold">
                  {item.planet}
                </div>
                <div className="text-base font-bold text-ink-900">
                  {item.gemstone}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <Row label="Metal" value={item.metal} />
              <Row label="Finger" value={item.finger} />
              <Row label="Wear On" value={item.day} />
            </div>

            <div className="border-t border-ink-100 mt-3 pt-3">
              <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold mb-1">
                Benefit
              </div>
              <p className="text-xs text-ink-700 leading-relaxed">
                {item.benefit}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 py-1 border-b border-ink-50 last:border-0">
      <span className="text-ink-500">{label}</span>
      <span className="font-semibold text-ink-900 text-right">{value}</span>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-center py-24">
      <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
    </div>
  );
}

function ErrorCard({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-10 text-center">
      <AlertCircle className="h-7 w-7 text-danger-500 mx-auto mb-3" />
      <p className="text-sm text-ink-700 mb-3">Failed to load report data</p>
      <button
        onClick={onRetry}
        className="rounded-lg px-4 py-2 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50"
      >
        Retry
      </button>
    </div>
  );
}

function EmptyCard({ message }: { message: string }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-10 text-center">
      <FileText className="h-7 w-7 text-ink-400 mx-auto mb-3" />
      <p className="text-sm text-ink-500">{message}</p>
    </div>
  );
}