import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useDeviceCapability } from "@/lib/use-device";

export default function CustomCursor() {
  const { isTouch, prefersReducedMotion } = useDeviceCapability();
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 320, mass: 0.4 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;

    document.body.classList.add("cursor-active");
    setVisible(true);

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsPointer(Boolean(target.closest("a, button, [data-cursor-hover]")));
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.classList.remove("cursor-active");
    };
  }, [isTouch, prefersReducedMotion, x, y]);

  if (!visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-screen"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{
          scale: isPointer ? 1.8 : 1,
          opacity: isPointer ? 0.9 : 0.7,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="h-6 w-6 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(77,232,224,0.9) 0%, rgba(139,124,250,0.4) 55%, transparent 75%)",
          boxShadow: "0 0 24px 6px rgba(77,232,224,0.35)",
        }}
      />
    </motion.div>
  );
}
