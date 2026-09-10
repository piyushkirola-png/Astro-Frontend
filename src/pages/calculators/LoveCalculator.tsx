import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Heart,
    Users,
    Sparkles,
    ArrowRight,
    CheckCircle,
    Zap,
    Shield,
    Award,
    TrendingUp,
    Activity,
    Moon,
    Sun,
    Star,
    Calendar,
    Clock,
    MapPin,
    User,
    Info,
    Gift,
    Smile,
    Flame,
    Crown,
    Music,
    Coffee,
    Diamond
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal from '../../components/animations/Reveal';

// Love quotes
const loveQuotes = [
    "Together, you will create a symphony of love, harmonizing perfectly in each other's arms.",
    "Love is not about how many days, months, or years you've been together. Love is about how much you love each other every single day.",
    "In your eyes, I have found my home. In your heart, I have found my love.",
    "Love is when the other person's happiness is more important than your own.",
    "The best thing to hold onto in life is each other.",
    "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.",
    "Where there is love there is life.",
    "Love is composed of a single soul inhabiting two bodies.",
];

export default function LoveCalculator() {
    const [formData, setFormData] = useState({
        yourName: '',
        yourGender: 'male',
        partnerName: '',
        partnerGender: 'female',
        yourBirthDate: '',
        partnerBirthDate: '',
    });

    const [result, setResult] = useState<null | {
        percentage: number;
        category: string;
        description: string;
        emoji: string;
        message: string;
        quote: string;
    }>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.yourName && formData.partnerName) {
            // Calculate love percentage based on names
            const combined = (formData.yourName + formData.partnerName).toLowerCase().replace(/\s/g, '');
            let hash = 0;
            for (let i = 0; i < combined.length; i++) {
                hash = (hash * 31 + combined.charCodeAt(i)) % 1000;
            }
            const percentage = (hash % 41) + 60; // 60-100
            
            let category, description, emoji;
            if (percentage >= 90) {
                category = 'Soulmate Bond';
                description = 'The universe supports this bond. Whether it is mental, physical, emotional, or spiritual matters, you both will dwell easily into each other.';
                emoji = 'ðŸ’–';
            } else if (percentage >= 70) {
                category = 'Promising Bond';
                description = 'You share good chemistry with high-level attraction, mutual respect, and care from both sides. This bond can evolve into something beautiful with transparent communication.';
                emoji = 'ðŸ’•';
            } else if (percentage >= 50) {
                category = 'Growing Bond';
                description = 'There will be love and affection, but it comes with some challenges. The relationship requires patience and hard work. Understanding and accepting each other\'s flaws is key.';
                emoji = 'ðŸ’—';
            } else {
                category = 'Tender Bond';
                description = 'The path may not be easy. There can be conflicts and misunderstandings. Consider consulting an expert astrologer for guidance before committing to a relationship.';
                emoji = 'ðŸ’”';
            }

            const randomQuote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];

            setResult({
                percentage,
                category,
                description,
                emoji,
                message: `Your love compatibility with ${formData.partnerName} is`,
                quote: randomQuote,
            });
        }
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

            {/* Love Calculator Form */}
            <LoveCalculatorForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                result={result}
            />

            {/* What is Love Calculator */}
            <WhatIsLoveCalculator />

            {/* How It Works */}
            <HowItWorks />

            {/* What Does Love Percentage Say */}
            <LovePercentageGuide />

            {/* Why Choose Us */}
            <WhyChooseLoveCalculator />

            {/* Other Love Tools */}
            <OtherLoveTools />

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
                        Love Calculator by Name
                    </h1>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="text-xl md:text-2xl font-semibold text-accent-600 mb-6">
                        Calculate Your Love Percentage
                    </p>
                </Reveal>

                <Reveal delay={0.3}>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-base text-ink-600 leading-relaxed">
                            Ever wondered whether your current partner truly loves you, or if it's all in your head? 
                            Has someone new sparked your interest, but you are unsure if they are the right match for you? 
                            If yes, the <span className="font-semibold text-accent-600">Love Calculator by Name</span> might 
                            just be the right tool for you! Whether you've just met someone or are curious about a 
                            long-term relationship, a name-based love calculator is a fun way to explore your connections.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ LOVE CALCULATOR FORM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface LoveCalculatorFormProps {
    formData: {
        yourName: string;
        yourGender: string;
        partnerName: string;
        partnerGender: string;
        yourBirthDate: string;
        partnerBirthDate: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    result: null | {
        percentage: number;
        category: string;
        description: string;
        emoji: string;
        message: string;
        quote: string;
    };
}

function LoveCalculatorForm({ formData, handleChange, handleSubmit, result }: LoveCalculatorFormProps) {
    return (
        <section className="py-12 bg-white">
            <div className="container-8xl">
                <div className="max-w-4xl mx-auto">
                    <Reveal>
                        <div className="bg-ink-50 rounded-2xl p-6 md:p-8 border border-ink-100">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500">
                                    <Heart className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-ink-900">Love Calculator by Name</h2>
                                    <p className="text-xs text-ink-500">Enter your details to calculate love percentage</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Your Details */}
                                    <div>
                                        <label className="block text-sm font-medium text-ink-700 mb-2">
                                            Your Name <span className="text-danger-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                            <input
                                                type="text"
                                                name="yourName"
                                                value={formData.yourName}
                                                onChange={handleChange}
                                                placeholder="Enter Your Name"
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                required
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <label className="block text-sm font-medium text-ink-700 mb-1">
                                                Gender
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['Male', 'Female'].map((gender) => (
                                                    <button
                                                        key={gender}
                                                        type="button"
                                                        onClick={() => handleChange({ target: { name: 'yourGender', value: gender.toLowerCase() } } as any)}
                                                        className={`py-1.5 px-3 rounded-xl border-2 font-medium transition-all text-xs ${formData.yourGender === gender.toLowerCase()
                                                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                                                : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300'
                                                            }`}
                                                    >
                                                        {gender}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <label className="block text-sm font-medium text-ink-700 mb-1">
                                                Date of Birth
                                            </label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                                <input
                                                    type="date"
                                                    name="yourBirthDate"
                                                    value={formData.yourBirthDate}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Partner's Details */}
                                    <div>
                                        <label className="block text-sm font-medium text-ink-700 mb-2">
                                            Partner's Name <span className="text-danger-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Heart className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                            <input
                                                type="text"
                                                name="partnerName"
                                                value={formData.partnerName}
                                                onChange={handleChange}
                                                placeholder="Enter Partner's Name"
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                required
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <label className="block text-sm font-medium text-ink-700 mb-1">
                                                Gender
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['Male', 'Female'].map((gender) => (
                                                    <button
                                                        key={gender}
                                                        type="button"
                                                        onClick={() => handleChange({ target: { name: 'partnerGender', value: gender.toLowerCase() } } as any)}
                                                        className={`py-1.5 px-3 rounded-xl border-2 font-medium transition-all text-xs ${formData.partnerGender === gender.toLowerCase()
                                                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                                                : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300'
                                                            }`}
                                                    >
                                                        {gender}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <label className="block text-sm font-medium text-ink-700 mb-1">
                                                Partner's Date of Birth
                                            </label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                                <input
                                                    type="date"
                                                    name="partnerBirthDate"
                                                    value={formData.partnerBirthDate}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Button variant="primary" size="lg" className="w-full" type="submit">
                                    <Heart className="h-4 w-4" />
                                    Calculate Love %
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </form>

                            {/* Results */}
                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-6 bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl border border-accent-200"
                                >
                                    <div className="text-center mb-4">
                                        <div className="text-6xl mb-2">{result.emoji}</div>
                                        <p className="text-sm text-ink-600">{result.message}</p>
                                        <div className="mt-2 text-6xl font-bold gradient-text">
                                            {result.percentage}%
                                        </div>
                                        <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-sm">
                                            <span className="text-sm font-semibold text-ink-900">{result.category}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-4 bg-white rounded-xl border border-accent-100">
                                        <p className="text-sm text-ink-600 leading-relaxed">{result.description}</p>
                                    </div>

                                    <div className="mt-4 p-4 bg-gradient-to-br from-accent-100 to-primary-100 rounded-xl border border-accent-200">
                                        <p className="text-sm text-ink-700 italic text-center">
                                            "ðŸ’– {result.quote}"
                                        </p>
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHAT IS LOVE CALCULATOR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhatIsLoveCalculator() {
    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="What is Love Calculator?"
                        title="Understanding the Love Meter"
                        subtitle="A love calculator by name is an online compatibility tool that generates a love percentage"
                    />
                </Reveal>

                <div className="mt-8 w-full">
                    <Reveal delay={0.1}>
                        <div className="bg-white rounded-2xl p-8 border border-ink-100 w-full">
                            <p className="text-ink-700 leading-relaxed">
                                A love calculator by name is an online compatibility tool that generates a love percentage 
                                between two people by analysing their names and birth details (in some cases). While some 
                                may use this tool for entertainment, it draws inspiration from ancient systems such as 
                                astrology and numerology. This makes this love calculator both fun and meaningful.
                            </p>
                            <div className="mt-4 p-4 bg-accent-50 rounded-xl border border-accent-200">
                                <p className="text-sm text-ink-700">
                                    <span className="font-semibold">ðŸ’¡ Did you know?</span> This Love Calculator is also 
                                    known as a Love Meter, Love Percentage Calculator, Love Match Calculator, or True Love 
                                    Calculator. All these names may look different, but they refer to the same concept of 
                                    calculating compatibility between two individuals using names, birth details, or 
                                    astrological factors.
                                </p>
                            </div>
                            <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-200">
                                <p className="text-sm text-ink-700">
                                    <span className="font-semibold">âœ¨ Many people</span> use this love meter to test their 
                                    compatibility with a partner, satisfy their curiosity about a crush, or simply enjoy a 
                                    fun activity with a friend. If you have entered into a new relationship or have been 
                                    in a committed relationship for years, your compatibility score can spark exciting 
                                    conversations and encourage you to learn more about each other.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HOW IT WORKS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HowItWorks() {
    const steps = [
        {
            number: 1,
            icon: User,
            title: 'Enter Your Name',
            description: 'Type your full name in the first field to begin the compatibility check.'
        },
        {
            number: 2,
            icon: Heart,
            title: 'Enter Partner\'s Name',
            description: 'Type the name of the person you want to check compatibility with.'
        },
        {
            number: 3,
            icon: Calendar,
            title: 'Add Birth Details',
            description: 'Enter date of birth if you have the option for a more detailed analysis.'
        },
        {
            number: 4,
            icon: Sparkles,
            title: 'Get Your Result',
            description: 'Click on "Calculate Love %" to get an instant compatibility result.'
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="How It Works"
                        title="How to Use the Love Calculator"
                        subtitle="Check your love compatibility in 4 easy steps"
                    />
                </Reveal>

                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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

                <Reveal delay={0.4}>
                    <div className="mt-8 max-w-6xl mx-auto">
                        <div className="bg-accent-50 rounded-2xl p-6 border border-accent-200">
                            <p className="text-sm text-ink-700 text-center">
                                <span className="font-semibold">ðŸ“Š Your result</span> provides an easy-to-understand score 
                                that you can share with friends and family for fun, or use as a starting point to explore 
                                a relationship further.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ LOVE PERCENTAGE GUIDE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function LovePercentageGuide() {
    const ranges = [
        {
            range: '90-100%',
            label: 'Soulmate Bond',
            description: 'The universe supports this bond. Whether it is mental, physical, emotional, or spiritual matters, you both will dwell easily into each other.',
            emoji: 'ðŸ’–',
            color: 'from-accent-500 to-primary-600'
        },
        {
            range: '70-89%',
            label: 'Promising Bond',
            description: 'You share good chemistry with high-level attraction, mutual respect, and care from both sides. This bond can evolve into something beautiful with transparent communication.',
            emoji: 'ðŸ’•',
            color: 'from-primary-400 to-accent-400'
        },
        {
            range: '50-69%',
            label: 'Growing Bond',
            description: 'There will be love and affection, but it comes with some challenges. The relationship requires patience and hard work. Understanding and accepting each other\'s flaws is key.',
            emoji: 'ðŸ’—',
            color: 'from-blue-400 to-primary-400'
        },
        {
            range: 'Below 50%',
            label: 'Tender Bond',
            description: 'The path may not be easy. There can be conflicts and misunderstandings. Consider consulting an expert astrologer for guidance before committing to a relationship.',
            emoji: 'ðŸ’”',
            color: 'from-gray-400 to-slate-400'
        }
    ];

    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Love Percentage Guide"
                        title="What Does Your Love Percentage Say?"
                        subtitle="The love percentage reveals the bond that two people share"
                    />
                </Reveal>

                <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {ranges.map((range, i) => (
                        <Reveal key={range.range} delay={i * 0.1}>
                            <div className={`bg-white rounded-2xl p-6 border ${i === 0 ? 'border-accent-200' :
                                    i === 1 ? 'border-primary-200' :
                                        i === 2 ? 'border-blue-200' :
                                            'border-gray-200'
                                } hover:shadow-lg transition-all`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-3xl">{range.emoji}</span>
                                    <div>
                                        <div className={`text-lg font-bold bg-gradient-to-r ${range.color} bg-clip-text text-transparent`}>
                                            {range.range}
                                        </div>
                                        <div className="text-sm font-semibold text-ink-900">{range.label}</div>
                                    </div>
                                </div>
                                <p className="text-sm text-ink-600 leading-relaxed">{range.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHY CHOOSE LOVE CALCULATOR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhyChooseLoveCalculator() {
    const features = [
        {
            icon: Gift,
            title: 'Totally Free',
            description: 'It is completely free to use with no charges involved whatsoever.'
        },
        {
            icon: Zap,
            title: 'Instant Results',
            description: 'You get immediate results without any delays.'
        },
        {
            icon: Shield,
            title: 'Privacy Priority',
            description: 'All your inputs will be kept confidential so you can experiment with it safely.'
        },
        {
            icon: Smile,
            title: 'Fun to Use',
            description: 'Combination of compatibility based on names and dates of birth makes it enjoyable.'
        },
        {
            icon: Clock,
            title: 'Available 24/7',
            description: 'This tool is available 24*7, regardless of the kind of relationship you want to examine.'
        },
        {
            icon: Star,
            title: 'Learn More',
            description: 'May spark your interest in studying astrology and numerology further.'
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Why Choose Us"
                        title="Why Use Jyotish AI's Love Calculator?"
                        subtitle="Finding out your love compatibility must be an enjoyable and fun experience"
                    />
                </Reveal>

                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, i) => (
                        <Reveal key={feature.title} delay={i * 0.1}>
                            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all text-center">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto mb-4">
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
                        <div className="bg-gradient-to-br from-primary-600 to-accent-500 rounded-2xl p-6 text-center text-white">
                            <p className="text-lg font-semibold">Need Personalized Guidance?</p>
                            <p className="text-sm opacity-90 mt-1">
                                If you wish to have a one-on-one conversation with an expert, you can call an astrologer 
                                for personalized advice and insights.
                            </p>
                            <Button to="/consultations" variant="dark" size="lg" className="mt-4">
                                <Users className="h-4 w-4" />
                                Consult an Astrologer
                            </Button>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ OTHER LOVE TOOLS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function OtherLoveTools() {
    const tools = [
        {
            icon: Flame,
            title: 'Flames Calculator',
            description: 'Interested to know if there exists a profound spiritual bond between you and your partner? Try out the Flames Calculator.',
            link: '/flames-calculator'
        },
        {
            icon: Crown,
            title: 'Kundli Matching',
            description: 'If you are planning to get married, then Kundli Matching is the ideal solution for you based on Vedic Astrology.',
            link: '/kundali-matching'
        }
    ];

    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Other Tools"
                        title="Other Love Compatibility Tools"
                        subtitle="Explore more ways to understand your relationship"
                    />
                </Reveal>

                <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {tools.map((tool, i) => (
                        <Reveal key={tool.title} delay={i * 0.1}>
                            <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500">
                                        <tool.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-ink-900 mb-1">{tool.title}</h3>
                                        <p className="text-sm text-ink-500 leading-relaxed">{tool.description}</p>
                                        <Button to={tool.link} variant="outline" size="sm" className="mt-3">
                                            Try Now
                                            <ArrowRight className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.3}>
                    <div className="mt-6 max-w-4xl mx-auto">
                        <div className="bg-accent-50 rounded-2xl p-6 border border-accent-200 text-center">
                            <p className="text-sm text-ink-700">
                                <span className="font-semibold">ðŸ’¡ Tip:</span> When you use multiple compatibility 
                                tests simultaneously, you gain a better insight into your partnership and, at the 
                                same time, make your astrological experience more fun.
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
                        Find Your Love
                    </Badge>
                </Reveal>

                <Reveal delay={0.1}>
                    <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        Ready to discover your <span className="gradient-text-light">love percentage?</span>
                    </h2>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
                        Calculate your love compatibility now and find out if you and your partner are a perfect match.
                    </p>
                </Reveal>

                <Reveal delay={0.3}>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Button to="/love-calculator" variant="primary" size="lg">
                            <Heart className="h-4 w-4" />
                            Calculate Love %
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