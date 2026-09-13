import {
  Building2,
  Globe,
  Users,
  CreditCard,
  ShieldCheck,
  Zap,
  ShoppingCart,
  Cloud,
  Stethoscope,
  Truck,
  Gamepad2,
  GraduationCap,
} from "lucide-react";
import PageHero from "../../components/ui/PageHero";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/animations/Reveal";
import Button from "../../components/ui/Button";

const industries = [
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    desc: "Optimize checkout conversion with smart routing, multiple payment methods, and instant refunds.",
    features: [
      "Drop-in checkout",
      "Smart routing",
      "Instant refunds",
      "Cart recovery",
    ],
  },
  {
    icon: Cloud,
    title: "SaaS & Subscriptions",
    desc: "Recurring billing, dunning management, and multi-currency support for subscription businesses.",
    features: [
      "Recurring billing",
      "Dunning automation",
      "Multi-currency",
      "Trial management",
    ],
  },
  {
    icon: Users,
    title: "Marketplaces",
    desc: "Split payments, vendor payouts, and escrow for multi-party platforms.",
    features: [
      "Split payments",
      "Vendor payouts",
      "Escrow accounts",
      "KYC for sellers",
    ],
  },
  {
    icon: CreditCard,
    title: "Fintech",
    desc: "Embedded payments, virtual accounts, and white-label solutions for fintech apps.",
    features: [
      "Embedded payments",
      "Virtual accounts",
      "White-label",
      "Bank-grade security",
    ],
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    desc: "HIPAA-compliant payment processing with patient-friendly checkout and insurance integration.",
    features: [
      "HIPAA compliant",
      "Patient payments",
      "Insurance integration",
      "Recurring billing",
    ],
  },
  {
    icon: Truck,
    title: "On-Demand & Logistics",
    desc: "Instant payouts for gig workers, delivery partners, and ride-hailing platforms.",
    features: [
      "Instant payouts",
      "Bulk disbursements",
      "Driver wallets",
      "Real-time tracking",
    ],
  },
  {
    icon: Gamepad2,
    title: "Gaming",
    desc: "High-throughput payment processing for in-game purchases and micro-transactions.",
    features: [
      "High throughput",
      "Micro-transactions",
      "Fraud prevention",
      "Global payments",
    ],
  },
  {
    icon: GraduationCap,
    title: "EdTech",
    desc: "Fee collection, installment plans, and scholarship disbursements for educational institutions.",
    features: [
      "Fee collection",
      "Installments",
      "Scholarship payouts",
      "Multi-campus",
    ],
  },
];

export default function Industries() {
  return (
    <>
      <PageHero
        badge="Industries"
        title={
          <>
            Built for <span className="gradient-text">every industry</span>
          </>
        }
        subtitle="From e-commerce to healthcare, Jyotish adapts to your industry's unique payment needs."
      />

      <section className="section-pad bg-white">
        <div className="container-8xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, i) => (
              <Reveal key={ind.title} delay={(i % 4) * 0.08}>
                <div className="group h-full bg-ink-50 rounded-2xl p-7 border border-ink-100 hover:border-accent-300 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 w-fit mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <ind.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-2">
                    {ind.title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed mb-4">
                    {ind.desc}
                  </p>
                  <ul className="space-y-1.5">
                    {ind.features.map((f) => (
                      <li
                        key={f}
                        className="text-xs text-ink-600 flex items-center gap-1.5"
                      >
                        <span className="h-1 w-1 rounded-full bg-accent-500" />
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

      <section className="py-20 bg-ink-950 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-500/10 blur-[120px] rounded-full" />
        <div className="relative container-8xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">
              Don't see your industry?
            </h2>
            <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
              We work with businesses of all types. Talk to us about your
              specific needs.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Button to="/contact" variant="primary" size="lg">
                Talk to Us
              </Button>
              <Button to="/solutions" variant="dark" size="lg">
                View Solutions
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
