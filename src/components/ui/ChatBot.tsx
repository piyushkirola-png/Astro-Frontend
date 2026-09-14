import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  ChevronRight,
  Sparkles,
  Calendar,
  Moon,
  Sun,
  Heart,
  Briefcase,
  Gem,
  Shield,
  Wallet,
  Headphones,
  Home,
  Stars,
  Clock,
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

const menuData: Record<
  string,
  { title: string; options: MenuOption[]; response?: string }
> = {
  main: {
    title:
      "🙏 Namaste! I'm Jyotish AI Assistant.\n\nI can help you explore Vedic astrology, horoscopes, kundali, remedies, and more. What would you like to know?",
    options: [
      { id: "horoscope", label: "🔮 Daily Horoscope", icon: Calendar },
      { id: "kundali", label: "📜 Kundali & Birth Chart", icon: Sparkles },
      { id: "zodiac", label: "♈ Zodiac Signs", icon: Stars },
      { id: "remedies", label: "💎 Remedies & Gemstones", icon: Gem },
      { id: "matching", label: "❤️ Kundali Matching", icon: Heart },
      { id: "chat_ai", label: "💬 Chat with Jyotish AI", icon: Moon },
      { id: "human", label: "📞 Talk to Human", icon: Headphones },
    ],
  },

  horoscope: {
    title: "🔮 Daily Horoscope\n\nWhat kind of forecast would you like?",
    options: [
      { id: "horoscope_today", label: "☀️ Today's Horoscope" },
      { id: "horoscope_tomorrow", label: "🌅 Tomorrow's Horoscope" },
      { id: "horoscope_weekly", label: "📅 Weekly Horoscope" },
      { id: "horoscope_monthly", label: "🗓️ Monthly Horoscope" },
      { id: "horoscope_yearly", label: "🎯 Yearly Horoscope" },
      { id: "back", label: "← Go Back" },
    ],
  },
  horoscope_today: {
    title:
      "☀️ Today's Horoscope\n\nYour daily cosmic forecast is ready! Visit the Horoscope section to see:\n\n✅ Career outlook\n✅ Love & relationships\n✅ Health & wellness\n✅ Lucky number & color\n✅ Finance insights\n\n🔗 Go to: /user/horoscope (Today tab)",
    options: [
      { id: "horoscope", label: "← Back to Horoscope" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  horoscope_tomorrow: {
    title:
      "🌅 Tomorrow's Horoscope\n\nPrepare for tomorrow with a peek into your stars.\n\n✅ Career momentum\n✅ Relationship vibes\n✅ Wellness tips\n✅ Lucky guidance\n\n🔗 Go to: /user/horoscope (Tomorrow tab)",
    options: [
      { id: "horoscope", label: "← Back to Horoscope" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  horoscope_weekly: {
    title:
      "📅 Weekly Horoscope\n\nA week-ahead cosmic map for you.\n\n✅ Weekly themes\n✅ Key days to watch\n✅ Opportunities & cautions\n✅ Love, career, money\n\n🔗 Go to: /user/horoscope (Weekly tab)",
    options: [
      { id: "horoscope", label: "← Back to Horoscope" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  horoscope_monthly: {
    title:
      "🗓️ Monthly Horoscope\n\nSee how the whole month unfolds.\n\n✅ Monthly planetary influences\n✅ Career & finance forecast\n✅ Love & family trends\n✅ Health & wellness\n\n🔗 Go to: /user/horoscope (Monthly tab)",
    options: [
      { id: "horoscope", label: "← Back to Horoscope" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  horoscope_yearly: {
    title:
      "🎯 Yearly Horoscope\n\nYour big-picture cosmic roadmap.\n\n✅ Yearly theme & direction\n✅ Major planetary transits\n✅ Career, love, health, wealth\n✅ Lucky periods\n\n🔗 Go to: /user/horoscope (Yearly tab)",
    options: [
      { id: "horoscope", label: "← Back to Horoscope" },
      { id: "main", label: "🏠 Home" },
    ],
  },

  kundali: {
    title:
      "📜 Kundali & Birth Chart\n\nYour complete Vedic birth chart - calculated from your birth details.\n\nWhat would you like to know?",
    options: [
      { id: "kundali_basic", label: "📋 Basic Details" },
      { id: "kundali_chart", label: "🔷 D1 / D9 Charts" },
      { id: "kundali_planets", label: "🪐 Planetary Positions" },
      { id: "kundali_dasha", label: "⏳ Vimshottari Dasha" },
      { id: "kundali_report", label: "📄 Full Kundali Report" },
      { id: "back", label: "← Go Back" },
    ],
  },
  kundali_basic: {
    title:
      "📋 Kundali — Basic Details\n\nSee your birth chart essentials:\n\n✅ Panchang (Tithi, Karana, Yoga)\n✅ Nakshatra & Nakshatra Lord\n✅ Ascendant & Lord\n✅ Sunrise & Sunset\n✅ Avakhada details (Varna, Vashya, Yoni, Gan, Nadi)\n\n🔗 Go to: /user/kundali (Basic tab)",
    options: [
      { id: "kundali", label: "← Back to Kundali" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  kundali_chart: {
    title:
      "🔷 D1 / D9 Charts\n\nTraditional North Indian chart diagrams.\n\n✅ D1 (Rashi) — Main birth chart\n✅ D9 (Navamsha) — Marriage & dharma\n✅ House-by-house planetary placements\n✅ Download as PDF available\n\n🔗 Go to: /user/kundali (Kundali tab)",
    options: [
      { id: "kundali", label: "← Back to Kundali" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  kundali_planets: {
    title:
      "🪐 Planetary Positions\n\nAll 9 planets with exact positions.\n\n✅ Sign & degree\n✅ Nakshatra & Lord\n✅ House placement\n✅ Retrograde status\n✅ Exalted / Debilitated\n\n🔗 Go to: /user/kundali (Planetary Positions tab)",
    options: [
      { id: "kundali", label: "← Back to Kundali" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  kundali_dasha: {
    title:
      "⏳ Vimshottari Dasha\n\nThe 120-year cycle of planetary periods.\n\n✅ Mahadasha periods with years\n✅ Active dasha highlighted\n✅ Life guidance per dasha\n✅ Career, love, health insights\n\n🔗 Go to: /user/kundali (Dasha tab)",
    options: [
      { id: "kundali", label: "← Back to Kundali" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  kundali_report: {
    title:
      "📄 Full Kundali Report — ₹500\n\nDeep 4-section Vedic analysis.\n\n✅ General Analysis (career, love, health, wealth)\n✅ Personalized Remedies\n✅ Dosha Detection (Mangal, Kaal Sarp, Sade Sati)\n✅ Gemstone Guide\n\n💳 Price: ₹500 + 18% GST = ₹590\n📧 Instant delivery to your email\n📥 PDF download available\n\n🔗 Go to: /user/payments or /user/report",
    options: [
      { id: "kundali", label: "← Back to Kundali" },
      { id: "main", label: "🏠 Home" },
    ],
  },

  zodiac: {
    title:
      "♈ Zodiac Signs\n\nDiscover the 12 signs of Vedic astrology.\n\nWould you like to explore?",
    options: [
      { id: "zodiac_find", label: "🔍 Find My Zodiac Sign" },
      { id: "zodiac_traits", label: "✨ Sign Traits" },
      { id: "back", label: "← Go Back" },
    ],
  },
  zodiac_find: {
    title:
      "🔍 Find Your Zodiac Sign\n\nYour zodiac sign is derived from your Date of Birth.\n\n📌 Steps:\n1. Complete your profile with DOB\n2. Sign is auto-detected\n3. Personalized horoscope activates\n\n🔗 Go to: /user/profile to update DOB",
    options: [
      { id: "zodiac", label: "← Back to Zodiac" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  zodiac_traits: {
    title:
      "✨ Zodiac Signs & Traits\n\n♈ Aries — Bold, ambitious (Mar 21-Apr 19)\n♉ Taurus — Patient, reliable (Apr 20-May 20)\n♊ Gemini — Curious, adaptable (May 21-Jun 20)\n♋ Cancer — Caring, emotional (Jun 21-Jul 22)\n♌ Leo — Confident, generous (Jul 23-Aug 22)\n♍ Virgo — Detail-oriented (Aug 23-Sep 22)\n♎ Libra — Diplomatic, fair (Sep 23-Oct 22)\n♏ Scorpio — Intense, passionate (Oct 23-Nov 21)\n♐ Sagittarius — Adventurous (Nov 22-Dec 21)\n♑ Capricorn — Disciplined (Dec 22-Jan 19)\n♒ Aquarius — Innovative (Jan 20-Feb 18)\n♓ Pisces — Compassionate (Feb 19-Mar 20)",
    options: [
      { id: "zodiac", label: "← Back to Zodiac" },
      { id: "main", label: "🏠 Home" },
    ],
  },

  remedies: {
    title:
      "💎 Remedies & Gemstones\n\nVedic guidance to strengthen favorable planets and pacify challenging ones.",
    options: [
      { id: "remedies_gemstone", label: "💠 Gemstones" },
      { id: "remedies_mantra", label: "🕉️ Mantras" },
      { id: "remedies_dosha", label: "⚡ Dosha Remedies" },
      { id: "back", label: "← Go Back" },
    ],
  },
  remedies_gemstone: {
    title:
      "💠 Gemstone Guide\n\nEach planet has a lucky gemstone.\n\n✅ Which gem to wear\n✅ Ruling planet\n✅ Metal & finger\n✅ Day to wear\n✅ Benefits\n\n💎 Included in the Full Kundali Report.\n\n🔗 Go to: /user/report",
    options: [
      { id: "remedies", label: "← Back to Remedies" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  remedies_mantra: {
    title:
      "🕉️ Powerful Mantras\n\nChant daily for planetary benefits.\n\n✅ Surya (Sun) — Om Suryaya Namaha\n✅ Chandra (Moon) — Om Somaya Namaha\n✅ Mangal (Mars) — Om Angarakaya Namaha\n✅ Budh (Mercury) — Om Budhaya Namaha\n✅ Guru (Jupiter) — Om Brihaspataye Namaha\n✅ Shukra (Venus) — Om Shukraya Namaha\n✅ Shani (Saturn) — Om Shanicharaya Namaha\n\n108 times daily with a clear mind.",
    options: [
      { id: "remedies", label: "← Back to Remedies" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  remedies_dosha: {
    title:
      "⚡ Dosha Remedies\n\nCommon Vedic remedies for doshas.\n\n✅ Mangal Dosha → Kumbh Vivah, red coral\n✅ Kaal Sarp Dosha → Nag Panchami puja\n✅ Sade Sati → Hanuman Chalisa, Shani mantra\n✅ Pitru Dosha → Shraddh, Narayan Bali\n✅ Grahan Dosha → Rahu-Ketu remedies\n\n📄 Full remedies in Kundali Report.\n\n🔗 Go to: /user/report",
    options: [
      { id: "remedies", label: "← Back to Remedies" },
      { id: "main", label: "🏠 Home" },
    ],
  },

  matching: {
    title:
      "❤️ Kundali Matching (Gun Milan)\n\nTraditional Vedic matchmaking with 36-point system.\n\n✅ 8 Koota analysis\n✅ Compatibility score\n✅ Marriage guidance\n\n📌 Available at: /free-services/kundali-matching",
    options: [
      { id: "matching_how", label: "❓ How It Works" },
      { id: "back", label: "← Go Back" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  matching_how: {
    title:
      "❓ How Kundali Matching Works\n\nThe 36-point Gun Milan system.\n\n✅ Varna (1) — Spiritual compatibility\n✅ Vashya (2) — Mutual attraction\n✅ Tara (3) — Health & well-being\n✅ Yoni (4) — Physical chemistry\n✅ Graha Maitri (5) — Mental affinity\n✅ Gan (6) — Temperament\n✅ Bhakoot (7) — Love & family\n✅ Nadi (8) — Health & progeny\n\n📊 18+ points = Recommended match",
    options: [
      { id: "matching", label: "← Back to Matching" },
      { id: "main", label: "🏠 Home" },
    ],
  },

  chat_ai: {
    title:
      "💬 Chat with Jyotish AI\n\nPersonal guidance from our Vedic AI astrologer.\n\n✅ Real-time answers on career, love, health, finance\n✅ Hinglish + English friendly\n✅ Available 24/7\n\n💰 Free 2 minutes for new users\n⏱️ Recharge from ₹50 (2 min) onwards\n\n🔗 Go to: /user/chat",
    options: [
      { id: "chat_pricing", label: "💳 Recharge Options" },
      { id: "chat_wallet", label: "💰 My Wallet Balance" },
      { id: "back", label: "← Go Back" },
    ],
  },
  chat_pricing: {
    title:
      "💳 Chat Recharge Options\n\nPick a slab as per your need.\n\n✅ 2 Minutes — ₹50 + GST\n✅ 5 Minutes — ₹100 + GST\n✅ 10 Minutes — ₹180 + GST\n✅ 30 Minutes — ₹450 + GST\n✅ 1 Hour — ₹800 + GST\n\n💡 GST 18% applied at checkout\n\n🔗 Go to: /user/payments",
    options: [
      { id: "chat_ai", label: "← Back to Chat AI" },
      { id: "main", label: "🏠 Home" },
    ],
  },
  chat_wallet: {
    title:
      "💰 Wallet Balance\n\nSee your remaining chat time & its value.\n\n✅ Live balance (in ₹ and time)\n✅ Recent recharges\n✅ Full history\n\n🔗 Go to: /user/wallet",
    options: [
      { id: "chat_ai", label: "← Back to Chat AI" },
      { id: "main", label: "🏠 Home" },
    ],
  },

  human: {
    title:
      "📞 Talk to a Human\n\nOur support team is here to help.\n\n📧 Email: support@jyotishai.com\n💬 Live Chat: 9 AM - 9 PM IST\n📱 WhatsApp: +91 98765 43210\n\n⏱️ Average response time: under 2 hours",
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
    const selectedOption = findOption(optionId);
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: selectedOption?.label || optionId,
    };
    setMessages((prev) => [...prev, userMessage]);

    if (optionId === "back") {
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
        return key;
      }
    }
    return null;
  };

  return (
    <>
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-ink-100 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary-600 to-accent-500">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-full bg-white/20">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Jyotish AI</h3>
                  <p className="text-[10px] text-white/70">
                    Online • Vedic Astrology Guide
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

            <div className="p-3 border-t border-ink-100 bg-white">
              <p className="text-[10px] text-ink-400 text-center">
                ✨ Jyotish AI Assistant • Automated Vedic guidance
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}