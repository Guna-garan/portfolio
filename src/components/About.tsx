import { motion } from "framer-motion";
import { stats } from "@/data/content";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <SectionHeading
        kicker="ABOUT"
        title="Engineering with intent"
        description="I concentrate on creating software that acts consistently at scale and AI systems that effectively address a specific, real-world issue; these are tools that people genuinely use, not demonstrations.."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            className="glass relative overflow-hidden rounded-2xl border border-white/10 p-6"
          >
            <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-signal-cyan/70 to-transparent" />
            <p className="font-display text-2xl font-semibold tracking-[-0.04em] text-signal-cyan sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-mist/80">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass relative mt-6 overflow-hidden rounded-[28px] border border-white/10 p-4 sm:p-6 lg:p-8"
      >
        <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-signal-cyan/10 blur-3xl" />
        <div className="absolute -right-10 bottom-4 h-32 w-32 rounded-full bg-signal-violet/10 blur-3xl" />

        <p className="relative w-full text-base leading-relaxed tracking-[-0.01em] text-mist sm:text-lg sm:leading-8">
          I work at the junction of applied machine learning and reliable backend architecture. I've created real-time physical inventory management systems, an e-commerce platform using raw HTML and JavaScript, a resume screener that evaluates applicants in the same manner as a recruiter, and a generative model that produces readable human handwriting. I learned the same thing from every project: making the entire system feel straightforward is usually more interesting than the algorithm itself.
        </p>
      </motion.div>
    </section>
  );
}
