import {
  MessageCircle,
  Calendar,
  Sparkles,
  Calculator,
  Sun,
  BookOpen,
  Heart,
  Users,
  Star,
  Moon,
  Clock,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navLinks: NavItem[] = [
  {
    label: "Consultations",
    href: "/consultations",
    children: [
      { label: "Chat with Astrologer", href: "/chat-with-astrologer" },
    ],
  },
  {
    label: "Horoscope",
    href: "/horoscope",
    children: [
      { label: "Daily Horoscope", href: "/daily-horoscope" },
      { label: "Tomorrow Horoscope", href: "/tomorrow-horoscope" },
      { label: "Yesterday Horoscope", href: "/yesterday-horoscope" },
      { label: "Weekly Horoscope", href: "/weekly-horoscope" },
      { label: "Monthly Horoscope", href: "/monthly-horoscope" },
      { label: "Yearly Horoscope", href: "/yearly-horoscope" },
    ],
  },
  {
    label: "Free Services",
    href: "/free-services",
    children: [
      { label: "Free Kundali", href: "/free-kundali" },
      { label: "Kundali Matching", href: "/kundali-matching" },
      { label: "Compatibility", href: "/compatibility" },
    ],
  },
  {
    label: "Calculators",
    href: "/calculators",
    children: [
      { label: "Love Calculator", href: "/love-calculator" },
      { label: "Numerology Calculator", href: "/numerology-calculator" },
      { label: "Friendship Calculator", href: "/friendship-calculator" },
      { label: "Mulank Calculator", href: "/mulank-calculator" },
      { label: "Destiny Number", href: "/destiny-number" },
      { label: "Age Calculator", href: "/age-calculator" },
      { label: "Sade Sati", href: "/sade-sati" },
      { label: "Kaal Sarp Dosh", href: "/kaal-sarp-dosh" },
    ],
  },
  {
    label: "Panchang",
    href: "/panchang",
    children: [
      { label: "Today's Panchang", href: "/today-panchang" },
      { label: "Rahu Kaal", href: "/rahu-kaal" },
      { label: "Subh Muhurat", href: "/subh-muhurat" },
      { label: "Tomorrow Panchang", href: "/tomorrow-panchang" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Service items for astrology platform
export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export const services: ServiceItem[] = [
  {
    icon: MessageCircle,
    title: "Chat Consultation",
    description:
      "Connect with expert astrologers via real-time chat for instant guidance.",
    href: "/chat-with-astrologer",
  },
  {
    icon: Calendar,
    title: "Daily Horoscope",
    description:
      "Get personalized daily predictions based on your zodiac sign.",
    href: "/daily-horoscope",
  },
  {
    icon: Star,
    title: "Free Kundali",
    description:
      "Generate your complete birth chart with detailed planetary positions.",
    href: "/free-kundali",
  },
  {
    icon: Calculator,
    title: "Love Calculator",
    description:
      "Check compatibility with your partner using ancient Vedic techniques.",
    href: "/love-calculator",
  },
  {
    icon: Sun,
    title: "Panchang",
    description:
      "Get daily auspicious timings, tithi, nakshatra, and planetary positions.",
    href: "/today-panchang",
  },
  {
    icon: Heart,
    title: "Kundali Matching",
    description:
      "Find perfect life partner match using detailed 36-guna matching.",
    href: "/kundali-matching",
  },
];

// Stats for astrology platform
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

export const stats: StatItem[] = [
  { value: 500, suffix: "+", label: "Expert Astrologers" },
  { value: 100000, suffix: "+", label: "Happy Clients" },
  { value: 99.5, suffix: "%", label: "Accuracy Rate" },
  { value: 24, suffix: "/7", label: "Support Available" },
];

// Features for astrology platform
export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: FeatureItem[] = [
  {
    icon: Sparkles,
    title: "Vedic Astrology Expertise",
    description:
      "Consult certified astrologers with deep knowledge of Vedic scriptures.",
  },
  {
    icon: MessageCircle,
    title: "Multiple Consultation Modes",
    description:
      "Chat, call, or video consult with astrologers anytime, anywhere.",
  },
  {
    icon: Star,
    title: "Accurate Predictions",
    description:
      "Get precise predictions based on your exact birth details and planetary positions.",
  },
  {
    icon: Calendar,
    title: "Daily Updates",
    description:
      "Receive daily horoscope and panchang updates tailored to your zodiac.",
  },
  {
    icon: Heart,
    title: "Relationship Insights",
    description: "Get deep insights into love, marriage, and compatibility.",
  },
  {
    icon: TrendingUp,
    title: "Career & Finance",
    description:
      "Get guidance for professional growth, investments, and financial decisions.",
  },
];

// Astrologer categories/specializations
export interface AstrologerSpecialization {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const specializations: AstrologerSpecialization[] = [
  {
    icon: Moon,
    title: "Vedic Astrology",
    description:
      "Traditional Indian astrology with birth charts and planetary positions.",
  },
  {
    icon: Star,
    title: "Numerology",
    description:
      "Understand the power of numbers and their impact on your life.",
  },
  {
    icon: Heart,
    title: "Love & Relationship",
    description: "Expert guidance on matters of the heart and relationships.",
  },
  {
    icon: Users,
    title: "Career & Business",
    description:
      "Professional guidance for career growth and business success.",
  },
  {
    icon: Clock,
    title: "Muhurat",
    description: "Find auspicious timings for important life events.",
  },
  {
    icon: BookOpen,
    title: "Gemstone Therapy",
    description:
      "Get recommendations for beneficial gemstones based on your chart.",
  },
];

// Testimonials
export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

export const testimonials: TestimonialItem[] = [
  {
    quote:
      "The astrologer helped me understand my career path clearly. The predictions were spot on!",
    author: "Priya Sharma",
    role: "Software Engineer",
  },
  {
    quote:
      "My love life was in chaos. The kundali matching and guidance gave me clarity.",
    author: "Arjun Patel",
    role: "Business Owner",
  },
  {
    quote:
      "Daily horoscopes have been incredibly accurate. It helps me plan my day better.",
    author: "Neha Singh",
    role: "Teacher",
  },
];

// FAQ items for astrology platform
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "How do I start a consultation?",
    answer:
      "Simply select an astrologer, choose your preferred mode (chat/call/video), and start your consultation instantly.",
  },
  {
    question: "Is my birth details secure?",
    answer:
      "Absolutely. We encrypt all personal data including birth details. Your privacy is our top priority.",
  },
  {
    question: "What is Kundali matching?",
    answer:
      "Kundali matching is a Vedic technique that compares the birth charts of two individuals for marriage compatibility based on 36 points (gunas).",
  },
  {
    question: "How accurate are the predictions?",
    answer:
      "Our predictions are based on authentic Vedic astrology principles. We have expert astrologers with decades of experience.",
  },
  {
    question: "What is Muhurat?",
    answer:
      "Muhurat is an auspicious time determined by planetary positions. We help you find the best timings for important events like weddings, business launches, etc.",
  },
  {
    question: "Can I get a free Kundali?",
    answer:
      "Yes! We offer free kundali generation with basic details. You can upgrade for detailed analysis.",
  },
];

// Astrology blog categories (optional)
export interface BlogCategory {
  label: string;
  href: string;
}

export const blogCategories: BlogCategory[] = [
  { label: "Vedic Astrology", href: "/blog/vedic-astrology" },
  { label: "Numerology", href: "/blog/numerology" },
  { label: "Horoscope", href: "/blog/horoscope" },
  { label: "Panchang", href: "/blog/panchang" },
  { label: "Gemstone", href: "/blog/gemstone" },
  { label: "Relationships", href: "/blog/relationships" },
];
