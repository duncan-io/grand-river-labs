import { NextResponse } from "next/server";
import { normalizeEmail } from "@/lib/chat/email";
import { captureChatLead } from "@/lib/chat/session-store";

type LeadRequest = {
  email?: unknown;
  sessionId?: unknown;
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

  if (!email) {
    return NextResponse.json(
      { error: "Please enter a valid work email." },
      { status: 400 },
    );
  }

  if (!sessionId || sessionId.length > 128) {
    return NextResponse.json(
      { error: "Missing chat session." },
      { status: 400 },
    );
  }

  try {
    await captureChatLead(sessionId, email);
  } catch {
    return NextResponse.json(
      { error: "We couldn’t save your email. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
