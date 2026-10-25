import type { RequestHandler } from "express";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type ContactSubmission = {
  from_name: string;
  from_email: string;
  message: string;
  website?: string;
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

function isConfiguredAppsScriptUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "script.google.com" &&
      url.pathname.startsWith("/macros/s/") &&
      url.pathname.endsWith("/exec")
    );
  } catch {
    return false;
  }
}

export const contactHandler: RequestHandler = async (request, response) => {
  response.setHeader("Cache-Control", "no-store");

  if (!request.is("application/json")) {
    response.status(415).json({ error: "Please submit the form using JSON." });
    return;
  }

  if (!isContactSubmission(request.body)) {
    response.status(400).json({ error: "Please provide all contact details." });
    return;
  }

  const submission = {
    from_name: sanitizeText(request.body.from_name),
    from_email: request.body.from_email.trim(),
    message: sanitizeText(request.body.message),
  };

  if (request.body.website?.trim()) {
    response.status(400).json({
      error: "Please check your name, email, and message, then try again.",
    });
    return;
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
    response.status(400).json({
      error: "Please check your name, email, and message, then try again.",
    });
    return;
  }

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const appsScriptToken = process.env.GOOGLE_APPS_SCRIPT_TOKEN;
  if (
    !appsScriptUrl ||
    !isConfiguredAppsScriptUrl(appsScriptUrl) ||
    !appsScriptToken ||
    appsScriptToken.length < 32
  ) {
    response.status(503).json({
      error: "The contact form is not configured yet. Please email me directly.",
    });
    return;
  }

  if (isRateLimited(request.ip || request.socket.remoteAddress || "unknown")) {
    response.status(429).json({
      error: "Too many submissions. Please wait a few minutes and try again.",
    });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const appsScriptResponse = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name: submission.from_name,
        Email: submission.from_email,
        Message: submission.message,
        token: appsScriptToken,
      }),
      signal: controller.signal,
    });

    let result: unknown;
    try {
      result = await appsScriptResponse.json();
    } catch {
      console.error("Google Apps Script returned an invalid response.");
      response.status(502).json({
        error: "Your message could not be saved. Please try again or email me directly.",
      });
      return;
    }

    if (
      !appsScriptResponse.ok ||
      !result ||
      typeof result !== "object" ||
      !("ok" in result) ||
      result.ok !== true
    ) {
      console.error("Google Apps Script rejected the contact submission.");
      response.status(502).json({
        error: "Your message could not be saved. Please try again or email me directly.",
      });
      return;
    }

    response.status(200).json({ ok: true });
  } catch (error: unknown) {
    console.error(
      error instanceof Error && error.name === "AbortError"
        ? "Google Apps Script request timed out."
        : "Google Apps Script request failed."
    );
    response.status(502).json({
      error: "Your message could not be saved. Please try again or email me directly.",
    });
  } finally {
    clearTimeout(timeout);
  }
};
