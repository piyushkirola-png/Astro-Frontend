import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Heart,
  Users,
  Calculator,
  Moon,
  Sun,
  Calendar,
  Clock,
  Compass,
  Shield,
  Award,
  TrendingUp,
  Crown,
  Gem,
  Coffee,
  Diamond
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal from '../../components/animations/Reveal';
import Counter from '../../components/animations/Counter';

const calculators = [
  {
    icon: Star,
    title: 'Free Kundali',
    desc: 'Generate your detailed Janam Kundli instantly with planetary positions and houses.',
    href: '/free-kundali',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    icon: Heart,
    title: 'Love Calculator',
    desc: 'Check your love compatibility percentage with your partner using name and birth details.',
    href: '/love-calculator',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: Users,
    title: 'Friendship Calculator',
    desc: 'Discover the strength of your bond with friends through numerology and astrology.',
    href: '/friendship-calculator',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Calculator,
    title: 'Numerology Calculator',
    desc: 'Find your Destiny, Personality, and Soul numbers based on your name and birth date.',
    href: '/numerology-calculator',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Moon,
    title: 'Mulank Calculator',
    desc: 'Calculate your Mulank number by date of birth and discover your natural personality.',
    href: '/mulank-calculator',
    color: 'from-orange-500 to-amber-500'
  },
  {
    icon: Star,
    title: 'Destiny Number',
    desc: 'Uncover your life\'s purpose and spiritual path with your destiny number.',
    href: '/destiny-number',
    color: 'from-yellow-500 to-amber-500'
  },
  {
    icon: Calendar,
    title: 'Age Calculator',
    desc: 'Find your exact age in years, months, days, hours, and minutes with cosmic insights.',
    href: '/age-calculator',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Compass,
    title: 'Sade Sati Calculator',
    desc: 'Check if Saturn\'s 7.5-year cycle is affecting your life with detailed insights.',
    href: '/sade-sati',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Shield,
    title: 'Kaal Sarp Dosh',
    desc: 'Check if all planets are caught between Rahu and Ketu in your birth chart.',
    href: '/kaal-sarp-dosh',
    color: 'from-red-500 to-orange-500'
  },
  {
    icon: Calendar,
    title: 'Today Panchang',
    desc: 'Get daily cosmic energy updates with Tithi, Nakshatra, Yoga, and auspicious timings.',
    href: '/today-panchang',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    icon: Calendar,
    title: 'Tomorrow Panchang',
    desc: 'Plan ahead with tomorrow\'s panchang and astrological guidance.',
    href: '/tomorrow-panchang',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Clock,
    title: 'Rahu Kaal',
    desc: 'Check today\'s inauspicious timings and avoid starting new work during Rahu Kaal.',
    href: '/rahu-kaal',
    color: 'from-rose-500 to-red-500'
  },
  {
    icon: Crown,
    title: 'Shubh Muhurat',
    desc: 'Find auspicious timings for important events with Abhijit Muhurat and more.',
    href: '/shubh-muhurat',
    color: 'from-amber-500 to-yellow-500'
  },
  {
    icon: Heart,
    title: 'Kundali Matching',
    desc: 'Check marriage compatibility with detailed Guna Milan and Mangal Dosha analysis.',
    href: '/kundali-matching',
    color: 'from-pink-500 to-purple-500'
  },
  {
    icon: Star,
    title: 'Zodiac Compatibility',
    desc: 'Discover your love compatibility based on zodiac signs and cosmic alignment.',
    href: '/compatibility',
    color: 'from-violet-500 to-purple-500'
  },
];

const featuredCalculators = [
  {
    icon: Star,
    title: 'Free Kundali Generator',
    desc: 'Generate your complete Janam Kundli with planetary positions, houses, and doshas.',
    href: '/free-kundali',
    stat: '500K+ generated'
  },
  {
    icon: Heart,
    title: 'Love Calculator',
    desc: 'Find your love percentage with your partner using name and birth date analysis.',
    href: '/love-calculator',
    stat: '1M+ matches'
  },
  {
    icon: Calendar,
    title: 'Today Panchang',
    desc: 'Get daily cosmic energy updates for auspicious timings and planetary positions.',
    href: '/today-panchang',
    stat: 'Daily updates'
  },
];

const stats = [
  { value: 15, suffix: '+', label: 'Free Calculators' },
  { value: 500, suffix: 'K+', label: 'Kundalis Generated' },
  { value: 1, suffix: 'M+', label: 'Love Matches' },
  { value: 4.8, suffix: '+', label: 'Average Rating' },
];

