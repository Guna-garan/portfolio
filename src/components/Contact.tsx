import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";

const CONTACT_EMAIL = "gunagaran08@gmail.com";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const submittingRef = useRef(false);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current || submittingRef.current) return;

    submittingRef.current = true;
    setStatus("loading");
    setErrorMessage("");
    try {
      const formData = new FormData(formRef.current);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_name: formData.get("from_name"),
          from_email: formData.get("from_email"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });
      const result: { ok?: boolean; error?: string } = await response
        .json()
        .catch(() => ({}));
      if (!response.ok || result.ok !== true) {
        throw new Error(
          result.error || "Your message could not be sent. Please try again or email me directly."
        );
      }

      setStatus("sent");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please try again or email me directly."
      );
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-3xl px-6 py-28 sm:px-10">
      <SectionHeading
        kicker="CONTACT"
        title="Let's build something"
        description="Have a project, a role, or just a question about how something was built? Send a message."
      />

      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        aria-busy={status === "loading"}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass mt-14 space-y-5 rounded-2xl p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Name" htmlFor="name">
            <input
              id="name"
              name="from_name"
              type="text"
              required
              maxLength={100}
              placeholder="Your name"
              className="peer w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-mist-bright outline-none transition-colors placeholder:text-mist/50 focus:border-signal-cyan/50"
            />
          </Field>
          <Field label="Email" htmlFor="email">
            <input
              id="email"
              name="from_email"
              type="email"
              required
              maxLength={254}
              placeholder="you@email.com"
              className="peer w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-mist-bright outline-none transition-colors placeholder:text-mist/50 focus:border-signal-cyan/50"
            />
          </Field>
        </div>
        <Field label="Message" htmlFor="message">
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={5000}
            placeholder="Tell me about what you're building..."
            className="peer w-full resize-none rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-mist-bright outline-none transition-colors placeholder:text-mist/50 focus:border-signal-cyan/50"
          />
        </Field>

        <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <p role="status" aria-live="polite" className="sr-only">
          {status === "sent" ? "Your message was sent successfully." : ""}
        </p>

        {status === "error" && (
          <p role="alert" className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle size={16} />
            {errorMessage}{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline underline-offset-2 hover:text-red-300"
            >
              Email me
            </a>
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading" || status === "sent"}
          data-cursor-hover
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-signal-cyan px-6 py-3.5 text-sm font-semibold text-void shadow-glow transition-transform active:scale-[0.98] disabled:opacity-70 sm:w-auto"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Sending…
            </>
          ) : status === "sent" ? (
            <>
              <CheckCircle2 size={18} /> Message sent!
            </>
          ) : (
            <>
              <Send size={18} /> Send message
            </>
          )}
        </button>
      </motion.form>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-xs font-medium text-mist">
        {label}
      </label>
      {children}
    </div>
  );
}
