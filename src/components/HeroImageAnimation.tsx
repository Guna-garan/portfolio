/**
 * HeroImageAnimation.tsx
 *
 * Futuristic holographic 3D interactive animation for the hero portrait.
 * Features:
 *  - Smooth vertical floating (spring-eased)
 *  - 3D perspective tilt tracking cursor X/Y
 *  - Holographic glow (cyan → electric-blue → violet gradient)
 *  - Dynamic glass reflection that follows cursor
 *  - Neon shadow beneath for floating-3D illusion
 *  - Subtle parallax depth layers
 *  - Scale-up on hover (1.04×, spring easing)
 *  - Orbital particles / glowing dots
 *  - Spring reset on mouse-leave
 *  - Fully responsive; heavy effects disabled on mobile / touch
 *  - Respects prefers-reduced-motion
 */

import { useRef, useCallback, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useDeviceCapability } from "@/lib/use-device";

/* ─── Particle config ─────────────────────────────────────────────────── */
const PARTICLES: Array<{
  id: number;
  x: string;
  y: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
}> = [
  { id: 0,  x: "-14%", y: "18%",  size: 5, color: "#4de8e0", duration: 4.1, delay: 0.0 },
  { id: 1,  x: "108%", y: "30%",  size: 3, color: "#8b7cfa", duration: 5.2, delay: 0.9 },
  { id: 2,  x: "-10%", y: "72%",  size: 4, color: "#4de8e0", duration: 3.7, delay: 1.6 },
  { id: 3,  x: "112%", y: "60%",  size: 2, color: "#60a5fa", duration: 6.0, delay: 0.3 },
  { id: 4,  x: "30%",  y: "-8%",  size: 3, color: "#8b7cfa", duration: 4.5, delay: 2.1 },
  { id: 5,  x: "75%",  y: "-6%",  size: 2, color: "#4de8e0", duration: 5.5, delay: 0.7 },
  { id: 6,  x: "50%",  y: "108%", size: 3, color: "#60a5fa", duration: 4.8, delay: 1.2 },
  { id: 7,  x: "-6%",  y: "45%",  size: 2, color: "#c084fc", duration: 3.3, delay: 2.5 },
  { id: 8,  x: "105%", y: "82%",  size: 4, color: "#4de8e0", duration: 4.9, delay: 0.5 },
  { id: 9,  x: "90%",  y: "110%", size: 2, color: "#8b7cfa", duration: 5.1, delay: 1.8 },
];

/* ─── Digital energy trail config ────────────────────────────────────── */
const LINES: Array<{
  id: number;
  x1: string; y1: string;
  angle: number;
  len: number;
  color: string;
  duration: number;
  delay: number;
}> = [
  { id: 0, x1: "-4%", y1: "22%", angle: 20,  len: 48, color: "#4de8e0", duration: 3.5, delay: 0.4 },
  { id: 1, x1: "96%", y1: "50%", angle: -18, len: 36, color: "#8b7cfa", duration: 4.2, delay: 1.1 },
  { id: 2, x1: "15%", y1: "98%", angle: -8,  len: 42, color: "#60a5fa", duration: 5.0, delay: 0.0 },
];

