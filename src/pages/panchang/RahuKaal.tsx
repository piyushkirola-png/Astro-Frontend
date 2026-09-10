import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    MapPin,
    Sun,
    Moon,
    Star,
    Sparkles,
    Heart,
    ChevronRight,
    Shield,
    CheckCircle,
    ArrowRight,
    Globe,
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
    ShoppingBag,
    Compass,
    Sunrise,
    Sunset,
    Cloud,
    Users,
    BookOpen,
    AlertTriangle,
    XCircle
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal from '../../components/animations/Reveal';

// City data
const cities = [
    { value: 'new-delhi', label: 'New Delhi, Delhi, India' },
    { value: 'mumbai', label: 'Mumbai, Maharashtra, India' },
    { value: 'bangalore', label: 'Bangalore, Karnataka, India' },
    { value: 'chennai', label: 'Chennai, Tamil Nadu, India' },
    { value: 'kolkata', label: 'Kolkata, West Bengal, India' },
    { value: 'hyderabad', label: 'Hyderabad, Telangana, India' },
    { value: 'ahmedabad', label: 'Ahmedabad, Gujarat, India' },
    { value: 'pune', label: 'Pune, Maharashtra, India' },
    { value: 'jaipur', label: 'Jaipur, Rajasthan, India' },
    { value: 'lucknow', label: 'Lucknow, Uttar Pradesh, India' }
];

// Rahu Kaal time slots by day
const rahuKaalSlots: { [key: string]: number } = {
    'Sunday': 8,
    'Monday': 2,
    'Tuesday': 7,
    'Wednesday': 5,
    'Thursday': 6,
    'Friday': 4,
    'Saturday': 3
};

// Sample rahu kaal data
const getRahuKaalData = (city: string) => {
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const date = today.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    
    // Calculate time slots based on sunrise/sunset
    const sunrise = '06:02 AM';
    const sunset = '06:33 PM';
    
    // Convert to minutes for calculation
    const getMinutes = (time: string) => {
        const [hours, minutes] = time.split(':');
        const [h, m] = [parseInt(hours), parseInt(minutes)];
        const isPM = time.includes('PM');
        let total = h * 60 + m;
        if (isPM && h !== 12) total += 720;
        if (!isPM && h === 12) total = 0 + m;
        return total;
    };
    
    const sunriseMinutes = getMinutes(sunrise);
    const sunsetMinutes = getMinutes(sunset);
    const totalMinutes = sunsetMinutes - sunriseMinutes;
    const slotDuration = Math.floor(totalMinutes / 8);
    
    // Generate slots
    const slots = [];
    for (let i = 0; i < 8; i++) {
        const start = sunriseMinutes + (i * slotDuration);
        const end = start + slotDuration;
        const startHour = Math.floor(start / 60);
        const startMin = start % 60;
        const endHour = Math.floor(end / 60);
        const endMin = end % 60;
        const startAmPm = startHour >= 12 ? 'PM' : 'AM';
        const endAmPm = endHour >= 12 ? 'PM' : 'AM';
        const startH = startHour > 12 ? startHour - 12 : startHour;
        const endH = endHour > 12 ? endHour - 12 : endHour;
        slots.push({
            slot: i + 1,
            start: `${String(startH || 12).padStart(2, '0')}:${String(startMin).padStart(2, '0')} ${startAmPm}`,
            end: `${String(endH || 12).padStart(2, '0')}:${String(endMin).padStart(2, '0')} ${endAmPm}`
        });
    }
    
    const rahuSlotIndex = rahuKaalSlots[dayName] || 5;
    const rahuSlot = slots[rahuSlotIndex - 1] || slots[4];
    
    return {
        date: date,
        city: city,
        day: dayName,
        sunrise: sunrise,
        sunset: sunset,
        moonrise: '03:55 AM',
        moonset: '05:26 PM',
        rahuKaal: `${rahuSlot.start} â€“ ${rahuSlot.end}`,
        tithi: 'Trayodashi',
        nakshatra: 'Ashlesha upto 05:25',
        yoga: 'Shiva',
        karana: 'Gar',
        paksha: 'Krishna',
        weekday: dayName,
        abhijeetMuhurat: '11:53:16 AM â€“ 12:43:18 PM',
        inauspiciousTimings: [
            { name: 'Rahu Kaal', time: `${rahuSlot.start} â€“ ${rahuSlot.end}` },
            { name: 'Yamaganda', time: '07:36:49 AM â€“ 09:10:38 AM' },
            { name: 'Gulika Kaal', time: '10:44:27 AM â€“ 12:18:17 PM' },
            { name: 'Kantaka / Mrityu', time: '03:25:55 PM â€“ 04:59:45 PM' },
            { name: 'Kaalvela / Ardhayaam', time: '06:02:59 AM â€“ 07:36:49 AM' },
            { name: 'Yamaghanta', time: '07:36:49 AM â€“ 09:10:38 AM' },
            { name: 'Kulika Kaal', time: '10:44:27 AM â€“ 12:18:17 PM' }
        ]
    };
};

