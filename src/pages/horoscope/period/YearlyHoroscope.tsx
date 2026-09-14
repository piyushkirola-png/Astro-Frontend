import PublicHoroscopeHub from "../PublicHoroscopeHub";

export default function YearlyHoroscope() {
  return (
    <PublicHoroscopeHub
      period="yearly"
      badge="Yearly Horoscope"
      title={
        <>
          Yearly <span className="gradient-text">Horoscope</span>
        </>
      }
      subtitle="Get a comprehensive view of your year ahead. Pick your zodiac sign and discover the astrological roadmap for your love life, career, health, and finances."
    />
  );
}