import { useState } from 'react';
import {
  User,
  LayoutGrid,
  Orbit,
  Clock,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import {
  useKundaliBasic,
  useKundaliCharts,
  usePlanetaryPositions,
  useDashaPeriods,
} from '../../../api/queries/useKundali';
import NorthIndianChart from '../../../components/kundali/NorthIndianChart';
import type { DashaPeriod } from '../../../types/kundali';

type Tab = 'basic' | 'kundali' | 'planetary' | 'dasha';

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'basic', label: 'Basic', icon: User },
  { id: 'kundali', label: 'Kundali', icon: LayoutGrid },
  { id: 'planetary', label: 'Planetary Positions', icon: Orbit },
  { id: 'dasha', label: 'Dasha', icon: Clock },
];

const PLANET_ABBR: Record<string, string> = {
  SUN: 'Su',
  MOON: 'Mo',
  MARS: 'Ma',
  MERCURY: 'Me',
  JUPITER: 'Ju',
  VENUS: 'Ve',
  SATURN: 'Sa',
  RAHU: 'Ra',
  KETU: 'Ke',
};

const PLANET_COLORS: Record<string, string> = {
  SUN: 'from-orange-500 to-amber-500',
  MOON: 'from-slate-400 to-slate-600',
  MARS: 'from-red-500 to-rose-600',
  MERCURY: 'from-green-500 to-emerald-500',
  JUPITER: 'from-yellow-500 to-amber-600',
  VENUS: 'from-pink-500 to-rose-500',
  SATURN: 'from-blue-500 to-indigo-600',
  RAHU: 'from-gray-600 to-slate-700',
  KETU: 'from-purple-500 to-indigo-500',
};

export default function Kundali() {
  const [activeTab, setActiveTab] = useState<Tab>('basic');

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">
          Kundali
        </h1>
        <p className="text-ink-500 mt-1 text-sm">
          Your complete Vedic birth chart
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 p-2 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  active
                    ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-md'
                    : 'text-ink-600 hover:bg-ink-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'basic' && <BasicTab />}
        {activeTab === 'kundali' && <KundaliTab />}
        {activeTab === 'planetary' && <PlanetaryTab />}
        {activeTab === 'dasha' && <DashaTab />}
      </div>
    </div>
  );
}

function BasicTab() {
  const { data, isLoading, isError, refetch } = useKundaliBasic();

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
        <p className="text-sm text-ink-700 mb-3">Failed to load Kundali details</p>
        <button
          onClick={() => refetch()}
          className="rounded-lg px-4 py-2 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50"
        >
          Retry
        </button>
      </div>
    );
  }

  const birthDetails = [
    { label: 'Name', value: data.name || '—' },
    { label: 'Gender', value: data.gender || '—' },
    { label: 'Date of Birth', value: formatDate(data.dateOfBirth) },
    { label: 'Time of Birth', value: data.timeOfBirth || '—' },
    { label: 'Place of Birth', value: data.placeOfBirth || '—' },
    { label: 'Latitude', value: data.birthLat != null ? data.birthLat.toFixed(4) : '—' },
    { label: 'Longitude', value: data.birthLng != null ? data.birthLng.toFixed(4) : '—' },
    { label: 'Timezone', value: data.birthTimezone || '—' },
  ];

  const panchang = [
    { label: 'Tithi', value: data.panchangTithi || '—' },
    { label: 'Karana', value: data.karana || '—' },
    { label: 'Yoga', value: data.yoga || '—' },
    { label: 'Nakshatra', value: data.nakshatra || '—' },
    { label: 'Nakshatra Lord', value: data.nakshatraLord || '—' },
    { label: 'Ascendant', value: data.ascendant || '—' },
    { label: 'Ascendant Lord', value: data.ascendantLord || '—' },
    { label: 'Sunrise', value: data.sunrise || '—' },
    { label: 'Sunset', value: data.sunset || '—' },
  ];

  const avakhada = [
    { label: 'Varna', value: data.varna || '—' },
    { label: 'Vashya', value: data.vashya || '—' },
    { label: 'Yoni', value: data.yoni || '—' },
    { label: 'Gan', value: data.gan || '—' },
    { label: 'Nadi', value: data.nadi || '—' },
    { label: 'Sign', value: data.sign || '—' },
    { label: 'Sign Lord', value: data.signLord || '—' },
    { label: 'Charan', value: data.charan || '—' },
    { label: 'Tatva', value: data.tatva || '—' },
    { label: 'Name Alphabet', value: data.nameAlphabet || '—' },
    { label: 'Paya', value: data.paya || '—' },
    { label: 'Yunja', value: data.yunja || '—' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-4">
        <InfoCard title="Birth Details" rows={birthDetails} />
        <InfoCard title="Panchang" rows={panchang} />
      </div>
      <InfoCard title="Avakhada Details" rows={avakhada} twoColumn />
    </div>
  );
}

function KundaliTab() {
  const { data, isLoading, isError, refetch } = useKundaliCharts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError || !data || data.length < 2) {
    return (
      <div className="bg-white rounded-2xl border border-ink-100 p-10 text-center">
        <AlertCircle className="h-7 w-7 text-danger-500 mx-auto mb-3" />
        <p className="text-sm text-ink-700 mb-3">Failed to load Kundali charts</p>
        <button
          onClick={() => refetch()}
          className="rounded-lg px-4 py-2 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50"
        >
          Retry
        </button>
      </div>
    );
  }

  const d1 = data.find((c) => c.chartType === 'D1');
  const d9 = data.find((c) => c.chartType === 'D9');

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {d1 && (
        <div className="bg-white rounded-2xl border border-ink-100 p-5">
          <NorthIndianChart houses={d1.houses} title={d1.chartLabel} />
        </div>
      )}
      {d9 && (
        <div className="bg-white rounded-2xl border border-ink-100 p-5">
          <NorthIndianChart houses={d9.houses} title={d9.chartLabel} />
        </div>
      )}
    </div>
  );
}

