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
  Compass,
  Feather,
  Handshake,
  Target,
  Compass as CompassIcon,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/animations/Reveal";

// Pythagorean numerology mapping
const pythagoreanMap: { [key: string]: number } = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 1,
  k: 2,
  l: 3,
  m: 4,
  n: 5,
  o: 6,
  p: 7,
  q: 8,
  r: 9,
  s: 1,
  t: 2,
  u: 3,
  v: 4,
  w: 5,
  x: 6,
  y: 7,
  z: 8,
};

// Destiny number meanings
const destinyMeanings: {
  [key: number]: {
    title: string;
    emoji: string;
    traits: string[];
    careers: string[];
    strengths: string[];
    weaknesses: string[];
    color: string;
    description: string;
  };
} = {
  1: {
    title: "The Leader",
    emoji: "ðŸ¥‡",
    traits: [
      "Born leader",
      "Independent",
      "Innovative",
      "Courageous",
      "Ambitious",
    ],
    careers: [
      "Business owner",
      "Inventor",
      "Manager",
      "Entrepreneur",
      "Executive",
    ],
    strengths: ["Taking charge", "Initiative", "Decision making", "Courage"],
    weaknesses: ["Bossy", "Ego-driven", "Impatient", "Dominant"],
    color: "from-orange-500 to-yellow-500",
    description:
      "Born to lead, take charge, and try new things. You have natural authority and vision.",
  },
  2: {
    title: "The Peacemaker",
    emoji: "ðŸ¤",
    traits: ["Gentle", "Kind", "Cooperative", "Diplomatic", "Intuitive"],
    careers: ["Teaching", "Counseling", "Mediation", "Teamwork", "Diplomacy"],
    strengths: ["Problem solving", "Empathy", "Patience", "Harmony"],
    weaknesses: [
      "Overly sensitive",
      "Indecisive",
      "Approval-seeking",
      "Self-neglect",
    ],
    color: "from-blue-400 to-cyan-500",
    description:
      "Gentle, kind, and work well with others. You shine in teamwork and helping roles.",
  },
  3: {
    title: "The Creative Soul",
    emoji: "ðŸŽ¨",
    traits: [
      "Creative",
      "Expressive",
      "Enthusiastic",
      "Inspiring",
      "Charismatic",
    ],
    careers: ["Writer", "Actor", "Artist", "Marketer", "Entertainer"],
    strengths: ["Creativity", "Communication", "Inspiration", "Joy"],
    weaknesses: [
      "Unfocused",
      "Scattered",
      "Over-optimistic",
      "Lack of follow-through",
    ],
    color: "from-yellow-500 to-amber-500",
    description:
      "Full of ideas, art, and fun. You bring joy and creativity wherever you go.",
  },
  4: {
    title: "The Builder",
    emoji: "ðŸ§±",
    traits: [
      "Hardworking",
      "Practical",
      "Organized",
      "Reliable",
      "Disciplined",
    ],
    careers: [
      "Engineer",
      "Architect",
      "Accountant",
      "Project Manager",
      "Organizer",
    ],
    strengths: ["Planning", "Stability", "Systems thinking", "Persistence"],
    weaknesses: [
      "Rigid",
      "Overly cautious",
      "Resistant to change",
      "Inflexible",
    ],
    color: "from-indigo-500 to-purple-500",
    description:
      "Hardworking, practical, and love making strong foundations. You build lasting success.",
  },
  5: {
    title: "The Explorer",
    emoji: "ðŸŒ",
    traits: [
      "Adventurous",
      "Freedom-loving",
      "Adaptable",
      "Curious",
      "Dynamic",
    ],
    careers: ["Sales", "Travel", "Tourism", "Marketing", "Entrepreneur"],
    strengths: ["Adaptability", "Versatility", "Risk-taking", "Communication"],
    weaknesses: ["Restless", "Impulsive", "Unpredictable", "Commitment issues"],
    color: "from-green-500 to-emerald-500",
    description:
      "Love freedom, change, and adventure. You thrive in dynamic and exciting careers.",
  },
  6: {
    title: "The Caregiver",
    emoji: "ðŸ‘¨â€ðŸ‘©â€ðŸ‘§",
    traits: [
      "Loving",
      "Helpful",
      "Family-focused",
      "Responsible",
      "Compassionate",
    ],
    careers: ["Teaching", "Nursing", "Social work", "Healing", "Counseling"],
    strengths: ["Caring", "Responsibility", "Empathy", "Service"],
    weaknesses: [
      "Overly sacrificial",
      "Control issues",
      "Worrying",
      "Self-neglect",
    ],
    color: "from-pink-500 to-rose-500",
    description:
      "Loving, helpful, and family-focused. You do well in teaching, healing, or caring roles.",
  },
  7: {
    title: "The Thinker",
    emoji: "ðŸ§˜",
    traits: [
      "Deep thinker",
      "Philosophical",
      "Introspective",
      "Spiritual",
      "Analytical",
    ],
    careers: [
      "Scientist",
      "Researcher",
      "Spiritual guide",
      "Professor",
      "Analyst",
    ],
    strengths: ["Analysis", "Intuition", "Wisdom", "Independence"],
    weaknesses: ["Isolation", "Overthinking", "Detachment", "Pessimism"],
    color: "from-purple-500 to-indigo-500",
    description:
      "Love to study, think deeply, and seek truth. You are a natural seeker of wisdom.",
  },
  8: {
    title: "The Achiever",
    emoji: "ðŸ’¼",
    traits: ["Ambitious", "Powerful", "Practical", "Strategic", "Successful"],
    careers: [
      "Business",
      "Finance",
      "Management",
      "Leadership",
      "Entrepreneurship",
    ],
    strengths: ["Leadership", "Strategy", "Wealth building", "Authority"],
    weaknesses: ["Workaholic", "Materialistic", "Controlling", "Impersonal"],
    color: "from-gray-600 to-slate-700",
    description:
      "All about money, power, and leadership. You succeed in business and large projects.",
  },
  9: {
    title: "The Giver",
    emoji: "ðŸ’–",
    traits: [
      "Compassionate",
      "Generous",
      "Humanitarian",
      "Idealistic",
      "Selfless",
    ],
    careers: [
      "Social worker",
      "Healer",
      "Charity",
      "Humanitarian",
      "Counselor",
    ],
    strengths: ["Compassion", "Service", "Vision", "Generosity"],
    weaknesses: [
      "Overly idealistic",
      "Self-sacrificing",
      "Emotional draining",
      "Boundary issues",
    ],
    color: "from-red-500 to-orange-500",
    description:
      "Care deeply about helping others. You are meant to serve and make the world better.",
  },
  11: {
    title: "The Master Intuitive",
    emoji: "ðŸ”®",
    traits: [
      "Highly intuitive",
      "Spiritual",
      "Inspiring",
      "Visionary",
      "Mystical",
    ],
    careers: ["Spiritual teacher", "Healer", "Artist", "Psychic", "Guide"],
    strengths: ["Intuition", "Inspiration", "Spiritual connection", "Vision"],
    weaknesses: ["Overwhelming energy", "Anxiety", "Self-doubt", "Sensitivity"],
    color: "from-purple-400 to-pink-400",
    description:
      "A master number with higher purpose and spiritual mission. You are here to inspire and heal.",
  },
  22: {
    title: "The Master Builder",
    emoji: "ðŸ—ï¸",
    traits: [
      "Visionary",
      "Practical",
      "Powerful",
      "Innovative",
      "Inspirational",
    ],
    careers: [
      "Architect",
      "World leader",
      "Inventor",
      "Philanthropist",
      "Creator",
    ],
    strengths: ["Vision", "Practicality", "Leadership", "Manifestation"],
    weaknesses: ["Overwhelming pressure", "Burnout", "Perfectionism", "Stress"],
    color: "from-blue-600 to-indigo-600",
    description:
      "A master number with the power to turn dreams into reality. You build on a global scale.",
  },
  33: {
    title: "The Master Teacher",
    emoji: "ðŸ“š",
    traits: ["Compassionate", "Wise", "Nurturing", "Inspiring", "Selfless"],
    careers: ["Teacher", "Mentor", "Healer", "Spiritual guide", "Humanitarian"],
    strengths: ["Wisdom", "Compassion", "Teaching", "Healing"],
    weaknesses: [
      "Self-sacrifice",
      "Overwhelming responsibility",
      "Burnout",
      "Emotional drain",
    ],
    color: "from-yellow-400 to-orange-400",
    description:
      "A master number with the highest spiritual purpose. You are here to teach and uplift humanity.",
  },
};

