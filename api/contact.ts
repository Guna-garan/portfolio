import type { IncomingMessage, ServerResponse } from "node:http";

const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
const GOOGLE_APPS_SCRIPT_TOKEN = process.env.GOOGLE_APPS_SCRIPT_TOKEN;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_REQUEST_SIZE = 32 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type ContactSubmission = {
  from_name: string;
  from_email: string;
  message: string;
  website?: string;
};

type VercelRequest = IncomingMessage & {
  body?: unknown;
  headers: IncomingMessage["headers"] & { "x-real-ip"?: string };
};
type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => VercelResponse;
};

const submissionsByIp = new Map<string, number[]>();

function isContactSubmission(value: unknown): value is ContactSubmission {
  if (!value || typeof value !== "object") return false;

  const submission = value as Record<string, unknown>;
  return (
    typeof submission.from_name === "string" &&
    typeof submission.from_email === "string" &&
    typeof submission.message === "string" &&
    (submission.website === undefined || typeof submission.website === "string")
  );
}

function sanitizeText(value: string) {
  return Array.from(value)
    .filter((character) => {
      const code = character.charCodeAt(0);
      return !(
        code <= 8 ||
        (code >= 11 && code <= 12) ||
        (code >= 14 && code <= 31) ||
        code === 127
      );
    })
    .join("")
    .trim();
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recentSubmissions = (submissionsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recentSubmissions.length >= RATE_LIMIT_MAX_REQUESTS) {
    submissionsByIp.set(ip, recentSubmissions);
    return true;
  }

  recentSubmissions.push(now);
  submissionsByIp.set(ip, recentSubmissions);

  if (submissionsByIp.size > 1000) {
    for (const [key, timestamps] of submissionsByIp) {
      if (timestamps.every((timestamp) => now - timestamp >= RATE_LIMIT_WINDOW_MS)) {
        submissionsByIp.delete(key);
      }
    }
  }

  return false;
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

  const contentType = request.headers["content-type"];
  if (!contentType || !/^application\/json(?:\s*;|$)/i.test(contentType)) {
    return response.status(415).json({ error: "Please submit the form using JSON." });
  }

  const contentLength = Number(request.headers["content-length"]);
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_SIZE) {
    return response.status(413).json({ error: "Your submission is too large." });
  }

  if (
    !GOOGLE_APPS_SCRIPT_URL ||
    !GOOGLE_APPS_SCRIPT_TOKEN ||
    GOOGLE_APPS_SCRIPT_TOKEN.length < 32
  ) {
    return response.status(503).json({
      error: "The contact form is not configured yet. Please email me directly.",
    });
  }

  if (!isContactSubmission(request.body)) {
    return response.status(400).json({ error: "Please provide all contact details." });
  }

  const submission: ContactSubmission = {
    from_name: sanitizeText(request.body.from_name),
    from_email: request.body.from_email.trim(),
    message: sanitizeText(request.body.message),
  };

  if (request.body.website?.trim()) {
    return response.status(400).json({
      error: "Please check your name, email, and message, then try again.",
    });
  }

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

  if (new TextEncoder().encode(JSON.stringify(request.body)).length > MAX_REQUEST_SIZE) {
    return response.status(413).json({ error: "Your submission is too large." });
  }

  const clientIp = request.headers["x-real-ip"];
  if (clientIp && isRateLimited(clientIp)) {
    return response.status(429).json({
      error: "Too many submissions. Please wait a few minutes and try again.",
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const appsScriptResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name: submission.from_name,
        Email: submission.from_email,
        Message: submission.message,
        token: GOOGLE_APPS_SCRIPT_TOKEN,
      }),
      signal: controller.signal,
    });

    let result: unknown;
    try {
      result = await appsScriptResponse.json();
    } catch {
      console.error("Google Apps Script returned an invalid response.");
      return response.status(502).json({
        error: "Your message could not be saved. Please try again or email me directly.",
      });
    }

    if (
      !appsScriptResponse.ok ||
      !result ||
      typeof result !== "object" ||
      !("ok" in result) ||
      result.ok !== true
    ) {
      console.error("Google Apps Script rejected the contact submission.");
      return response.status(502).json({
        error: "Your message could not be saved. Please try again or email me directly.",
      });
    }

    return response.status(200).json({ ok: true });
  } catch (error: unknown) {
    console.error(
      error instanceof Error && error.name === "AbortError"
        ? "Google Apps Script request timed out."
        : "Google Apps Script request failed."
    );
    return response.status(502).json({
      error: "Your message could not be saved. Please try again or email me directly.",
    });
  } finally {
    clearTimeout(timeout);
  }
}
