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
    Diamond,
    Handshake,
    Compass,
    Feather,
    Globe
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal from '../../components/animations/Reveal';

// Friendship quotes
const friendshipQuotes = [
    "Friendship is truly one of life's most beautiful gifts. It's not something you're born into or forced into, it's a bond you choose.",
    "Real friendship isn't about what you get from someone; it's about that warm feeling of being understood, supported, and accepted just as you are.",
    "A friend is someone who knows all about you and still loves you.",
    "Friendship is the only cement that will ever hold the world together.",
    "True friendship comes when the silence between two people is comfortable.",
    "Friends are the family we choose for ourselves.",
];

// Friendship types
const friendshipTypes = [
    {
        icon: Coffee,
        title: 'Casual Friendships',
        description: 'People you enjoy spending time with during specific activities or circumstances but don\'t share deep personal information.'
    },
    {
        icon: Heart,
        title: 'Close Friendships',
        description: 'Higher levels of trust, emotional sharing, and mutual support where both people feel comfortable discussing personal challenges.'
    },
    {
        icon: Crown,
        title: 'Best Friends',
        description: 'The deepest level of friendship, characterized by unconditional acceptance, complete trust, and the ability to share anything.'
    },
    {
        icon: Compass,
        title: 'Karmic Friendships',
        description: 'Serve specific purposes in your spiritual development, appearing during times when you need to learn particular lessons.'
    },
    {
        icon: Feather,
        title: 'Spiritual Friendships',
        description: 'Center around shared spiritual interests, practices, or beliefs that create bonds based on mutual seeking for truth.'
    }
];

// Planets affecting friendships
const planets = [
    {
        name: 'Sun',
        icon: Sun,
        description: 'Governs self-image, confidence, and natural authority. Directly impacts how you show up in friendships.',
        positive: 'Naturally shine in social circles, people are drawn to your presence.',
        negative: 'Might come off as too dominant or struggle with ego clashes.',
        color: 'from-orange-500 to-yellow-500'
    },
    {
        name: 'Mars',
        icon: Zap,
        description: 'Brings action, courage, and loyalty. Fiercely loyal friend who always has everyone\'s back.',
        positive: 'Brings thrill and protective energy to relationships.',
        negative: 'Can make you reactive, overly competitive, or struggle with conflicts.',
        color: 'from-red-500 to-orange-500'
    },
    {
        name: 'Saturn',
        icon: Shield,
        description: 'Brings depth and stability. The kind of friend who stays through every high and low.',
        positive: 'Takes promises seriously, relationships grow stronger with time.',
        negative: 'May feel emotionally guarded or struggle with opening up.',
        color: 'from-gray-600 to-slate-700'
    },
    {
        name: 'Rahu',
        icon: Globe,
        description: 'The wildcard. Governs ambition and unconventional friendships, drawing you to people from vastly different backgrounds.',
        positive: 'Opens your world to diverse connections.',
        negative: 'Might lead to friendships that are intense but filled with drama.',
        color: 'from-purple-500 to-indigo-500'
    },
    {
        name: 'Ketu',
        icon: Moon,
        description: 'Spiritual and mysterious. Governs soul-deep connections and karmic friendships.',
        positive: 'Friendships that feel like you\'ve known the person forever.',
        negative: 'Might make you feel disconnected or bring sudden endings to friendships.',
        color: 'from-blue-400 to-cyan-500'
    }
];

