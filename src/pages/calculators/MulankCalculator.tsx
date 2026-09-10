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
    Zap,
    Calculator,
    BookOpen,
    Crown,
    Gem,
    Palette,
    Music,
    Coffee,
    Diamond,
    Compass,
    Feather,
    Handshake
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal from '../../components/animations/Reveal';

// Mulank meanings
const mulankMeanings: { [key: number]: { title: string, emoji: string, traits: string[], careers: string[], strengths: string[], weaknesses: string[], color: string } } = {
    1: {
        title: 'The Born Leader',
        emoji: 'ðŸ‘‘',
        traits: ['Natural leader', 'Independent', 'Confident', 'Ambitious', 'Innovative'],
        careers: ['Business', 'Management', 'Creative roles', 'Leadership positions'],
        strengths: ['Decision making', 'Taking charge', 'Initiative', 'Courage'],
        weaknesses: ['Impatient', 'Stubborn', 'Difficulty in teams', 'Dominant'],
        color: 'from-orange-500 to-yellow-500'
    },
    2: {
        title: 'The Peace Maker',
        emoji: 'ðŸ¤',
        traits: ['Gentle', 'Kind', 'Cooperative', 'Intuitive', 'Diplomatic'],
        careers: ['Teaching', 'Counseling', 'Teamwork', 'Diplomacy'],
        strengths: ['Problem solving', 'Empathy', 'Patience', 'Intuition'],
        weaknesses: ['Overly sensitive', 'Indecisive', 'Easily influenced'],
        color: 'from-blue-400 to-cyan-500'
    },
    3: {
        title: 'The Creative Soul',
        emoji: 'ðŸŽ¨',
        traits: ['Creative', 'Expressive', 'Enthusiastic', 'Inspiring', 'Charismatic'],
        careers: ['Media', 'Marketing', 'Arts', 'Entertainment', 'Writing'],
        strengths: ['Communication', 'Creativity', 'Inspiration', 'Joy'],
        weaknesses: ['Scattered energy', 'Superficial', 'Overly optimistic'],
        color: 'from-yellow-500 to-amber-500'
    },
    4: {
        title: 'The Builder',
        emoji: 'ðŸ§±',
        traits: ['Practical', 'Disciplined', 'Hardworking', 'Reliable', 'Organized'],
        careers: ['Engineering', 'Accounting', 'Organization', 'Architecture'],
        strengths: ['Stability', 'Planning', 'Systems thinking', 'Persistence'],
        weaknesses: ['Rigid', 'Overly cautious', 'Resistant to change'],
        color: 'from-indigo-500 to-purple-500'
    },
    5: {
        title: 'The Explorer',
        emoji: 'ðŸŒ',
        traits: ['Adventurous', 'Freedom-loving', 'Adaptable', 'Curious', 'Dynamic'],
        careers: ['Sales', 'Travel', 'Tourism', 'Marketing', 'Entrepreneurship'],
        strengths: ['Adaptability', 'Versatility', 'Communication', 'Risk-taking'],
        weaknesses: ['Restless', 'Impulsive', 'Unpredictable', 'Inconsistent'],
        color: 'from-green-500 to-emerald-500'
    },
    6: {
        title: 'The Caregiver',
        emoji: 'ðŸ’—',
        traits: ['Loving', 'Kind', 'Nurturing', 'Responsible', 'Compassionate'],
        careers: ['Teaching', 'Nursing', 'Social service', 'Healthcare', 'Counseling'],
        strengths: ['Caring', 'Responsibility', 'Empathy', 'Service'],
        weaknesses: ['Overly sacrificial', 'Control issues', 'Worrying'],
        color: 'from-pink-500 to-rose-500'
    },
    7: {
        title: 'The Thinker',
        emoji: 'ðŸ”',
        traits: ['Deep thinker', 'Philosophical', 'Introspective', 'Spiritual', 'Analytical'],
        careers: ['Research', 'Science', 'Spirituality', 'Writing', 'Analysis'],
        strengths: ['Analysis', 'Intuition', 'Wisdom', 'Independence'],
        weaknesses: ['Isolation', 'Overthinking', 'Detachment', 'Pessimism'],
        color: 'from-purple-500 to-indigo-500'
    },
    8: {
        title: 'The Power Player',
        emoji: 'ðŸ’¼',
        traits: ['Ambitious', 'Powerful', 'Practical', 'Successful', 'Strategic'],
        careers: ['Finance', 'Business', 'Management', 'Leadership', 'Entrepreneurship'],
        strengths: ['Leadership', 'Strategy', 'Wealth building', 'Authority'],
        weaknesses: ['Workaholic', 'Materialistic', 'Controlling', 'Impersonal'],
        color: 'from-gray-600 to-slate-700'
    },
    9: {
        title: 'The Giver',
        emoji: 'ðŸ’–',
        traits: ['Compassionate', 'Generous', 'Humanitarian', 'Idealistic', 'Selfless'],
        careers: ['Social work', 'Healing', 'Charity', 'Humanitarian work', 'Counseling'],
        strengths: ['Compassion', 'Service', 'Vision', 'Generosity'],
        weaknesses: ['Overly idealistic', 'Self-sacrificing', 'Emotional draining'],
        color: 'from-red-500 to-orange-500'
    }
};

