import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = usePrefersReducedMotion();

  const initial = reduced
    ? { opacity: 1 }
    : { opacity: 0, ...(direction === "up" ? { y: 24 } : {}) };
  const animate = reduced ? { opacity: 1 } : inView ? { opacity: 1, y: 0 } : {};

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.7, delay: reduced ? 0 : delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
