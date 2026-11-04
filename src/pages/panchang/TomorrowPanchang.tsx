import { useState } from "react";
import {
  Calendar,
  MapPin,
  Sun,
  Moon,
  AlertCircle,
  ArrowRight,
  Sunrise,
  Sunset,
  Users,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/animations/Reveal";

const cities = [
  { value: "new-delhi", label: "New Delhi, Delhi, India" },
  { value: "mumbai", label: "Mumbai, Maharashtra, India" },
  { value: "bangalore", label: "Bangalore, Karnataka, India" },
  { value: "chennai", label: "Chennai, Tamil Nadu, India" },
  { value: "kolkata", label: "Kolkata, West Bengal, India" },
  { value: "hyderabad", label: "Hyderabad, Telangana, India" },
  { value: "ahmedabad", label: "Ahmedabad, Gujarat, India" },
  { value: "pune", label: "Pune, Maharashtra, India" },
  { value: "jaipur", label: "Jaipur, Rajasthan, India" },
  { value: "lucknow", label: "Lucknow, Uttar Pradesh, India" },
];

const getTomorrowPanchang = (city: string) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = tomorrow.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    date: date,
    city: city,
    sunrise: "06:03 AM",
    sunset: "06:32 PM",
    moonrise: "05:00 AM",
    moonset: "06:00 PM",
    tithi: "Chaturdashi",
    nakshatra: "Magha upto 04:13",
    yoga: "Siddha",
    karana: "Shakuni",
    paksha: "Krishna",
    weekday: "Thursday",
    shakaSamvat: "1948 Viśvāvasu",
    vikramSamvat: "1948 Viśvāvasu",
    inauspiciousTimings: [
      { name: "Kantaka / Mrityu", from: "01:51:33 PM", to: "03:25:10 PM" },
      { name: "Rahu Kaal", from: "01:51:33 PM", to: "03:25:10 PM" },
      { name: "Kaalvela / Ardhayaam", from: "03:25:10 PM", to: "04:58:46 PM" },
      { name: "Yamaghanta", from: "06:03:29 AM", to: "07:37:06 AM" },
      { name: "Yamaganda", from: "06:03:29 AM", to: "07:37:06 AM" },
      { name: "Kulika Kaal", from: "09:10:42 AM", to: "10:44:19 AM" },
      { name: "Gulika Kaal", from: "09:10:42 AM", to: "10:44:19 AM" },
    ],
    tarabalam: [
      "Ashwini", "Rohini", "Aadra", "Pushya", "Magha", "Hasta",
      "Swati", "Anuradha", "Mula", "Shravana", "Shatabhisha", "Uttara Bhadrapada",
    ],
    chandrabalam: [
      "Ashwini", "Rohini", "Aadra", "Pushya", "Magha", "Hasta",
      "Swati", "Anuradha", "Mula", "Shravana", "Shatabhisha", "Uttara Bhadrapada",
    ],
    planets: [
      { name: "Ascendant", rashi: "Leo", longitude: "22°9′49″", nakshatra: "Purva Phalguni", pada: "3" },
      { name: "SUN", rashi: "Leo", longitude: "23°6′33″", nakshatra: "Purva Phalguni", pada: "3" },
      { name: "MOON", rashi: "Leo", longitude: "8°39′55″", nakshatra: "Magha", pada: "3" },
      { name: "MERCURY", rashi: "Virgo", longitude: "4°39′0″", nakshatra: "Uttara Phalguni", pada: "3" },
      { name: "VENUS", rashi: "Libra", longitude: "5°33′35″", nakshatra: "Chitra", pada: "4" },
      { name: "MARS", rashi: "Gemini", longitude: "24°49′25″", nakshatra: "Punarvasu", pada: "2" },
      { name: "JUPITER", rashi: "Cancer", longitude: "21°19′57″", nakshatra: "Ashlesha", pada: "2" },
      { name: "SATURN", rashi: "Pisces", longitude: "18°53′36″", nakshatra: "Revati", pada: "1" },
      { name: "RAHU", rashi: "Aquarius", longitude: "4°35′37″", nakshatra: "Dhanishta", pada: "4" },
      { name: "KETU", rashi: "Leo", longitude: "4°35′37″", nakshatra: "Magha", pada: "2" },
    ],
  };
};

