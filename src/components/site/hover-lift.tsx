"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function HoverLift({ children }: { children: ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 240, damping: 18, mass: 0.45 }}
    >
      {children}
    </motion.div>
  );
}
