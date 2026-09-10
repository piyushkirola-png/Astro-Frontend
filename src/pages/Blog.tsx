import { Calendar, Clock, Star, Heart, Users, TrendingUp, Activity, Home, Briefcase, Baby, Moon, Sun, Compass, Sparkles, ArrowRight, BookOpen, MessageSquare, Share2, Eye } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/animations/Reveal';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import React, { useState } from 'react';

const blogPosts = [
  {
    category: 'Vedic Astrology',
    title: 'Understanding Your Birth Chart: A Beginner\'s Guide',
    excerpt: 'Learn the basics of Janam Kundli, including houses, planets, and signs. Discover how your birth chart influences your personality and life path.',
    author: 'Pt. Rajesh Sharma',
    date: '15 Dec 2025',
    readTime: '8 min read',
    image: 'â­',
    slug: 'understanding-birth-chart',
    featured: true
  },
  {
    category: 'Numerology',
    title: 'What Your Destiny Number Reveals About Your Life Purpose',
    excerpt: 'Discover how your Destiny Number (Bhagyank) can reveal your life\'s purpose, natural talents, and the path you are meant to follow.',
    author: 'Dr. Priya Singh',
    date: '10 Dec 2025',
    readTime: '6 min read',
    image: 'ðŸ”¢',
    slug: 'destiny-number-life-purpose',
    featured: false
  },
  {
    category: 'Sade Sati',
    title: 'Surviving Sade Sati: 7 Practical Tips for Saturn\'s Transit',
    excerpt: 'Sade Sati is a 7.5-year period of Saturn\'s transit. Learn practical tips and remedies to navigate this challenging yet transformative phase.',
    author: 'Maa Shanti Devi',
    date: '5 Dec 2025',
    readTime: '10 min read',
    image: 'ðŸª',
    slug: 'surviving-sade-sati-tips',
    featured: false
  },
  {
    category: 'Love & Compatibility',
    title: 'Love Compatibility: How Zodiac Signs Match in Relationships',
    excerpt: 'Explore how different zodiac signs interact in relationships. Find out which signs are most compatible with yours for love and marriage.',
    author: 'Prof. Amit Kumar',
    date: '28 Nov 2025',
    readTime: '7 min read',
    image: 'â¤ï¸',
    slug: 'zodiac-love-compatibility',
    featured: false
  },
  {
    category: 'Kundali Matching',
    title: 'Kundli Milan: A Complete Guide to Marriage Compatibility',
    excerpt: 'Understand the Ashtakoota Guna Milan system for marriage compatibility. Learn about the 8 Kootas and what they mean for your relationship.',
    author: 'Pt. Rajesh Sharma',
    date: '20 Nov 2025',
    readTime: '12 min read',
    image: 'ðŸ’‘',
    slug: 'kundli-milan-guide',
    featured: true
  },
  {
    category: 'Panchang',
    title: 'How to Use Panchang Daily for Better Decision Making',
    excerpt: 'Learn how to read the Panchang and use it for planning important activities like weddings, business launches, and travel.',
    author: 'Dr. Priya Singh',
    date: '15 Nov 2025',
    readTime: '5 min read',
    image: 'ðŸ“…',
    slug: 'daily-panchang-guide',
    featured: false
  },
  {
    category: 'Vedic Astrology',
    title: 'The 12 Houses in Astrology and Their Significance',
    excerpt: 'Each of the 12 houses in your birth chart represents different areas of life. Learn what each house means and how it affects you.',
    author: 'Prof. Amit Kumar',
    date: '10 Nov 2025',
    readTime: '9 min read',
    image: 'ðŸ ',
    slug: '12-houses-astrology',
    featured: false
  },
  {
    category: 'Remedies',
    title: 'Top 5 Gemstones for Astrological Remedies and Their Benefits',
    excerpt: 'Discover the most powerful gemstones used in Vedic astrology for planetary remedies and their healing properties.',
    author: 'Maa Shanti Devi',
    date: '5 Nov 2025',
    readTime: '6 min read',
    image: 'ðŸ’Ž',
    slug: 'gemstones-astrological-remedies',
    featured: false
  },
  {
    category: 'Numerology',
    title: 'How to Calculate Your Personality Number and What It Means',
    excerpt: 'Your Personality Number reveals how others perceive you. Learn how to calculate it and what it says about your outer personality.',
    author: 'Dr. Priya Singh',
    date: '28 Oct 2025',
    readTime: '4 min read',
    image: 'ðŸ§®',
    slug: 'personality-number-guide',
    featured: false
  },
];

