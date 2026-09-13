import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Sun,
  Moon,
  Star,
  Sparkles,
  Heart,
  ChevronRight,
  Shield,
  CheckCircle,
  ArrowRight,
  Globe,
  TrendingUp,
  Activity,
  Home,
  Briefcase,
  Baby,
  AlertCircle,
  Info,
  Award,
  Zap,
  Calculator,
  Compass,
  Target,
  Sunrise,
  Sunset,
  Cloud,
  Users,
  BookOpen,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/animations/Reveal";

// City data
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

// Sample panchang data for today
const getTodayPanchang = (city: string) => {
  const today = new Date();
  const date = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    date: date,
    city: city,
    sunrise: "06:02 AM",
    sunset: "06:33 PM",
    moonrise: "03:55 AM",
    moonset: "05:26 PM",
    tithi: "Trayodashi",
    nakshatra: "Ashlesha upto 05:23",
    yoga: "Shiva",
    karana: "Gar",
    paksha: "Krishna",
    weekday: "Wednesday",
    shakaSamvat: "1948 ViÅ›vÄvasu",
    vikramSamvat: "1948 ViÅ›vÄvasu",
    inauspiciousTimings: [
      { name: "Kantaka / Mrityu", from: "03:25:55 PM", to: "04:59:45 PM" },
      { name: "Rahu Kaal", from: "12:18:17 PM", to: "01:52:06 PM" },
      { name: "Kaalvela / Ardhayaam", from: "06:02:59 AM", to: "07:36:49 AM" },
      { name: "Yamaghanta", from: "07:36:49 AM", to: "09:10:38 AM" },
      { name: "Yamaganda", from: "07:36:49 AM", to: "09:10:38 AM" },
      { name: "Kulika Kaal", from: "10:44:27 AM", to: "12:18:17 PM" },
      { name: "Gulika Kaal", from: "10:44:27 AM", to: "12:18:17 PM" },
    ],
    tarabalam: [
      "Krittika",
      "Mrigashirsha",
      "Punarvasu",
      "Ashlesha",
      "Uttara Phalguni",
      "Chitra",
      "Vishakha",
      "Jyeshtha",
      "Uttara Ashadha",
      "Dhanishta",
      "Purva Bhadrapada",
    ],
    chandrabalam: [
      "Krittika",
      "Mrigashirsha",
      "Punarvasu",
      "Ashlesha",
      "Uttara Phalguni",
      "Chitra",
      "Vishakha",
      "Jyeshtha",
      "Uttara Ashadha",
      "Dhanishta",
      "Purva Bhadrapada",
    ],
    planets: [
      {
        name: "Ascendant",
        rashi: "Leo",
        longitude: "21Â°4â€²55â€³",
        nakshatra: "Purva Phalguni",
        pada: "3",
      },
      {
        name: "SUN",
        rashi: "Leo",
        longitude: "22Â°8â€²13â€³",
        nakshatra: "Purva Phalguni",
        pada: "3",
      },
      {
        name: "MOON",
        rashi: "Cancer",
        longitude: "24Â°34â€²35â€³",
        nakshatra: "Ashlesha",
        pada: "3",
      },
      {
        name: "MERCURY",
        rashi: "Virgo",
        longitude: "2Â°56â€²6â€³",
        nakshatra: "Uttara Phalguni",
        pada: "2",
      },
      {
        name: "VENUS",
        rashi: "Libra",
        longitude: "4Â°53â€²19â€³",
        nakshatra: "Chitra",
        pada: "4",
      },
      {
        name: "MARS",
        rashi: "Gemini",
        longitude: "24Â°12â€²7â€³",
        nakshatra: "Punarvasu",
        pada: "2",
      },
      {
        name: "JUPITER",
        rashi: "Cancer",
        longitude: "21Â°7â€²44â€³",
        nakshatra: "Ashlesha",
        pada: "2",
      },
      {
        name: "SATURN",
        rashi: "Pisces",
        longitude: "18Â°57â€²33â€³",
        nakshatra: "Revati",
        pada: "1",
      },
      {
        name: "RAHU",
        rashi: "Aquarius",
        longitude: "4Â°38â€²48â€³",
        nakshatra: "Dhanishta",
        pada: "4",
      },
      {
        name: "KETU",
        rashi: "Leo",
        longitude: "4Â°38â€²48â€³",
        nakshatra: "Magha",
        pada: "2",
      },
    ],
  };
};

