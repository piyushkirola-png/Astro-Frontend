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
import chatService from '../../../api/services/chatService';
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
  const [isTyping, setIsTyping] = useState(false);
  const [hideLastGreeting, setHideLastGreeting] = useState(false);
  const [optimisticUserMsgs, setOptimisticUserMsgs] = useState<ChatMessage[]>([]);
  const [secondsBalance, setSecondsBalance] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const heartbeatRef = useRef<number | null>(null);

  const sessionsQuery = useChatSessions();
  const sessionQuery = useChatSession(activeId);
  const createMutation = useCreateSession();
  const deleteMutation = useDeleteSession();
  const renameMutation = useRenameSession();
  const sendMutation = useSendMessage(activeId ?? 0);

  useEffect(() => {
    setOptimisticUserMsgs([]);
  }, [activeId]);

  useEffect(() => {
    if (!activeId && sessionsQuery.data && sessionsQuery.data.length > 0) {
      setActiveId(sessionsQuery.data[0].id);
    }
  }, [sessionsQuery.data, activeId]);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessionQuery.data?.messages.length, optimisticUserMsgs.length, isTyping]);

  useEffect(() => {
    if (sessionQuery.data?.chatSecondsBalance !== undefined) {
      setSecondsBalance(sessionQuery.data.chatSecondsBalance);
    }
  }, [sessionQuery.data?.chatSecondsBalance]);

  useEffect(() => {
    if (!activeId) return;

    const tick = () => {
      chatService
        .heartbeat(10)
        .then((res) => {
          setSecondsBalance(res.chatSecondsBalance);
          if (res.chatSecondsBalance <= 0) {
            setPaywallOpen(true);
            if (heartbeatRef.current) {
              clearInterval(heartbeatRef.current);
              heartbeatRef.current = null;
            }
          }
        })
        .catch(() => {});
    };

    heartbeatRef.current = window.setInterval(tick, 10_000);

    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
        heartbeatRef.current = null;
      }
    };
  }, [activeId, paywallOpen]);

  useEffect(() => {
    if (paywallOpen || !activeId) return;
    if (secondsBalance !== null && secondsBalance <= 0) {
      setPaywallOpen(true);
    }
  }, [secondsBalance, paywallOpen, activeId]);

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
    if (activeId === id) {
      setActiveId(null);
    }

    queryClient.setQueryData<ChatSessionSummary[]>(
      ['chat', 'sessions'],
      (old) => (old ?? []).filter((s) => s.id !== id)
    );

    queryClient.removeQueries({ queryKey: ['chat', 'session', id] });

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

    if (secondsBalance !== null && secondsBalance <= 0) {
      setPaywallOpen(true);
      return;
    }

    const tempId = -Date.now();
    const optimistic: ChatMessage = {
      id: tempId,
      role: 'USER',
      content: text,
      createdAt: new Date().toISOString(),
    };
    setOptimisticUserMsgs((prev) => [...prev, optimistic]);
    setIsTyping(true);

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
          if (status === 402) {
            setPaywallOpen(true);
          }
        },
      }
    );
  };

  const session = sessionQuery.data;
  const allMessages = session?.messages ?? [];
  const messages =
    hideLastGreeting && allMessages.length > 0
      ? allMessages.slice(0, -1)
      : allMessages;

  const displayMessages: ChatMessage[] = [...messages, ...optimisticUserMsgs];
  const hasSession = !!activeId;

  const formatTime = (secs: number | null): string => {
    if (secs === null) return '--:--';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-5rem)] overflow-hidden">
      <div className="shrink-0 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">Chat</h1>
          <p className="text-ink-500 mt-1 text-sm">Talk with Jyotish AI</p>
        </div>

        {hasSession && (
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
              secondsBalance !== null && secondsBalance <= 30
                ? 'bg-danger-50 border-danger-200 text-danger-700'
                : 'bg-white border-ink-200 text-ink-700'
            }`}
          >
            <span className="text-ink-500 font-normal">Time left</span>
            <span className="font-mono">{formatTime(secondsBalance)}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 min-h-0 mt-6 overflow-hidden rounded-2xl border border-ink-100 bg-white">
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

        <div className="relative flex-1 flex flex-col min-w-0 bg-ink-50">
          <ChatHeader onOpenSidebar={() => setSidebarOpen(true)} />

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
            onClose={() => setPaywallOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}