export default function Calculators() {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <StatsSection />
      <AllCalculatorsSection />
      <BenefitsSection />
      <CTASection />
    </>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-ink-50 pt-20">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 grid-bg opacity-60" />
      
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-400/20 rounded-full blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-400/20 rounded-full blur-[120px]"
        animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative container-8xl text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge>
            <span className="flex h-2 w-2 rounded-full bg-accent-500 animate-pulse" />
            Free Astrology Calculators
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          Explore Our Free <span className="gradient-text">Astrology Calculators</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg text-ink-500 leading-relaxed max-w-2xl mx-auto"
        >
          Discover your cosmic path with our collection of free astrology and numerology tools. 
          Get instant insights into your life, love, career, and destiny.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button to="/free-kundali" variant="primary" size="lg">
            <Star className="h-4 w-4" />
            Start with Free Kundali
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button to="#all-calculators" variant="outline" size="lg">
            <Calculator className="h-4 w-4" />
            View All Calculators
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-500"
        >
          <span className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-accent-500" /> 15+ Free Tools
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-accent-500" /> Instant Results
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-accent-500" /> 100% Private
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ FEATURED â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function FeaturedSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Featured Tools"
            title="Most Popular Calculators"
            subtitle="Start with our most used and trusted astrology tools"
          />
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {featuredCalculators.map((calc, i) => (
            <Reveal key={calc.title} delay={i * 0.1}>
              <div className="group h-full bg-ink-50 rounded-2xl p-8 border border-ink-100 hover:border-accent-300 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 shrink-0 group-hover:scale-110 transition-transform">
                    <calc.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-ink-900">{calc.title}</h3>
                    <p className="text-sm text-ink-500 mt-1">{calc.desc}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-accent-600">{calc.stat}</span>
                      <Button to={calc.href} variant="outline" size="sm">
                        Try Now <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ STATS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function StatsSection() {
  return (
    <section className="py-20 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg-dark opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-500/10 blur-[120px] rounded-full" />
      
      <div className="relative container-8xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold gradient-text-light">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.value % 1 !== 0 ? 1 : 0}
                  />
                </div>
                <div className="mt-2 text-sm text-ink-300 font-medium">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ ALL CALCULATORS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function AllCalculatorsSection() {
  return (
    <section id="all-calculators" className="section-pad bg-ink-50">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="All Tools"
            title="Complete Collection of Calculators"
            subtitle="Choose from our wide range of free astrology and numerology tools"
          />
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc, i) => (
            <Reveal key={calc.title} delay={(i % 3) * 0.08}>
              <div className="group h-full bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${calc.color} w-fit mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                  <calc.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-ink-900 mb-2">{calc.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{calc.desc}</p>
                <Button to={calc.href} variant="outline" size="sm" className="mt-4">
                  Try Now <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ BENEFITS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function BenefitsSection() {
  const benefits = [
    {
      icon: Shield,
      title: '100% Free',
      desc: 'All our calculators and tools are completely free to use with no hidden charges.'
    },
    {
      icon: Sparkles,
      title: 'Accurate Insights',
      desc: 'Based on authentic Vedic astrology and numerology principles for reliable guidance.'
    },
    {
      icon: Clock,
      title: 'Instant Results',
      desc: 'Get your results immediately after entering your details - no waiting time.'
    },
    {
      icon: Shield,
      title: 'Privacy Assured',
      desc: 'Your personal information and birth details are kept completely confidential.'
    }
  ];

  return (
    <section className="section-pad bg-white">
      <div className="container-8xl">
        <Reveal>
          <SectionHeading
            badge="Why Choose Us"
            title="Why Use Our Calculators?"
            subtitle="Get accurate astrological insights with complete privacy"
          />
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 0.1}>
              <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 mb-4">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-ink-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-ink-500">{benefit.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-ink-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg-dark opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-accent-500/15 to-primary-500/15 blur-[130px] rounded-full" />

      <div className="relative container-8xl text-center">
        <Reveal>
          <Badge variant="dark">
            <Sparkles className="h-3 w-3" />
            Start Exploring
          </Badge>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance">
            Ready to discover your <span className="gradient-text-light">cosmic path?</span>
          </h2>
          <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
            Explore all our free astrology calculators and start your journey of self-discovery today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/free-kundali" variant="primary" size="lg">
              <Star className="h-4 w-4" />
              Start with Free Kundali
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