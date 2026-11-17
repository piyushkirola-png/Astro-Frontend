import { Menu } from "lucide-react";

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
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white overflow-hidden">
          <img
            src="/general/ai.png"
            alt="Jyotish AI"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) {
                parent.innerHTML =
                  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>';
              }
            }}
          />
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