import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import SectionHeading from "./SectionHeading";

// ─── EmailJS credentials (loaded from .env.local — never committed to git) ──
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;
// ────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("loading");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus("sent");
      formRef.current.reset();
      // Reset back to idle after 5 seconds so the user can send another message
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
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
            placeholder="Tell me about what you're building..."
            className="peer w-full resize-none rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-mist-bright outline-none transition-colors placeholder:text-mist/50 focus:border-signal-cyan/50"
          />
        </Field>

        {status === "error" && (
          <p className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle size={16} />
            Something went wrong. Please try again.
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