export default function TodayPanchang() {
  const [selectedCity, setSelectedCity] = useState("new-delhi");
  const [panchangData, setPanchangData] = useState(
    getTodayPanchang("New Delhi, Delhi, India"),
  );
  const [showImportance, setShowImportance] = useState(false);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    const cityLabel =
      cities.find((c) => c.value === city)?.label || "New Delhi, Delhi, India";
    setPanchangData(getTodayPanchang(cityLabel));
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Panchang Display */}
      <PanchangDisplay
        panchangData={panchangData}
        selectedCity={selectedCity}
        handleCityChange={handleCityChange}
        cities={cities}
        setShowImportance={setShowImportance}
      />

      {/* Importance Section */}
      {showImportance && <ImportanceSection />}

      {/* Related Pages */}
      <RelatedPages />

      {/* What is Panchang */}
      <WhatIsPanchang />

      {/* CTA Section */}
      <CTASection />
    </>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HERO SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
            Today Panchang (Panchangam)
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-xl md:text-2xl font-semibold text-primary-600 mb-6">
            Your Daily Vedic Calendar
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <p className="text-base text-ink-600 leading-relaxed">
              Panchang daily tracks the cosmic energy of each day to determine
              key events such as marriage, new business venture, naming
              ceremony, travel, and fasting.
              <span className="font-semibold text-primary-600">
                {" "}
                Panchang
              </span>{" "}
              is derived from the Sanskrit words panch, meaning five, and ang,
              meaning limbs.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ PANCHANG DISPLAY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface PanchangDisplayProps {
  panchangData: any;
  selectedCity: string;
  handleCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  cities: { value: string; label: string }[];
  setShowImportance: (show: boolean) => void;
}

