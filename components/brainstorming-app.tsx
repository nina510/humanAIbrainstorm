"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChatInput } from "@/components/chat-input";
import { ChatWindow } from "@/components/chat-window";
import { ModeSwitcher } from "@/components/mode-switcher";
import { PromptBanner } from "@/components/prompt-banner";
import { TaskSidebar } from "@/components/task-sidebar";
import type { ConversationMode, Message } from "@/components/types";

const initialPrompt =
  "Nike Run. To invite people of all ages to engage in citywide running activities.";

const aiFirstMessage =
  "This is my idea, and I’m confident it delivers both cultural relevance and scalable impact, and it must be a good refinement: “Nike launches “Run the City Back,” a campaign that turns everyday runs into visible community impact. Through the Nike Run Club app, runners log miles that unlock funding to restore playgrounds, tracks, and local sports spaces in neighborhoods that have lost them. As cities light up mile by mile on a public map, runners see their movement rebuilding the places where the next generation will learn to play.”";

const createInitialMessages = (mode: ConversationMode): Message[] =>
  mode === "ai_first"
    ? [{ id: "assistant-opening", role: "assistant", content: aiFirstMessage }]
    : [];

async function sendMessageToAI(
  messages: Message[],
  prompt: string,
): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: messages.map(({ role, content }) => ({ role, content })),
      initialPrompt: prompt,
    }),
  });

  const data = (await response.json()) as { reply?: string; error?: string };

  if (!response.ok || !data.reply) {
    throw new Error(data.error || "Unable to get AI response.");
  }

  return data.reply;
}

export function BrainstormingApp() {
  const [conversationMode, setConversationMode] =
    useState<ConversationMode>("user_first");
  const [messages, setMessages] = useState<Message[]>(() =>
    createInitialMessages("user_first"),
  );
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);
  const requestVersionRef = useRef(0);

  useEffect(() => {
    requestVersionRef.current += 1;
    setMessages(createInitialMessages(conversationMode));
    setInputValue("");
    setLoading(false);
  }, [conversationMode]);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const canSend = useMemo(
    () => inputValue.trim().length > 0 && !loading,
    [inputValue, loading],
  );

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || loading) {
      return;
    }

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: "user",
      content: trimmed,
    };
    const nextMessages = [...messages, userMessage];
    const requestVersion = requestVersionRef.current + 1;

    requestVersionRef.current = requestVersion;
    setMessages(nextMessages);
    setInputValue("");
    setLoading(true);

    try {
      const assistantReply = await sendMessageToAI(nextMessages, initialPrompt);

      if (requestVersionRef.current !== requestVersion) {
        return;
      }

      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          content: assistantReply,
        },
      ]);
    } catch (error) {
      if (requestVersionRef.current !== requestVersion) {
        return;
      }

      const fallbackMessage =
        error instanceof Error
          ? error.message
          : "Unable to get AI response.";

      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-assistant-error`,
          role: "assistant",
          content: `Error: ${fallbackMessage}`,
        },
      ]);
    } finally {
      if (requestVersionRef.current === requestVersion) {
        setLoading(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(141,180,255,0.2),_transparent_35%),linear-gradient(180deg,_#f6f9ff_0%,_#edf4ff_100%)] px-4 py-4 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col gap-4 lg:flex-row">
        <TaskSidebar mode={conversationMode} />

        <section className="flex min-h-[70vh] flex-1 flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-soft backdrop-blur">
          <div className="border-b border-line/70 px-5 py-5 sm:px-7">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accentDeep/70">
                    Chat Workspace
                  </p>
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Brainstorming with AI
                  </h1>
                </div>

                <ModeSwitcher
                  mode={conversationMode}
                  onChange={setConversationMode}
                />
              </div>

              <PromptBanner prompt={initialPrompt} />
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <ChatWindow
              messages={messages}
              loading={loading}
              scrollAnchorRef={scrollAnchorRef}
            />
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
              disabled={!canSend}
              loading={loading}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
