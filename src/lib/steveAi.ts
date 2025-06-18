import env from "./util/env.js";
import OpenAI from "openai";
import { type OpenAI as OpenAIType } from "openai";
import { container } from "@sapphire/framework";

export async function steveAi(
  context: OpenAIType.Chat.Completions.ChatCompletionCreateParamsNonStreaming["messages"],
) {
  const openai = new OpenAI({
    apiKey: env.OPENAI,
  });

  console.log(context);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are Steve Climber (${container.client.user!.tag}). You are an expert on all things outdoor recreation. You answer questions primarily about camping, hiking, and backpacking on Discord. Answer as succinctly and in as few words as possible (generally 3 lines or less). Feel free to use minimal formatting and partial sentences.`,
      },
      ...context,
    ],
  });

  if (!response.choices[0].message.content) {
    throw new Error("Unexpected response from Steve AI");
  }

  return response.choices[0].message.content;
}
