import { useState } from 'react';
import { Calendar, Loader2 } from 'lucide-react';

type Period =
  | 'today'
  | 'yesterday'
  | 'tomorrow'
  | 'weekly'
  | 'monthly'
  | 'yearly';

const PERIODS: { id: Period; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly', label: 'Yearly' },
];

export default function Horoscope() {
  const [activePeriod, setActivePeriod] = useState<Period>('today');

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">
          Horoscope
        </h1>
        <p className="text-ink-500 mt-1 text-sm">
          Your personal cosmic forecast
        </p>
      </div>

      {/* Tab bar */}
      <div className="bg-white rounded-2xl border border-ink-100 p-2 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {PERIODS.map((p) => {
            const active = activePeriod === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePeriod(p.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  active
                    ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-md'
                    : 'text-ink-600 hover:bg-ink-50'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content area */}
      <div className="bg-white rounded-2xl border border-ink-100 p-6 min-h-[400px]">
        <div className="text-center py-16">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 mb-4">
            <Calendar className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-lg font-bold text-ink-900 mb-1">
            {PERIODS.find((p) => p.id === activePeriod)?.label} Horoscope
          </h2>
          <p className="text-sm text-ink-500 max-w-md mx-auto">
            Your personalized reading for this period will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}