function PlanetaryTab() {
  const { data, isLoading, isError, refetch } = usePlanetaryPositions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-ink-100 p-10 text-center">
        <AlertCircle className="h-7 w-7 text-danger-500 mx-auto mb-3" />
        <p className="text-sm text-ink-700 mb-3">Failed to load planetary positions</p>
        <button
          onClick={() => refetch()}
          className="rounded-lg px-4 py-2 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50"
        >
          Retry
        </button>
      </div>
    );
  }

  const statusColor = (status: string) => {
    const s = (status || '').toUpperCase();
    if (s === 'EXALTED') return 'bg-green-100 text-green-700';
    if (s === 'DEBILITATED') return 'bg-red-100 text-red-700';
    if (s === 'OWNED' || s === 'MOOLTRIKONA') return 'bg-purple-100 text-purple-700';
    if (s === 'FRIENDLY') return 'bg-blue-100 text-blue-700';
    if (s === 'ENEMY') return 'bg-amber-100 text-amber-700';
    return 'bg-ink-100 text-ink-600';
  };

  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-sm">
          <thead>
            <tr className="bg-ink-50/70 text-left text-[11px] uppercase tracking-wider text-ink-500 font-semibold">
              <th className="px-4 py-3">Planet</th>
              <th className="px-4 py-3">Sign</th>
              <th className="px-4 py-3">Sign Lord</th>
              <th className="px-4 py-3">Nakshatra</th>
              <th className="px-4 py-3">Nakshatra Lord</th>
              <th className="px-4 py-3">Degree</th>
              <th className="px-4 py-3">Retro</th>
              <th className="px-4 py-3">House</th>
              <th className="px-4 py-3">State</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p, i) => (
              <tr
                key={`${p.planet}-${i}`}
                className="border-t border-ink-100 hover:bg-ink-50/40 transition"
              >
                <td className="px-4 py-3 font-bold text-ink-900 whitespace-nowrap">{p.planet}</td>
                <td className="px-4 py-3 text-ink-700 whitespace-nowrap">{p.sign || '—'}</td>
                <td className="px-4 py-3 text-ink-600 whitespace-nowrap">{p.signLord || '—'}</td>
                <td className="px-4 py-3 text-ink-600 whitespace-nowrap">{p.nakshatra || '—'}</td>
                <td className="px-4 py-3 text-ink-600 whitespace-nowrap">{p.nakshatraLord || '—'}</td>
                <td className="px-4 py-3 text-ink-700 whitespace-nowrap font-mono text-xs">{p.degree || '—'}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {p.retro === 'Yes' ? (
                    <span className="text-amber-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-ink-500">No</span>
                  )}
                </td>
                <td className="px-4 py-3 text-ink-700 whitespace-nowrap">{p.house ?? '—'}</td>
                <td className="px-4 py-3 text-ink-600 whitespace-nowrap">{p.state || '—'}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {p.status ? (
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusColor(p.status)}`}
                    >
                      {p.status}
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DashaTab() {
  const { data, isLoading, isError, refetch } = useDashaPeriods();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-ink-100 p-10 text-center">
        <AlertCircle className="h-7 w-7 text-danger-500 mx-auto mb-3" />
        <p className="text-sm text-ink-700 mb-3">Failed to load Dasha periods</p>
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
    <div className="space-y-5">
      <div>
        <h2 className="text-lg lg:text-xl font-bold text-ink-900">
          Vimshottari Mahadasha Periods
        </h2>
        <p className="text-ink-500 mt-1 text-sm">
          Each card represents one major life period (Mahadasha).
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((d, i) => (
          <DashaCard key={`${d.planet}-${i}`} period={d} />
        ))}
      </div>
    </div>
  );
}

function DashaCard({ period }: { period: DashaPeriod }) {
  const abbr = PLANET_ABBR[period.planet.toUpperCase()] || period.planet.slice(0, 2);
  const colorClass =
    PLANET_COLORS[period.planet.toUpperCase()] || 'from-amber-500 to-orange-500';

  return (
    <div
      className={`bg-white rounded-2xl p-5 transition-all ${
        period.active
          ? 'border-2 border-amber-400 shadow-lg shadow-amber-200/50'
          : 'border border-ink-100'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`h-10 w-10 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center text-white text-sm font-bold shrink-0`}
          >
            {abbr}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-ink-900 uppercase truncate">
              {period.planet} Mahadasha
            </div>
            <div className="text-[11px] text-ink-500 mt-0.5">
              {period.startDateFormatted}
              {' — '}
              {period.endDateFormatted}
            </div>
          </div>
        </div>

        {period.active && (
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm shrink-0">
            Active
          </span>
        )}
      </div>

      <p className="text-xs text-ink-600 leading-relaxed mb-3">
        {period.paragraph1}
      </p>

      <p className="text-xs text-ink-600 leading-relaxed">
        {period.paragraph2}
      </p>
    </div>
  );
}

function InfoCard({
  title,
  rows,
  twoColumn = false,
}: {
  title: string;
  rows: { label: string; value: string }[];
  twoColumn?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-5">
      <h2 className="text-base font-bold text-ink-900 mb-4 pb-3 border-b border-ink-100">
        {title}
      </h2>
      <div className={twoColumn ? 'grid sm:grid-cols-2 gap-x-8' : ''}>
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 py-2 border-b border-ink-50 last:border-b-0"
          >
            <span className="text-xs text-ink-500 font-medium shrink-0">
              {row.label}
            </span>
            <span className="text-sm font-semibold text-ink-900 text-right break-words">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}