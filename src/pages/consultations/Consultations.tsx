import {
  Star,
  Users,
  MessageCircle,
  Phone,
  Video,
  Calendar,
  Clock,
  Sparkles,
  Heart,
  Award,
  Shield,
  CheckCircle,
  ArrowRight,
  User,
  TrendingUp,
  Activity,
  Home,
  Briefcase,
  Baby,
  Moon,
  Sun
} from 'lucide-react';
import PageHero from '../../components/ui/PageHero';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal from '../../components/animations/Reveal';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const consultationTypes = [
  { 
    icon: MessageCircle, 
    title: 'Chat Consultation', 
    desc: 'Get instant answers to your questions through our real-time chat with expert astrologers.',
    href: '/consultations/chat',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    icon: Phone, 
    title: 'Phone Consultation', 
    desc: 'Speak directly with an astrologer over the phone for personalized guidance and clarity.',
    href: '/consultations/phone',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    icon: Video, 
    title: 'Video Consultation', 
    desc: 'Face-to-face virtual sessions with astrologers for a deeper, more personal connection.',
    href: '/consultations/video',
    color: 'from-purple-500 to-indigo-500'
  },
];

const astrologers = [
  { name: 'Pt. Rajesh Sharma', expertise: 'Vedic Astrology', experience: '25+ years', rating: 4.9, image: 'R' },
  { name: 'Dr. Priya Singh', expertise: 'Numerology & Tarot', experience: '18+ years', rating: 4.8, image: 'P' },
  { name: 'Prof. Amit Kumar', expertise: 'Marriage Compatibility', experience: '20+ years', rating: 4.7, image: 'A' },
  { name: 'Maa Shanti Devi', expertise: 'Remedies & Pooja', experience: '30+ years', rating: 4.9, image: 'S' },
];

const topics = [
  { icon: Heart, title: 'Love & Relationships', desc: 'Find clarity in matters of the heart.' },
  { icon: Briefcase, title: 'Career & Finance', desc: 'Navigate your professional journey.' },
  { icon: Baby, title: 'Marriage & Children', desc: 'Guidance for family life.' },
  { icon: Activity, title: 'Health & Wellness', desc: 'Understand your well-being.' },
  { icon: Home, title: 'Vastu & Property', desc: 'Harmonize your living space.' },
  { icon: TrendingUp, title: 'Kundli & Horoscope', desc: 'Decode your birth chart.' },
];

export default function Consultations() {
  return (
    <>
      <PageHero
        badge="Consult an Astrologer"
        title={<>Connect with <span className="gradient-text">Expert Astrologers</span></>}
        subtitle="Get personalized guidance on love, career, health, and life's most important questions from certified Vedic astrologers."
      />

      {/* Consultation Types */}
      <section className="section-pad bg-white">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Choose Your Mode"
              title="How Would You Like to Connect?"
              subtitle="Select from chat, phone, or video consultation based on your preference"
            />
          </Reveal>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {consultationTypes.map((type, i) => (
              <Reveal key={type.title} delay={i * 0.1}>
                <div className="group h-full bg-ink-50 rounded-2xl p-8 border border-ink-100 hover:border-accent-300 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${type.color} w-fit mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                    <type.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-ink-900 mb-2">{type.title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed mb-4">{type.desc}</p>
                  <Button to={type.href} variant="outline" size="sm">
                    Book Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Astrologers */}
      <section className="section-pad bg-ink-50">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Our Astrologers"
              title="Meet Our Expert Team"
              subtitle="Certified professionals with years of experience in Vedic astrology"
            />
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {astrologers.map((astro, i) => (
              <Reveal key={astro.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-300 hover:shadow-lg transition-all text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3">
                    {astro.image}
                  </div>
                  <h3 className="text-lg font-bold text-ink-900">{astro.name}</h3>
                  <p className="text-sm text-primary-600 font-medium">{astro.expertise}</p>
                  <p className="text-xs text-ink-500">{astro.experience}</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold text-ink-900">{astro.rating}</span>
                  </div>
                  <Button to="/consultations" variant="outline" size="sm" className="mt-4">
                    Consult <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="section-pad bg-white">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Topics"
              title="What Can We Help You With?"
              subtitle="Get expert guidance on any aspect of your life"
            />
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((topic, i) => (
              <Reveal key={topic.title} delay={i * 0.05}>
                <div className="bg-ink-50 rounded-xl p-4 border border-ink-100 hover:border-accent-200 hover:bg-white transition-all flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 shrink-0">
                    <topic.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink-900">{topic.title}</h4>
                    <p className="text-xs text-ink-500">{topic.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-ink-50">
        <div className="container-8xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="p-3 rounded-xl bg-white w-fit mx-auto mb-2 shadow-sm">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div className="text-lg font-bold text-ink-900">500+</div>
              <div className="text-xs text-ink-500">Expert Astrologers</div>
            </div>
            <div className="text-center">
              <div className="p-3 rounded-xl bg-white w-fit mx-auto mb-2 shadow-sm">
                <Clock className="h-6 w-6 text-accent-600" />
              </div>
              <div className="text-lg font-bold text-ink-900">24/7</div>
              <div className="text-xs text-ink-500">Availability</div>
            </div>
            <div className="text-center">
              <div className="p-3 rounded-xl bg-white w-fit mx-auto mb-2 shadow-sm">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-lg font-bold text-ink-900">100%</div>
              <div className="text-xs text-ink-500">Privacy Assured</div>
            </div>
            <div className="text-center">
              <div className="p-3 rounded-xl bg-white w-fit mx-auto mb-2 shadow-sm">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-lg font-bold text-ink-900">4.8+</div>
              <div className="text-xs text-ink-500">Average Rating</div>
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
              Ready to discover your <span className="gradient-text-light">cosmic path?</span>
            </h2>
            <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
              Book a consultation today and get the clarity you need to move forward.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Button to="/consultations/chat" variant="primary" size="lg">
                <MessageCircle className="h-4 w-4" />
                Start Chat
              </Button>
              <Button to="/free-kundali" variant="dark" size="lg">
                <Star className="h-4 w-4" />
                Free Kundali
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}