import { useState } from "react";
import type { HoroscopePeriod } from "../../../types/horoscope";
import TodayHoroscope from "./TodayHoroscope";
import YesterdayHoroscope from "./YesterdayHoroscope";
import TomorrowHoroscope from "./TomorrowHoroscope";
import WeeklyHoroscope from "./WeeklyHoroscope";
import MonthlyHoroscope from "./MonthlyHoroscope";
import YearlyHoroscope from "./YearlyHoroscope";

const PERIODS: { id: HoroscopePeriod; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly" },
];

export default function Horoscope() {
  const [activePeriod, setActivePeriod] = useState<HoroscopePeriod>("today");

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">
          Horoscope
        </h1>
        <p className="text-ink-500 mt-1 text-sm">
          Your personal cosmic forecast
        </p>
      </div>

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
                    ? "bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-md"
                    : "text-ink-600 hover:bg-ink-50"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {activePeriod === "today" && <TodayHoroscope />}
      {activePeriod === "yesterday" && <YesterdayHoroscope />}
      {activePeriod === "tomorrow" && <TomorrowHoroscope />}
      {activePeriod === "weekly" && <WeeklyHoroscope />}
      {activePeriod === "monthly" && <MonthlyHoroscope />}
      {activePeriod === "yearly" && <YearlyHoroscope />}
    </div>
  );
}