const categories = [
  'All',
  'Vedic Astrology',
  'Numerology',
  'Sade Sati',
  'Love & Compatibility',
  'Kundali Matching',
  'Panchang',
  'Remedies'
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <>
      <PageHero
        badge="Blog"
        title={<>Explore <span className="gradient-text">Cosmic Wisdom</span></>}
        subtitle="Insights, guides, and articles on Vedic astrology, numerology, and spiritual living."
      />

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-8xl">
            <Reveal>
              <SectionHeading
                badge="Featured Articles"
                title="Must-Read Guides"
                subtitle="Handpicked articles to deepen your understanding of astrology"
              />
            </Reveal>
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.1}>
                  <div className="group h-full bg-ink-50 rounded-2xl p-8 border border-ink-100 hover:border-accent-300 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="text-4xl mb-4">{post.image}</div>
                    <Badge className="mb-3">{post.category}</Badge>
                    <h3 className="text-xl font-bold text-ink-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-ink-500 leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-ink-400">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-ink-600">{post.author}</span>
                        <span>â€¢</span>
                        <span>{post.date}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <Button to={`/blog/${post.slug}`} variant="outline" size="sm" className="mt-4">
                      Read More <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="section-pad bg-ink-50">
        <div className="container-8xl">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <SectionHeading
                badge="All Articles"
                title="Latest Insights"
                subtitle="Discover wisdom from our expert astrologers"
                align="left"
              />
            </div>
          </Reveal>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                  ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg'
                  : 'bg-white text-ink-600 hover:bg-ink-100 border border-ink-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                <div className="group h-full bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-3">{post.image}</div>
                  <Badge className="mb-2 text-xs">{post.category}</Badge>
                  <h3 className="text-base font-bold text-ink-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-ink-400">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-ink-600">{post.author}</span>
                      <span>â€¢</span>
                      <span>{post.date}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <Button to={`/blog/${post.slug}`} variant="outline" size="sm" className="mt-3">
                    Read More <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-ink-500">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Quick Links */}
      <section className="section-pad bg-white">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Explore Topics"
              title="Browse by Category"
              subtitle="Find articles that interest you"
            />
          </Reveal>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {categories.slice(1).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="p-4 rounded-2xl bg-ink-50 border border-ink-100 hover:border-accent-200 hover:bg-white hover:shadow-md transition-all text-center"
              >
                <span className="text-sm font-medium text-ink-900">{category}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-ink-50">
        <div className="container-8xl max-w-2xl">
          <Reveal>
            <div className="bg-white rounded-3xl p-8 border border-ink-100 text-center">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-ink-900">Subscribe to Our Newsletter</h3>
              <p className="text-ink-500 mt-2">
                Get weekly astrological insights, guides, and cosmic wisdom delivered to your inbox.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border border-ink-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                />
                <Button variant="primary" className="sm:shrink-0">
                  Subscribe <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-ink-400 mt-3">No spam. Unsubscribe anytime.</p>
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
              Learn More
            </Badge>
            <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">
              Ready to explore your <span className="gradient-text-light">cosmic path?</span>
            </h2>
            <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
              Read our blog articles and start your journey of self-discovery today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/free-kundali" variant="primary" size="lg">
                <Star className="h-4 w-4" />
                Get Free Kundali
              </Button>
              <Button to="/consultations" variant="dark" size="lg">
                <MessageSquare className="h-4 w-4" />
                Consult an Astrologer
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}