// components/Experience.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { EASE } from "@/lib/easing";
import { cn } from "@/lib/utils";
import { MultilayerCardV_2 } from "./MultilayerCard";

gsap.registerPlugin(ScrollTrigger);

const FADE_UP = 50;

/* -------------------- data -------------------- */
const experiences = [
  {
    title: "Full Stack Web Developer",
    subtitle: "Shape-AI | June 2021 – May 2023",
    bullets: [
      "Delivered production-ready features, built APIs, and integrated payment gateways.",
      "Automated scholarship awards, saving ops 80+ hours per month.",
      "Implemented auth & testing, mentored interns — boosting velocity and cutting bugs 30 %.",
    ],
  },
  {
    title: "Instructor, Web Development",
    subtitle: "Anurag Group of Institutions | May 2021 – May 2022",
    bullets: [
      "Led front-end classes covering HTML, CSS, JavaScript, and security fundamentals.",
      "Created course material focused on software‑engineering principles & architecture.",
      "Evaluated student projects for quality and reliability in a collaborative environment.",
    ],
  },
];

/* ------------------ component ----------------- */
export default function Experience() {
  const expRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!expRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card, i) => {
        const fromX = i % 2 === 0 ? -120 : 120;
        gsap.from(card, {
          x: fromX,
          y: FADE_UP,
          autoAlpha: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end:   "top 65%",
            scrub: true,
          },
        });
      });
    }, expRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={expRef} id="experience" className="relative w-full bg-[#f5f5f7]">
      <div className="mx-auto max-w-5xl px-6 pt-80 pb-20 overflow-x-hidden sm:overflow-visible">
        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 text-center font-krona-one whitespace-nowrap text-5xl sm:text-7xl lg:text-9xl"   
        >
          Experience
        </motion.h2>

        {/* cards */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {experiences.map((exp) => (
            <div key={exp.title} className="w-full">
              <MultilayerCardV_2>
                <CardBody
                  /* remove h-full so height hugs content */
                  className="exp-card px-4 py-5 sm:px-6 sm:py-6"
                  title={exp.title}
                  subtitle={exp.subtitle}
                  bullets={exp.bullets}
                />
              </MultilayerCardV_2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- inner content ---------------- */
type CardBodyProps = { className?: string; title: string; subtitle: string; bullets: string[] };

function CardBody({ className, title, subtitle, bullets }: CardBodyProps) {
  return (
    <div className={cn(className, 'text-gray-100')}>
      <h3 className="mb-1 font-michroma text-lg sm:text-xl font-bold">{title}</h3>
      <p  className="mb-3 font-michroma text-xs sm:text-sm font-medium opacity-70">{subtitle}</p>
      <ul className="list-disc space-y-1 sm:space-y-2 pl-4 font-michroma text-xs sm:text-sm leading-snug">
        {bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
    </div>
  );
}