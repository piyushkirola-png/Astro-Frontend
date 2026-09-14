import PublicHoroscopeHub from "../PublicHoroscopeHub";

export default function WeeklyHoroscope() {
  return (
    <PublicHoroscopeHub
      period="weekly"
      badge="Weekly Horoscope"
      title={
        <>
          Weekly <span className="gradient-text">Horoscope</span>
        </>
      }
      subtitle="Plan your week ahead with accurate astrological insights. Pick your zodiac sign and see what the planets have lined up for your love life, career, health, and finances."
    />
  );
}