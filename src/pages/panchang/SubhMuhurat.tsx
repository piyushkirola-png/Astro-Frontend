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
  Sunrise,
  Sunset,
  XCircle,
  Cloud,
  Users,
  BookOpen,
  AlertTriangle,
  Gem,
  Music,
  Coffee,
  Diamond,
  Crown,
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

// Abhijit Muhurat data for 2026
const abhijitMuhurat2026 = [
  { date: "Jan 19, 2026", day: "Monday", start: "5:30", end: "13:34" },
  { date: "February 15, 2026", day: "Sunday", start: "13:29", end: "21:28" },
  {
    date: "Mar 14, 2026",
    day: "Saturday",
    start: "22:27",
    end: "6:30 AM (15 March)",
  },
  { date: "Apr 11, 2026", day: "Saturday", start: "7:12", end: "15:21" },
  { date: "8 May 2026", day: "Friday", start: "2:44 PM", end: "11:04 PM" },
  {
    date: "4 June 2026",
    day: "Thursday",
    start: "9:04 PM",
    end: "5:26 AM (5 June)",
  },
  { date: "2 July 2026", day: "Thursday", start: "2:50 AM", end: "11:11 AM" },
  { date: "29 July 2026", day: "Wednesday", start: "9:05 AM", end: "5:20 PM" },
  {
    date: "25 August 2026",
    day: "Tuesday",
    start: "4:18 PM",
    end: "12:35 AM (26 August)",
  },
  {
    date: "22 September 2026",
    day: "Tuesday",
    start: "12:33 AM",
    end: "8:50 AM",
  },
  { date: "19 October 2026", day: "Monday", start: "8:59 AM", end: "5:20 PM" },
  {
    date: "15 November 2026",
    day: "Sunday",
    start: "4:44 PM",
    end: "1:15 AM (16 November)",
  },
  {
    date: "12 December 2026",
    day: "Saturday",
    start: "11:27 PM",
    end: "8:00 AM (13 December)",
  },
];

// Sample Shubh Muhurat data
const getShubhMuhuratData = (city: string) => {
  const today = new Date();
  const date = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Calculate Abhijit Muhurat (approximate)
  const sunrise = "05:24 AM";
  const sunset = "07:24 PM";

  // For demo purposes, calculate a simple muhurat
  const startTime = "11:56 AM";
  const endTime = "12:52 PM";

  return {
    date: date,
    city: city,
    sunrise: sunrise,
    sunset: sunset,
    abhijitStart: startTime,
    abhijitEnd: endTime,
    duration: "56 minutes",
    description:
      "Abhijit Muhurat is the 8th muhurat of the day, associated with victory and success.",
    auspiciousActivities: [
      "Start any new work or business",
      "Begin important projects",
      "Perform prayers and puja",
      "Chant mantras and spiritual practices",
      "Make crucial decisions",
      "Sign agreements and documents",
      "Start a journey or travel",
      "Conduct religious rituals or ceremonies",
      "Buy and invest in properties or assets",
      "Start education or learning activities",
    ],
    avoidActivities: [
      "Negative activities like arguments or fights",
      "Travelling south during this time",
      "Major Manglik activities like marriage (consult astrologer)",
      "In some customs, Wednesday is not considered auspicious",
    ],
  };
};

