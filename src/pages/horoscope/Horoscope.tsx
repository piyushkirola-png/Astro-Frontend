import { CheckCircle, ArrowRight, Star, Sun, Moon, Sparkles, Calendar, Clock, Users, TrendingUp, Heart, Briefcase, Activity, Home, Baby } from 'lucide-react';
import PageHero from '../../components/ui/PageHero';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal from '../../components/animations/Reveal';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const horoscopeTypes = [
  { 
    icon: Sun, 
    title: 'Daily Horoscope', 
    desc: 'Get your daily astrological guidance and predictions for the day ahead.',
    href: '/horoscope/daily',
    color: 'from-orange-500 to-yellow-500'
  },
  { 
    icon: Calendar, 
    title: 'Weekly Horoscope', 
    desc: 'Plan your week with cosmic insights and astrological trends.',
    href: '/horoscope/weekly',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    icon: Star, 
    title: 'Monthly Horoscope', 
    desc: 'Deep dive into the month ahead with detailed astrological predictions.',
    href: '/horoscope/monthly',
    color: 'from-purple-500 to-indigo-500'
  },
  { 
    icon: Sparkles, 
    title: 'Yearly Horoscope', 
    desc: 'Get a comprehensive overview of the year ahead with your zodiac sign.',
    href: '/horoscope/yearly',
    color: 'from-pink-500 to-rose-500'
  },
];

const zodiacSigns = [
  { name: 'Aries', dates: 'Mar 21 - Apr 19', emoji: 'â™ˆ', color: 'from-red-500 to-orange-500' },
  { name: 'Taurus', dates: 'Apr 20 - May 20', emoji: 'â™‰', color: 'from-green-500 to-emerald-500' },
  { name: 'Gemini', dates: 'May 21 - Jun 21', emoji: 'â™Š', color: 'from-yellow-500 to-amber-500' },
  { name: 'Cancer', dates: 'Jun 22 - Jul 22', emoji: 'â™‹', color: 'from-blue-400 to-cyan-500' },
  { name: 'Leo', dates: 'Jul 23 - Aug 22', emoji: 'â™Œ', color: 'from-orange-500 to-yellow-500' },
  { name: 'Virgo', dates: 'Aug 23 - Sep 22', emoji: 'â™', color: 'from-green-600 to-lime-500' },
  { name: 'Libra', dates: 'Sep 23 - Oct 23', emoji: 'â™Ž', color: 'from-pink-500 to-rose-500' },
  { name: 'Scorpio', dates: 'Oct 24 - Nov 21', emoji: 'â™', color: 'from-red-600 to-purple-700' },
  { name: 'Sagittarius', dates: 'Nov 22 - Dec 21', emoji: 'â™', color: 'from-purple-500 to-indigo-500' },
  { name: 'Capricorn', dates: 'Dec 22 - Jan 19', emoji: 'â™‘', color: 'from-gray-600 to-slate-700' },
  { name: 'Aquarius', dates: 'Jan 20 - Feb 18', emoji: 'â™’', color: 'from-cyan-500 to-blue-500' },
  { name: 'Pisces', dates: 'Feb 19 - Mar 20', emoji: 'â™“', color: 'from-purple-400 to-pink-400' },
];

const benefits = [
  { icon: Heart, title: 'Relationship Insights', desc: 'Understand your love life and compatibility.' },
  { icon: Briefcase, title: 'Career Guidance', desc: 'Navigate your professional path with clarity.' },
  { icon: TrendingUp, title: 'Financial Outlook', desc: 'Get insights on wealth and prosperity.' },
  { icon: Activity, title: 'Health & Wellness', desc: 'Stay aware of your well-being.' },
  { icon: Home, title: 'Family Harmony', desc: 'Bring peace and balance to family life.' },
  { icon: Baby, title: 'Children & Education', desc: 'Guidance for your children\'s future.' },
];

export default function Horoscope() {
  return (
    <>
      <PageHero
        badge="Horoscopes"
        title={<>Discover Your <span className="gradient-text">Cosmic Path</span></>}
        subtitle="Get personalized astrological guidance with daily, weekly, monthly, and yearly horoscopes."
      />

      {/* Horoscope Types */}
      <section className="section-pad bg-white">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Choose Your Horoscope"
              title="Daily, Weekly, Monthly & Yearly"
              subtitle="Select the horoscope that fits your needs"
            />
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {horoscopeTypes.map((type, i) => (
              <Reveal key={type.title} delay={i * 0.1}>
                <div className="group h-full bg-ink-50 rounded-2xl p-8 border border-ink-100 hover:border-accent-300 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${type.color} w-fit mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                    <type.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-ink-900 mb-2">{type.title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed mb-4">{type.desc}</p>
                  <Button to={type.href} variant="outline" size="sm">
                    Read Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Zodiac Signs */}
      <section className="section-pad bg-ink-50">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Zodiac Signs"
              title="Find Your Sign"
              subtitle="Select your zodiac sign to get personalized horoscope readings"
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {zodiacSigns.map((sign, i) => (
              <Reveal key={sign.name} delay={i * 0.05}>
                <div className="group bg-white rounded-2xl p-4 border border-ink-100 hover:border-accent-300 hover:shadow-lg transition-all text-center">
                  <div className="text-3xl mb-1">{sign.emoji}</div>
                  <h3 className="text-sm font-bold text-ink-900">{sign.name}</h3>
                  <p className="text-xs text-ink-500">{sign.dates}</p>
                  <Button to={`/horoscope/${sign.name.toLowerCase()}`} variant="outline" size="sm" className="mt-3 w-full">
                    View
                  </Button>
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
              title="What Horoscopes Can Do For You"
              subtitle="Gain clarity and insight into every aspect of your life"
            />
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.05}>
                <div className="bg-ink-50 rounded-xl p-4 border border-ink-100 hover:border-accent-200 hover:bg-white transition-all flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 shrink-0">
                    <benefit.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink-900">{benefit.title}</h4>
                    <p className="text-xs text-ink-500">{benefit.desc}</p>
                  </div>
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
              <div className="text-lg font-bold text-ink-900">1M+</div>
              <div className="text-xs text-ink-500">Monthly Users</div>
            </div>
            <div className="text-center">
              <div className="p-3 rounded-xl bg-white w-fit mx-auto mb-2 shadow-sm">
                <Star className="h-6 w-6 text-accent-600" />
              </div>
              <div className="text-lg font-bold text-ink-900">4.8+</div>
              <div className="text-xs text-ink-500">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="p-3 rounded-xl bg-white w-fit mx-auto mb-2 shadow-sm">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-lg font-bold text-ink-900">24/7</div>
              <div className="text-xs text-ink-500">Daily Updates</div>
            </div>
            <div className="text-center">
              <div className="p-3 rounded-xl bg-white w-fit mx-auto mb-2 shadow-sm">
                <Moon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-lg font-bold text-ink-900">12</div>
              <div className="text-xs text-ink-500">Zodiac Signs</div>
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
              Start Your Journey
            </Badge>
            <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">
              Ready to explore your <span className="gradient-text-light">cosmic path?</span>
            </h2>
            <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
              Get your personalized horoscope today and discover what the stars have in store for you.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Button to="/horoscope/daily" variant="primary" size="lg">
                <Star className="h-4 w-4" />
                Read Daily Horoscope
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