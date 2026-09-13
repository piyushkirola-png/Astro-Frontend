import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
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
} from "lucide-react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/animations/Reveal";

// Months data
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

// Generate days
const getDays = (month?: number, year?: number) => {
  if (!month || !year) return Array.from({ length: 31 }, (_, i) => i + 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

// Generate years
const getYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 120 }, (_, i) => currentYear - i);
};

export default function AgeCalculator() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const [formData, setFormData] = useState({
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    currentDay: currentDay.toString(),
    currentMonth: currentMonth.toString(),
    currentYear: currentYear.toString(),
  });

  const [result, setResult] = useState<null | {
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    totalHours: number;
    totalMinutes: number;
    nextBirthday: string;
    daysUntilNextBirthday: number;
    lifeStage: string;
    description: string;
    astrologicalInsight: string;
  }>(null);

  const calculateAge = (e: React.FormEvent) => {
    e.preventDefault();

    const birthDate = new Date(
      parseInt(formData.birthYear),
      parseInt(formData.birthMonth) - 1,
      parseInt(formData.birthDay),
    );

    const currentDate = new Date(
      parseInt(formData.currentYear),
      parseInt(formData.currentMonth) - 1,
      parseInt(formData.currentDay),
    );

    if (isNaN(birthDate.getTime()) || isNaN(currentDate.getTime())) {
      return;
    }

    // Calculate age
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0,
      );
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total days
    const totalDays = Math.floor(
      (currentDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Calculate next birthday
    const nextBirthday = new Date(
      currentDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    );
    if (nextBirthday < currentDate) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilNextBirthday = Math.floor(
      (nextBirthday.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    // Life stage
    let lifeStage = "";
    let description = "";
    if (years < 13) {
      lifeStage = "Childhood";
      description =
        "A time of learning, growth, and discovery. Your foundation is being built.";
    } else if (years < 20) {
      lifeStage = "Adolescence";
      description =
        "A transformative period of self-discovery, identity formation, and emotional development.";
    } else if (years < 30) {
      lifeStage = "Young Adulthood";
      description =
        "A time of exploration, career building, and establishing independence.";
    } else if (years < 40) {
      lifeStage = "Adulthood";
      description =
        "A period of consolidation, family building, and professional growth.";
    } else if (years < 50) {
      lifeStage = "Middle Adulthood";
      description =
        "A time of reflection, mentorship, and deeper life purpose.";
    } else if (years < 60) {
      lifeStage = "Late Adulthood";
      description =
        "A period of wisdom, contribution, and spiritual deepening.";
    } else if (years < 70) {
      lifeStage = "Senior Years";
      description =
        "A time of legacy, wisdom sharing, and enjoying life's fruits.";
    } else {
      lifeStage = "Golden Years";
      description =
        "A celebration of a life well-lived, with wisdom and peace.";
    }

    // Astrological insight based on age
    const astrologicalInsights = [
      "Your Jupiter cycle suggests a period of growth and wisdom ahead.",
      "This is a time of karmic alignment and spiritual awakening.",
      "Your Saturn return indicates a major life transition approaching.",
      "The Moon's influence brings emotional depth and intuitive clarity.",
      "Mars energy suggests a time for bold action and leadership.",
      "Venus brings harmony and relationship blessings.",
      "Mercury enhances communication and intellectual pursuits.",
      "The Sun illuminates your path with confidence and purpose.",
    ];
    const astrologicalInsight =
      astrologicalInsights[years % astrologicalInsights.length];

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      nextBirthday: nextBirthday.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      daysUntilNextBirthday,
      lifeStage,
      description,
      astrologicalInsight,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const birthDays = getDays(
    parseInt(formData.birthMonth),
    parseInt(formData.birthYear),
  );
  const currentDays = getDays(
    parseInt(formData.currentMonth),
    parseInt(formData.currentYear),
  );
  const years = getYears();

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Age Calculator Form */}
      <AgeCalculatorForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={calculateAge}
        result={result}
        birthDays={birthDays}
        currentDays={currentDays}
        years={years}
        months={months}
      />

      {/* What is Age Calculator */}
      <WhatIsAgeCalculator />

      {/* How Does It Work */}
      <HowDoesItWork />

      {/* What Do Results Mean */}
      <WhatDoResultsMean />

      {/* Time Zone Role */}
      <TimeZoneRole />

      {/* Shortcuts */}
      <Shortcuts />

      {/* Cultural Methods */}
      <CulturalMethods />

      {/* Where Can You Use */}
      <WhereCanYouUse />

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
            Age Calculator
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-xl md:text-2xl font-semibold text-primary-600 mb-6">
            Decode Your Life's Journey with Cosmic Insight
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <p className="text-base text-ink-600 leading-relaxed">
              Have you ever paused for a moment and thought exactly how many
              days I have lived? Or maybe you're trying to figure out the exact
              age gap between you and your partner? That's where an{" "}
              <span className="font-semibold text-primary-600">
                age calculator
              </span>
              comes in. It's not just about numbers, it's about knowing you
              better.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ AGE CALCULATOR FORM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface AgeCalculatorFormProps {
  formData: {
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    currentDay: string;
    currentMonth: string;
    currentYear: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  result: null | {
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    totalHours: number;
    totalMinutes: number;
    nextBirthday: string;
    daysUntilNextBirthday: number;
    lifeStage: string;
    description: string;
    astrologicalInsight: string;
  };
  birthDays: number[];
  currentDays: number[];
  years: number[];
  months: { value: number; label: string }[];
}

function AgeCalculatorForm({
  formData,
  handleChange,
  handleSubmit,
  result,
  birthDays,
  currentDays,
  years,
  months,
}: AgeCalculatorFormProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container-8xl">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-ink-50 rounded-2xl p-6 md:p-8 border border-ink-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-ink-900">
                    Calculate your Age here
                  </h2>
                  <p className="text-xs text-ink-500">
                    Enter your birth details to calculate your exact age
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-2">
                    Date of Birth <span className="text-danger-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <select
                        name="birthDay"
                        value={formData.birthDay}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                        required
                      >
                        <option value="">Day</option>
                        {birthDays.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        name="birthMonth"
                        value={formData.birthMonth}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                        required
                      >
                        <option value="">Month</option>
                        {months.map((month) => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
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
                </div>

                {/* Current Age or Age as of */}
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-2">
                    Current Age or Age as of{" "}
                    <span className="text-danger-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <select
                        name="currentDay"
                        value={formData.currentDay}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                        required
                      >
                        <option value="">Day</option>
                        {currentDays.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        name="currentMonth"
                        value={formData.currentMonth}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                        required
                      >
                        <option value="">Month</option>
                        {months.map((month) => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        name="currentYear"
                        value={formData.currentYear}
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
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  type="submit"
                >
                  <Sparkles className="h-4 w-4" />
                  Calculate Age
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
                  {/* Main Age */}
                  <div className="bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl p-6 text-center text-white">
                    <div className="text-sm font-semibold opacity-90">
                      Your Exact Age
                    </div>
                    <div className="text-4xl md:text-5xl font-bold mt-2">
                      {result.years} Years {result.months} Months {result.days}{" "}
                      Days
                    </div>
                  </div>

                  {/* Detailed Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                      <div className="text-xs text-ink-500">Total Days</div>
                      <div className="text-lg font-bold text-ink-900">
                        {result.totalDays.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                      <div className="text-xs text-ink-500">Total Weeks</div>
                      <div className="text-lg font-bold text-ink-900">
                        {result.totalWeeks.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                      <div className="text-xs text-ink-500">Total Months</div>
                      <div className="text-lg font-bold text-ink-900">
                        {result.totalMonths.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                      <div className="text-xs text-ink-500">Total Hours</div>
                      <div className="text-lg font-bold text-ink-900">
                        {result.totalHours.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Next Birthday */}
                  <div className="bg-ink-50 rounded-xl p-4 border border-ink-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-ink-500">
                          Next Birthday
                        </div>
                        <div className="text-sm font-semibold text-ink-900">
                          {result.nextBirthday}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-ink-500">Days Until</div>
                        <div className="text-sm font-bold text-primary-600">
                          {result.daysUntilNextBirthday} days
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Life Stage */}
                  <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl p-4 border border-accent-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="h-4 w-4 text-accent-500" />
                      <span className="text-sm font-bold text-ink-900">
                        Life Stage: {result.lifeStage}
                      </span>
                    </div>
                    <p className="text-sm text-ink-600">{result.description}</p>
                  </div>

                  {/* Astrological Insight */}
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Moon className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-bold text-ink-900">
                        Astrological Insight
                      </span>
                    </div>
                    <p className="text-sm text-ink-600">
                      {result.astrologicalInsight}
                    </p>
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHAT IS AGE CALCULATOR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhatIsAgeCalculator() {
  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="What is Age Calculator?"
            title="Understanding Your Timeline Tracker"
            subtitle="A date of birth calculator is like your personal timeline tracker"
          />
        </Reveal>

        <div className="mt-8 w-full">
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl p-8 border border-ink-100 w-full">
              <p className="text-ink-700 leading-relaxed">
                A date of birth calculator is like your personal timeline
                tracker; it instantly tells you exactly how long you've been
                alive by calculating the time difference between your birth date
                and today's date. Think of it as your digital shortcut to
                knowing your real age, down to the last day.
              </p>
              <div className="mt-4 p-4 bg-accent-50 rounded-xl border border-accent-200">
                <p className="text-sm text-ink-700">
                  <span className="font-semibold">ðŸ’¡ This tool</span> isn't
                  just doing basic math. It smartly factors in leap years,
                  different month lengths, and even presents your age in various
                  formats, be it days, weeks, months, or years.
                </p>
              </div>
              <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-200">
                <p className="text-sm text-ink-700">
                  <span className="font-semibold">âœ¨ Designed for India,</span>{" "}
                  taking into account cultural nuances like Indian Standard Time
                  and traditional muhurats.
                </p>
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
  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="How It Works"
            title="How Does the Age Calculator Work?"
            subtitle="The magic lies in how it handles all those tricky date calculations automatically"
          />
        </Reveal>

        <div className="mt-8 w-full">
          <Reveal delay={0.1}>
            <div className="bg-ink-50 rounded-2xl p-8 border border-ink-100 w-full">
              <p className="text-ink-700 leading-relaxed">
                When you input your date of birth day, month, and year, the
                calculator does a lot behind the scenes. It takes into account
                leap years (yes, those extra days every four years), months with
                different lengths, and the exact current date.
              </p>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-ink-100">
                  <h4 className="text-sm font-bold text-ink-900 mb-2">
                    The Basic Formula
                  </h4>
                  <p className="text-sm text-ink-600">
                    Current Year - Birth Year gives you a rough age. But the
                    calculator checks whether your birthday has passed this
                    year. If not, it subtracts a year and then adds the exact
                    months and days left until your next birthday.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-ink-100">
                  <h4 className="text-sm font-bold text-ink-900 mb-2">
                    Advanced Features
                  </h4>
                  <ul className="space-y-1 text-sm text-ink-600">
                    <li>â€¢ Accounts for leap years</li>
                    <li>â€¢ Considers time zones</li>
                    <li>â€¢ Handles daylight saving changes</li>
                    <li>â€¢ Allows birth time input for accuracy</li>
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHAT DO RESULTS MEAN â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhatDoResultsMean() {
  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Understanding Results"
            title="What Do the Results of the Age Calculator Mean?"
            subtitle="You're not just getting a number; you're uncovering a deeper timeline of your life"
          />
        </Reveal>

        <div className="mt-8 w-full">
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl p-8 border border-ink-100 w-full">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-ink-50 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-ink-900 mb-2">Years</h4>
                  <p className="text-sm text-ink-600">
                    Reflects the broader life phases you've experienced. In
                    Vedic astrology, these phases align with planetary periods
                    (dashas) that influence your personal growth.
                  </p>
                </div>
                <div className="bg-ink-50 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-ink-900 mb-2">
                    Months & Days
                  </h4>
                  <p className="text-sm text-ink-600">
                    Add even more depth to your journey. Realizing you've lived
                    exactly 10,000 days can inspire meaningful celebrations and
                    reflection.
                  </p>
                </div>
                <div className="bg-ink-50 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-ink-900 mb-2">
                    Practical Use
                  </h4>
                  <p className="text-sm text-ink-600">
                    Useful for LIC maturity, PF withdrawal, visa applications,
                    school admissions, and legal forms where precise age is
                    required.
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ TIME ZONE ROLE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function TimeZoneRole() {
  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Time Zone"
            title="What Role Does Time Zone Play in Age Calculation?"
            subtitle="Where and when you were born does matter"
          />
        </Reveal>

        <div className="mt-8 w-full">
          <Reveal delay={0.1}>
            <div className="bg-ink-50 rounded-2xl p-8 border border-ink-100 w-full">
              <p className="text-ink-700 leading-relaxed">
                Most date of birth calculators in India automatically default to
                Indian Standard Time (IST). But when you're dealing with
                international paperwork or services abroad, it's smart to switch
                the time zone accordingly.
              </p>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-ink-100">
                  <h4 className="text-sm font-bold text-ink-900 mb-2">
                    Astrological Importance
                  </h4>
                  <p className="text-sm text-ink-600">
                    Your entire birth chartâ€”your lagna (ascendant), rashi
                    (moon sign), and predictions can shift with just an hour's
                    difference. That's why astrologers always ask for your exact
                    time and place of birth.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-ink-100">
                  <h4 className="text-sm font-bold text-ink-900 mb-2">
                    Daylight Saving
                  </h4>
                  <p className="text-sm text-ink-600">
                    While India doesn't follow daylight saving, countries like
                    the U.S. and UK adjust their clocks twice a year. Advanced
                    tools handle these shifts automatically.
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ SHORTCUTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Shortcuts() {
  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Shortcuts"
            title="What Are the Shortcuts to Calculate Your Age?"
            subtitle="Easy mental math hacks, no calculator needed"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:shadow-lg transition-all">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-4">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-ink-900 mb-2">
                Subtract Method
              </h3>
              <p className="text-sm text-ink-500">
                Subtract your birth year from the current year. If your birthday
                hasn't passed this year, subtract one year.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:shadow-lg transition-all">
              <div className="p-3 rounded-xl bg-gradient-to-br from-accent-600 to-secondary-600 w-fit mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-ink-900 mb-2">
                Memory Method
              </h3>
              <p className="text-sm text-ink-500">
                Think back to a big moment in your life. Use it as a mental
                bookmark to quickly figure out your current age by counting
                forward from that year.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:shadow-lg transition-all">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-ink-900 mb-2">
                Decade Method
              </h3>
              <p className="text-sm text-ink-500">
                Count the full decades you've lived and add the remaining years
                for a quick estimate.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ CULTURAL METHODS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function CulturalMethods() {
  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Cultural Methods"
            title="What Are the Different Cultural Methods of Age Calculation?"
            subtitle="Age is more than just a number; it's a reflection of culture and tradition"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <Reveal delay={0.1}>
            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-ink-900 mb-3">
                Western System
              </h3>
              <p className="text-sm text-ink-600 mb-3">
                You count from the day you were born, and each birthday adds a
                year. This is the global standard most birth date calculator
                tools follow.
              </p>
              <div className="bg-white rounded-xl p-3 border border-ink-100">
                <p className="text-xs text-ink-500">
                  Used worldwide for official documents
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-ink-900 mb-3">
                Indian (Vedic) System
              </h3>
              <p className="text-sm text-ink-600 mb-3">
                Takes into account lunar cycles, planetary positions, and
                nakshatras. Astrologers use multiple systems for incredible
                spiritual and cosmic precision.
              </p>
              <div className="bg-white rounded-xl p-3 border border-ink-100">
                <p className="text-xs text-ink-500">
                  Used for astrological and spiritual purposes
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-ink-900 mb-3">
                Chinese System
              </h3>
              <p className="text-sm text-ink-600 mb-3">
                You're considered one year old the moment you're born, and
                everyone adds a year on the Chinese New Year, not on their
                birthday.
              </p>
              <div className="bg-white rounded-xl p-3 border border-ink-100">
                <p className="text-xs text-ink-500">
                  Chinese age might be 1-2 years ahead of Western age
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-ink-900 mb-3">
                Vikram Samvat Calendar
              </h3>
              <p className="text-sm text-ink-600 mb-3">
                Still followed in many parts of India, dates back to 57 BCE.
                According to this calendar, we're in a completely different year
                than the Gregorian calendar.
              </p>
              <div className="bg-white rounded-xl p-3 border border-ink-100">
                <p className="text-xs text-ink-500">
                  Used for religious and cultural ceremonies
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHERE CAN YOU USE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhereCanYouUse() {
  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Uses"
            title="Where Can You Use This Age Calculator?"
            subtitle="Surprisingly useful in everyday life for genuinely important decisions"
          />
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all text-center">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto mb-4">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-bold text-ink-900">
                Career Planning
              </h3>
              <p className="text-xs text-ink-500">
                Understand career cycles and optimal timing for job changes
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all text-center">
              <div className="p-3 rounded-xl bg-gradient-to-br from-accent-600 to-secondary-600 w-fit mx-auto mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-bold text-ink-900">
                Relationship Compatibility
              </h3>
              <p className="text-xs text-ink-500">
                Precise age calculations reveal compatibility patterns
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all text-center">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 w-fit mx-auto mb-4">
                <Baby className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-bold text-ink-900">
                Family Planning
              </h3>
              <p className="text-xs text-ink-500">
                Crucial information for medical considerations and ceremonies
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all text-center">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 w-fit mx-auto mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-bold text-ink-900">
                Milestone Planning
              </h3>
              <p className="text-xs text-ink-500">
                Plan celebrations and align rituals with cosmic timing
              </p>
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
            <Calculator className="h-3 w-3" />
            Calculate Your Age
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Ready to discover your{" "}
            <span className="gradient-text-light">exact age?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
            Calculate your exact age now and unlock insights into your life's
            journey and cosmic alignment.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/age-calculator" variant="primary" size="lg">
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
