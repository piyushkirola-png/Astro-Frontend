import { Users, CreditCard, TrendingUp, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../lib/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Users', value: '—', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Payments', value: '—', icon: CreditCard, color: 'from-green-500 to-emerald-500' },
    { label: 'Revenue', value: '—', icon: TrendingUp, color: 'from-amber-500 to-orange-500' },
    { label: 'Active Sessions', value: '—', icon: Activity, color: 'from-purple-500 to-indigo-500' },
  ];

  const quickLinks = [
    { label: 'Manage Users', href: '/admin/users', desc: 'View, edit, and manage all users' },
    { label: 'View Payments', href: '/admin/payments', desc: 'Track transactions and revenue' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">
          Welcome back, {user?.name || 'Admin'}
        </h1>
        <p className="text-ink-500 mt-1 text-sm">
          Here's an overview of your platform
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 border border-ink-100 hover:shadow-md transition-all"
          >
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${s.color} w-fit mb-3`}>
              <s.icon className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-ink-900">{s.value}</div>
            <div className="text-xs text-ink-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid md:grid-cols-2 gap-4">
        {quickLinks.map((q) => (
          <Link
            key={q.href}
            to={q.href}
            className="group bg-white rounded-2xl p-5 border border-ink-100 hover:border-accent-300 hover:shadow-lg transition-all flex items-center justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-ink-900">{q.label}</h3>
              <p className="text-sm text-ink-500 mt-1">{q.desc}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-ink-400 group-hover:text-accent-500 group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>

      {/* Info banner */}
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-accent-200">
        <p className="text-sm text-ink-700">
          <span className="font-semibold">Dashboard ready.</span> Stats will populate
          once the backend endpoints are wired. Users and Payments pages are next.
        </p>
      </div>
    </div>
  );
}