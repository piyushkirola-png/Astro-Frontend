import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Star,
    Calendar,
    Clock,
    MapPin,
    User,
    Users,
    Sparkles,
    Heart,
    ChevronRight,
    Shield,
    CheckCircle,
    ArrowRight,
    Globe,
    Moon,
    Sun,
    TrendingUp,
    Activity,
    Home,
    Briefcase,
    Baby,
    AlertCircle,
    Info,
    Award,
    Zap
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal from '../../components/animations/Reveal';

export default function KundaliMatching() {
    const [formData, setFormData] = useState({
        yourName: '',
        yourGender: 'male',
        yourBirthDate: '',
        yourBirthTime: '',
        yourBirthPlace: '',
        partnerName: '',
        partnerGender: 'female',
        partnerBirthDate: '',
        partnerBirthTime: '',
        partnerBirthPlace: '',
    });

    const [matchGenerated, setMatchGenerated] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMatchGenerated(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* Match Generator Form */}
            <MatchGenerator
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                matchGenerated={matchGenerated}
            />

            {/* What is Kundali Matching */}
            <WhatIsKundaliMatching />

            {/* Why is Matching Important */}
            <WhyMatchingImportant />

            {/* How Does Matching Work */}
            <HowMatchingWorks />

            {/* 8 Kootas Section */}
            <KootasSection />

            {/* Mangal Dosha Section */}
            <MangalDoshaSection />

            {/* Score Interpretation */}
            <ScoreInterpretation />

            {/* Systems of Matching */}
            <SystemsOfMatching />

            {/* Why Choose Us */}
            <WhyChooseMatching />

            {/* CTA Section */}
            <CTASection />
        </>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HERO SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HeroSection() {
    return (
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-accent-900/10 to-ink-50">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute top-20 -left-32 w-96 h-96 bg-accent-400/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-20 -right-32 w-96 h-96 bg-primary-400/20 rounded-full blur-[120px]" />

            <div className="relative container-8xl text-center">
                <Reveal>
                    <Badge className="mb-4">
                        <Heart className="h-3 w-3" />
                        Free Online Tool
                    </Badge>
                </Reveal>

                <Reveal delay={0.1}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 mb-4">
                        Kundali Matching for Marriage
                    </h1>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="text-xl md:text-2xl font-semibold text-accent-600 mb-6">
                        Free Online Kundli Milan
                    </p>
                </Reveal>

                <Reveal delay={0.3}>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-base text-ink-600 leading-relaxed">
                            Use <span className="font-semibold text-accent-600">Jyotish AI's</span> free online Kundali
                            Matching tool to find your marriage compatibility instantly. Based on Vedic Astrology
                            principles, our Kundli Milan system assesses compatibility between two people using the
                            Ashtakoota method, Guna Milan Score out of 36 Gunas, Mangal Dosha analysis, and detailed
                            horoscope-matching factors. Whether it's a love marriage or an arranged marriage, online
                            kundli matching is important for understanding emotional compatibility, family growth,
                            long-term stability, and relationship harmony before marriage.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ MATCH GENERATOR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface MatchGeneratorProps {
    formData: {
        yourName: string;
        yourGender: string;
        yourBirthDate: string;
        yourBirthTime: string;
        yourBirthPlace: string;
        partnerName: string;
        partnerGender: string;
        partnerBirthDate: string;
        partnerBirthTime: string;
        partnerBirthPlace: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    matchGenerated: boolean;
}

function MatchGenerator({ formData, handleChange, handleSubmit, matchGenerated }: MatchGeneratorProps) {
    return (
        <section className="py-12 bg-white">
            <div className="container-8xl">
                <div className="max-w-6xl mx-auto">
                    <Reveal>
                        <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 rounded-xl bg-gradient-to-br from-accent-600 to-primary-600">
                                    <Heart className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-ink-900">New Match</h2>
                                    <p className="text-xs text-ink-500">Enter birth details of both partners</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Your Details */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-ink-900 mb-3 flex items-center gap-2">
                                            <User className="h-4 w-4 text-primary-500" />
                                            Your Details
                                        </h3>
                                        <div className="space-y-4">
                                            {/* Your Name */}
                                            <div>
                                                <label className="block text-sm font-medium text-ink-700 mb-1">
                                                    Name <span className="text-danger-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                                    <input
                                                        type="text"
                                                        name="yourName"
                                                        value={formData.yourName}
                                                        onChange={handleChange}
                                                        placeholder="Enter full name"
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Your Gender */}
                                            <div>
                                                <label className="block text-sm font-medium text-ink-700 mb-1">
                                                    Gender <span className="text-danger-500">*</span>
                                                </label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {['Male', 'Female', 'Other'].map((gender) => (
                                                        <button
                                                            key={gender}
                                                            type="button"
                                                            onClick={() => handleChange({ target: { name: 'yourGender', value: gender.toLowerCase() } } as any)}
                                                            className={`py-2 px-3 rounded-xl border-2 font-medium transition-all text-sm ${formData.yourGender === gender.toLowerCase()
                                                                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                                                                    : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300'
                                                                }`}
                                                        >
                                                            {gender}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Your Birth Date */}
                                            <div>
                                                <label className="block text-sm font-medium text-ink-700 mb-1">
                                                    Birth Date <span className="text-danger-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                                    <input
                                                        type="date"
                                                        name="yourBirthDate"
                                                        value={formData.yourBirthDate}
                                                        onChange={handleChange}
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                        required
                                                    />
                                                </div>
                                                <p className="text-xs text-ink-500 mt-1">Select date, e.g. 15 Jul 1991</p>
                                            </div>

                                            {/* Your Birth Time */}
                                            <div>
                                                <label className="block text-sm font-medium text-ink-700 mb-1">
                                                    Birth Time
                                                </label>
                                                <div className="relative">
                                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                                    <input
                                                        type="time"
                                                        name="yourBirthTime"
                                                        value={formData.yourBirthTime}
                                                        onChange={handleChange}
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                    />
                                                </div>
                                                <p className="text-xs text-ink-500 mt-1">Defaults to 12:00 AM if not provided</p>
                                            </div>

                                            {/* Your Birth Place */}
                                            <div>
                                                <label className="block text-sm font-medium text-ink-700 mb-1">
                                                    Birth Place <span className="text-danger-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                                    <input
                                                        type="text"
                                                        name="yourBirthPlace"
                                                        value={formData.yourBirthPlace}
                                                        onChange={handleChange}
                                                        placeholder="Enter city, e.g. New Delhi, India"
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Partner's Details */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-ink-900 mb-3 flex items-center gap-2">
                                            <Heart className="h-4 w-4 text-accent-500" />
                                            Partner's Details
                                        </h3>
                                        <div className="space-y-4">
                                            {/* Partner Name */}
                                            <div>
                                                <label className="block text-sm font-medium text-ink-700 mb-1">
                                                    Name <span className="text-danger-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                                    <input
                                                        type="text"
                                                        name="partnerName"
                                                        value={formData.partnerName}
                                                        onChange={handleChange}
                                                        placeholder="Enter full name"
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Partner Gender */}
                                            <div>
                                                <label className="block text-sm font-medium text-ink-700 mb-1">
                                                    Gender <span className="text-danger-500">*</span>
                                                </label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {['Male', 'Female', 'Other'].map((gender) => (
                                                        <button
                                                            key={gender}
                                                            type="button"
                                                            onClick={() => handleChange({ target: { name: 'partnerGender', value: gender.toLowerCase() } } as any)}
                                                            className={`py-2 px-3 rounded-xl border-2 font-medium transition-all text-sm ${formData.partnerGender === gender.toLowerCase()
                                                                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                                                                    : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300'
                                                                }`}
                                                        >
                                                            {gender}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Partner Birth Date */}
                                            <div>
                                                <label className="block text-sm font-medium text-ink-700 mb-1">
                                                    Birth Date <span className="text-danger-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                                    <input
                                                        type="date"
                                                        name="partnerBirthDate"
                                                        value={formData.partnerBirthDate}
                                                        onChange={handleChange}
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                        required
                                                    />
                                                </div>
                                                <p className="text-xs text-ink-500 mt-1">Select date, e.g. 15 Jul 1991</p>
                                            </div>

                                            {/* Partner Birth Time */}
                                            <div>
                                                <label className="block text-sm font-medium text-ink-700 mb-1">
                                                    Birth Time
                                                </label>
                                                <div className="relative">
                                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                                    <input
                                                        type="time"
                                                        name="partnerBirthTime"
                                                        value={formData.partnerBirthTime}
                                                        onChange={handleChange}
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                    />
                                                </div>
                                                <p className="text-xs text-ink-500 mt-1">Defaults to 12:00 AM if not provided</p>
                                            </div>

                                            {/* Partner Birth Place */}
                                            <div>
                                                <label className="block text-sm font-medium text-ink-700 mb-1">
                                                    Birth Place <span className="text-danger-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                                    <input
                                                        type="text"
                                                        name="partnerBirthPlace"
                                                        value={formData.partnerBirthPlace}
                                                        onChange={handleChange}
                                                        placeholder="Enter city, e.g. Mumbai, India"
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Button variant="primary" size="lg" className="w-full" type="submit">
                                    <Heart className="h-4 w-4" />
                                    Match Horoscope
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHAT IS KUNDALI MATCHING â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhatIsKundaliMatching() {
    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="What is Kundali Matching?"
                        title="Understanding Kundli Milan"
                        subtitle="Kundli matching, also known as Horoscope Matching is a traditional Vedic Astrology method"
                    />
                </Reveal>

                <div className="mt-8 max-w-6xl mx-auto">
                    <Reveal delay={0.1}>
                        <div className="bg-white rounded-2xl p-8 border border-ink-100 w-full">
                            <p className="text-ink-700 leading-relaxed">
                                Kundli matching, also known as Horoscope Matching is a traditional Vedic Astrology method
                                that astrologers use to check compatibility between two people before marriage. In Hindu
                                Astrology, the Janam Kundlis of both partners are evaluated and compared to determine
                                whether they are emotionally, physically, and mentally aligned for a long-term marriage.
                            </p>
                            <div className="mt-4 p-4 bg-accent-50 rounded-xl border border-accent-200">
                                <p className="text-sm text-ink-700">
                                    <span className="font-semibold">ðŸ’¡ Note:</span> The process involves matching planetary
                                    positions, Nakshatras, Moon signs, and the Ashtakoota Guna Milan system out of 36 points.
                                </p>
                            </div>
                            <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-200">
                                <p className="text-sm text-ink-700">
                                    <span className="font-semibold">âœ¨ In Vedic Astrology,</span> marriage is more than just
                                    a social bond; it is a karmic union. This is why checking compatibility goes beyond
                                    attraction and focuses on areas like finances, children, health, emotional, and
                                    spiritual alignment.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHY MATCHING IMPORTANT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhyMatchingImportant() {
    const reasons = [
        {
            icon: Heart,
            title: 'Emotional Compatibility',
            description: 'Understand emotional and mental compatibility before marriage. The Gana and Graha Maitri kootas help assess whether both partners meet each other\'s emotional expectations.',
            color: 'from-pink-500 to-rose-500'
        },
        {
            icon: TrendingUp,
            title: 'Financial Stability',
            description: 'Strong alignment in Graha Maitri and Bhakakoot often leads to mutual financial growth, shared goals, and better financial decision-making as a couple.',
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: Activity,
            title: 'Health and Longevity',
            description: 'Nadi Matching plays an important role in physical compatibility, overall well-being of family life, and hereditary patterns.',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Baby,
            title: 'Progeny and Family Growth',
            description: 'Analyse family happiness, children-related issues, and long-term domestic stability through the 5th house, nadi compatibility, and Jupiter\'s placement.',
            color: 'from-purple-500 to-indigo-500'
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Why It Matters"
                        title="Why is Kundali Matching Important for Marriage?"
                        subtitle="Understanding the key areas of compatibility"
                    />
                </Reveal>

                <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {reasons.map((reason, i) => (
                        <Reveal key={reason.title} delay={i * 0.1}>
                            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${reason.color} w-fit mb-4`}>
                                    <reason.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-ink-900 mb-2">{reason.title}</h3>
                                <p className="text-sm text-ink-500 leading-relaxed">{reason.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.4}>
                    <div className="mt-8 bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl p-6 border border-accent-200 max-w-6xl mx-auto">
                        <h3 className="text-lg font-bold text-ink-900 mb-2">Does Kundali Matching Work for Love Marriages?</h3>
                        <p className="text-ink-600 leading-relaxed">
                            Yes, Kundli Matching is just as important for love marriages. In fact, many couples seek
                            astrological guidance through Kundli Milan even after becoming emotionally committed.
                            Sometimes, couples feel deeply emotionally invested before marriage, but their incompatible
                            dasha, mangalik imbalance, unfavourable planetary placements, or conflicting temperament
                            may create post-marital issues. Kundli Matching helps identify and rectify these patterns early.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HOW MATCHING WORKS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HowMatchingWorks() {
    const steps = [
        { number: 1, title: 'Generate Janam Kundli', description: 'Create accurate birth charts for both individuals using their dates, times, and places of birth.' },
        { number: 2, title: 'Ashtakoota Guna Milan', description: 'Compare both charts using 8 compatibility factors and assign points out of 36 gunas.' },
        { number: 3, title: 'Check Mangal Dosha', description: 'Analyze Mars placement to identify aggression, conflicts, or delays in marriage.' },
        { number: 4, title: '7th House Compatibility', description: 'Compare the 7th house in both charts with ruling planets Venus and Jupiter.' },
        { number: 5, title: 'Examine Dasha Periods', description: 'Consider Mahadasha and Antardasha periods before finalising a marriage report.' },
        { number: 6, title: 'Navamsa Chart Analysis', description: 'Analyze D9 chart to reveal deeper strengths and weaknesses of the relationship.' }
    ];

    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="How It Works"
                        title="How Does Kundli Matching Work?"
                        subtitle="A step-by-step process for accurate marriage compatibility"
                    />
                </Reveal>

                <div className="mt-8 max-w-6xl mx-auto space-y-4">
                    {steps.map((step, i) => (
                        <Reveal key={step.number} delay={i * 0.05}>
                            <div className="bg-white rounded-2xl p-5 border border-ink-100 hover:border-accent-200 hover:shadow-md transition-all flex items-center gap-4">
                                <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-accent-600 to-primary-600 text-white text-sm font-bold flex items-center justify-center">
                                    {step.number}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-ink-900">Step {step.number}: {step.title}</h4>
                                    <p className="text-sm text-ink-500">{step.description}</p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-ink-300" />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ 8 KOOTAS SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function KootasSection() {
    const kootas = [
        { name: 'Verna Koota', points: 1, meaning: 'Spiritual compatibility and ego alignment' },
        { name: 'Vashya Koota', points: 2, meaning: 'Mutual attraction and balance of control' },
        { name: 'Tara Koota', points: 3, meaning: 'Overall health and well-being' },
        { name: 'Yoni Koota', points: 4, meaning: 'Physical and intimate compatibility' },
        { name: 'Graha Maitri', points: 5, meaning: 'Mental, emotional, and intellectual compatibility' },
        { name: 'Gana Koota', points: 6, meaning: 'Compatibility of temperament and inherent nature' },
        { name: 'Bhakoot Koota', points: 7, meaning: 'Financial harmony and love balance' },
        { name: 'Nadi Koota', points: 8, meaning: 'Health and genetic compatibility, especially for childbirth' }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="8 Kootas"
                        title="The 8 Kootas in Gun Milan"
                        subtitle="All 36 Guna Points Explained"
                    />
                </Reveal>

                <div className="mt-8 max-w-6xl mx-auto">
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-2xl border border-ink-100">
                            <thead>
                                <tr className="bg-gradient-to-r from-accent-600 to-primary-600">
                                    <th className="text-left py-3 px-4 text-white font-semibold text-sm">Koota</th>
                                    <th className="text-center py-3 px-4 text-white font-semibold text-sm">Points</th>
                                    <th className="text-left py-3 px-4 text-white font-semibold text-sm">Meaning</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kootas.map((koota, i) => (
                                    <tr key={koota.name} className={i % 2 === 0 ? 'bg-ink-50' : 'bg-white'}>
                                        <td className="py-3 px-4 text-sm font-semibold text-ink-900">{koota.name}</td>
                                        <td className="py-3 px-4 text-center text-sm font-bold text-accent-600">{koota.points}</td>
                                        <td className="py-3 px-4 text-sm text-ink-600">{koota.meaning}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                        {kootas.map((koota, i) => (
                            <Reveal key={koota.name} delay={i * 0.05}>
                                <div className="bg-ink-50 rounded-xl p-4 border border-ink-100">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-semibold text-ink-900 text-sm">{koota.name}</h4>
                                        <span className="text-xs font-bold text-accent-600 bg-accent-100 px-2 py-0.5 rounded-full">
                                            {koota.points} points
                                        </span>
                                    </div>
                                    <p className="text-xs text-ink-500">{koota.meaning}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ MANGAL DOSHA SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function MangalDoshaSection() {
    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Mangal Dosha"
                        title="Mangal Dosha in Kundli Matching"
                        subtitle="What You Need To Know"
                    />
                </Reveal>

                <div className="mt-8 max-w-6xl mx-auto">
                    <Reveal delay={0.1}>
                        <div className="bg-white rounded-2xl p-6 border border-ink-100 mb-6">
                            <p className="text-ink-700 leading-relaxed">
                                Mangal Dosha is formed when Mars is placed in certain houses related to marriage and
                                domestic life. Astrologers carefully analyse birth charts to identify whether Mars is
                                creating emotional instability, a temperament imbalance, aggression, or affecting
                                marital compatibility.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Reveal delay={0.2}>
                            <div className="bg-white rounded-2xl p-6 border border-ink-100">
                                <h3 className="text-lg font-bold text-ink-900 mb-3">Houses That Cause Mangal Dosha</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {[1, 2, 4, 7, 8, 12].map((house) => (
                                        <div key={house} className="bg-ink-50 rounded-lg p-3 text-center">
                                            <span className="text-lg font-bold text-accent-600">{house}</span>
                                            <span className="text-xs text-ink-500 block">House</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-ink-500 mt-3">Professional astrologers also consider the Lagna and Moon chart before final interpretation.</p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div className="bg-white rounded-2xl p-6 border border-ink-100">
                                <h3 className="text-lg font-bold text-ink-900 mb-3">Mangal Dosha Cancellation Rules</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2 text-sm text-ink-600">
                                        <CheckCircle className="h-4 w-4 text-success-500 shrink-0 mt-0.5" />
                                        Jupiter's strong aspect can reduce Mars' aggressiveness
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-ink-600">
                                        <CheckCircle className="h-4 w-4 text-success-500 shrink-0 mt-0.5" />
                                        Mars behaves differently in its own sign or exaltation
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-ink-600">
                                        <CheckCircle className="h-4 w-4 text-success-500 shrink-0 mt-0.5" />
                                        Mangal Dosha neutralises if both partners are Manglik
                                    </li>
                                </ul>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={0.4}>
                        <div className="mt-6 bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl p-6 border border-accent-200">
                            <h3 className="text-lg font-bold text-ink-900 mb-3">Remedies for Mangal Dosha</h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                <div className="bg-white rounded-xl p-3 text-center">
                                    <span className="text-sm font-semibold text-ink-900">Recite Hanuman Chalisa</span>
                                </div>
                                <div className="bg-white rounded-xl p-3 text-center">
                                    <span className="text-sm font-semibold text-ink-900">Fast on Tuesdays</span>
                                </div>
                                <div className="bg-white rounded-xl p-3 text-center">
                                    <span className="text-sm font-semibold text-ink-900">Mangal Graha Shanti Puja</span>
                                </div>
                                <div className="bg-white rounded-xl p-3 text-center">
                                    <span className="text-sm font-semibold text-ink-900">Kumbh Vivah (in specific cases)</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ SCORE INTERPRETATION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ScoreInterpretation() {
    const scores = [
        { range: 'Below 18', label: 'Weak Compatibility', description: 'May result in emotional differences, health issues, and challenges. Professional astrologers consider other factors before final conclusion.' },
        { range: '18 to 24', label: 'Average Compatibility', description: 'Requires considerable patience, understanding, and emotional maturity. Dashas and Navamsa Compatibility play an important role.' },
        { range: '24 to 32', label: 'Good Compatibility', description: 'Supports attraction, emotional understanding, and long-term stability in marital life.' },
        { range: '32 to 36', label: 'Excellent Compatibility', description: 'Strong mental and emotional alignment with smoother adjustment in marriage.' }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Score Guide"
                        title="How to Interpret Your Kundali Matching Score"
                        subtitle="Understanding the 36-point Guna Milan System"
                    />
                </Reveal>

                <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {scores.map((score, i) => (
                        <Reveal key={score.range} delay={i * 0.1}>
                            <div className={`rounded-2xl p-6 border ${i === 0 ? 'bg-red-50 border-red-200' :
                                    i === 1 ? 'bg-yellow-50 border-yellow-200' :
                                        i === 2 ? 'bg-green-50 border-green-200' :
                                            'bg-emerald-50 border-emerald-200'
                                }`}>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-bold text-ink-900">{score.range}</h3>
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${i === 0 ? 'bg-red-200 text-red-700' :
                                            i === 1 ? 'bg-yellow-200 text-yellow-700' :
                                                i === 2 ? 'bg-green-200 text-green-700' :
                                                    'bg-emerald-200 text-emerald-700'
                                        }`}>
                                        {score.label}
                                    </span>
                                </div>
                                <p className="text-sm text-ink-600 leading-relaxed">{score.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.4}>
                    <div className="mt-6 bg-ink-50 rounded-2xl p-6 border border-ink-100 max-w-6xl mx-auto">
                        <h3 className="text-lg font-bold text-ink-900 mb-2">Can You Marry With a Low Kundli Matching Score?</h3>
                        <p className="text-ink-600 leading-relaxed">
                            Yes, many couples have long-lasting marriages even with a low Guna Milan Score. This is
                            because astrology includes much more than just the 36-point system. A weaker Guna Milan
                            score can be adjusted with stronger 7th house compatibility, emotional maturity, mutual
                            respect, and supportive Dashas.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ SYSTEMS OF MATCHING â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function SystemsOfMatching() {
    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Systems of Matching"
                        title="Different Systems of Kundali Matching"
                        subtitle="North Indian vs South Indian Traditions"
                    />
                </Reveal>

                <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    <Reveal delay={0.1}>
                        <div className="bg-white rounded-2xl p-6 border border-ink-100">
                            <h3 className="text-xl font-bold text-ink-900 mb-3 text-center">North Indian</h3>
                            <div className="p-4 bg-ink-50 rounded-xl">
                                <p className="text-center font-semibold text-accent-600">Ashtakoota Guna Milan</p>
                                <p className="text-sm text-ink-500 text-center mt-1">8 categories, 36 points system</p>
                            </div>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2 text-sm text-ink-600">
                                    <CheckCircle className="h-4 w-4 text-accent-500" />
                                    Verna, Vashya, Tara, Yoni Kootas
                                </li>
                                <li className="flex items-center gap-2 text-sm text-ink-600">
                                    <CheckCircle className="h-4 w-4 text-accent-500" />
                                    Graha Maitri, Gana, Bhakoot, Nadi
                                </li>
                                <li className="flex items-center gap-2 text-sm text-ink-600">
                                    <CheckCircle className="h-4 w-4 text-accent-500" />
                                    Widely used across India
                                </li>
                            </ul>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="bg-white rounded-2xl p-6 border border-ink-100">
                            <h3 className="text-xl font-bold text-ink-900 mb-3 text-center">South Indian</h3>
                            <div className="p-4 bg-ink-50 rounded-xl">
                                <p className="text-center font-semibold text-primary-600">Dashakuta / Porutham</p>
                                <p className="text-sm text-ink-500 text-center mt-1">10 categories matching system</p>
                            </div>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2 text-sm text-ink-600">
                                    <CheckCircle className="h-4 w-4 text-primary-500" />
                                    Nakshatra compatibility focus
                                </li>
                                <li className="flex items-center gap-2 text-sm text-ink-600">
                                    <CheckCircle className="h-4 w-4 text-primary-500" />
                                    Rajju, Mahendra, Dina Porutham
                                </li>
                                <li className="flex items-center gap-2 text-sm text-ink-600">
                                    <CheckCircle className="h-4 w-4 text-primary-500" />
                                    Popular in Kerala and Tamil traditions
                                </li>
                            </ul>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.3}>
                    <div className="mt-6 max-w-6xl mx-auto">
                        <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl p-6 border border-accent-200">
                            <h3 className="text-lg font-bold text-ink-900 mb-2">Kundali Matching by Date of Birth vs by Name</h3>
                            <p className="text-ink-600 leading-relaxed">
                                <span className="font-semibold">By Date of Birth:</span> Uses exact birth details (date, time, place)
                                to analyse the birth charts. This method helps study houses, planetary positions, dasha and
                                navamsa charts, and deeper compatibility patterns.
                            </p>
                            <p className="text-ink-600 leading-relaxed mt-2">
                                <span className="font-semibold">By Name:</span> A simplified method that uses the Moon sign
                                and the nakshatra associated with the particular name. Useful when birth details are unavailable,
                                but less accurate.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHY CHOOSE MATCHING â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhyChooseMatching() {
    const features = [
        {
            icon: Award,
            title: 'Accurate Guna Milan',
            description: 'Precise calculations based on Vedic Astrology principles for accurate compatibility assessment.'
        },
        {
            icon: AlertCircle,
            title: 'Mangal Dosha Analysis',
            description: 'Detailed analysis of Mars placement and its impact on marital compatibility.'
        },
        {
            icon: Info,
            title: 'Detailed Compatibility',
            description: 'Comprehensive report covering all aspects of relationship compatibility.'
        },
        {
            icon: Zap,
            title: 'AI-Powered Report',
            description: 'Advanced AI algorithms combined with traditional astrological wisdom for accurate results.'
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Why Choose Us"
                        title="Why Use Jyotish AI for Kundli Matching?"
                        subtitle="Get accurate and detailed compatibility reports instantly"
                    />
                </Reveal>

                <div className="mt-8 grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, i) => (
                        <Reveal key={feature.title} delay={i * 0.1}>
                            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-accent-600 to-primary-600 w-fit mb-4">
                                    <feature.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-ink-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-ink-500 leading-relaxed">{feature.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.4}>
                    <div className="mt-8 max-w-6xl mx-auto">
                        <div className="bg-gradient-to-br from-accent-600 to-primary-600 rounded-2xl p-6 text-center text-white">
                            <p className="text-lg font-semibold">Access to Expert Astrologers</p>
                            <p className="text-sm opacity-90 mt-1">
                                If you have questions about your score or other details, immediately chat with our
                                expert astrologers for personalised guidance.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ CTA SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function CTASection() {
    return (
        <section className="py-20 bg-ink-950 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg-dark opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-accent-500/15 to-primary-500/15 blur-[130px] rounded-full" />

            <div className="relative container-8xl text-center">
                <Reveal>
                    <Badge variant="dark">
                        <Heart className="h-3 w-3" />
                        Find Your Match
                    </Badge>
                </Reveal>

                <Reveal delay={0.1}>
                    <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        Ready to find your <span className="gradient-text-light">perfect match?</span>
                    </h2>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
                        Check your marriage compatibility with our free online Kundali Matching tool and
                        get instant, accurate results.
                    </p>
                </Reveal>

                <Reveal delay={0.3}>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Button to="/kundali-matching" variant="primary" size="lg">
                            <Heart className="h-4 w-4" />
                            Match Horoscope
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