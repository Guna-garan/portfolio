import { useEffect, useState } from "react";

/**
 * Detects coarse-pointer (touch/phone) devices and reduced-motion preference.
 * Used to disable desktop-only effects (custom cursor, heavy parallax)
 * on phones and for users who prefer reduced motion.
 */
export function useDeviceCapability() {
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 820px)").matches;
    setIsTouch(coarse || narrow);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handler);
    return () => motionQuery.removeEventListener("change", handler);
  }, []);

  return { isTouch, prefersReducedMotion };
}
