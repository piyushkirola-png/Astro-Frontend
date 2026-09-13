import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  User,
} from "lucide-react";
import { useAuth } from "../../lib/AuthContext";
import { useRegister } from "../../api/mutations/authMutations";
import Button from "../../components/ui/Button";

export default function SignUp() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const registerMutation = useRegister();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1000);
    return () => clearTimeout(t);
  }, [toast]);

  const errorMessage =
    (registerMutation.error as any)?.response?.data?.message ||
    (registerMutation.error ? "Signup failed. Please try again." : null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(
      { name, email, password },
      {
        onSuccess: (data) => {
          setSession(data);
          setToast("Account created successfully");
          const redirect =
            data.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard";
          setTimeout(() => navigate(redirect, { replace: true }), 700);
        },
      },
    );
  };

  const loading = registerMutation.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50 pt-20 pb-12 px-4">
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            className="fixed top-6 right-6 z-[200] flex items-center gap-3 bg-white border border-success-200 shadow-xl rounded-lg px-3.5 py-2.5 max-w-xs"
          >
            <div className="p-1 rounded bg-success-100">
              <CheckCircle className="h-3.5 w-3.5 text-success-600" />
            </div>
            <span className="text-xs font-medium text-ink-900">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="glass-card rounded-3xl p-8 lg:p-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
              <img
                src="/assets/logo.png"
                alt="Jyotish"
                className="h-8 w-10 rounded-lg"
              />
              <span className="text-xl font-bold text-ink-900">JyotishAI</span>
            </Link>
            <h1 className="text-2xl font-bold text-ink-900">
              Create your account
            </h1>
            <p className="text-ink-500 mt-2">Start your cosmic journey</p>
          </div>

          {errorMessage && (
            <div className="mb-4 flex items-start gap-2 p-3 rounded-xl bg-danger-50 border border-danger-200 text-danger-600 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-400/20 transition-all"
                  placeholder="John Doe"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">
                Email
              </label>
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
              <label className="block text-sm font-medium text-ink-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-400/20 transition-all"
                  placeholder="Min. 6 characters"
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              {loading ? "Creating account..." : "Get Started"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary-600 hover:text-primary-700"
            >
              Sign in
            </Link>
          </p>
          <p className="mt-4 text-center text-xs text-ink-400">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-ink-600">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline hover:text-ink-600">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </motion.div>
    </div>
  );
}
