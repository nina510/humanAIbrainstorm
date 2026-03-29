export type ConversationMode = "user_first" | "ai_first";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
