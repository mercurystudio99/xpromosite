"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollAnimationProps {
  children: React.ReactNode;
  scaleRange?: [number, number];
  opacityRange?: [number, number];
  offset?: [string, string];
  className?: string;
  style?: React.CSSProperties;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  scaleRange = [0.8, 1],
  opacityRange = [0.6, 1],
  className,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const scalProgress = useTransform(scrollYProgress, [0, 1], scaleRange);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], opacityRange);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        scale: scalProgress,
        opacity: opacityProgress,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
