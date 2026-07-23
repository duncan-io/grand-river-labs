import type { Metadata } from "next";
import { ChatPanel } from "@/components/chat";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Ask AI | Grand River Labs",
  description:
    "Chat with the Grand River Labs assistant to learn how AI automation could fit your workflow.",
};

export default function ChatPage() {
  return (
    <div id="top" className="chat-page">
      <SiteHeader />
      <main>
        <ChatPanel />
      </main>
      <SiteFooter />
    </div>
  );
}
