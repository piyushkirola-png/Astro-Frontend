import { FileText, CreditCard, Shield, Scale, AlertTriangle, Mail, Star, Users, Clock, Sparkles, Heart, Compass, Lock } from 'lucide-react';
import PageHero from '../../components/ui/PageHero';
import Reveal from '../../components/animations/Reveal';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const sections = [
  {
    icon: FileText,
    title: '1. Acceptance of Terms',
    content: [
      'By accessing or using Jyotish AI\'s astrology platform ("Service"), you agree to be bound by these Terms of Service ("Terms").',
      'If you do not agree to these Terms, you must not access or use the Service.',
      'These Terms apply to all visitors, users, and others who access or use the Service.',
      'We may revise these Terms at any time. Continued use of the Service after changes constitutes acceptance of the updated Terms.',
    ],
  },
  {
    icon: Star,
    title: '2. Service Description',
    content: [
      'Jyotish AI provides a comprehensive astrology platform offering free Kundali generation, numerology calculators, compatibility tools, and expert astrologer consultations.',
      'Our services include birth chart analysis, love compatibility, horoscope readings, panchang, and personalized astrological guidance.',
      'We provide tools for self-discovery through Vedic astrology, numerology, and spiritual guidance.',
      'Consultations are conducted by certified astrologers who provide personalized insights based on your birth details.',
    ],
  },
  {
    icon: Shield,
    title: '3. Account Registration',
    content: [
      'You must provide accurate, complete, and current information during the registration process.',
      'You are responsible for maintaining the security of your account credentials.',
      'You must be at least 13 years old to use our services. Users under 18 must have parental consent.',
      'We reserve the right to refuse or terminate accounts that violate our policies.',
    ],
  },
  {
    icon: CreditCard,
    title: '4. Services & Fees',
    content: [
      'Our core astrology tools including Kundali generation, numerology calculators, and panchang are completely free to use.',
      'Consultation services with expert astrologers may have fees as displayed on the consultation page.',
      'All fees are clearly displayed before you book any paid service.',
      'You are responsible for all applicable taxes associated with your use of the Service.',
    ],
  },
  {
    icon: Scale,
    title: '5. Acceptable Use',
    content: [
      'You must not use the Service for illegal activities, harassment, or any form of abuse.',
      'You must not impersonate others or provide false information.',
      'You must not attempt to reverse engineer, decompile, or disassemble any part of the Service.',
      'You must not use the Service to spread misinformation or harmful content.',
      'You must respect the privacy and confidentiality of consultations with our astrologers.',
    ],
  },
  {
    icon: Heart,
    title: '6. Intellectual Property',
    content: [
      'The Service, including its design, code, content, and branding, is owned by Jyotish AI and protected by intellectual property laws.',
      'You may not copy, modify, distribute, or create derivative works of the Service without our written permission.',
      'All trademarks, service marks, and logos are the property of their respective owners.',
      'Astrological content and insights provided through consultations are for personal use only.',
    ],
  },
  {
    icon: AlertTriangle,
    title: '7. Disclaimer',
    content: [
      'Astrological predictions and insights are for guidance and entertainment purposes only.',
      'Results and predictions are not guaranteed and should not replace professional advice in legal, financial, or medical matters.',
      'The Service is provided "as is" and "as available" without warranties of any kind.',
      'We are not liable for any decisions made based on the astrological guidance provided.',
      'You are solely responsible for your life decisions and actions.',
    ],
  },
  {
    icon: FileText,
    title: '8. Termination',
    content: [
      'You may terminate your account at any time by contacting us.',
      'We may suspend or terminate your account if you violate these Terms or our policies.',
      'We may terminate your account immediately if we suspect fraudulent activity or abuse.',
      'Upon termination, you remain responsible for any fees incurred prior to termination.',
      'Provisions relating to liability, intellectual property, and dispute resolution survive termination.',
    ],
  },
  {
    icon: Compass,
    title: '9. Dispute Resolution',
    content: [
      'Any disputes arising from these Terms shall first be resolved through good-faith negotiation.',
      'If negotiation fails, disputes shall be resolved through binding arbitration in Noida, UP, India.',
      'These Terms are governed by the laws of India, without regard to conflict of law principles.',
      'You waive the right to participate in class action lawsuits or class-wide arbitration.',
    ],
  },
  {
    icon: Mail,
    title: '10. Contact Information',
    content: [
      'For legal notices, send to: Jyotish AI, Noida, Uttar Pradesh, India.',
      'For support inquiries, contact support@jyotishai.com.',
      'For privacy questions, contact privacy@jyotishai.com.',
    ],
  },
];

export default function Terms() {
  return (
    <>
      <PageHero
        badge="Terms of Service"
        title={<>The rules of <span className="gradient-text">our relationship</span></>}
        subtitle="These Terms govern your use of Jyotish AI's astrology platform. Please read them carefully."
      />

      <section className="section-pad bg-white">
        <div className="container-8xl max-w-4xl">
          <Reveal>
            <div className="p-6 rounded-2xl bg-ink-50 border border-ink-100 mb-12">
              <p className="text-sm text-ink-500">
                <strong className="text-ink-700">Last updated:</strong> January 1, 2026<br />
                <strong className="text-ink-700">Effective date:</strong> January 1, 2026
              </p>
            </div>
          </Reveal>

          <Reveal>
            <p className="text-lg text-ink-600 leading-relaxed mb-12">
              Welcome to Jyotish AI. These Terms of Service ("Terms") govern your access to and use of
              Jyotish AI's astrology platform, website, and services. By using our services,
              you agree to these Terms. If you do not agree, you may not use our services.
            </p>
          </Reveal>

          <div className="space-y-12">
            {sections.map((section, i) => (
              <Reveal key={section.title} delay={i * 0.03}>
                <div className="border-l-4 border-accent-500 pl-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500">
                      <section.icon className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-ink-900">{section.title}</h2>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, j) => (
                      <li key={j} className="text-ink-600 leading-relaxed flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-500 shrink-0 mt-2.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Trust Badges */}
          <Reveal delay={0.3}>
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-2xl bg-ink-50 border border-ink-100">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto mb-2">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="text-sm font-bold text-ink-900">Secure</div>
                <div className="text-xs text-ink-500">Your data is protected</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-ink-50 border border-ink-100">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto mb-2">
                  <Lock className="h-5 w-5 text-white" />
                </div>
                <div className="text-sm font-bold text-ink-900">Private</div>
                <div className="text-xs text-ink-500">Confidential consultations</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-ink-50 border border-ink-100">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto mb-2">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div className="text-sm font-bold text-ink-900">Trusted</div>
                <div className="text-xs text-ink-500">1M+ users served</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-ink-50 border border-ink-100">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto mb-2">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div className="text-sm font-bold text-ink-900">24/7</div>
                <div className="text-xs text-ink-500">Support available</div>
              </div>
            </div>
          </Reveal>

          {/* Contact Section */}
          <Reveal>
            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100">
              <h2 className="text-xl font-bold text-ink-900 mb-3">Questions about these Terms?</h2>
              <p className="text-ink-600 leading-relaxed mb-4">
                If you have questions about these Terms of Service, please contact our team:
              </p>
              <div className="space-y-1 text-sm text-ink-700">
                <p><strong>Email:</strong> support@jyotishai.com</p>
                <p><strong>Address:</strong> Noida, Uttar Pradesh, India</p>
              </div>
              <div className="mt-4">
                <Button to="/contact" variant="outline" size="sm">
                  Contact Support
                </Button>
              </div>
            </div>
          </Reveal>
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
              Experience the wisdom of Vedic astrology with our free tools and expert consultations.
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