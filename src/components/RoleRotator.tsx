import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { roles } from "@/data/content";

export default function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-7 overflow-hidden font-mono text-sm text-signal-cyan sm:text-base">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="block"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
