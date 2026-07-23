import OpenAI from "openai";
import { chatConfig } from "./config";

export function getFireworksClient() {
  const apiKey = process.env.FIREWORKS_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("FIREWORKS_API_KEY is not configured.");
  }

  return new OpenAI({
    apiKey,
    baseURL: chatConfig.fireworksBaseUrl,
  });
}
