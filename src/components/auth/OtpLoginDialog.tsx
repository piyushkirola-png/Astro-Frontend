import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X, Loader2, Mail, KeyRound, ArrowRight } from 'lucide-react';
import authService from '../../api/services/authService';
import { useAuth } from '../../lib/AuthContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function OtpLoginDialog({ open, onClose }: Props) {
  const navigate = useNavigate();
  const { setSession, showToast } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const reset = () => {
    setStep(1);
    setEmail("");
    setCode("");
    setError(null);
    setLoading(false);
  };

  const handleClose = () => {
    if (loading) return;
    reset();
    onClose();
  };

  const handleSendOtp = async () => {
    const trimmed = email.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);

    try {
      await authService.sendLoginOtp(trimmed);
      setStep(2);
      showToast("OTP sent to your email");
    } catch (e: any) {
      setError(
        e?.response?.data?.message ||
        "Failed to send OTP. Please check your email.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    const trimmed = code.trim();
    if (trimmed.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const auth = await authService.verifyLoginOtp(email.trim(), trimmed);
      setSession(auth);
      showToast('Logged in successfully');
      reset();
      onClose();

      const redirect =
        auth.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard';
      setTimeout(() => navigate(redirect, { replace: true }), 400);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError(null);
    try {
      await authService.sendLoginOtp(email.trim());
      setCode("");
      showToast("OTP resent to your email");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-100">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white">
              <KeyRound className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink-900">Login with OTP</h3>
              <p className="text-[11px] text-ink-500">
                {step === 1
                  ? "Enter your registered email"
                  : "Enter the 6-digit code"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="p-1.5 rounded-lg hover:bg-ink-100 text-ink-500 disabled:opacity-50"
          >
          </button>
        </div>

        <div className="p-5 space-y-4">
          {step === 1 ? (
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendOtp();
                  }}
                  placeholder="you@example.com"
                  autoFocus
                  disabled={loading}
                  className="w-full rounded-xl border border-ink-200 pl-10 pr-3 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-primary-400"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                6-digit OTP
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleVerify();
                }}
                placeholder="000000"
                autoFocus
                disabled={loading}
                className="w-full rounded-xl border border-ink-200 px-3 py-3 text-center text-xl font-mono font-bold tracking-[0.5em] text-ink-900 focus:outline-none focus:border-primary-400"
              />
              <div className="flex items-center justify-between mt-2 text-[11px]">
                <span className="text-ink-500">
                  Code sent to <strong>{email}</strong>
                </span>
                <button
                  onClick={handleResend}
                  disabled={loading}
                  className="font-semibold text-primary-600 hover:text-primary-700 disabled:opacity-50"
                >
                  Resend
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-2.5 text-xs text-danger-700">
              {error}
            </div>
          )}
        </div>

        <div className="flex gap-2 px-5 pb-5">
          <button
            onClick={handleClose}
            disabled={loading}
            className="flex-1 rounded-xl px-4 py-2.5 border border-ink-200 text-sm font-semibold text-ink-700 hover:bg-ink-50 disabled:opacity-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={step === 1 ? handleSendOtp : handleVerify}
            disabled={
              loading || (step === 1 ? !email.trim() : code.length !== 6)
            }
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold hover:shadow-lg disabled:opacity-50 transition"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : step === 1 ? (
              <>
                Send OTP
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              "Verify & Login"
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
