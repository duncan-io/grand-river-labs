"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DISMISS_KEY = "grl-chat-launcher-dismissed";

function ChatIcon() {
  return (
    <svg
      aria-hidden="true"
      className="chat-launcher__icon"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M3.5 4.25h11A1.75 1.75 0 0 1 16.25 6v5.5A1.75 1.75 0 0 1 14.5 13.25H9.1L5.4 15.7a.5.5 0 0 1-.78-.42v-2.03H3.5A1.75 1.75 0 0 1 1.75 11.5V6A1.75 1.75 0 0 1 3.5 4.25Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 8.25h7M5.5 10.5h4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChatLauncher() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname === "/chat" || pathname.startsWith("/chat/")) {
      setVisible(false);
      return;
    }

    setVisible(sessionStorage.getItem(DISMISS_KEY) !== "1");
  }, [pathname]);

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="chat-launcher">
      <a className="chat-launcher__link" href="/chat">
        <ChatIcon />
        <span className="chat-launcher__copy">
          <span className="chat-launcher__eyebrow">Ask AI</span>
          <span className="chat-launcher__label">Chat with the assistant</span>
        </span>
        <span className="chat-launcher__label-mobile">Ask AI</span>
      </a>
      <button
        type="button"
        className="chat-launcher__close"
        aria-label="Dismiss chat shortcut"
        onClick={dismiss}
      >
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3.5 3.5 10.5 10.5M10.5 3.5 3.5 10.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
