export type HoroscopePeriod =
  "today" | "yesterday" | "tomorrow" | "weekly" | "monthly" | "yearly";

export interface HoroscopeContent {
  zodiac: string;
  period: string;
  variant: number;
  loveText: string | null;
  careerText: string | null;
  healthText: string | null;
  moneyText: string | null;
  luckyNumber: number | null;
  luckyColor: string | null;
  date: string;
}
