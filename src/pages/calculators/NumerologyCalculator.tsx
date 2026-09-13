import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
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
  BookOpen,
  Crown,
  Gem,
  Palette,
  Music,
  Coffee,
  Diamond,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/animations/Reveal";

// Chaldean numerology letter assignments
const chaldeanMap: { [key: string]: number } = {
  a: 1,
  i: 1,
  j: 1,
  q: 1,
  y: 1,
  b: 2,
  k: 2,
  r: 2,
  c: 3,
  g: 3,
  l: 3,
  s: 3,
  d: 4,
  m: 4,
  t: 4,
  e: 5,
  h: 5,
  n: 5,
  x: 5,
  u: 6,
  v: 6,
  w: 6,
  o: 7,
  z: 7,
  f: 8,
  p: 8,
};

// Number meanings
const numberMeanings: {
  [key: number]: {
    title: string;
    traits: string[];
    planet: string;
    color: string;
  };
} = {
  1: {
    title: "Sun",
    traits: ["Bold", "Independent", "Courageous", "Ambitious"],
    planet: "Sun",
    color: "from-orange-500 to-yellow-500",
  },
  2: {
    title: "Moon",
    traits: ["Caring", "Sensitive", "Emotional", "Intuitive"],
    planet: "Moon",
    color: "from-blue-400 to-cyan-500",
  },
  3: {
    title: "Jupiter",
    traits: ["Creative", "Communicator", "Storyteller", "Enthusiastic"],
    planet: "Jupiter",
    color: "from-yellow-500 to-amber-500",
  },
  4: {
    title: "Uranus",
    traits: ["Disciplined", "Responsible", "Trustworthy", "Hardworking"],
    planet: "Uranus",
    color: "from-indigo-500 to-purple-500",
  },
  5: {
    title: "Mercury",
    traits: [
      "Witty",
      "Adventurous",
      "Communicator",
      "Quick Thinker",
      "Adaptable",
    ],
    planet: "Mercury",
    color: "from-green-500 to-emerald-500",
  },
  6: {
    title: "Venus",
    traits: ["Artistic", "Magnetic", "Charming", "Creative", "Caring"],
    planet: "Venus",
    color: "from-pink-500 to-rose-500",
  },
  7: {
    title: "Neptune",
    traits: ["Intuitive", "Mysterious", "Philosophical", "Introspective"],
    planet: "Neptune",
    color: "from-purple-500 to-indigo-500",
  },
  8: {
    title: "Saturn",
    traits: ["Ambitious", "Hardworking", "Authoritative", "Resilient"],
    planet: "Saturn",
    color: "from-gray-600 to-slate-700",
  },
  9: {
    title: "Mars",
    traits: ["Energetic", "Brave", "Independent", "Impulsive"],
    planet: "Mars",
    color: "from-red-500 to-orange-500",
  },
};

// Birth number compatibility
const compatibilityMap: {
  [key: number]: { favorable: number[]; unfavorable: number[] };
} = {
  1: { favorable: [1, 2, 3, 9], unfavorable: [4, 8] },
  2: { favorable: [1, 2, 4, 7], unfavorable: [8, 9] },
  3: { favorable: [1, 3, 6, 9], unfavorable: [4, 8] },
  4: { favorable: [5], unfavorable: [8, 9] },
  5: { favorable: [1, 3, 5, 6], unfavorable: [4, 8] },
  6: { favorable: [3, 5, 6, 9], unfavorable: [1, 4] },
  7: { favorable: [2, 4, 6, 7], unfavorable: [1, 8] },
  8: { favorable: [5], unfavorable: [3] },
  9: { favorable: [1, 3, 6, 9], unfavorable: [4, 8] },
};

