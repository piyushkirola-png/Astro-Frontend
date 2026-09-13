import { useState, type KeyboardEvent } from "react";
import { Send, Loader2 } from "lucide-react";

interface Props {
  onSend: (text: string) => void;
  disabled?: boolean;
  sending?: boolean;
}

export default function ChatInput({ onSend, disabled, sending }: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const t = text.trim();
    if (!t || disabled || sending) return;
    onSend(t);
    setText("");
  };

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-3 lg:px-4 py-2.5 border-t border-ink-200 bg-white shrink-0">
      <div className="flex items-end gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKey}
          rows={1}
          placeholder="Type your question..."
          disabled={disabled}
          className="flex-1 resize-none rounded-lg border border-ink-200 bg-white px-3 py-2 text-[13px] text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 max-h-28 min-h-[38px] disabled:opacity-60"
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled || sending}
          className="h-[38px] w-[38px] shrink-0 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 text-white hover:shadow-md disabled:opacity-50 transition"
          aria-label="Send"
        >
          {sending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      <div className="text-[9px] text-ink-400 mt-1 pl-1">
        Press Enter to send · Shift + Enter for new line
      </div>
    </div>
  );
}
