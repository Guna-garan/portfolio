import { motion } from "framer-motion";
import {
  BrainCircuit,
  Braces,
  Code2,
  Container,
  Cpu,
  Database,
  FileCode2,
  GitBranch,
  Globe,
  Layers3,
  Palette,
  Server,
  Sparkles,
  TerminalSquare,
  Waypoints,
} from "lucide-react";
import { skills } from "@/data/content";
import SectionHeading from "./SectionHeading";

const skillIcons: Record<string, React.ComponentType<any>> = {
  React: Code2,
  "Next.js": Layers3,
  "TypeScript": FileCode2,
  "Tailwind CSS": Palette,
  "JavaScript": Braces,
  "Spring Boot": Server,
  Java: TerminalSquare,
  "Node.js": Globe,
  "REST APIs": Waypoints,
  Python: Cpu,
  "Machine Learning": BrainCircuit,
  NLP: Sparkles,
  TensorFlow: WorkflowIcon,
  "PyTorch": Cpu,
  "Deep Learning": BrainCircuit,
  MySQL: Database,
  MongoDB: Database,
  Git: GitBranch,
  Docker: Container,
  Postman: Waypoints,
};

function WorkflowIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={14}
      height={14}
      {...props}
    >
      <path d="M4 6h6v4H4zM14 6h6v4h-6zM4 14h6v4H4zM14 14h6v4h-6z" />
      <path d="M10 8h4M10 16h4M8 10v4M16 10v4" />
    </svg>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <SectionHeading
        kicker="SKILLS"
        title="The stack behind the systems"
        description="A working toolkit spanning interfaces, services, and the models that sit between them."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {skills.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="glass group relative overflow-hidden rounded-2xl p-5 transition-shadow hover:shadow-glow sm:p-6"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-signal-violet/15 blur-2xl transition-opacity group-hover:opacity-80" />
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-signal-cyan/20 bg-signal-cyan/5 text-signal-cyan">
                {group.category === "Frontend" && <Code2 size={14} />}
                {group.category === "Backend" && <Server size={14} />}
                {group.category === "AI / ML" && <BrainCircuit size={14} />}
                {group.category === "Data & Tools" && <Database size={14} />}
              </div>
              <h3 className="font-display text-lg font-semibold text-mist-bright">
                {group.category}
              </h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {group.items.map((item) => {
                const Icon = skillIcons[item] ?? Code2;

                return (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-2.5 py-1.5 text-[11px] font-medium text-mist transition-colors group-hover:border-signal-cyan/30 group-hover:text-mist-bright sm:text-xs"
                  >
                    <Icon size={14} className="shrink-0" />
                    <span>{item}</span>
                  </span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
