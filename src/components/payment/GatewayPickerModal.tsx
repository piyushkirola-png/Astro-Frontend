import { useState } from 'react';
import { X, Loader2, CreditCard } from 'lucide-react';
import { createPortal } from 'react-dom';

export interface GatewayOption {
  code: string;
  name: string;
  logo: string;
  description?: string;
}

const AVAILABLE_GATEWAYS: GatewayOption[] = [
  {
    code: 'CASHFREE',
    name: 'Cashfree',
    logo: '/partners/cashfree.png',
    description: 'UPI, Cards, Netbanking, Wallets',
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
  amount: number;
  productLabel: string;
  onSelect: (gatewayCode: string) => void;
  loading?: boolean;
}

export default function GatewayPickerModal({
  open,
  onClose,
  amount,
  productLabel,
  onSelect,
  loading,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  if (!open) return null;

  const handleConfirm = () => {
    if (!selected) return;
    onSelect(selected);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-100">
          <div>
            <h3 className="text-base font-bold text-ink-900">
              Choose Payment Method
            </h3>
            <p className="text-xs text-ink-500 mt-0.5">
              {productLabel} · ₹{amount}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-ink-100 text-ink-500"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {AVAILABLE_GATEWAYS.map((gw) => (
            <button
              key={gw.code}
              onClick={() => setSelected(gw.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition text-left ${
                selected === gw.code
                  ? 'border-primary-500 bg-primary-50/50'
                  : 'border-ink-100 hover:border-primary-200 hover:bg-ink-50/50'
              }`}
            >
              <div className="h-10 w-14 shrink-0 rounded-lg bg-white border border-ink-100 flex items-center justify-center overflow-hidden">
                <img
                  src={gw.logo}
                  alt={gw.name}
                  className="max-h-7 max-w-12 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector('.fallback-label')) {
                      const span = document.createElement('span');
                      span.className =
                        'fallback-label text-[10px] font-bold text-ink-700';
                      span.textContent = gw.name.slice(0, 3).toUpperCase();
                      parent.appendChild(span);
                    }
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-ink-900">{gw.name}</div>
                {gw.description && (
                  <div className="text-[11px] text-ink-500 truncate">
                    {gw.description}
                  </div>
                )}
              </div>
              <div
                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selected === gw.code
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-ink-300'
                }`}
              >
                {selected === gw.code && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={handleConfirm}
            disabled={!selected || loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirecting...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                Pay ₹{amount}
              </>
            )}
          </button>
          <p className="text-[10px] text-center text-ink-400 mt-2">
            You'll be redirected to a secure payment page
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}