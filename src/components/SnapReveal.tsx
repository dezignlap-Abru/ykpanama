"use client";

import { ReactNode } from "react";
import { motion, TargetAndTransition } from "framer-motion";
import { useSnapScroll } from "./SnapScrollContext";

type AnimationPreset =
  | "fadeUp"
  | "fadeBlur"
  | "scaleIn"
  | "slideLeft"
  | "slideRight"
  | "cascadeRight";

const presets: Record<
  AnimationPreset,
  { hidden: TargetAndTransition; visible: TargetAndTransition }
> = {
  fadeUp: {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 },
  },
  fadeBlur: {
    hidden: { opacity: 0, y: 40, filter: "blur(16px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -150 },
    visible: { opacity: 1, x: 0 },
  },
  cascadeRight: {
    hidden: { opacity: 0, x: -60, y: 20 },
    visible: { opacity: 1, x: 0, y: 0 },
  },
};

interface SnapRevealProps {
  children: ReactNode;
  sectionIndex: number;
  preset?: AnimationPreset;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function SnapReveal({
  children,
  sectionIndex,
  preset = "fadeUp",
  delay = 0,
  duration = 0.8,
  className = "",
}: SnapRevealProps) {
  const { activeSection } = useSnapScroll();
  const isActive = activeSection === sectionIndex;
  const { hidden, visible } = presets[preset];

  const animateTo: TargetAndTransition = isActive
    ? {
        ...visible,
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 20,
          delay,
          duration,
        },
      }
    : { ...hidden, transition: { duration: 0.3 } };

  return (
    <motion.div
      className={className}
      initial={hidden}
      animate={animateTo}
    >
      {children}
    </motion.div>
  );
}
