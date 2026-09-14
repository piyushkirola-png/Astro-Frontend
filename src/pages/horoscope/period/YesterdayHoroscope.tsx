import PublicHoroscopeHub from "../PublicHoroscopeHub";

export default function YesterdayHoroscope() {
  return (
    <PublicHoroscopeHub
      period="yesterday"
      badge="Yesterday Horoscope"
      title={
        <>
          Yesterday <span className="gradient-text">Horoscope</span>
        </>
      }
      subtitle="Reflect on yesterday's cosmic influences. Pick your zodiac sign and revisit what the stars had in store for your love life, career, health, and finances."
    />
  );
}