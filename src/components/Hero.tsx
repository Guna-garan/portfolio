import { motion } from "framer-motion";
import { ArrowDown, Download, FileText, Github, Linkedin, Mail } from "lucide-react";
import RoleRotator from "./RoleRotator";
import { socials } from "@/data/content";
import { useDeviceCapability } from "@/lib/use-device";
import HeroImageAnimation from "./HeroImageAnimation";

const iconFor: Record<string, React.ReactNode> = {
  GitHub: <Github size={18} />,
  LinkedIn: <Linkedin size={18} />,
  Email: <Mail size={18} />,
};

export default function Hero() {
  const { prefersReducedMotion } = useDeviceCapability();
  const reduceEffects = prefersReducedMotion;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16 sm:px-10"
      aria-label="Introduction"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ── Text content ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <p className="mb-4 font-mono text-xs text-mist sm:text-sm">
            Software &amp; AI Engineering
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-mist-bright sm:text-5xl lg:text-6xl">
            I design and build
            <br />
            <span className="text-gradient">intelligent systems.</span>
          </h1>
          <div className="mt-5">
            <RoleRotator />
          </div>
          <p className="mt-6 max-w-md text-base leading-relaxed text-mist">
            As a developer, I take pleasure in transforming concepts into
            functional products, ranging from AI applications and backend
            systems.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              data-cursor-hover
              className="group relative overflow-hidden rounded-full bg-signal-cyan px-6 py-3 text-sm font-semibold text-void shadow-glow transition-transform active:scale-95"
            >
              View projects
            </a>
            <a
              href="#contact"
              data-cursor-hover
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-mist-bright transition-colors hover:border-signal-cyan/40 hover:text-signal-cyan"
            >
              Get in touch
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-mist-bright transition-colors hover:border-signal-cyan/40 hover:text-signal-cyan"
            >
              <FileText size={16} />
              View resume
            </a>
            <a
              href="/resume.pdf"
              download="resume.pdf"
              data-cursor-hover
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-mist-bright transition-colors hover:border-signal-cyan/40 hover:text-signal-cyan"
            >
              <Download size={16} />
              Download resume
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                data-cursor-hover
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-signal-cyan/50 hover:text-signal-cyan"
              >
                {iconFor[s.label]}
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Holographic portrait ──────────────────────────────────── */}
        <div className="order-1 lg:order-2">
          {/* Floating info badge — STATUS */}
          <div className="relative">
            <HeroImageAnimation />

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="absolute -right-4 top-6 hidden w-36 rounded-xl p-3 sm:block lg:-right-10"
              style={{
                zIndex: 20,
                background: "linear-gradient(135deg, rgba(15,15,30,0.82), rgba(20,10,40,0.78))",
                border: "1px solid rgba(167,139,250,0.22)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="font-mono text-[10px] font-semibold tracking-widest"
                style={{ color: "#A78BFA" }}
              >
                CURRENTLY
              </p>
              <p
                className="mt-1 text-xs font-medium leading-snug"
                style={{ color: "#FFFFFF" }}
              >
                Building the future.
              </p>
              {!reduceEffects && (
                <motion.div
                  animate={{ width: ["30%", "100%", "60%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="mt-2 h-[2px] rounded-full"
                  style={{ background: "linear-gradient(to right, #8b7cfa, #4de8e0)" }}
                />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="absolute -bottom-6 -left-4 hidden w-40 rounded-xl p-3 sm:block lg:-left-10"
              style={{
                zIndex: 20,
                background: "linear-gradient(135deg, rgba(15,15,30,0.82), rgba(20,10,40,0.78))",
                border: "1px solid rgba(167,139,250,0.22)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="font-mono text-[10px] font-semibold tracking-widest"
                style={{ color: "#A78BFA" }}
              >
                STACK
              </p>
              <p
                className="mt-1 text-xs font-medium leading-snug"
                style={{ color: "#FFFFFF" }}
              >
                React · Spring Boot · ML
              </p>
              {!reduceEffects && (
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="mt-2 h-[2px] rounded-full bg-signal-violet/60"
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-mist"
      >
        <span className="font-mono text-[10px] tracking-wide">SCROLL</span>
        <motion.span
          animate={reduceEffects ? undefined : { y: [0, 6, 0] }}
          transition={reduceEffects ? undefined : { duration: 1.6, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  );
}
