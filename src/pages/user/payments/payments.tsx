import { CreditCard } from 'lucide-react';

export default function UserPayments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">My Payments</h1>
        <p className="text-ink-500 mt-1 text-sm">
          Your transaction history and invoices
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 p-12 text-center">
        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4">
          <CreditCard className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-lg font-bold text-ink-900 mb-1">No payments yet</h2>
        <p className="text-sm text-ink-500 max-w-md mx-auto">
          Your consultation payments, kundali purchases, and other transactions will
          appear here once you make them.
        </p>
      </div>
    </div>
  );
}