"use client";

import Script from "next/script";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const TURNSTILE_API_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    params: Record<string, unknown>,
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
  getResponse: (widgetId: string) => string;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type TurnstileFieldHandle = {
  reset: () => void;
  getResponse: () => string;
};

type TurnstileFieldProps = {
  siteKey: string;
  onTokenChange?: (token: string | null) => void;
};

export const TurnstileField = forwardRef<
  TurnstileFieldHandle,
  TurnstileFieldProps
>(function TurnstileField({ siteKey, onTokenChange }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  onTokenChangeRef.current = onTokenChange;
  const [apiReady, setApiReady] = useState(false);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
        onTokenChangeRef.current?.(null);
      }
    },
    getResponse: () => {
      if (widgetIdRef.current && window.turnstile) {
        return window.turnstile.getResponse(widgetIdRef.current) ?? "";
      }

      return "";
    },
  }));

  useEffect(() => {
    if (!siteKey || !apiReady || !containerRef.current || !window.turnstile) {
      return;
    }

    const turnstile = window.turnstile;
    const widgetId = turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action: "turnstile-spin-v2",
      callback: (token: string) => {
        onTokenChangeRef.current?.(token);
      },
      "expired-callback": () => {
        onTokenChangeRef.current?.(null);
      },
      "error-callback": () => {
        onTokenChangeRef.current?.(null);
      },
    });
    widgetIdRef.current = widgetId;

    return () => {
      turnstile.remove(widgetId);
      widgetIdRef.current = null;
    };
  }, [siteKey, apiReady]);

  if (!siteKey) {
    return null;
  }

  return (
    <>
      {/* Loaded only on pages with a form, once the browser is idle. onReady
          also fires on later mounts, when the script is already present. */}
      <Script
        src={TURNSTILE_API_SRC}
        strategy="lazyOnload"
        onReady={() => setApiReady(true)}
      />
      <div
        className="cf-turnstile turnstile-field"
        data-action="turnstile-spin-v2"
        ref={containerRef}
      />
    </>
  );
});
