import { Shield, Lock, Eye, Trash2, Mail, Star, Users, Clock, Sparkles } from 'lucide-react';
import PageHero from '../../components/ui/PageHero';
import Reveal from '../../components/animations/Reveal';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const sections = [
  {
    icon: Eye,
    title: 'Information We Collect',
    content: [
      'We collect information that you provide directly to us when you create an account, including your name, email address, and birth details for astrology calculations.',
      'We also collect information automatically when you use our services, including birth date, time, place, and usage analytics to improve our tools.',
      'For consultation services, we collect additional details about your concerns, questions, and preferences to provide personalized guidance.',
      'We do not store sensitive financial information â€” all payment processing is handled through secure third-party gateways.',
    ],
  },
  {
    icon: Lock,
    title: 'How We Use Your Information',
    content: [
      'To provide and maintain our astrology services, including Kundali generation, numerology calculations, and compatibility analysis.',
      'To deliver personalized insights and predictions based on your birth details and astrological profile.',
      'To communicate with you about your consultations, account updates, and new astrology tools.',
      'To improve our algorithms and tools by analyzing usage patterns and feedback.',
      'To detect and prevent fraudulent activity and ensure the security of our platform.',
    ],
  },
  {
    icon: Shield,
    title: 'Data Security & Privacy',
    content: [
      'Your birth details and personal information are encrypted and stored securely.',
      'We use industry-standard encryption for data at rest and in transit.',
      'Access to personal data is restricted and only available to authorized team members.',
      'We do not share your personal information with third parties without your explicit consent.',
      'All astrologers are bound by strict confidentiality agreements.',
    ],
  },
  {
    icon: Eye,
    title: 'Information Sharing',
    content: [
      'We share your birth details with astrologers only when you book a consultation.',
      'We do not sell, rent, or trade your personal information to third parties for marketing purposes.',
      'We may share anonymized, aggregated data for research and analysis purposes.',
      'We comply with legal requirements and may share information when required by law.',
    ],
  },
  {
    icon: Trash2,
    title: 'Data Retention & Deletion',
    content: [
      'We retain your personal data for as long as your account is active or as needed to provide our services.',
      'You can request deletion of your account and personal data at any time.',
      'Upon account deletion, we will remove your personal data within 30 days.',
      'Anonymized data used for improving our algorithms may be retained.',
    ],
  },
  {
    icon: Mail,
    title: 'Your Rights',
    content: [
      'You have the right to access, correct, or delete your personal data at any time.',
      'You have the right to know what data we collect and how we use it.',
      'You have the right to withdraw consent for data processing at any time.',
      'You have the right to request a copy of your data in a readable format.',
      'To exercise any of these rights, contact us at support@jyotishai.com.',
    ],
  },
];

export default function Privacy() {
  return (
    <>
      <PageHero
        badge="Privacy Policy"
        title={<>Your privacy is <span className="gradient-text">our priority</span></>}
        subtitle="We are committed to protecting your personal data and being transparent about how we use it."
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
              This Privacy Policy explains how Jyotish AI ("we", "us", or "our") collects,
              uses, discloses, and safeguards your information when you use our astrology
              platform and services. We are committed to protecting your privacy and ensuring
              that your personal and astrological data is handled with the utmost care.
            </p>
          </Reveal>

          <div className="space-y-12">
            {sections.map((section, i) => (
              <Reveal key={section.title} delay={i * 0.05}>
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
                <div className="text-sm font-bold text-ink-900">100% Private</div>
                <div className="text-xs text-ink-500">Your data is secure</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-ink-50 border border-ink-100">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto mb-2">
                  <Lock className="h-5 w-5 text-white" />
                </div>
                <div className="text-sm font-bold text-ink-900">Encrypted</div>
                <div className="text-xs text-ink-500">End-to-end encryption</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-ink-50 border border-ink-100">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto mb-2">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div className="text-sm font-bold text-ink-900">Confidential</div>
                <div className="text-xs text-ink-500">Astrologer bound by NDA</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-ink-50 border border-ink-100">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto mb-2">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div className="text-sm font-bold text-ink-900">24/7 Support</div>
                <div className="text-xs text-ink-500">Privacy questions answered</div>
              </div>
            </div>
          </Reveal>

          {/* Contact Section */}
          <Reveal>
            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100">
              <h2 className="text-xl font-bold text-ink-900 mb-3">Contact Us</h2>
              <p className="text-ink-600 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-1 text-sm text-ink-700">
                <p><strong>Email:</strong> support@jyotishai.com</p>
                <p><strong>Address:</strong> Noida, Uttar Pradesh, India</p>
              </div>
              <div className="mt-4">
                <Button to="/contact" variant="outline" size="sm">
                  Contact Privacy Team
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
              Trust & Transparency
            </Badge>
            <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">
              Your privacy is <span className="gradient-text-light">our commitment</span>
            </h2>
            <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
              Start your cosmic journey with confidence. Your data is safe, secure, and private.
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