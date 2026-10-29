import { NextResponse } from "next/server";
import { normalizeEmail } from "@/lib/chat/email";
import {
  captureChatLead,
  isHumanVerified,
  markHumanVerified,
} from "@/lib/chat/session-store";
import {
  getClientIp,
  readTurnstileToken,
  verifyTurnstileToken,
} from "@/lib/turnstile";

type LeadRequest = {
  email?: unknown;
  sessionId?: unknown;
  "cf-turnstile-response"?: unknown;
};

export async function POST(request: Request) {
  let body: LeadRequest;

  try {
    body = (await request.json()) as LeadRequest;
  } catch {
    return NextResponse.json(
      { error: "Please send a valid email." },
      { status: 400 },
    );
  }

  const email = normalizeEmail(body.email);
  const sessionId =
    typeof body.sessionId === "string" ? body.sessionId.trim() : "";

  if (!sessionId || sessionId.length > 128) {
    return NextResponse.json(
      { error: "Missing chat session." },
      { status: 400 },
    );
  }

  if (!isHumanVerified(sessionId)) {
    const turnstileToken = readTurnstileToken(body);
    const verified = await verifyTurnstileToken(
      turnstileToken,
      getClientIp(request),
    );

    if (!verified) {
      return NextResponse.json(
        { error: "Verification failed. Please try again." },
        { status: 403 },
      );
    }

    markHumanVerified(sessionId);
  }

  if (!email) {
    return NextResponse.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  let summary: string | null = null;

  try {
    summary = await captureChatLead(sessionId, email);
  } catch {
    return NextResponse.json(
      { error: "We couldn’t save your email. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, summary });
}
