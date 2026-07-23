export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type SseTokenEvent = {
  type: "token";
  content: string;
};

export type SseDoneEvent = {
  type: "done";
};

export type SseErrorEvent = {
  type: "error";
  error: string;
};

export type SseEvent = SseTokenEvent | SseDoneEvent | SseErrorEvent;
