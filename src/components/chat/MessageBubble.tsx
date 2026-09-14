import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { ChatMessage } from "../../types/chat";

interface Props {
  message: ChatMessage;
}

export default function MessageBubble({ message }: Props) {
  const { role, content, createdAt } = message;
  const [copied, setCopied] = useState(false);

  const time = new Date(createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // silent fail
    }
  };

  if (role === "SYSTEM") {
    return (
      <div className="flex justify-center my-1.5">
        <div className="text-[10px] text-ink-500 bg-ink-100/80 rounded-full px-2.5 py-0.5 max-w-[85%] text-center">
          {content}
        </div>
      </div>
    );
  }

  if (role === "USER") {
    return (
      <div className="flex justify-end mb-2">
        <div className="max-w-[78%]">
          <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-accent-100 to-primary-100 border border-accent-200 text-ink-900 text-[13px] leading-snug px-3 py-2 whitespace-pre-wrap break-words">
            {content}
          </div>
          <div className="text-[9px] text-ink-400 text-right mt-0.5 pr-1">
            {time} ✓✓
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-2">
      <div className="max-w-[78%]">
        <div className="group relative rounded-2xl rounded-tl-sm bg-white border border-ink-100 text-ink-800 text-[13px] leading-snug px-3 py-2 whitespace-pre-wrap break-words shadow-sm">
          {content}

          <button
            onClick={handleCopy}
            title={copied ? "Copied" : "Copy"}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-lg bg-white border border-ink-200 shadow-md flex items-center justify-center text-ink-500 opacity-0 group-hover:opacity-100 hover:text-primary-600 hover:border-primary-300 transition"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        </div>
        <div className="text-[9px] text-ink-400 mt-0.5 pl-1">
          {time}
          {copied && (
            <span className="ml-2 text-green-600 font-semibold">Copied</span>
          )}
        </div>
      </div>
    </div>
  );
}
