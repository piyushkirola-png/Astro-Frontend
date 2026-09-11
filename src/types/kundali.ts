export interface KundaliBasic {
  name: string;
  gender: string | null;
  dateOfBirth: string | null;
  timeOfBirth: string | null;
  placeOfBirth: string | null;
  birthLat: number | null;
  birthLng: number | null;
  birthTimezone: string | null;

  panchangTithi: string;
  karana: string;
  yoga: string;
  nakshatra: string;
  nakshatraLord: string;
  ascendant: string;
  ascendantLord: string;
  sunrise: string;
  sunset: string;

  varna: string;
  vashya: string;
  yoni: string;
  gan: string;
  nadi: string;
  sign: string;
  signLord: string;
  charan: string;
  tatva: string;
  nameAlphabet: string;
  paya: string;
  yunja: string;
}

export interface KundaliChart {
  chartType: 'D1' | 'D9';
  chartLabel: string;
  zodiac: string;
  houses: string[];
}

export interface PlanetaryPosition {
  planet: string;
  sign: string;
  signLord: string;
  nakshatra: string;
  nakshatraLord: string;
  degree: string;
  retro: string;
  house: number | null;
  state: string;
  status: string;
}

export interface DashaPeriod {
  planet: string;
  startOffsetYears: number;
  endOffsetYears: number;
  house: number | null;
  sign: string;
  startDate: string;
  endDate: string;
  startDateFormatted: string;
  endDateFormatted: string;
  active: boolean;
  paragraph1: string;
  paragraph2: string;
}