import { Sparkles, Menu } from "lucide-react";

interface Props {
  onOpenSidebar?: () => void;
}

export default function ChatHeader({ onOpenSidebar }: Props) {
  return (
    <div className="flex items-center gap-2.5 px-4 h-14 border-b border-ink-200 bg-white shrink-0">
      <button
        onClick={onOpenSidebar}
        className="lg:hidden p-1.5 -ml-1 rounded-lg hover:bg-ink-100 text-ink-700"
        aria-label="Open sessions"
      >
        <Menu className="h-4 w-4" />
      </button>

      <div className="relative">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="absolute -bottom-0 -right-0 h-2.5 w-2.5 rounded-full bg-success-500 border-2 border-white" />
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <h2 className="text-[13px] font-bold text-ink-900 truncate">
            Jyotish AI
          </h2>
          <span className="text-[9px] font-semibold uppercase tracking-wider text-success-600">
            Online
          </span>
        </div>
        <p className="text-[10px] text-ink-500 truncate">
          Vedic Astrologer · Available 24/7
        </p>
      </div>
    </div>
  );
}