export default function TomorrowPanchang() {
  const [selectedCity, setSelectedCity] = useState("new-delhi");
  const [panchangData, setPanchangData] = useState(
    getTomorrowPanchang("New Delhi, Delhi, India"),
  );

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    const cityLabel =
      cities.find((c) => c.value === city)?.label || "New Delhi, Delhi, India";
    setPanchangData(getTomorrowPanchang(cityLabel));
  };

  return (
    <>
      <HeroSection />
      <PanchangDisplay
        panchangData={panchangData}
        selectedCity={selectedCity}
        handleCityChange={handleCityChange}
        cities={cities}
      />
      <CTASection />
    </>
  );
}

/* ─────────────────────────── HERO SECTION ─────────────────────────── */
function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-primary-900/10 to-ink-50">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-20 -left-32 w-96 h-96 bg-primary-400/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 -right-32 w-96 h-96 bg-accent-400/20 rounded-full blur-[120px]" />

      <div className="relative container-8xl text-center">
        <Reveal>
          <Badge className="mb-4">
            <Calendar className="h-3 w-3" />
            Free Daily Tool
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 mb-4">
            Tomorrow Panchang (Panchangam)
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-xl md:text-2xl font-semibold text-primary-600 mb-6">
            Plan Ahead with Vedic Wisdom
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <p className="text-base text-ink-600 leading-relaxed">
              Plan your tomorrow with cosmic guidance. Check auspicious timings,
              planetary positions, and key astrological details for{" "}
              <span className="font-semibold text-primary-600">
                tomorrow's Panchang
              </span>
              to make informed decisions and align with the universe.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────── PANCHANG DISPLAY ────────────────────────── */
interface PanchangDisplayProps {
  panchangData: any;
  selectedCity: string;
  handleCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  cities: { value: string; label: string }[];
}

