import { motion } from "framer-motion";

export default function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto max-w-2xl text-center"
    >
      <p className="font-mono text-xs text-signal-cyan">{kicker}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-mist-bright sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-mist">{description}</p>
      )}
    </motion.div>
  );
}
