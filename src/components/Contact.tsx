import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this up to your email service or API route of choice.
    setStatus("sent");
  }

  return (
    <section id="contact" className="relative mx-auto max-w-3xl px-6 py-28 sm:px-10">
      <SectionHeading
        kicker="CONTACT"
        title="Let's build something"
        description="Have a project, a role, or just a question about how something was built? Send a message."
      />

      <motion.form
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
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="peer w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-mist-bright outline-none transition-colors placeholder:text-mist/50 focus:border-signal-cyan/50"
            />
          </Field>
          <Field label="Email" htmlFor="email">
            <input
              id="email"
              name="email"
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

        <button
          type="submit"
          data-cursor-hover
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-signal-cyan px-6 py-3.5 text-sm font-semibold text-void shadow-glow transition-transform active:scale-[0.98] sm:w-auto"
        >
          {status === "sent" ? (
            <>
              <CheckCircle2 size={18} /> Message sent
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
