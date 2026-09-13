import {
  Zap,
  ShieldCheck,
  ArrowLeftRight,
  Globe,
  Users,
  Code2,
  TrendingUp,
  Clock,
  Headphones,
  Award,
  Star,
  Heart,
  Moon,
  Sun,
  Compass,
  Sparkles,
} from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/animations/Reveal";
import Counter from "../components/animations/Counter";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

const advantages = [
  {
    icon: Star,
    title: "500+ Expert Astrologers",
    desc: "Connect with certified and experienced astrologers specializing in Vedic astrology, numerology, tarot, and more.",
  },
  {
    icon: Heart,
    title: "Personalized Guidance",
    desc: "Get customized insights and remedies based on your unique birth chart and life situation.",
  },
  {
    icon: ShieldCheck,
    title: "100% Private & Confidential",
    desc: "Your personal details and astrological information are kept completely secure and private.",
  },
  {
    icon: Globe,
    title: "24/7 Availability",
    desc: "Connect with astrologers anytime, anywhere â€” day or night, from any location.",
  },
  {
    icon: Users,
    title: "1M+ Happy Users",
    desc: "Trusted by millions who have found clarity and direction through our astrological guidance.",
  },
  {
    icon: Sparkles,
    title: "Free Tools & Calculators",
    desc: "Access 15+ free astrology tools including Kundali, Love Calculator, Panchang, and more.",
  },
  {
    icon: Clock,
    title: "Instant Consultations",
    desc: "Get answers to your questions in minutes through chat, phone, or video consultations.",
  },
  {
    icon: TrendingUp,
    title: "Accurate Predictions",
    desc: "Based on authentic Vedic astrology principles and tested by expert astrologers.",
  },
  {
    icon: Headphones,
    title: "Multiple Languages",
    desc: "Consult in English, Hindi, Kannada, and other regional languages for better understanding.",
  },
  {
    icon: Award,
    title: "Trusted Platform",
    desc: "4.8+ average rating from thousands of satisfied users across India and worldwide.",
  },
];

const comparison = [
  { feature: "Expert Astrologers", Jyotish: true, others: false },
  { feature: "Free Kundali Generation", Jyotish: true, others: false },
  { feature: "Multiple Consultation Modes", Jyotish: true, others: false },
  { feature: "Numerology Calculators", Jyotish: true, others: false },
  { feature: "Panchang & Muhurat", Jyotish: true, others: false },
  { feature: "24/7 Availability", Jyotish: true, others: false },
  { feature: "Privacy Assured", Jyotish: true, others: false },
  { feature: "Love Compatibility Tools", Jyotish: true, others: true },
  { feature: "15+ Free Tools", Jyotish: true, others: false },
  { feature: "Expert Remedies", Jyotish: true, others: false },
];

const categories = [
  {
    icon: Sun,
    title: "Vedic Astrology",
    desc: "Traditional Indian astrology based on planetary positions and birth charts.",
  },
  {
    icon: Moon,
    title: "Numerology",
    desc: "Understand your life path through the power of numbers and vibrations.",
  },
  {
    icon: Heart,
    title: "Love & Compatibility",
    desc: "Find harmony in relationships through astrological matching.",
  },
  {
    icon: Compass,
    title: "Career & Finance",
    desc: "Navigate your professional journey with cosmic guidance.",
  },
  {
    icon: Star,
    title: "Remedies & Pooja",
    desc: "Get personalized remedies for life's challenges and spiritual growth.",
  },
  {
    icon: Sparkles,
    title: "Kundali & Horoscope",
    desc: "Deep insights into your birth chart and life's journey.",
  },
];

