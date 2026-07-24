export type FormSubmission = {
  source: "contact" | "chat";
  email: string;
  name?: string;
  message?: string;
  sessionId?: string;
  submittedAt: string;
};

/**
 * Forward a site form submission to the n8n webhook in N8N_FORMS.
 */
export async function sendToN8nForms(payload: FormSubmission): Promise<void> {
  const url = process.env.N8N_FORMS?.trim();

  if (!url) {
    throw new Error("N8N_FORMS is not configured.");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("n8n form webhook failed", {
      status: response.status,
      detail: detail.slice(0, 500),
      source: payload.source,
    });
    throw new Error(`n8n webhook failed with status ${response.status}`);
  }
}
