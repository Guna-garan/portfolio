import express, { type ErrorRequestHandler } from "express";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { contactHandler } from "./contact.js";

const app = express();
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = resolve(projectRoot, "dist");
const indexFile = resolve(distDirectory, "index.html");
const port = Number.parseInt(process.env.PORT ?? "3000", 10);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid TCP port.");
}

if (!existsSync(indexFile)) {
  throw new Error("Production frontend build is missing. Run npm run build first.");
}

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use("/api", (_request, response, next) => {
  response.setHeader("Cache-Control", "no-store");
  next();
});
app.use("/api", express.json({ limit: "32kb", strict: true }));
app.post("/api/contact", contactHandler);
app.all("/api/contact", (_request, response) => {
  response.setHeader("Allow", "POST");
  response.status(405).json({ error: "Method not allowed." });
});
app.use("/api", (_request, response) => {
  response.status(404).json({ error: "API route not found." });
});

app.use(express.static(distDirectory, { index: false }));
app.use((request, response, next) => {
  if (request.method === "GET" && request.accepts("html")) {
    response.sendFile(indexFile, (error) => {
      if (error) next(error);
    });
    return;
  }

  response.status(404).json({ error: "Not found." });
});

const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (
    error &&
    typeof error === "object" &&
    "type" in error &&
    error.type === "entity.too.large"
  ) {
    response.status(413).json({ error: "Your submission is too large." });
    return;
  }

  if (error instanceof SyntaxError && "body" in error) {
    response.status(400).json({ error: "Please provide a valid JSON request." });
    return;
  }

  console.error("Unhandled server error.");
  response.status(500).json({ error: "An unexpected server error occurred." });
};

app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`Portfolio server listening on port ${port}.`);
});
