import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  ChevronRight,
  Home,
  ArrowLeft,
  CreditCard,
  GitBranch,
  Users,
  Wallet,
  Shield,
  Headphones,
  Sparkles,
} from "lucide-react";

interface Message {
  id: string;
  type: "bot" | "user" | "menu";
  content: string;
  options?: MenuOption[];
}

interface MenuOption {
  id: string;
  label: string;
  icon?: any;
}

// Menu Structure
const menuData: Record<
  string,
  { title: string; options: MenuOption[]; response?: string }
> = {
  main: {
    title: "👋 Welcome to Jyotish  AI Assistant! How can I help you today?",
    options: [
      { id: "payment", label: "💳 Payment Services", icon: CreditCard },
      { id: "routing", label: "🔄 Routing Rules", icon: GitBranch },
      { id: "onboarding", label: "📋 Merchant Onboarding", icon: Users },
      { id: "payouts", label: "💰 Payouts & Settlement", icon: Wallet },
      { id: "risk", label: "🛡️ Risk & Security", icon: Shield },
      { id: "human", label: "📞 Talk to Human", icon: Headphones },
    ],
  },
  payment: {
    title: "💳 What would you like to know about Payment Services?",
    options: [
      { id: "payment_accept", label: "🔹 Accept Payments (UPI/Cards)" },
      { id: "payment_integration", label: "🔹 Integration & API" },
      { id: "payment_routing", label: "🔹 Smart Routing" },
      { id: "payment_pricing", label: "🔹 Pricing & Fees" },
      { id: "back", label: "← Go Back" },
    ],
  },
  payment_accept: {
    title:
      "💳 Accept Payments with Jyotish AI:\n\n✅ UPI (Google Pay, PhonePe, Paytm)\n✅ Credit/Debit Cards (Visa, Mastercard, RuPay)\n✅ Net Banking (50+ banks)\n✅ Wallets & International Cards\n\n📌 All through a single integration!",
    options: [
      { id: "payment", label: "← Back to Payment Services" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  payment_integration: {
    title:
      "🔌 Integration is super simple:\n\n📦 Drop-in checkout (web/mobile)\n🖥️ Server-to-server API\n🔐 Tokenization for saved cards\n📡 Webhooks for real-time updates\n\n⏱️ Go live in under 48 hours!",
    options: [
      { id: "payment", label: "← Back to Payment Services" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  payment_routing: {
    title:
      "🔄 Smart Routing optimizes every transaction:\n\n✅ Routes to best gateway automatically\n✅ Based on: Success Rate | Cost | Latency\n✅ Supports 7+ gateways\n✅ AI-powered optimization available\n\n📈 Boost success rates by up to 12%!",
    options: [
      { id: "payment", label: "← Back to Payment Services" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  payment_pricing: {
    title:
      "💰 Custom pricing for every business:\n\n✅ No setup fees\n✅ No monthly fees\n✅ Volume-based discounts\n✅ Transparent - you only pay per transaction\n\n📞 Contact sales for custom quote!",
    options: [
      { id: "payment", label: "← Back to Payment Services" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  routing: {
    title:
      "🔄 Routing Rules Engine:\n\n📌 Two types of routing:\n\n1️⃣ Rule-Based Routing\n   • Amount-based rules\n   • Payment method specific\n   • Region & currency rules\n   • Custom priority per merchant\n\n2️⃣ AI-Powered Routing\n   • Real-time success prediction\n   • Cost optimization\n   • Self-learning from data\n   • Dynamic gateway switching",
    options: [
      { id: "routing_configure", label: "⚙️ Configure Rules" },
      { id: "routing_ai", label: "🤖 Enable AI Routing" },
      { id: "back", label: "← Go Back" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  routing_configure: {
    title:
      "⚙️ Configure Routing Rules:\n\nExample Rules:\n\n💰 Amount < ₹2,000 → Razorpay (UPI)\n💰 ₹2,000 - ₹50,000 → Stripe (Cards)\n💰 > ₹50,000 → Adyen (Premium)\n\n📌 You can customize via:\n• Dashboard UI\n• API Configuration\n• Contact Support",
    options: [
      { id: "routing", label: "← Back to Routing" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  routing_ai: {
    title:
      "🤖 AI-Powered Smart Routing:\n\n✨ Features:\n• Real-time success rate prediction\n• Automatic gateway switching\n• Pattern recognition & anomaly detection\n• Continuous learning from data\n\n📈 Results:\n• 12%+ higher success rates\n• Lower transaction costs\n• Better customer experience\n\n🚀 Ready to enable? Contact our team!",
    options: [
      { id: "routing", label: "← Back to Routing" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  onboarding: {
    title:
      "📋 Merchant Onboarding Process:\n\nStep 1️⃣: Sign Up - Create your account\nStep 2️⃣: KYC Verification - Upload documents\nStep 3️⃣: Document Review - 24 hours approval\nStep 4️⃣: Go Live - Get API keys\n\n✅ 50,000+ merchants onboarded\n⏱️ Average time: < 24 hours",
    options: [
      { id: "onboarding_docs", label: "📄 Required Documents" },
      { id: "back", label: "← Go Back" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  onboarding_docs: {
    title:
      "📄 Required Documents for Onboarding:\n\n🏢 For Businesses:\n• GST Certificate\n• PAN Card\n• Business Registration\n• Bank Account Details\n• Directors' ID Proof\n\n👤 For Individuals:\n• PAN Card\n• Aadhaar Card\n• Bank Account Details\n• Business Proof\n\n📤 Upload via secure portal!",
    options: [
      { id: "onboarding", label: "← Back to Onboarding" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  payouts: {
    title:
      "💰 Payouts & Settlement:\n\n💸 Payout API:\n• Instant vendor payouts\n• Mass disbursements\n• Refund management\n• Multi-currency support\n\n📊 Settlement:\n• Auto-settlement processing\n• Manual settlement reports\n• Real-time reconciliation\n• 24-hour settlement cycle",
    options: [
      { id: "payouts_instant", label: "⚡ Instant Payouts" },
      { id: "settlement_recon", label: "📊 Settlement Details" },
      { id: "back", label: "← Go Back" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  payouts_instant: {
    title:
      "⚡ Instant Payouts:\n\n✅ Real-time vendor payments\n✅ Bulk payout processing\n✅ Auto-refund capability\n✅ Multiple bank support\n\n💰 Use Cases:\n• Gig workers\n• Delivery partners\n• Marketplace sellers\n• Affiliate payments",
    options: [
      { id: "payouts", label: "← Back to Payouts" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  settlement_recon: {
    title:
      "📊 Settlement & Reconciliation:\n\n📌 Features:\n• Auto-settlement every 24 hours\n• Manual settlement on demand\n• Real-time reconciliation\n• Detailed reports with CSV export\n\n📈 Benefits:\n• No more manual tracking\n• Accurate accounting\n• Reduced errors\n• Better cash flow management",
    options: [
      { id: "payouts", label: "← Back to Payouts" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  risk: {
    title:
      "🛡️ Risk & Security:\n\n🔒 Security Features:\n• PCI DSS Compliant\n• End-to-end encryption\n• HMAC-signed webhooks\n• JWT Authentication\n• RBAC (Role-Based Access)\n\n🛡️ Risk Management:\n• Real-time fraud detection\n• Risk block rules\n• Chargeback monitoring\n• Automated alerts\n\n💯 Bank-grade security guaranteed!",
    options: [
      { id: "risk_fraud", label: "🕵️ Fraud Detection" },
      { id: "risk_chargeback", label: "🔄 Chargeback Management" },
      { id: "back", label: "← Go Back" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  risk_fraud: {
    title:
      "🕵️ Fraud Detection:\n\n🔍 Real-time monitoring:\n• ML-based fraud detection\n• Suspicious pattern analysis\n• Velocity checks\n• Geolocation verification\n\n⚡ Instant actions:\n• Auto-block suspicious transactions\n• Manual review queue\n• Risk scoring\n• Custom rules\n\n🛡️ Protect your business 24/7!",
    options: [
      { id: "risk", label: "← Back to Risk & Security" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  risk_chargeback: {
    title:
      "🔄 Chargeback Management:\n\n📌 Complete chargeback workflow:\n• Real-time monitoring dashboard\n• Evidence upload & submission\n• Dispute filing automation\n• Chargeback analytics\n\n📈 Reduce chargebacks by:\n• Smart routing to low-risk gateways\n• 3D Secure verification\n• Real-time alerts\n• Customer authentication",
    options: [
      { id: "risk", label: "← Back to Risk & Security" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  human: {
    title:
      "📞 Talk to a Human\n\nOur team is ready to help!\n\n📧 Email: amityadav@gmail.com\n💬 Live Chat: Available 9AM-6PM IST)",
    options: [{ id: "main", label: "🏠 Home" }],
  },
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: menuData.main.title,
      options: menuData.main.options,
    },
  ]);
  const [currentMenu, setCurrentMenu] = useState("main");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = (optionId: string) => {
    // Add user message
    const selectedOption = findOption(optionId);
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: selectedOption?.label || optionId,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Handle navigation
    if (optionId === "back") {
      // Go to previous menu
      const parentMenu = findParentMenu(currentMenu);
      if (parentMenu) {
        setCurrentMenu(parentMenu);
        setTimeout(() => {
          const menuDataItem = menuData[parentMenu];
          const botReply: Message = {
            id: Date.now().toString(),
            type: "bot",
            content: menuDataItem?.title || "",
            options: menuDataItem?.options || [],
          };
          setMessages((prev) => [...prev, botReply]);
        }, 500);
      }
      return;
    }

    if (optionId === "main") {
      setCurrentMenu("main");
      setTimeout(() => {
        const mainData = menuData.main;
        const botReply: Message = {
          id: Date.now().toString(),
          type: "bot",
          content: mainData.title,
          options: mainData.options,
        };
        setMessages((prev) => [...prev, botReply]);
      }, 500);
      return;
    }

    // Check if option has sub-menu
    const nextMenu = menuData[optionId];
    if (nextMenu) {
      setCurrentMenu(optionId);
      setIsTyping(true);
      setTimeout(() => {
        const botReply: Message = {
          id: Date.now().toString(),
          type: "bot",
          content: nextMenu.title,
          options: nextMenu.options || [],
        };
        setMessages((prev) => [...prev, botReply]);
        setIsTyping(false);
      }, 500);
    }
  };

  const findOption = (id: string): MenuOption | null => {
    for (const key in menuData) {
      const menu = menuData[key];
      const found = menu.options?.find((opt) => opt.id === id);
      if (found) return found;
    }
    return null;
  };

  const findParentMenu = (childId: string): string | null => {
    for (const key in menuData) {
      const menu = menuData[key];
      if (menu.options?.some((opt) => opt.id === childId)) {
        // Find which option has this child
        const option = menu.options.find((opt) => opt.id === childId);
        // Return the parent menu key
        if (option && menuData[key]) {
          return key;
        }
      }
    }
    return null;
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-2xl shadow-accent-500/30 hover:shadow-accent-500/50 transition-all duration-300"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-ink-100 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary-600 to-accent-500">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-full bg-white/20">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Jyotish AI </h3>
                  <p className="text-[10px] text-white/70">
                    Online • Ready to help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-ink-50"
            >
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.type === "bot" && (
                    <div className="flex items-start gap-2.5">
                      <div className="p-1.5 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 shrink-0 mt-0.5">
                        <Sparkles className="h-3.5 w-3.5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-ink-100">
                          <div className="text-sm text-ink-700 whitespace-pre-wrap">
                            {msg.content}
                          </div>
                        </div>
                        {msg.options && msg.options.length > 0 && (
                          <div className="mt-2 space-y-1.5">
                            {msg.options.map((option) => (
                              <button
                                key={option.id}
                                onClick={() => handleOptionClick(option.id)}
                                className="w-full text-left px-3 py-2 text-sm bg-white border border-ink-200 rounded-xl hover:border-accent-300 hover:bg-accent-50 transition-all duration-200 flex items-center gap-2 text-ink-700 hover:text-accent-700 group"
                              >
                                <span className="flex-1">{option.label}</span>
                                <ChevronRight className="h-4 w-4 text-ink-300 group-hover:text-accent-500 transition-colors" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {msg.type === "user" && (
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-br from-primary-600 to-accent-500 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%] shadow-sm">
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 shrink-0 mt-0.5">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-ink-100">
                    <div className="flex gap-1">
                      <span
                        className="h-2 w-2 bg-ink-300 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="h-2 w-2 bg-ink-300 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="h-2 w-2 bg-ink-300 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-ink-100 bg-white">
              <p className="text-[10px] text-ink-400 text-center">
                ✨ AI Assistant • Responses are automated
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
