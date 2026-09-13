import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Users,
  Sparkles,
  Heart,
  ChevronRight,
  Shield,
  CheckCircle,
  ArrowRight,
  Globe,
  Moon,
  Sun,
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
  Star,
  Compass,
  Feather,
  Handshake,
  Target,
  AlertTriangle,
  Smile,
  Frown,
  Cloud,
  CloudRain,
  Sun as SunIcon,
  Moon as MoonIcon,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/animations/Reveal";

// Moon signs data
const moonSigns = [
  { value: "aries", label: "Aries (Mesha)", emoji: "â™ˆ" },
  { value: "taurus", label: "Taurus (Vrishabha)", emoji: "â™‰" },
  { value: "gemini", label: "Gemini (Mithuna)", emoji: "â™Š" },
  { value: "cancer", label: "Cancer (Karka)", emoji: "â™‹" },
  { value: "leo", label: "Leo (Simha)", emoji: "â™Œ" },
  { value: "virgo", label: "Virgo (Kanya)", emoji: "â™" },
  { value: "libra", label: "Libra (Tula)", emoji: "â™Ž" },
  { value: "scorpio", label: "Scorpio (Vrishchika)", emoji: "â™" },
  { value: "sagittarius", label: "Sagittarius (Dhanu)", emoji: "â™" },
  { value: "capricorn", label: "Capricorn (Makara)", emoji: "â™‘" },
  { value: "aquarius", label: "Aquarius (Kumbha)", emoji: "â™’" },
  { value: "pisces", label: "Pisces (Meena)", emoji: "â™“" },
];

// Sade Sati phases data
const sadeSatiData: {
  [key: string]: {
    phase: string;
    description: string;
    challenges: string[];
    opportunities: string[];
    intensity: number;
  };
} = {
  aries: {
    phase: "First Phase",
    description: "Saturn is in Pisces, the sign before your Moon sign.",
    challenges: [
      "Emotional turbulence",
      "Family conflicts",
      "Career stagnation",
    ],
    opportunities: [
      "Spiritual growth",
      "Relationship clarity",
      "Inner strength",
    ],
    intensity: 6,
  },
  taurus: {
    phase: "Second Phase",
    description: "Saturn is in Aries, the sign before your Moon sign.",
    challenges: ["Financial instability", "Health issues", "Work pressure"],
    opportunities: ["Financial discipline", "Health awareness", "Career focus"],
    intensity: 7,
  },
  gemini: {
    phase: "Third Phase",
    description: "Saturn is in Taurus, the sign before your Moon sign.",
    challenges: ["Communication issues", "Sibling conflicts", "Mental stress"],
    opportunities: [
      "Improved communication",
      "Stronger bonds",
      "Mental clarity",
    ],
    intensity: 5,
  },
  cancer: {
    phase: "First Phase",
    description: "Saturn is in Gemini, the sign before your Moon sign.",
    challenges: ["Family responsibilities", "Emotional burden", "Home issues"],
    opportunities: ["Family bonding", "Emotional maturity", "Home harmony"],
    intensity: 7,
  },
  leo: {
    phase: "Second Phase",
    description: "Saturn is in Cancer, the sign before your Moon sign.",
    challenges: ["Ego clashes", "Relationship strain", "Career challenges"],
    opportunities: [
      "Humble leadership",
      "Stronger relationships",
      "Career growth",
    ],
    intensity: 8,
  },
  virgo: {
    phase: "Third Phase",
    description: "Saturn is in Leo, the sign before your Moon sign.",
    challenges: ["Health concerns", "Work stress", "Perfectionism"],
    opportunities: ["Health improvements", "Work-life balance", "Acceptance"],
    intensity: 6,
  },
  libra: {
    phase: "First Phase",
    description: "Saturn is in Virgo, the sign before your Moon sign.",
    challenges: ["Partnership issues", "Legal matters", "Financial strain"],
    opportunities: [
      "Balanced partnerships",
      "Legal clarity",
      "Financial growth",
    ],
    intensity: 7,
  },
  scorpio: {
    phase: "Second Phase",
    description: "Saturn is in Libra, the sign before your Moon sign.",
    challenges: ["Intense emotions", "Trust issues", "Power struggles"],
    opportunities: ["Emotional healing", "Deep trust", "Personal power"],
    intensity: 8,
  },
  sagittarius: {
    phase: "Third Phase",
    description: "Saturn is in Scorpio, the sign before your Moon sign.",
    challenges: [
      "Philosophical doubts",
      "Travel restrictions",
      "Learning blocks",
    ],
    opportunities: ["Deeper wisdom", "Meaningful travel", "Expanded learning"],
    intensity: 5,
  },
  capricorn: {
    phase: "First Phase",
    description: "Saturn is in Sagittarius, the sign before your Moon sign.",
    challenges: [
      "Career pressure",
      "Social status issues",
      "Family expectations",
    ],
    opportunities: [
      "Career advancement",
      "Social recognition",
      "Family support",
    ],
    intensity: 7,
  },
  aquarius: {
    phase: "Second Phase",
    description: "Saturn is in Capricorn, the sign before your Moon sign.",
    challenges: ["Identity crisis", "Rebellion", "Isolation"],
    opportunities: [
      "Self-discovery",
      "Authentic expression",
      "Community building",
    ],
    intensity: 8,
  },
  pisces: {
    phase: "Third Phase",
    description: "Saturn is in Aquarius, the sign before your Moon sign.",
    challenges: ["Confusion", "Escapism", "Boundary issues"],
    opportunities: [
      "Spiritual clarity",
      "Healthy boundaries",
      "Creative expression",
    ],
    intensity: 6,
  },
};

