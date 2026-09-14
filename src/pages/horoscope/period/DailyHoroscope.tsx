import PublicHoroscopeHub from "../PublicHoroscopeHub";

export default function DailyHoroscope() {
  return (
    <PublicHoroscopeHub
      period="today"
      urlSlug="daily"
      badge="Today Horoscope"
      title={
        <>
          Today <span className="gradient-text">Horoscope</span>
        </>
      }
      subtitle="Looking for an accurate daily horoscope? Explore the astrological insights you need to navigate your day with greater clarity. Simply tap on your zodiac sign and discover details about your love life, career, health, and finances."
    />
  );
}