export default function ShubhMuhurat() {
  const [selectedCity, setSelectedCity] = useState("new-delhi");
  const [muhuratData, setMuhuratData] = useState(
    getShubhMuhuratData("New Delhi, Delhi, India"),
  );

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    const cityLabel =
      cities.find((c) => c.value === city)?.label || "New Delhi, Delhi, India";
    setMuhuratData(getShubhMuhuratData(cityLabel));
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Abhijit Muhurat Today */}
      <AbhijitMuhuratToday
        muhuratData={muhuratData}
        selectedCity={selectedCity}
        handleCityChange={handleCityChange}
        cities={cities}
      />

      {/* Abhijit Muhurat 2026 Calendar */}
      <AbhijitMuhurat2026 />

      {/* How is Abhijit Muhurat Calculated */}
      <HowIsAbhijitMuhuratCalculated />

      {/* Auspicious Activities */}
      <AuspiciousActivities muhuratData={muhuratData} />

      {/* Activities to Avoid */}
      <ActivitiesToAvoid muhuratData={muhuratData} />

      {/* Significance */}
      <Significance />

      {/* Why Is Abhijit Muhurat Powerful */}
      <WhyIsAbhijitMuhuratPowerful />

      {/* Mythological Significance */}
      <MythologicalSignificance />

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
            <Crown className="h-3 w-3" />
            Free Daily Tool
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 mb-4">
            Shubh Muhurat Today
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-xl md:text-2xl font-semibold text-primary-600 mb-6">
            Find Auspicious Timings
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <p className="text-base text-ink-600 leading-relaxed">
              In Hinduism, time is of great value as it rules all aspects of
              life, nature, and cosmic cycles. When you do an important task at
              the right moment, it can yield incredibly successful results.
              <span className="font-semibold text-primary-600">
                {" "}
                Shubh Muhurat
              </span>{" "}
              and
              <span className="font-semibold text-primary-600">
                {" "}
                Abhijit Muhurat
              </span>{" "}
              are carefully observed for important activities.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ ABHIJIT MUHURAT TODAY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface AbhijitMuhuratTodayProps {
  muhuratData: any;
  selectedCity: string;
  handleCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  cities: { value: string; label: string }[];
}

