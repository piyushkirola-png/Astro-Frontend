import { useState, useRef, useEffect } from "react";
import {
  Plus,
  MessageSquare,
  Trash2,
  Pencil,
  MoreVertical,
  Loader2,
} from "lucide-react";
import type { ChatSessionSummary } from "../../types/chat";

interface Props {
  sessions: ChatSessionSummary[];
  activeId: number | null;
  loading: boolean;
  onSelect: (id: number) => void;
  onNew: () => void;
  onDelete: (id: number) => void;
  onRename: (id: number, title: string) => void;
  creating: boolean;
}

export default function SessionSidebar({
  sessions,
  activeId,
  loading,
  onSelect,
  onNew,
  onDelete,
  onRename,
  creating,
}: Props) {
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const menuWrapRef = useRef<HTMLDivElement>(null);

  // ---- date format: 11 Sep 2026 ----
  const fmtDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Focus input when editing
  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  // Close menu on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        menuWrapRef.current &&
        !menuWrapRef.current.contains(e.target as Node)
      ) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const startRename = (id: number, currentTitle: string) => {
    setMenuOpenId(null);
    setEditingId(id);
    setEditValue(currentTitle);
  };

  const commitRename = () => {
    if (editingId === null) return;
    const trimmed = editValue.trim();
    if (trimmed) onRename(editingId, trimmed);
    setEditingId(null);
  };

  return (
    <aside className="flex h-full w-full flex-col bg-ink-950 text-ink-300">
      {/* New Chat */}
      <div className="p-3 border-b border-white/10 shrink-0">
        <button
          onClick={onNew}
          disabled={creating}
          className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-[11px] font-semibold hover:shadow-md disabled:opacity-60 transition"
        >
          {creating ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Plus className="h-3 w-3" />
          )}
          New Chat
        </button>
      </div>

      {/* Sessions */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {loading && (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-4 w-4 animate-spin text-ink-500" />
          </div>
        )}

        {!loading && sessions.length === 0 && (
          <div className="text-center text-[10px] text-ink-500 py-8 px-4 leading-relaxed">
            No chats yet.
            <br />
            Click "New Chat" to start.
          </div>
        )}

        {sessions.map((s) => {
          const active = s.id === activeId;
          const editing = editingId === s.id;
          const menuOpen = menuOpenId === s.id;

          return (
            <div
              key={s.id}
              className={`relative rounded-lg px-2.5 py-2 transition ${
                active
                  ? "bg-gradient-to-r from-primary-600/20 to-accent-500/20 border border-accent-500/30 text-white"
                  : "hover:bg-white/5 cursor-pointer"
              }`}
              onClick={() => {
                if (!editing) onSelect(s.id);
              }}
            >
              {/* Row: icon | title+preview | date | ··· */}
              <div className="flex items-start gap-2">
                <MessageSquare className="h-3 w-3 mt-0.5 shrink-0 opacity-70" />

                {/* Title + preview — flex-1, will shrink */}
                <div className="flex-1 min-w-0">
                  {editing ? (
                    <input
                      ref={inputRef}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          commitRename();
                        } else if (e.key === "Escape") {
                          e.preventDefault();
                          setEditingId(null);
                        }
                      }}
                      onBlur={commitRename}
                      onClick={(e) => e.stopPropagation()}
                      maxLength={80}
                      className="w-full bg-white/10 border border-accent-500/40 rounded px-1.5 py-0.5 text-[11px] text-white focus:outline-none"
                    />
                  ) : (
                    <div className="text-[11px] font-medium truncate">
                      {s.title}
                    </div>
                  )}
                  <div className="text-[9px] text-ink-500 truncate mt-0.5">
                    {s.lastMessagePreview || "No messages"}
                  </div>
                </div>

                {/* Date — fixed width column, no overlap */}
                <span className="text-[9px] text-ink-500 shrink-0 pt-0.5 w-[68px] text-right leading-tight">
                  {fmtDate(s.updatedAt)}
                </span>

                {/* Three-dot — fixed 20px column */}
                <div
                  ref={menuOpen ? menuWrapRef : null}
                  className="relative shrink-0 w-5 flex justify-center"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpenId(menuOpen ? null : s.id);
                    }}
                    className={`p-0.5 rounded transition ${
                      menuOpen
                        ? "bg-white/10 text-white"
                        : "text-ink-500 hover:text-white hover:bg-white/10"
                    }`}
                    aria-label="Options"
                  >
                    <MoreVertical className="h-3.5 w-3.5" />
                  </button>

                  {/* Dropdown */}
                  {menuOpen && (
                    <div
                      className="absolute right-0 top-full mt-1 z-20 w-32 bg-white rounded-lg shadow-xl border border-ink-200 py-1 overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startRename(s.id, s.title);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-ink-700 hover:bg-ink-50 transition"
                      >
                        <Pencil className="h-3 w-3" />
                        Rename
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenId(null);
                          setConfirmDeleteId(s.id);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-danger-600 hover:bg-danger-50 transition"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete confirm */}
      {confirmDeleteId !== null && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={() => setConfirmDeleteId(null)}
        >
          <div
            className="bg-white rounded-xl p-5 w-full max-w-xs shadow-2xl text-ink-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold mb-1">Delete this chat?</h3>
            <p className="text-xs text-ink-500 mb-4">
              All messages will be permanently removed.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 rounded-lg px-3 py-2 border border-ink-200 text-ink-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="flex-1 rounded-lg px-3 py-2 bg-danger-600 text-white text-xs font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
