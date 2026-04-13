"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChatInput } from "@/components/chat-input";
import { ChatWindow } from "@/components/chat-window";
import { PromptBanner } from "@/components/prompt-banner";
import { TaskSidebar } from "@/components/task-sidebar";
import type { Message } from "@/components/types";
import type { SurveyConfig } from "@/lib/survey-config";

const createInitialMessages = (config: SurveyConfig): Message[] =>
  config.mode === "ai_first" && config.aiFirstMessage
    ? [{ id: "assistant-opening", role: "assistant", content: config.aiFirstMessage }]
    : [];

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

async function sendMessageToAI(
  messages: Message[],
  configKey: SurveyConfig["key"],
): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      configKey,
      messages: messages.map(({ role, content }) => ({ role, content })),
    }),
  });

  const data = (await response.json()) as { reply?: string; error?: string };

  if (!response.ok || !data.reply) {
    throw new Error(data.error || "Unable to get AI response.");
  }

  return data.reply;
}

type BrainstormingAppProps = {
  config: SurveyConfig;
};

export function BrainstormingApp({ config }: BrainstormingAppProps) {
  const [messages, setMessages] = useState<Message[]>(() =>
    createInitialMessages(config),
  );
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);
  const requestVersionRef = useRef(0);

  useEffect(() => {
    requestVersionRef.current += 1;
    setMessages(createInitialMessages(config));
    setInputValue("");
    setLoading(false);
  }, [config]);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const hasUserMessage = useMemo(
    () => messages.some((message) => message.role === "user"),
    [messages],
  );
  const inputWordCount = useMemo(() => countWords(inputValue), [inputValue]);
  const needsFirstMessageMinimum =
    config.mode === "user_first" && !hasUserMessage && !!config.firstMessageMinimumWords;
  const remainingWords = needsFirstMessageMinimum
    ? Math.max((config.firstMessageMinimumWords ?? 0) - inputWordCount, 0)
    : 0;
  const firstMessageBlocked =
    needsFirstMessageMinimum && inputValue.trim().length > 0 && remainingWords > 0;
  const canSend = useMemo(
    () =>
      inputValue.trim().length > 0 &&
      !loading &&
      (!needsFirstMessageMinimum || remainingWords === 0),
    [inputValue, loading, needsFirstMessageMinimum, remainingWords],
  );
  const helperText = firstMessageBlocked
    ? `Add ${remainingWords} more word${remainingWords === 1 ? "" : "s"} before you can send your first message.`
    : undefined;

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (
      !trimmed ||
      loading ||
      (needsFirstMessageMinimum &&
        countWords(trimmed) < (config.firstMessageMinimumWords ?? 0))
    ) {
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
      const assistantReply = await sendMessageToAI(nextMessages, config.key);

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
        <TaskSidebar mode={config.mode} />

        <section className="flex min-h-[70vh] flex-1 flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-soft backdrop-blur">
          <div className="border-b border-line/70 px-5 py-5 sm:px-7">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accentDeep/70">
                  Chat Workspace
                </p>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Brainstorming with AI
                </h1>
              </div>

              <PromptBanner prompt={config.taskPrompt} />
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
              helperText={helperText}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
