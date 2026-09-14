import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Project } from "@/data/content";
import { useDeviceCapability } from "@/lib/use-device";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const { isTouch } = useDeviceCapability();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  const spotlightX = useTransform(mx, (v) => `${v * 100}%`);
  const spotlightY = useTransform(my, (v) => `${v * 100}%`);
  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([sx, sy]) => `radial-gradient(280px circle at ${sx} ${sy}, rgba(77,232,224,0.12), transparent 70%)`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: "easeOut" }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: isTouch ? 0 : rotateX, rotateY: isTouch ? 0 : rotateY }}
        className="glass relative overflow-hidden rounded-2xl border border-line p-6 transition-shadow hover:shadow-glow sm:p-7"
      >
        {!isTouch && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
            style={{ background: spotlightBackground }}
          />
        )}

        <div className="relative flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold text-mist-bright">
            {project.title}
          </h3>
          <span className="font-mono text-xs text-mist">0{index + 1}</span>
        </div>

        <p className="relative mt-3 text-sm leading-relaxed text-mist">
          {project.description}
        </p>

        <div className="relative mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-signal-cyan/25 bg-signal-cyan/5 px-3 py-1 text-xs font-medium text-signal-cyan"
            >
              {tech}
            </span>
          ))}
        </div>

        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          data-cursor-hover
          className="relative mt-5 flex items-center gap-1.5 text-sm font-medium text-mist-bright hover:text-signal-cyan"
        >
          {expanded ? "Hide details" : "View details"}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative overflow-hidden"
            >
              <ul className="mt-4 space-y-2 border-t border-line pt-4">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-mist">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal-cyan" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