function AbhijitMuhuratToday({
  muhuratData,
  selectedCity,
  handleCityChange,
  cities,
}: AbhijitMuhuratTodayProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container-8xl">
        <div className="max-w-4xl mx-auto">
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
                  {muhuratData.city}
                </h2>
                <p className="text-sm text-ink-500">{muhuratData.date}</p>
              </div>

              {/* Abhijit Muhurat Highlight */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-300 mb-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown className="h-6 w-6 text-amber-600" />
                  <span className="text-lg font-bold text-amber-700">
                    Abhijit Muhurat Today
                  </span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-amber-700">
                  {muhuratData.abhijitStart} â€“ {muhuratData.abhijitEnd}
                </div>
                <p className="text-sm text-amber-600 mt-2">
                  Duration: {muhuratData.duration} â€¢ Associated with victory
                  and success
                </p>
              </div>

              {/* Sunrise/Sunset */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-xl p-4 text-center border border-ink-100">
                  <Sunrise className="h-6 w-6 text-orange-500 mx-auto mb-1" />
                  <div className="text-xs text-ink-500">Sunrise</div>
                  <div className="text-sm font-bold text-ink-900">
                    {muhuratData.sunrise}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-ink-100">
                  <Sunset className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                  <div className="text-xs text-ink-500">Sunset</div>
                  <div className="text-sm font-bold text-ink-900">
                    {muhuratData.sunset}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl p-4 border border-ink-100">
                <p className="text-sm text-ink-600 leading-relaxed">
                  {muhuratData.description}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-4 text-center">
                <p className="text-xs text-ink-400">Â© Astrotalk.com</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ ABHIJIT MUHURAT 2026 CALENDAR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function AbhijitMuhurat2026() {
  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="2026 Calendar"
            title="Abhijit Nakshatra Date and Timings 2026"
            subtitle="Complete list of Abhijit Muhurat dates for the year 2026"
          />
        </Reveal>

        <div className="mt-8 w-full overflow-x-auto">
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-amber-600 to-yellow-600">
                    <th className="text-left py-3 px-4 text-white font-semibold text-sm">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-white font-semibold text-sm">
                      Day
                    </th>
                    <th className="text-left py-3 px-4 text-white font-semibold text-sm">
                      Start Time
                    </th>
                    <th className="text-left py-3 px-4 text-white font-semibold text-sm">
                      End Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {abhijitMuhurat2026.map((item, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-ink-50" : "bg-white"}
                    >
                      <td className="py-3 px-4 text-sm text-ink-900 font-semibold">
                        {item.date}
                      </td>
                      <td className="py-3 px-4 text-sm text-ink-600">
                        {item.day}
                      </td>
                      <td className="py-3 px-4 text-sm text-ink-600">
                        {item.start}
                      </td>
                      <td className="py-3 px-4 text-sm text-ink-600">
                        {item.end}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-4 max-w-6xl mx-auto">
            <div className="bg-accent-50 rounded-2xl p-4 border border-accent-200">
              <p className="text-sm text-ink-700 text-center">
                <span className="font-semibold">ðŸ’¡ Note:</span> Abhijit
                Muhurat and Abhijit Nakshatra are not the same, but when they
                occur together, it is considered highly auspicious.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HOW IS ABHIJIT MUHURAT CALCULATED â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HowIsAbhijitMuhuratCalculated() {
  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="How to Calculate"
            title="How is Abhijit Muhurat Calculated?"
            subtitle="Understanding the calculation method for Abhijit Muhurat"
          />
        </Reveal>

        <div className="mt-8 w-full">
          <Reveal delay={0.1}>
            <div className="bg-ink-50 rounded-2xl p-8 border border-ink-100 w-full">
              <p className="text-ink-700 leading-relaxed mb-6">
                To understand and calculate Abhijit Muhurat today, you must
                first check the sunrise and sunset timings of your location. In
                Delhi NCT, the sunrise time is around 05:24 AM and the sunset
                time is around 07:24 PM.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-ink-100">
                  <h4 className="text-lg font-bold text-ink-900 mb-3">
                    Step-by-Step Calculation
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-ink-600">
                      <span className="text-primary-600 font-bold">1.</span>
                      <span>
                        Difference between sunrise and sunset ={" "}
                        <span className="font-semibold">
                          14 hours (840 minutes)
                        </span>
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-ink-600">
                      <span className="text-primary-600 font-bold">2.</span>
                      <span>
                        Divide by 15 ={" "}
                        <span className="font-semibold">56 minutes</span> per
                        muhurat
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-ink-600">
                      <span className="text-primary-600 font-bold">3.</span>
                      <span>
                        8th muhurat: Add 7 parts (7 Ã— 56 = 392 minutes) to
                        sunrise
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-ink-600">
                      <span className="text-primary-600 font-bold">4.</span>
                      <span>
                        Start time ={" "}
                        <span className="font-semibold text-primary-600">
                          11:56 AM
                        </span>
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-ink-600">
                      <span className="text-primary-600 font-bold">5.</span>
                      <span>
                        End time ={" "}
                        <span className="font-semibold text-primary-600">
                          12:52 PM
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                  <h4 className="text-lg font-bold text-ink-900 mb-3">
                    Duration and Variation
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 border border-amber-100">
                      <p className="text-sm text-ink-600">
                        <span className="font-semibold">Duration:</span> 48 to
                        56 minutes
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-amber-100">
                      <p className="text-sm text-ink-600">
                        <span className="font-semibold">Depends on:</span>{" "}
                        Length of the day at a particular location
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-amber-100">
                      <p className="text-sm text-ink-600">
                        <span className="font-semibold">Varies by:</span> Daily
                        sunrise and sunset times
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-200">
                <p className="text-sm text-ink-700">
                  <span className="font-semibold">âœ¨ Example:</span> In Delhi,
                  Abhijit Muhurat today is approximately from{" "}
                  <span className="font-bold text-primary-600">
                    11:56 AM to 12:52 PM
                  </span>
                  .
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ AUSPICIOUS ACTIVITIES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function AuspiciousActivities({ muhuratData }: { muhuratData: any }) {
  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Auspicious Activities"
            title="Auspicious Activities During Abhijit Muhurat"
            subtitle="Abhijit Muhurat today can be useful for the following"
          />
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {muhuratData.auspiciousActivities.map(
            (activity: string, i: number) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-white rounded-xl p-4 border border-ink-100 hover:border-amber-200 hover:shadow-lg transition-all flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm text-ink-600">{activity}</span>
                </div>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ ACTIVITIES TO AVOID â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ActivitiesToAvoid({ muhuratData }: { muhuratData: any }) {
  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Activities to Avoid"
            title="Activities to Avoid During Abhijit Muhurat"
            subtitle="There are special cases and expectations associated with Abhijit Muhurat"
          />
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {muhuratData.avoidActivities.map((activity: string, i: number) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200 flex items-center gap-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                <span className="text-sm text-red-700">{activity}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-6 max-w-4xl mx-auto">
            <div className="bg-accent-50 rounded-2xl p-4 border border-accent-200">
              <p className="text-sm text-ink-700 text-center">
                <span className="font-semibold">ðŸ’¡ Note:</span> In some
                customs, Wednesday is not considered auspicious. Hence, starting
                important work should be avoided on this day, even during
                Abhijit Muhurat. For major Manglik activities, consult an
                astrologer.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ SIGNIFICANCE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Significance() {
  const significanceItems = [
    {
      icon: Calendar,
      title: "Festivals & Rituals",
      description:
        "Abhijit Muhurat is very important in Hindu tradition and is considered during festivals and religious rituals.",
    },
    {
      icon: Crown,
      title: "Victory & Success",
      description:
        "The word Abhijit means victorious or winner, which is why this muhurat is often chosen for important activities and new beginnings.",
    },
    {
      icon: Sun,
      title: "Midday Energy",
      description:
        "It occurs around midday when the Sun is at its highest point, carrying strong and positive energy.",
    },
  ];

  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Significance"
            title="Significance in Festivals and Rituals"
            subtitle="Abhijit Muhurat holds great importance in Hindu traditions"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {significanceItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-amber-200 hover:shadow-lg transition-all text-center">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 w-fit mx-auto mb-4">
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
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHY IS ABHIJIT MUHURAT POWERFUL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhyIsAbhijitMuhuratPowerful() {
  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Why Powerful"
            title="Why Is Abhijit Muhurat Powerful?"
            subtitle="Associated with success, victory, and positive outcomes"
          />
        </Reveal>

        <div className="mt-8 w-full">
          <Reveal delay={0.1}>
            <div className="bg-ink-50 rounded-2xl p-8 border border-ink-100 w-full">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-ink-100 text-center">
                  <div className="text-4xl mb-3">ðŸ†</div>
                  <h4 className="text-lg font-bold text-ink-900 mb-2">
                    Victory
                  </h4>
                  <p className="text-sm text-ink-500">
                    The word Abhijit means "winner" or "victorious," making it
                    ideal for new beginnings.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-ink-100 text-center">
                  <div className="text-4xl mb-3">â˜€ï¸</div>
                  <h4 className="text-lg font-bold text-ink-900 mb-2">
                    Midday Power
                  </h4>
                  <p className="text-sm text-ink-500">
                    Occurs around midday when the Sun is at its highest point,
                    carrying strong positive energy.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-ink-100 text-center">
                  <div className="text-4xl mb-3">ðŸ•‰ï¸</div>
                  <h4 className="text-lg font-bold text-ink-900 mb-2">
                    Divine Blessings
                  </h4>
                  <p className="text-sm text-ink-500">
                    Believed to have the blessings of Lord Vishnu, helping
                    remove obstacles.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ MYTHOLOGICAL SIGNIFICANCE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function MythologicalSignificance() {
  const myths = [
    {
      icon: Shield,
      title: "Lord Shiva's Victory",
      description:
        "It is believed that Lord Shiva defeated Tripurasura during the Abhijit Muhurat. Hence, it is associated with victory and winning.",
    },
    {
      icon: Crown,
      title: "Lord Rama's Birth",
      description:
        "Lord Rama is said to have been born during this favourable time period, making it all the more special.",
    },
    {
      icon: Star,
      title: "Lord Vishnu's Blessings",
      description:
        "This muhurat is believed to have the blessings of Lord Vishnu, who helps remove obstacles and reduce the effects of various doshas.",
    },
    {
      icon: Moon,
      title: "The 28th Nakshatra",
      description:
        "Abhijit was once considered the 28th nakshatra. It was later removed from the main nakshatra cycle and given a special daily time called Abhijit Muhurat.",
    },
  ];

  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Mythological Significance"
            title="Mythological and Spiritual Significance"
            subtitle="Several beliefs associate this muhurat with special spiritual and mythological significance"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {myths.map((myth, i) => (
            <Reveal key={myth.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-amber-200 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 shrink-0">
                    <myth.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink-900 mb-2">
                      {myth.title}
                    </h3>
                    <p className="text-sm text-ink-500 leading-relaxed">
                      {myth.description}
                    </p>
                  </div>
                </div>
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-amber-500/15 to-yellow-500/15 blur-[130px] rounded-full" />

      <div className="relative container-8xl text-center">
        <Reveal>
          <Badge variant="dark">
            <Crown className="h-3 w-3" />
            Find Your Muhurat
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Find Today's{" "}
            <span className="gradient-text-light">Shubh Muhurat</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
            Check auspicious timings for your location and plan important
            activities accordingly.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/shubh-muhurat" variant="primary" size="lg">
              <Crown className="h-4 w-4" />
              Check Shubh Muhurat
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
