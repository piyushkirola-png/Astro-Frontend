import PublicHoroscopeHub from "../PublicHoroscopeHub";

export default function MonthlyHoroscope() {
  return (
    <PublicHoroscopeHub
      period="monthly"
      badge="Monthly Horoscope"
      title={
        <>
          Monthly <span className="gradient-text">Horoscope</span>
        </>
      }
      subtitle="Explore the month ahead with a detailed horoscope. Pick your zodiac sign and understand how the planetary shifts will shape your love life, career, health, and finances."
    />
  );
}