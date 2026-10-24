import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import RoleRotator from "./RoleRotator";
import { socials } from "@/data/content";
import { useDeviceCapability } from "@/lib/use-device";

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
          {/* Text content */}
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
              As a developer, I take pleasure in transforming concepts into functional products, ranging from AI applications and backend systems.
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

          {/* Engineering portrait frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotateX: 8 }}
            animate={
              reduceEffects
                ? { opacity: 1, scale: 1, rotateX: 0 }
                : { opacity: 1, scale: 1, rotateX: 0, y: [0, -8, 0] }
            }
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.2,
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={reduceEffects ? undefined : { scale: 1.02, rotateY: -4, rotateX: 4 }}
            className="relative order-1 mx-auto mt-8 aspect-[4/5] w-full max-w-sm lg:order-2 lg:mt-0"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            <motion.div
              aria-hidden="true"
              animate={reduceEffects ? undefined : { opacity: [0.35, 0.65, 0.35], scale: [1, 1.04, 1] }}
              transition={reduceEffects ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-10 rounded-[40px] bg-gradient-to-br from-signal-cyan/25 via-signal-violet/20 to-transparent blur-3xl"
            />

            <div className="group relative h-full w-full overflow-hidden rounded-[28px] border border-line shadow-glow">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-void-raised via-void-soft to-void" />

              <motion.img
                src="/profile.jpg"
                alt="Portrait of Gunagaran - Software & AI Engineer"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={640}
                height={800}
                sizes="(max-width: 1024px) 100vw, 38vw"
                animate={reduceEffects ? undefined : { scale: [1, 1.03, 1] }}
                transition={reduceEffects ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-full object-cover saturate-[0.8] contrast-[1.1] will-change-transform"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0";
                }}
              />

              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-signal-cyan/30" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-signal-violet/10" />

              {!reduceEffects && (
                <motion.div
                  aria-hidden="true"
                  animate={{ opacity: [0.2, 0.7, 0.2], x: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute inset-x-10 top-0 h-16 bg-gradient-to-b from-signal-cyan/18 via-signal-violet/10 to-transparent"
                />
              )}

              <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between">
                <div className="h-6 w-6">
                  <div className="absolute left-0 top-0 h-[2px] w-4 bg-signal-cyan" />
                  <div className="absolute left-0 top-0 h-4 w-[2px] bg-signal-cyan" />
                </div>
                <div className="h-6 w-6">
                  <div className="absolute right-0 top-0 h-[2px] w-4 bg-signal-cyan" />
                  <div className="absolute right-0 top-0 h-4 w-[2px] bg-signal-cyan" />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between">
                <div className="h-6 w-6">
                  <div className="absolute bottom-0 left-0 h-[2px] w-4 bg-signal-violet" />
                  <div className="absolute bottom-0 left-0 h-4 w-[2px] bg-signal-violet" />
                </div>
                <div className="h-6 w-6">
                  <div className="absolute bottom-0 right-0 h-[2px] w-4 bg-signal-violet" />
                  <div className="absolute bottom-0 right-0 h-4 w-[2px] bg-signal-violet" />
                </div>
              </div>

              <div className="pointer-events-none absolute bottom-0 inset-x-0 px-4 pb-3 pt-8 bg-gradient-to-t from-void/80 to-transparent">
                <div className="flex items-center justify-between">
                  <motion.p
                    animate={reduceEffects ? undefined : { opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                    className="font-mono text-[9px] tracking-widest text-signal-cyan/80"
                  >
                    ● SYS ACTIVE
                  </motion.p>
                 
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="glass absolute -right-4 top-6 hidden w-36 rounded-xl p-3 sm:block lg:-right-10"
            >
              <p className="font-mono text-[10px] text-signal-violet">STATUS</p>
              <p className="mt-1 text-xs text-black">Systems online</p>
              {!reduceEffects && (
                <motion.div
                  animate={{ width: ["30%", "100%", "60%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="mt-2 h-[2px] rounded-full bg-signal-violet/60"
                />
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="glass absolute -bottom-6 -left-4 hidden w-40 rounded-xl p-3 sm:block lg:-left-10"
            >
              <p className="font-mono text-[10px] text-signal-violet">STACK</p>
              <p className="mt-1 text-xs text-mist-bright">React · Spring Boot · ML</p>
              {!reduceEffects && (
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="mt-2 h-[2px] rounded-full bg-signal-violet/60"
                />
              )}
            </motion.div>
          </motion.div>
      </div>

      {/* scroll indicator */}
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