export default function FriendshipCalculator() {
    const [formData, setFormData] = useState({
        yourName: '',
        partnerName: '',
    });

    const [result, setResult] = useState<null | {
        percentage: number;
        category: string;
        description: string;
        emoji: string;
        message: string;
        strengths: string[];
        challenges: string[];
        advice: string;
        quote: string;
        type: string;
    }>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.yourName && formData.partnerName) {
            // Calculate friendship compatibility
            const combined = (formData.yourName + formData.partnerName).toLowerCase().replace(/\s/g, '');
            let hash = 0;
            for (let i = 0; i < combined.length; i++) {
                hash = (hash * 31 + combined.charCodeAt(i)) % 1000;
            }
            const percentage = (hash % 41) + 50; // 50-90

            let category, description, emoji, type, strengths, challenges, advice;
            
            if (percentage >= 80) {
                category = 'Soul-Aligned Bond';
                description = 'Your friendship is truly special! You share a deep, meaningful connection that feels like you\'ve known each other for lifetimes.';
                emoji = 'ðŸŒŸ';
                type = 'Spiritual/Karmic Friendship';
                strengths = ['Deep understanding', 'Unconditional support', 'Shared values', 'Effortless communication'];
                challenges = ['May struggle with boundaries', 'Can become too dependent'];
                advice = 'Cherish this rare connection. Continue nurturing it with honesty and mutual respect.';
            } else if (percentage >= 65) {
                category = 'Strong Bond';
                description = 'You have a solid friendship built on trust, respect, and genuine care for each other.';
                emoji = 'ðŸ’«';
                type = 'Close/Best Friendship';
                strengths = ['Trustworthy', 'Reliable', 'Good communication', 'Mutual respect'];
                challenges = ['May need more quality time', 'Could work on deeper sharing'];
                advice = 'Keep investing in this friendship. Regular check-ins and shared experiences will strengthen it further.';
            } else if (percentage >= 50) {
                category = 'Growing Bond';
                description = 'Your friendship has potential but needs nurturing. With effort and understanding, it can blossom into something beautiful.';
                emoji = 'ðŸŒ±';
                type = 'Casual/Growing Friendship';
                strengths = ['Pleasant interactions', 'Shared interests', 'Potential for growth'];
                challenges = ['May lack depth', 'Needs more trust-building', 'Communication gaps'];
                advice = 'Take time to know each other better. Share more experiences and be open about your feelings.';
            } else {
                category = 'Developing Bond';
                description = 'Your friendship is in its early stages or may need more effort to align. Every connection has its own pace.';
                emoji = 'ðŸŒ¿';
                type = 'Casual Friendship';
                strengths = ['Open to connection', 'Positive start', 'Potential for growth'];
                challenges = ['May need more effort', 'Different expectations', 'Communication barriers'];
                advice = 'Be patient and give this friendship time to grow. Focus on common interests and building trust gradually.';
            }

            const randomQuote = friendshipQuotes[Math.floor(Math.random() * friendshipQuotes.length)];

            setResult({
                percentage,
                category,
                description,
                emoji,
                message: `Your friendship compatibility with ${formData.partnerName} is`,
                strengths,
                challenges,
                advice,
                quote: randomQuote,
                type,
            });
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

            {/* Friendship Calculator Form */}
            <FriendshipForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                result={result}
            />

            {/* What is Friendship */}
            <WhatIsFriendship />

            {/* What is Friendship Calculator */}
            <WhatIsFriendshipCalculator />

            {/* How It Works */}
            <HowItWorks />

            {/* Friendship Types */}
            <FriendshipTypes />

            {/* Planets Affecting Friendships */}
            <PlanetsAffectingFriendships />

            {/* House of Friendship */}
            <HouseOfFriendship />

            {/* Benefits */}
            <Benefits />

            {/* Why Choose Us */}
            <WhyChooseFriendship />

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
                        <Handshake className="h-3 w-3" />
                        Free Online Tool
                    </Badge>
                </Reveal>

                <Reveal delay={0.1}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 mb-4">
                        Friendship Compatibility Calculator
                    </h1>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="text-xl md:text-2xl font-semibold text-primary-600 mb-6">
                        Find Your True Bond
                    </p>
                </Reveal>

                <Reveal delay={0.3}>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-base text-ink-600 leading-relaxed">
                            Ever wondered if your bond with someone is built to last? Whether it's that childhood bestie, 
                            your college roommate, or a new connection, a <span className="font-semibold text-primary-600">Friendship Compatibility Calculator</span> 
                            can give you surprising clarity.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ FRIENDSHIP FORM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface FriendshipFormProps {
    formData: {
        yourName: string;
        partnerName: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    result: null | {
        percentage: number;
        category: string;
        description: string;
        emoji: string;
        message: string;
        strengths: string[];
        challenges: string[];
        advice: string;
        quote: string;
        type: string;
    };
}

function FriendshipForm({ formData, handleChange, handleSubmit, result }: FriendshipFormProps) {
    return (
        <section className="py-12 bg-white">
            <div className="container-8xl">
                <div className="max-w-4xl mx-auto">
                    <Reveal>
                        <div className="bg-ink-50 rounded-2xl p-6 md:p-8 border border-ink-100">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500">
                                    <Handshake className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-ink-900">Calculate your Friendship Compatibility here</h2>
                                    <p className="text-xs text-ink-500">Enter your details to check compatibility</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Your Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-ink-700 mb-1">
                                            Your Name <span className="text-danger-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                            <input
                                                type="text"
                                                name="yourName"
                                                value={formData.yourName}
                                                onChange={handleChange}
                                                placeholder="Enter your name"
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Partner's Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-ink-700 mb-1">
                                            Your Partner's Name <span className="text-danger-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Heart className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                            <input
                                                type="text"
                                                name="partnerName"
                                                value={formData.partnerName}
                                                onChange={handleChange}
                                                placeholder="Enter your partner's name"
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button variant="primary" size="lg" className="w-full" type="submit">
                                    <Sparkles className="h-4 w-4" />
                                    Calculate Friendship Compatibility
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
                                        <div className="mt-1 text-xs text-ink-500">{result.type}</div>
                                    </div>

                                    <div className="mt-4 p-4 bg-white rounded-xl border border-accent-100">
                                        <p className="text-sm text-ink-600 leading-relaxed">{result.description}</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                                        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                            <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4" />
                                                Strengths
                                            </h4>
                                            <ul className="space-y-1">
                                                {result.strengths.map((strength, i) => (
                                                    <li key={i} className="text-xs text-green-600 flex items-start gap-1">
                                                        <span className="text-green-400">â€¢</span>
                                                        {strength}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                                            <h4 className="text-sm font-semibold text-amber-700 mb-2 flex items-center gap-2">
                                                <Zap className="h-4 w-4" />
                                                Challenges
                                            </h4>
                                            <ul className="space-y-1">
                                                {result.challenges.map((challenge, i) => (
                                                    <li key={i} className="text-xs text-amber-600 flex items-start gap-1">
                                                        <span className="text-amber-400">â€¢</span>
                                                        {challenge}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-200">
                                        <h4 className="text-sm font-semibold text-primary-700 mb-1 flex items-center gap-2">
                                            <Info className="h-4 w-4" />
                                            Advice
                                        </h4>
                                        <p className="text-sm text-ink-600">{result.advice}</p>
                                    </div>

                                    <div className="mt-4 p-4 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl border border-primary-200">
                                        <p className="text-sm text-ink-700 italic text-center">
                                            "ðŸ’« {result.quote}"
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHAT IS FRIENDSHIP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhatIsFriendship() {
    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="What is Friendship?"
                        title="Understanding True Bonds"
                        subtitle="Friendship is truly one of life's most beautiful gifts"
                    />
                </Reveal>

                <div className="mt-8 w-full">
                    <Reveal delay={0.1}>
                        <div className="bg-white rounded-2xl p-8 border border-ink-100 w-full">
                            <p className="text-ink-700 leading-relaxed">
                                Friendship is truly one of life's most beautiful gifts. It's not something you're born into 
                                or forced into, it's a bond you choose. When you think about it, real friendship isn't about 
                                what you get from someone; it's about that warm feeling of being understood, supported, and 
                                accepted just as you are. And in a world where so much is transactional, genuine friendship 
                                stands out as a space of emotional richness and mutual respect.
                            </p>
                            <div className="mt-4 p-4 bg-accent-50 rounded-xl border border-accent-200">
                                <p className="text-sm text-ink-700">
                                    <span className="font-semibold">ðŸ’¡ In Indian culture,</span> and especially through the lens 
                                    of Vedic philosophy, friendship is seen as more than just a social connection, it's a 
                                    spiritual bridge. It reflects our ability to love selflessly and grow as individuals through 
                                    heartfelt connections.
                                </p>
                            </div>
                            <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-200">
                                <p className="text-sm text-ink-700">
                                    <span className="font-semibold">âœ¨ At the heart of any real friendship</span> are qualities 
                                    like trust, loyalty, and honesty. But it's more than just the heavy stuff; it's about 
                                    celebrating each other's wins without envy, being that silent support when life gets messy, 
                                    and encouraging one another's growth.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHAT IS FRIENDSHIP CALCULATOR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhatIsFriendshipCalculator() {
    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Friendship Calculator"
                        title="What is a Friendship Compatibility Calculator?"
                        subtitle="A fun and insightful digital tool that helps you decode your connections"
                    />
                </Reveal>

                <div className="mt-8 w-full">
                    <Reveal delay={0.1}>
                        <div className="bg-ink-50 rounded-2xl p-8 border border-ink-100 w-full">
                            <p className="text-ink-700 leading-relaxed">
                                Ever wondered why you instantly click with some people while with others, it's just effort? 
                                A Friendship Compatibility Calculator is a fun and insightful digital tool that helps you 
                                decode this mystery. It uses numerology, name analysis, and sometimes even astrology to 
                                evaluate how well two people vibe as friends.
                            </p>
                            <div className="mt-4 p-4 bg-accent-50 rounded-xl border border-accent-200">
                                <p className="text-sm text-ink-700">
                                    <span className="font-semibold">ðŸ”® How it works:</span> Your name gets converted into numbers, 
                                    and those numbers interact to form either smooth, friendly vibes or some bumps in the road. 
                                    The more detailed calculators might also throw in your zodiac signs, planetary influences, 
                                    and birth charts for a richer reading.
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
            description: 'Type your full name to begin the friendship compatibility check.'
        },
        {
            number: 2,
            icon: Heart,
            title: 'Enter Your Friend\'s Name',
            description: 'Type the name of the person you want to check compatibility with.'
        },
        {
            number: 3,
            icon: Sparkles,
            title: 'Get Your Result',
            description: 'Click on "Calculate" to get an instant compatibility result with insights.'
        }
    ];

    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="How It Works"
                        title="How does this Friendship Compatibility Calculator work?"
                        subtitle="Turn your name and your friend's into numbers based on ancient numerology"
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

                <Reveal delay={0.4}>
                    <div className="mt-8 max-w-6xl mx-auto">
                        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-accent-200">
                            <p className="text-sm text-ink-700 text-center">
                                <span className="font-semibold">ðŸ“Š Your result</span> provides an easy-to-understand score 
                                with detailed insights and tips to help you strengthen your bond.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ FRIENDSHIP TYPES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function FriendshipTypes() {
    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Friendship Types"
                        title="What are the Types of Friendship?"
                        subtitle="Understanding different types of friendship helps us recognize the various roles people play in our lives"
                    />
                </Reveal>

                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {friendshipTypes.map((type, i) => (
                        <Reveal key={type.title} delay={i * 0.1}>
                            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-4">
                                    <type.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-ink-900 mb-2">{type.title}</h3>
                                <p className="text-sm text-ink-500 leading-relaxed">{type.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ PLANETS AFFECTING FRIENDSHIPS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function PlanetsAffectingFriendships() {
    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Planetary Influence"
                        title="Which Planets Affect Friendships?"
                        subtitle="In Vedic astrology, planets play a deeper role in how we connect with people"
                    />
                </Reveal>

                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {planets.map((planet, i) => (
                        <Reveal key={planet.name} delay={i * 0.1}>
                            <div className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${planet.color} w-fit mb-4`}>
                                    <planet.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-ink-900 mb-2">{planet.name}</h3>
                                <p className="text-sm text-ink-500 leading-relaxed mb-3">{planet.description}</p>
                                <div className="space-y-2">
                                    <div className="bg-green-50 rounded-lg p-2">
                                        <p className="text-xs text-green-700">âœ… {planet.positive}</p>
                                    </div>
                                    <div className="bg-red-50 rounded-lg p-2">
                                        <p className="text-xs text-red-700">âš ï¸ {planet.negative}</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HOUSE OF FRIENDSHIP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HouseOfFriendship() {
    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Astrological House"
                        title="Which Is The House Of Friendship In Astrology?"
                        subtitle="The 11th house holds the key to understanding how you connect with people"
                    />
                </Reveal>

                <div className="mt-8 w-full">
                    <Reveal delay={0.1}>
                        <div className="bg-ink-50 rounded-2xl p-8 border border-ink-100 w-full">
                            <p className="text-ink-700 leading-relaxed">
                                The <span className="font-semibold text-primary-600">11th house</span> in your birth chart, 
                                often called the house of gains and friendships, holds the key to understanding how you 
                                connect with people, the kind of friends you attract, and how these relationships influence 
                                your growth and happiness.
                            </p>
                            
                            <div className="mt-4 grid md:grid-cols-2 gap-4">
                                <div className="bg-white rounded-xl p-4 border border-ink-100">
                                    <h4 className="text-sm font-bold text-ink-900 mb-2">Benefic Planets (Jupiter, Venus, Moon)</h4>
                                    <p className="text-sm text-ink-600">Naturally attract supportive, well-meaning people who lift you up.</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-ink-100">
                                    <h4 className="text-sm font-bold text-ink-900 mb-2">Challenging Planets (Saturn, Mars, Rahu)</h4>
                                    <p className="text-sm text-ink-600">May come with roadblocks, delays, or lessons through misunderstandings.</p>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-accent-50 rounded-xl border border-accent-200">
                                <h4 className="text-sm font-bold text-ink-900 mb-2">Zodiac Signs on the 11th House</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    <div className="bg-white rounded-lg p-2 text-center">
                                        <span className="text-sm font-semibold text-red-500">ðŸ”¥ Fire Signs</span>
                                        <p className="text-xs text-ink-500">Energetic, go-getter friends</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-2 text-center">
                                        <span className="text-sm font-semibold text-green-600">ðŸŒ Earth Signs</span>
                                        <p className="text-xs text-ink-500">Practical, dependable friends</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-2 text-center">
                                        <span className="text-sm font-semibold text-blue-500">ðŸ’¨ Air Signs</span>
                                        <p className="text-xs text-ink-500">Diverse social scenes</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-2 text-center">
                                        <span className="text-sm font-semibold text-blue-600">ðŸ’§ Water Signs</span>
                                        <p className="text-xs text-ink-500">Emotionally rich friendships</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ BENEFITS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Benefits() {
    const benefits = [
        {
            icon: Star,
            title: 'Self-Awareness',
            description: 'Reflect on your behavior patterns and understand your strengths and limitations in friendships.'
        },
        {
            icon: Shield,
            title: 'Clarity Before Commitment',
            description: 'Get a heads-up on where you might clash and where you\'ll flow before investing too much.'
        },
        {
            icon: Heart,
            title: 'Conflict Resolution',
            description: 'Understand the "why" behind disagreements and approach conflicts with more empathy and patience.'
        },
        {
            icon: Zap,
            title: 'Better Communication',
            description: 'Learn to speak each other\'s language while staying true to your own communication style.'
        }
    ];

    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Benefits"
                        title="What are the Benefits of Using a Friendship Compatibility Calculator?"
                        subtitle="Gain meaningful insights into how you connect with people"
                    />
                </Reveal>

                <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
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

                <Reveal delay={0.4}>
                    <div className="mt-8 max-w-6xl mx-auto">
                        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-accent-200">
                            <p className="text-sm text-ink-700 text-center">
                                <span className="font-semibold">ðŸŒŸ Conclusion:</span> Friendship is a journey; it's not just 
                                about clicking instantly, but also about growing together. A friendship compatibility calculator 
                                won't solve everything, but it's a great first step toward conscious, connected friendships.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHY CHOOSE FRIENDSHIP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhyChooseFriendship() {
    const features = [
        {
            icon: Award,
            title: 'Accurate Analysis',
            description: 'Based on ancient numerology and Vedic astrology principles for precise compatibility assessment.'
        },
        {
            icon: Sparkles,
            title: 'Detailed Insights',
            description: 'Get comprehensive results with strengths, challenges, and personalized advice.'
        },
        {
            icon: Shield,
            title: 'Privacy Priority',
            description: 'All your inputs are kept confidential for safe and secure use.'
        },
        {
            icon: Zap,
            title: 'Instant Results',
            description: 'Get your friendship compatibility results immediately after entering your details.'
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Why Choose Us"
                        title="Why Use Jyotish AI's Friendship Compatibility Calculator?"
                        subtitle="Get accurate and detailed insights about your friendships"
                    />
                </Reveal>

                <div className="mt-8 grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, i) => (
                        <Reveal key={feature.title} delay={i * 0.1}>
                            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-accent-200 hover:shadow-lg transition-all">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-4">
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
                            <p className="text-lg font-semibold">Need Friendship Counseling?</p>
                            <p className="text-sm opacity-90 mt-1">
                                Consult a counselor for personalized guidance to repair and nurture your pure friendships.
                            </p>
                            <Button to="/consultations" variant="dark" size="lg" className="mt-4">
                                <Users className="h-4 w-4" />
                                Consult a Counselor
                            </Button>
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
                        <Handshake className="h-3 w-3" />
                        Find Your Bond
                    </Badge>
                </Reveal>

                <Reveal delay={0.1}>
                    <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        Ready to discover your <span className="gradient-text-light">friendship compatibility?</span>
                    </h2>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
                        Calculate your friendship compatibility now and find out if you and your friend are a perfect match.
                    </p>
                </Reveal>

                <Reveal delay={0.3}>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Button to="/friendship-calculator" variant="primary" size="lg">
                            <Handshake className="h-4 w-4" />
                            Calculate Now
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button to="/consultations" variant="dark" size="lg">
                            <Users className="h-4 w-4" />
                            Consult a Counselor
                        </Button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}