// Life path meanings
const lifePathMeanings: {
  [key: number]: { title: string; description: string };
} = {
  1: {
    title: "The Pioneer",
    description:
      "You are here to lead, innovate, and create new paths. Independence and self-reliance are your life lessons.",
  },
  2: {
    title: "The Diplomat",
    description:
      "Your life path involves cooperation, partnerships, and bringing people together. You are a natural peacemaker.",
  },
  3: {
    title: "The Creator",
    description:
      "You are destined for creative expression, communication, and inspiring others through your talents.",
  },
  4: {
    title: "The Builder",
    description:
      "Your life path is to build solid foundations, create systems, and bring stability to your community.",
  },
  5: {
    title: "The Adventurer",
    description:
      "You are destined for exploration, freedom, and embracing change. Variety is your life's purpose.",
  },
  6: {
    title: "The Nurturer",
    description:
      "Your life path involves caring for others, creating harmony, and being responsible for family and community.",
  },
  7: {
    title: "The Seeker",
    description:
      "You are destined for spiritual growth, research, and uncovering hidden truths and wisdom.",
  },
  8: {
    title: "The Achiever",
    description:
      "Your life path is to achieve success, build wealth, and reach positions of power and authority.",
  },
  9: {
    title: "The Humanitarian",
    description:
      "You are destined to serve humanity, spread love, and make the world a better place.",
  },
};

