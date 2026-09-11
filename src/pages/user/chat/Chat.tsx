import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Sparkles, Loader2 } from 'lucide-react';
import {
  useChatSessions,
  useChatSession,
} from '../../../api/queries/useChat';
import {
  useCreateSession,
  useSendMessage,
  useDeleteSession,
  useRenameSession,
} from '../../../api/mutations/chatMutations';
import SessionSidebar from '../../../components/chat/SessionSidebar';
import ChatHeader from '../../../components/chat/ChatHeader';
import MessageBubble from '../../../components/chat/MessageBubble';
import TypingIndicator from '../../../components/chat/TypingIndicator';
import ChatInput from '../../../components/chat/ChatInput';
import PaywallOverlay from '../../../components/chat/PaywallOverlay';
import type { ChatMessage, ChatSessionSummary } from '../../../types/chat';

export default function Chat() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [activeId, setActiveId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallLimit, setPaywallLimit] = useState(3);
  const [isTyping, setIsTyping] = useState(false);
  const [hideLastGreeting, setHideLastGreeting] = useState(false);
  const [optimisticUserMsgs, setOptimisticUserMsgs] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sessionsQuery = useChatSessions();
  const sessionQuery = useChatSession(activeId);
  const createMutation = useCreateSession();
  const deleteMutation = useDeleteSession();
  const renameMutation = useRenameSession();
  const sendMutation = useSendMessage(activeId ?? 0);

  // Reset optimistic queue when session changes
  useEffect(() => {
    setOptimisticUserMsgs([]);
  }, [activeId]);

  // Auto-select first session (only if active one is not set)
  useEffect(() => {
    if (!activeId && sessionsQuery.data && sessionsQuery.data.length > 0) {
      setActiveId(sessionsQuery.data[0].id);
    }
  }, [sessionsQuery.data, activeId]);

  // Greeting delay for fresh sessions
  useEffect(() => {
    if (!activeId) return;
    const msgs = sessionQuery.data?.messages ?? [];
    if (msgs.length < 5) return;

    const created = new Date(sessionQuery.data!.createdAt).getTime();
    const justCreated = Date.now() - created < 10_000;
    if (!justCreated) {
      setHideLastGreeting(false);
      return;
    }

    setHideLastGreeting(true);
    const delay = 1000 + Math.floor(Math.random() * 4000);
    const t = setTimeout(() => setHideLastGreeting(false), delay);
    return () => clearTimeout(t);
  }, [
    activeId,
    sessionQuery.data?.createdAt,
    sessionQuery.data?.messages.length,
  ]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessionQuery.data?.messages.length, optimisticUserMsgs.length, isTyping]);

  // ---------------- Handlers ----------------

  const handleNewChat = () => {
    createMutation.mutate(undefined, {
      onSuccess: (data) => {
        setActiveId(data.id);
        setSidebarOpen(false);
        setPaywallOpen(false);
        setOptimisticUserMsgs([]);
      },
    });
  };

  const handleSelect = (id: number) => {
    setActiveId(id);
    setSidebarOpen(false);
    setPaywallOpen(false);
    setOptimisticUserMsgs([]);
  };

  const handleDelete = (id: number) => {
    // 1. If deleting the active session, clear it first
    if (activeId === id) {
      setActiveId(null);
    }

    // 2. Optimistically remove from sessions list cache
    queryClient.setQueryData<ChatSessionSummary[]>(
      ['chat', 'sessions'],
      (old) => (old ?? []).filter((s) => s.id !== id)
    );

    // 3. Wipe the session detail cache so stale messages don't linger
    queryClient.removeQueries({ queryKey: ['chat', 'session', id] });

    // 4. Call backend
    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['chat', 'sessions'] });
      },
    });
  };

  const handleRename = (id: number, title: string) => {
    renameMutation.mutate({ id, title });
  };

  const handleSend = (text: string) => {
    if (!activeId) return;

    // 1. Show user's message INSTANTLY
    const tempId = -Date.now();
    const optimistic: ChatMessage = {
      id: tempId,
      role: 'USER',
      content: text,
      createdAt: new Date().toISOString(),
    };
    setOptimisticUserMsgs((prev) => [...prev, optimistic]);

    // 2. Show typing indicator
    setIsTyping(true);

    // 3. Call backend
    sendMutation.mutate(
      { content: text },
      {
        onSuccess: () => {
          setOptimisticUserMsgs([]);
          setIsTyping(false);
        },
        onError: (err: any) => {
          setOptimisticUserMsgs([]);
          setIsTyping(false);
          const status = err?.response?.status;
          const limit = sessionQuery.data?.freeMessagesLimit ?? 3;
          if (status === 402) {
            setPaywallLimit(limit);
            setPaywallOpen(true);
          }
        },
      }
    );
  };

  // ---------------- Derived state ----------------

  const session = sessionQuery.data;
  const allMessages = session?.messages ?? [];
  const messages =
    hideLastGreeting && allMessages.length > 0
      ? allMessages.slice(0, -1)
      : allMessages;

  const displayMessages: ChatMessage[] = [...messages, ...optimisticUserMsgs];
  const hasSession = !!activeId;

  // ---------------- Render ----------------

  return (
    <div className="flex flex-col h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-5rem)] overflow-hidden">
      {/* Page header */}
      <div className="shrink-0">
        <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">Chat</h1>
        <p className="text-ink-500 mt-1 text-sm">Talk with Jyotish AI</p>
      </div>

      {/* Chat card */}
      <div className="flex flex-1 min-h-0 mt-6 overflow-hidden rounded-2xl border border-ink-100 bg-white">
        {/* Sidebar — desktop */}
        <div className="hidden lg:block w-72 shrink-0 border-r border-ink-100">
          <SessionSidebar
            sessions={sessionsQuery.data ?? []}
            activeId={activeId}
            loading={sessionsQuery.isLoading}
            onSelect={handleSelect}
            onNew={handleNewChat}
            onDelete={handleDelete}
            onRename={handleRename}
            creating={createMutation.isPending}
          />
        </div>

        {/* Sidebar — mobile drawer */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="absolute top-0 left-0 bottom-0 w-72 max-w-[85vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <SessionSidebar
                sessions={sessionsQuery.data ?? []}
                activeId={activeId}
                loading={sessionsQuery.isLoading}
                onSelect={handleSelect}
                onNew={handleNewChat}
                onDelete={handleDelete}
                onRename={handleRename}
                creating={createMutation.isPending}
              />
            </div>
          </div>
        )}

        {/* Chat column */}
        <div className="relative flex-1 flex flex-col min-w-0 bg-ink-50">
          <ChatHeader onOpenSidebar={() => setSidebarOpen(true)} />

          {/* Scrollable messages — ONLY this scrolls */}
          <div className="flex-1 min-h-0 overflow-y-auto px-3 lg:px-4 py-3">
            {!hasSession && !sessionsQuery.isLoading && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-sm">
                  <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 mb-3">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-base font-bold text-ink-900 mb-1">
                    Start a new chat
                  </h2>
                  <p className="text-xs text-ink-500 mb-4">
                    Ask Jyotish AI about your career, love, health, or anything
                    on your mind.
                  </p>
                  <button
                    onClick={handleNewChat}
                    disabled={createMutation.isPending}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-xs font-semibold hover:shadow-md disabled:opacity-60 transition"
                  >
                    {createMutation.isPending ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5" />
                    )}
                    New Chat
                  </button>
                </div>
              </div>
            )}

            {hasSession && sessionQuery.isLoading && (
              <div className="h-full flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-primary-500" />
              </div>
            )}

            {hasSession &&
              !sessionQuery.isLoading &&
              displayMessages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}

            {hideLastGreeting && <TypingIndicator />}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {hasSession && (
            <ChatInput
              onSend={handleSend}
              disabled={isTyping || paywallOpen}
              sending={sendMutation.isPending}
            />
          )}

          <PaywallOverlay
            open={paywallOpen}
            freeLimit={paywallLimit}
            onClose={() => setPaywallOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}