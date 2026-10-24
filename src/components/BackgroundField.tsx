import { useEffect, useMemo, useRef } from "react";
import { useDeviceCapability } from "@/lib/use-device";

/**
 * Ultra-premium abstract background: deep obsidian center kept clean for
 * content, with luminous energy ribbons, a sparse node network, holographic
 * grid, and translucent glass shapes concentrated toward the corners and
 * edges — a frame, not a distraction.
 */
export default function BackgroundField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const { isTouch } = useDeviceCapability();

  useEffect(() => {
    if (isTouch) return;

    let frame = 0;
    function handleMove(e: PointerEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        fieldRef.current?.style.setProperty("--px", `${(e.clientX / window.innerWidth) * 100}%`);
        fieldRef.current?.style.setProperty("--py", `${(e.clientY / window.innerHeight) * 100}%`);
      });
    }
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, [isTouch]);

  // Sparse, edge-biased ambient particles — deliberately few and faint,
  // "microscopic" rather than decorative.
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        // Bias placement toward the outer 30% ring, away from the center.
        const edgeBias = i % 4;
        const pos =
          edgeBias === 0
            ? { left: `${(i * 13) % 22}%`, top: `${(i * 29) % 100}%` } // left edge
            : edgeBias === 1
            ? { left: `${78 + ((i * 13) % 22)}%`, top: `${(i * 31) % 100}%` } // right edge
            : edgeBias === 2
            ? { left: `${(i * 17) % 100}%`, top: `${(i * 11) % 20}%` } // top edge
            : { left: `${(i * 19) % 100}%`, top: `${80 + ((i * 11) % 20)}%` }; // bottom edge
        return {
          id: i,
          ...pos,
          size: 1 + ((i * 7) % 2),
          delay: `${(i % 9) * 0.6}s`,
          duration: `${6 + (i % 6)}s`,
        };
      }),
    []
  );

  return (
    <div
      ref={fieldRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void"
      style={{ ["--px" as string]: "50%", ["--py" as string]: "20%" }}
    >
      {/* obsidian base with a faint midnight-blue atmospheric wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(140% 100% at 50% 0%, #0B1024 0%, #05070C 55%, #05070C 100%)",
        }}
      />

      {/* holographic grid — masked out of the center, only visible near the edges */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,182,214,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(167,182,214,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 55% 48% at 50% 46%, transparent 0%, transparent 55%, black 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 55% 48% at 50% 46%, transparent 0%, transparent 55%, black 100%)",
        }}
      />

      {/* corner concentrations of light — the strongest color lives here */}
      <div className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-signal-blue/20 blur-[140px] animate-drift" />
      <div className="absolute -right-32 -top-48 h-[500px] w-[500px] rounded-full bg-signal-cyan/18 blur-[130px] animate-drift-reverse [animation-delay:2s]" />
      <div className="absolute -bottom-48 -left-32 h-[540px] w-[540px] rounded-full bg-signal-violet/18 blur-[140px] animate-drift-reverse [animation-delay:5s]" />
      <div className="absolute -bottom-40 -right-40 h-[560px] w-[560px] rounded-full bg-signal-magenta/14 blur-[150px] animate-drift [animation-delay:8s]" />

      {/* flowing energy ribbons framing the edges */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="ribbon-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4F7CFF" stopOpacity="0" />
            <stop offset="35%" stopColor="#4DE8E0" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#8B7CFA" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#C15FE8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ribbon-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C15FE8" stopOpacity="0" />
            <stop offset="40%" stopColor="#8B7CFA" stopOpacity="0.4" />
            <stop offset="75%" stopColor="#4DE8E0" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4F7CFF" stopOpacity="0" />
          </linearGradient>
          <filter id="ribbon-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* top-left to left-edge ribbon */}
        <path
          d="M -50 120 C 180 40, 320 180, 260 340 S 40 520, -60 560"
          stroke="url(#ribbon-a)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="14 22"
          filter="url(#ribbon-blur)"
          className="animate-ribbon-flow"
        />
        {/* top edge ribbon */}
        <path
          d="M 200 -40 C 480 90, 760 -30, 1040 70 S 1420 30, 1650 -30"
          stroke="url(#ribbon-a)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="12 26"
          filter="url(#ribbon-blur)"
          className="animate-ribbon-flow"
          style={{ animationDelay: "1.5s" }}
        />
        {/* right edge ribbon */}
        <path
          d="M 1660 140 C 1460 260, 1560 420, 1420 540 S 1560 760, 1660 820"
          stroke="url(#ribbon-b)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="14 24"
          filter="url(#ribbon-blur)"
          className="animate-ribbon-flow"
          style={{ animationDelay: "3s" }}
        />
        {/* bottom edge ribbon */}
        <path
          d="M -60 820 C 260 900, 560 800, 880 880 S 1360 940, 1660 860"
          stroke="url(#ribbon-b)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="12 24"
          filter="url(#ribbon-blur)"
          className="animate-ribbon-flow"
          style={{ animationDelay: "4.5s" }}
        />
      </svg>

      {/* sparse node network — a few glowing points linked by hairline threads, corners only */}
      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="#4DE8E0" strokeOpacity="0.18" strokeWidth="1">
          <line x1="60" y1="90" x2="220" y2="60" />
          <line x1="220" y1="60" x2="180" y2="220" />
          <line x1="60" y1="90" x2="180" y2="220" />
          <line x1="1400" y1="80" x2="1540" y2="150" />
          <line x1="1540" y1="150" x2="1460" y2="270" />
          <line x1="1400" y1="80" x2="1460" y2="270" />
          <line x1="90" y1="700" x2="220" y2="800" />
          <line x1="220" y1="800" x2="120" y2="850" />
          <line x1="1420" y1="720" x2="1520" y2="810" />
          <line x1="1520" y1="810" x2="1380" y2="840" />
        </g>
        <g fill="#4DE8E0">
          <circle cx="60" cy="90" r="2.5" opacity="0.7" />
          <circle cx="220" cy="60" r="2" opacity="0.55" />
          <circle cx="180" cy="220" r="2" opacity="0.5" />
          <circle cx="1400" cy="80" r="2.5" opacity="0.6" />
          <circle cx="1540" cy="150" r="2" opacity="0.5" />
          <circle cx="1460" cy="270" r="2" opacity="0.45" />
          <circle cx="90" cy="700" r="2.5" opacity="0.6" />
          <circle cx="220" cy="800" r="2" opacity="0.5" />
          <circle cx="120" cy="850" r="2" opacity="0.4" />
          <circle cx="1420" cy="720" r="2.5" opacity="0.6" />
          <circle cx="1520" cy="810" r="2" opacity="0.5" />
          <circle cx="1380" cy="840" r="2" opacity="0.4" />
        </g>
      </svg>

      {/* translucent glass shapes, floating at varying depth toward the outer field */}
      <div
        className="absolute left-[6%] top-[14%] h-28 w-28 rounded-[32%] border border-white/10 bg-white/[0.03] shadow-[0_0_60px_-10px_rgba(77,232,224,0.25)] backdrop-blur-sm animate-float-glass"
        style={{ transform: "rotate(12deg)" }}
      />
      <div
        className="absolute right-[9%] top-[22%] h-16 w-16 rounded-full border border-white/10 bg-white/[0.025] shadow-[0_0_50px_-12px_rgba(139,124,250,0.3)] backdrop-blur-sm animate-float-glass opacity-70 blur-[1px]"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute bottom-[16%] left-[11%] h-20 w-20 rounded-[28%] border border-white/10 bg-white/[0.03] shadow-[0_0_55px_-10px_rgba(193,95,232,0.25)] backdrop-blur-sm animate-float-glass opacity-80"
        style={{ animationDelay: "6s", transform: "rotate(-8deg)" }}
      />
      <div
        className="absolute bottom-[10%] right-[7%] h-24 w-24 rounded-[40%] border border-white/10 bg-white/[0.025] shadow-[0_0_60px_-10px_rgba(79,124,255,0.28)] backdrop-blur-sm animate-float-glass opacity-60 blur-[1.5px]"
        style={{ animationDelay: "1.5s" }}
      />

      {/* faint tiny fragments of light, biased to the outer 30% ring */}
      {!isTouch &&
        particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-mist-bright/70 animate-float"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              opacity: 0.35,
            }}
          />
        ))}

      {/* cursor-reactive light — subtle, desktop only */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(500px circle at var(--px) var(--py), rgba(77,232,224,0.05), transparent 60%)",
        }}
      />

      {/* the keep-it-clean pass: a strong dark core so content always reads clearly,
          with light only ever reaching in from the outer edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 46%, #05070C 0%, rgba(5,7,12,0.85) 45%, transparent 78%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 220px 60px rgba(5,7,12,0.55)",
        }}
      />
    </div>
  );
}