export default function DestinyNumber() {
  const [formData, setFormData] = useState({
    name: "",
    day: "",
    month: "",
    year: "",
  });

  const [result, setResult] = useState<null | {
    destinyNumber: number;
    lifePathNumber: number;
    destinyMeaning: (typeof destinyMeanings)[1];
    lifePathMeaning: (typeof lifePathMeanings)[1];
    compatibility: string;
    strengths: string[];
    weaknesses: string[];
    careers: string[];
    traits: string[];
    luckyColors: string[];
    luckyDays: string[];
    luckyNumbers: number[];
    isMasterNumber: boolean;
  }>(null);

  const calculateDestinyNumber = (name: string) => {
    const cleanName = name.toLowerCase().replace(/\s/g, "");
    let sum = 0;
    for (const char of cleanName) {
      if (pythagoreanMap[char]) {
        sum += pythagoreanMap[char];
      }
    }
    return reduceToSingleDigit(sum);
  };

  const calculateLifePathNumber = (
    day: string,
    month: string,
    year: string,
  ) => {
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    const total = dayNum + monthNum + yearNum;
    return reduceToSingleDigit(total);
  };

  const reduceToSingleDigit = (num: number): number => {
    if (num === 0) return 0;
    // Check for master numbers
    if (num === 11 || num === 22 || num === 33) return num;
    while (num > 9) {
      num = num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  const isMasterNumber = (num: number): boolean => {
    return num === 11 || num === 22 || num === 33;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.day && formData.month && formData.year) {
      const destinyNum = calculateDestinyNumber(formData.name);
      const lifePathNum = calculateLifePathNumber(
        formData.day,
        formData.month,
        formData.year,
      );

      const destinyMeaning = destinyMeanings[destinyNum] || destinyMeanings[1];
      const lifePathMeaning =
        lifePathMeanings[lifePathNum] || lifePathMeanings[1];

      // Check compatibility
      let compatibility = "";
      if (destinyNum === lifePathNum) {
        compatibility =
          "Perfect Alignment - Your destiny and life path are in complete harmony!";
      } else if (
        destinyNum === 1 &&
        (lifePathNum === 3 || lifePathNum === 5 || lifePathNum === 6)
      ) {
        compatibility =
          "Good Alignment - Your leadership qualities support your life journey.";
      } else if (
        destinyNum === 2 &&
        (lifePathNum === 4 || lifePathNum === 6 || lifePathNum === 7)
      ) {
        compatibility =
          "Good Alignment - Your diplomatic nature supports your life path.";
      } else if (
        destinyNum === 3 &&
        (lifePathNum === 1 || lifePathNum === 5 || lifePathNum === 6)
      ) {
        compatibility =
          "Good Alignment - Your creativity aligns well with your life purpose.";
      } else if (destinyNum === 4 && lifePathNum === 5) {
        compatibility =
          "Balanced Alignment - Your practicality supports your adventurous life path.";
      } else if (
        destinyNum === 5 &&
        (lifePathNum === 1 || lifePathNum === 3 || lifePathNum === 6)
      ) {
        compatibility =
          "Good Alignment - Your adaptability serves your life purpose.";
      } else if (
        destinyNum === 6 &&
        (lifePathNum === 3 || lifePathNum === 5 || lifePathNum === 9)
      ) {
        compatibility =
          "Good Alignment - Your caring nature aligns with your life path.";
      } else if (
        destinyNum === 7 &&
        (lifePathNum === 2 || lifePathNum === 4 || lifePathNum === 6)
      ) {
        compatibility =
          "Good Alignment - Your wisdom supports your life journey.";
      } else if (destinyNum === 8 && lifePathNum === 5) {
        compatibility =
          "Balanced Alignment - Your ambition aligns with your life purpose.";
      } else if (
        destinyNum === 9 &&
        (lifePathNum === 1 || lifePathNum === 3 || lifePathNum === 6)
      ) {
        compatibility =
          "Good Alignment - Your humanitarian nature serves your life purpose.";
      } else {
        compatibility =
          "You may need to consciously align your actions with your life path. Your destiny and life path complement each other with effort.";
      }

      setResult({
        destinyNumber: destinyNum,
        lifePathNumber: lifePathNum,
        destinyMeaning,
        lifePathMeaning,
        compatibility,
        strengths: destinyMeaning.strengths,
        weaknesses: destinyMeaning.weaknesses,
        careers: destinyMeaning.careers,
        traits: destinyMeaning.traits,
        luckyColors: [
          "Red",
          "Yellow",
          "Orange",
          "Green",
          "Blue",
          "Purple",
          "Gold",
          "Silver",
        ].slice(0, 4),
        luckyDays: [
          "Monday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Sunday",
        ].slice(0, 3),
        luckyNumbers: [1, 3, 5, 6, 9, 10, 12, 14, 15, 18, 19, 21].slice(0, 5),
        isMasterNumber: isMasterNumber(destinyNum),
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Destiny Number Form */}
      <DestinyForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        result={result}
      />

      {/* What is Destiny Number */}
      <WhatIsDestinyNumber />

      {/* How to Calculate */}
      <HowToCalculate />

      {/* What is Destiny Number Calculator */}
      <WhatIsDestinyCalculator />

      {/* How Does It Work */}
      <HowDoesItWork />

      {/* Meaning of Each Destiny Number */}
      <MeaningOfEachDestinyNumber />

      {/* Benefits */}
      <Benefits />

      {/* Difference Between Destiny and Life Path */}
      <DifferenceBetweenDestinyAndLifePath />

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
            <Target className="h-3 w-3" />
            Free Online Tool
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 mb-4">
            Destiny Number Calculator
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-xl md:text-2xl font-semibold text-primary-600 mb-6">
            Discover Your Life's Purpose
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <p className="text-base text-ink-600 leading-relaxed">
              A{" "}
              <span className="font-semibold text-primary-600">
                destiny number calculator
              </span>{" "}
              helps you find your true life purpose by using the numbers in your
              full birth name. It shows your natural talents, career direction,
              and spiritual path simply. Your name isn't just a name; it holds
              deep meaning and energy.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ DESTINY FORM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface DestinyFormProps {
  formData: {
    name: string;
    day: string;
    month: string;
    year: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  result: null | {
    destinyNumber: number;
    lifePathNumber: number;
    destinyMeaning: (typeof destinyMeanings)[1];
    lifePathMeaning: (typeof lifePathMeanings)[1];
    compatibility: string;
    strengths: string[];
    weaknesses: string[];
    careers: string[];
    traits: string[];
    luckyColors: string[];
    luckyDays: string[];
    luckyNumbers: number[];
    isMasterNumber: boolean;
  };
}

function DestinyForm({
  formData,
  handleChange,
  handleSubmit,
  result,
}: DestinyFormProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container-8xl">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-ink-50 rounded-2xl p-6 md:p-8 border border-ink-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-ink-900">
                    Enter Your Details
                  </h2>
                  <p className="text-xs text-ink-500">
                    Find your Destiny and Life Path numbers
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
                      placeholder="Enter Name in English Only"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                      required
                    />
                  </div>
                  <p className="text-xs text-ink-500 mt-1">
                    Use your full birth certificate name for accurate results
                  </p>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Date (DD/MM/YYYY) <span className="text-danger-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <input
                        type="number"
                        name="day"
                        value={formData.day}
                        onChange={handleChange}
                        placeholder="DD"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                        min="1"
                        max="31"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <input
                        type="number"
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        placeholder="MM"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                        min="1"
                        max="12"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder="YYYY"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                        min="1900"
                        max="2100"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  type="submit"
                >
                  <Sparkles className="h-4 w-4" />
                  Calculate Destiny Number
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
                  <div className="grid md:grid-cols-2 gap-4">
                    <div
                      className={`bg-gradient-to-br ${result.destinyMeaning.color} rounded-xl p-4 text-white text-center`}
                    >
                      <div className="text-xs font-semibold opacity-90">
                        Your Destiny Number
                      </div>
                      <div className="text-5xl font-bold">
                        {result.destinyNumber}
                      </div>
                      <div className="text-sm mt-1">
                        {result.destinyMeaning.title}
                      </div>
                      {result.isMasterNumber && (
                        <div className="mt-1 text-xs font-semibold bg-white/20 rounded-full px-3 py-0.5 inline-block">
                          â­ Master Number
                        </div>
                      )}
                    </div>
                    <div className="bg-gradient-to-br from-secondary-600 to-secondary-500 rounded-xl p-4 text-white text-center">
                      <div className="text-xs font-semibold opacity-90">
                        Your Life Path Number
                      </div>
                      <div className="text-5xl font-bold">
                        {result.lifePathNumber}
                      </div>
                      <div className="text-sm mt-1">
                        {result.lifePathMeaning.title}
                      </div>
                    </div>
                  </div>

                  {/* Compatibility */}
                  <div className="p-4 bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl border border-accent-200">
                    <h4 className="text-sm font-bold text-ink-900 mb-1">
                      Compatibility
                    </h4>
                    <p className="text-sm text-ink-600">
                      {result.compatibility}
                    </p>
                  </div>

                  {/* Traits, Strengths, Weaknesses */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-ink-100">
                      <h4 className="text-xs font-bold text-ink-900 mb-2">
                        Your Traits
                      </h4>
                      <ul className="space-y-1">
                        {result.traits.map((trait, i) => (
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
                      <h4 className="text-xs font-bold text-ink-900 mb-2">
                        Your Strengths
                      </h4>
                      <ul className="space-y-1">
                        {result.strengths.map((strength, i) => (
                          <li
                            key={i}
                            className="text-xs text-green-600 flex items-center gap-1"
                          >
                            <span className="text-green-400">â€¢</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-ink-100">
                      <h4 className="text-xs font-bold text-ink-900 mb-2">
                        Areas to Work On
                      </h4>
                      <ul className="space-y-1">
                        {result.weaknesses.map((weakness, i) => (
                          <li
                            key={i}
                            className="text-xs text-amber-600 flex items-center gap-1"
                          >
                            <span className="text-amber-400">â€¢</span>
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Careers & Lucky Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-ink-100">
                      <h4 className="text-xs font-bold text-ink-900 mb-2">
                        Best Careers
                      </h4>
                      <ul className="space-y-1">
                        {result.careers.map((career, i) => (
                          <li
                            key={i}
                            className="text-xs text-ink-600 flex items-center gap-1"
                          >
                            <span className="text-accent-500">â€¢</span>
                            {career}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-ink-100">
                      <h4 className="text-xs font-bold text-ink-900 mb-2">
                        Lucky Details
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs font-medium text-ink-700">
                            Numbers:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {result.luckyNumbers.map((num, i) => (
                              <span
                                key={i}
                                className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full"
                              >
                                {num}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-ink-700">
                            Days:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {result.luckyDays.map((day, i) => (
                              <span
                                key={i}
                                className="text-xs bg-accent-50 text-accent-700 px-2 py-0.5 rounded-full"
                              >
                                {day}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-ink-700">
                            Colors:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {result.luckyColors.map((color, i) => (
                              <span
                                key={i}
                                className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full"
                              >
                                {color}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHAT IS DESTINY NUMBER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhatIsDestinyNumber() {
  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="What is Destiny Number?"
            title="Understanding Your Life's Purpose"
            subtitle="Your destiny number is like a guide that shows what your soul came here to do"
          />
        </Reveal>

        <div className="mt-8 w-full">
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl p-8 border border-ink-100 w-full">
              <p className="text-ink-700 leading-relaxed">
                Your destiny number is like a guide that shows what your soul
                came here to do. It is found by adding up all the numbers in
                your full birth name. This number tells you about your life's
                purpose, the lessons you need to learn, and the natural talents
                you were born with. It also shows the challenges you may face
                while growing into your best self.
              </p>
              <div className="mt-4 p-4 bg-accent-50 rounded-xl border border-accent-200">
                <p className="text-sm text-ink-700">
                  <span className="font-semibold">
                    ðŸ’¡ Unlike other numbers
                  </span>{" "}
                  in numerology, your destiny number or bhagyank never changes.
                  It's like your life's blueprint. It shapes your personality,
                  career choices, and even the kind of relationships you
                  attract.
                </p>
              </div>
              <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-200">
                <p className="text-sm text-ink-700">
                  <span className="font-semibold">âœ¨ Many believe</span>{" "}
                  parents unknowingly pick names that match the child's destiny.
                  That's why names often feel "just right." Changing your name
                  can sometimes change your life, too.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HOW TO CALCULATE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HowToCalculate() {
  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="How to Calculate"
            title="How to Calculate Your Destiny Number?"
            subtitle="Turn each letter of your full birth name into numbers using the Pythagorean system"
          />
        </Reveal>

        <div className="mt-8 w-full">
          <Reveal delay={0.1}>
            <div className="bg-ink-50 rounded-2xl p-8 border border-ink-100 w-full">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-ink-900 mb-3">
                    Letter-Number Mapping
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-white rounded-lg p-2 text-center">
                      <span className="font-bold text-primary-600">1</span>
                      <p className="text-xs text-ink-500">A, J, S</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center">
                      <span className="font-bold text-primary-600">2</span>
                      <p className="text-xs text-ink-500">B, K, T</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center">
                      <span className="font-bold text-primary-600">3</span>
                      <p className="text-xs text-ink-500">C, L, U</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center">
                      <span className="font-bold text-primary-600">4</span>
                      <p className="text-xs text-ink-500">D, M, V</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center">
                      <span className="font-bold text-primary-600">5</span>
                      <p className="text-xs text-ink-500">E, N, W</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center">
                      <span className="font-bold text-primary-600">6</span>
                      <p className="text-xs text-ink-500">F, O, X</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center">
                      <span className="font-bold text-primary-600">7</span>
                      <p className="text-xs text-ink-500">G, P, Y</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center">
                      <span className="font-bold text-primary-600">8</span>
                      <p className="text-xs text-ink-500">H, Q, Z</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center">
                      <span className="font-bold text-primary-600">9</span>
                      <p className="text-xs text-ink-500">I, R</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-ink-900 mb-3">
                    Example: Rajesh Kumar Sharma
                  </h4>
                  <div className="bg-white rounded-xl p-4 border border-ink-100 space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Rajesh:</span>{" "}
                      R(9)+A(1)+J(1)+E(5)+S(1)+H(8) = 25
                    </p>
                    <p>
                      <span className="font-semibold">Kumar:</span>{" "}
                      K(2)+U(3)+M(4)+A(1)+R(9) = 19
                    </p>
                    <p>
                      <span className="font-semibold">Sharma:</span>{" "}
                      S(1)+H(8)+A(1)+R(9)+M(4)+A(1) = 24
                    </p>
                    <p>
                      <span className="font-semibold">Total:</span> 25 + 19 + 24
                      = 68
                    </p>
                    <p>
                      <span className="font-semibold">Reduce:</span> 6 + 8 = 14
                      â†’ 1 + 4 ={" "}
                      <span className="font-bold text-primary-600 text-lg">
                        5
                      </span>
                    </p>
                    <div className="bg-primary-50 rounded-lg p-2 mt-2">
                      <p className="font-bold text-primary-700">
                        Destiny Number = 5
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-accent-50 rounded-xl border border-accent-200">
                <p className="text-sm text-ink-700">
                  <span className="font-semibold">ðŸ’¡ Master Numbers:</span> If
                  your total is 11, 22, or 33, these are master numbers and are
                  not reduced further.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHAT IS DESTINY CALCULATOR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhatIsDestinyCalculator() {
  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Destiny Calculator"
            title="What is a Destiny Number Calculator?"
            subtitle="An easy-to-use tool that helps you find your destiny number just by entering your full birth name"
          />
        </Reveal>

        <div className="mt-8 w-full">
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl p-8 border border-ink-100 w-full">
              <p className="text-ink-700 leading-relaxed">
                A destiny number calculator is an easy-to-use tool that helps
                you find your destiny number just by entering your full birth
                name. It follows old number systems like Pythagorean or Chaldean
                numerology to give quick and correct results. These tools also
                offer extra help, like meanings of your number, life guidance,
                and compatibility checks with others.
              </p>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="bg-ink-50 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-ink-900 mb-2">
                    Professional Tools Go Further
                  </h4>
                  <ul className="space-y-1 text-sm text-ink-600">
                    <li>â€¢ Tell how your number affects your job</li>
                    <li>â€¢ Love life and personal growth insights</li>
                    <li>â€¢ Tips on lucky days and suitable careers</li>
                    <li>â€¢ Compatibility checks with others</li>
                  </ul>
                </div>
                <div className="bg-ink-50 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-ink-900 mb-2">
                    Why Use It
                  </h4>
                  <ul className="space-y-1 text-sm text-ink-600">
                    <li>â€¢ Simple for everyone, even beginners</li>
                    <li>â€¢ No human mistakes in counting</li>
                    <li>â€¢ Quick and accurate results</li>
                    <li>â€¢ Deep truths about your life path</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HOW DOES IT WORK â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HowDoesItWork() {
  const steps = [
    {
      number: 1,
      icon: User,
      title: "Enter Your Name",
      description:
        "Type your full birth name exactly as on your birth certificate.",
    },
    {
      number: 2,
      icon: Calendar,
      title: "Enter Your Birth Date",
      description: "Enter the day, month, and year of your birth separately.",
    },
    {
      number: 3,
      icon: Target,
      title: "Get Your Numbers",
      description:
        'Click "Calculate" to get your Destiny and Life Path numbers.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="How It Works"
            title="How Does a Destiny Number Calculator Work?"
            subtitle="A simple yet powerful tool used in numerology to understand your true potential"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ MEANING OF EACH DESTINY NUMBER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function MeaningOfEachDestinyNumber() {
  const numbers = [
    {
      num: 1,
      title: "The Leader",
      emoji: "ðŸ¥‡",
      desc: "Born to lead, take charge, and try new things. Often become business owners, inventors, or bold thinkers.",
    },
    {
      num: 2,
      title: "The Peacemaker",
      emoji: "ðŸ¤",
      desc: "Gentle, kind, and work well with others. Shine in teamwork, helping roles, and solving fights peacefully.",
    },
    {
      num: 3,
      title: "The Creative Soul",
      emoji: "ðŸŽ¨",
      desc: "Full of ideas, art, and fun. Writers, actors, and artists often carry this number.",
    },
    {
      num: 4,
      title: "The Builder",
      emoji: "ðŸ§±",
      desc: "Hardworking, practical, and love making strong foundations. Great at planning and organizing.",
    },
    {
      num: 5,
      title: "The Explorer",
      emoji: "ðŸŒ",
      desc: "Love freedom, change, and adventure. Enjoy travel, sales, and lively careers.",
    },
    {
      num: 6,
      title: "The Caregiver",
      emoji: "ðŸ‘¨â€ðŸ‘©â€ðŸ‘§",
      desc: "Loving, helpful, and family-focused. Do well in teaching, healing, or caring roles.",
    },
    {
      num: 7,
      title: "The Thinker",
      emoji: "ðŸ§˜",
      desc: "Love to study, think deeply, and seek truth. Become scientists, spiritual guides, or researchers.",
    },
    {
      num: 8,
      title: "The Achiever",
      emoji: "ðŸ’¼",
      desc: "All about money, power, and leadership. Succeed in business and on large projects.",
    },
    {
      num: 9,
      title: "The Giver",
      emoji: "ðŸ’–",
      desc: "Care deeply about helping others. May be a social worker, healer, or someone who wants to change the world.",
    },
    {
      num: 11,
      title: "Master Intuitive",
      emoji: "ðŸ”®",
      desc: "Higher purpose and spiritual mission. Amazing but challenging energy.",
    },
    {
      num: 22,
      title: "Master Builder",
      emoji: "ðŸ—ï¸",
      desc: "Power to turn dreams into reality. Build on a global scale.",
    },
    {
      num: 33,
      title: "Master Teacher",
      emoji: "ðŸ“š",
      desc: "Highest spiritual purpose. Here to teach and uplift humanity.",
    },
  ];

  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Destiny Meanings"
            title="What is the Meaning of Each Destiny Number?"
            subtitle="Every destiny number tells a special story about your nature, life path, and purpose"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {numbers.map((item, i) => (
            <Reveal key={item.num} delay={i * 0.05}>
              <div className="bg-white rounded-2xl p-4 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
                    {item.num}
                  </div>
                  <span className="text-2xl">{item.emoji}</span>
                  <h4 className="text-sm font-bold text-ink-900">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-ink-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ BENEFITS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Benefits() {
  const benefits = [
    {
      icon: Briefcase,
      title: "Career Guidance",
      description:
        "You may realize why past jobs didn't feel right and what kind of work suits you best. Shows the best time for job changes and big work decisions.",
    },
    {
      icon: Heart,
      title: "Relationship Understanding",
      description:
        "Shows why you get along well with some people and not with others. Makes it easier to handle problems and find the right partner.",
    },
    {
      icon: TrendingUp,
      title: "Personal Growth",
      description:
        "Learn your strengths and weaknesses, so you grow better and avoid common mistakes. Stops you from wasting years in the wrong places.",
    },
    {
      icon: CompassIcon,
      title: "Decision-Making Confidence",
      description:
        "Your destiny number acts like a guide. Shows which choices help you grow and which ones to avoid during big life changes.",
    },
    {
      icon: Home,
      title: "Family Harmony",
      description:
        "When everyone knows each other's destiny number, families understand each other's emotional styles and communication habits better.",
    },
    {
      icon: Star,
      title: "Self-Discovery",
      description:
        "Discover the real purpose of your life and the special strengths you are born with. Things that once felt confusing become clearer.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Benefits"
            title="What are the Benefits of Using a Destiny Number Calculator?"
            subtitle="Understanding your life's true path and hidden talents"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 0.1}>
              <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-4">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ DIFFERENCE BETWEEN DESTINY AND LIFE PATH â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function DifferenceBetweenDestinyAndLifePath() {
  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Understanding Numbers"
            title="What is the Difference Between Destiny Number and Life Path Number?"
            subtitle="Two important parts of numerology that each tell you something different about your life"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:shadow-lg transition-all">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-ink-900 mb-3">
                Destiny Number
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <CheckCircle className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                  <span>
                    Comes from your{" "}
                    <span className="font-semibold">full name at birth</span>
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <CheckCircle className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                  <span>
                    Tells you what you're{" "}
                    <span className="font-semibold">here to do</span>
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <CheckCircle className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                  <span>
                    Shows your{" "}
                    <span className="font-semibold">mission in this world</span>
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <CheckCircle className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                  <span>
                    Helps with{" "}
                    <span className="font-semibold">
                      career, relationships, and self-growth
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:shadow-lg transition-all">
              <div className="p-3 rounded-xl bg-gradient-to-br from-accent-600 to-secondary-600 w-fit mb-4">
                <CompassIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-ink-900 mb-3">
                Life Path Number
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <CheckCircle className="h-4 w-4 text-accent-500 shrink-0 mt-0.5" />
                  <span>
                    Comes from your{" "}
                    <span className="font-semibold">birth date</span>
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <CheckCircle className="h-4 w-4 text-accent-500 shrink-0 mt-0.5" />
                  <span>
                    Shows the{" "}
                    <span className="font-semibold">path you'll walk</span> in
                    life
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <CheckCircle className="h-4 w-4 text-accent-500 shrink-0 mt-0.5" />
                  <span>
                    Explains how you'll{" "}
                    <span className="font-semibold">learn life lessons</span>
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-600">
                  <CheckCircle className="h-4 w-4 text-accent-500 shrink-0 mt-0.5" />
                  <span>
                    Helps with{" "}
                    <span className="font-semibold">
                      timing and life choices
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl p-6 border border-accent-200">
              <h4 className="text-sm font-bold text-ink-900 mb-2">
                ðŸ’¡ When Both Numbers Align
              </h4>
              <p className="text-sm text-ink-600">
                When your destiny number and life path number match well, life
                feels smoother. If they don't, you might feel confused or stuck.
                That's why knowing and using both numbers can help you grow and
                move ahead in life with clarity.
              </p>
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
            <Target className="h-3 w-3" />
            Find Your Purpose
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Ready to discover your{" "}
            <span className="gradient-text-light">destiny number?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
            Calculate your Destiny and Life Path numbers now and unlock the
            secrets of your life's purpose.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/destiny-number" variant="primary" size="lg">
              <Target className="h-4 w-4" />
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
