import { RefObject } from "react";
import { MessageBubble } from "@/components/message-bubble";
import type { Message } from "@/components/types";

type ChatWindowProps = {
  messages: Message[];
  loading: boolean;
  scrollAnchorRef: RefObject<HTMLDivElement | null>;
};

export function ChatWindow({
  messages,
  loading,
  scrollAnchorRef,
}: ChatWindowProps) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        ) : (
          <div className="min-h-[1px]" />
        )}

        {loading ? (
          <div className="max-w-xl rounded-[1.5rem] rounded-bl-md border border-line bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
            AI is drafting a response...
          </div>
        ) : null}

        <div ref={scrollAnchorRef} />
      </div>
    </div>
  );
}
