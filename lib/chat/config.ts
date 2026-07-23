// ─── CHANGE MODEL / SAMPLING HERE ───────────────────────────────────────────
export const chatConfig = {
  /** Fireworks model id — swap freely without touching the API route */
  model: "accounts/fireworks/models/minimax-m3",
  temperature: 0.4,
  maxTokens: 1024,
  /** Max user+assistant turns kept in the in-memory session store */
  maxHistoryMessages: 40,
  /** Drop idle sessions after this many ms */
  sessionTtlMs: 60 * 60 * 1000,
  fireworksBaseUrl: "https://api.fireworks.ai/inference/v1",
} as const;
