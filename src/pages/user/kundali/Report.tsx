import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from 'lucide-react';
import {
  useReportGeneral,
  useReportRemedies,
  useReportDoshas,
  useReportGemstones,
} from '../../../api/queries/useReport';
import { useHasPurchasedReport } from '../../../api/queries/usePayments';

type Tab = 'general' | 'remedies' | 'dosha' | 'gemstone';

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'general', label: 'General', icon: FileText },
  { id: 'remedies', label: 'Remedies', icon: Heart },
  { id: 'dosha', label: 'Dosha', icon: Shield },
  { id: 'gemstone', label: 'Gemstone', icon: Gem },
];

export default function KundaliReport() {
  const [tab, setTab] = useState<Tab>('general');
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
                    ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-md'
                    : 'text-ink-600 hover:bg-ink-50'
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
        {tab === 'general' && <GeneralTab />}
        {tab === 'remedies' && <RemediesTab />}
        {tab === 'dosha' && <DoshaTab />}
        {tab === 'gemstone' && <GemstoneTab />}
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
            <Feature title="General Analysis" desc="Career, love, health, wealth, and personality insights" />
            <Feature title="Personalized Remedies" desc="Vedic remedies tailored to your chart" />
            <Feature title="Dosha Detection" desc="Identify Mangal, Kaal Sarp, Sade Sati, and more" />
            <Feature title="Gemstone Guide" desc="Which gemstone to wear, how, and when" />
          </div>

          <div className="flex items-baseline justify-between border-t border-ink-100 pt-6 mb-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold">
                One-time price
              </div>
              <div className="text-3xl font-bold text-ink-900 mt-1">₹500</div>
            </div>
            <div className="text-right text-xs text-ink-500">
              Lifetime access
              <br />
              Instant delivery
            </div>
          </div>

          <button
            onClick={() => navigate('/user/payments')}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold hover:shadow-lg transition"
          >
            <Sparkles className="h-4 w-4" />
            Buy Report for ₹500
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
  if (data.length === 0) return <EmptyCard message="No general analysis available yet." />;

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl border border-ink-100 p-5 lg:p-6">
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
  if (data.length === 0) return <EmptyCard message="No remedies available yet." />;

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl border border-ink-100 p-5 lg:p-6">
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
  if (data.length === 0) return <EmptyCard message="No dosha analysis available yet." />;

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl border border-ink-100 p-5 lg:p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shrink-0 mt-0.5">
                <Shield className="h-4 w-4" />
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
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {item.present ? 'Present' : 'Not Present'}
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
      ))}
    </div>
  );
}

function GemstoneTab() {
  const { data, isLoading, isError, refetch } = useReportGemstones(true);

  if (isLoading) return <Loading />;
  if (isError || !data) return <ErrorCard onRetry={() => refetch()} />;
  if (data.length === 0) return <EmptyCard message="No gemstone guide available yet." />;

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {data.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl border border-ink-100 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white">
              <Gem className="h-5 w-5" />
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
      ))}
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