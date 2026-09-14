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

export interface PublicHoroscopeCard {
  zodiac: string;
  sanskritName: string;
  symbol: string;
  symbolEmoji: string;
  dateRange: string;
}

export interface PublicHoroscopeDetail {
  zodiac: string;
  sanskritName: string;
  symbol: string;
  symbolEmoji: string;
  rulingPlanet: string;
  tarotCard: string;
  luckyStone: string;
  dateRange: string;
  period: string;
  mainText: string;
  luckyNumber: number;
  luckyColor: string;
  auspiciousTime: string;
  mood: string;
  loveScore: number;
  loveText: string;
  financeScore: number;
  financeText: string;
  careerScore: number;
  careerText: string;
  healthScore: number;
  healthText: string;
}