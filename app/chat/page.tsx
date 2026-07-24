import type { Metadata } from "next";
import { ChatPanel } from "@/components/chat";

export const metadata: Metadata = {
  title: "Ask AI | Grand River Labs",
  description:
    "Chat with the Grand River Labs assistant to learn how AI automation could fit your workflow.",
};

export default function ChatPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY?.trim() ?? "";

  return (
    <div id="top" className="chat-page">
      <main>
        <ChatPanel turnstileSiteKey={turnstileSiteKey} />
      </main>
    </div>
  );
}
