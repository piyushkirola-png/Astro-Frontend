export interface ReportGeneral {
  id: number;
  zodiac: string;
  section: string;
  title: string;
  content: string;
}

export interface ReportRemedy {
  id: number;
  zodiac: string;
  category: string;
  title: string;
  content: string;
}

export interface ReportDosha {
  id: number;
  zodiac: string;
  doshaName: string;
  present: boolean;
  severity: string;
  description: string;
  remedy: string;
}

export interface ReportGemstone {
  id: number;
  zodiac: string;
  planet: string;
  gemstone: string;
  metal: string;
  finger: string;
  day: string;
  benefit: string;
}
