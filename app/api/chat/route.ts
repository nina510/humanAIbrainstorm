import OpenAI from "openai";
import { NextResponse } from "next/server";
import {
  isSurveyVariantKey,
  surveyConfigs,
  type SurveyVariantKey,
} from "@/lib/survey-config";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  configKey: SurveyVariantKey;
  messages: ChatMessage[];
};

const model = process.env.OPENAI_MODEL || "gpt-5-mini";

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY." },
      { status: 500 },
    );
  }

  let body: ChatRequest;

  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json(
      { error: "At least one chat message is required." },
      { status: 400 },
    );
  }
  if (!isSurveyVariantKey(body.configKey)) {
    return NextResponse.json({ error: "Invalid config key." }, { status: 400 });
  }

  const config = surveyConfigs[body.configKey];

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const transcript = body.messages
      .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
      .join("\n\n");

    const response = await client.responses.create({
      model,
      instructions: `${config.systemPrompt} The fixed task prompt is: ${config.taskPrompt}`,
      input: transcript,
    });

    return NextResponse.json({ reply: response.output_text });
  } catch (error) {
    console.error("OpenAI chat request failed", error);

    return NextResponse.json(
      { error: "OpenAI request failed." },
      { status: 500 },
    );
  }
}
