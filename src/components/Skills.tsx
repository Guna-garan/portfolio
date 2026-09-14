import { motion } from "framer-motion";
import { skills } from "@/data/content";
import SectionHeading from "./SectionHeading";

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
            className="glass group relative overflow-hidden rounded-2xl p-6 transition-shadow hover:shadow-glow"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-signal-violet/15 blur-2xl transition-opacity group-hover:opacity-80" />
            <h3 className="font-display text-lg font-semibold text-mist-bright">
              {group.category}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-mist transition-colors group-hover:border-signal-cyan/30 group-hover:text-mist-bright"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