export default function RahuKaal() {
    const [selectedCity, setSelectedCity] = useState('new-delhi');
    const [panchangData, setPanchangData] = useState(getRahuKaalData('New Delhi, Delhi, India'));

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const city = e.target.value;
        setSelectedCity(city);
        const cityLabel = cities.find(c => c.value === city)?.label || 'New Delhi, Delhi, India';
        setPanchangData(getRahuKaalData(cityLabel));
    };

    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* Rahu Kaal Display */}
            <RahuKaalDisplay 
                panchangData={panchangData}
                selectedCity={selectedCity}
                handleCityChange={handleCityChange}
                cities={cities}
            />

            {/* How to Calculate */}
            <HowToCalculate />

            {/* What to Avoid */}
            <WhatToAvoid />

            {/* Related Pages */}
            <RelatedPages />

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
                        <AlertTriangle className="h-3 w-3" />
                        Free Daily Tool
                    </Badge>
                </Reveal>

                <Reveal delay={0.1}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 mb-4">
                        Rahu Kaal Today
                    </h1>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="text-xl md:text-2xl font-semibold text-primary-600 mb-6">
                        Check Inauspicious Timings
                    </p>
                </Reveal>

                <Reveal delay={0.3}>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-base text-ink-600 leading-relaxed">
                            Rahu Kaal is a 90-minute period considered inauspicious in Vedic astrology. 
                            This time is governed by planet <span className="font-semibold text-primary-600">Rahu</span>, 
                            a shadow planet believed to create obstacles to new beginnings. Avoid starting new 
                            work during this period.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ RAHU KAAL DISPLAY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface RahuKaalDisplayProps {
    panchangData: any;
    selectedCity: string;
    handleCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    cities: { value: string; label: string }[];
}

