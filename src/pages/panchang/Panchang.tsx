import {
  FileText,
  CheckCircle,
  ArrowRight,
  Clock,
  BarChart3,
  RefreshCw,
  Download,
  Wallet,
  Calendar,
  Sun,
  Moon,
  Star,
  Sparkles,
  Compass,
  Shield,
  Crown,
  Users,
  AlertCircle,
} from "lucide-react";
import PageHero from "../../components/ui/PageHero";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/animations/Reveal";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

const panchangFeatures = [
  {
    icon: Calendar,
    title: "Daily Panchang",
    desc: "Get daily cosmic energy updates with Tithi, Nakshatra, Yoga, and Karana details.",
    href: "/today-panchang",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Calendar,
    title: "Tomorrow Panchang",
    desc: "Plan ahead with tomorrow's panchang and astrological guidance for important events.",
    href: "/tomorrow-panchang",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Clock,
    title: "Rahu Kaal",
    desc: "Check today's inauspicious timings and avoid starting new work during Rahu Kaal.",
    href: "/rahu-kaal",
    color: "from-rose-500 to-red-500",
  },
  {
    icon: Crown,
    title: "Shubh Muhurat",
    desc: "Find auspicious timings for important events with Abhijit Muhurat and more.",
    href: "/shubh-muhurat",
    color: "from-amber-500 to-yellow-500",
  },
  {
    icon: Sun,
    title: "Tithi Calculator",
    desc: "Calculate the lunar day (Tithi) and its significance for rituals and ceremonies.",
    href: "/tithi",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Star,
    title: "Nakshatra Finder",
    desc: "Find your birth Nakshatra and understand its influence on your personality.",
    href: "/nakshatra",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Compass,
    title: "Yoga Calculator",
    desc: "Discover the Yoga of the day and its impact on your activities and decisions.",
    href: "/yoga",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Moon,
    title: "Karana Calculator",
    desc: "Check the Karana of the day for muhurat selection and daily activities.",
    href: "/karana",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Sparkles,
    title: "Choghadiya",
    desc: "Find the best time periods (Choghadiya) for starting new ventures and travel.",
    href: "/choghadiya",
    color: "from-pink-500 to-rose-500",
  },
];

const panchangBenefits = [
  {
    icon: Calendar,
    title: "Plan Events",
    desc: "Choose auspicious dates for weddings, housewarming, and ceremonies.",
  },
  {
    icon: Sun,
    title: "Daily Guidance",
    desc: "Get daily cosmic energy updates for better decision-making.",
  },
  {
    icon: Clock,
    title: "Avoid Inauspicious Times",
    desc: "Know Rahu Kaal and other inauspicious timings to avoid.",
  },
  {
    icon: Star,
    title: "Spiritual Alignment",
    desc: "Align your activities with cosmic energies for better results.",
  },
  {
    icon: Compass,
    title: "Travel Planning",
    desc: "Find the best days and directions for safe travel.",
  },
  {
    icon: Shield,
    title: "Fasting Guidance",
    desc: "Know the right Tithis and days for fasting and spiritual practices.",
  },
];

const howItWorksSteps = [
  {
    step: "Select Your Location",
    desc: "Choose your city to get accurate panchang details for your time zone.",
  },
  {
    step: "View Daily Panchang",
    desc: "Get Tithi, Nakshatra, Yoga, Karana, and other cosmic details.",
  },
  {
    step: "Check Auspicious Times",
    desc: "Find Shubh Muhurat, Abhijit Muhurat, and avoid Rahu Kaal.",
  },
  {
    step: "Plan Your Day",
    desc: "Use the insights to plan important events and daily activities.",
  },
];

export default function Panchang() {
  return (
    <>
      <PageHero
        badge="Panchang"
        title={
          <>
            Your Daily <span className="gradient-text">Vedic Calendar</span>
          </>
        }
        subtitle="Get daily cosmic energy updates, auspicious timings, and astrological guidance for better decision-making."
      />

      {/* Panchang Features */}
      <section className="section-pad bg-white">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Panchang Tools"
              title="Complete Panchang Suite"
              subtitle="Everything you need to align with cosmic energies daily"
            />
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {panchangFeatures.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.1}>
                <div className="group h-full bg-ink-50 rounded-2xl p-8 border border-ink-100 hover:border-accent-300 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${f.color} w-fit mb-5 group-hover:scale-110 transition-transform`}
                  >
                    <f.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed mb-4">
                    {f.desc}
                  </p>
                  <Button to={f.href} variant="outline" size="sm">
                    Explore <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-pad bg-ink-50">
        <div className="container-8xl max-w-4xl">
          <Reveal>
            <SectionHeading
              badge="How It Works"
              title="How to use Panchang"
              subtitle="Simple steps to get started with your daily Vedic calendar"
            />
          </Reveal>
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {howItWorksSteps.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.1}>
                <div className="flex items-start gap-5 p-6 rounded-2xl bg-white border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink-900">
                      {item.step}
                    </h3>
                    <p className="text-sm text-ink-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-pad bg-white">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Benefits"
              title="Why use Panchang daily?"
              subtitle="Align your life with cosmic energies for better outcomes"
            />
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {panchangBenefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.1}>
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-ink-50 border border-ink-100 hover:border-accent-200 hover:bg-white hover:shadow-lg transition-all">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 shrink-0">
                    <benefit.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink-900">{benefit.title}</h3>
                    <p className="text-sm text-ink-500 mt-1">{benefit.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Five Elements */}
      <section className="section-pad bg-ink-50">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Five Elements"
              title="The Panchang Explained"
              subtitle="Panchang is derived from the Sanskrit words 'panch' (five) and 'ang' (limbs)"
            />
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                name: "Tithi",
                desc: "Lunar day based on the phase of the Moon",
                icon: Moon,
              },
              {
                name: "Vaar",
                desc: "Day of the week with planetary ruler",
                icon: Sun,
              },
              {
                name: "Nakshatra",
                desc: "Lunar mansion or star constellation",
                icon: Star,
              },
              {
                name: "Yoga",
                desc: "Combination of Sun and Moon positions",
                icon: Compass,
              },
              {
                name: "Karana",
                desc: "Half of a Tithi for timing activities",
                icon: Clock,
              },
            ].map((item, i) => (
              <Reveal key={item.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all text-center">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto mb-3">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900">
                    {item.name}
                  </h3>
                  <p className="text-xs text-ink-500 mt-1">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-ink-950 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-accent-500/15 to-primary-500/15 blur-[130px] rounded-full" />

        <div className="relative container-8xl text-center">
          <Reveal>
            <Badge variant="dark">
              <Sparkles className="h-3 w-3" />
              Start Your Day with Cosmic Wisdom
            </Badge>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance">
              Check Today's{" "}
              <span className="gradient-text-light">Panchang</span>
            </h2>
            <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
              Get daily cosmic energy updates and align your activities with
              auspicious timings.
            </p>
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
    </>
  );
}
