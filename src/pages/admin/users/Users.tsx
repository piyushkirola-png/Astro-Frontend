import { Users as UsersIcon, Search } from 'lucide-react';

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">Users</h1>
          <p className="text-ink-500 mt-1 text-sm">
            Manage all registered users on the platform
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-400/20 transition-all text-sm"
          />
        </div>
      </div>

      {/* Empty state */}
      <div className="bg-white rounded-2xl border border-ink-100 p-12 text-center">
        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 mb-4">
          <UsersIcon className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-lg font-bold text-ink-900 mb-1">Users list coming soon</h2>
        <p className="text-sm text-ink-500 max-w-md mx-auto">
          The API integration to <code className="bg-ink-100 px-1.5 py-0.5 rounded text-xs">GET /api/users</code> will
          be added in the next phase. This page will show a paginated table with
          filters, sorting, and actions.
        </p>
      </div>
    </div>
  );
}