function RahuKaalDisplay({ 
    panchangData, 
    selectedCity, 
    handleCityChange, 
    cities 
}: RahuKaalDisplayProps) {
    return (
        <section className="py-12 bg-white">
            <div className="container-8xl">
                <div className="max-w-4xl mx-auto">
                    <Reveal>
                        {/* City Selector */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-ink-700 mb-2">
                                Select Location
                            </label>
                            <div className="relative max-w-md">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                                <select
                                    value={selectedCity}
                                    onChange={handleCityChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-ink-50 border border-ink-200 text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-colors text-sm appearance-none"
                                >
                                    {cities.map((city) => (
                                        <option key={city.value} value={city.value}>{city.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-ink-50 to-primary-50 rounded-2xl p-6 md:p-8 border border-ink-100">
                            {/* Date & Location */}
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-ink-900">{panchangData.city}</h2>
                                <p className="text-sm text-ink-500">{panchangData.date}</p>
                            </div>

                            {/* Rahu Kaal Highlight */}
                            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border-2 border-red-200 mb-6 text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <AlertTriangle className="h-6 w-6 text-red-600" />
                                    <span className="text-lg font-bold text-red-700">Rahu Kaal</span>
                                </div>
                                <div className="text-2xl md:text-3xl font-bold text-red-700">
                                    {panchangData.rahuKaal}
                                </div>
                                <p className="text-sm text-red-600 mt-2 font-semibold">
                                    âš ï¸ Avoid starting new work during this period
                                </p>
                            </div>

                            {/* Sunrise/Sunset/Moonrise/Moonset */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-white rounded-xl p-4 text-center border border-ink-100">
                                    <Sunrise className="h-6 w-6 text-orange-500 mx-auto mb-1" />
                                    <div className="text-xs text-ink-500">Sunrise</div>
                                    <div className="text-sm font-bold text-ink-900">{panchangData.sunrise}</div>
                                </div>
                                <div className="bg-white rounded-xl p-4 text-center border border-ink-100">
                                    <Sunset className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                                    <div className="text-xs text-ink-500">Sunset</div>
                                    <div className="text-sm font-bold text-ink-900">{panchangData.sunset}</div>
                                </div>
                                <div className="bg-white rounded-xl p-4 text-center border border-ink-100">
                                    <Moon className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                                    <div className="text-xs text-ink-500">Moonrise</div>
                                    <div className="text-sm font-bold text-ink-900">{panchangData.moonrise}</div>
                                </div>
                                <div className="bg-white rounded-xl p-4 text-center border border-ink-100">
                                    <Moon className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                                    <div className="text-xs text-ink-500">Moonset</div>
                                    <div className="text-sm font-bold text-ink-900">{panchangData.moonset}</div>
                                </div>
                            </div>

                            {/* Panchang Details */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                                <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                                    <div className="text-xs text-ink-500">Tithi</div>
                                    <div className="text-sm font-bold text-ink-900">{panchangData.tithi}</div>
                                </div>
                                <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                                    <div className="text-xs text-ink-500">Nakshatra</div>
                                    <div className="text-sm font-bold text-ink-900">{panchangData.nakshatra}</div>
                                </div>
                                <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                                    <div className="text-xs text-ink-500">Yoga</div>
                                    <div className="text-sm font-bold text-ink-900">{panchangData.yoga}</div>
                                </div>
                                <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                                    <div className="text-xs text-ink-500">Karana</div>
                                    <div className="text-sm font-bold text-ink-900">{panchangData.karana}</div>
                                </div>
                                <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                                    <div className="text-xs text-ink-500">Paksha</div>
                                    <div className="text-sm font-bold text-ink-900">{panchangData.paksha}</div>
                                </div>
                                <div className="bg-white rounded-xl p-3 text-center border border-ink-100">
                                    <div className="text-xs text-ink-500">Weekday</div>
                                    <div className="text-sm font-bold text-ink-900">{panchangData.weekday}</div>
                                </div>
                            </div>

                            {/* Inauspicious Timings */}
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-ink-900 mb-3 flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                    Inauspicious Timings (Ashubha Muhurat)
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-2">
                                    {panchangData.inauspiciousTimings.map((timing: any, i: number) => (
                                        <div key={i} className={`rounded-lg p-3 border ${timing.name === 'Rahu Kaal' ? 'bg-red-100 border-red-300' : 'bg-red-50 border-red-200'}`}>
                                            <div className={`text-xs font-semibold ${timing.name === 'Rahu Kaal' ? 'text-red-800' : 'text-red-700'}`}>{timing.name}</div>
                                            <div className={`text-xs ${timing.name === 'Rahu Kaal' ? 'text-red-700 font-semibold' : 'text-red-600'}`}>{timing.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Abhijeet Muhurat */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                                <div className="flex items-center gap-2 mb-1">
                                    <Sparkles className="h-5 w-5 text-green-600" />
                                    <h4 className="text-sm font-bold text-green-700">âœ¨ Abhijeet Muhurat</h4>
                                </div>
                                <div className="text-sm font-semibold text-green-700">{panchangData.abhijeetMuhurat}</div>
                            </div>

                            {/* Footer */}
                            <div className="mt-4 text-center">
                                <p className="text-xs text-ink-400">Â© Astrotalk.com</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HOW TO CALCULATE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HowToCalculate() {
    const steps = [
        {
            number: 1,
            title: 'Know the exact timings of sunrise and sunset',
            description: 'Get the precise sunrise and sunset times for your location.'
        },
        {
            number: 2,
            title: 'Divide the total time span by 8',
            description: 'Calculate the duration between sunrise and sunset, then divide by 8 to get each slot duration.'
        },
        {
            number: 3,
            title: 'Choose the Rahu window as per the day',
            description: 'Each day of the week has a specific Rahu Kaal slot number.'
        },
        {
            number: 4,
            title: 'According to the day, the allocated time window is Rahu Kaal',
            description: 'The designated slot for that day becomes the Rahu Kaal period.'
        }
    ];

    const daySlots = [
        { day: 'Sunday', slot: '8th (just before sunset)' },
        { day: 'Monday', slot: '2nd (early morning)' },
        { day: 'Tuesday', slot: '7th (late afternoon)' },
        { day: 'Wednesday', slot: '5th (midday)' },
        { day: 'Thursday', slot: '6th (afternoon)' },
        { day: 'Friday', slot: '4th (late morning)' },
        { day: 'Saturday', slot: '3rd (mid morning)' }
    ];

    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="How to Calculate"
                        title="How to Calculate Rahu Kaal Today in My Location?"
                        subtitle="Discover how to calculate Rahu Kaal with these simple steps"
                    />
                </Reveal>

                <div className="mt-8 max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            {steps.map((step, i) => (
                                <Reveal key={i} delay={i * 0.1}>
                                    <div className="bg-white rounded-2xl p-4 border border-ink-100 mb-3 flex items-start gap-4 hover:border-accent-200 transition-all">
                                        <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 text-white text-sm font-bold flex items-center justify-center">
                                            {step.number}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-ink-900">{step.title}</h4>
                                            <p className="text-xs text-ink-500">{step.description}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        <div>
                            <Reveal delay={0.3}>
                                <div className="bg-white rounded-2xl p-6 border border-ink-100">
                                    <h3 className="text-lg font-bold text-ink-900 mb-4 text-center">Rahu Kaal Time Window</h3>
                                    <div className="space-y-2">
                                        {daySlots.map((item) => (
                                            <div key={item.day} className="flex justify-between items-center p-2 bg-ink-50 rounded-lg">
                                                <span className="text-sm font-semibold text-ink-900">{item.day}</span>
                                                <span className="text-xs text-primary-600">{item.slot}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={0.4}>
                                <div className="mt-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-4 border border-accent-200">
                                    <h4 className="text-sm font-bold text-ink-900 mb-2">ðŸ“ Example</h4>
                                    <div className="text-sm text-ink-600 space-y-1">
                                        <p><span className="font-semibold">Sunrise:</span> 5:35 AM</p>
                                        <p><span className="font-semibold">Sunset:</span> 6:15 PM</p>
                                        <p><span className="font-semibold">Total time:</span> 760 minutes</p>
                                        <p><span className="font-semibold">Slot duration:</span> 95 minutes</p>
                                        <p><span className="font-semibold">Day:</span> Monday â†’ 2nd slot</p>
                                        <div className="mt-2 p-2 bg-white rounded-lg border border-ink-100">
                                            <p className="font-bold text-primary-600">Rahu Kaal: 7:10 AM â€“ 8:45 AM</p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WHAT TO AVOID â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function WhatToAvoid() {
    const avoidItems = [
        {
            icon: Briefcase,
            title: 'New Projects & Contracts',
            description: 'Avoid planning new projects or signing contracts'
        },
        {
            icon: Home,
            title: 'Key Events',
            description: 'Avoid Graha Pravesh, marriage, interviews, or meetings'
        },
        {
            icon: Compass,
            title: 'Travel',
            description: 'Avoid planning travels, especially long-distance journeys'
        },
        {
            icon: TrendingUp,
            title: 'Financial Decisions',
            description: 'Avoid investing, lending money, or making financial commitments'
        },
        {
            icon: ShoppingBag,
            title: 'New Purchases',
            description: 'Avoid purchasing jewellery, electronics, property, or vehicles'
        },
        {
            icon: Activity,
            title: 'Medical Procedures',
            description: 'Avoid going for surgical or medical treatments'
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="What to Avoid"
                        title="What to Avoid During Rahu Kaal?"
                        subtitle="During Rahu Kalam, one should avoid key events such as starting a new venture"
                    />
                </Reveal>

                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {avoidItems.map((item, i) => (
                        <Reveal key={item.title} delay={i * 0.1}>
                            <div className="bg-ink-50 rounded-2xl p-6 border border-ink-100 hover:border-red-200 hover:shadow-lg transition-all">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 w-fit mb-4">
                                    <item.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-ink-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-ink-500 leading-relaxed">{item.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.4}>
                    <div className="mt-8 max-w-6xl mx-auto">
                        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border border-red-200">
                            <p className="text-sm text-ink-700 text-center">
                                <span className="font-semibold">ðŸ’¡ Note:</span> Rahu Kaal is not a caution or danger zone 
                                where you cannot resume your daily activities, but a period to <span className="font-semibold text-red-600">avoid new beginnings or key events</span>.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ RELATED PAGES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function RelatedPages() {
    const relatedPages = [
        { name: 'Today Panchang', icon: Calendar, link: '/today-panchang' },
        { name: 'Tomorrow Panchang', icon: Calendar, link: '/tomorrow-panchang' },
        { name: 'Daily Horoscope', icon: Star, link: '/horoscope' },
        { name: 'Tithi', icon: Moon, link: '/tithi' },
        { name: 'Vaar', icon: Calendar, link: '/vaar' },
        { name: 'Yoga', icon: Activity, link: '/yoga' },
        { name: 'Karana', icon: Clock, link: '/karana' },
        { name: 'Hora', icon: Sun, link: '/hora' },
        { name: 'Choghadiya', icon: Compass, link: '/choghadiya' }
    ];

    return (
        <section className="py-16 bg-ink-50">
            <div className="container-8xl">
                <Reveal>
                    <SectionHeading
                        badge="Related Pages"
                        title="Explore More Panchang Tools"
                        subtitle="Discover other aspects of the Vedic calendar"
                    />
                </Reveal>

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-3 max-w-6xl mx-auto">
                    {relatedPages.map((page, i) => (
                        <Reveal key={page.name} delay={i * 0.05}>
                            <Button 
                                to={page.link} 
                                variant="outline" 
                                size="sm" 
                                className="w-full text-center"
                            >
                                <page.icon className="h-3 w-3 mx-auto mb-1" />
                                <span className="text-[10px]">{page.name}</span>
                            </Button>
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
                        <AlertTriangle className="h-3 w-3" />
                        Check Today
                    </Badge>
                </Reveal>

                <Reveal delay={0.1}>
                    <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        Know Today's <span className="gradient-text-light">Rahu Kaal</span>
                    </h2>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
                        Check Rahu Kaal timings for your location and plan your day accordingly.
                    </p>
                </Reveal>

                <Reveal delay={0.3}>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Button to="/rahu-kaal" variant="primary" size="lg">
                            <AlertTriangle className="h-4 w-4" />
                            Check Rahu Kaal
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