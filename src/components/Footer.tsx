import { ArrowUp } from "lucide-react";
import { socials } from "@/data/content";

export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-6xl px-6 pb-10 pt-16 sm:px-10">
      <div className="flex flex-col items-center gap-6 border-t border-line pt-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-mist">
          © {new Date().getFullYear()} SKG. Built with React &amp; Framer Motion.
        </p>

        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank" 
              data-cursor-hover
              className="text-sm text-mist transition-colors hover:text-signal-cyan"
            >
              {s.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          data-cursor-hover
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-signal-cyan/50 hover:text-signal-cyan"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
