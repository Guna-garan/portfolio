import { motion } from "framer-motion";
import { experience } from "@/data/content";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-4xl px-6 py-28 sm:px-10">
      <SectionHeading
        kicker="EXPERIENCE"
        title="How I got here"
        description="A short, focused path — building real projects while learning the fundamentals underneath them."
      />

      <div className="relative mt-16">
        <div className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-signal-cyan via-signal-violet/60 to-transparent sm:left-[9px]" />

        <div className="space-y-12">
          {experience.map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="relative pl-8 sm:pl-10"
            >
              <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-signal-cyan bg-void shadow-glow" />
              <p className="font-mono text-xs text-signal-cyan">{item.period}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-mist-bright">
                {item.role}
              </h3>
              <p className="mt-1 text-sm text-mist">{item.org}</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
