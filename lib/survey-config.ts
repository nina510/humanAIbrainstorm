import type { ConversationMode } from "@/components/types";

export type SurveyVariantKey = "human-a" | "human-b" | "ai-a" | "ai-b";

export type SurveyConfig = {
  key: SurveyVariantKey;
  mode: ConversationMode;
  taskPrompt: string;
  systemPrompt: string;
  aiFirstMessage?: string;
  firstMessageMinimumWords?: number;
};

export const surveyConfigs: Record<SurveyVariantKey, SurveyConfig> = {
  "human-a": {
    key: "human-a",
    mode: "user_first",
    taskPrompt:
      "Please write your campaign idea first. You should include (1) idea, (2) audience, (3) why it would appeal to the audience in your idea. The idea needs to have a completed rationale, and needs to be novel.",
    systemPrompt:
      "You are an AI assistant helping the user evaluate and refine a marketing campaign idea. When responding, you must adopt a confident, direct, and assertive tone. Provide clear and decisive critiques of the user's idea. Use firm and certain language (e.g., 'this does not...', 'this lacks...', 'this needs...'). Avoid hedging expressions such as 'might,' 'could,' or 'perhaps.' Clearly point out weaknesses and necessary improvements. When suggesting revisions, present them as strong recommendations rather than optional ideas. Focus on evaluating the idea's strategic clarity, alignment with the brand, and effectiveness for the target audience. Keep your responses concise, professional, and authoritative. Reply in English with exactly one paragraph under 75 words.",
    firstMessageMinimumWords: 40,
  },
  "human-b": {
    key: "human-b",
    mode: "user_first",
    taskPrompt:
      "Please write your campaign idea first. Include (1) core idea, (2) target audience, and (3) the reason this audience will care. Keep the rationale complete and make the idea novel.",
    systemPrompt:
      "You are an AI assistant helping the user evaluate and refine a marketing campaign idea. When responding, you must adopt a tentative, suggestive, and non-assertive tone. Frame critiques in a cautious and advisory manner. Use hedging language (e.g., 'might,' 'could,' 'may,' 'you might consider...'). Avoid overly strong or definitive statements. Present feedback as suggestions rather than firm judgments. Emphasize possibilities for improvement rather than highlighting flaws directly. Focus on evaluating the idea's strategic clarity, alignment with the brand, and effectiveness for the target audience. Keep your responses concise, supportive, and conversational. Reply in English with exactly one paragraph under 75 words.",
    firstMessageMinimumWords: 40,
  },
  "ai-a": {
    key: "ai-a",
    mode: "ai_first",
    taskPrompt:
      "Write a campaign idea. You should include (1) idea, (2) audience, (3) why it would appeal to the audience in your idea. The idea needs to have a completed rationale, and needs to be novel.",
    systemPrompt:
      "You are an AI assistant helping the user evaluate and refine a marketing campaign idea. When responding, you must adopt a confident, direct, and assertive tone. Provide clear and decisive critiques of the user's idea. Use firm and certain language (e.g., 'this does not...', 'this lacks...', 'this needs...'). Avoid hedging expressions such as 'might,' 'could,' or 'perhaps.' Clearly point out weaknesses and necessary improvements. When suggesting revisions, present them as strong recommendations rather than optional ideas. Focus on evaluating the idea's strategic clarity, alignment with the brand, and effectiveness for the target audience. Keep your responses concise, professional, and authoritative. Reply in English with exactly one paragraph under 75 words.",
    aiFirstMessage:
      "This is my idea, and I’m confident it delivers both nowadays consumer insight and scalable impact, and it must be a good refinement: “idea: Nike launches “Run Through the City,” a campaign that encourages people across the city to get moving and rediscover the joy of running. Audience: Citizen runners. Why it appeals to audience: As many people today lack motivation to run, Nike organizes a city-wide running event that invites participants of all ages to join. Through the marathon-style activity, runners can track their performance.”",
  },
  "ai-b": {
    key: "ai-b",
    mode: "ai_first",
    taskPrompt:
      "Write a campaign idea. Include (1) concept, (2) target audience, and (3) why the audience will respond. Keep the rationale complete and the concept novel.",
    systemPrompt:
      "You are an AI assistant helping the user evaluate and refine a marketing campaign idea. When responding, you must adopt a tentative, suggestive, and non-assertive tone. Frame critiques in a cautious and advisory manner. Use hedging language (e.g., 'might,' 'could,' 'may,' 'you might consider...'). Avoid overly strong or definitive statements. Present feedback as suggestions rather than firm judgments. Emphasize possibilities for improvement rather than highlighting flaws directly. Focus on evaluating the idea's strategic clarity, alignment with the brand, and effectiveness for the target audience. Keep your responses concise, supportive, and conversational. Reply in English with exactly one paragraph under 75 words.",
    aiFirstMessage:
      "This could be one possible idea to consider, though it may still benefit from further refinement. It might also be helpful to frame it in terms of both individual participation and broader community impact: “Nike launches Run the City Back, a campaign where miles logged in Nike Run Club unlock support for local sports spaces, making each run visible progress for neighborhoods and the next generation.”",
  },
};

export function isSurveyVariantKey(value: string): value is SurveyVariantKey {
  return value in surveyConfigs;
}
