import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  Users,
  Sparkles,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Activity,
  Moon,
  Sun,
  Globe,
  Calendar,
  Clock,
  MapPin,
  User,
  Info,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/animations/Reveal";

// Zodiac signs data
const zodiacSigns = [
  {
    name: "Aries",
    date: "Mar 21 - Apr 19",
    emoji: "â™ˆ",
    color: "from-red-500 to-orange-500",
  },
  {
    name: "Taurus",
    date: "Apr 20 - May 20",
    emoji: "â™‰",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Gemini",
    date: "May 21 - Jun 21",
    emoji: "â™Š",
    color: "from-yellow-500 to-amber-500",
  },
  {
    name: "Cancer",
    date: "Jun 22 - Jul 22",
    emoji: "â™‹",
    color: "from-blue-400 to-cyan-500",
  },
  {
    name: "Leo",
    date: "Jul 23 - Aug 22",
    emoji: "â™Œ",
    color: "from-orange-500 to-yellow-500",
  },
  {
    name: "Virgo",
    date: "Aug 23 - Sep 22",
    emoji: "â™",
    color: "from-green-600 to-lime-500",
  },
  {
    name: "Libra",
    date: "Sep 23 - Oct 23",
    emoji: "â™Ž",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Scorpio",
    date: "Oct 24 - Nov 21",
    emoji: "â™",
    color: "from-red-600 to-purple-700",
  },
  {
    name: "Sagittarius",
    date: "Nov 22 - Dec 21",
    emoji: "â™",
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Capricorn",
    date: "Dec 22 - Jan 19",
    emoji: "â™‘",
    color: "from-gray-600 to-slate-700",
  },
  {
    name: "Aquarius",
    date: "Jan 20 - Feb 18",
    emoji: "â™’",
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Pisces",
    date: "Feb 19 - Mar 20",
    emoji: "â™“",
    color: "from-purple-400 to-pink-400",
  },
];

