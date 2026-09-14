import { useState } from "react";
import { Lock, Loader2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import userService from "../../../api/services/userService";
import { useAuth } from "../../../lib/AuthContext";

export default function UpdatePassword() {
  const { showToast } = useAuth();
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!current || !newPass || !confirm) {
      setError("Please fill all fields");
      return;
    }
    if (newPass.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }
    if (newPass !== confirm) {
      setError("New passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await userService.changePassword(current, newPass);
      showToast("Password updated successfully");
      setCurrent("");
      setNewPass("");
      setConfirm("");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">
          Update Password
        </h1>
        <p className="text-ink-500 mt-1 text-sm">
          Keep your account secure with a strong password
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 p-6">
        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-ink-100">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-ink-900">
              Change Your Password
            </h2>
            <p className="text-[11px] text-ink-500">
              You'll stay logged in after updating
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordField
            label="Current Password"
            value={current}
            onChange={setCurrent}
            show={showCurrent}
            setShow={setShowCurrent}
            placeholder="Enter your current password"
          />

          <PasswordField
            label="New Password"
            value={newPass}
            onChange={setNewPass}
            show={showNew}
            setShow={setShowNew}
            placeholder="At least 8 characters"
          />

          <PasswordField
            label="Confirm New Password"
            value={confirm}
            onChange={setConfirm}
            show={showConfirm}
            setShow={setShowConfirm}
            placeholder="Re-enter new password"
          />

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 flex items-start gap-2">
            <Lock className="h-3.5 w-3.5 text-primary-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-ink-600">
              Must be 8+ characters with at least 1 letter and 1 number.
            </p>
          </div>

          {error && (
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 text-xs text-danger-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold hover:shadow-lg disabled:opacity-60 transition"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                Update Password
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  show,
  setShow,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  setShow: (v: boolean) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-ink-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-ink-200 pl-10 pr-10 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-primary-400"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