function PanchangDisplay({
  panchangData,
  selectedCity,
  handleCityChange,
  cities,
}: PanchangDisplayProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container-8xl">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-6">
              <label className="block text-sm font-medium text-ink-700 mb-2">
                Select Location
              </label>
              <div className="relative max-w-md">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-ink-50 border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                >
                  {cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-gradient-to-br from-ink-50 to-primary-50 rounded-2xl p-6 md:p-8 border border-ink-100">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-ink-900">
                  {panchangData.city}
                </h2>
                <p className="text-sm text-ink-500">{panchangData.date}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 text-center border border-ink-100">
                  <Sunrise className="h-6 w-6 text-orange-500 mx-auto mb-1" />
                  <div className="text-xs text-ink-500">Sunrise</div>
                  <div className="text-sm font-bold text-ink-900">
                    {panchangData.sunrise}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-ink-100">
                  <Sunset className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                  <div className="text-xs text-ink-500">Sunset</div>
                  <div className="text-sm font-bold text-ink-900">
                    {panchangData.sunset}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-ink-100">
                  <Moon className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                  <div className="text-xs text-ink-500">Moonrise</div>
                  <div className="text-sm font-bold text-ink-900">
                    {panchangData.moonrise}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-ink-100">
                  <Moon className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <div className="text-xs text-ink-500">Moonset</div>
                  <div className="text-sm font-bold text-ink-900">
                    {panchangData.moonset}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                  <div className="text-xs text-ink-500">Tithi</div>
                  <div className="text-sm font-bold text-ink-900">
                    {panchangData.tithi}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                  <div className="text-xs text-ink-500">Nakshatra</div>
                  <div className="text-sm font-bold text-ink-900">
                    {panchangData.nakshatra}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                  <div className="text-xs text-ink-500">Yoga</div>
                  <div className="text-sm font-bold text-ink-900">
                    {panchangData.yoga}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                  <div className="text-xs text-ink-500">Karana</div>
                  <div className="text-sm font-bold text-ink-900">
                    {panchangData.karana}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                  <div className="text-xs text-ink-500">Paksha</div>
                  <div className="text-sm font-bold text-ink-900">
                    {panchangData.paksha}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                  <div className="text-xs text-ink-500">Weekday</div>
                  <div className="text-sm font-bold text-ink-900">
                    {panchangData.weekday}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                  <div className="text-xs text-ink-500">Shaka Samvat</div>
                  <div className="text-sm font-bold text-ink-900">
                    {panchangData.shakaSamvat}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                  <div className="text-xs text-ink-500">Vikram Samvat</div>
                  <div className="text-sm font-bold text-ink-900">
                    {panchangData.vikramSamvat}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-ink-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Inauspicious Timings (Ashubha Muhurat)
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {panchangData.inauspiciousTimings.map(
                    (timing: any, i: number) => (
                      <div
                        key={i}
                        className="bg-red-50 rounded-lg p-3 border border-red-200"
                      >
                        <div className="text-xs font-semibold text-red-700">
                          {timing.name}
                        </div>
                        <div className="text-xs text-red-600">
                          From {timing.from} To {timing.to}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h4 className="text-sm font-bold text-green-700 mb-2">
                    Tarabalam
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {panchangData.tarabalam.map(
                      (nakshatra: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs bg-white text-green-700 px-2 py-0.5 rounded-full border border-green-200"
                        >
                          {nakshatra}
                        </span>
                      ),
                    )}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="text-sm font-bold text-blue-700 mb-2">
                    Chandrabalam
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {panchangData.chandrabalam.map(
                      (nakshatra: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs bg-white text-blue-700 px-2 py-0.5 rounded-full border border-blue-200"
                        >
                          {nakshatra}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink-900 mb-3">
                  Planetary Positions
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-xl border border-ink-100">
                    <thead>
                      <tr className="bg-gradient-to-r from-primary-600 to-accent-500">
                        <th className="text-left py-2 px-3 text-white font-semibold text-xs">Planets</th>
                        <th className="text-left py-2 px-3 text-white font-semibold text-xs">Rashi</th>
                        <th className="text-left py-2 px-3 text-white font-semibold text-xs">Longitude</th>
                        <th className="text-left py-2 px-3 text-white font-semibold text-xs">Nakshatra</th>
                        <th className="text-left py-2 px-3 text-white font-semibold text-xs">Pada</th>
                      </tr>
                    </thead>
                    <tbody>
                      {panchangData.planets.map((planet: any, i: number) => (
                        <tr
                          key={planet.name}
                          className={i % 2 === 0 ? "bg-ink-50" : "bg-white"}
                        >
                          <td className="py-2 px-3 text-xs font-semibold text-ink-900">{planet.name}</td>
                          <td className="py-2 px-3 text-xs text-ink-600">{planet.rashi}</td>
                          <td className="py-2 px-3 text-xs text-ink-600">{planet.longitude}</td>
                          <td className="py-2 px-3 text-xs text-ink-600">{planet.nakshatra}</td>
                          <td className="py-2 px-3 text-xs text-ink-600">{planet.pada}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── CTA SECTION ──────────────────────────── */
function CTASection() {
  return (
    <section className="py-20 bg-ink-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg-dark opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-accent-500/15 to-primary-500/15 blur-[130px] rounded-full" />

      <div className="relative container-8xl text-center">
        <Reveal>
          <Badge variant="dark">
            <Calendar className="h-3 w-3" />
            Plan Ahead
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Plan Tomorrow with{" "}
            <span className="gradient-text-light">Cosmic Wisdom</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
            Check tomorrow's Panchang to plan your day with astrological
            guidance and auspicious timings.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/tomorrow-panchang" variant="primary" size="lg">
              <Calendar className="h-4 w-4" />
              View Tomorrow's Panchang
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/today-panchang" variant="dark" size="lg">
              <Sun className="h-4 w-4" />
              View Today's Panchang
            </Button>
            <Button to="/consultations" variant="dark" size="lg">
              <Users className="h-4 w-4" />
              Consult an Astrologer
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}