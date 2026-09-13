import type { ChatMessage } from "../../types/chat";

interface Props {
  message: ChatMessage;
}

export default function MessageBubble({ message }: Props) {
  const { role, content, createdAt } = message;
  const time = new Date(createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

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

  // ASSISTANT
  return (
    <div className="flex justify-start mb-2">
      <div className="max-w-[78%]">
        <div className="rounded-2xl rounded-tl-sm bg-white border border-ink-100 text-ink-800 text-[13px] leading-snug px-3 py-2 whitespace-pre-wrap break-words shadow-sm">
          {content}
        </div>
        <div className="text-[9px] text-ink-400 mt-0.5 pl-1">{time}</div>
      </div>
    </div>
  );
}
