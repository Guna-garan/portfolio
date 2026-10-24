import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { certifications } from "@/data/content";
import SectionHeading from "./SectionHeading";

export default function Certifications() {
  return (
    <section id="certifications" className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <SectionHeading kicker="CERTIFICATIONS" title="Credentials" />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-6 transition-shadow hover:shadow-glow"
          >
            <Award className="text-signal-violet" size={22} />
            <h3 className="mt-4 font-display text-base font-semibold text-mist-bright">
              {cert.title}
            </h3>
            <p className="mt-1 text-sm text-mist">{cert.issuer}</p>
            <p className="mt-3 font-mono text-xs text-mist">{cert.year}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
