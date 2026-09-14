import { useState, useRef, useEffect, useMemo } from "react";
import {
  Plus,
  MessageSquare,
  Trash2,
  Pencil,
  MoreVertical,
  Loader2,
  Search,
  Pin,
  PinOff,
  X,
  CheckSquare,
  Square,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import type { ChatSessionSummary } from "../../types/chat";
import { useAuth } from "../../lib/AuthContext";
import chatService from "../../api/services/chatService";

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

interface Group {
  label: string;
  sessions: ChatSessionSummary[];
}

function groupSessions(sessions: ChatSessionSummary[]): Group[] {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const sevenDaysAgo = startOfToday - 7 * 24 * 60 * 60 * 1000;
  const thirtyDaysAgo = startOfToday - 30 * 24 * 60 * 60 * 1000;

  const pinned: ChatSessionSummary[] = [];
  const today: ChatSessionSummary[] = [];
  const last7: ChatSessionSummary[] = [];
  const last30: ChatSessionSummary[] = [];
  const older: ChatSessionSummary[] = [];

  sessions.forEach((s) => {
    if (s.isPinned) {
      pinned.push(s);
      return;
    }
    const ts = new Date(s.updatedAt).getTime();
    if (ts >= startOfToday) today.push(s);
    else if (ts >= sevenDaysAgo) last7.push(s);
    else if (ts >= thirtyDaysAgo) last30.push(s);
    else older.push(s);
  });

  const groups: Group[] = [];
  if (pinned.length) groups.push({ label: "Pinned", sessions: pinned });
  if (today.length) groups.push({ label: "Today", sessions: today });
  if (last7.length) groups.push({ label: "Last 7 Days", sessions: last7 });
  if (last30.length) groups.push({ label: "Last 30 Days", sessions: last30 });
  if (older.length) groups.push({ label: "Older", sessions: older });
  return groups;
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
  const { showToast } = useAuth();
  const queryClient = useQueryClient();

  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [search, setSearch] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const menuWrapRef = useRef<HTMLDivElement>(null);

  const fmtDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

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

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sessions;
    return sessions.filter((s) => s.title.toLowerCase().includes(q));
  }, [sessions, search]);

  const groups = useMemo(() => groupSessions(filtered), [filtered]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const closeSelectMode = () => {
    setSelectMode(false);
    setSelectedIds(new Set());
  };

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

  const handleTogglePin = async (id: number) => {
    setMenuOpenId(null);
    try {
      await chatService.togglePin(id);
      queryClient.invalidateQueries({ queryKey: ["chat", "sessions"] });
      showToast("Pin toggled");
    } catch {
      showToast("Failed to toggle pin");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    setBulkLoading(true);
    try {
      await chatService.bulkDelete(Array.from(selectedIds));
      queryClient.invalidateQueries({ queryKey: ["chat", "sessions"] });
      showToast(`${selectedIds.size} chat(s) deleted`);
      closeSelectMode();
    } catch {
      showToast("Failed to delete chats");
    } finally {
      setBulkLoading(false);
    }
  };

  const handleBulkPin = async () => {
    if (selectedIds.size === 0) return;
    setBulkLoading(true);
    try {
      await chatService.bulkPin(Array.from(selectedIds), true);
      queryClient.invalidateQueries({ queryKey: ["chat", "sessions"] });
      showToast(`${selectedIds.size} chat(s) pinned`);
      closeSelectMode();
    } catch {
      showToast("Failed to pin chats");
    } finally {
      setBulkLoading(false);
    }
  };

  return (
    <aside className="flex h-full w-full flex-col bg-ink-950 text-ink-300">
      {/* Header: New Chat + Select */}
      <div className="p-3 border-b border-white/10 shrink-0 space-y-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onNew}
            disabled={creating}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-[11px] font-semibold hover:shadow-md disabled:opacity-60 transition"
          >
            {creating ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Plus className="h-3 w-3" />
            )}
            New Chat
          </button>

          {selectMode ? (
            <button
              onClick={closeSelectMode}
              className="inline-flex items-center justify-center rounded-lg px-2 py-2 bg-white/5 text-ink-300 hover:bg-white/10 transition"
              title="Cancel select"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setSelectMode(true)}
              className="inline-flex items-center justify-center rounded-lg px-2 py-2 bg-white/5 text-ink-300 hover:bg-white/10 transition"
              title="Select chats"
            >
              <CheckSquare className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-ink-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chats..."
            className="w-full rounded-lg bg-white/5 border border-white/10 pl-7 pr-2 py-1.5 text-[11px] text-white placeholder-ink-500 focus:outline-none focus:border-accent-500/40"
          />
        </div>
      </div>

      {/* Sessions */}
      <div className="flex-1 overflow-y-auto p-2">
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

        {!loading && sessions.length > 0 && filtered.length === 0 && (
          <div className="text-center text-[10px] text-ink-500 py-8 px-4 leading-relaxed">
            No chats match "{search}"
          </div>
        )}

        {groups.map((group) => (
          <div key={group.label} className="mb-2">
            <div className="px-2.5 py-1.5 text-[9px] uppercase tracking-wider text-ink-500 font-bold">
              {group.label}
            </div>

            <div className="space-y-1">
              {group.sessions.map((s) => {
                const active = s.id === activeId;
                const editing = editingId === s.id;
                const menuOpen = menuOpenId === s.id;
                const isSelected = selectedIds.has(s.id);

                return (
                  <div
                    key={s.id}
                    className={`relative rounded-lg px-2.5 py-2 transition ${
                      active
                        ? "bg-gradient-to-r from-primary-600/20 to-accent-500/20 border border-accent-500/30 text-white"
                        : "hover:bg-white/5 cursor-pointer"
                    }`}
                    onClick={() => {
                      if (selectMode) {
                        toggleSelect(s.id);
                      } else if (!editing) {
                        onSelect(s.id);
                      }
                    }}
                  >
                    <div className="flex items-start gap-2">
                      {selectMode ? (
                        <div className="shrink-0 mt-0.5">
                          {isSelected ? (
                            <CheckSquare className="h-3.5 w-3.5 text-accent-500" />
                          ) : (
                            <Square className="h-3.5 w-3.5 text-ink-500" />
                          )}
                        </div>
                      ) : s.isPinned ? (
                        <Pin className="h-3 w-3 mt-0.5 shrink-0 text-amber-500" />
                      ) : (
                        <MessageSquare className="h-3 w-3 mt-0.5 shrink-0 opacity-70" />
                      )}

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

                      {!selectMode && (
                        <>
                          <span className="text-[9px] text-ink-500 shrink-0 pt-0.5 w-[68px] text-right leading-tight">
                            {fmtDate(s.updatedAt)}
                          </span>

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

                            {menuOpen && (
                              <div
                                className="absolute right-0 top-full mt-1 z-20 w-36 bg-white rounded-lg shadow-xl border border-ink-200 py-1 overflow-hidden"
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
                                    handleTogglePin(s.id);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-ink-700 hover:bg-ink-50 transition"
                                >
                                  {s.isPinned ? (
                                    <>
                                      <PinOff className="h-3 w-3" />
                                      Unpin
                                    </>
                                  ) : (
                                    <>
                                      <Pin className="h-3 w-3" />
                                      Pin
                                    </>
                                  )}
                                </button>
                                <div className="h-px bg-ink-100 my-0.5" />
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
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bulk action bar */}
      {selectMode && (
        <div className="border-t border-white/10 p-2.5 bg-black/30 shrink-0">
          <div className="text-[10px] text-ink-400 mb-2 font-semibold">
            {selectedIds.size} selected
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={handleBulkPin}
              disabled={bulkLoading || selectedIds.size === 0}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 bg-amber-500/20 text-amber-400 text-[10px] font-semibold hover:bg-amber-500/30 disabled:opacity-50 transition"
            >
              <Pin className="h-3 w-3" />
              Pin
            </button>
            <button
              onClick={handleBulkDelete}
              disabled={bulkLoading || selectedIds.size === 0}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 bg-red-500/20 text-red-400 text-[10px] font-semibold hover:bg-red-500/30 disabled:opacity-50 transition"
            >
              {bulkLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Trash2 className="h-3 w-3" />
              )}
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Delete single confirm */}
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