function PanchangDisplay({
  panchangData,
  selectedCity,
  handleCityChange,
  cities,
  setShowImportance,
}: PanchangDisplayProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container-8xl">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            {/* City Selector */}
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
              {/* Date & Location */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-ink-900">
                  {panchangData.city}
                </h2>
                <p className="text-sm text-ink-500">{panchangData.date}</p>
              </div>

              {/* Sunrise/Sunset/Moonrise/Moonset */}
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

              {/* Panchang Details */}
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

              {/* Inauspicious Timings */}
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

              {/* Tarabalam & Chandrabalam */}
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

              {/* Planetary Positions */}
              <div>
                <h3 className="text-lg font-bold text-ink-900 mb-3">
                  Planetary Positions
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-xl border border-ink-100">
                    <thead>
                      <tr className="bg-gradient-to-r from-primary-600 to-accent-500">
                        <th className="text-left py-2 px-3 text-white font-semibold text-xs">
                          Planets
                        </th>
                        <th className="text-left py-2 px-3 text-white font-semibold text-xs">
                          Rashi
                        </th>
                        <th className="text-left py-2 px-3 text-white font-semibold text-xs">
                          Longitude
                        </th>
                        <th className="text-left py-2 px-3 text-white font-semibold text-xs">
                          Nakshatra
                        </th>
                        <th className="text-left py-2 px-3 text-white font-semibold text-xs">
                          Pada
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {panchangData.planets.map((planet: any, i: number) => (
                        <tr
                          key={planet.name}
                          className={i % 2 === 0 ? "bg-ink-50" : "bg-white"}
                        >
                          <td className="py-2 px-3 text-xs font-semibold text-ink-900">
                            {planet.name}
                          </td>
                          <td className="py-2 px-3 text-xs text-ink-600">
                            {planet.rashi}
                          </td>
                          <td className="py-2 px-3 text-xs text-ink-600">
                            {planet.longitude}
                          </td>
                          <td className="py-2 px-3 text-xs text-ink-600">
                            {planet.nakshatra}
                          </td>
                          <td className="py-2 px-3 text-xs text-ink-600">
                            {planet.pada}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 text-center">
                <p className="text-xs text-ink-400">Â© Astrotalk.com</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => setShowImportance(true)}
                >
                  <Info className="h-3 w-3" />
                  Learn About Panchang Importance
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ IMPORTANCE SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ImportanceSection() {
  const importanceItems = [
    {
      icon: Heart,
      title: "Marriage",
      description:
        "An auspicious day is always selected according to Vedic astrology. It considers Tithi, Yoga, Vaar, and Nakshatra to determine the best day and time for marriage.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Briefcase,
      title: "Business",
      description:
        "Inaugurating an office, starting a new venture, or signing off on important papers at the right muharat brings success and cuts off obstacles.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Baby,
      title: "Naming Ceremony",
      description:
        "Determines a child's Nakshatra and zodiac, which describes a child's personality, strengths, and the life path they will follow.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Compass,
      title: "Travel",
      description:
        "Lets you know the right time to leave home for utmost safety and security. Determines the Nakshatra and the best days for a hassle-free journey.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Moon,
      title: "Fasting",
      description:
        "Observing fast in Indian culture also depends upon the Panchang. It determines the correct Tithi that enables a native to derive the full benefits of fasting.",
      color: "from-orange-500 to-amber-500",
    },
  ];

  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Importance"
            title="What Is the Importance of Panchang?"
            subtitle="Panchang daily tracks the cosmic energy of each day to determine key events"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {importanceItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${item.color} w-fit mb-4`}
                >
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-accent-200">
              <p className="text-sm text-ink-700 text-center">
                <span className="font-semibold">ðŸ’¡ Panchang</span> is derived
                from the Sanskrit words
                <span className="font-semibold"> panch</span> (five) and
                <span className="font-semibold"> ang</span> (limbs). The
                Panchang daily considers five elements: Tithi, Vaar, Nakshatra,
                Yoga, and Karana. It determines the energy and auspiciousness of
                every day.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ RELATED PAGES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function RelatedPages() {
  const relatedPages = [
    { name: "Tomorrow Panchang", icon: Calendar, link: "/tomorrow-panchang" },
    { name: "Daily Horoscope", icon: Star, link: "/horoscope" },
    { name: "Rahu Kaal", icon: AlertCircle, link: "/rahu-kaal" },
    { name: "Tithi", icon: Moon, link: "/tithi" },
    { name: "Vaar", icon: Calendar, link: "/vaar" },
    { name: "Yoga", icon: Activity, link: "/yoga" },
    { name: "Karana", icon: Clock, link: "/karana" },
    { name: "Hora", icon: Sun, link: "/hora" },
    { name: "Choghadiya", icon: Compass, link: "/choghadiya" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Related Pages"
            title="Explore More Panchang Tools"
            subtitle="Discover other aspects of the daily Vedic calendar"
          />
        </Reveal>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-3 max-w-6xl mx-auto">
          {relatedPages.map((page, i) => (
            <Reveal key={page.name} delay={i * 0.05}>
              <Button
                to={page.link}
                variant="outline"
                size="sm"
                className="w-full text-center"
              >
                <page.icon className="h-3 w-3 mx-auto mb-1" />
                <span className="text-[10px]">{page.name}</span>
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHAT IS PANCHANG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhatIsPanchang() {
  const elements = [
    { name: "Tithi", description: "Lunar day based on the phase of the Moon" },
    { name: "Vaar", description: "Day of the week with planetary ruler" },
    { name: "Nakshatra", description: "Lunar mansion or star constellation" },
    { name: "Yoga", description: "Combination of Sun and Moon positions" },
    { name: "Karana", description: "Half of a Tithi for timing activities" },
  ];

  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Five Elements"
            title="The Five Elements of Panchang"
            subtitle="Panchang daily considers five elements that determine the energy of every day"
          />
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {elements.map((element, i) => (
            <Reveal key={element.name} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-1">
                  {element.name}
                </h3>
                <p className="text-xs text-ink-500">{element.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ CTA SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function CTASection() {
  return (
    <section className="py-20 bg-ink-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg-dark opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-accent-500/15 to-primary-500/15 blur-[130px] rounded-full" />

      <div className="relative container-8xl text-center">
        <Reveal>
          <Badge variant="dark">
            <Calendar className="h-3 w-3" />
            Daily Guidance
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Check Today's <span className="gradient-text-light">Panchang</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
            Plan your day with cosmic wisdom. Check auspicious timings,
            planetary positions, and more.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/today-panchang" variant="primary" size="lg">
              <Calendar className="h-4 w-4" />
              View Today's Panchang
              <ArrowRight className="h-4 w-4" />
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
