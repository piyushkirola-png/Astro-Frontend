import { useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Loader2,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import authService from "../../api/services/authService";
import { useAuth } from "../../lib/AuthContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ForgotPasswordDialog({ open, onClose }: Props) {
  const { showToast } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const reset = () => {
    setStep(1);
    setEmail("");
    setCode("");
    setNewPassword("");
    setConfirmPassword("");
    setResetToken("");
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
      await authService.sendResetOtp(trimmed);
      setStep(2);
      showToast("Reset code sent to your email");
    } catch (e: any) {
      setError(
        e?.response?.data?.message || "No account found with this email.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const trimmed = code.trim();
    if (trimmed.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const data = await authService.verifyResetOtp(email.trim(), trimmed);
      setResetToken(data.resetToken);
      setStep(3);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await authService.resetPassword(resetToken, newPassword);
      showToast("Password reset successfully. Please log in.");
      reset();
      onClose();
    } catch (e: any) {
      setError(
        e?.response?.data?.message || "Failed to reset password. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const stepTitle = (): string => {
    if (step === 1) return "Forgot Password";
    if (step === 2) return "Verify OTP";
    return "Set New Password";
  };

  const stepSubtitle = (): string => {
    if (step === 1) return "Enter your registered email";
    if (step === 2) return "Enter the 6-digit code";
    return "Choose a strong new password";
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
              {step === 3 ? (
                <ShieldCheck className="h-4 w-4" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink-900">{stepTitle()}</h3>
              <p className="text-[11px] text-ink-500">{stepSubtitle()}</p>
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
          {step === 1 && (
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
          )}

          {step === 2 && (
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
                  if (e.key === "Enter") handleVerifyOtp();
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
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="font-semibold text-primary-600 hover:text-primary-700 disabled:opacity-50"
                >
                  Resend
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  autoFocus
                  disabled={loading}
                  className="w-full rounded-xl border border-ink-200 px-3 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-primary-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleResetPassword();
                  }}
                  placeholder="Re-enter new password"
                  disabled={loading}
                  className="w-full rounded-xl border border-ink-200 px-3 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-primary-400"
                />
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-2.5 flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-ink-600">
                  Must be 8+ characters with at least 1 letter and 1 number.
                </p>
              </div>
            </>
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
            onClick={
              step === 1
                ? handleSendOtp
                : step === 2
                  ? handleVerifyOtp
                  : handleResetPassword
            }
            disabled={
              loading ||
              (step === 1 && !email.trim()) ||
              (step === 2 && code.length !== 6) ||
              (step === 3 && (!newPassword || !confirmPassword))
            }
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold hover:shadow-lg disabled:opacity-50 transition"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : step === 3 ? (
              "Reset Password"
            ) : (
              <>
                Continue
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
