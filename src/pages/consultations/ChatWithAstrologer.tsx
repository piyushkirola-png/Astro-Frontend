import {
  Zap,
  CheckCircle,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Clock,
  Layers,
  Smartphone,
  Repeat,
  Webhook,
} from "lucide-react";
import PageHero from "../../components/ui/PageHero";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/animations/Reveal";
import Button from "../../components/ui/Button";

/* ---------- UPI methods ---------- */
const upiMethods = [
  {
    icon: Smartphone,
    title: "UPI Intent",
    desc: "Deep-link straight into the customer's preferred UPI app — GPay, PhonePe, Paytm, BHIM and more — for one-tap payment.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Zap,
    title: "UPI Collect",
    desc: "Send a collect request to the customer's VPA. They approve it in their UPI app — ideal for invoices and repeat customers.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: QrCode,
    title: "UPI QR",
    desc: "Generate a dynamic QR for any amount. Customers scan and pay from any UPI app — perfect for in-person and desktop checkout.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Repeat,
    title: "UPI AutoPay",
    desc: "Set up recurring mandates for subscriptions and EMI collections, fully compliant with NPCI AutoPay guidelines.",
    color: "from-orange-500 to-red-600",
  },
];

/* ---------- Why UPI on our gateway ---------- */
const benefits = [
  {
    icon: Layers,
    title: "Multi-gateway routing",
    desc: "We route each UPI transaction across multiple partner PSPs in real time — automatically choosing the path most likely to succeed.",
  },
  {
    icon: RefreshCw,
    title: "Smart retries",
    desc: "Failed or pending UPI transactions are retried intelligently on alternate rails before ever being marked as failed.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-grade security",
    desc: "All UPI flows are PCI-DSS aligned, encrypted end-to-end, and verified with NPCI-compliant signatures.",
  },
  {
    icon: Clock,
    title: "Real-time status",
    desc: "Get instant payment confirmation over webhooks — no polling, no manual reconciliation, no surprises.",
  },
];

/* ---------- Feature checklist ---------- */
const features = [
  "Drop-in UPI checkout for web and mobile",
  "Server-to-server API for fully custom flows",
  "Dynamic QR generation for any amount",
  "UPI AutoPay / recurring mandate support",
  "Instant refund and partial refund APIs",
  "Smart retry across multiple UPI rails",
  "Multi-gateway routing for maximum success",
  "Real-time payment status via webhooks",
];

/* ---------- How it works ---------- */
const steps = [
  {
    icon: Zap,
    title: "1. Create a payment",
    desc: "Call POST /v1/payments with an amount, currency and customer_id. We return a UPI intent link and a QR.",
  },
  {
    icon: Smartphone,
    title: "2. Customer pays via UPI",
    desc: "They tap the intent link or scan the QR and approve the payment in any UPI app — GPay, PhonePe, Paytm, BHIM.",
  },
  {
    icon: Webhook,
    title: "3. Webhook confirms",
    desc: "We notify your server the moment the payment is confirmed. No polling required, no manual reconciliation.",
  },
];

export default function PaymentGateway() {
  return (
    <>
      <PageHero
        badge="Payment Gateway"
        title={
          <>
            Accept UPI payments <span className="gradient-text">every way</span>,
            everywhere
          </>
        }
        subtitle="One integration to UPI Intent, Collect, QR, and AutoPay. Smart routing across multiple gateway partners ensures the highest success rates — without you connecting each one separately."
      />

      {/* ---------- UPI Methods ---------- */}
      <section className="section-pad bg-white">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="UPI Methods"
              title="Every UPI flow your customers use"
              subtitle="Intent, Collect, QR and AutoPay — all supported through a single integration. No need to connect each UPI provider separately."
            />
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upiMethods.map((method, i) => (
              <Reveal key={method.title} delay={(i % 4) * 0.1}>
                <div className="group h-full bg-ink-50 rounded-2xl p-8 border border-ink-100 hover:border-accent-300 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${method.color} w-fit mb-5 group-hover:scale-110 transition-transform`}
                  >
                    <method.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    {method.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Benefits ---------- */}
      <section className="section-pad bg-ink-50">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Why our UPI"
              title="Built for maximum conversion"
              subtitle="Every layer of our UPI stack is designed to reduce friction, increase success rates, and eliminate reconciliation work."
            />
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 4) * 0.1}>
                <div className="h-full bg-white rounded-2xl p-7 border border-ink-100 hover:shadow-lg transition-shadow">
                  <div className="p-2.5 rounded-xl bg-accent-50 w-fit mb-4">
                    <b.icon className="h-5 w-5 text-accent-600" />
                  </div>
                  <h3 className="text-base font-bold text-ink-900 mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Features + API mock ---------- */}
      <section className="section-pad bg-white">
        <div className="container-8xl grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <SectionHeading
                badge="Gateway Features"
                align="left"
                title="Everything you need for UPI"
                subtitle="A complete toolkit for accepting, retrying, refunding and reconciling UPI payments — out of the box."
              />
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-ink-700"
                  >
                    <CheckCircle className="h-5 w-5 text-accent-500 shrink-0 mt-0.5" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-3xl blur-xl" />
              <div className="relative glass-card rounded-3xl p-8">
                <div className="mb-6">
                  <div className="text-xs font-mono text-ink-400 mb-2">
                    POST /v1/payments
                  </div>
                  <div className="h-px bg-ink-100" />
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-500">amount</span>
                    <span className="text-accent-600">1000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-500">currency</span>
                    <span className="text-success-600">INR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-500">method</span>
                    <span className="text-success-600">upi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-500">flow</span>
                    <span className="text-success-600">intent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-500">gateway</span>
                    <span className="text-success-600">auto</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-500">customer_id</span>
                    <span className="text-accent-600">cust_123</span>
                  </div>
                </div>
                <div className="mt-6 p-3 rounded-xl bg-accent-50 border border-accent-200">
                  <div className="flex items-center gap-2 text-accent-700">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-xs font-semibold">
                      200 OK — Payment Created
                    </span>
                  </div>
                  <div className="text-xs text-ink-500 mt-1 font-mono">
                    Routed via smart multi-gateway engine
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="section-pad bg-ink-50">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="How it works"
              title="From API call to confirmed payment"
              subtitle="Three simple steps — no gateways to negotiate, no reconciliation spreadsheets."
            />
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={(i % 3) * 0.1}>
                <div className="h-full bg-white rounded-2xl p-8 border border-ink-100 hover:shadow-lg transition-shadow">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent-500 to-primary-600 w-fit mb-5">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="py-20 bg-ink-950 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-500/10 blur-[120px] rounded-full" />
        <div className="relative container-8xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">
              Start accepting UPI payments today
            </h2>
            <p className="mt-4 text-lg text-ink-400 max-w-2xl mx-auto">
              Go live with a single integration in under 48 hours — Intent,
              Collect, QR and AutoPay, all in one place.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Button to="/signup" variant="primary" size="lg">
                Get Started Free
              </Button>
              <Button to="/contact" variant="dark" size="lg">
                Contact Sales
              </Button>
            </div>
            <div className="mt-10 flex justify-center gap-6 flex-wrap text-sm text-ink-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-accent-500" /> No setup fees
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-accent-500" /> Instant
                refunds
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-accent-500" /> Real-time
                webhooks
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-accent-500" /> NPCI
                compliant
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}