import { CreditCard, Zap, Wallet, Globe, CheckCircle, ArrowRight, Smartphone, Landmark, Building } from 'lucide-react';
import PageHero from '../../components/ui/PageHero';
import SectionHeading from '../../components/ui/SectionHeading';
import Reveal from '../../components/animations/Reveal';
import Button from '../../components/ui/Button';

const paymentMethods = [
  { icon: Zap, title: 'UPI', desc: 'UPI Intent, Collect, and QR â€” the fastest-growing payment method in India.', color: 'from-violet-500 to-purple-600' },
  { icon: CreditCard, title: 'Cards', desc: 'Credit, debit, prepaid, RuPay, Visa, Mastercard, Amex, and international cards.', color: 'from-blue-500 to-indigo-600' },
  { icon: Landmark, title: 'Net Banking', desc: '50+ banks supported with instant confirmation and real-time status updates.', color: 'from-emerald-500 to-teal-600' },
  { icon: Wallet, title: 'Wallets', desc: 'Paytm, PhonePe, Amazon Pay, Mobikwik, and all major wallets.', color: 'from-orange-500 to-red-600' },
  { icon: Smartphone, title: 'Mobile Payments', desc: 'Google Pay, PhonePe, Paytm, and all BHIM UPI apps.', color: 'from-cyan-500 to-blue-600' },
  { icon: Globe, title: 'International', desc: 'Accept payments in 180+ countries with multi-currency support.', color: 'from-rose-500 to-pink-600' },
];

const features = [
  'Drop-in checkout that works on web and mobile',
  'Server-to-server API for full custom checkout',
  'Tokenization for recurring and saved cards',
  '3D Secure / 2FA support for all card payments',
  'Smart retry logic for failed transactions',
  'Multi-gateway routing for maximum success rates',
  'Real-time payment status via webhooks',
  'Full refund and partial refund APIs',
];

export default function PaymentGateway() {
  return (
    <>
      <PageHero
        badge="Payment Gateway"
        title={<>Accept payments <span className="gradient-text">every way</span>, everywhere</>}
        subtitle="One integration to UPI, cards, net banking, wallets, and international payments. Smart routing across 7+ gateways ensures the highest success rates."
      />

      {/* Payment Methods */}
      <section className="section-pad bg-white">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Payment Methods"
              title="Every method your customers use"
              subtitle="Support all major payment methods through a single integration â€” no need to connect each gateway separately."
            />
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentMethods.map((method, i) => (
              <Reveal key={method.title} delay={(i % 3) * 0.1}>
                <div className="group h-full bg-ink-50 rounded-2xl p-8 border border-ink-100 hover:border-accent-300 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${method.color} w-fit mb-5 group-hover:scale-110 transition-transform`}>
                    <method.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-2">{method.title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed">{method.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-pad bg-ink-50">
        <div className="container-8xl grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <SectionHeading
                badge="Gateway Features"
                align="left"
                title="Built for maximum conversion"
                subtitle="Every feature is designed to reduce friction and increase success rates at checkout."
              />
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <CheckCircle className="h-5 w-5 text-accent-500 shrink-0 mt-0.5" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button to="/api-docs" variant="primary" size="lg">
                  View API Docs <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-3xl blur-xl" />
              <div className="relative glass-card rounded-3xl p-8">
                <div className="mb-6">
                  <div className="text-xs font-mono text-ink-400 mb-2">POST /v1/payments</div>
                  <div className="h-px bg-ink-100" />
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between"><span className="text-ink-500">amount</span><span className="text-accent-600">1000</span></div>
                  <div className="flex justify-between"><span className="text-ink-500">currency</span><span className="text-success-600">INR</span></div>
                  <div className="flex justify-between"><span className="text-ink-500">method</span><span className="text-success-600">upi</span></div>
                  <div className="flex justify-between"><span className="text-ink-500">gateway</span><span className="text-success-600">auto</span></div>
                  <div className="flex justify-between"><span className="text-ink-500">customer_id</span><span className="text-accent-600">cust_123</span></div>
                </div>
                <div className="mt-6 p-3 rounded-xl bg-accent-50 border border-accent-200">
                  <div className="flex items-center gap-2 text-accent-700">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-xs font-semibold">200 OK â€” Payment Created</span>
                  </div>
                  <div className="text-xs text-ink-500 mt-1 font-mono">Routed to Razorpay Â· Success rate: 98.7%</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-ink-950 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-500/10 blur-[120px] rounded-full" />
        <div className="relative container-8xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">
              Start accepting payments today
            </h2>
            <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
              Get your API keys and go live in under 48 hours.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Button to="/signup" variant="primary" size="lg">Get Started Free</Button>
              <Button to="/contact" variant="dark" size="lg">Contact Sales</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
