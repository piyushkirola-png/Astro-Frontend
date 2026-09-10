import { Star, MessageSquare, CreditCard, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../lib/AuthContext';

export default function UserDashboard() {
  const { user } = useAuth();

  const quickActions = [
    {
      label: 'Free Kundali',
      desc: 'Generate your birth chart',
      href: '/free-kundali',
      icon: Star,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      label: 'My Consultations',
      desc: 'Chat with astrologers',
      href: '/user/consultations',
      icon: MessageSquare,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Payments',
      desc: 'View your transactions',
      href: '/user/payments',
      icon: CreditCard,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-br from-primary-600 to-accent-500 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-dark opacity-20" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider opacity-90">
              Welcome
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold">
            Hello, {user?.name || 'User'} 👋
          </h1>
          <p className="mt-2 text-sm opacity-90 max-w-lg">
            Explore your cosmic journey. Get daily horoscopes, chat with astrologers,
            and discover what the stars have in store for you.
          </p>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-bold text-ink-900 mb-3">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((a) => (
            <Link
              key={a.href}
              to={a.href}
              className="group bg-white rounded-2xl p-5 border border-ink-100 hover:border-accent-300 hover:shadow-lg transition-all"
            >
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${a.color} w-fit mb-3 group-hover:scale-110 transition-transform`}>
                <a.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-ink-900">{a.label}</h3>
              <p className="text-sm text-ink-500 mt-1">{a.desc}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary-600 group-hover:gap-2 transition-all">
                Open <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-accent-200">
        <p className="text-sm text-ink-700">
          <span className="font-semibold">Coming soon:</span> Personalised daily horoscope,
          saved kundalis, and consultation history — all in one place.
        </p>
      </div>
    </div>
  );
}