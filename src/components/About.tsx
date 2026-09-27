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
          I work at the junction of applied machine learning and reliable backend architecture. I've created real-time physical inventory management systems, an e-commerce platform using raw HTML and JavaScript, a resume screener that evaluates applicants in the same manner as a recruiter, and a generative model that produces readable human handwriting. I learned the same thing from every project: making the entire system feel straightforward is usually more interesting than the algorithm itself.
        </p>
      </motion.div>
    </section>
  );
}
