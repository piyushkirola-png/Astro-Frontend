import { useState } from 'react';
import { motion } from 'framer-motion';
import {
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
    Star,
    Compass,
    Feather,
    Handshake,
    Target,
    AlertTriangle,
    Smile,
    Frown,
    Cloud,
    CloudRain,
    Sun as SunIcon,
    Moon as MoonIcon,
    ShieldAlert,
    Gem,
    Music,
    Coffee,
    Diamond
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal from '../../components/animations/Reveal';

// Types of Kaal Sarp Dosh
const kaalSarpTypes = [
    { 
        id: 'anant', 
        name: 'Anant Kaal Sarp Dosh', 
        emoji: 'ðŸ',
        rahuHouse: 1, 
        ketuHouse: 7,
        effects: ['Lack of confidence', 'Strained relationships', 'Health fluctuations', 'Marriage issues'],
        remedies: ['Rudrabhishek puja', 'Chant "Om Namah Shivaya"', 'Visit Trimbakeshwar temple'],
        color: 'from-blue-400 to-cyan-500'
    },
    { 
        id: 'kulik', 
        name: 'Kulik Kaal Sarp Dosh', 
        emoji: 'ðŸ',
        rahuHouse: 2, 
        ketuHouse: 8,
        effects: ['Financial instability', 'Family arguments', 'Income fluctuations', 'Money struggles'],
        remedies: ['Offer black sesame seeds', 'Light mustard oil diya', 'Feed birds'],
        color: 'from-purple-500 to-indigo-500'
    },
    { 
        id: 'vasuki', 
        name: 'Vasuki Kaal Sarp Dosh', 
        emoji: 'ðŸ',
        rahuHouse: 3, 
        ketuHouse: 9,
        effects: ['Sibling tensions', 'Travel surprises', 'Belief system questions', 'Missed opportunities'],
        remedies: ['Chant Rahu mantras', 'Visit Rahu temples', 'Donate black clothes'],
        color: 'from-green-500 to-emerald-500'
    },
    { 
        id: 'shankhpal', 
        name: 'Shankhpal Kaal Sarp Dosh', 
        emoji: 'ðŸ',
        rahuHouse: 4, 
        ketuHouse: 10,
        effects: ['Property clashes', 'Career stagnation', 'Distance from mother', 'Lack of peace at home'],
        remedies: ['Rudrabhishek on Mondays', 'Offer milk on Shivling', 'Chant "Om Namah Shivaya"'],
        color: 'from-orange-500 to-amber-500'
    },
    { 
        id: 'padam', 
        name: 'Padam Kaal Sarp Dosh', 
        emoji: 'ðŸ',
        rahuHouse: 5, 
        ketuHouse: 11,
        effects: ['Academic blocks', 'Childbirth delays', 'Creative burnout', 'Effort without results'],
        remedies: ['Kaal Sarp Dosh Puja', 'Visit Kalahasti temple', 'Wear silver ShieldAlert ring'],
        color: 'from-pink-500 to-rose-500'
    },
    { 
        id: 'mahapadma', 
        name: 'Mahapadma Kaal Sarp Dosh', 
        emoji: 'ðŸ',
        rahuHouse: 6, 
        ketuHouse: 12,
        effects: ['Persistent health issues', 'Unknown enemies', 'Court cases', 'Emotional defense'],
        remedies: ['Rudrabhishek puja', 'Visit Trimbakeshwar', 'Chant specific mantras'],
        color: 'from-red-500 to-orange-500'
    },
    { 
        id: 'takshak', 
        name: 'Takshak Kaal Sarp Dosh', 
        emoji: 'ðŸ',
        rahuHouse: 7, 
        ketuHouse: 1,
        effects: ['Marriage tests', 'Business partnership issues', 'Reputation hits', 'Public image concerns'],
        remedies: ['Feed birds', 'Donate to needy', 'Chant Ketu mantras'],
        color: 'from-yellow-500 to-amber-500'
    },
    { 
        id: 'karkotak', 
        name: 'Karkotak Kaal Sarp Dosh', 
        emoji: 'ðŸ',
        rahuHouse: 8, 
        ketuHouse: 2,
        effects: ['Sudden shocks', 'Accidents', 'Loss of family assets', 'Unexplained fear'],
        remedies: ['Light mustard oil diya', 'Visit Saturn temples', 'Donate iron items'],
        color: 'from-gray-600 to-slate-700'
    },
    { 
        id: 'shankhachur', 
        name: 'Shankhachur Kaal Sarp Dosh', 
        emoji: 'ðŸ',
        rahuHouse: 9, 
        ketuHouse: 3,
        effects: ['Shaken beliefs', 'Complicated father bond', 'Luck out of reach', 'Faith tested'],
        remedies: ['Chant "Om Namah Shivaya"', 'Rudrabhishek puja', 'Visit Shiva temples'],
        color: 'from-indigo-500 to-purple-500'
    },
    { 
        id: 'ghatak', 
        name: 'Ghatak Kaal Sarp Dosh', 
        emoji: 'ðŸ',
        rahuHouse: 10, 
        ketuHouse: 4,
        effects: ['Career slowdown', 'Unresolved property issues', 'Emotional weight', 'Stagnation'],
        remedies: ['Kaal Sarp Dosh Puja', 'Wear gemstones', 'Donate black sesame seeds'],
        color: 'from-blue-600 to-indigo-600'
    },
    { 
        id: 'vishdhar', 
        name: 'Vishdhar Kaal Sarp Dosh', 
        emoji: 'ðŸ',
        rahuHouse: 11, 
        ketuHouse: 5,
        effects: ['Unpredictable friendships', 'Income instability', 'Trust issues', 'Child progress concerns'],
        remedies: ['Feed stray animals', 'Chant Rahu mantras', 'Offer black items'],
        color: 'from-green-600 to-teal-600'
    },
    { 
        id: 'sheshnag', 
        name: 'Sheshnag Kaal Sarp Dosh', 
        emoji: 'ðŸ',
        rahuHouse: 12, 
        ketuHouse: 6,
        effects: ['Rising expenses', 'Overseas troubles', 'Spiritual blocks', 'Feeling pulled back'],
        remedies: ['Rudrabhishek puja', 'Visit Trimbakeshwar', 'Chant mantras daily'],
        color: 'from-purple-600 to-pink-600'
    }
];

export default function KaalSarpDosh() {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        birthHour: '',
        birthMinute: '',
        birthSecond: '',
        birthPlace: '',
        unknownTime: false
    });

    const [result, setResult] = useState<null | {
        hasDosh: boolean;
        doshType: typeof kaalSarpTypes[0] | null;
        severity: 'Mild' | 'Moderate' | 'Severe';
        description: string;
        effects: string[];
        remedies: string[];
        advice: string;
        duration: string;
    }>(null);

    const [showPlaceInput, setShowPlaceInput] = useState(false);

    const calculateKaalSarpDosh = (e: React.FormEvent) => {
        e.preventDefault();
        
        // For demo purposes, we'll simulate a calculation
        // In a real app, this would use actual birth chart calculations
        const randomIndex = Math.floor(Math.random() * kaalSarpTypes.length);
        const doshType = kaalSarpTypes[randomIndex];
        const hasDosh = true; // Simulate having dosh
        
        const severities: ('Mild' | 'Moderate' | 'Severe')[] = ['Mild', 'Moderate', 'Severe'];
        const severity = severities[Math.floor(Math.random() * 3)];
        
        const descriptions = [
            'Your birth chart shows a clear Kaal Sarp Yog formation. All seven planets are positioned between Rahu and Ketu, creating this powerful cosmic configuration.',
            'The planetary alignment in your chart indicates a significant Kaal Sarp Dosh. This placement suggests deep karmic lessons and transformative experiences.',
            'Your chart reveals a strong Kaal Sarp Dosh pattern. The positioning of Rahu and Ketu suggests you are here to complete important karmic cycles.'
        ];
        
        const duration = `${Math.floor(Math.random() * 30) + 20} to ${Math.floor(Math.random() * 20) + 40} years`;

        setResult({
            hasDosh,
            doshType,
            severity,
            description: descriptions[Math.floor(Math.random() * descriptions.length)],
            effects: doshType.effects,
            remedies: doshType.remedies,
            advice: hasDosh 
                ? 'You have Kaal Sarp Dosh. Don\'t worry - with the right remedies and guidance, you can transform this challenge into strength. Consult an expert astrologer for personalized remedies.'
                : 'You do not have Kaal Sarp Dosh. Keep nurturing your spiritual practices and positive energy.',
            duration
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: (e.target as HTMLInputElement).checked
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handlePlaceSelect = (place: string) => {
        setFormData({
            ...formData,
            birthPlace: place
        });
        setShowPlaceInput(false);
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);
    const seconds = Array.from({ length: 60 }, (_, i) => i);
    const places = ['New Delhi, Delhi, India', 'Mumbai, Maharashtra, India', 'Bangalore, Karnataka, India', 'Chennai, Tamil Nadu, India', 'Kolkata, West Bengal, India', 'Hyderabad, Telangana, India'];

    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* Kaal Sarp Dosh Form */}
            <KaalSarpDoshForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={calculateKaalSarpDosh}
                result={result}
                days={days}
                months={months}
                years={years}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                showPlaceInput={showPlaceInput}
                setShowPlaceInput={setShowPlaceInput}
                handlePlaceSelect={handlePlaceSelect}
                places={places}
            />

            {/* What is Kaal Sarp Dosh */}
            <WhatIsKaalSarpDosh />

            {/* How Does It Work */}
            <HowDoesItWork />

            {/* Types of Kaal Sarp Dosh */}
            <TypesOfKaalSarpDosh />

            {/* How Does It Affect You */}
            <HowDoesItAffectYou />

            {/* Duration */}
            <Duration />

            {/* Remedies */}
            <Remedies />

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
                        <ShieldAlert className="h-3 w-3" />
                        Free Online Tool
                    </Badge>
                </Reveal>

                <Reveal delay={0.1}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 mb-4">
                        Kaal Sarp Dosh Calculator
                    </h1>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="text-xl md:text-2xl font-semibold text-primary-600 mb-6">
                        Check Kaal Sarp Yog in Your Kundli
                    </p>
                </Reveal>

                <Reveal delay={0.3}>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-base text-ink-600 leading-relaxed">
                            Ever feel like you're doing everything right but still stuck in a loop, whether it's 
                            money struggles, strained relationships, or just this constant sense of heaviness? 
                            That's where a <span className="font-semibold text-primary-600">Kaal Sarp Dosh Calculator</span> 
                            can give you answers.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ KAAL SARP DOSH FORM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface KaalSarpDoshFormProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    result: any;
    days: number[];
    months: number[];
    years: number[];
    hours: number[];
    minutes: number[];
    seconds: number[];
    showPlaceInput: boolean;
    setShowPlaceInput: (show: boolean) => void;
    handlePlaceSelect: (place: string) => void;
    places: string[];
}

function KaalSarpDoshForm({ 
    formData, 
    handleChange, 
    handleSubmit, 
    result,
    days,
    months,
    years,
    hours,
    minutes,
    seconds,
    showPlaceInput,
    setShowPlaceInput,
    handlePlaceSelect,
    places
}: KaalSarpDoshFormProps) {
    return (
        <section className="py-12 bg-white">
            <div className="container-8xl">
                <div className="max-w-4xl mx-auto">
                    <Reveal>
                        <div className="bg-ink-50 rounded-2xl p-6 md:p-8 border border-ink-100">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500">
                                    <ShieldAlert className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-ink-900">Calculate Your Kaal Sarp Yog here</h2>
                                    <p className="text-xs text-ink-500">Enter your birth details to check Kaal Sarp Dosh</p>
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
                                            placeholder="Enter your full name"
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium text-ink-700 mb-1">
                                        Gender <span className="text-danger-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label className="block text-sm font-medium text-ink-700 mb-1">
                                        Date of Birth <span className="text-danger-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        <select
                                            name="birthDay"
                                            value={formData.birthDay}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                                            required
                                        >
                                            <option value="">Day</option>
                                            {days.map((day) => (
                                                <option key={day} value={day}>{day}</option>
                                            ))}
                                        </select>
                                        <select
                                            name="birthMonth"
                                            value={formData.birthMonth}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                                            required
                                        >
                                            <option value="">Month</option>
                                            {months.map((month) => (
                                                <option key={month} value={month}>{month}</option>
                                            ))}
                                        </select>
                                        <select
                                            name="birthYear"
                                            value={formData.birthYear}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                                            required
                                        >
                                            <option value="">Year</option>
                                            {years.map((year) => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Time of Birth */}
                                <div>
                                    <label className="block text-sm font-medium text-ink-700 mb-1">
                                        Time of Birth
                                    </label>
                                    <div className="flex items-center gap-2 mb-2">
                                        <input
                                            type="checkbox"
                                            name="unknownTime"
                                            checked={formData.unknownTime}
                                            onChange={handleChange}
                                            className="w-4 h-4 rounded border-ink-300 text-primary-600 focus:ring-primary-500"
                                        />
                                        <span className="text-xs text-ink-500">I don't know my time of birth</span>
                                    </div>
                                    {!formData.unknownTime && (
                                        <div className="grid grid-cols-3 gap-3">
                                            <select
                                                name="birthHour"
                                                value={formData.birthHour}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                                            >
                                                <option value="">Hour</option>
                                                {hours.map((hour) => (
                                                    <option key={hour} value={hour}>{String(hour).padStart(2, '0')}</option>
                                                ))}
                                            </select>
                                            <select
                                                name="birthMinute"
                                                value={formData.birthMinute}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                                            >
                                                <option value="">Minute</option>
                                                {minutes.map((minute) => (
                                                    <option key={minute} value={minute}>{String(minute).padStart(2, '0')}</option>
                                                ))}
                                            </select>
                                            <select
                                                name="birthSecond"
                                                value={formData.birthSecond}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                                            >
                                                <option value="">Second</option>
                                                {seconds.map((second) => (
                                                    <option key={second} value={second}>{String(second).padStart(2, '0')}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>

                                {/* Place of Birth */}
                                <div>
                                    <label className="block text-sm font-medium text-ink-700 mb-1">
                                        Place of Birth <span className="text-danger-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                        {showPlaceInput ? (
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="birthPlace"
                                                    value={formData.birthPlace}
                                                    onChange={handleChange}
                                                    placeholder="Enter your birth place"
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                    autoFocus
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPlaceInput(false)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                                                >
                                                    âœ•
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-wrap gap-2">
                                                {places.map((place) => (
                                                    <button
                                                        key={place}
                                                        type="button"
                                                        onClick={() => handlePlaceSelect(place)}
                                                        className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                                                            formData.birthPlace === place
                                                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                                                : 'border-ink-200 bg-white text-ink-600 hover:border-primary-300'
                                                        }`}
                                                    >
                                                        {place.split(',')[0]}
                                                    </button>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPlaceInput(true)}
                                                    className="px-3 py-1.5 rounded-lg text-xs border border-dashed border-primary-300 text-primary-600 hover:bg-primary-50"
                                                >
                                                    + Other
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Button variant="primary" size="lg" className="w-full" type="submit">
                                    <ShieldAlert className="h-4 w-4" />
                                    Check Kaal Sarp Dosh
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
                                    {/* Status */}
                                    <div className={`rounded-xl p-4 text-center ${result.hasDosh ? 'bg-amber-50 border border-amber-200' : 'bg-green-50 border border-green-200'}`}>
                                        <div className="text-2xl mb-1">{result.hasDosh ? 'âš ï¸' : 'âœ…'}</div>
                                        <div className={`text-sm font-bold ${result.hasDosh ? 'text-amber-700' : 'text-green-700'}`}>
                                            {result.hasDosh ? 'Kaal Sarp Dosh Detected' : 'No Kaal Sarp Dosh Found'}
                                        </div>
                                        <p className="text-xs text-ink-600 mt-1">{result.advice}</p>
                                    </div>

                                    {/* Dosh Type & Severity */}
                                    {result.hasDosh && result.doshType && (
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className={`bg-gradient-to-br ${result.doshType.color} rounded-xl p-4 text-center text-white`}>
                                                <div className="text-3xl">{result.doshType.emoji}</div>
                                                <div className="text-lg font-bold mt-1">{result.doshType.name}</div>
                                                <div className="text-xs opacity-90 mt-1">Rahu in House {result.doshType.rahuHouse} Â· Ketu in House {result.doshType.ketuHouse}</div>
                                            </div>
                                            <div className="bg-gradient-to-br from-secondary-600 to-secondary-500 rounded-xl p-4 text-center text-white">
                                                <div className="text-sm font-semibold opacity-90">Severity</div>
                                                <div className="text-2xl font-bold">{result.severity}</div>
                                                <div className="text-xs opacity-90 mt-1">Duration: {result.duration}</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Description */}
                                    {result.hasDosh && (
                                        <div className="bg-white rounded-xl p-4 border border-ink-100">
                                            <p className="text-sm text-ink-600 leading-relaxed">{result.description}</p>
                                        </div>
                                    )}

                                    {/* Effects & Remedies */}
                                    {result.hasDosh && result.doshType && (
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                                                <h4 className="text-sm font-bold text-red-700 mb-2 flex items-center gap-2">
                                                    <AlertTriangle className="h-4 w-4" />
                                                    Effects
                                                </h4>
                                                <ul className="space-y-1">
                                                    {result.effects.map((effect: string, i: number) => (
                                                        <li key={i} className="text-xs text-red-600 flex items-start gap-1">
                                                            <span className="text-red-400">â€¢</span>
                                                            {effect}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                                <h4 className="text-sm font-bold text-green-700 mb-2 flex items-center gap-2">
                                                    <Sparkles className="h-4 w-4" />
                                                    Remedies
                                                </h4>
                                                <ul className="space-y-1">
                                                    {result.remedies.map((remedy: string, i: number) => (
                                                        <li key={i} className="text-xs text-green-600 flex items-start gap-1">
                                                            <span className="text-green-400">â€¢</span>
                                                            {remedy}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHAT IS KAAL SARP DOSH â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhatIsKaalSarpDosh() {
    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="What is Kaal Sarp Dosh?"
                        title="Understanding the Powerful Yoga"
                        subtitle="Kaal Sarp Dosh happens when all your planets get stuck between Rahu and Ketu"
                    />
                </Reveal>

                <div className="mt-8 w-full">
                    <Reveal delay={0.1}>
                        <div className="bg-white rounded-2xl p-8 border border-ink-100 w-full">
                            <p className="text-ink-700 leading-relaxed">
                                Kaal Sarp Dosh happens when all your planets get stuck between Rahu and Ketu, like your 
                                life is caught in a cosmic loop. It can feel like you're pushing through quicksand, 
                                working twice as hard just to move forward. You might wonder, 
                                <span className="font-semibold text-primary-600"> "Why is everything so intense for me?"</span>
                            </p>
                            <div className="mt-4 p-4 bg-accent-50 rounded-xl border border-accent-200">
                                <p className="text-sm text-ink-700">
                                    <span className="font-semibold">ðŸ’¡ The deeper truth:</span> It's not a curse. Many 
                                    spiritual paths in India see it as a soul-level challenge a sign that you're meant 
                                    for deep growth, even if it comes through difficulty.
                                </p>
                            </div>
                            <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-200">
                                <p className="text-sm text-ink-700">
                                    <span className="font-semibold">âœ¨ With the right guidance,</span> rituals, and awareness, 
                                    this intense energy can be turned into fuel. Some of the most spiritually aware people 
                                    have faced Kala Sarpa Dosha and transformed it into strength.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HOW DOES IT WORK â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HowDoesItWork() {
    const steps = [
        {
            number: 1,
            icon: Calendar,
            title: 'Enter Your Birth Details',
            description: 'Provide your exact date, time, and place of birth for accurate results.'
        },
        {
            number: 2,
            icon: ShieldAlert,
            title: 'Chart Analysis',
            description: 'The calculator maps your birth chart and checks if planets are caught between Rahu and Ketu.'
        },
        {
            number: 3,
            icon: Star,
            title: 'Get Your Results',
            description: 'Discover your specific type of Kaal Sarp Dosh and its effects on your life.'
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="How It Works"
                        title="How Does Kaal Sarp Dosh Calculator Work?"
                        subtitle="A personal astrological mirror reflecting your unique cosmic setup"
                    />
                </Reveal>

                <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {steps.map((step, i) => (
                        <Reveal key={step.number} delay={i * 0.1}>
                            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all text-center">
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ TYPES OF KAAL SARP DOSH â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function TypesOfKaalSarpDosh() {
    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Types"
                        title="What are the Types of Kaal Sarp Dosha?"
                        subtitle="There are twelve types, each based on the planetary placements of Rahu and Ketu"
                    />
                </Reveal>

                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                    {kaalSarpTypes.map((type, i) => (
                        <Reveal key={type.id} delay={i * 0.05}>
                            <div className="bg-white rounded-2xl p-4 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">{type.emoji}</span>
                                    <h4 className="text-sm font-bold text-ink-900">{type.name}</h4>
                                </div>
                                <div className="flex gap-2 mb-2">
                                    <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">Rahu: House {type.rahuHouse}</span>
                                    <span className="text-xs bg-accent-50 text-accent-700 px-2 py-0.5 rounded-full">Ketu: House {type.ketuHouse}</span>
                                </div>
                                <p className="text-xs text-ink-500">{type.effects.slice(0, 2).join(' Â· ')}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HOW DOES IT AFFECT YOU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HowDoesItAffectYou() {
    const effects = [
        {
            icon: Briefcase,
            title: 'Career Growth',
            description: 'Career growth moving at a snail\'s pace. Delayed recognition and frequent job changes.'
        },
        {
            icon: Heart,
            title: 'Relationships',
            description: 'Struggles to find a compatible partner. Unexpected rough patches in good relationships.'
        },
        {
            icon: Activity,
            title: 'Health',
            description: 'Frequent unexplained health issues. Longer recovery times and persistent stress.'
        },
        {
            icon: TrendingUp,
            title: 'Finances',
            description: 'Stability feels just out of reach. Unexpected expenses and debt growing faster than income.'
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Effects"
                        title="How does Kaal Sarp Dosh affect you?"
                        subtitle="Kaal Sarp Dosh can show up in different areas of life depending on its type and intensity"
                    />
                </Reveal>

                <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {effects.map((effect, i) => (
                        <Reveal key={effect.title} delay={i * 0.1}>
                            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-4">
                                    <effect.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-ink-900 mb-2">{effect.title}</h3>
                                <p className="text-sm text-ink-500 leading-relaxed">{effect.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ DURATION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Duration() {
    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Duration"
                        title="What is the Duration of Kaal Sarp Dosh?"
                        subtitle="Kaal Sarp Dosh doesn't stick around forever, but how long it lasts depends on your chart"
                    />
                </Reveal>

                <div className="mt-8 w-full">
                    <Reveal delay={0.1}>
                        <div className="bg-white rounded-2xl p-8 border border-ink-100 w-full">
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-ink-50 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-primary-600">27-54</div>
                                    <div className="text-sm font-semibold text-ink-900">Years</div>
                                    <div className="text-xs text-ink-500">Typical Duration</div>
                                </div>
                                <div className="bg-ink-50 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-accent-600">Variable</div>
                                    <div className="text-sm font-semibold text-ink-900">Intensity</div>
                                    <div className="text-xs text-ink-500">Depends on planetary periods</div>
                                </div>
                                <div className="bg-ink-50 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-secondary-600">Karmic</div>
                                    <div className="text-sm font-semibold text-ink-900">Purpose</div>
                                    <div className="text-xs text-ink-500">Complete unresolved lessons</div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ REMEDIES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Remedies() {
    const remedies = [
        {
            icon: MoonIcon,
            title: 'Rudrabhishek Puja',
            description: 'Perform Rudrabhishek puja on Mondays, especially in the month of Shravan, for deep peace and divine protection.'
        },
        {
            icon: ShieldAlert,
            title: 'Visit Temples',
            description: 'Visit Rahu-Ketu temples during eclipses. Trimbakeshwar and Kalahasti temples are renowned for Kaal Sarp Dosh remedies.'
        },
        {
            icon: Heart,
            title: 'Feed Animals',
            description: 'Feed birds and stray animals. It clears karmic baggage fast and brings blessings.'
        },
        {
            icon: Sparkles,
            title: 'Chant Mantras',
            description: 'Chant "Om Namah Shivaya" 108 times daily. Also chant specific Rahu and Ketu mantras.'
        },
        {
            icon: Gem,
            title: 'Wear Gemstones',
            description: 'Wear silver or copper ShieldAlert rings on the correct fingers. Place energized Rahu-Ketu yantras at home.'
        },
        {
            icon: Shield,
            title: 'Donate & Serve',
            description: 'Donate black clothes and iron items on Saturdays. Feed the poor on weekends for blessings.'
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Remedies"
                        title="What are the Remedies of Kaal Sarp Dosh?"
                        subtitle="Consistency in simple remedies works wonders, especially when backed with faith and patience"
                    />
                </Reveal>

                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {remedies.map((remedy, i) => (
                        <Reveal key={remedy.title} delay={i * 0.1}>
                            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-4">
                                    <remedy.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-ink-900 mb-2">{remedy.title}</h3>
                                <p className="text-sm text-ink-500 leading-relaxed">{remedy.description}</p>
                            </div>
                        </Reveal>
                    ))}
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
                        <ShieldAlert className="h-3 w-3" />
                        Check Your Dosh
                    </Badge>
                </Reveal>

                <Reveal delay={0.1}>
                    <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        Ready to check your <span className="gradient-text-light">Kaal Sarp Dosh?</span>
                    </h2>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
                        Calculate your Kaal Sarp Dosh now and find clarity in your life's journey.
                    </p>
                </Reveal>

                <Reveal delay={0.3}>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Button to="/kaal-sarp-dosh" variant="primary" size="lg">
                            <ShieldAlert className="h-4 w-4" />
                            Check Now
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