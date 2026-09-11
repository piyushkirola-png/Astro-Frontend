import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  CreditCard,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { useLogout } from '../../api/mutations/authMutations';
import Button from '../ui/Button';

const navItems = [
  { label: 'Dashboard', href: '/user/dashboard', icon: LayoutDashboard },
  { label: 'Chat', href: '/user/chat', icon: MessageSquare },
  { label: 'Payments', href: '/user/payments', icon: CreditCard },
  { label: 'Profile', href: '/user/profile', icon: User },
];

export default function UserSidebar() {
  const navigate = useNavigate();
  const { clearUser } = useAuth();
  const logoutMutation = useLogout();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        clearUser();
        navigate('/login', { replace: true });
      },
    });
  };

  const SidebarContent = (
    <div className="flex h-full flex-col bg-ink-950 text-ink-300">
      <div className="flex items-center justify-between h-16 lg:h-20 px-5 border-b border-white/10 shrink-0">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="/assets/logo.png"
            alt="Jyotish AI"
            className="h-8 w-10 rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="text-lg font-bold text-white">
            Jyotish <span className="text-primary-500">AI</span>
          </span>
        </Link>
        <button
          className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-white"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-primary-600/20 to-accent-500/20 text-white border border-accent-500/30'
                  : 'text-ink-300 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10 shrink-0">
        <button
          onClick={() => setConfirmOpen(true)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-300 hover:text-danger-400 hover:bg-danger-500/10 transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 h-14 bg-ink-950 text-white flex items-center justify-between px-4 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="Jyotish AI" className="h-7 w-9 rounded" />
          <span className="text-base font-bold">
            Jyotish <span className="text-primary-500">AI</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <aside className="hidden lg:block fixed top-0 left-0 bottom-0 w-64 z-20">
        {SidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute top-0 left-0 bottom-0 w-72 max-w-[85vw]"
              onClick={(e) => e.stopPropagation()}
            >
              {SidebarContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setConfirmOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-danger-50">
                  <LogOut className="h-5 w-5 text-danger-600" />
                </div>
                <h3 className="text-lg font-bold text-ink-900">Log out?</h3>
              </div>
              <p className="text-sm text-ink-500 mb-6">
                You'll need to sign in again to access your dashboard.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={() => setConfirmOpen(false)}
                >
                  Cancel
                </Button>
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-danger-600 hover:bg-danger-700 disabled:opacity-60 transition-all"
                >
                  {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}