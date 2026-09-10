import { Target, Eye, Heart, Users, TrendingUp, Globe, Award, Zap, Star, Moon, Sun, Compass, Sparkles, Shield, Crown, BookOpen, MessageSquare } from 'lucide-react';
import PageHero from '../../components/ui/PageHero';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal from '../../components/animations/Reveal';
import Counter from '../../components/animations/Counter';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const values = [
  { icon: Heart, title: 'Authentic Wisdom', desc: 'We deliver genuine Vedic astrology and numerology insights rooted in ancient traditions.' },
  { icon: Star, title: 'Accuracy First', desc: 'Our calculations are rigorously tested by expert astrologers for precision and reliability.' },
  { icon: Shield, title: 'Privacy & Trust', desc: 'Your personal data and birth details are kept completely confidential and secure.' },
  { icon: Users, title: 'Accessible for All', desc: 'We make astrology simple, understandable, and accessible to everyone â€” free of charge.' },
];

const team = [
  { 
    name: 'Pt. Rajesh Sharma', 
    role: 'Chief Astrologer', 
    bio: '25+ years of experience in Vedic astrology, specializing in birth charts, marriage compatibility, and remedial solutions.' 
  },
  { 
    name: 'Dr. Priya Singh', 
    role: 'Head of Numerology', 
    bio: 'PhD in Vedic Mathematics with 18+ years of experience in numerology, tarot, and spiritual counseling.' 
  },
  { 
    name: 'Prof. Amit Kumar', 
    role: 'Senior Astrologer', 
    bio: '20+ years of practice in marriage compatibility, kundli matching, and relationship astrology.' 
  },
  { 
    name: 'Maa Shanti Devi', 
    role: 'Spiritual Guide', 
    bio: '30+ years of experience in Vedic rituals, poojas, remedies, and spiritual healing practices.' 
  },
];

const milestones = [
  { year: '2020', event: 'Jyotish AI founded with a vision to make Vedic astrology accessible to everyone.' },
  { year: '2021', event: 'Launched free Kundali generator, serving 50K+ users in the first year.' },
  { year: '2022', event: 'Expanded to 10+ free astrology tools including Love Calculator and Panchang.' },
  { year: '2023', event: 'Reached 500K+ users and added expert astrologer consultation services.' },
  { year: '2024', event: 'Launched advanced calculators including Sade Sati and Kaal Sarp Dosh tools.' },
  { year: '2025', event: 'Crossed 1M+ users with 15+ free astrology and numerology calculators.' },
];

export default function About() {
  return (
    <>
      <PageHero
        badge="About Us"
        title={<>Bringing <span className="gradient-text">Vedic Wisdom</span> to Everyone</>}
        subtitle="We're on a mission to make authentic Vedic astrology and numerology accessible, understandable, and free for all."
      />

      {/* Mission & Vision */}
      <section className="section-pad bg-white">
        <div className="container-8xl grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="h-full rounded-3xl p-10 bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100">
              <div className="p-3 rounded-xl bg-primary-600 w-fit mb-6">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-ink-900 mb-4">Our Mission</h3>
              <p className="text-ink-600 leading-relaxed">
                To democratize Vedic wisdom by giving everyone â€” regardless of their background â€” 
                access to accurate, authentic, and easy-to-understand astrology and numerology tools. 
                We believe that cosmic guidance should be free, private, and empowering.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl p-10 bg-gradient-to-br from-accent-50 to-primary-50 border border-accent-100">
              <div className="p-3 rounded-xl bg-accent-500 w-fit mb-6">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-ink-900 mb-4">Our Vision</h3>
              <p className="text-ink-600 leading-relaxed">
                A world where every person can understand their cosmic blueprint and use that 
                knowledge to navigate life with clarity, confidence, and purpose â€” all through 
                technology that makes ancient wisdom modern and accessible.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent-500/10 blur-[130px] rounded-full" />
        <div className="relative container-8xl grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: 1, suffix: 'M+', label: 'Users Served', decimals: 0 },
            { value: 15, suffix: '+', label: 'Free Tools', decimals: 0 },
            { value: 500, suffix: '+', label: 'Expert Astrologers', decimals: 0 },
            { value: 4.8, suffix: '+', label: 'Average Rating', decimals: 1 },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold gradient-text-light">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </div>
                <div className="mt-2 text-sm text-ink-300 font-medium">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-ink-50">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Our Values"
              title="What drives us forward"
              subtitle="The principles that guide every tool we build and every insight we share."
            />
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="group h-full bg-white rounded-2xl p-8 border border-ink-100 hover:border-accent-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-5 group-hover:scale-110 transition-transform">
                    <v.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-white">
        <div className="container-8xl max-w-3xl">
          <Reveal>
            <SectionHeading
              badge="Our Journey"
              title="From vision to reality"
              subtitle="Key milestones in our mission to make astrology accessible to everyone."
            />
          </Reveal>
          <div className="mt-16 space-y-0">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.1}>
                <div className="flex gap-6 pb-12 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {m.year}
                    </div>
                    {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-ink-200 mt-4" />}
                  </div>
                  <div className="pt-3">
                    <p className="text-ink-700 leading-relaxed">{m.event}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad bg-ink-50">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Our Team"
              title="Expert astrologers & guides"
              subtitle="Decades of combined experience in Vedic astrology, numerology, and spiritual guidance."
            />
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.1}>
                <div className="group text-center bg-white rounded-2xl p-8 border border-ink-100 hover:shadow-xl transition-all duration-300">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 mx-auto mb-5 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                    {member.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <h3 className="text-lg font-bold text-ink-900">{member.name}</h3>
                  <p className="text-sm text-primary-600 font-medium mt-1">{member.role}</p>
                  <p className="text-sm text-ink-500 mt-3 leading-relaxed">{member.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-pad bg-white">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Why Jyotish AI"
              title="What makes us different"
              subtitle="Our commitment to authenticity, accuracy, and accessibility sets us apart."
            />
          </Reveal>
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Reveal delay={0.1}>
              <div className="text-center p-6 rounded-2xl bg-ink-50 border border-ink-100 hover:border-accent-200 transition-all">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-ink-900">100% Free</h3>
                <p className="text-sm text-ink-500">All our calculators and tools are completely free to use with no hidden charges.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="text-center p-6 rounded-2xl bg-ink-50 border border-ink-100 hover:border-accent-200 transition-all">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto mb-4">
                  <Compass className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-ink-900">Authentic Wisdom</h3>
                <p className="text-sm text-ink-500">Based on genuine Vedic astrology and numerology principles trusted for centuries.</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="text-center p-6 rounded-2xl bg-ink-50 border border-ink-100 hover:border-accent-200 transition-all">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-ink-900">Privacy Assured</h3>
                <p className="text-sm text-ink-500">Your personal information and birth details are kept completely confidential.</p>
              </div>
            </Reveal>
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
              Explore our free astrology tools and start your journey of self-discovery today.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Button to="/free-kundali" variant="primary" size="lg">
                <Star className="h-4 w-4" />
                Generate Free Kundali
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