import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle,
  Users,
  Star,
  Calendar,
  MessageCircle,
  Heart,
  Moon,
  Sparkles,
} from "lucide-react";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/animations/Reveal";
import Counter from "../components/animations/Counter";
import {
  services,
  stats,
  features,
  testimonials,
  faqs,
  specializations,
} from "../lib/navigation";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <SpecializationsSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ink-50 pt-20">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-400/20 rounded-full blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-400/20 rounded-full blur-[120px]"
        animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative container-8xl grid lg:grid-cols-2 gap-12 items-center py-20">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge>
              <span className="flex h-2 w-2 rounded-full bg-accent-500 animate-pulse" />
              Your Cosmic Guide
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Discover Your <span className="gradient-text">Cosmic Destiny</span>{" "}
            with Expert Astrologers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-ink-500 leading-relaxed max-w-xl"
          >
            Connect with certified astrologers, get personalized horoscopes, and
            unlock the secrets of your birth chart. Your journey to
            self-discovery starts here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button to="/consultations" variant="primary" size="lg">
              Chat with Astrologer
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/free-kundali" variant="outline" size="lg">
              <Star className="h-4 w-4" />
              Free Kundali
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500"
          >
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent-500" /> 500+ Expert
              Astrologers
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent-500" /> 24/7 Availability
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent-500" /> 100% Privacy
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}

const ZODIAC_SIGNS = [
  { symbol: "♈", name: "Aries", color: "text-red-500" },
  { symbol: "♉", name: "Taurus", color: "text-emerald-600" },
  { symbol: "♊", name: "Gemini", color: "text-amber-500" },
  { symbol: "♋", name: "Cancer", color: "text-slate-500" },
  { symbol: "♌", name: "Leo", color: "text-orange-500" },
  { symbol: "♍", name: "Virgo", color: "text-teal-600" },
  { symbol: "♎", name: "Libra", color: "text-pink-500" },
  { symbol: "♏", name: "Scorpio", color: "text-red-700" },
  { symbol: "♐", name: "Sagittarius", color: "text-purple-600" },
  { symbol: "♑", name: "Capricorn", color: "text-indigo-600" },
  { symbol: "♒", name: "Aquarius", color: "text-blue-600" },
  { symbol: "♓", name: "Pisces", color: "text-cyan-600" },
];

