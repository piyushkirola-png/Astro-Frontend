import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users as UsersIcon,
  Loader2,
  AlertCircle,
  Trash2,
  Power,
  PowerOff,
  CheckCircle,
} from 'lucide-react';
import { useAdminUsers } from '../../../api/queries/useAdmin';
import {
  useToggleUserStatus,
  useDeleteUser,
} from '../../../api/mutations/adminMutations';
import userService from '../../../api/services/userService';
import type { UserProfile } from '../../../types/user';

export default function AdminUsers() {
  const { data, isLoading, isError, refetch } = useAdminUsers();
  const toggleMutation = useToggleUserStatus();
  const deleteMutation = useDeleteUser();

  const [confirmAction, setConfirmAction] = useState<{
    type: 'toggle' | 'delete';
    user: UserProfile;
  } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const fmtDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleToggleConfirm = () => {
    if (!confirmAction) return;
    const { user } = confirmAction;
    const newActive = !user.isActive;
    toggleMutation.mutate(
      { id: user.id, active: newActive },
      {
        onSuccess: () => {
          setToast(
            newActive ? `${user.name} activated` : `${user.name} deactivated`
          );
          setConfirmAction(null);
        },
        onError: (err: any) => {
          setToast(err?.response?.data?.message || 'Action failed');
          setConfirmAction(null);
        },
      }
    );
  };

  const handleDeleteConfirm = () => {
    if (!confirmAction) return;
    const { user } = confirmAction;
    deleteMutation.mutate(user.id, {
      onSuccess: () => {
        setToast(`${user.name} deleted`);
        setConfirmAction(null);
      },
      onError: (err: any) => {
        setToast(err?.response?.data?.message || 'Delete failed');
        setConfirmAction(null);
      },
    });
  };

  const saving = toggleMutation.isPending || deleteMutation.isPending;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">Users</h1>
        <p className="text-ink-500 mt-1 text-sm">
          Manage all registered users on the platform
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="bg-white rounded-2xl border border-ink-100 p-12 text-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary-500 mx-auto" />
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="bg-white rounded-2xl border border-ink-100 p-12 text-center">
          <AlertCircle className="h-7 w-7 text-danger-500 mx-auto mb-3" />
          <p className="text-sm text-ink-700 mb-3">Failed to load users</p>
          <button
            onClick={() => refetch()}
            className="rounded-lg px-4 py-2 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && (!data || data.length === 0) && (
        <div className="bg-white rounded-2xl border border-ink-100 p-12 text-center">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 mb-4">
            <UsersIcon className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-lg font-bold text-ink-900 mb-1">No users yet</h2>
          <p className="text-sm text-ink-500 max-w-md mx-auto">
            Registered users will appear here.
          </p>
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && data && data.length > 0 && (
        <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 border-b border-ink-100 bg-ink-50/50 text-[11px] uppercase tracking-wider text-ink-500 font-semibold">
            <div className="col-span-3">User</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-2">Phone</div>
            <div className="col-span-1">Role</div>
            <div className="col-span-1">Joined</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {data.map((u) => {
            const avatarSrc = userService.absoluteAvatarUrl(u.avatarUrl);
            return (
              <div
                key={u.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 px-5 py-4 border-b border-ink-100 last:border-b-0 hover:bg-ink-50/40 transition items-center"
              >
                <div className="col-span-3 flex items-center gap-3 min-w-0">
                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt={u.name}
                      className="h-10 w-10 rounded-full object-cover shrink-0 border border-ink-200"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {u.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-ink-900 truncate">
                      {u.name}
                    </div>
                  </div>
                </div>

                <div className="col-span-3 text-xs text-ink-600 truncate">
                  {u.email}
                </div>

                <div className="col-span-2 text-xs text-ink-600 truncate">
                  {u.phone || '—'}
                </div>

                <div className="col-span-1">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      u.role === 'ADMIN'
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-accent-100 text-accent-700'
                    }`}
                  >
                    {u.role}
                  </span>
                </div>

                <div className="col-span-1 text-xs text-ink-500">
                  {fmtDate(u.createdAt)}
                </div>

                <div className="col-span-1">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      u.isActive
                        ? 'bg-success-100 text-success-700'
                        : 'bg-ink-200 text-ink-600'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        u.isActive ? 'bg-success-500' : 'bg-ink-400'
                      }`}
                    />
                    {u.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="col-span-1 flex justify-start md:justify-end gap-1">
                  <button
                    onClick={() =>
                      setConfirmAction({ type: 'toggle', user: u })
                    }
                    className={`p-2 rounded-lg transition ${
                      u.isActive
                        ? 'text-ink-500 hover:text-warning-600 hover:bg-warning-50'
                        : 'text-ink-500 hover:text-success-600 hover:bg-success-50'
                    }`}
                    aria-label={u.isActive ? 'Deactivate' : 'Activate'}
                    title={u.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {u.isActive ? (
                      <PowerOff className="h-4 w-4" />
                    ) : (
                      <Power className="h-4 w-4" />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      u.isActive
                        ? setConfirmAction({ type: 'toggle', user: u })
                        : setConfirmAction({ type: 'delete', user: u })
                    }
                    className={`p-2 rounded-lg transition ${
                      u.isActive
                        ? 'text-ink-400 hover:text-warning-600 hover:bg-warning-50'
                        : 'text-ink-500 hover:text-danger-600 hover:bg-danger-50'
                    }`}
                    aria-label="Delete"
                    title={
                      u.isActive
                        ? 'Active users must be deactivated before deletion'
                        : 'Delete user'
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirm dialog — PORTAL */}
      {createPortal(
        <AnimatePresence>
          {confirmAction && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
              onClick={() => setConfirmAction(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl p-5 w-full max-w-sm shadow-2xl"
              >
                {confirmAction.type === 'toggle' ? (
                  <>
                    <h3 className="text-sm font-bold text-ink-900 mb-1">
                      {confirmAction.user.isActive
                        ? `Deactivate ${confirmAction.user.name}?`
                        : `Activate ${confirmAction.user.name}?`}
                    </h3>
                    <p className="text-xs text-ink-500 mb-5">
                      {confirmAction.user.isActive
                        ? "They won't be able to log in until reactivated."
                        : 'They will be able to log in again.'}
                    </p>
                    <div className="flex gap-2.5">
                      <button
                        onClick={() => setConfirmAction(null)}
                        disabled={saving}
                        className="flex-1 rounded-lg px-4 py-2 border border-ink-200 text-ink-700 text-xs font-semibold hover:bg-ink-50 disabled:opacity-60"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleToggleConfirm}
                        disabled={saving}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-xs font-semibold hover:shadow-md disabled:opacity-60"
                      >
                        {saving ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : confirmAction.user.isActive ? (
                          'Deactivate'
                        ) : (
                          'Activate'
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-sm font-bold text-ink-900 mb-1">
                      Delete {confirmAction.user.name}?
                    </h3>
                    <p className="text-xs text-ink-500 mb-5">
                      This will permanently remove the user. Cannot be undone.
                    </p>
                    <div className="flex gap-2.5">
                      <button
                        onClick={() => setConfirmAction(null)}
                        disabled={saving}
                        className="flex-1 rounded-lg px-4 py-2 border border-ink-200 text-ink-700 text-xs font-semibold hover:bg-ink-50 disabled:opacity-60"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeleteConfirm}
                        disabled={saving}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 bg-danger-600 text-white text-xs font-semibold hover:bg-danger-700 disabled:opacity-60"
                      >
                        {saving ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          'Delete'
                        )}
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Toast — PORTAL */}
      {createPortal(
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20, x: 20 }}
              className="fixed top-6 right-6 z-[9999] flex items-center gap-3 bg-white border border-success-200 shadow-xl rounded-lg px-3.5 py-2.5 max-w-xs"
            >
              <div className="p-1 rounded bg-success-100">
                <CheckCircle className="h-3.5 w-3.5 text-success-600" />
              </div>
              <span className="text-xs font-medium text-ink-900">{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}