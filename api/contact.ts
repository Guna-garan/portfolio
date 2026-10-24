import type { IncomingMessage, ServerResponse } from "node:http";

const CONTACT_FLOW_URL = process.env.CONTACT_FLOW_URL;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

type ContactSubmission = {
  from_name: string;
  from_email: string;
  message: string;
};

type VercelRequest = IncomingMessage & { body?: unknown };
type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => VercelResponse;
};

function isContactSubmission(value: unknown): value is ContactSubmission {
  if (!value || typeof value !== "object") return false;

  const submission = value as Record<string, unknown>;
  return (
    typeof submission.from_name === "string" &&
    typeof submission.from_email === "string" &&
    typeof submission.message === "string"
  );
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  if (!CONTACT_FLOW_URL) {
    return response.status(503).json({
      error: "The contact form is not configured yet. Please email me directly.",
    });
  }

  if (!isContactSubmission(request.body)) {
    return response.status(400).json({ error: "Please provide all contact details." });
  }

  const submission: ContactSubmission = {
    from_name: request.body.from_name.trim(),
    from_email: request.body.from_email.trim(),
    message: request.body.message.trim(),
  };

  if (
    !submission.from_name ||
    submission.from_name.length > MAX_NAME_LENGTH ||
    !submission.from_email ||
    submission.from_email.length > MAX_EMAIL_LENGTH ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.from_email) ||
    !submission.message ||
    submission.message.length > MAX_MESSAGE_LENGTH
  ) {
    return response.status(400).json({
      error: "Please check your name, email, and message, then try again.",
    });
  }

  try {
    const flowResponse = await fetch(CONTACT_FLOW_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });

    if (!flowResponse.ok) {
      console.error("Contact flow returned HTTP status:", flowResponse.status);
      return response.status(502).json({
        error: "Your message could not be saved. Please try again or email me directly.",
      });
    }

    return response.status(200).json({ ok: true });
  } catch (error: unknown) {
    console.error("Contact flow request failed:", error);
    return response.status(502).json({
      error: "Your message could not be saved. Please try again or email me directly.",
    });
  }
}
