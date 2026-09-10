import { useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Plug, Webhook, Settings, BarChart3 } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/animations/Reveal';
import Button from '../components/ui/Button';

const partners = [
  { name: 'Stripe', color: '#635bff', logo: '/partners/stripe.png', desc: 'Global card payments with 135+ currencies, 3D Secure, and tokenization.', features: ['135+ currencies', '3D Secure 2.0', 'Card tokenization', 'Global reach'] },
  { name: 'Razorpay', color: '#0c2451', logo: '/partners/razorpay.png', desc: 'India\'s leading payment gateway with UPI, cards, net banking, and wallets.', features: ['UPI payments', '50+ net banking', 'All wallets', 'Indian market'] },
  { name: 'Cashfree', color: '#1a7fe0', logo: '/partners/cashfree.png', desc: 'High-success-rate gateway with instant payouts and bulk disbursements.', features: ['High success rate', 'Instant payouts', 'Bulk disbursals', 'UPI Autopay'] },
  { name: 'Adyen', color: '#0abf53', logo: '/partners/adyen.png', desc: 'Enterprise-grade global payments with unified commerce and point-of-sale.', features: ['Unified commerce', 'Global acquiring', 'POS integration', 'Enterprise SLA'] },
  { name: 'PayU', color: '#a6c814', logo: '/partners/payu.png', desc: 'Fast-growing gateway with strong presence in emerging markets.', features: ['Emerging markets', 'EMI options', 'BNPL support', 'Multi-currency'] },
  { name: 'BennuPay', color: '#ff6b35', logo: '/partners/bennupay.png', desc: 'Specialized gateway for high-risk verticals and cross-border payments.', features: ['High-risk support', 'Cross-border', 'Multi-currency', 'Chargeback tools'] },
  { name: 'Chargebee', color: '#1a1a1a', logo: '/partners/chargebee.png', desc: 'Subscription billing and recurring payment management platform.', features: ['Recurring billing', 'Dunning management', 'Subscription analytics', 'Trial management'] },
];

export default function Partners() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let position = 0;

    const scroll = () => {
      position -= 0.5;
      
      if (Math.abs(position) >= scrollContainer.scrollWidth / 2) {
        position = 0;
      }
      
      scrollContainer.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(scroll);
    };

    const pauseAnimation = () => {
      cancelAnimationFrame(animationId);
    };

    const resumeAnimation = () => {
      animationId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener('mouseenter', pauseAnimation);
    scrollContainer.addEventListener('mouseleave', resumeAnimation);

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', pauseAnimation);
      scrollContainer.removeEventListener('mouseleave', resumeAnimation);
    };
  }, []);

  const allPartners = [...partners, ...partners];

  return (
    <>
      <PageHero
        badge="Our Partners"
        title={<>7 gateways, <span className="gradient-text">one integration</span></>}
        subtitle="We've partnered with the world's leading payment gateways so you don't have to. Connect once and access them all."
      />

      {/* Animated Partners Marquee */}
      <section className="bg-white py-8 border-y border-ink-100">
        <div className="container-8xl">
          <div className="w-full overflow-hidden">
            <div className="relative">
              <div
                ref={scrollRef}
                className="flex items-center gap-12 whitespace-nowrap"
                style={{ willChange: 'transform' }}
              >
                {allPartners.map((partner, index) => (
                  <div
                    key={`${partner.name}-${index}`}
                    className="flex-shrink-0 transition-all duration-300 hover:scale-110"
                    style={{ minWidth: '140px' }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                        style={{ filter: 'brightness(0.6)' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <span className="text-sm font-medium text-ink-600 whitespace-nowrap">{partner.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Gateway Partners"
              title="The gateways we orchestrate"
              subtitle="Each gateway brings unique strengths. Our smart routing engine picks the best one for each transaction."
            />
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 0.1}>
                <div className="group h-full bg-ink-50 rounded-2xl p-8 border border-ink-100 hover:border-accent-300 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-white border border-ink-200 p-2 shrink-0">
                      <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-xl font-bold text-ink-900">{p.name}</h3>
                  </div>
                  <p className="text-sm text-ink-500 leading-relaxed mb-4">{p.desc}</p>
                  <ul className="space-y-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-ink-600">
                        <CheckCircle className="h-4 w-4 text-accent-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How Integration Works */}
      <section className="section-pad bg-ink-50">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="How It Works"
              title="One integration, every gateway"
              subtitle="We handle the complexity of multiple gateway integrations so you can focus on your business."
            />
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Plug, title: 'Connect', desc: 'Integrate with Jyotish using a single API call.' },
              { icon: Settings, title: 'Configure', desc: 'Enable the gateways you want from the dashboard.' },
              { icon: BarChart3, title: 'Route', desc: 'Our engine routes each payment to the best gateway.' },
              { icon: Webhook, title: 'Receive', desc: 'Get webhook notifications for every transaction.' },
            ].map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 mb-5">
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-ink-500">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-ink-950 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-500/10 blur-[120px] rounded-full" />
        <div className="relative container-8xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">
              Want to become a partner?
            </h2>
            <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
              We're always looking to expand our gateway network.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Button to="/contact" variant="primary" size="lg">Become a Partner <ArrowRight className="h-4 w-4" /></Button>
              <Button to="/services" variant="dark" size="lg">View Services</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}