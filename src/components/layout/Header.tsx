import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';
import { navLinks } from '../../lib/navigation';
import { useAuth } from '../../lib/AuthContext';
import { useLogout } from '../../api/mutations/authMutations';
import { useGetMe } from '../../api/queries/useUser';
import userService from '../../api/services/userService';
import Button from '../ui/Button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, clearUser } = useAuth();
  const logoutMutation = useLogout();

  // Fetch full profile (cached by React Query — no extra network if already loaded)
  const { data: me } = useGetMe({ enabled: !!user });

  const avatarSrc =
    user && me ? userService.absoluteAvatarUrl(me.avatarUrl) : null;
  const showAvatarImg = avatarSrc && !imgFailed;

  const initial =
    user?.name?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    'U';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        clearUser();
        setConfirmOpen(false);
        navigate('/login', { replace: true });
      },
    });
  };

  const dashboardHref =
    user?.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard';

  // Small reusable avatar renderer
  const AvatarCircle = ({ size = 40 }: { size?: number }) => (
    <div
      className="rounded-full overflow-hidden bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold shrink-0"
      style={{ width: size, height: size }}
    >
      {showAvatarImg ? (
        <img
          src={avatarSrc}
          alt={user?.name || 'avatar'}
          className="h-full w-full object-cover"
          onError={() => setImgFailed(true)}
        />
      ) : (
        initial
      )}
    </div>
  );

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-ink-200/60 shadow-sm'
          : 'bg-transparent'
          }`}
      >
        <nav className="container-8xl flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/assets/logo.png"
              alt="Jyotish AI"
              className="h-8 w-10 rounded-lg"
            />
            <span className="text-xl font-bold tracking-tight text-ink-900">
              Jyotish <span className="text-primary-600">AI</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.children && setOpenDropdown(link.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-ink-600 hover:text-ink-900 transition-colors rounded-lg"
                >
                  {link.label}
                  {link.children && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>

                <AnimatePresence>
                  {link.children && openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 pt-2 w-56"
                    >
                      <div className="glass-card rounded-2xl p-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block px-4 py-2.5 text-sm text-ink-600 hover:text-primary-700 hover:bg-primary-50 rounded-xl transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div
                className="relative"
                onMouseEnter={() => setUserMenuOpen(true)}
                onMouseLeave={() => setUserMenuOpen(false)}
              >
                <button
                  className="rounded-full hover:ring-2 hover:ring-accent-400/40 transition-all"
                  aria-label="Account menu"
                >
                  <AvatarCircle size={40} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 pt-2 w-60"
                    >
                      <div className="glass-card rounded-2xl p-2">
                        {/* Avatar + Full Name */}
                        <div className="flex items-center gap-3 px-3 py-2.5">
                          <AvatarCircle size={36} />
                          <div className="text-sm font-semibold text-ink-900 truncate">
                            {user.name || 'User'}
                          </div>
                        </div>

                        <div className="my-1 h-px bg-ink-100" />

                        <Link
                          to={dashboardHref}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-ink-600 hover:text-primary-700 hover:bg-primary-50 rounded-xl transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            setConfirmOpen(true);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl transition-colors text-danger-600 bg-danger-50 hover:bg-danger-100 hover:text-danger-700"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Button to="/login" variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button to="/signup" variant="primary" size="sm">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-ink-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-ink-950/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-20 px-6 pb-8 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <Link
                      to={link.href}
                      className="block py-3 text-base font-medium text-ink-800 hover:text-primary-700"
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="pl-4 border-l-2 border-ink-100 ml-2 space-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block py-2 text-sm text-ink-500 hover:text-primary-700"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="pt-6 space-y-3">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-ink-50">
                        <AvatarCircle size={36} />
                        <div className="text-sm font-semibold text-ink-900 truncate">
                          {user.name || 'User'}
                        </div>
                      </div>

                      <Link
                        to={dashboardHref}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>

                      <button
                        onClick={() => {
                          setMobileOpen(false);
                          setConfirmOpen(true);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-danger-600 bg-danger-50 hover:bg-danger-100 font-semibold text-sm transition-all"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Button
                        to="/login"
                        variant="outline"
                        size="md"
                        className="w-full"
                      >
                        Sign In
                      </Button>
                      <Button
                        to="/signup"
                        variant="primary"
                        size="md"
                        className="w-full"
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout confirm modal */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
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