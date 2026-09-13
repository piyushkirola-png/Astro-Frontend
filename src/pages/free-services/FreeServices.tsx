import { useState } from "react";
import {
  Check,
  ArrowRight,
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
  MessageSquare,
  Phone,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Send,
  CheckCircle,
  ChevronRight,
  Rocket,
  Gem,
  Crown,
  BookOpen,
  Music,
  Coffee,
  Diamond,
} from "lucide-react";
import PageHero from "../../components/ui/PageHero";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/animations/Reveal";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

const freeServices = [
  {
    icon: Star,
    title: "Free Kundali",
    desc: "Generate your detailed Janam Kundli instantly with planetary positions, houses, and doshas.",
    href: "/free-kundali",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Heart,
    title: "Love Calculator",
    desc: "Check your love compatibility percentage with your partner using name and birth details.",
    href: "/love-calculator",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Users,
    title: "Friendship Calculator",
    desc: "Discover the strength of your bond with friends through numerology and astrology.",
    href: "/friendship-calculator",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Calculator,
    title: "Numerology Calculator",
    desc: "Find your Destiny, Personality, and Soul numbers based on your name and birth date.",
    href: "/numerology-calculator",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Moon,
    title: "Mulank Calculator",
    desc: "Calculate your Mulank number by date of birth and discover your natural personality.",
    href: "/mulank-calculator",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Star,
    title: "Destiny Number",
    desc: "Uncover your life's purpose and spiritual path with your destiny number.",
    href: "/destiny-number",
    color: "from-yellow-500 to-amber-500",
  },
  {
    icon: Calendar,
    title: "Age Calculator",
    desc: "Find your exact age in years, months, days, hours, and minutes with cosmic insights.",
    href: "/age-calculator",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Compass,
    title: "Sade Sati Calculator",
    desc: "Check if Saturn's 7.5-year cycle is affecting your life with detailed insights.",
    href: "/sade-sati",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Shield,
    title: "Kaal Sarp Dosh",
    desc: "Check if all planets are caught between Rahu and Ketu in your birth chart.",
    href: "/kaal-sarp-dosh",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Calendar,
    title: "Today Panchang",
    desc: "Get daily cosmic energy updates with Tithi, Nakshatra, Yoga, and auspicious timings.",
    href: "/today-panchang",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Calendar,
    title: "Tomorrow Panchang",
    desc: "Plan ahead with tomorrow's panchang and astrological guidance.",
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
    icon: Heart,
    title: "Kundali Matching",
    desc: "Check marriage compatibility with detailed Guna Milan and Mangal Dosha analysis.",
    href: "/kundali-matching",
    color: "from-pink-500 to-purple-500",
  },
  {
    icon: Star,
    title: "Zodiac Compatibility",
    desc: "Discover your love compatibility based on zodiac signs and cosmic alignment.",
    href: "/compatibility",
    color: "from-violet-500 to-purple-500",
  },
];

const features = [
  {
    icon: Shield,
    title: "100% Free",
    desc: "All our calculators and tools are completely free to use with no hidden charges.",
  },
  {
    icon: Sparkles,
    title: "Accurate Results",
    desc: "Based on authentic Vedic astrology and numerology principles for reliable insights.",
  },
  {
    icon: Clock,
    title: "Instant Access",
    desc: "Get your results immediately after entering your details - no waiting time.",
  },
  {
    icon: Shield,
    title: "Privacy Assured",
    desc: "Your personal information and birth details are kept completely confidential.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    quote:
      "The free kundali generator gave me amazing insights about my life path. Highly recommended!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    quote:
      "The love calculator was so accurate! It perfectly described my relationship compatibility.",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    quote:
      "I use the panchang daily for planning important events. It's been incredibly helpful.",
    rating: 4,
  },
];

export default function FreeServices() {
  return (
    <>
      <PageHero
        badge="Free Services"
        title={
          <>
            Explore Free <span className="gradient-text">Astrology Tools</span>
          </>
        }
        subtitle="Access a wide range of free astrology calculators and tools to discover your cosmic path."
      />

      {/* Services Grid */}
      <section className="section-pad bg-white">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Free Tools"
              title="All Calculators & Tools"
              subtitle="Choose from our collection of free astrology and numerology tools"
            />
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeServices.map((service, i) => (
              <Reveal key={service.title} delay={(i % 3) * 0.08}>
                <div className="group h-full bg-ink-50 rounded-2xl p-7 border border-ink-100 hover:border-accent-300 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${service.color} w-fit mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform`}
                  >
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  <Button to={service.href} variant="outline" size="sm">
                    Try Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-pad bg-ink-50">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Why Choose Us"
              title="Why Use Our Free Tools?"
              subtitle="Get accurate astrological insights with complete privacy"
            />
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-ink-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-ink-500">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad bg-white">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Testimonials"
              title="What Our Users Say"
              subtitle="Real stories from people who used our free services"
            />
          </Reveal>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-accent-500 text-accent-500"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-ink-600 italic">"{t.quote}"</p>
                  <p className="mt-3 font-semibold text-ink-900">{t.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-ink-50">
        <div className="container-8xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="p-3 rounded-xl bg-white w-fit mx-auto mb-2 shadow-sm">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div className="text-lg font-bold text-ink-900">500K+</div>
              <div className="text-xs text-ink-500">Users Served</div>
            </div>
            <div className="text-center">
              <div className="p-3 rounded-xl bg-white w-fit mx-auto mb-2 shadow-sm">
                <Star className="h-6 w-6 text-accent-600" />
              </div>
              <div className="text-lg font-bold text-ink-900">15+</div>
              <div className="text-xs text-ink-500">Free Tools</div>
            </div>
            <div className="text-center">
              <div className="p-3 rounded-xl bg-white w-fit mx-auto mb-2 shadow-sm">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-lg font-bold text-ink-900">24/7</div>
              <div className="text-xs text-ink-500">Available</div>
            </div>
            <div className="text-center">
              <div className="p-3 rounded-xl bg-white w-fit mx-auto mb-2 shadow-sm">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-lg font-bold text-ink-900">4.8+</div>
              <div className="text-xs text-ink-500">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ink-950 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-500/10 blur-[120px] rounded-full" />
        <div className="relative container-8xl text-center">
          <Reveal>
            <Badge variant="dark" className="mb-4">
              <Sparkles className="h-3 w-3" />
              Start Exploring
            </Badge>
            <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">
              Ready to discover your{" "}
              <span className="gradient-text-light">cosmic path?</span>
            </h2>
            <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
              Explore all our free astrology tools and start your journey of
              self-discovery today.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Button to="/free-kundali" variant="primary" size="lg">
                <Star className="h-4 w-4" />
                Start with Free Kundali
              </Button>
              <Button to="/consultations" variant="dark" size="lg">
                <MessageSquare className="h-4 w-4" />
                Consult an Astrologer
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