export default function Compatibility() {
  const [selectedSign, setSelectedSign] = useState("");
  const [partnerSign, setPartnerSign] = useState("");
  const [matchResult, setMatchResult] = useState<null | {
    score: number;
    message: string;
    strengths: string[];
    challenges: string[];
    advice: string;
  }>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSign && partnerSign) {
      // Simulate compatibility calculation
      const score = Math.floor(Math.random() * 40) + 60; // 60-100
      const messages = [
        "A match made in heaven! Your signs complement each other perfectly.",
        "You share a deep connection that can withstand any challenge.",
        "Your bond is strong with mutual understanding and respect.",
        "You have great potential for a lasting and fulfilling relationship.",
        "Your signs create a beautiful balance of energy and emotions.",
      ];
      const strengths = [
        "Strong emotional connection",
        "Shared values and goals",
        "Great communication",
        "Mutual respect and admiration",
        "Passionate and exciting bond",
      ];
      const challenges = [
        "May need to work on patience",
        "Different approaches to conflict",
        "Balancing independence and togetherness",
        "Learning to compromise",
        "Managing expectations",
      ];

      setMatchResult({
        score: score,
        message: messages[Math.floor(Math.random() * messages.length)],
        strengths: strengths.slice(0, Math.floor(Math.random() * 3) + 2),
        challenges: challenges.slice(0, Math.floor(Math.random() * 3) + 2),
        advice:
          "Focus on open communication and mutual respect. Celebrate your differences and grow together.",
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Compatibility Checker */}
      <CompatibilityChecker
        selectedSign={selectedSign}
        setSelectedSign={setSelectedSign}
        partnerSign={partnerSign}
        setPartnerSign={setPartnerSign}
        handleSubmit={handleSubmit}
        matchResult={matchResult}
      />

      {/* Zodiac Signs Grid */}
      <ZodiacSignsGrid />

      {/* Love Compatibility Info */}
      <LoveCompatibilityInfo />

      {/* Why Check Compatibility */}
      <WhyCompatibilityMatters />

      {/* Compatibility Tips */}
      <CompatibilityTips />

      {/* CTA Section */}
      <CTASection />
    </>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HERO SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-accent-900/10 to-ink-50">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-20 -left-32 w-96 h-96 bg-accent-400/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 -right-32 w-96 h-96 bg-primary-400/20 rounded-full blur-[120px]" />

      <div className="relative container-8xl text-center">
        <Reveal>
          <Badge className="mb-4">
            <Heart className="h-3 w-3" />
            Love Compatibility
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 mb-4">
            Zodiac Sign Love Compatibility
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-xl md:text-2xl font-semibold text-accent-600 mb-6">
            Discover Your Cosmic Connection
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <p className="text-base text-ink-600 leading-relaxed">
              Zodiac sign compatibility reveals more than just compatibility in
              romantic relationships. You can also find information on your
              partner's and your own zodiac love and sexual compatibility. This
              can ensure a long-lasting relationship with shared understanding
              while assisting you in learning further about your mate and your
              bond.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ COMPATIBILITY CHECKER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface CompatibilityCheckerProps {
  selectedSign: string;
  setSelectedSign: (sign: string) => void;
  partnerSign: string;
  setPartnerSign: (sign: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  matchResult: {
    score: number;
    message: string;
    strengths: string[];
    challenges: string[];
    advice: string;
  } | null;
}

function CompatibilityChecker({
  selectedSign,
  setSelectedSign,
  partnerSign,
  setPartnerSign,
  handleSubmit,
  matchResult,
}: CompatibilityCheckerProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container-8xl">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-gradient-to-br from-accent-600 to-primary-600">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-ink-900">
                    Check Your Compatibility
                  </h2>
                  <p className="text-xs text-ink-500">
                    Select your zodiac signs to find your match
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Your Sign */}
                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-2">
                      Your Zodiac Sign{" "}
                      <span className="text-danger-500">*</span>
                    </label>
                    <div className="relative">
                      <Star className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <select
                        value={selectedSign}
                        onChange={(e) => setSelectedSign(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                        required
                      >
                        <option value="">Select your sign</option>
                        {zodiacSigns.map((sign) => (
                          <option key={sign.name} value={sign.name}>
                            {sign.emoji} {sign.name} ({sign.date})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Partner's Sign */}
                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-2">
                      Partner's Zodiac Sign{" "}
                      <span className="text-danger-500">*</span>
                    </label>
                    <div className="relative">
                      <Heart className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <select
                        value={partnerSign}
                        onChange={(e) => setPartnerSign(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                        required
                      >
                        <option value="">Select partner's sign</option>
                        {zodiacSigns.map((sign) => (
                          <option key={sign.name} value={sign.name}>
                            {sign.emoji} {sign.name} ({sign.date})
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
                  <Heart className="h-4 w-4" />
                  Check Compatibility
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              {/* Results */}
              {matchResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 bg-white rounded-2xl border border-accent-200"
                >
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-50 rounded-full">
                      <Heart className="h-4 w-4 text-accent-500 fill-accent-500" />
                      <span className="text-sm font-semibold text-ink-900">
                        Compatibility Score
                      </span>
                    </div>
                    <div className="mt-3 text-5xl font-bold gradient-text">
                      {matchResult.score}%
                    </div>
                    <p className="text-sm text-ink-600 mt-2">
                      {matchResult.message}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Strengths
                      </h4>
                      <ul className="space-y-1">
                        {matchResult.strengths.map((strength, i) => (
                          <li
                            key={i}
                            className="text-xs text-green-600 flex items-start gap-1"
                          >
                            <span className="text-green-400">â€¢</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                      <h4 className="text-sm font-semibold text-amber-700 mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Challenges
                      </h4>
                      <ul className="space-y-1">
                        {matchResult.challenges.map((challenge, i) => (
                          <li
                            key={i}
                            className="text-xs text-amber-600 flex items-start gap-1"
                          >
                            <span className="text-amber-400">â€¢</span>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-200">
                    <h4 className="text-sm font-semibold text-primary-700 mb-1 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Advice
                    </h4>
                    <p className="text-sm text-ink-600">{matchResult.advice}</p>
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ ZODIAC SIGNS GRID â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ZodiacSignsGrid() {
  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Zodiac Signs"
            title="Explore All Zodiac Signs"
            subtitle="Learn about each sign's unique traits and characteristics"
          />
        </Reveal>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {zodiacSigns.map((sign, i) => (
            <Reveal key={sign.name} delay={i * 0.05}>
              <div className="bg-white rounded-2xl p-4 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all text-center group">
                <div
                  className={`text-4xl mb-2 group-hover:scale-110 transition-transform`}
                >
                  {sign.emoji}
                </div>
                <h3 className="text-sm font-bold text-ink-900">{sign.name}</h3>
                <p className="text-[10px] text-ink-500">{sign.date}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ LOVE COMPATIBILITY INFO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function LoveCompatibilityInfo() {
  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Love Compatibility"
            title="What is Zodiac Sign Love Compatibility?"
            subtitle="Understanding your cosmic connection"
          />
        </Reveal>

        <div className="mt-8 w-full">
          <Reveal delay={0.1}>
            <div className="bg-ink-50 rounded-2xl p-8 border border-ink-100 w-full">
              <p className="text-ink-700 leading-relaxed">
                You don't always get along like a blaze on flames with people,
                but when you're with that "special person," you feel happy and
                in control of the situation. We encounter numerous people
                throughout life. One person would be your life partner out of
                all those who may be terrific friends or mentors for you. You
                must make the appropriate choice for that person. They must make
                you feel at home, never depressed or too uncared for.
              </p>
              <div className="mt-4 p-4 bg-accent-50 rounded-xl border border-accent-200">
                <p className="text-sm text-ink-700">
                  <span className="font-semibold">ðŸ’¡ Did you know?</span> Love
                  compatibility can also forecast how your relationship will
                  develop in the future, in addition to letting you know how
                  things stand right now. It reveals the strength of your
                  current bond, what makes it successful, and if you and your
                  loved one are about to experience harmony or conflict in the
                  future.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHY COMPATIBILITY MATTERS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhyCompatibilityMatters() {
  const reasons = [
    {
      icon: Heart,
      title: "Emotional Connection",
      description:
        "Understand the emotional bond you share with your partner and how your signs interact on a deeper level.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: TrendingUp,
      title: "Future Predictions",
      description:
        "Get insights into how your relationship will evolve and what challenges or harmony lies ahead.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Better Understanding",
      description:
        "Learn more about your partner's personality traits, needs, and expectations in the relationship.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "Harmony & Conflict",
      description:
        "Identify potential areas of conflict and discover how to maintain harmony in your relationship.",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <section className="py-16 bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Why It Matters"
            title="Why Check Zodiac Compatibility?"
            subtitle="Understanding your cosmic connection can strengthen your relationship"
          />
        </Reveal>

        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${reason.color} w-fit mb-4`}
                >
                  <reason.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ COMPATIBILITY TIPS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function CompatibilityTips() {
  const tips = [
    {
      icon: Star,
      title: "Know Your Signs",
      description:
        "Understand the core traits of both zodiac signs to appreciate each other's strengths.",
    },
    {
      icon: Heart,
      title: "Embrace Differences",
      description:
        "Your differences can be your greatest strength. Learn to complement each other.",
    },
    {
      icon: Shield,
      title: "Build Trust",
      description:
        "Trust is the foundation of any relationship. Work on building and maintaining it.",
    },
    {
      icon: Award,
      title: "Grow Together",
      description:
        "Use your compatibility insights to grow together as a couple.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Tips"
            title="Tips for a Stronger Relationship"
            subtitle="Use these insights to build a lasting bond"
          />
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {tips.map((tip, i) => (
            <Reveal key={tip.title} delay={i * 0.1}>
              <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all text-center">
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent-600 to-primary-600 w-fit mx-auto mb-4">
                  <tip.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed">
                  {tip.description}
                </p>
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
            <Heart className="h-3 w-3" />
            Find Your Match
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Ready to discover your{" "}
            <span className="gradient-text-light">cosmic connection?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
            Check your zodiac sign compatibility and find out if you and your
            partner are a perfect match.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/compatibility" variant="primary" size="lg">
              <Heart className="h-4 w-4" />
              Check Compatibility
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
