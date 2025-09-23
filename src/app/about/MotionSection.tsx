"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  variant?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "zoomIn";
  duration?: number;
  delay?: number;
}

const variantsMap = {
  fadeInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  },
  zoomIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
};

export default function MotionSection({
  children,
  className,
  variant = "fadeInUp",
  duration = 0.8,
  delay = 0,
}: MotionSectionProps) {
  const selected = variantsMap[variant];

  return (
    <motion.section
      className={className}
      initial={selected.initial}
      animate={selected.animate}
      transition={{ duration, delay }}
    >
      {children}
    </motion.section>
  );
}
