import type { Message } from "@/components/types";

type MessageBubbleProps = {
  message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <article
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xl rounded-[1.5rem] px-4 py-3 text-sm leading-6 shadow-sm ${
          isUser
            ? "rounded-br-md bg-accent text-white"
            : "rounded-bl-md border border-line bg-white text-ink"
        }`}
      >
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">
          {isUser ? "You" : "AI"}
        </p>
        <p>{message.content}</p>
      </div>
    </article>
  );
}
