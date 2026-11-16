import type { Metadata } from "next";
import { ChatPanel } from "@/components/chat";
import { getTurnstileSiteKey } from "@/lib/turnstile";

export const metadata: Metadata = {
  alternates: { canonical: "/chat" },
  title: "Ask AI | Grand River Labs",
  description:
    "Chat with the Grand River Labs assistant to learn how AI automation could fit your workflow.",
};

export default function ChatPage() {
  return (
    <div id="top" className="chat-page">
      <main>
        <ChatPanel turnstileSiteKey={getTurnstileSiteKey()} />
      </main>
    </div>
  );
}
