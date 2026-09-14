import PublicHoroscopeHub from "../PublicHoroscopeHub";

export default function TomorrowHoroscope() {
  return (
    <PublicHoroscopeHub
      period="tomorrow"
      badge="Tomorrow Horoscope"
      title={
        <>
          Tomorrow <span className="gradient-text">Horoscope</span>
        </>
      }
      subtitle="Prepare for tomorrow with an accurate horoscope. Pick your zodiac sign and discover what the stars have planned for your love life, career, health, and finances."
    />
  );
}