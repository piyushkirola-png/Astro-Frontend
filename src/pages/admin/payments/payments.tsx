import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreditCard,
  Loader2,
  Pencil,
  Check,
  X,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Clock,
} from 'lucide-react';
import adminService from '../../../api/services/adminService';
import type {
  AdminPaymentRecord,
  AdminWalletPackage,
} from '../../../types/admin';

export default function AdminPayments() {
  const [tab, setTab] = useState<'slabs' | 'transactions'>('slabs');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">Payments</h1>
        <p className="text-ink-500 mt-1 text-sm">
          Manage wallet slab prices and monitor transactions
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 p-2 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          <TabButton
            active={tab === 'slabs'}
            onClick={() => setTab('slabs')}
            icon={<Clock className="h-4 w-4" />}
            label="Wallet Slabs"
          />
          <TabButton
            active={tab === 'transactions'}
            onClick={() => setTab('transactions')}
            icon={<CreditCard className="h-4 w-4" />}
            label="Transactions"
          />
        </div>
      </div>

      {tab === 'slabs' && <SlabsTab />}
      {tab === 'transactions' && <TransactionsTab />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${active
          ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-md'
          : 'text-ink-600 hover:bg-ink-50'
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

function SlabsTab() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin', 'payments', 'wallet', 'packages'],
    queryFn: () => adminService.listWalletPackages(),
  });

  const priceMutation = useMutation({
    mutationFn: ({ id, amount }: { id: number; amount: number }) =>
      adminService.updatePackagePrice(id, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'payments', 'wallet', 'packages'],
      });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, active }: { id: number; active: boolean }) =>
      adminService.togglePackageActive(id, active),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'payments', 'wallet', 'packages'],
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="bg-white rounded-2xl border border-ink-100 p-10 text-center">
        <AlertCircle className="h-7 w-7 text-danger-500 mx-auto mb-3" />
        <p className="text-sm text-ink-700 mb-3">Failed to load packages</p>
        <button
          onClick={() => refetch()}
          className="rounded-lg px-4 py-2 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-ink-100">
        <h2 className="text-sm font-bold text-ink-900">
          Wallet Recharge Slabs
        </h2>
        <p className="text-xs text-ink-500 mt-0.5">
          Minutes are fixed. Only prices can be edited.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="bg-ink-50/70 text-left text-[11px] uppercase tracking-wider text-ink-500 font-semibold">
              <th className="px-5 py-3">Slab</th>
              <th className="px-5 py-3">Duration</th>
              <th className="px-5 py-3">Price (₹)</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((pkg) => (
              <SlabRow
                key={pkg.id}
                pkg={pkg}
                onSave={(amount) =>
                  priceMutation.mutate({ id: pkg.id, amount })
                }
                onToggle={() =>
                  toggleMutation.mutate({
                    id: pkg.id,
                    active: !pkg.isActive,
                  })
                }
                saving={
                  priceMutation.isPending &&
                  priceMutation.variables?.id === pkg.id
                }
                toggling={
                  toggleMutation.isPending &&
                  toggleMutation.variables?.id === pkg.id
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SlabRow({
  pkg,
  onSave,
  onToggle,
  saving,
  toggling,
}: {
  pkg: AdminWalletPackage;
  onSave: (amount: number) => void;
  onToggle: () => void;
  saving: boolean;
  toggling: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(pkg.amount));

  const handleSave = () => {
    const num = parseFloat(draft);
    if (isNaN(num) || num <= 0) return;
    onSave(num);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(String(pkg.amount));
    setEditing(false);
  };

  const mins = Math.round(pkg.secondsCredited / 60);

  return (
    <tr className="border-t border-ink-100 hover:bg-ink-50/40 transition">
      <td className="px-5 py-3 font-semibold text-ink-900 whitespace-nowrap">
        {pkg.label}
      </td>
      <td className="px-5 py-3 text-ink-600 whitespace-nowrap">
        {mins} min · {pkg.secondsCredited}s
      </td>
      <td className="px-5 py-3 whitespace-nowrap">
        {editing ? (
          <input
            type="number"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-24 rounded-lg border border-ink-200 px-2 py-1 text-sm focus:outline-none focus:border-primary-400"
            autoFocus
          />
        ) : (
          <span className="font-bold text-ink-900">₹{pkg.amount}</span>
        )}
      </td>
      <td className="px-5 py-3 whitespace-nowrap">
        {pkg.isActive ? (
          <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-green-100 text-green-700">
            Active
          </span>
        ) : (
          <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-ink-100 text-ink-600">
            Inactive
          </span>
        )}
      </td>
      <td className="px-5 py-3 text-right whitespace-nowrap">
        <div className="inline-flex items-center gap-1.5">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 bg-green-600 text-white text-xs font-semibold hover:bg-green-700 disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Check className="h-3 w-3" />
                )}
                Save
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50"
              >
                <X className="h-3 w-3" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50"
            >
              <Pencil className="h-3 w-3" />
              Edit
            </button>
          )}
          <button
            onClick={onToggle}
            disabled={toggling}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50 disabled:opacity-60"
          >
            {toggling ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : pkg.isActive ? (
              <ToggleRight className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <ToggleLeft className="h-3.5 w-3.5 text-ink-500" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}

function TransactionsTab() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin', 'payments', 'all'],
    queryFn: () => adminService.listAllPayments(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="bg-white rounded-2xl border border-ink-100 p-10 text-center">
        <AlertCircle className="h-7 w-7 text-danger-500 mx-auto mb-3" />
        <p className="text-sm text-ink-700 mb-3">Failed to load transactions</p>
        <button
          onClick={() => refetch()}
          className="rounded-lg px-4 py-2 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50"
        >
          Retry
        </button>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-ink-100 p-12 text-center">
        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4">
          <CreditCard className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-lg font-bold text-ink-900 mb-1">
          No transactions yet
        </h2>
        <p className="text-sm text-ink-500 max-w-md mx-auto">
          All user payments across the platform will appear here.
        </p>
      </div>
    );
  }

  const totalAmount = data
    .filter((p) => p.status === 'SUCCESS')
    .reduce((sum, p) => sum + Number(p.amount), 0);
  const successCount = data.filter((p) => p.status === 'SUCCESS').length;
  const failedCount = data.filter((p) => p.status === 'FAILED').length;

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="Total Collected" value={`₹${totalAmount}`} />
        <StatCard label="Successful" value={String(successCount)} />
        <StatCard label="Failed" value={String(failedCount)} />
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm">
            <thead>
              <tr className="bg-ink-50/70 text-left text-[11px] uppercase tracking-wider text-ink-500 font-semibold">
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Gateway</th>
                <th className="px-4 py-3">UTR</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-ink-100 hover:bg-ink-50/40 transition"
                >
                  <td className="px-4 py-3 font-mono text-xs text-ink-700 whitespace-nowrap">
                    {row.gatewayOrderId}
                  </td>
                  <td className="px-4 py-3 text-ink-900 whitespace-nowrap">
                    {productLabel(row)}
                  </td>
                  <td className="px-4 py-3 font-semibold text-ink-900 whitespace-nowrap">
                    ₹{row.amount}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3 text-ink-600 whitespace-nowrap">
                    {row.gateway}
                  </td>
                  <td className="px-4 py-3 text-ink-600 font-mono text-xs whitespace-nowrap">
                    {row.utr || '—'}
                  </td>
                  <td className="px-4 py-3 text-ink-600 whitespace-nowrap text-xs">
                    {formatDate(row.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-5">
      <div className="text-xs text-ink-500 font-medium uppercase tracking-wider">
        {label}
      </div>
      <div className="text-2xl font-bold text-ink-900 mt-1">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = status?.toUpperCase();
  if (s === 'SUCCESS') {
    return (
      <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-green-100 text-green-700">
        Success
      </span>
    );
  }
  if (s === 'FAILED') {
    return (
      <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-red-100 text-red-700">
        Failed
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-700">
      {status}
    </span>
  );
}

function productLabel(row: AdminPaymentRecord): string {
  if (row.categoryCode === 'REPORT') return 'Kundali Report';
  if (row.categoryCode === 'WALLET') {
    if (row.secondsCredited) {
      const mins = Math.round(row.secondsCredited / 60);
      return `Chat Recharge · ${mins} min`;
    }
    return 'Chat Recharge';
  }
  return row.notes || 'Payment';
}

function formatDate(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}