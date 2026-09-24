const DEFAULT_FIREWORKS_MODEL = "accounts/fireworks/models/glm-5p3-flash";

export function getChatModel() {
  return process.env.FIREWORKS_MODEL?.trim() || DEFAULT_FIREWORKS_MODEL;
}

// ─── CHANGE MODEL / SAMPLING HERE ───────────────────────────────────────────
export const chatConfig = {
  temperature: 0.4,
  maxTokens: 4096,
  /** Second attempt when the first stream hits the token cap with no visible answer */
  retryMaxTokens: 8192,
  /** Max user+assistant turns kept in the in-memory session store */
  maxHistoryMessages: 40,
  /** Drop idle sessions after this many ms */
  sessionTtlMs: 60 * 60 * 1000,
  fireworksBaseUrl: "https://api.fireworks.ai/inference/v1",
} as const;
