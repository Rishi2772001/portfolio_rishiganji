// components/StaggeredFade.tsx
"use client";

import { motion, useInView } from "framer-motion";
import * as React from "react";

type TextStaggeredFadeProps = {
  text: string;
  className?: string;
};

export const StaggeredFade: React.FC<TextStaggeredFadeProps> = ({
  text,
  className = "",
}) => {
  // Variants: each letter starts hidden and with y offset; then fades in sequentially
  const variants = {
    hidden: { opacity: 0, y: 18 },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.07 },
    }),
  };

  const letters = text.split("");
  const ref = React.useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.h2
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      // We provide a dummy variant container; actual per-letter delays come from custom
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0 } },
      }}
      viewport={{ once: true }}
      className={
        "text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem] " +
        className
      }
    >
      {letters.map((char, i) => (
        <motion.span key={`${char}-${i}`} variants={variants} custom={i}>
          {char}
        </motion.span>
      ))}
    </motion.h2>
  );
};
