import { NextResponse } from "next/server";
import { sendToN8nForms } from "@/lib/n8n/forms";

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactRequest;

  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return NextResponse.json(
      { message: "Please send valid contact details." },
      { status: 400 },
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json(
      { message: "Please enter your name." },
      { status: 400 },
    );
  }

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid work email." },
      { status: 400 },
    );
  }

  if (message.length < 10 || message.length > 3000) {
    return NextResponse.json(
      { message: "Please share a little more about what you want to improve." },
      { status: 400 },
    );
  }

  try {
    await sendToN8nForms({
      source: "contact",
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "We couldn’t send your note right now. Please try again or email us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Thanks—your note is with us. We’ll be in touch soon.",
  });
}
