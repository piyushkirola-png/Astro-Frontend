import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { useLogin } from '../../api/mutations/authMutations';
import Button from '../../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const loginMutation = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const errorMessage =
    (loginMutation.error as any)?.response?.data?.message ||
    (loginMutation.error ? 'Login failed. Please try again.' : null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setSuccess(true);
          setSession(data);
          const redirect =
            data.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard';
          setTimeout(() => navigate(redirect, { replace: true }), 500);
        },
      }
    );
  };

  const loading = loginMutation.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50 pt-20 pb-12 px-4">
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="glass-card rounded-3xl p-8 lg:p-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
              <img src="/assets/logo.png" alt="Jyotish" className="h-8 w-10 rounded-lg" />
              <span className="text-xl font-bold text-ink-900">JyotishAI</span>
            </Link>
            <h1 className="text-2xl font-bold text-ink-900">Welcome back</h1>
            <p className="text-ink-500 mt-2">Sign in to your dashboard</p>
          </div>

          {errorMessage && (
            <div className="mb-4 flex items-start gap-2 p-3 rounded-xl bg-danger-50 border border-danger-200 text-danger-600 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              {errorMessage}
            </div>
          )}
          {success && (
            <div className="mb-4 flex items-start gap-2 p-3 rounded-xl bg-success-50 border border-success-200 text-success-600 text-sm">
              <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
              Signed in successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-400/20 transition-all"
                  placeholder="you@company.com"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-400/20 transition-all"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full">
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-primary-600 hover:text-primary-700">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}