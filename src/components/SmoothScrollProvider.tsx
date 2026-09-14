import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useDeviceCapability } from "@/lib/use-device";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const { isTouch, prefersReducedMotion } = useDeviceCapability();

  useEffect(() => {
    // Native scrolling on phones and for reduced-motion users keeps things
    // fast and avoids fighting the OS's own momentum scrolling.
    if (isTouch || prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [isTouch, prefersReducedMotion]);

  return <>{children}</>;
}
