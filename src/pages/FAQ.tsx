import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Star, Users, Clock, Heart, Sparkles } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/animations/Reveal';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const faqCategories = [
  {
    category: 'Kundali & Horoscope',
    questions: [
      { q: 'How do I generate my free Kundali?', a: 'Simply enter your birth details (name, gender, date, time, and place of birth) in our Free Kundali tool. Your complete Janam Kundli with planetary positions, houses, and doshas will be generated instantly.' },
      { q: 'Is the Kundali generation really free?', a: 'Yes! Our Kundali generation tool is completely free with no hidden charges. You get a detailed birth chart with planetary positions, houses, nakshatras, and doshas.' },
      { q: 'What information do I need for Kundali matching?', a: 'You need the birth details (date, time, place) of both partners. Our Kundali Matching tool analyzes compatibility using the Ashtakoota Guna Milan system and Mangal Dosha analysis.' },
      { q: 'What is the difference between Lagna and Moon sign?', a: 'Lagna (Ascendant) is the zodiac sign rising on the eastern horizon at your birth time. Moon sign is the zodiac sign where the Moon was placed at your birth. Both are important in Vedic astrology.' },
    ],
  },
  {
    category: 'Numerology',
    questions: [
      { q: 'What is the Destiny Number?', a: 'Your Destiny Number (also called Bhagyank) reveals your life\'s purpose, natural talents, and spiritual path. It is calculated from your full birth name using the Pythagorean numerology system.' },
      { q: 'What is Mulank and how is it calculated?', a: 'Mulank is your foundation number calculated from your birth date. Simply add the digits of your birth date until you get a single number (1-9). For example, if born on 15th, 1+5=6, so Mulank is 6.' },
      { q: 'How do I calculate my Personality Number?', a: 'Your Personality Number is calculated by adding the consonant values in your name. It represents how others perceive you and your outer personality.' },
      { q: 'What is the Soul Urge Number?', a: 'Your Soul Urge Number (Heart Desire Number) is calculated from the vowels in your name. It reveals what your soul craves and what truly motivates you at a deeper level.' },
    ],
  },
  {
    category: 'Sade Sati & Kaal Sarp Dosh',
    questions: [
      { q: 'What is Sade Sati and when does it occur?', a: 'Sade Sati is a 7.5-year period when Saturn transits through your Moon sign and the signs before and after it. It occurs 2-3 times in a lifetime and brings deep lessons, challenges, and growth.' },
      { q: 'How do I check if I have Kaal Sarp Dosh?', a: 'Use our Kaal Sarp Dosh Calculator by entering your birth details. It checks if all seven planets are positioned between Rahu and Ketu in your birth chart.' },
      { q: 'What are the remedies for Kaal Sarp Dosh?', a: 'Common remedies include Rudrabhishek puja, visiting Trimbakeshwar or Kalahasti temples, chanting mantras, feeding birds, and wearing gemstones after consulting an astrologer.' },
      { q: 'Is Sade Sati always negative?', a: 'No. Sade Sati is a period of transformation and growth. While it can bring challenges, it also offers opportunities for spiritual development, career advancement, and personal strength.' },
    ],
  },
  {
    category: 'Love & Compatibility',
    questions: [
      { q: 'How accurate is the Love Calculator?', a: 'Our Love Calculator uses name numerology and birth date analysis to estimate compatibility. While it\'s fun and insightful, for serious relationships we recommend Kundali Matching.' },
      { q: 'What is Kundali Matching?', a: 'Kundali Matching (Kundli Milan) is a Vedic astrology method that assesses marriage compatibility between two people using the Ashtakoota Guna Milan system, analyzing 36 points across 8 categories.' },
      { q: 'What is a good Guna Milan score?', a: '18+ points is acceptable, 24+ points indicates good compatibility, and 30+ points is considered excellent for marriage.' },
      { q: 'Can Manglik and non-Manglik marry?', a: 'Yes, with proper remedies and chart compatibility. Many couples with Mangal Dosha have successful marriages with the right guidance and remedies.' },
    ],
  },
  {
    category: 'Panchang & Muhurat',
    questions: [
      { q: 'What is Panchang?', a: 'Panchang is a Vedic daily calendar derived from the Sanskrit words "panch" (five) and "ang" (limbs). It considers five elements: Tithi, Vaar, Nakshatra, Yoga, and Karana to determine daily cosmic energy.' },
      { q: 'What is Rahu Kaal?', a: 'Rahu Kaal is a 90-minute period considered inauspicious for starting new work. It is governed by planet Rahu and varies each day based on sunrise and sunset timings.' },
      { q: 'What is Abhijit Muhurat?', a: 'Abhijit Muhurat is the 8th muhurat of the day, associated with victory and success. It occurs around midday (approximately 48-56 minutes) and is considered highly auspicious for new beginnings.' },
      { q: 'How do I find Shubh Muhurat?', a: 'Use our Shubh Muhurat tool to find auspicious timings for important events like marriage, housewarming, business launch, and naming ceremonies based on Tithi, Nakshatra, and Yoga.' },
    ],
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('0-0');
  const [search, setSearch] = useState('');

  const filtered = faqCategories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      q => q.q.toLowerCase().includes(search.toLowerCase()) || q.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => cat.questions.length > 0);

  return (
    <>
      <PageHero
        badge="FAQ"
        title={<>Frequently asked <span className="gradient-text">questions</span></>}
        subtitle="Everything you need to know about Jyotish AI's astrology tools and services. Can't find an answer? Reach out to our team."
      />

      {/* Search */}
      <section className="py-12 bg-white border-b border-ink-100">
        <div className="container-8xl max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-ink-50 border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-400/20 transition-all"
              placeholder="Search questions..."
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="section-pad bg-ink-50">
        <div className="container-8xl max-w-3xl space-y-12">
          {filtered.map((cat, catIdx) => (
            <div key={cat.category}>
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500">
                    <HelpCircle className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-ink-900">{cat.category}</h2>
                </div>
              </Reveal>
              <div className="space-y-3">
                {cat.questions.map((faq, qIdx) => {
                  const id = `${catIdx}-${qIdx}`;
                  return (
                    <Reveal key={id} delay={qIdx * 0.05}>
                      <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden hover:border-accent-200 transition-all">
                        <button
                          onClick={() => setOpenId(openId === id ? null : id)}
                          className="w-full flex items-center justify-between p-6 text-left"
                        >
                          <span className="font-semibold text-ink-900">{faq.q}</span>
                          <ChevronDown
                            className={`h-5 w-5 text-ink-400 shrink-0 transition-transform duration-300 ${openId === id ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <motion.div
                          initial={false}
                          animate={{ height: openId === id ? 'auto' : 0, opacity: openId === id ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-ink-500 leading-relaxed">{faq.a}</p>
                        </motion.div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-ink-500">No results found. Try a different search term.</p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="container-8xl max-w-4xl">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-2xl bg-ink-50 border border-ink-100 hover:border-accent-200 transition-all">
              <Star className="h-6 w-6 text-primary-600 mx-auto mb-2" />
              <div className="text-sm font-bold text-ink-900">Free Kundali</div>
              <div className="text-xs text-ink-500">Generate now</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-ink-50 border border-ink-100 hover:border-accent-200 transition-all">
              <Heart className="h-6 w-6 text-accent-600 mx-auto mb-2" />
              <div className="text-sm font-bold text-ink-900">Love Calculator</div>
              <div className="text-xs text-ink-500">Check compatibility</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-ink-50 border border-ink-100 hover:border-accent-200 transition-all">
              <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-sm font-bold text-ink-900">Today Panchang</div>
              <div className="text-xs text-ink-500">Daily cosmic update</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-ink-50 border border-ink-100 hover:border-accent-200 transition-all">
              <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-sm font-bold text-ink-900">Consult Expert</div>
              <div className="text-xs text-ink-500">Talk to astrologer</div>
            </div>
          </div>
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
              Still Have Questions?
            </Badge>
            <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">
              Need <span className="gradient-text-light">Personal Guidance?</span>
            </h2>
            <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
              Our expert astrologers are here to help with personalized insights and guidance.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Button to="/consultations" variant="primary" size="lg">
                <Users className="h-4 w-4" />
                Consult an Astrologer
              </Button>
              <Button to="/contact" variant="dark" size="lg">
                <HelpCircle className="h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}