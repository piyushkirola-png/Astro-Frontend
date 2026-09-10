import { Link } from 'react-router-dom';
import {
  Linkedin,
  Mail,
  Twitter,
  Youtube,
  Instagram,
  Star,
  Sparkles,
  Moon,
  Sun
} from 'lucide-react';

const footerLinks = {
  Services: [
    { label: 'Consultations', href: '/consultations' },
    { label: 'Free Kundali', href: '/free-kundali' },
    { label: 'Horoscope', href: '/horoscope' },
    { label: 'Panchang', href: '/panchang' },
    { label: 'Kundali Matching', href: '/kundali-matching' },
    { label: 'Compatibility', href: '/compatibility' },
  ],
  Calculators: [
    { label: 'Love Calculator', href: '/love-calculator' },
    { label: 'Numerology Calculator', href: '/numerology-calculator' },
    { label: 'Friendship Calculator', href: '/friendship-calculator' },
    { label: 'Mulank Calculator', href: '/mulank-calculator' },
    { label: 'Destiny Number', href: '/destiny-number' },
    { label: 'Age Calculator', href: '/age-calculator' },
  ],
  'Astrology Tools': [
    { label: 'Sade Sati', href: '/sade-sati' },
    { label: 'Kaal Sarp Dosh', href: '/kaal-sarp-dosh' },
    { label: 'Today Panchang', href: '/today-panchang' },
    { label: 'Tomorrow Panchang', href: '/tomorrow-panchang' },
    { label: 'Rahu Kaal', href: '/rahu-kaal' },
    { label: 'Shubh Muhurat', href: '/subh-muhurat' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Why Astrotalk', href: '/why-astrotalk' },
  ],
  Support: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Login', href: '/login' },
    { label: 'Sign Up', href: '/signup' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-ink-950 text-ink-300 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg-dark opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-500/10 blur-[120px] rounded-full" />

      {/* Decorative stars */}
      <div className="absolute top-20 left-10 text-accent-400/20">
        <Star className="h-6 w-6" />
      </div>
      <div className="absolute bottom-20 right-10 text-primary-400/20">
        <Moon className="h-8 w-8" />
      </div>
      <div className="absolute top-1/2 left-1/4 text-accent-400/10">
        <Sparkles className="h-4 w-4" />
      </div>

      <div className="relative container-8xl pt-16 pb-8">
        {/* Row 1: Logo & Full Width Description - Left Aligned */}
        <div className="border-b border-white/10 pb-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/assets/logo.png"
              alt="Jyotish AI"
              className="h-12 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'h-12 w-12 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shrink-0';
                  fallback.innerHTML = '<span class="text-white text-xl font-bold">J</span>';
                  parent.prepend(fallback);
                }
              }}
            />
            <span className="text-2xl font-bold text-white">
              Jyotish <span className="text-primary-500">AI</span>
            </span>
          </div>

          <p className="text-sm text-ink-400 leading-relaxed w-full">
            Astrotalk is the best astrology website for online Astrology predictions.
            Talk to Astrologer on call and get answers to all your worries by seeing
            the future life through Astrology Kundli Predictions from the best Astrologers
            from India. Get best future predictions related to Marriage, love life, Career
            or Health over call, chat, query or report.
          </p>

          <div className="flex items-center gap-3 mt-4">
            <a
              href="https://www.linkedin.com/company/jyotish-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-ink-300 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com/jyotishai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-ink-300 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/jyotishai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-ink-300 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/@jyotishai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-ink-300 hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="mailto:support@jyotishai.com"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-ink-300 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Row 2: All Link Columns in Single Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">{heading}</h4>
              <ul className="space-y-2">
                {links.map((link: { label: string; href: string }) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-xs text-ink-400 hover:text-accent-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-500">
            &copy; {new Date().getFullYear()} JyotishAI. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-ink-500">
            <span className="flex items-center gap-1">
              <Star className="h-2.5 w-2.5 text-accent-500" />
              500+ Expert Astrologers
            </span>
            <span className="w-0.5 h-0.5 rounded-full bg-ink-600" />
            <span className="flex items-center gap-1">
              <Sun className="h-2.5 w-2.5 text-accent-500" />
              24/7 Availability
            </span>
            <span className="w-0.5 h-0.5 rounded-full bg-ink-600" />
            <span className="flex items-center gap-1">
              <Moon className="h-2.5 w-2.5 text-accent-500" />
              100% Privacy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}