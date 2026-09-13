import { Lock, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function PaywallOverlay({ open, onClose }: Props) {
  const navigate = useNavigate();
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-gradient-to-b from-white/60 to-white/95 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-accent-200 p-6 lg:p-8 max-w-sm w-full text-center">
        <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 mb-4">
          <Lock className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-lg font-bold text-ink-900 mb-2">
          Your free time is over
        </h2>
        <p className="text-sm text-ink-500 mb-6">
          You've used all{" "}
          <span className="font-semibold text-ink-700">2 minutes</span> of free
          chat. Recharge to continue talking with Jyotish AI.
        </p>
        <button
          onClick={() => navigate("/user/payments")}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold hover:shadow-lg transition"
        >
          <Sparkles className="h-4 w-4" />
          Recharge Now
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          onClick={onClose}
          className="mt-3 text-xs text-ink-400 hover:text-ink-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
