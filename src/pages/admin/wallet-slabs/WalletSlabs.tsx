import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Timer,
  Loader2,
  Pencil,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import adminService from "../../../api/services/adminService";
import { useAuth } from '../../../lib/AuthContext';
import type { AdminWalletPackage } from "../../../types/admin";

export default function WalletSlabs() {
  const queryClient = useQueryClient();
  const { showToast } = useAuth();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin", "payments", "wallet", "packages"],
    queryFn: () => adminService.listWalletPackages(),
  });

  const [editing, setEditing] = useState<AdminWalletPackage | null>(null);

  const toggleMutation = useMutation({
    mutationFn: ({ id, active }: { id: number; active: boolean }) =>
      adminService.togglePackageActive(id, active),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'payments', 'wallet', 'packages'],
      });
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      showToast(
        variables.active
          ? 'Slab activated successfully'
          : 'Slab deactivated successfully'
      );
    },
    onError: () => {
      showToast('Failed to update slab status');
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">
          Wallet Slabs
        </h1>
        <p className="text-ink-500 mt-1 text-sm">
          Manage chat recharge slabs — durations are fixed, prices are editable
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
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
              {data.map((pkg) => {
                const mins = Math.round(pkg.secondsCredited / 60);
                const toggling =
                  toggleMutation.isPending &&
                  toggleMutation.variables?.id === pkg.id;

                return (
                  <tr
                    key={pkg.id}
                    className="border-t border-ink-100 hover:bg-ink-50/40 transition"
                  >
                    <td className="px-5 py-3 font-semibold text-ink-900 whitespace-nowrap">
                      {pkg.label}
                    </td>
                    <td className="px-5 py-3 text-ink-600 whitespace-nowrap">
                      {mins} min · {pkg.secondsCredited}s
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className="font-bold text-ink-900">
                        ₹{pkg.amount}
                      </span>
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
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setEditing(pkg)}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50 transition"
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            toggleMutation.mutate({
                              id: pkg.id,
                              active: !pkg.isActive,
                            })
                          }
                          disabled={toggling}
                          className="inline-flex items-center justify-center rounded-lg p-1.5 border border-ink-200 text-ink-700 hover:bg-ink-50 transition disabled:opacity-60"
                          title={pkg.isActive ? "Deactivate" : "Activate"}
                        >
                          {toggling ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : pkg.isActive ? (
                            <ToggleRight className="h-5 w-5 text-green-600" />
                          ) : (
                            <ToggleLeft className="h-5 w-5 text-ink-500" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <EditPriceDialog pkg={editing} onClose={() => setEditing(null)} />
    </div>
  );
}

function EditPriceDialog({
  pkg,
  onClose,
}: {
  pkg: AdminWalletPackage | null;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const { showToast } = useAuth();
  const [draft, setDraft] = useState('');

  const priceMutation = useMutation({
    mutationFn: ({ id, amount }: { id: number; amount: number }) =>
      adminService.updatePackagePrice(id, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'payments', 'wallet', 'packages'],
      });
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      setDraft('');
      onClose();
      showToast('Price updated successfully');
    },
    onError: () => {
      showToast('Failed to update price');
    },
  });

  if (!pkg) return null;

  const currentDraft = draft === "" ? String(pkg.amount) : draft;

  const handleSave = () => {
    const num = parseFloat(currentDraft);
    if (isNaN(num) || num <= 0) return;
    priceMutation.mutate({ id: pkg.id, amount: num });
  };

  const mins = Math.round(pkg.secondsCredited / 60);

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-100">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white">
              <Timer className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink-900">
                Edit Slab Price
              </h3>
              <p className="text-[11px] text-ink-500">{pkg.label}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-ink-100 text-ink-500"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="bg-ink-50 rounded-xl p-3 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-ink-500">Label</span>
              <span className="font-semibold text-ink-900">{pkg.label}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-ink-500">Duration</span>
              <span className="font-semibold text-ink-900">
                {mins} min · {pkg.secondsCredited}s
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-ink-500">Current Price</span>
              <span className="font-semibold text-ink-900">₹{pkg.amount}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1.5">
              New Price (₹)
            </label>
            <input
              type="number"
              value={currentDraft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") onClose();
              }}
              min="1"
              step="1"
              autoFocus
              className="w-full rounded-xl border border-ink-200 px-3 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
            />
          </div>

          {priceMutation.isError && (
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-2.5 text-xs text-danger-700">
              Failed to update. Please try again.
            </div>
          )}
        </div>

        <div className="flex gap-2 px-5 pb-5">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl px-4 py-2.5 border border-ink-200 text-sm font-semibold text-ink-700 hover:bg-ink-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={priceMutation.isPending}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold hover:shadow-lg disabled:opacity-60 transition"
          >
            {priceMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
