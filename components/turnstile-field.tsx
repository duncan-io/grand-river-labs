"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    params: Record<string, unknown>,
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
  getResponse: (widgetId: string) => string;
  ready: (callback: () => void) => void;
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
    if (!siteKey || !containerRef.current) {
      return;
    }

    let cancelled = false;
    let pollId: ReturnType<typeof setInterval> | undefined;

    const mount = () => {
      if (cancelled || !containerRef.current || !window.turnstile) {
        return;
      }

      if (widgetIdRef.current) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
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
    };

    const start = () => {
      if (!window.turnstile) {
        return;
      }

      window.turnstile.ready(mount);
    };

    if (window.turnstile) {
      start();
    } else {
      pollId = setInterval(() => {
        if (window.turnstile) {
          if (pollId) {
            clearInterval(pollId);
          }
          start();
        }
      }, 50);
    }

    return () => {
      cancelled = true;
      if (pollId) {
        clearInterval(pollId);
      }
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  if (!siteKey) {
    return null;
  }

  return (
    <div
      className="cf-turnstile turnstile-field"
      data-action="turnstile-spin-v2"
      ref={containerRef}
    />
  );
});
