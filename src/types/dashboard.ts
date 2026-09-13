export type MoodTrend = "RISING" | "STABLE" | "LOW";

export interface DailyReading {
  readingDate: string;
  zodiacSign: string;
  zodiacSymbol: string;

  luckyNumber: number;
  luckyColor: string;
  energyLevel: number;
  moodTrend: MoodTrend;

  forecastText: string;
  loveText: string;
  careerText: string;
  wellnessText: string;
  financeText: string;

  signature: string;
  language: string;
  hasZodiac: boolean;
}