export default function NumerologyCalculator() {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    type: "chaldean",
  });

  const [result, setResult] = useState<null | {
    destinyNumber: number;
    personalityNumber: number;
    soulNumber: number;
    destinyTraits: string[];
    personalityTraits: string[];
    soulTraits: string[];
    birthNumber: number;
    isCompatible: boolean;
    compatibleNumbers: number[];
    incompatibleNumbers: number[];
    favorableSigns: string[];
    favorableAlphabets: string[];
    favorableDays: string[];
    favorableDates: number[];
    auspiciousColors: string[];
    godGoddess: string;
    mantra: string;
  }>(null);

  const calculateNumerology = (name: string, birthDate: string) => {
    const cleanName = name.toLowerCase().replace(/\s/g, "");

    // Calculate Destiny Number (all letters)
    let destinySum = 0;
    for (const char of cleanName) {
      if (chaldeanMap[char]) {
        destinySum += chaldeanMap[char];
      }
    }
    const destinyNumber = reduceToSingleDigit(destinySum);

    // Calculate Personality Number (consonants only)
    const consonants = "bcdfghjklmnpqrstvwxyz";
    let personalitySum = 0;
    for (const char of cleanName) {
      if (consonants.includes(char) && chaldeanMap[char]) {
        personalitySum += chaldeanMap[char];
      }
    }
    const personalityNumber = reduceToSingleDigit(personalitySum);

    // Calculate Soul Number (vowels only)
    const vowels = "aeiou";
    let soulSum = 0;
    for (const char of cleanName) {
      if (vowels.includes(char) && chaldeanMap[char]) {
        soulSum += chaldeanMap[char];
      }
    }
    const soulNumber = reduceToSingleDigit(soulSum);

    // Calculate Birth Number
    const birthDateObj = new Date(birthDate);
    const day = birthDateObj.getDate();
    const month = birthDateObj.getMonth() + 1;
    const year = birthDateObj.getFullYear();
    const birthSum = day + month + year;
    const birthNumber = reduceToSingleDigit(birthSum);

    // Check compatibility
    const compat = compatibilityMap[birthNumber] || {
      favorable: [],
      unfavorable: [],
    };
    const isCompatible = compat.favorable.includes(destinyNumber);

    // Get traits
    const destinyTraits = numberMeanings[destinyNumber]?.traits || [];
    const personalityTraits = numberMeanings[personalityNumber]?.traits || [];
    const soulTraits = numberMeanings[soulNumber]?.traits || [];

    // Additional info
    const favorableSigns = [
      "Aries",
      "Leo",
      "Sagittarius",
      "Taurus",
      "Virgo",
      "Capricorn",
      "Gemini",
      "Libra",
      "Aquarius",
      "Cancer",
      "Scorpio",
      "Pisces",
    ];
    const favorableAlphabets = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    const favorableDays = [
      "Monday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Sunday",
    ];
    const favorableDates = [
      1, 3, 5, 6, 9, 10, 12, 14, 15, 18, 19, 21, 23, 24, 27, 28, 30,
    ];
    const auspiciousColors = [
      "Red",
      "Yellow",
      "Orange",
      "Green",
      "Blue",
      "Purple",
      "Gold",
      "Silver",
    ];
    const godsGoddesses = [
      "Ganesha",
      "Lakshmi",
      "Saraswati",
      "Shiva",
      "Vishnu",
      "Durga",
      "Krishna",
      "Rama",
    ];
    const mantras = [
      "Om Namah Shivaya",
      "Om Gam Ganapataye Namah",
      "Om Shreem Mahalakshmiyei Namah",
      "Om Namo Bhagavate Vasudevaya",
    ];

    setResult({
      destinyNumber,
      personalityNumber,
      soulNumber,
      destinyTraits,
      personalityTraits,
      soulTraits,
      birthNumber,
      isCompatible,
      compatibleNumbers: compat.favorable,
      incompatibleNumbers: compat.unfavorable,
      favorableSigns: favorableSigns.slice(0, 4),
      favorableAlphabets: favorableAlphabets.slice(0, 6),
      favorableDays: favorableDays.slice(0, 3),
      favorableDates: favorableDates.slice(0, 5),
      auspiciousColors: auspiciousColors.slice(0, 4),
      godGoddess: godsGoddesses[destinyNumber % godsGoddesses.length],
      mantra: mantras[destinyNumber % mantras.length],
    });
  };

  const reduceToSingleDigit = (num: number): number => {
    if (num === 0) return 0;
    if (num === 9) return 9;
    while (num > 9) {
      num = num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.birthDate) {
      calculateNumerology(formData.name, formData.birthDate);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Numerology Form */}
      <NumerologyForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        result={result}
      />

      {/* What is Name Numerology */}
      <WhatIsNameNumerology />

      {/* Difference Between Systems */}
      <SystemDifference />

      {/* Number Significance */}
      <NumberSignificance />

      {/* Compatibility Guide */}
      <CompatibilityGuide />

      {/* When to Change Name */}
      <WhenToChangeName />

      {/* How It Works */}
      <HowItWorks />

      {/* Why Choose Us */}
      <WhyChooseNumerology />

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
            <Calculator className="h-3 w-3" />
            Free Online Tool
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 mb-4">
            Name Numerology Calculator
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-xl md:text-2xl font-semibold text-primary-600 mb-6">
            Find Your Destiny, Personality & Soul Number
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <p className="text-base text-ink-600 leading-relaxed">
              Ever wondered why some people do not achieve anything despite all
              the hard work, whereas others with minimal effort reach heights?
              This is not a coincidence. Instead, a science called{" "}
              <span className="font-semibold text-primary-600">
                name numerology
              </span>
              . As per it, each letter in your name has been assigned a number
              that carries energy. The habitual use of your name in the outer
              world and your inner world decides whether that energy is
              channelised in the right direction or not.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ NUMEROLOGY FORM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface NumerologyFormProps {
  formData: {
    name: string;
    birthDate: string;
    type: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  result: null | {
    destinyNumber: number;
    personalityNumber: number;
    soulNumber: number;
    destinyTraits: string[];
    personalityTraits: string[];
    soulTraits: string[];
    birthNumber: number;
    isCompatible: boolean;
    compatibleNumbers: number[];
    incompatibleNumbers: number[];
    favorableSigns: string[];
    favorableAlphabets: string[];
    favorableDays: string[];
    favorableDates: number[];
    auspiciousColors: string[];
    godGoddess: string;
    mantra: string;
  };
}

function NumerologyForm({
  formData,
  handleChange,
  handleSubmit,
  result,
}: NumerologyFormProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container-8xl">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-ink-50 rounded-2xl p-6 md:p-8 border border-ink-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500">
                  <Calculator className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-ink-900">
                    Enter Your Details
                  </h2>
                  <p className="text-xs text-ink-500">
                    Discover your numerology numbers
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-6">
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
                        placeholder="Enter Name in English Only"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Birth Date */}
                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-1">
                      Birth Date <span className="text-danger-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Type
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                    >
                      <option value="chaldean">Cheiro / Chaldean</option>
                      <option value="pythagorean">Pythagorean</option>
                      <option value="sepharial">Sepharial</option>
                      <option value="modern">Modern</option>
                    </select>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  type="submit"
                >
                  <Sparkles className="h-4 w-4" />
                  Calculate Numerology
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
                  {/* Main Numbers */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4 border border-primary-200 text-center">
                      <div className="text-xs text-primary-600 font-semibold">
                        Destiny Number
                      </div>
                      <div className="text-3xl font-bold text-primary-700">
                        {result.destinyNumber}
                      </div>
                      <div className="text-xs text-ink-500">
                        {numberMeanings[result.destinyNumber]?.planet || ""}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-4 border border-accent-200 text-center">
                      <div className="text-xs text-accent-600 font-semibold">
                        Personality Number
                      </div>
                      <div className="text-3xl font-bold text-accent-700">
                        {result.personalityNumber}
                      </div>
                      <div className="text-xs text-ink-500">
                        {numberMeanings[result.personalityNumber]?.planet || ""}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 text-center">
                      <div className="text-xs text-purple-600 font-semibold">
                        Soul Number
                      </div>
                      <div className="text-3xl font-bold text-purple-700">
                        {result.soulNumber}
                      </div>
                      <div className="text-xs text-ink-500">
                        {numberMeanings[result.soulNumber]?.planet || ""}
                      </div>
                    </div>
                  </div>

                  {/* Compatibility */}
                  <div
                    className={`p-4 rounded-xl border ${result.isCompatible ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}
                  >
                    <div className="flex items-center gap-2">
                      {result.isCompatible ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                      )}
                      <span className="font-semibold text-ink-900">
                        {result.isCompatible
                          ? "âœ… Compatible!"
                          : "âš ï¸ May need adjustment"}
                      </span>
                    </div>
                    <p className="text-sm text-ink-600 mt-1">
                      Birth Number: {result.birthNumber} | Compatible with:{" "}
                      {result.compatibleNumbers.join(", ")} | Incompatible with:{" "}
                      {result.incompatibleNumbers.join(", ")}
                    </p>
                  </div>

                  {/* Traits */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-ink-100">
                      <h4 className="text-sm font-bold text-ink-900 mb-2">
                        Destiny Traits
                      </h4>
                      <ul className="space-y-1">
                        {result.destinyTraits.map((trait, i) => (
                          <li
                            key={i}
                            className="text-xs text-ink-600 flex items-center gap-1"
                          >
                            <span className="text-primary-500">â€¢</span>
                            {trait}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-ink-100">
                      <h4 className="text-sm font-bold text-ink-900 mb-2">
                        Personality Traits
                      </h4>
                      <ul className="space-y-1">
                        {result.personalityTraits.map((trait, i) => (
                          <li
                            key={i}
                            className="text-xs text-ink-600 flex items-center gap-1"
                          >
                            <span className="text-accent-500">â€¢</span>
                            {trait}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-ink-100">
                      <h4 className="text-sm font-bold text-ink-900 mb-2">
                        Soul Traits
                      </h4>
                      <ul className="space-y-1">
                        {result.soulTraits.map((trait, i) => (
                          <li
                            key={i}
                            className="text-xs text-ink-600 flex items-center gap-1"
                          >
                            <span className="text-purple-500">â€¢</span>
                            {trait}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-ink-100">
                      <h4 className="text-sm font-bold text-ink-900 mb-2">
                        Favorable Signs
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {result.favorableSigns.map((sign, i) => (
                          <span
                            key={i}
                            className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full"
                          >
                            {sign}
                          </span>
                        ))}
                      </div>
                      <h4 className="text-sm font-bold text-ink-900 mt-3 mb-2">
                        Favorable Alphabets
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {result.favorableAlphabets.map((letter, i) => (
                          <span
                            key={i}
                            className="text-xs bg-accent-50 text-accent-700 px-2 py-0.5 rounded-full"
                          >
                            {letter}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-ink-100">
                      <h4 className="text-sm font-bold text-ink-900 mb-2">
                        Auspicious Colors
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {result.auspiciousColors.map((color, i) => (
                          <span
                            key={i}
                            className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                      <h4 className="text-sm font-bold text-ink-900 mt-3 mb-2">
                        God/Goddess & Mantra
                      </h4>
                      <div className="text-xs text-ink-600">
                        {result.godGoddess}
                      </div>
                      <div className="text-xs text-ink-600 font-medium mt-1">
                        "{result.mantra}"
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl p-4 text-center text-white">
                    <p className="text-sm">
                      Connect with an Astrologer on Call or Chat for more
                      personalised detailed predictions.
                    </p>
                    <div className="flex justify-center gap-3 mt-3">
                      <Button to="/consultations" variant="dark" size="sm">
                        Talk to Astrologer
                      </Button>
                      <Button to="/consultations" variant="dark" size="sm">
                        Chat with Astrologer
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHAT IS NAME NUMEROLOGY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhatIsNameNumerology() {
  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="What is Name Numerology?"
            title="Understanding Name Numerology"
            subtitle="Name numerology is an ancient science that assigns numerical value to every letter in the name"
          />
        </Reveal>

        <div className="mt-8 w-full">
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl p-8 border border-ink-100 w-full">
              <p className="text-ink-700 leading-relaxed">
                Name numerology is an ancient science that assigns numerical
                value to every letter in the name. As per it, every letter
                carries an energy, and based on the numerical value assigned,
                the resulting number determines your career, relationships, and
                the quality of life. In a nutshell, name numerology shapes
                reality and determines whether your name is hindering your
                progress or helping you grow, as it subconsciously creates a
                vibrational frequency in your outer and inner worlds.
              </p>
              <div className="mt-4 p-4 bg-accent-50 rounded-xl border border-accent-200">
                <p className="text-sm text-ink-700">
                  <span className="font-semibold">
                    ðŸ’¡ The Chaldean System:
                  </span>{" "}
                  The Chaldean system is considered the most accurate among all
                  numerology systems. It assigns numbers to letters based on
                  sounds and vibrations, using numbers 1-8 (9 is considered
                  sacred or hidden).
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ SYSTEM DIFFERENCE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function SystemDifference() {
  const systems = [
    {
      name: "Chaldean",
      origin: "Ancient Babylon",
      principle: "Assigns numbers to letters based on sounds and vibrations",
      numbers: "1-8 (9 is sacred or hidden)",
      relevance: "Highly spiritual",
      accuracy: "Highest",
    },
    {
      name: "Pythagorean",
      origin: "Ancient Greece",
      principle: "Assigns numbers to letters based on alphabetical sequence",
      numbers: "1-9, every number is used",
      relevance: "Spiritual and practical",
      accuracy: "High",
    },
    {
      name: "Sepharial",
      origin: "Britain",
      principle: "Uses a blend of Chaldean along with astrology",
      numbers: "1-9 with planetary influences",
      relevance: "Spiritual with astrology",
      accuracy: "Moderate",
    },
    {
      name: "Modern",
      origin: "Modern mix",
      principle:
        "Blends Pythagorean with Chaldean, along with modern psychology",
      numbers: "1-9 with master numbers",
      relevance: "Psychological",
      accuracy: "Varies",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Numerology Systems"
            title="What Is the Difference Between Different Name Numerology Systems?"
            subtitle="The differences between Chaldean, Pythagorean, Sephardic, and modern numerology systems"
          />
        </Reveal>

        <div className="mt-8 w-full overflow-x-auto">
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-600 to-accent-500">
                    <th className="text-left py-3 px-4 text-white font-semibold text-sm">
                      Aspect
                    </th>
                    <th className="text-left py-3 px-4 text-white font-semibold text-sm">
                      Chaldean
                    </th>
                    <th className="text-left py-3 px-4 text-white font-semibold text-sm">
                      Pythagorean
                    </th>
                    <th className="text-left py-3 px-4 text-white font-semibold text-sm">
                      Sepharial
                    </th>
                    <th className="text-left py-3 px-4 text-white font-semibold text-sm">
                      Modern
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Origin",
                    "Core Principle",
                    "Numbers Used",
                    "Relevance",
                    "Accuracy",
                  ].map((aspect, idx) => (
                    <tr
                      key={aspect}
                      className={idx % 2 === 0 ? "bg-ink-50" : "bg-white"}
                    >
                      <td className="py-3 px-4 text-sm font-semibold text-ink-900">
                        {aspect}
                      </td>
                      {systems.map((sys) => {
                        const value =
                          sys[
                            aspect
                              .toLowerCase()
                              .replace(" ", "") as keyof typeof sys
                          ] ||
                          sys[aspect.toLowerCase() as keyof typeof sys] ||
                          "";
                        return (
                          <td
                            key={sys.name}
                            className="py-3 px-4 text-sm text-ink-600"
                          >
                            {String(value)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-6 bg-primary-50 rounded-2xl p-6 border border-primary-200">
            <h3 className="text-lg font-bold text-ink-900 mb-2">
              Chaldean Numerology Letter Assignment
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl p-3 text-center">
                <span className="text-lg font-bold text-primary-600">1</span>
                <p className="text-xs text-ink-500">A, I, J, Q, Y</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center">
                <span className="text-lg font-bold text-accent-600">2</span>
                <p className="text-xs text-ink-500">B, K, R</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center">
                <span className="text-lg font-bold text-primary-600">3</span>
                <p className="text-xs text-ink-500">C, G, L, S</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center">
                <span className="text-lg font-bold text-accent-600">4</span>
                <p className="text-xs text-ink-500">D, M, T</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center">
                <span className="text-lg font-bold text-primary-600">5</span>
                <p className="text-xs text-ink-500">E, H, N, X</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center">
                <span className="text-lg font-bold text-accent-600">6</span>
                <p className="text-xs text-ink-500">U, V, W</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center">
                <span className="text-lg font-bold text-primary-600">7</span>
                <p className="text-xs text-ink-500">O, Z</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center">
                <span className="text-lg font-bold text-accent-600">8</span>
                <p className="text-xs text-ink-500">F, P</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ NUMBER SIGNIFICANCE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function NumberSignificance() {
  const numbers = [
    {
      num: 1,
      title: "Sun",
      traits: "Bold, Independent, Courageous, Ambitious",
      color: "from-orange-500 to-yellow-500",
    },
    {
      num: 2,
      title: "Moon",
      traits: "Caring, Sensitive, Emotional, Intuitive",
      color: "from-blue-400 to-cyan-500",
    },
    {
      num: 3,
      title: "Jupiter",
      traits: "Creative, Communicator, Storyteller, Enthusiastic",
      color: "from-yellow-500 to-amber-500",
    },
    {
      num: 4,
      title: "Uranus",
      traits: "Disciplined, Responsible, Trustworthy, Hardworking",
      color: "from-indigo-500 to-purple-500",
    },
    {
      num: 5,
      title: "Mercury",
      traits: "Witty, Adventurous, Communicator, Quick Thinker, Adaptable",
      color: "from-green-500 to-emerald-500",
    },
    {
      num: 6,
      title: "Venus",
      traits: "Artistic, Magnetic, Charming, Creative, Caring",
      color: "from-pink-500 to-rose-500",
    },
    {
      num: 7,
      title: "Neptune",
      traits: "Intuitive, Mysterious, Philosophical, Introspective",
      color: "from-purple-500 to-indigo-500",
    },
    {
      num: 8,
      title: "Saturn",
      traits: "Ambitious, Hardworking, Authoritative, Resilient",
      color: "from-gray-600 to-slate-700",
    },
    {
      num: 9,
      title: "Mars",
      traits: "Energetic, Brave, Independent, Impulsive",
      color: "from-red-500 to-orange-500",
    },
  ];

  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Number Significance"
            title="Name Numerology: Every Number Significance"
            subtitle="Based on the numerology calculator, all three of these numbers reveal different traits"
          />
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {numbers.map((item, i) => (
            <Reveal key={item.num} delay={i * 0.05}>
              <div
                className={`bg-white rounded-2xl p-4 border border-ink-100 hover:shadow-lg transition-all`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-lg`}
                  >
                    {item.num}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink-900">
                      {item.title}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-ink-500">{item.traits}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ COMPATIBILITY GUIDE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function CompatibilityGuide() {
  const compatData = [
    { birth: 1, favorable: "1, 2, 3, 9", unfavorable: "4, 8" },
    { birth: 2, favorable: "1, 2, 4, 7", unfavorable: "8, 9" },
    { birth: 3, favorable: "1, 3, 6, 9", unfavorable: "4, 8" },
    { birth: 4, favorable: "5", unfavorable: "8, 9" },
    { birth: 5, favorable: "1, 3, 5, 6", unfavorable: "4, 8" },
    { birth: 6, favorable: "3, 5, 6, 9", unfavorable: "1, 4" },
    { birth: 7, favorable: "2, 4, 6, 7", unfavorable: "1, 8" },
    { birth: 8, favorable: "5", unfavorable: "3" },
    { birth: 9, favorable: "1, 3, 6, 9", unfavorable: "4, 8" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Compatibility Guide"
            title="Birth Number & Destiny Number Compatibility"
            subtitle="Check if your birth number aligns with your destiny number"
          />
        </Reveal>

        <div className="mt-8 w-full overflow-x-auto">
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-600 to-accent-500">
                    <th className="text-left py-3 px-4 text-white font-semibold text-sm">
                      Birth Date
                    </th>
                    <th className="text-left py-3 px-4 text-white font-semibold text-sm">
                      Favorable Destiny Number
                    </th>
                    <th className="text-left py-3 px-4 text-white font-semibold text-sm">
                      Unfavorable Destiny Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compatData.map((item, i) => (
                    <tr
                      key={item.birth}
                      className={i % 2 === 0 ? "bg-ink-50" : "bg-white"}
                    >
                      <td className="py-3 px-4 text-sm font-semibold text-ink-900">
                        {item.birth}
                      </td>
                      <td className="py-3 px-4 text-sm text-green-600 font-medium">
                        {item.favorable}
                      </td>
                      <td className="py-3 px-4 text-sm text-red-600 font-medium">
                        {item.unfavorable}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-6 p-4 bg-accent-50 rounded-xl border border-accent-200 max-w-6xl mx-auto">
            <p className="text-sm text-ink-700">
              <span className="font-semibold">ðŸ’¡ Special Note:</span> Though 9
              appears as a destiny number, this number is considered sacred.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHEN TO CHANGE NAME â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhenToChangeName() {
  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Name Correction"
            title="When Should You Change Your Name?"
            subtitle="Birth number should align with the destiny number for better life outcomes"
          />
        </Reveal>

        <div className="mt-8 max-w-6xl mx-auto">
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl p-8 border border-ink-100 w-full">
              <p className="text-ink-700 leading-relaxed mb-4">
                Birth number, which is the sum total of your birth date, should
                align with the destiny number. If they don't align, changing
                your name can help bring harmony and better results in life.
              </p>
              <div className="p-4 bg-primary-50 rounded-xl border border-primary-200">
                <h4 className="text-sm font-bold text-ink-900 mb-2">
                  Example: Name Correction
                </h4>
                <p className="text-sm text-ink-600">
                  Kritika's birth date is 8, and the destiny number reduces to
                  4. In such a case, name correction should reduce the name to
                  5, which can be achieved by adding an extra "a."
                </p>
                <div className="mt-3 grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs font-semibold text-ink-900">
                      Previous Destiny Number
                    </p>
                    <p className="text-xs text-ink-500">
                      K(2) R(2) I(1) T(4) I(1) K(2) A(1) = 13 â†’ 4
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs font-semibold text-ink-900">
                      Corrected Destiny Number
                    </p>
                    <p className="text-xs text-ink-500">
                      K(2) R(2) I(1) T(4) I(1) K(2) A(1) A(1) = 14 â†’ 5
                    </p>
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HOW IT WORKS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: User,
      title: "Enter Your Name",
      description: "Enter your name and birth details in the calculator.",
    },
    {
      number: 2,
      icon: Globe,
      title: "Select Type",
      description:
        "Choose one among Chaldean, Pythagorean, Sepharial, and Modern.",
    },
    {
      number: 3,
      icon: Sparkles,
      title: "Submit & Calculate",
      description: 'Click on "Calculate Numerology" to get your results.',
    },
    {
      number: 4,
      icon: Star,
      title: "Explore Your Numbers",
      description:
        "Check your destiny number and explore favorable signs, alphabets, days, and more.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="How It Works"
            title="How Does the Name Numerology Calculator Work?"
            subtitle="Get your numerology results in 4 easy steps"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1}>
              <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all text-center">
                <div className="relative">
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white text-xl font-bold mb-4">
                    {step.number}
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto -mt-10 mb-3">
                    <step.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHY CHOOSE NUMEROLOGY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhyChooseNumerology() {
  const features = [
    {
      icon: Award,
      title: "Three Key Numbers",
      description:
        "Get your Destiny, Personality, and Soul numbers for a complete personality analysis.",
    },
    {
      icon: Star,
      title: "Detailed Insights",
      description:
        "Explore favorable signs, alphabets, days, dates, auspicious colors, and more.",
    },
    {
      icon: Shield,
      title: "Accurate Chaldean System",
      description:
        "Based on the highly accurate Chaldean numerology system for precise results.",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Get your numerology results immediately after entering your details.",
    },
  ];

  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Why Choose Us"
            title="Why Use Jyotish AI's Name Numerology Calculator?"
            subtitle="Get accurate and detailed numerology insights instantly"
          />
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-primary-600 to-accent-500 rounded-2xl p-6 text-center text-white">
              <p className="text-lg font-semibold">
                Need Personalized Guidance?
              </p>
              <p className="text-sm opacity-90 mt-1">
                Connect with expert astrologers for detailed numerology
                predictions and name correction advice.
              </p>
              <div className="flex justify-center gap-3 mt-3">
                <Button to="/consultations" variant="dark" size="sm">
                  <Users className="h-4 w-4" />
                  Talk to Astrologer
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
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
            <Calculator className="h-3 w-3" />
            Find Your Numbers
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Ready to discover your{" "}
            <span className="gradient-text-light">numerology numbers?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
            Calculate your Destiny, Personality, and Soul numbers now and unlock
            the secrets of your name.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/numerology-calculator" variant="primary" size="lg">
              <Calculator className="h-4 w-4" />
              Calculate Now
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