// Bhagyank meanings
const bhagyankMeanings: { [key: number]: { title: string, description: string } } = {
    1: { title: 'The Pioneer', description: 'You are meant to lead, innovate, and create new paths. Your destiny is to be independent and self-reliant.' },
    2: { title: 'The Diplomat', description: 'Your destiny involves cooperation, partnerships, and bringing people together. You are a natural peacemaker.' },
    3: { title: 'The Creator', description: 'You are destined for creative expression, communication, and inspiring others through your talents.' },
    4: { title: 'The Builder', description: 'Your destiny is to build solid foundations, create systems, and bring stability to your community.' },
    5: { title: 'The Adventurer', description: 'You are destined for exploration, freedom, and embracing change. Variety is your life\'s purpose.' },
    6: { title: 'The Nurturer', description: 'Your destiny involves caring for others, creating harmony, and being responsible for family and community.' },
    7: { title: 'The Seeker', description: 'You are destined for spiritual growth, research, and uncovering hidden truths and wisdom.' },
    8: { title: 'The Achiever', description: 'Your destiny is to achieve success, build wealth, and reach positions of power and authority.' },
    9: { title: 'The Humanitarian', description: 'You are destined to serve humanity, spread love, and make the world a better place.' }
};

export default function MulankCalculator() {
    const [formData, setFormData] = useState({
        name: '',
        day: '',
        month: '',
        year: '',
    });

    const [result, setResult] = useState<null | {
        mulank: number;
        bhagyank: number;
        mulankMeaning: typeof mulankMeanings[1];
        bhagyankMeaning: typeof bhagyankMeanings[1];
        compatibility: string;
        strengths: string[];
        weaknesses: string[];
        careers: string[];
        traits: string[];
        luckyDates: number[];
        luckyDays: string[];
        luckyColors: string[];
    }>(null);

    const calculateMulank = (day: string, month: string, year: string) => {
        // Calculate Mulank (day only)
        const dayNum = parseInt(day);
        const mulank = reduceToSingleDigit(dayNum);

        // Calculate Bhagyank (full date)
        const monthNum = parseInt(month);
        const yearNum = parseInt(year);
        const total = dayNum + monthNum + yearNum;
        const bhagyank = reduceToSingleDigit(total);

        // Get meanings
        const mulankMeaning = mulankMeanings[mulank];
        const bhagyankMeaning = bhagyankMeanings[bhagyank];

        // Check compatibility
        let compatibility = '';
        if (mulank === bhagyank) {
            compatibility = 'Perfect Alignment - Your nature and destiny are in complete harmony!';
        } else if (mulank === 1 && (bhagyank === 3 || bhagyank === 5 || bhagyank === 6)) {
            compatibility = 'Good Alignment - Your leadership qualities complement your destiny.';
        } else if (mulank === 2 && (bhagyank === 4 || bhagyank === 6 || bhagyank === 7)) {
            compatibility = 'Good Alignment - Your diplomatic nature supports your life path.';
        } else if (mulank === 3 && (bhagyank === 1 || bhagyank === 5 || bhagyank === 6)) {
            compatibility = 'Good Alignment - Your creativity aligns well with your destiny.';
        } else if (mulank === 4 && bhagyank === 5) {
            compatibility = 'Balanced Alignment - Your practicality supports your adventurous destiny.';
        } else if (mulank === 5 && (bhagyank === 1 || bhagyank === 3 || bhagyank === 6)) {
            compatibility = 'Good Alignment - Your adaptability serves your life purpose.';
        } else if (mulank === 6 && (bhagyank === 3 || bhagyank === 5 || bhagyank === 9)) {
            compatibility = 'Good Alignment - Your caring nature aligns with your destiny.';
        } else if (mulank === 7 && (bhagyank === 2 || bhagyank === 4 || bhagyank === 6)) {
            compatibility = 'Good Alignment - Your wisdom supports your life path.';
        } else if (mulank === 8 && bhagyank === 5) {
            compatibility = 'Balanced Alignment - Your ambition aligns with your destiny.';
        } else if (mulank === 9 && (bhagyank === 1 || bhagyank === 3 || bhagyank === 6)) {
            compatibility = 'Good Alignment - Your humanitarian nature serves your life purpose.';
        } else {
            compatibility = 'You may need to consciously align your actions with your destiny. Your nature and life path complement each other with effort.';
        }

        // Lucky info
        const luckyDates = [1, 3, 5, 6, 9, 10, 12, 14, 15, 18, 19, 21, 23, 24, 27, 28, 30];
        const luckyDays = ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'];
        const luckyColors = ['Red', 'Yellow', 'Orange', 'Green', 'Blue', 'Purple', 'Gold', 'Silver'];

        setResult({
            mulank,
            bhagyank,
            mulankMeaning,
            bhagyankMeaning,
            compatibility,
            strengths: mulankMeaning.strengths,
            weaknesses: mulankMeaning.weaknesses,
            careers: mulankMeaning.careers,
            traits: mulankMeaning.traits,
            luckyDates: luckyDates.slice(0, 5),
            luckyDays: luckyDays.slice(0, 3),
            luckyColors: luckyColors.slice(0, 4),
        });
    };

    const reduceToSingleDigit = (num: number): number => {
        if (num === 0) return 0;
        while (num > 9) {
            num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
        }
        return num;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.day && formData.month && formData.year) {
            calculateMulank(formData.day, formData.month, formData.year);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* Mulank Form */}
            <MulankForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                result={result}
            />

            {/* What is Mulank */}
            <WhatIsMulank />

            {/* Difference Between Mulank and Bhagyank */}
            <DifferenceBetweenMulankAndBhagyank />

            {/* How to Calculate */}
            <HowToCalculate />

            {/* What is Mulank Calculator */}
            <WhatIsMulankCalculator />

            {/* How to Use */}
            <HowToUse />

            {/* Meanings of Each Mulank */}
            <MeaningsOfEachMulank />

            {/* Benefits */}
            <Benefits />

            {/* How Astrologers Use */}
            <HowAstrologersUse />

            {/* CTA Section */}
            <CTASection />
        </>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HERO SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HeroSection() {
    return (
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-primary-900/10 to-ink-50">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute top-20 -left-32 w-96 h-96 bg-primary-400/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-20 -right-32 w-96 h-96 bg-accent-400/20 rounded-full blur-[120px]" />

            <div className="relative container-8xl text-center">
                <Reveal>
                    <Badge className="mb-4">
                        <Calculator className="h-3 w-3" />
                        Free Online Tool
                    </Badge>
                </Reveal>

                <Reveal delay={0.1}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 mb-4">
                        Mulank Calculator
                    </h1>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="text-xl md:text-2xl font-semibold text-primary-600 mb-6">
                        Find Your Mulank by Date of Birth
                    </p>
                </Reveal>

                <Reveal delay={0.3}>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-base text-ink-600 leading-relaxed">
                            A <span className="font-semibold text-primary-600">Mulank calculator</span> is a simple tool 
                            that finds your personal life number using your birth date. This number comes from ancient 
                            numerology and helps explain your nature, career path, and how you connect with people. Your 
                            Mulank number is like a personal helper it shows your strengths and areas where you may face 
                            challenges.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ MULANK FORM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface MulankFormProps {
    formData: {
        name: string;
        day: string;
        month: string;
        year: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    result: null | {
        mulank: number;
        bhagyank: number;
        mulankMeaning: typeof mulankMeanings[1];
        bhagyankMeaning: typeof bhagyankMeanings[1];
        compatibility: string;
        strengths: string[];
        weaknesses: string[];
        careers: string[];
        traits: string[];
        luckyDates: number[];
        luckyDays: string[];
        luckyColors: string[];
    };
}

function MulankForm({ formData, handleChange, handleSubmit, result }: MulankFormProps) {
    return (
        <section className="py-12 bg-white">
            <div className="container-8xl">
                <div className="max-w-4xl mx-auto">
                    <Reveal>
                        <div className="bg-ink-50 rounded-2xl p-6 md:p-8 border border-ink-100">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500">
                                    <Calculator className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-ink-900">Enter Your Details</h2>
                                    <p className="text-xs text-ink-500">Find your Mulank and Bhagyank numbers</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-ink-700 mb-1">
                                        Name <span className="text-danger-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter Name in English Only"
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-sm font-medium text-ink-700 mb-1">
                                        Date (DD/MM/YYYY) <span className="text-danger-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                            <input
                                                type="number"
                                                name="day"
                                                value={formData.day}
                                                onChange={handleChange}
                                                placeholder="DD"
                                                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                min="1"
                                                max="31"
                                                required
                                            />
                                        </div>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                            <input
                                                type="number"
                                                name="month"
                                                value={formData.month}
                                                onChange={handleChange}
                                                placeholder="MM"
                                                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                min="1"
                                                max="12"
                                                required
                                            />
                                        </div>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                            <input
                                                type="number"
                                                name="year"
                                                value={formData.year}
                                                onChange={handleChange}
                                                placeholder="YYYY"
                                                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                min="1900"
                                                max="2100"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button variant="primary" size="lg" className="w-full" type="submit">
                                    <Sparkles className="h-4 w-4" />
                                    Calculate Mulank
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </form>

                            {/* Results */}
                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 space-y-4"
                                >
                                    {/* Main Numbers */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className={`bg-gradient-to-br ${result.mulankMeaning.color} rounded-xl p-4 text-white text-center`}>
                                            <div className="text-xs font-semibold opacity-90">Your Mulank</div>
                                            <div className="text-5xl font-bold">{result.mulank}</div>
                                            <div className="text-sm mt-1">{result.mulankMeaning.title}</div>
                                            <div className="text-2xl mt-1">{result.mulankMeaning.emoji}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-secondary-600 to-secondary-500 rounded-xl p-4 text-white text-center">
                                            <div className="text-xs font-semibold opacity-90">Your Bhagyank</div>
                                            <div className="text-5xl font-bold">{result.bhagyank}</div>
                                            <div className="text-sm mt-1">{result.bhagyankMeaning.title}</div>
                                        </div>
                                    </div>

                                    {/* Compatibility */}
                                    <div className="p-4 bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl border border-accent-200">
                                        <h4 className="text-sm font-bold text-ink-900 mb-1">Compatibility</h4>
                                        <p className="text-sm text-ink-600">{result.compatibility}</p>
                                    </div>

                                    {/* Traits, Strengths, Weaknesses */}
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="bg-white rounded-xl p-4 border border-ink-100">
                                            <h4 className="text-xs font-bold text-ink-900 mb-2">Your Traits</h4>
                                            <ul className="space-y-1">
                                                {result.traits.map((trait, i) => (
                                                    <li key={i} className="text-xs text-ink-600 flex items-center gap-1">
                                                        <span className="text-primary-500">â€¢</span>
                                                        {trait}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-white rounded-xl p-4 border border-ink-100">
                                            <h4 className="text-xs font-bold text-ink-900 mb-2">Your Strengths</h4>
                                            <ul className="space-y-1">
                                                {result.strengths.map((strength, i) => (
                                                    <li key={i} className="text-xs text-green-600 flex items-center gap-1">
                                                        <span className="text-green-400">â€¢</span>
                                                        {strength}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-white rounded-xl p-4 border border-ink-100">
                                            <h4 className="text-xs font-bold text-ink-900 mb-2">Areas to Work On</h4>
                                            <ul className="space-y-1">
                                                {result.weaknesses.map((weakness, i) => (
                                                    <li key={i} className="text-xs text-amber-600 flex items-center gap-1">
                                                        <span className="text-amber-400">â€¢</span>
                                                        {weakness}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Careers & Lucky Info */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-white rounded-xl p-4 border border-ink-100">
                                            <h4 className="text-xs font-bold text-ink-900 mb-2">Best Careers</h4>
                                            <ul className="space-y-1">
                                                {result.careers.map((career, i) => (
                                                    <li key={i} className="text-xs text-ink-600 flex items-center gap-1">
                                                        <span className="text-accent-500">â€¢</span>
                                                        {career}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-white rounded-xl p-4 border border-ink-100">
                                            <h4 className="text-xs font-bold text-ink-900 mb-2">Lucky Details</h4>
                                            <div className="space-y-2">
                                                <div>
                                                    <span className="text-xs font-medium text-ink-700">Dates:</span>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {result.luckyDates.map((date, i) => (
                                                            <span key={i} className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">{date}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-xs font-medium text-ink-700">Days:</span>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {result.luckyDays.map((day, i) => (
                                                            <span key={i} className="text-xs bg-accent-50 text-accent-700 px-2 py-0.5 rounded-full">{day}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-xs font-medium text-ink-700">Colors:</span>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {result.luckyColors.map((color, i) => (
                                                            <span key={i} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">{color}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl p-4 text-center text-white">
                                        <p className="text-sm">
                                            Connect with an Astrologer for more personalised detailed predictions.
                                        </p>
                                        <div className="flex justify-center gap-3 mt-3">
                                            <Button to="/consultations" variant="dark" size="sm">
                                                Talk to Astrologer
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHAT IS MULANK â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhatIsMulank() {
    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="What is Mulank?"
                        title="Understanding Your Foundation Number"
                        subtitle="Mulank is your special number that comes from your birth date"
                    />
                </Reveal>

                <div className="mt-8 w-full">
                    <Reveal delay={0.1}>
                        <div className="bg-white rounded-2xl p-8 border border-ink-100 w-full">
                            <p className="text-ink-700 leading-relaxed">
                                Mulank is your special number that comes from your birth date. In fact, your Birth Number 
                                and Ruling Number are also extracted from your date of birth, offering deeper personality 
                                insights. In Hindi numerology, <span className="font-semibold text-primary-600">"Mul"</span> 
                                means root or base, and <span className="font-semibold text-primary-600">"Ank"</span> means 
                                number. So, Mulank is your foundation number, like the starting point of your personality 
                                and life energy.
                            </p>
                            <div className="mt-4 p-4 bg-accent-50 rounded-xl border border-accent-200">
                                <p className="text-sm text-ink-700">
                                    <span className="font-semibold">ðŸ’¡ This number</span> tells a lot about how you think, 
                                    feel, and act. It's like a simple guidebook that helps explain your natural habits and 
                                    the way you handle life's ups and downs. Your Mulank plays a big role in how you deal 
                                    with relationships, how well you do in your career, and the direction your life usually takes.
                                </p>
                            </div>
                            <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-200">
                                <p className="text-sm text-ink-700">
                                    <span className="font-semibold">âœ¨ The best part?</span> Mulank is easy to calculate. 
                                    You don't need any complicated math or fancy tools. Once you know your Mulank number, 
                                    you can start using it right away to make smarter everyday choices and plan your future 
                                    more confidently.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ DIFFERENCE BETWEEN MULANK AND BHAGYANK â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function DifferenceBetweenMulankAndBhagyank() {
    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Understanding Numbers"
                        title="What is the Difference Between Mulank and Bhagyank?"
                        subtitle="In Indian numerology, two numbers play a big role in your life"
                    />
                </Reveal>

                <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    <Reveal delay={0.1}>
                        <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:shadow-lg transition-all">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-4">
                                <Star className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-ink-900 mb-3">Mulank</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm text-ink-600">
                                    <CheckCircle className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                                    <span>Calculated from your <span className="font-semibold">birth date only</span> (day)</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-ink-600">
                                    <CheckCircle className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                                    <span>Shows your <span className="font-semibold">natural personality</span> and how you think</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-ink-600">
                                    <CheckCircle className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                                    <span>Your <span className="font-semibold">true self</span> that stays the same always</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-ink-600">
                                    <CheckCircle className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                                    <span>Shapes your habits, likes, dislikes, and reactions</span>
                                </li>
                            </ul>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:shadow-lg transition-all">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-accent-600 to-secondary-600 w-fit mb-4">
                                <Compass className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-ink-900 mb-3">Bhagyank</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm text-ink-600">
                                    <CheckCircle className="h-4 w-4 text-accent-500 shrink-0 mt-0.5" />
                                    <span>Calculated from your <span className="font-semibold">full birth date</span> (day + month + year)</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-ink-600">
                                    <CheckCircle className="h-4 w-4 text-accent-500 shrink-0 mt-0.5" />
                                    <span>Shows your <span className="font-semibold">life path or destiny</span></span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-ink-600">
                                    <CheckCircle className="h-4 w-4 text-accent-500 shrink-0 mt-0.5" />
                                    <span>Reveals what you are <span className="font-semibold">meant to do</span></span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-ink-600">
                                    <CheckCircle className="h-4 w-4 text-accent-500 shrink-0 mt-0.5" />
                                    <span>Gives a <span className="font-semibold">bigger view</span> of your life's purpose</span>
                                </li>
                            </ul>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.3}>
                    <div className="mt-6 max-w-6xl mx-auto">
                        <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl p-6 border border-accent-200">
                            <h4 className="text-sm font-bold text-ink-900 mb-2">ðŸ’¡ Real Life Example</h4>
                            <p className="text-sm text-ink-600">
                                Meera from Bhopal had Mulank 6 (caring, wants peace) and Bhagyank 8 (success in business). 
                                When she understood both numbers, she found a way to manage her family life while also 
                                following her dream of running a business.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HOW TO CALCULATE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HowToCalculate() {
    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="How to Calculate"
                        title="How to Calculate Your Mulank?"
                        subtitle="Finding your mulank number is super simple anyone can do it!"
                    />
                </Reveal>

                <div className="mt-8 w-full">
                    <Reveal delay={0.1}>
                        <div className="bg-white rounded-2xl p-8 border border-ink-100 w-full">
                            <p className="text-ink-700 leading-relaxed mb-6">
                                All you need is your birth date, and the whole process takes just a few minutes. 
                                This method has been used for centuries and is still trusted because it's that accurate and reliable.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-ink-50 rounded-xl p-6">
                                    <h4 className="text-sm font-bold text-ink-900 mb-3">Example 1</h4>
                                    <div className="space-y-2 text-sm text-ink-600">
                                        <p><span className="font-semibold">Birth Date:</span> 15th March 1990</p>
                                        <p><span className="font-semibold">Take the day:</span> 15</p>
                                        <p><span className="font-semibold">Add digits:</span> 1 + 5 = <span className="font-bold text-primary-600 text-lg">6</span></p>
                                        <div className="bg-primary-50 rounded-lg p-3 mt-2">
                                            <p className="font-bold text-primary-700">Mulank = 6</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-ink-50 rounded-xl p-6">
                                    <h4 className="text-sm font-bold text-ink-900 mb-3">Example 2</h4>
                                    <div className="space-y-2 text-sm text-ink-600">
                                        <p><span className="font-semibold">Birth Date:</span> 29th January 1985</p>
                                        <p><span className="font-semibold">Take the day:</span> 29</p>
                                        <p><span className="font-semibold">Add digits:</span> 2 + 9 = 11</p>
                                        <p><span className="font-semibold">Add again:</span> 1 + 1 = <span className="font-bold text-primary-600 text-lg">2</span></p>
                                        <div className="bg-primary-50 rounded-lg p-3 mt-2">
                                            <p className="font-bold text-primary-700">Mulank = 2</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-accent-50 rounded-xl border border-accent-200">
                                <p className="text-sm text-ink-700">
                                    <span className="font-semibold">ðŸ’¡ Pro Tip:</span> If the total is a two-digit number, 
                                    just add those two digits again until you get a single number (1-9).
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHAT IS MULANK CALCULATOR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhatIsMulankCalculator() {
    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Mulank Calculator"
                        title="What is a Mulank Calculator?"
                        subtitle="An easy online tool that finds your life number using your date of birth"
                    />
                </Reveal>

                <div className="mt-8 w-full">
                    <Reveal delay={0.1}>
                        <div className="bg-ink-50 rounded-2xl p-8 border border-ink-100 w-full">
                            <p className="text-ink-700 leading-relaxed">
                                A Mulank calculator is an easy online tool that finds your life number using your date of 
                                birth. It follows the traditional numerology method, but you don't have to do any hard 
                                math by yourself. These tools also often tell you more about what your number means and 
                                how it can guide your life.
                            </p>
                            <div className="mt-4 grid md:grid-cols-2 gap-4">
                                <div className="bg-white rounded-xl p-4 border border-ink-100">
                                    <h4 className="text-sm font-bold text-ink-900 mb-2">Benefits</h4>
                                    <ul className="space-y-1 text-sm text-ink-600">
                                        <li>â€¢ Gives the right answer without mistakes</li>
                                        <li>â€¢ Shows how it calculates your number</li>
                                        <li>â€¢ Provides full meanings and details</li>
                                        <li>â€¢ Some save your details for later</li>
                                    </ul>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-ink-100">
                                    <h4 className="text-sm font-bold text-ink-900 mb-2">Features</h4>
                                    <ul className="space-y-1 text-sm text-ink-600">
                                        <li>â€¢ Yearly forecasts</li>
                                        <li>â€¢ Relationship matching</li>
                                        <li>â€¢ Personality insights</li>
                                        <li>â€¢ Career guidance</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HOW TO USE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HowToUse() {
    const steps = [
        {
            number: 1,
            icon: User,
            title: 'Enter Your Name',
            description: 'Type your full name in the first field.'
        },
        {
            number: 2,
            icon: Calendar,
            title: 'Enter Your Birth Date',
            description: 'Enter the day, month, and year of your birth separately.'
        },
        {
            number: 3,
            icon: Sparkles,
            title: 'Get Your Results',
            description: 'Click "Calculate Mulank" to get your Mulank and Bhagyank numbers.'
        }
    ];

    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="How to Use"
                        title="How to Use the Mulank Calculator?"
                        subtitle="Following the right steps helps you get the most accurate and useful results"
                    />
                </Reveal>

                <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {steps.map((step, i) => (
                        <Reveal key={step.number} delay={i * 0.1}>
                            <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all text-center">
                                <div className="relative">
                                    <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white text-xl font-bold mb-4">
                                        {step.number}
                                    </div>
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto -mt-10 mb-3">
                                        <step.icon className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-ink-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-ink-500 leading-relaxed">{step.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ MEANINGS OF EACH MULANK â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function MeaningsOfEachMulank() {
    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Mulank Meanings"
                        title="What is the Meaning of Each Mulank? (1 to 9)"
                        subtitle="Each mulank number has a special energy that shows how you naturally think, feel, and act"
                    />
                </Reveal>

                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {Object.entries(mulankMeanings).map(([num, meaning], i) => (
                        <Reveal key={num} delay={i * 0.05}>
                            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${meaning.color} flex items-center justify-center text-white font-bold text-lg`}>
                                        {num}
                                    </div>
                                    <span className="text-2xl">{meaning.emoji}</span>
                                </div>
                                <h3 className="text-lg font-bold text-ink-900 mb-1">Mulank {num} â€“ {meaning.title}</h3>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {meaning.traits.slice(0, 3).map((trait, i) => (
                                        <span key={i} className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">{trait}</span>
                                    ))}
                                </div>
                                <p className="text-sm text-ink-500 mt-3 leading-relaxed">
                                    {meaning.traits.join(', ')}. Great for careers in {meaning.careers.slice(0, 2).join(', ')}.
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ BENEFITS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Benefits() {
    const benefits = [
        {
            icon: Briefcase,
            title: 'Career Guidance',
            description: 'Your mulank can tell you which career suits your natural strengths. Many people struggle at jobs that don\'t match their number\'s energy.'
        },
        {
            icon: Heart,
            title: 'Relationship Understanding',
            description: 'Your mulank shows how you connect with others. Different numbers talk and feel differently, helping make relationships smoother.'
        },
        {
            icon: Compass,
            title: 'Decision Making',
            description: 'When you have to make big choices, your mulank can guide you to pick what suits your nature for better results.'
        },
        {
            icon: TrendingUp,
            title: 'Personal Growth',
            description: 'Knowing your mulank helps you see your strengths and areas you need to work on, helping you grow faster.'
        },
        {
            icon: Calendar,
            title: 'Timing Decisions',
            description: 'Some days and months work better for certain mulank numbers. Starting something important on these dates brings more success.'
        },
        {
            icon: Activity,
            title: 'Health and Wellness',
            description: 'Your mulank affects how your body and mind behave. Match your lifestyle with your mulank energy for better health.'
        }
    ];

    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Benefits"
                        title="What are the Benefits of Mulank in Daily Life?"
                        subtitle="Knowing your mulank can really help in your everyday life"
                    />
                </Reveal>

                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {benefits.map((benefit, i) => (
                        <Reveal key={benefit.title} delay={i * 0.1}>
                            <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-4">
                                    <benefit.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-ink-900 mb-2">{benefit.title}</h3>
                                <p className="text-sm text-ink-500 leading-relaxed">{benefit.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HOW ASTROLOGERS USE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HowAstrologersUse() {
    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Astrological Use"
                        title="How Astrologers Use Mulank"
                        subtitle="Astrologers often mix Mulank readings with other tools like astrology and tarot"
                    />
                </Reveal>

                <div className="mt-8 w-full">
                    <Reveal delay={0.1}>
                        <div className="bg-ink-50 rounded-2xl p-8 border border-ink-100 w-full">
                            <p className="text-ink-700 leading-relaxed">
                                Astrologers often mix Mulank readings with other tools like astrology and tarot. 
                                This gives a full picture of your life your strengths, struggles, and best direction 
                                forward. It also helps you take better steps in your career, love life, or personal journey.
                            </p>
                            <div className="mt-4 grid md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-xl p-4 border border-ink-100 text-center">
                                    <Star className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                                    <h4 className="text-sm font-bold text-ink-900">Astrology</h4>
                                    <p className="text-xs text-ink-500">Combined with birth chart for deeper insights</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-ink-100 text-center">
                                    <Sparkles className="h-8 w-8 text-accent-500 mx-auto mb-2" />
                                    <h4 className="text-sm font-bold text-ink-900">Tarot</h4>
                                    <p className="text-xs text-ink-500">Used alongside for complete guidance</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-ink-100 text-center">
                                    <Calculator className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                                    <h4 className="text-sm font-bold text-ink-900">Numerology</h4>
                                    <p className="text-xs text-ink-500">Combined with Life Path Number and Name Numerology</p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
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
                        <Calculator className="h-3 w-3" />
                        Find Your Number
                    </Badge>
                </Reveal>

                <Reveal delay={0.1}>
                    <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        Ready to discover your <span className="gradient-text-light">Mulank number?</span>
                    </h2>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
                        Calculate your Mulank and Bhagyank numbers now and unlock the secrets of your birth date.
                    </p>
                </Reveal>

                <Reveal delay={0.3}>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Button to="/mulank-calculator" variant="primary" size="lg">
                            <Calculator className="h-4 w-4" />
                            Calculate Now
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