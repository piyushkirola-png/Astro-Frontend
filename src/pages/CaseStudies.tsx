import { TrendingUp, Clock, Zap, ArrowRight, Quote } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/animations/Reveal";
import Button from "../components/ui/Button";

const caseStudies = [
  {
    company: "ShopKart",
    industry: "E-Commerce",
    logo: "SK",
    color: "from-violet-500 to-purple-600",
    challenge:
      "ShopKart was losing 15% of transactions to gateway failures and had no way to route payments intelligently across their 3 payment gateways.",
    solution:
      "Implemented Jyotish  AI's smart routing engine to automatically route each payment to the gateway with the highest success rate for that transaction profile.",
    results: [
      { metric: "12%", label: "Success rate improvement" },
      { metric: "40%", label: "Reduction in failed transactions" },
      { metric: "3x", label: "Faster checkout" },
    ],
    quote:
      "Jyotish  AI cut our integration time from weeks to hours. The smart routing alone improved our success rate by 12%.",
    author: "Rajesh Kumar, CTO",
  },
  {
    company: "PayFlow",
    industry: "SaaS Platform",
    logo: "PF",
    color: "from-blue-500 to-indigo-600",
    challenge:
      "PayFlow needed to expand to 7 new countries but their existing gateway only supported 2 currencies. Building separate integrations would take months.",
    solution:
      "Connected to Jyotish AI's single API and instantly gained access to 7 gateways supporting 180+ countries and multi-currency processing.",
    results: [
      { metric: "7", label: "New countries launched" },
      { metric: "2 weeks", label: "Integration time" },
      { metric: "0", label: "Code changes for new gateways" },
    ],
    quote:
      "The single API for 7 gateways is a game-changer. We added Adyen and Cashfree without touching our codebase.",
    author: "Sarah Chen, VP Engineering",
  },
  {
    company: "VendorHub",
    industry: "Marketplace",
    logo: "VH",
    color: "from-emerald-500 to-teal-600",
    challenge:
      "VendorHub spent 3 days each month reconciling settlements from 4 different gateways against their bank statements. The process was manual and error-prone.",
    solution:
      "Jyotish  AI's automated settlement reconciliation matched every transaction against bank records automatically, with a manual override for edge cases.",
    results: [
      { metric: "0 days", label: "Manual reconciliation" },
      { metric: "99.9%", label: "Auto-match rate" },
      { metric: "24h", label: "Settlement time" },
    ],
    quote:
      "Settlement reconciliation used to take 3 days. With Jyotish  AI, it's automated and real-time.",
    author: "Michael Okafor, Head of Finance",
  },
];

export default function CaseStudies() {
  return (
    <>
      <PageHero
        badge="Case Studies"
        title={
          <>
            Real results for{" "}
            <span className="gradient-text">real businesses</span>
          </>
        }
        subtitle="See how companies across industries transformed their payments with Jyotish  AI."
      />

      <section className="section-pad bg-white">
        <div className="container-8xl space-y-12">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.company} delay={i * 0.1}>
              <div className="bg-ink-50 rounded-3xl p-8 lg:p-12 border border-ink-100">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${cs.color} flex items-center justify-center text-white text-xl font-bold`}
                      >
                        {cs.logo}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-ink-900">
                          {cs.company}
                        </h3>
                        <p className="text-sm text-ink-500">{cs.industry}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {cs.results.map((r) => (
                        <div
                          key={r.label}
                          className="text-center p-3 rounded-xl bg-white border border-ink-100"
                        >
                          <div className="text-xl font-bold gradient-text">
                            {r.metric}
                          </div>
                          <div className="text-xs text-ink-500 mt-1">
                            {r.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:w-2/3 space-y-5">
                    <div>
                      <h4 className="text-sm font-semibold text-danger-600 uppercase tracking-wider mb-2">
                        Challenge
                      </h4>
                      <p className="text-ink-600 leading-relaxed">
                        {cs.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-2">
                        Solution
                      </h4>
                      <p className="text-ink-600 leading-relaxed">
                        {cs.solution}
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white border-l-4 border-accent-500">
                      <Quote className="h-5 w-5 text-accent-400 mb-2" />
                      <p className="text-ink-700 italic leading-relaxed">
                        "{cs.quote}"
                      </p>
                      <p className="text-sm text-ink-500 mt-3 font-medium">
                        {cs.author}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 bg-ink-950 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-500/10 blur-[120px] rounded-full" />
        <div className="relative container-8xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">
              Want to be our next success story?
            </h2>
            <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
              Let's talk about how Jyotish AI can transform your payments.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Button to="/contact" variant="primary" size="lg">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/pricing" variant="dark" size="lg">
                View Pricing
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
