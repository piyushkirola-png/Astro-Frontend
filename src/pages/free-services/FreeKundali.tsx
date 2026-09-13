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
  Moon,
  Sun,
  Globe,
  Heart,
  ChevronRight,
  Shield,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/animations/Reveal";

export default function FreeKundali() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
  });

  const [kundaliGenerated, setKundaliGenerated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle kundali generation logic here
    setKundaliGenerated(true);
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

      {/* Kundali Generator Form */}
      <KundaliGenerator
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        kundaliGenerated={kundaliGenerated}
      />

      {/* What is Kundli Section */}
      <WhatIsKundli />

      {/* Key Elements Section */}
      <KeyElements />

      {/* Doshas Section */}
      <DoshasSection />

      {/* Kundali Matching Section */}
      <KundaliMatchingSection />

      {/* Why Choose Us Section */}
      <WhyChooseKundli />

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
      <div className="absolute top-20 -left-32 w-96 h-96 bg-accent-400/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 -right-32 w-96 h-96 bg-primary-400/20 rounded-full blur-[120px]" />

      <div className="relative container-8xl text-center">
        <Reveal>
          <Badge className="mb-4">
            <Star className="h-3 w-3" />
            Free Online Tool
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 mb-4">
            Free Kundli Online By Date of Birth
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-xl md:text-2xl font-semibold text-primary-600 mb-6">
            Get an instant & accurate Janam Kundli
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <p className="text-base text-ink-600 leading-relaxed">
              <span className="font-semibold text-primary-600">
                Jyotish AI's
              </span>{" "}
              free online kundli tool will help you generate a detailed Janam
              Kundli instantly. Based on the principles of Vedic Astrology, this
              tool provides accurate details of the Globeary positions, houses,
              doshas, dashas, nakshatras, etc., in your birth chart. Our team of
              expert astrologers has tested it rigorously to deliver the best
              results. If you are curious about your future or want to work
              through past traumas, this free kundali online tool is the right
              choice for you.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ KUNDALI GENERATOR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface KundaliGeneratorProps {
  formData: {
    name: string;
    gender: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  kundaliGenerated: boolean;
}

function KundaliGenerator({
  formData,
  handleChange,
  handleSubmit,
  kundaliGenerated,
}: KundaliGeneratorProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container-8xl">
        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Main Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Reveal>
              <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-ink-900">
                      New Kundli
                    </h2>
                    <p className="text-xs text-ink-500">
                      Enter your birth details below
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        placeholder="Enter full name, e.g. Rahul Sharma"
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
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleChange({
                            target: { name: "gender", value: "male" },
                          } as any)
                        }
                        className={`py-2.5 px-4 rounded-xl border-2 font-medium transition-all text-sm ${
                          formData.gender === "male"
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-ink-200 bg-white text-ink-600 hover:border-ink-300"
                        }`}
                      >
                        <Users className="h-4 w-4 inline-block mr-2" />
                        Male
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleChange({
                            target: { name: "gender", value: "female" },
                          } as any)
                        }
                        className={`py-2.5 px-4 rounded-xl border-2 font-medium transition-all text-sm ${
                          formData.gender === "female"
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-ink-200 bg-white text-ink-600 hover:border-ink-300"
                        }`}
                      >
                        <Users className="h-4 w-4 inline-block mr-2" />
                        Female
                      </button>
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
                    <p className="text-xs text-ink-500 mt-1">
                      Select date, e.g. 15 Jul 1991
                    </p>
                  </div>

                  {/* Birth Time */}
                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-1">
                      Birth Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <input
                        type="time"
                        name="birthTime"
                        value={formData.birthTime}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                      />
                    </div>
                    <p className="text-xs text-ink-500 mt-1">
                      Defaults to 12:00 AM if not provided
                    </p>
                  </div>

                  {/* Birth Place */}
                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-1">
                      Birth Place <span className="text-danger-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <input
                        type="text"
                        name="birthPlace"
                        value={formData.birthPlace}
                        onChange={handleChange}
                        placeholder="Enter city, e.g. New Delhi, India"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    type="submit"
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate Kundli
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Reveal>
          </div>

          {/* Saved Kundli Sidebar - Takes 1 column */}
          <div className="lg:col-span-1">
            <Reveal delay={0.2}>
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100 h-full flex flex-col items-center justify-center text-center">
                <div className="p-3 rounded-2xl bg-white shadow-lg mb-3">
                  <Star className="h-7 w-7 text-primary-500" />
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-1">
                  Saved Kundli
                </h3>
                <p className="text-sm text-ink-600 mb-4">
                  Please log in to see your saved horoscopes
                </p>
                <Button variant="outline" size="sm" to="/login">
                  Login
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHAT IS KUNDLI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhatIsKundli() {
  const houses = [
    { number: 1, name: "Lagna or Ascendant", title: "Personality and Self" },
    { number: 2, name: "Dhan Bhava", title: "Wealth and Family" },
    { number: 3, name: "Sahaj Bhava", title: "Courage and Communication" },
    { number: 4, name: "Sukha Bhava", title: "Home and Comforts" },
    {
      number: 5,
      name: "Trikona or Putra Bhava",
      title: "Creativity and Children",
    },
    { number: 6, name: "Shatru Bhava", title: "Health and Challenges" },
    { number: 7, name: "Yuvati Bhava", title: "Marriage and Partnerships" },
    { number: 8, name: "Aayu Bhava", title: "Transformation and Secrets" },
    { number: 9, name: "Bhagya or Dharma Bhava", title: "Fortune and Dharma" },
    { number: 10, name: "Karma Bhava", title: "Career and Karma" },
    { number: 11, name: "Labha Bhava", title: "Gains and Networking" },
    {
      number: 12,
      name: "Vyaya Bhava",
      title: "Spirituality and Foreign Connections",
    },
  ];

  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="What is Kundli?"
            title="Understanding Your Cosmic Blueprint"
            subtitle="The term 'kundli' is derived from the Sanskrit word 'Kundali', meaning 'circular' or 'coiled'."
          />
        </Reveal>

        <div className="mt-8 max-w-6xl mx-auto">
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl p-8 border border-ink-100 mb-8 w-full">
              <p className="text-ink-700 leading-relaxed">
                A Kundli is much more than just a chart. It is the precise
                position of all the Globes and nakshatras in your horoscope at
                the exact time of your birth. You can check the astrological
                positions of the Sun, Moon, Rahu, Ketu, Saturn, Jupiter, Mars,
                Mercury, and Venus across the 12 houses and 12 zodiac signs. It
                helps you decode your personality and your past, present, and
                future, as well as prominent life events.
              </p>
              <div className="mt-4 p-4 bg-accent-50 rounded-xl border border-accent-200">
                <p className="text-sm text-ink-700">
                  <span className="font-semibold">âœ¨ Note:</span> Two people
                  born on the same day may have different Janam Kundlis because
                  even a few seconds' difference can shift the Lagna and other
                  Globeary placements. This is why exact birth details matter
                  while generating your Kundali online.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h3 className="text-2xl font-bold text-ink-900 mb-6 text-center">
              What does your Kundli Contain?
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {houses.map((house, i) => (
                <motion.div
                  key={house.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white rounded-xl p-4 border border-ink-100 hover:border-accent-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white text-xs font-bold flex items-center justify-center">
                      {house.number}
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink-900 text-sm">
                        {house.name}
                      </h4>
                      <p className="text-xs text-ink-500">{house.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ KEY ELEMENTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function KeyElements() {
  const Globes = [
    {
      name: "Sun",
      description: "authority, confidence, father figures, leadership",
      icon: Sun,
    },
    {
      name: "Moon",
      description: "emotions, mental peace, feminine energy, intuition",
      icon: Moon,
    },
    {
      name: "Mars",
      description: "aggression, courage, discipline, action",
      icon: Globe,
    },
    {
      name: "Mercury",
      description: "communication, intelligence, logic, business",
      icon: Globe,
    },
    {
      name: "Jupiter",
      description: "wisdom, spirituality, wealth, teacher, expansion",
      icon: Globe,
    },
    {
      name: "Venus",
      description: "luxury, beauty, desires, relationship, romance",
      icon: Globe,
    },
    {
      name: "Saturn",
      description: "karma, delays, patience, responsibility",
      icon: Globe,
    },
    {
      name: "Rahu",
      description:
        "ambition, obsession, foreign influence, unconventional success",
      icon: Globe,
    },
    {
      name: "Ketu",
      description: "spirituality, detachment, past-life karmas, intuition",
      icon: Globe,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Key Elements"
            title="Key Elements In Your Kundli Explained"
            subtitle="Understanding the fundamental components of your birth chart"
          />
        </Reveal>

        <div className="mt-8 grid gap-6 max-w-6xl mx-auto">
          {/* Lagna/Ascendant */}
          <Reveal delay={0.1}>
            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100">
              <h3 className="text-xl font-bold text-ink-900 mb-2">
                Lagna/Ascendant - The Foundation Of Your Chart
              </h3>
              <p className="text-ink-600 leading-relaxed">
                Vedic astrologers consider Lagna more important than your Sun
                sign. Lagna is like the starting point of your life and
                represents the zodiac sign rising on the eastern horizon at the
                time of your birth. For example, Mars can be beneficial for an
                Aries Lagna but bring challenges for the Libra Lagna.
              </p>
            </div>
          </Reveal>

          {/* Navgrahas */}
          <Reveal delay={0.2}>
            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100">
              <h3 className="text-xl font-bold text-ink-900 mb-4">
                Navgrahas - The 9 Globes and Their Role
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Globes.map((Globe) => (
                  <div
                    key={Globe.name}
                    className="bg-white rounded-xl p-4 border border-ink-100"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Globe.icon className="h-4 w-4 text-primary-500" />
                      <span className="font-semibold text-ink-900">
                        {Globe.name}
                      </span>
                    </div>
                    <p className="text-xs text-ink-500">{Globe.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-accent-50 rounded-xl border border-accent-200">
                <p className="text-sm text-ink-700">
                  <span className="font-semibold">ðŸ’¡ FYI:</span> No Globe
                  gives permanently negative results. Even Saturn and Rahu
                  bestow success to a person when placed correctly in a chart.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Nakshatras */}
          <Reveal delay={0.3}>
            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100">
              <h3 className="text-xl font-bold text-ink-900 mb-2">
                Nakshatras - Your Birth Star
              </h3>
              <p className="text-ink-600 leading-relaxed">
                The lunar constellation that the Moon occupies at your birth is
                called your Nakshatra. While the zodiac sign reveals your
                personality traits, Nakshatra is responsible for your
                compatibility, emotional patterns, instincts, and karmic
                tendencies on a deeper level.
              </p>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3 border border-ink-100">
                  <span className="font-semibold text-ink-900">
                    Ashwini Nakshatra
                  </span>
                  <p className="text-xs text-ink-500">Quick and independent</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-ink-100">
                  <span className="font-semibold text-ink-900">
                    Rohini Nakshatra
                  </span>
                  <p className="text-xs text-ink-500">
                    Creative and emotionally expressive
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Dasha System */}
          <Reveal delay={0.4}>
            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100">
              <h3 className="text-xl font-bold text-ink-900 mb-2">
                Dasha System - Your Life Timeline
              </h3>
              <p className="text-ink-600 leading-relaxed">
                According to Vimshottari Dasha, a human life is divided into
                Globeary periods totalling 120 years. Each mahadasha activates
                the theme of a particular Globe. Like, Jupiter Mahadasha results
                in marriage, childbirth, education, and wisdom, while Saturn
                Mahadasha brings more responsibility, career pressure, and
                long-term growth for a native.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ DOSHAS SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function DoshasSection() {
  const doshas = [
    {
      name: "Mangal Dosha",
      description:
        "When Mars occupies a certain house of a birth chart, Mangal Dosha is formed. However, not everyone under the effect of Mars experiences marital issues.",
      remedy:
        "People with a strong kundali and a balanced Jupiter and Venus can reduce the Mangal Dosha's impact significantly.",
    },
    {
      name: "Kaal Sarp Dosha",
      description:
        "This dosha is formed when all the 7 Globes in a Janam Kundali fall between Rahu and Ketu. It forms a snake-like grip on life.",
      remedy:
        "The intensity of the effects depends on the house placement, Globeary strengths, and other dashas.",
    },
    {
      name: "Pitra Dosha",
      description:
        "This Dosha is linked to unresolved ancestral Karma and is associated with the Sun, Rahu, and the 9th house.",
      remedy:
        "Performing charity work and ancestral rituals after consulting an expert astrologer can help pacify this dosha.",
    },
    {
      name: "Shani Dosha / Sade Sati",
      description:
        "Sade Sati is a period of 7.5 years of Saturn's transit around the natal moon. It teaches discipline, maturity, and long-term restructuring.",
      remedy:
        "People who lead a disciplined life and work hard are rewarded with lasting success during Sade Sati.",
    },
  ];

  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Important Doshas"
            title="Important Doshas In Kundali and Their Remedies"
            subtitle="Understanding Globeary combinations and their solutions"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {doshas.map((dosha, i) => (
            <Reveal key={dosha.name} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {dosha.name}
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed mb-3">
                  {dosha.description}
                </p>
                <div className="p-3 bg-accent-50 rounded-xl border border-accent-200">
                  <p className="text-sm text-ink-700">
                    <span className="font-semibold">ðŸ”® Remedy:</span>{" "}
                    {dosha.remedy}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ KUNDALI MATCHING â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function KundaliMatchingSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Kundali Matching"
            title="Kundali Matching For Marriage (Kundli Milan)"
            subtitle="One of the most important and widely used branches of Vedic Astrology"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <Reveal delay={0.1}>
            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100">
              <h3 className="text-lg font-bold text-ink-900 mb-3">
                Ashtakoot System
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink-900">
                      18+ points
                    </span>
                    <p className="text-sm text-ink-500">
                      Considered decent compatibility
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink-900">
                      24+ points
                    </span>
                    <p className="text-sm text-ink-500">
                      Indicate good compatibility
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink-900">
                      30+ points
                    </span>
                    <p className="text-sm text-ink-500">
                      Viewed as a very strong match
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100">
              <h3 className="text-lg font-bold text-ink-900 mb-3">
                Expert Analysis
              </h3>
              <p className="text-ink-600 leading-relaxed mb-3">
                Expert astrologers don't rely on score totals alone. They also
                analyse:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-ink-600">
                  <Star className="h-4 w-4 text-accent-500" />
                  Mangal Dosha compatibility
                </li>
                <li className="flex items-center gap-2 text-sm text-ink-600">
                  <Star className="h-4 w-4 text-accent-500" />
                  7th house strength
                </li>
                <li className="flex items-center gap-2 text-sm text-ink-600">
                  <Star className="h-4 w-4 text-accent-500" />
                  Navamsa analysis
                </li>
                <li className="flex items-center gap-2 text-sm text-ink-600">
                  <Star className="h-4 w-4 text-accent-500" />
                  Dasha compatibility
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHY CHOOSE KUNDLI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhyChooseKundli() {
  const features = [
    {
      icon: Shield,
      title: "Accurate Calculations",
      description:
        "Based on precise Vedic astrology principles and thoroughly tested by expert astrologers.",
    },
    {
      icon: Sparkles,
      title: "Simple Language",
      description:
        "Detailed insights explained in easy-to-understand language, not technical jargon.",
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description:
        "Option to talk to expert Vedic Astrologers on call or chat for personalized guidance.",
    },
    {
      icon: Heart,
      title: "Comprehensive Analysis",
      description:
        "Beyond basic PDFs - get detailed Globeary positions, houses, doshas, and dashas analysis.",
    },
  ];

  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Why Choose Us"
            title="How Jyotish AI's Kundli Differs From Other Free Tools"
            subtitle="Most free tools available online either provide basic details or are loaded with technical jargon."
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
          <div className="mt-8 bg-white rounded-2xl p-6 border border-ink-100 max-w-6xl mx-auto">
            <h3 className="text-lg font-bold text-ink-900 mb-3">
              How To Get the Most Accurate Kundli?
            </h3>
            <p className="text-ink-600 leading-relaxed mb-4">
              The most important element to get an accurate online kundli is
              your date of birth. Even a few-second difference can make a big
              change to your predictions as it shifts your ascendant, dasha
              calculations, and house placements.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-ink-50 rounded-xl p-4">
                <h4 className="font-semibold text-ink-900 text-sm mb-2">
                  Check your birth time from:
                </h4>
                <ul className="space-y-1 text-sm text-ink-500">
                  <li>â€¢ Birth certificate</li>
                  <li>â€¢ Family documentation</li>
                  <li>â€¢ Hospital discharge records</li>
                  <li>â€¢ Religious ceremony records</li>
                </ul>
              </div>
              <div className="bg-ink-50 rounded-xl p-4">
                <h4 className="font-semibold text-ink-900 text-sm mb-2">
                  Divisional charts for accuracy:
                </h4>
                <ul className="space-y-1 text-sm text-ink-500">
                  <li>â€¢ Lagna Chart (D1): Overall Life</li>
                  <li>â€¢ Navamsa (D9): Marriage and spiritual strength</li>
                  <li>â€¢ Dashamsa (D10): Career and profession</li>
                </ul>
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
            <Sparkles className="h-3 w-3" />
            Get Started
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Ready to discover your{" "}
            <span className="gradient-text-light">cosmic blueprint?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
            Generate your free Kundli now and unlock the secrets of your birth
            chart for a brighter, more fulfilling life.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/free-kundali" variant="primary" size="lg">
              <Star className="h-4 w-4" />
              Generate Free Kundli
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
