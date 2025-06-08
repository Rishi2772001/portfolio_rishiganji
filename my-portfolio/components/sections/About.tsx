'use client';
import { motion } from 'framer-motion';
import { EASE } from '@/lib/easing';

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-32">
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }}
        viewport={{ once: true, amount: 0.4 }}
        className="mb-8 font-heading text-3xl"
      >
        About Me
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.1 } }}
        viewport={{ once: true, amount: 0.4 }}
        className="space-y-4 text-lg text-neutral-300"
      >
        I am a passionate Software Engineer with a knack for building full-stack web applications using modern technologies like Next.js and Tailwind CSS.
      </motion.p>
    </section>
  );
}
