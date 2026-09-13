import { MessageSquare, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyConsultations() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">
            My Consultations
          </h1>
          <p className="text-ink-500 mt-1 text-sm">
            Your chat and call history with astrologers
          </p>
        </div>
        <Link
          to="/consultations"
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-semibold hover:shadow-lg transition-all"
        >
          <Plus className="h-4 w-4" />
          New Consultation
        </Link>
      </div>

      {/* Empty state */}
      <div className="bg-white rounded-2xl border border-ink-100 p-12 text-center">
        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-4">
          <MessageSquare className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-lg font-bold text-ink-900 mb-1">
          No consultations yet
        </h2>
        <p className="text-sm text-ink-500 max-w-md mx-auto mb-6">
          Start your first consultation with an expert astrologer. Get
          personalized guidance on love, career, health, and more.
        </p>
        <Link
          to="/consultations"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 border border-ink-200 text-ink-700 text-sm font-semibold hover:border-primary-300 hover:text-primary-700 transition-all"
        >
          Browse Astrologers
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