// Current Saturn position (2025)
const currentSaturnSign = "aquarius";

// Get affected moon signs
const getAffectedSigns = () => {
  const signs = ["capricorn", "aquarius", "pisces"];
  return moonSigns.filter((s) => signs.includes(s.value));
};

export default function SadeSati() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    birthHour: "",
    birthMinute: "",
    birthSecond: "",
    birthPlace: "",
    unknownTime: false,
  });

  const [result, setResult] = useState<null | {
    moonSign: string;
    moonSignEmoji: string;
    phase: string;
    description: string;
    challenges: string[];
    opportunities: string[];
    intensity: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    advice: string;
    remedies: string[];
    dos: string[];
    donts: string[];
  }>(null);

  const [showPlaceInput, setShowPlaceInput] = useState(false);

  const calculateSadeSati = (e: React.FormEvent) => {
    e.preventDefault();

    // For demo purposes, we'll calculate based on moon sign selection
    // In a real app, this would use actual birth chart calculations
    const moonSign = "aquarius"; // Default for demo

    const data = sadeSatiData[moonSign] || sadeSatiData["aries"];
    const isActive = ["capricorn", "aquarius", "pisces"].includes(moonSign);

    // Calculate start and end dates (simplified for demo)
    const currentYear = new Date().getFullYear();
    const startDate = `${currentYear - 4}å¹´`;
    const endDate = `${currentYear + 4}å¹´`;

    const remedies = [
      'Chant "Om Sham Shanicharaya Namah" 108 times daily',
      "Wear a blue sapphire (Neelam) after consulting an astrologer",
      "Help the elderly and needy",
      "Visit Saturn temples on Saturdays",
      "Light sesame oil lamps on Saturdays",
      "Practice meditation and yoga",
      "Maintain a disciplined routine",
    ];

    const dos = [
      "Reflect and go inward through meditation",
      "Strengthen your spiritual side",
      "Build practical skills",
      "Nurture close relationships",
      "Practice patience",
      "Give back through seva or charity",
    ];

    const donts = [
      "Pause before making big decisions",
      "Avoid starting new ventures",
      "Don't ignore your health",
      "Stay hopeful and avoid negative thoughts",
      "Don't isolate yourself from loved ones",
    ];

    setResult({
      moonSign: moonSign.charAt(0).toUpperCase() + moonSign.slice(1),
      moonSignEmoji:
        moonSigns.find((s) => s.value === moonSign)?.emoji || "â™ˆ",
      phase: data.phase,
      description: data.description,
      challenges: data.challenges,
      opportunities: data.opportunities,
      intensity: data.intensity,
      startDate,
      endDate,
      isActive,
      advice: isActive
        ? "You are currently in your Sade Sati period. Embrace the lessons and growth opportunities."
        : "You are not currently in Sade Sati. Use this time for preparation and self-reflection.",
      remedies,
      dos,
      donts,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handlePlaceSelect = (place: string) => {
    setFormData({
      ...formData,
      birthPlace: place,
    });
    setShowPlaceInput(false);
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i,
  );
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const seconds = Array.from({ length: 60 }, (_, i) => i);

  const affectedSigns = getAffectedSigns();

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Sade Sati Form */}
      <SadeSatiForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={calculateSadeSati}
        result={result}
        days={days}
        months={months}
        years={years}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        showPlaceInput={showPlaceInput}
        setShowPlaceInput={setShowPlaceInput}
        handlePlaceSelect={handlePlaceSelect}
      />

      {/* What is Sade Sati */}
      <WhatIsSadeSati />

      {/* Why 7.5 Years */}
      <WhySevenPointFiveYears />

      {/* Phases of Sade Sati */}
      <PhasesOfSadeSati />

      {/* Effects of Sade Sati */}
      <EffectsOfSadeSati />

      {/* Rashis Affected */}
      <RashisAffected affectedSigns={affectedSigns} />

      {/* Remedies */}
      <Remedies />

      {/* Do's and Don'ts */}
      <DosAndDonts />

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
            <MoonIcon className="h-3 w-3" />
            Free Online Tool
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 mb-4">
            Sade Sati Calculator
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-xl md:text-2xl font-semibold text-primary-600 mb-6">
            Check Your Shani Sade Sati
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <p className="text-base text-ink-600 leading-relaxed">
              If you've been wondering why certain years feel heavier like
              nothing goes your way,
              <span className="font-semibold text-primary-600">
                {" "}
                Sade Sati
              </span>{" "}
              might be the reason! This 7.5-year cycle, where Saturn moves
              through your moon sign and its neighboring signs, can bring deep
              lessons, delays, and emotional growth.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ SADE SATI FORM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface SadeSatiFormProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  result: any;
  days: number[];
  months: number[];
  years: number[];
  hours: number[];
  minutes: number[];
  seconds: number[];
  showPlaceInput: boolean;
  setShowPlaceInput: (show: boolean) => void;
  handlePlaceSelect: (place: string) => void;
}

function SadeSatiForm({
  formData,
  handleChange,
  handleSubmit,
  result,
  days,
  months,
  years,
  hours,
  minutes,
  seconds,
  showPlaceInput,
  setShowPlaceInput,
  handlePlaceSelect,
}: SadeSatiFormProps) {
  const places = [
    "New Delhi, Delhi, India",
    "Mumbai, Maharashtra, India",
    "Bangalore, Karnataka, India",
    "Chennai, Tamil Nadu, India",
    "Kolkata, West Bengal, India",
    "Hyderabad, Telangana, India",
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container-8xl">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-ink-50 rounded-2xl p-6 md:p-8 border border-ink-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500">
                  <MoonIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-ink-900">
                    Calculate your Shani Sade Sati here
                  </h2>
                  <p className="text-xs text-ink-500">
                    Enter your birth details to check your Sade Sati period
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Name <span className="text-danger-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Gender <span className="text-danger-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Date of Birth <span className="text-danger-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <select
                      name="birthDay"
                      value={formData.birthDay}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                      required
                    >
                      <option value="">Day</option>
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <select
                      name="birthMonth"
                      value={formData.birthMonth}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                      required
                    >
                      <option value="">Month</option>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      name="birthYear"
                      value={formData.birthYear}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                      required
                    >
                      <option value="">Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Time of Birth */}
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Time of Birth
                  </label>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      name="unknownTime"
                      checked={formData.unknownTime}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-ink-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-xs text-ink-500">
                      I don't know my time of birth
                    </span>
                  </div>
                  {!formData.unknownTime && (
                    <div className="grid grid-cols-3 gap-3">
                      <select
                        name="birthHour"
                        value={formData.birthHour}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                      >
                        <option value="">Hour</option>
                        {hours.map((hour) => (
                          <option key={hour} value={hour}>
                            {String(hour).padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                      <select
                        name="birthMinute"
                        value={formData.birthMinute}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                      >
                        <option value="">Minute</option>
                        {minutes.map((minute) => (
                          <option key={minute} value={minute}>
                            {String(minute).padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                      <select
                        name="birthSecond"
                        value={formData.birthSecond}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                      >
                        <option value="">Second</option>
                        {seconds.map((second) => (
                          <option key={second} value={second}>
                            {String(second).padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Place of Birth */}
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Place of Birth <span className="text-danger-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                    {showPlaceInput ? (
                      <div className="relative">
                        <input
                          type="text"
                          name="birthPlace"
                          value={formData.birthPlace}
                          onChange={handleChange}
                          placeholder="Search for a city..."
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => setShowPlaceInput(false)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                        >
                          âœ•
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {places.map((place) => (
                          <button
                            key={place}
                            type="button"
                            onClick={() => handlePlaceSelect(place)}
                            className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                              formData.birthPlace === place
                                ? "border-primary-500 bg-primary-50 text-primary-700"
                                : "border-ink-200 bg-white text-ink-600 hover:border-primary-300"
                            }`}
                          >
                            {place}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setShowPlaceInput(true)}
                          className="px-3 py-1.5 rounded-lg text-xs border border-dashed border-primary-300 text-primary-600 hover:bg-primary-50"
                        >
                          + Other
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  type="submit"
                >
                  <MoonIcon className="h-4 w-4" />
                  Check Sade Sati
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              {/* Results */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-4"
                >
                  {/* Status */}
                  <div
                    className={`rounded-xl p-4 text-center ${result.isActive ? "bg-amber-50 border border-amber-200" : "bg-green-50 border border-green-200"}`}
                  >
                    <div className="text-2xl mb-1">
                      {result.isActive ? "âš ï¸" : "âœ…"}
                    </div>
                    <div
                      className={`text-sm font-bold ${result.isActive ? "text-amber-700" : "text-green-700"}`}
                    >
                      {result.isActive
                        ? "You are currently in your Sade Sati period"
                        : "You are not currently in Sade Sati"}
                    </div>
                    <p className="text-xs text-ink-600 mt-1">{result.advice}</p>
                  </div>

                  {/* Moon Sign & Phase */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl p-4 text-center text-white">
                      <div className="text-xs font-semibold opacity-90">
                        Your Moon Sign
                      </div>
                      <div className="text-3xl mt-1">
                        {result.moonSignEmoji}
                      </div>
                      <div className="text-lg font-bold">{result.moonSign}</div>
                    </div>
                    <div className="bg-gradient-to-br from-secondary-600 to-secondary-500 rounded-xl p-4 text-center text-white">
                      <div className="text-xs font-semibold opacity-90">
                        Current Phase
                      </div>
                      <div className="text-lg font-bold">{result.phase}</div>
                      <div className="text-xs opacity-90 mt-1">
                        {result.description}
                      </div>
                    </div>
                  </div>

                  {/* Intensity */}
                  <div className="bg-white rounded-xl p-4 border border-ink-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-ink-900">
                        Intensity Level
                      </span>
                      <span className="text-sm font-bold text-ink-900">
                        {result.intensity}/10
                      </span>
                    </div>
                    <div className="w-full h-2 bg-ink-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-red-500 rounded-full transition-all duration-1000"
                        style={{ width: `${(result.intensity / 10) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Challenges & Opportunities */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                      <h4 className="text-sm font-bold text-red-700 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Challenges
                      </h4>
                      <ul className="space-y-1">
                        {result.challenges.map(
                          (challenge: string, i: number) => (
                            <li
                              key={i}
                              className="text-xs text-red-600 flex items-start gap-1"
                            >
                              <span className="text-red-400">â€¢</span>
                              {challenge}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <h4 className="text-sm font-bold text-green-700 mb-2 flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Opportunities
                      </h4>
                      <ul className="space-y-1">
                        {result.opportunities.map(
                          (opportunity: string, i: number) => (
                            <li
                              key={i}
                              className="text-xs text-green-600 flex items-start gap-1"
                            >
                              <span className="text-green-400">â€¢</span>
                              {opportunity}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="bg-ink-50 rounded-xl p-4 border border-ink-100 text-center">
                    <div className="text-xs text-ink-500">Sade Sati Period</div>
                    <div className="text-sm font-semibold text-ink-900">
                      {result.startDate} - {result.endDate}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl p-4 text-center text-white">
                    <p className="text-sm">
                      Connect with an Astrologer for more personalised detailed
                      predictions.
                    </p>
                    <div className="flex justify-center gap-3 mt-3">
                      <Button to="/consultations" variant="dark" size="sm">
                        Talk to Astrologer
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHAT IS SADE SATI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhatIsSadeSati() {
  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="What is Sade Sati?"
            title="Understanding Shani Sade Sati"
            subtitle="A powerful Saturn phase that shapes your life deeply"
          />
        </Reveal>

        <div className="mt-8 w-full">
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl p-8 border border-ink-100 w-full">
              <p className="text-ink-700 leading-relaxed">
                Sade Sati isn't just some distant astrology term, it's a real,
                personal phase that shapes your life deeply. It starts when
                Saturn travels through your Moon sign and the signs just before
                and after it, lasting about 7.5 years. But don't think of it as
                only tough times.{" "}
                <span className="font-semibold text-primary-600">
                  Saturn acts like a strict but wise teacher
                </span>
                who's there to help you grow.
              </p>
              <div className="mt-4 p-4 bg-accent-50 rounded-xl border border-accent-200">
                <p className="text-sm text-ink-700">
                  <span className="font-semibold">
                    ðŸ’¡ Despite its reputation,
                  </span>{" "}
                  Sade Sati isn't a curse. It's more like the universe's way of
                  pushing you toward growth, resilience, and realigning with
                  your true purpose.
                </p>
              </div>
              <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-200">
                <p className="text-sm text-ink-700">
                  <span className="font-semibold">
                    âœ¨ Everyone's experience is unique
                  </span>{" "}
                  because everyone's birth chart is unique. How this period
                  plays out depends on your own cosmic blueprint.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHY 7.5 YEARS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhySevenPointFiveYears() {
  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Why 7.5 Years?"
            title="Why Sade Sati Duration 7.5 Years?"
            subtitle="Saturn's slow, steady journey through the zodiac"
          />
        </Reveal>

        <div className="mt-8 w-full">
          <Reveal delay={0.1}>
            <div className="bg-ink-50 rounded-2xl p-8 border border-ink-100 w-full">
              <p className="text-ink-700 leading-relaxed">
                Saturn's journey through the zodiac is no rush; it takes about
                30 years to complete one full circle, spending around 2.5 years
                in each sign. When it comes to Sade Sati, Saturn moves through
                the sign before your Moon sign, your Moon sign itself, and the
                one after, making it a{" "}
                <span className="font-semibold text-primary-600">
                  7.5-year period
                </span>
                that's all about deep transformation.
              </p>
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 border border-ink-100 text-center">
                  <div className="text-2xl font-bold text-primary-600">2.5</div>
                  <div className="text-xs text-ink-500">
                    Years in First Phase
                  </div>
                  <div className="text-xs text-ink-400 mt-1">
                    Sign before Moon
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-ink-100 text-center">
                  <div className="text-2xl font-bold text-accent-600">2.5</div>
                  <div className="text-xs text-ink-500">
                    Years in Second Phase
                  </div>
                  <div className="text-xs text-ink-400 mt-1">Moon Sign</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-ink-100 text-center">
                  <div className="text-2xl font-bold text-secondary-600">
                    2.5
                  </div>
                  <div className="text-xs text-ink-500">
                    Years in Third Phase
                  </div>
                  <div className="text-xs text-ink-400 mt-1">
                    Sign after Moon
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ PHASES OF SADE SATI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function PhasesOfSadeSati() {
  const phases = [
    {
      title: "First Phase",
      icon: Home,
      description: "Saturn moves into the sign just before your Moon sign.",
      focus: "Relationships, family, emotional foundations",
      color: "from-blue-400 to-cyan-500",
    },
    {
      title: "Second Phase",
      icon: Target,
      description: "Saturn steps into your Moon sign.",
      focus: "Emotions, mindset, identity, inner self",
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Third Phase",
      icon: TrendingUp,
      description: "Saturn moves into the sign right after your Moon sign.",
      focus: "Career, reputation, long-term ambitions",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Three Phases"
            title="What are the Phases of Shani Sade Sati?"
            subtitle="Each phase brings its own mix of challenges, lessons, and chances to grow"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {phases.map((phase, i) => (
            <Reveal key={phase.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${phase.color} w-fit mb-4`}
                >
                  <phase.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-ink-900 mb-2">
                  {phase.title}
                </h3>
                <p className="text-sm text-ink-500">{phase.description}</p>
                <div className="mt-3 p-3 bg-ink-50 rounded-lg">
                  <p className="text-xs font-semibold text-ink-700">Focus:</p>
                  <p className="text-xs text-ink-500">{phase.focus}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ EFFECTS OF SADE SATI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function EffectsOfSadeSati() {
  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Effects"
            title="What are the effects of Sade Sati?"
            subtitle="A time of powerful transformation and inner awakening"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <Reveal delay={0.1}>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <Smile className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-bold text-ink-900">
                  Positive Effects
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  <span>
                    <span className="font-semibold">Career Growth:</span>{" "}
                    Rewards hard work with solid, long-term success
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  <span>
                    <span className="font-semibold">Spiritual Awakening:</span>{" "}
                    Draws you towards meditation and self-reflection
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  <span>
                    <span className="font-semibold">
                      Meaningful Connections:
                    </span>{" "}
                    Shallow friendships fade, genuine ones survive
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  <span>
                    <span className="font-semibold">Inner Strength:</span>{" "}
                    Builds resilience and emotional maturity
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border border-red-200">
              <div className="flex items-center gap-2 mb-3">
                <CloudRain className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-bold text-ink-900">
                  Challenging Effects
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <span className="font-semibold">Financial Strain:</span>{" "}
                    Money worries and delayed payments
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <span className="font-semibold">Health Issues:</span>{" "}
                    Stress-related health concerns
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <span className="font-semibold">Emotional Turmoil:</span>{" "}
                    Mood swings, anxiety, and restlessness
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <span className="font-semibold">Career Hurdles:</span>{" "}
                    Delays in promotions and project approvals
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ RASHIS AFFECTED â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function RashisAffected({ affectedSigns }: { affectedSigns: any[] }) {
  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Current Affected Signs"
            title="What are the Rashis affected by Saturn?"
            subtitle="In 2025, Saturn is in Aquarius"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {affectedSigns.map((sign, i) => (
            <Reveal key={sign.value} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all text-center">
                <div className="text-4xl">{sign.emoji}</div>
                <h3 className="text-lg font-bold text-ink-900 mt-2">
                  {sign.label}
                </h3>
                <div className="mt-2 p-2 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs font-semibold text-amber-700">
                    Currently in Sade Sati
                  </p>
                  <p className="text-xs text-amber-600 mt-1">
                    Saturn in Aquarius
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-6 max-w-4xl mx-auto">
            <div className="bg-accent-50 rounded-2xl p-6 border border-accent-200 text-center">
              <p className="text-sm text-ink-700">
                <span className="font-semibold">ðŸ’¡ Note:</span> If your Moon
                sign is Capricorn, Aquarius, or Pisces, you're right in the
                middle of this important phase.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ REMEDIES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Remedies() {
  const remedies = [
    {
      icon: MoonIcon,
      title: "Chant Mantras",
      description:
        'Chant "Om Sham Shanicharaya Namah" 108 times daily for peace and calm.',
    },
    {
      icon: Star,
      title: "Wear Gemstones",
      description:
        "Wear a blue sapphire (Neelam) after consulting a trusted astrologer.",
    },
    {
      icon: Heart,
      title: "Help Others",
      description:
        "Help the elderly, disabled, or those in need to lighten your karmic load.",
    },
    {
      icon: Calendar,
      title: "Visit Temples",
      description:
        "Visit Saturn temples on Saturdays and light sesame oil lamps.",
    },
    {
      icon: Activity,
      title: "Practice Discipline",
      description:
        "Keep a steady routine with regular sleep, balanced meals, and exercise.",
    },
    {
      icon: Sparkles,
      title: "Meditation & Yoga",
      description:
        "Practice meditation and yoga to keep your mind calm and grounded.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Remedies"
            title="What are the Remedies for Shani Sade Sati?"
            subtitle="Powerful tools to ease this phase and turn it into a time of growth"
          />
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {remedies.map((remedy, i) => (
            <Reveal key={remedy.title} delay={i * 0.1}>
              <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-4">
                  <remedy.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {remedy.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed">
                  {remedy.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ DO'S AND DON'TS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function DosAndDonts() {
  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Guidelines"
            title="Do's and Don'ts during Shani Sade Sati"
            subtitle="Following these guidelines can significantly improve your experience"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <Reveal delay={0.1}>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                <CheckCircle className="h-6 w-6" />
                Do's
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <span className="text-green-500">âœ“</span>
                  <span>
                    <span className="font-semibold">Reflect inward:</span> Use
                    this time for self-discovery through meditation
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <span className="text-green-500">âœ“</span>
                  <span>
                    <span className="font-semibold">
                      Strengthen spirituality:
                    </span>{" "}
                    Connect with mindfulness and traditional practices
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <span className="text-green-500">âœ“</span>
                  <span>
                    <span className="font-semibold">Build skills:</span> Learn
                    something new and commit to disciplined routines
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <span className="text-green-500">âœ“</span>
                  <span>
                    <span className="font-semibold">
                      Nurture relationships:
                    </span>{" "}
                    Lean on family, friends, and mentors
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <span className="text-green-500">âœ“</span>
                  <span>
                    <span className="font-semibold">Practice patience:</span>{" "}
                    Progress may be slow, but it leads to long-term rewards
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <span className="text-green-500">âœ“</span>
                  <span>
                    <span className="font-semibold">Give back:</span> Do seva or
                    charitable acts for others
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border border-red-200">
              <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                <AlertCircle className="h-6 w-6" />
                Don'ts
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <span className="text-red-500">âœ—</span>
                  <span>
                    <span className="font-semibold">Avoid big decisions:</span>{" "}
                    Pause before marriage, job changes, or investments
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <span className="text-red-500">âœ—</span>
                  <span>
                    <span className="font-semibold">
                      Don't start new ventures:
                    </span>{" "}
                    Wait for the third phase for new beginnings
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <span className="text-red-500">âœ—</span>
                  <span>
                    <span className="font-semibold">Don't ignore health:</span>{" "}
                    Rest, eat well, and manage stress
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <span className="text-red-500">âœ—</span>
                  <span>
                    <span className="font-semibold">Stay hopeful:</span> Don't
                    let negative thoughts take over
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <span className="text-red-500">âœ—</span>
                  <span>
                    <span className="font-semibold">Stay connected:</span> Don't
                    isolate yourself from loved ones
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
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
            <MoonIcon className="h-3 w-3" />
            Check Your Sade Sati
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Ready to check your{" "}
            <span className="gradient-text-light">Sade Sati?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
            Calculate your Sade Sati period now and understand the lessons
            Saturn has for you.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/sade-sati" variant="primary" size="lg">
              <MoonIcon className="h-4 w-4" />
              Check Now
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