export default function WhyAstrologer() {
  return (
    <>
      <PageHero
        badge="Why Jyotish AI"
        title={
          <>
            Why choose <span className="gradient-text">Jyotish AI</span> for
            astrological guidance?
          </>
        }
        subtitle="Trusted by millions, we bring authentic Vedic wisdom to your fingertips with expert astrologers and free tools."
      />

      {/* Advantages */}
      <section className="section-pad bg-white">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Our Advantages"
              title="10 reasons to trust Jyotish AI"
              subtitle="From expert astrologers to free tools â€” we give you everything you need for your cosmic journey."
            />
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, i) => (
              <Reveal key={adv.title} delay={(i % 3) * 0.08}>
                <div className="group h-full bg-ink-50 rounded-2xl p-8 border border-ink-100 hover:border-accent-300 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-5 group-hover:scale-110 transition-transform">
                    <adv.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-2">
                    {adv.title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent-500/10 blur-[130px] rounded-full" />
        <div className="relative container-8xl grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: 1, suffix: "M+", label: "Happy Users", decimals: 0 },
            { value: 500, suffix: "+", label: "Expert Astrologers" },
            { value: 4.8, suffix: "+", label: "Average Rating", decimals: 1 },
            { value: 15, suffix: "+", label: "Free Tools" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold gradient-text-light">
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                  />
                </div>
                <div className="mt-2 text-sm text-ink-300 font-medium">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section-pad bg-ink-50">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Our Expertise"
              title="What we offer"
              subtitle="Comprehensive astrological services for every aspect of your life"
            />
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.1}>
                <div className="group h-full bg-white rounded-2xl p-8 border border-ink-100 hover:border-accent-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-5 group-hover:scale-110 transition-transform">
                    <cat.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-pad bg-white">
        <div className="container-8xl max-w-4xl">
          <Reveal>
            <SectionHeading
              badge="Comparison"
              title="Jyotish AI vs. Others"
              subtitle="See how we stack up against other astrology platforms."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 bg-white rounded-2xl border border-ink-100 overflow-hidden">
              <div className="grid grid-cols-3 px-6 py-4 bg-ink-50 border-b border-ink-100">
                <div className="text-sm font-semibold text-ink-700">
                  Feature
                </div>
                <div className="text-center text-sm font-bold text-primary-700">
                  Jyotish AI
                </div>
                <div className="text-center text-sm font-semibold text-ink-500">
                  Others
                </div>
              </div>
              {comparison.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 px-6 py-4 items-center ${i % 2 === 0 ? "bg-white" : "bg-ink-50/50"}`}
                >
                  <div className="text-sm text-ink-700">{row.feature}</div>
                  <div className="text-center">
                    {row.Jyotish ? (
                      <span className="inline-flex h-6 w-6 rounded-full bg-accent-100 items-center justify-center">
                        <span className="h-3 w-3 rounded-full bg-accent-500" />
                      </span>
                    ) : (
                      <span className="text-ink-300">â€”</span>
                    )}
                  </div>
                  <div className="text-center">
                    {row.others ? (
                      <span className="inline-flex h-6 w-6 rounded-full bg-ink-100 items-center justify-center">
                        <span className="h-3 w-3 rounded-full bg-ink-400" />
                      </span>
                    ) : (
                      <span className="text-ink-300">â€”</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad bg-ink-50">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Testimonials"
              title="What our users say"
              subtitle="Real stories from people who found clarity through Jyotish AI"
            />
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                quote:
                  "The free Kundali tool gave me amazing insights about my life path. The astrologers are truly knowledgeable.",
                rating: 5,
              },
              {
                name: "Rahul Verma",
                quote:
                  "I found clarity in my career decisions through Jyotish AI. The consultations are affordable and accurate.",
                rating: 5,
              },
              {
                name: "Ananya Patel",
                quote:
                  "The love calculator and compatibility tools helped me understand my relationship better. Highly recommended!",
                rating: 4,
              },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
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

      {/* CTA */}
      <section className="py-20 bg-ink-950 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-500/10 blur-[120px] rounded-full" />
        <div className="relative container-8xl text-center">
          <Reveal>
            <Badge variant="dark" className="mb-4">
              <Sparkles className="h-3 w-3" />
              Start Your Journey
            </Badge>
            <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">
              Ready to discover your{" "}
              <span className="gradient-text-light">cosmic path?</span>
            </h2>
            <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
              Join millions who have found clarity, purpose, and direction with
              Jyotish AI.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/free-kundali" variant="primary" size="lg">
                <Star className="h-4 w-4" />
                Get Free Kundali
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
