import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { isTouch, prefersReducedMotion } = useDeviceCapability();
  const reduceEffects = isTouch || prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Reveal sequence: darkness -> focus -> locked portrait.
  const imageOpacity = useTransform(scrollYProgress, [0, 0.28, 0.55], [0, 0.7, 1]);
  const imageScale = useTransform(scrollYProgress, [0, 0.55, 1], [1.15, 1, 0.96]);
  const imageRotateY = useTransform(
    scrollYProgress,
    [0, 0.55],
    reduceEffects ? [0, 0] : [22, 0]
  );
  const imageRotateX = useTransform(
    scrollYProgress,
    [0, 0.55],
    reduceEffects ? [0, 0] : [-8, 0]
  );
  const imageBlur = useTransform(scrollYProgress, [0, 0.5], reduceEffects ? [0, 0] : [14, 0]);
  const blurFilter = useTransform(imageBlur, (v) => `blur(${v}px)`);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [0.15, 0.8, 0.45]);
  const scanOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6], [0, 0.6, 0]);
  const hudOpacity = useTransform(scrollYProgress, [0.35, 0.6, 1], [0, 1, 1]);
  const hudX = useTransform(scrollYProgress, [0.35, 0.6], [30, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceEffects ? 0 : -40]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[170vh]"
      aria-label="Introduction"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6 sm:px-10">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Text content */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
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
              Full stack developer and AI engineer turning complex problems —
              from inventory logistics to language models — into fast,
              reliable products.
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
                  data-cursor-hover
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-signal-cyan/50 hover:text-signal-cyan"
                >
                  {iconFor[s.label]}
                </a>
              ))}
            </div>
          </motion.div>

          {/* 3D cinematic portrait reveal */}
          <div
            className="relative order-1 mx-auto aspect-[4/5] w-full max-w-sm lg:order-2"
            style={{ perspective: "1200px" }}
          >
            {/* ambient depth fog behind portrait */}
            <motion.div
              aria-hidden="true"
              style={{ opacity: glowOpacity }}
              className="absolute -inset-10 rounded-[40px] bg-gradient-to-br from-signal-cyan/25 via-signal-violet/20 to-transparent blur-3xl"
            />

            <motion.div
              style={{
                opacity: imageOpacity,
                scale: imageScale,
                rotateY: imageRotateY,
                rotateX: imageRotateX,
                filter: blurFilter,
                transformStyle: "preserve-3d",
              }}
              className="relative h-full w-full overflow-hidden rounded-[28px] border border-line shadow-glow"
            >
              {/* fallback gradient plate, sits behind the portrait */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-void-raised via-void-soft to-void" />

              <img
                src="/profile.jpg"
                alt="Portrait"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0";
                }}
              />

              {/* holographic edge lighting */}
              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-signal-cyan/30" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-signal-violet/10" />

              {/* scan line sweep */}
              <motion.div
                aria-hidden="true"
                style={{ opacity: scanOpacity }}
                className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-signal-cyan/25 to-transparent"
                animate={reduceEffects ? undefined : { y: ["-10%", "110%"] }}
                transition={
                  reduceEffects
                    ? undefined
                    : { duration: 2.6, repeat: Infinity, ease: "linear" }
                }
              />
            </motion.div>

            {/* floating HUD data panels */}
            <motion.div
              style={{ opacity: hudOpacity, x: hudX }}
              className="glass absolute -right-4 top-6 hidden w-36 rounded-xl p-3 sm:block lg:-right-10"
            >
              <p className="font-mono text-[10px] text-signal-cyan">STATUS</p>
              <p className="mt-1 text-xs text-mist-bright">Systems online</p>
            </motion.div>
            <motion.div
              style={{ opacity: hudOpacity }}
              className="glass absolute -bottom-6 -left-4 hidden w-40 rounded-xl p-3 sm:block lg:-left-10"
            >
              <p className="font-mono text-[10px] text-signal-violet">STACK</p>
              <p className="mt-1 text-xs text-mist-bright">React · Spring Boot · ML</p>
            </motion.div>
          </div>
        </div>

        {/* scroll indicator */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
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
      </div>
    </section>
  );
}
