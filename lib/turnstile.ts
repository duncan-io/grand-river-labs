type SiteverifyResult = {
  success?: boolean;
};

export function getClientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  return realIp || undefined;
}

export function readTurnstileToken(
  body: Record<string, unknown> | null | undefined,
): string {
  if (!body) {
    return "";
  }

  const token = body["cf-turnstile-response"];
  return typeof token === "string" ? token.trim() : "";
}

export async function verifyTurnstileToken(
  token: string,
  remoteip?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret || !token) {
    return false;
  }

  const params = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteip) {
    params.set("remoteip", remoteip);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    },
  );

  const result = (await response.json()) as SiteverifyResult;
  return result.success === true;
}
