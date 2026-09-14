import { motion } from "framer-motion";
import { stats } from "@/data/content";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <SectionHeading
        kicker="ABOUT"
        title="Engineering with intent"
        description="I focus on building software that behaves predictably at scale and AI systems that solve a real, narrow problem well — not demos, but tools people actually rely on."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            className="glass rounded-2xl p-6"
          >
            <p className="font-display text-2xl font-semibold text-signal-cyan sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-mist">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass mt-6 rounded-2xl p-8 sm:p-10"
      >
        <p className="max-w-3xl text-base leading-relaxed text-mist sm:text-lg">
          My work sits at the intersection of solid backend architecture and
          applied machine learning. I&apos;ve built systems that manage
          physical inventory in real time, an e-commerce experience from raw
          HTML and JavaScript, a resume screener that reasons about
          candidates the way a recruiter would, and a generative model that
          writes in believable human handwriting. Each project taught me the
          same lesson: the interesting part is rarely the algorithm — it is
          getting the whole system to feel simple.
        </p>
      </motion.div>
    </section>
  );
}