function HeroVisual() {
  return (
    <div className="relative">
      <motion.div
        className="absolute -inset-4 bg-gradient-to-br from-accent-400/30 to-primary-400/30 rounded-3xl blur-2xl"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative glass-card rounded-3xl p-6 lg:p-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-danger-500" />
            <div className="h-3 w-3 rounded-full bg-warning-500" />
            <div className="h-3 w-3 rounded-full bg-success-500" />
          </div>
          <span className="text-xs font-mono text-ink-400">
            zodiac_wheel.svg
          </span>
        </div>

        <div className="relative aspect-square max-w-[440px] mx-auto flex items-center justify-center">
          {/* Starfield */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full opacity-40"
          >
            {Array.from({ length: 24 }).map((_, i) => {
              const x = (i * 37) % 100;
              const y = (i * 61) % 100;
              const r = 0.15 + ((i * 7) % 4) * 0.1;
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={r}
                  fill="#b8862a"
                  animate={{ opacity: [0.2, 0.9, 0.2] }}
                  transition={{
                    duration: 2 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              );
            })}
          </svg>

          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="0.25"
                opacity="0.4"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#b8862a"
                strokeWidth="0.15"
                opacity="0.3"
                strokeDasharray="0.5 1.5"
              />
            </svg>

            {/* 12 zodiac symbols around */}
            {ZODIAC_SIGNS.map((sign, idx) => {
              const angle = (idx * 360) / 12 - 90;
              const rad = (angle * Math.PI) / 180;
              const radius = 42;
              const x = 50 + radius * Math.cos(rad);
              const y = 50 + radius * Math.sin(rad);
              return (
                <div
                  key={sign.name}
                  className="absolute"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    className={`h-9 w-9 lg:h-11 lg:w-11 rounded-full bg-white border-2 border-accent-200 flex items-center justify-center shadow-md ${sign.color}`}
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 90,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    whileHover={{ scale: 1.15 }}
                  >
                    <span className="text-lg lg:text-xl leading-none">
                      {sign.symbol}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* Inner counter-rotating ring */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: -360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="w-[70%] h-[70%]">
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="0.3"
                opacity="0.5"
                strokeDasharray="1 2"
              />
            </svg>
          </motion.div>

          {/* Center glowing sun/om */}
          <motion.div
            className="relative z-10"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 blur-2xl"
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative h-20 w-20 lg:h-24 lg:w-24 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-orange-600 flex items-center justify-center shadow-2xl border-2 border-white/40">
                <motion.span
                  className="text-4xl lg:text-5xl"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ☀️
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute -top-6 -right-6 glass-card rounded-2xl p-4 shadow-xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success-100">
            <Star className="h-5 w-5 text-success-600" />
          </div>
          <div>
            <div className="text-xs text-ink-500">Accuracy Rate</div>
            <div className="text-lg font-bold text-ink-900">99.5%</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-4 shadow-xl"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary-100">
            <Users className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <div className="text-xs text-ink-500">Happy Clients</div>
            <div className="text-lg font-bold text-ink-900">100K+</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="py-20 lg:py-24 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg-dark opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-500/10 blur-[150px] rounded-full" />

      <div className="relative container-8xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold gradient-text-light">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.value % 1 !== 0 ? 2 : 0}
                  />
                </div>
                <div className="mt-2 text-sm text-ink-300 font-medium">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Our Services"
            title="Everything you need for cosmic guidance"
            subtitle="From personalized consultations to daily horoscopes, we've got you covered."
          />
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 0.1}>
              <div className="group relative h-full bg-ink-50 rounded-2xl p-8 border border-ink-100 hover:border-accent-300 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:gap-3 transition-all">
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecializationsSection() {
  return (
    <section className="section-pad bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="What We Offer"
            title="Expert astrologers for every need"
            subtitle="Choose from our diverse range of astrology specializations."
          />
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializations.map((spec, i) => (
            <Reveal key={spec.title} delay={(i % 3) * 0.1}>
              <div className="group h-full bg-white rounded-2xl p-8 border border-ink-100 hover:border-accent-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-3 rounded-xl bg-accent-50 w-fit mb-5 group-hover:bg-accent-100 transition-colors">
                  <spec.icon className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {spec.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed">
                  {spec.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      icon: Sparkles,
      title: "Generate Your Kundali",
      desc: "Enter your birth details to get a detailed birth chart instantly.",
    },
    {
      icon: Calendar,
      title: "Daily Horoscope",
      desc: "Receive personalized horoscopes and panchang updates daily.",
    },
    {
      icon: Moon,
      title: "Book a Pooja",
      desc: "Schedule sacred rituals and ceremonies for spiritual well-being.",
    },
    {
      icon: MessageCircle,
      title: "Get Daily Guidance",
      desc: "Connect with certified astrologers for daily insights and advice.",
    },
    {
      icon: Heart,
      title: "Transform Your Life",
      desc: "Make informed decisions with cosmic insights and guidance.",
    },
  ];

  return (
    <section className="section-pad bg-white overflow-hidden">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="How It Works"
            title="Your journey to cosmic wisdom"
            subtitle="A simple 5-step process to unlock your true potential."
          />
        </Reveal>

        <div className="mt-16 hidden md:block">
          <div className="flex items-start justify-between gap-2">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="flex items-start gap-0 flex-1">
                  <div className="group relative w-full max-w-[200px] bg-ink-50 rounded-2xl p-5 border border-ink-100 hover:border-accent-200 hover:bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      <step.icon className="h-6 w-6 text-white" />
                    </div>

                    <h3 className="text-sm font-bold text-ink-900 mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-ink-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {i < steps.length - 1 && (
                    <div className="flex items-center justify-center px-1 flex-shrink-0 self-center mt-[-20px]">
                      <div className="relative">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-accent-400 to-primary-400" />
                        <div className="absolute -right-1.5 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-accent-500 rotate-45" />
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4 md:hidden">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:bg-white hover:shadow-lg transition-all duration-300 relative">
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex items-start gap-4 pr-6">
                  <div className="shrink-0">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit">
                      <step.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink-900">
                      {step.title}
                    </h3>
                    <p className="text-xs text-ink-500 mt-1">{step.desc}</p>
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

function WhyChooseUsSection() {
  return (
    <section className="section-pad bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Why Choose Us"
            title="Your trusted cosmic companion"
            subtitle="Experience the difference with our expert astrologers and accurate predictions."
          />
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 0.1}>
              <div className="group h-full rounded-2xl p-8 bg-gradient-to-br from-ink-50 to-white border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all duration-300">
                <div className="p-3 rounded-xl bg-accent-50 w-fit mb-5 group-hover:bg-accent-100 transition-colors">
                  <feature.icon className="h-6 w-6 text-accent-600" />
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
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Testimonials"
            title="What our clients say"
            subtitle="Real stories from real people who found their path with us."
          />
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.1}>
              <div className="h-full bg-ink-50 rounded-2xl p-8 border border-ink-100 flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-accent-500 text-accent-500"
                    />
                  ))}
                </div>
                <p className="text-ink-700 leading-relaxed flex-1 italic">
                  "{t.quote}"
                </p>
                <div className="mt-6 pt-6 border-t border-ink-200">
                  <div className="font-bold text-ink-900">{t.author}</div>
                  <div className="text-sm text-ink-500">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
