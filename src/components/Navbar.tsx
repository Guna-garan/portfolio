import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 transition-all duration-500",
          scrolled ? "glass mx-4 py-2.5 sm:mx-auto" : "mx-4 py-1 sm:mx-auto"
        )}
      >
        <a
          href="#hero"
          className="font-display text-lg font-semibold tracking-tight text-mist-bright"
          data-cursor-hover
        >
          SKG<span className="text-signal-cyan">.</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-cursor-hover
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === item.id
                  ? "text-mist-bright"
                  : "text-mist hover:text-mist-bright"
              )}
            >
              {active === item.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-cursor-hover
          className="hidden rounded-full border border-signal-cyan/30 bg-signal-cyan/10 px-4 py-2 text-sm font-medium text-signal-cyan transition-colors hover:bg-signal-cyan/20 md:block"
        >
          Let&apos;s talk
        </a>

        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="rounded-full p-2 text-mist-bright md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-mist-bright hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