export default function HeroImageAnimation() {
  const { isTouch, prefersReducedMotion } = useDeviceCapability();
  const reduceEffects = prefersReducedMotion;
  const isMobile = isTouch;

  const portraitRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  /* ── Pointer tracking ─────────────────────────────────────────────── */
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  /* Spring config — feel snappy on enter, fluidy on leave */
  const springCfg = { stiffness: 160, damping: 22, mass: 1 };

  const rotateX = useSpring(
    useTransform(rawY, [0, 1], [14, -14]),
    springCfg
  );
  const rotateY = useSpring(
    useTransform(rawX, [0, 1], [-14, 14]),
    springCfg
  );
  const scale = useSpring(1, { stiffness: 240, damping: 26, mass: 0.8 });
  const reflectionOpacity = useSpring(0, { stiffness: 180, damping: 28 });

  /* Parallax layers — foreground moves more than background */
  const layerFarX  = useSpring(useTransform(rawX, [0, 1], [-3, 3]),  springCfg);
  const layerFarY  = useSpring(useTransform(rawY, [0, 1], [-3, 3]),  springCfg);
  const layerNearX = useSpring(useTransform(rawX, [0, 1], [-8, 8]),  springCfg);
  const layerNearY = useSpring(useTransform(rawY, [0, 1], [-8, 8]),  springCfg);

  /* Holographic glow drift */
  const glowX = useTransform(rawX, [0, 1], [-12, 12]);
  const glowY = useTransform(rawY, [0, 1], [-12, 12]);

  /* Dynamic glass reflection sweep */
  const reflection = useTransform(
    [rawX, rawY],
    ([x, y]: number[]) =>
      `radial-gradient(ellipse 55% 40% at ${x * 100}% ${y * 100}%,
        rgba(255,255,255,0.22),
        rgba(77,232,224,0.09) 36%,
        rgba(139,124,250,0.05) 55%,
        transparent 72%)`
  );

  /* ── Event handlers ───────────────────────────────────────────────── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile || reduceEffects || !portraitRef.current) return;
      const b = portraitRef.current.getBoundingClientRect();
      rawX.set(Math.max(0, Math.min(1, (e.clientX - b.left) / b.width)));
      rawY.set(Math.max(0, Math.min(1, (e.clientY - b.top) / b.height)));
    },
    [isMobile, reduceEffects, rawX, rawY]
  );

  const handleMouseEnter = useCallback(() => {
    if (isMobile || reduceEffects) return;
    setHovered(true);
    scale.set(1.04);
    reflectionOpacity.set(1);
  }, [isMobile, reduceEffects, scale, reflectionOpacity]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0.5);
    rawY.set(0.5);
    scale.set(1);
    reflectionOpacity.set(0);
    setHovered(false);
  }, [rawX, rawY, scale, reflectionOpacity]);

  /* ── Floating animation (vertical bob) ───────────────────────────── */
  const floatVariants = {
    float: {
      y: isMobile ? [0, -5, 0] : [0, -14, 0],
      transition: {
        duration: isMobile ? 7 : 5.8,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  /* ── Render ───────────────────────────────────────────────────────── */
  return (
    <div
      className="relative mx-auto mt-8 w-full max-w-sm lg:mt-0"
      style={{ aspectRatio: "4/5" }}
    >
      {/* ── Outer floating wrapper ──────────────────────────────────── */}
      <motion.div
        className="relative h-full w-full"
        variants={reduceEffects ? undefined : floatVariants}
        animate={reduceEffects ? undefined : "float"}
        style={{ perspective: "1400px" }}
      >
        {/* ── Holographic ambient glow (behind everything) ─────────── */}
        <motion.div
          aria-hidden="true"
          style={{
            x: isMobile || reduceEffects ? 0 : glowX,
            y: isMobile || reduceEffects ? 0 : glowY,
          }}
          animate={
            reduceEffects
              ? undefined
              : { opacity: [0.5, 0.85, 0.5] }
          }
          transition={
            reduceEffects
              ? undefined
              : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
          }
          className="pointer-events-none absolute -inset-10 rounded-[48px]"
          style={{
            x: isMobile || reduceEffects ? 0 : glowX,
            y: isMobile || reduceEffects ? 0 : glowY,
            background:
              "radial-gradient(ellipse at 50% 50%, " +
              "rgba(77,232,224,0.28) 0%, " +
              "rgba(96,165,250,0.18) 35%, " +
              "rgba(139,124,250,0.22) 60%, " +
              "transparent 80%)",
            filter: "blur(32px)",
          }}
        />

        {/* ── Secondary violet glow ring ───────────────────────────── */}
        <motion.div
          aria-hidden="true"
          animate={
            reduceEffects
              ? undefined
              : { opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }
          }
          transition={
            reduceEffects
              ? undefined
              : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
          }
          className="pointer-events-none absolute -inset-6 rounded-[42px]"
          style={{
            background:
              "radial-gradient(ellipse at 30% 70%, " +
              "rgba(192,132,252,0.2) 0%, " +
              "rgba(139,124,250,0.12) 40%, " +
              "transparent 70%)",
            filter: "blur(24px)",
          }}
        />

        {/* ── Neon floor shadow (3D floating illusion) ─────────────── */}
        <motion.div
          aria-hidden="true"
          animate={
            reduceEffects
              ? undefined
              : { scaleX: [0.7, 0.9, 0.7], opacity: [0.4, 0.65, 0.4] }
          }
          transition={
            reduceEffects
              ? undefined
              : { duration: 5.8, repeat: Infinity, ease: "easeInOut" }
          }
          className="pointer-events-none absolute -bottom-8 left-[10%] right-[10%] h-12 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, " +
              "rgba(77,232,224,0.45) 0%, " +
              "rgba(139,124,250,0.3) 50%, " +
              "transparent 80%)",
            filter: "blur(18px)",
          }}
        />

        {/* ── 3D tilt card ─────────────────────────────────────────── */}
        <motion.div
          ref={portraitRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: isMobile || reduceEffects ? 0 : rotateX,
            rotateY: isMobile || reduceEffects ? 0 : rotateY,
            scale: isMobile || reduceEffects ? 1 : scale,
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
          }}
          className="relative h-full w-full overflow-hidden rounded-[28px]"
        >
          {/* Border + base shadow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[28px]"
            style={{
              boxShadow: hovered
                ? "0 0 0 1.5px rgba(77,232,224,0.55), 0 28px 80px -20px rgba(77,232,224,0.4), 0 20px 60px -28px rgba(139,124,250,0.45)"
                : "0 0 0 1px rgba(77,232,224,0.25), 0 24px 70px -24px rgba(77,232,224,0.3), 0 18px 55px -30px rgba(139,124,250,0.35)",
              transition: "box-shadow 0.4s ease",
              zIndex: 10,
            }}
          />

          {/* ── Parallax background layer (subtle depth) ─────────── */}
          <motion.div
            aria-hidden="true"
            style={{
              x: isMobile || reduceEffects ? 0 : layerFarX,
              y: isMobile || reduceEffects ? 0 : layerFarY,
              position: "absolute",
              inset: "-6px",
              background:
                "linear-gradient(135deg, rgba(77,232,224,0.04), rgba(139,124,250,0.04))",
              borderRadius: "28px",
              zIndex: 0,
            }}
          />

          {/* ── Portrait image ───────────────────────────────────── */}
          <img
            src="/profile.jpg"
            alt="Portrait of Gunagaran - Software & AI Engineer"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={640}
            height={800}
            sizes="(max-width: 1024px) 100vw, 38vw"
            className="relative h-full w-full object-cover object-top"
            style={{ zIndex: 1 }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "0";
            }}
          />

          {/* ── Dynamic glass reflection overlay ─────────────────── */}
          <motion.div
            aria-hidden="true"
            style={{
              background: isMobile || reduceEffects ? "none" : reflection,
              opacity: isMobile || reduceEffects ? 0 : reflectionOpacity,
              position: "absolute",
              inset: 0,
              zIndex: 2,
            }}
            className="pointer-events-none"
          />

          {/* ── Cyan edge-sheen overlay ───────────────────────────── */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[28px]"
            style={{
              background:
                "linear-gradient(135deg, " +
                "rgba(77,232,224,0.08) 0%, " +
                "transparent 40%, " +
                "rgba(139,124,250,0.06) 80%, " +
                "rgba(192,132,252,0.08) 100%)",
              zIndex: 3,
            }}
          />

          {/* ── Scan-line shimmer ─────────────────────────────────── */}
          {!reduceEffects && (
            <motion.div
              aria-hidden="true"
              animate={{ y: ["-100%", "200%"] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 4,
              }}
              className="pointer-events-none absolute left-0 right-0 h-[60px]"
              style={{
                background:
                  "linear-gradient(to bottom, " +
                  "transparent, " +
                  "rgba(77,232,224,0.06) 40%, " +
                  "rgba(255,255,255,0.08) 50%, " +
                  "rgba(77,232,224,0.06) 60%, " +
                  "transparent)",
                zIndex: 4,
              }}
            />
          )}

          {/* ── Near parallax highlight (top-right) ──────────────── */}
          <motion.div
            aria-hidden="true"
            style={{
              x: isMobile || reduceEffects ? 0 : layerNearX,
              y: isMobile || reduceEffects ? 0 : layerNearY,
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(77,232,224,0.14), transparent 70%)",
              zIndex: 5,
            }}
            className="pointer-events-none"
          />
        </motion.div>

        {/* ── Orbital particles ─────────────────────────────────────── */}
        {!reduceEffects &&
          PARTICLES.map((p) => (
            <motion.span
              key={p.id}
              aria-hidden="true"
              animate={{
                opacity: [0, 1, 0.6, 0],
                scale: [0.4, 1, 0.8, 0.4],
                y: [0, -6, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
              className="pointer-events-none absolute rounded-full"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                background: p.color,
                boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
              }}
            />
          ))}

        {/* ── Digital energy lines ──────────────────────────────────── */}
        {!reduceEffects && !isMobile &&
          LINES.map((ln) => (
            <motion.div
              key={ln.id}
              aria-hidden="true"
              animate={{ opacity: [0, 0.7, 0], scaleX: [0, 1, 0] }}
              transition={{
                duration: ln.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: ln.delay,
              }}
              className="pointer-events-none absolute origin-left"
              style={{
                left: ln.x1,
                top: ln.y1,
                width: ln.len,
                height: 1.5,
                rotate: `${ln.angle}deg`,
                background: `linear-gradient(to right, transparent, ${ln.color}, transparent)`,
              }}
            />
          ))}

        {/* ── Hover ring pulse ──────────────────────────────────────── */}
        <AnimatePresence>
          {hovered && !reduceEffects && (
            <motion.div
              key="ring-pulse"
              aria-hidden="true"
              initial={{ opacity: 0.7, scale: 0.96 }}
              animate={{ opacity: 0, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="pointer-events-none absolute -inset-2 rounded-[34px]"
              style={{
                border: "1.5px solid rgba(77,232,224,0.6)",
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Corner accent dots ────────────────────────────────────── */}
        {!reduceEffects && (
          <>
            {/* Top-right corner */}
            <motion.span
              aria-hidden="true"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.7, 1.2, 0.7] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -right-2.5 top-[20%] h-2 w-2 rounded-full"
              style={{
                background: "#4de8e0",
                boxShadow: "0 0 16px rgba(77,232,224,0.95)",
              }}
            />
            {/* Left-middle corner */}
            <motion.span
              aria-hidden="true"
              animate={{ opacity: [0.7, 0.2, 0.7], y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="pointer-events-none absolute -left-2 bottom-[30%] h-1.5 w-1.5 rounded-full"
              style={{
                background: "#8b7cfa",
                boxShadow: "0 0 12px rgba(139,124,250,0.9)",
              }}
            />
            {/* Bottom-right micro dot */}
            <motion.span
              aria-hidden="true"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="pointer-events-none absolute -right-1.5 bottom-[15%] h-1 w-1 rounded-full"
              style={{
                background: "#60a5fa",
                boxShadow: "0 0 10px rgba(96,165,250,0.9)",
              }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}
