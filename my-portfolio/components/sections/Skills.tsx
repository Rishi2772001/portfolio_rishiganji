// components/Skills.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { motion } from "framer-motion";
import { EASE } from "@/lib/easing";

gsap.registerPlugin(ScrollTrigger, Observer);

/* ------------------------------------------------------------------ */
/* 1 . Data                                                            */
/* ------------------------------------------------------------------ */
type Section = { heading: string; items: string[] };
type Card    = { title: string; sections: Section[] };

const skillCards: Card[] = [
  {
    title: "Languages & Tools",
    sections: [
      {
        heading: "Programming Languages",
        items: ["Python", "TypeScript", "JavaScript", "Dart", "C++", "Java", "PHP", "C", "HTML", "CSS"],
      },
      { heading: "Databases & Storage", items: ["MongoDB", "MySQL", "Redis", "Firebase"] },
      {
        heading: "Mobile / Deployment Tooling",
        items: ["Flutter", "Android & iOS", "ASGI (Async)", "Real‑time messaging"],
      },
    ],
  },
  {
    title: "Frameworks & Libraries",
    sections: [
      { heading: "Frontend",             items: ["React (+ Next)", "Bootstrap"] },
      { heading: "Backend / Full‑stack", items: ["Node.js", "Express", "FastAPI", "Django", "PHP / CI"] },
      { heading: "API",                  items: ["GraphQL", "REST", "WebSockets", "AJAX"] },
    ],
  },
  {
    title: "Testing & Quality",
    sections: [
      { heading: "Runners",       items: ["Cypress", "Supertest", "PyTest"] },
      { heading: "Methodologies", items: ["Unit", "Integration", "E2E", "Load"] },
    ],
  },
  {
    title: "Core CS Concepts",
    sections: [
      { heading: "Algorithms & DS", items: ["DSA fundamentals"] },
      {
        heading: "Systems",
        items: ["SQL & NoSQL", "OS", "System design", "Async", "OOP"],
      },
    ],
  },
  {
    title: "Soft Skills",
    sections: [
      { heading: "Collaboration", items: ["Communication", "Teamwork", "Accountability"] },
      { heading: "Personal",      items: ["Time Mgmt", "Detail‑oriented", "Growth Mindset"] },
    ],
  },
];

/* one gradient per card */
const cardGradients = [
  "linear-gradient(45deg,#bfe7ff 0%,#a5d6ff 50%,#d9c7ff 100%)",
  "linear-gradient(45deg,#FEE140 0%,#FA709A 100%)",
  "linear-gradient(45deg,#ff9a9e 0%,#fecfef 100%)",
  "linear-gradient(90deg,#fad0c4 0%,#ffd1ff 50%,#a1ffce 100%)",
  "linear-gradient(45deg,#654ea3 0%,#eaafc8 50%,#f9d423 100%)",
];

/* ------------------------------------------------------------------ */
/* 2 . Component                                                       */
/* ------------------------------------------------------------------ */
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const navOffset = (() => {
     if (typeof window === 'undefined') return 0;
     const header = document.querySelector<HTMLElement>('header');
     return header ? header.offsetHeight + 16 : 96;   // fallback 96 px
   })();
   
   
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    let slowScroll: Observer | null = null;

    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current!;
      const listItems = gsap.utils.toArray<HTMLLIElement>(".skills-list li");
      const slides    = gsap.utils.toArray<HTMLDivElement>(".skills-slide");
      const n         = listItems.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: `top+=${navOffset} top`,
          end:   () => `+=${(n - 1) * 60}vh`,
          pin: true,
          pinSpacing: false,
          scrub: 1,
        },
      });

      slides.forEach(s => gsap.set(s, { autoAlpha: 0, y: 30 }));
      gsap.set(slides[0], { autoAlpha: 1, y: 0 });
      gsap.set(listItems[0], { color: "#000" });

      listItems.forEach((item, i) => {
        if (i === 0) return;
        tl.set(item,           { color: "#000"    }, i)
          .to(slides[i],       { autoAlpha: 1, y: 0,  duration: 0.35, ease: "power2.out" }, i)
          .set(listItems[i-1], { color: "#008080" }, i)
          .to(slides[i-1],     { autoAlpha: 0, y: -30, duration: 0.35, ease: "power2.in"  }, i);
      });

      ScrollTrigger.create({
        trigger: sectionEl,
        start:  "top top",
        end:    "bottom center+=15%",
        onEnter() {
          slowScroll = Observer.create({
            target: window,
            type: "wheel,touch",
            preventDefault: true,
            onChange(self) { window.scrollBy(0, self.deltaY * 0.1); },
          });
        },
        onLeave()     { slowScroll?.kill(); slowScroll = null; },
        onLeaveBack() { slowScroll?.kill(); slowScroll = null; },
      });
    }, sectionRef);

    return () => { slowScroll?.kill(); ctx.revert(); };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-section relative z-[10] w-full min-h-screen rounded-2xl bg-[#ffffff]"
      style={{ scrollMarginTop: navOffset, paddingTop: navOffset }}
    >
      {/* header */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 w-full text-center font-krona-one
                     text-6xl sm:text-8xl lg:text-9xl"
        >
          SKILLS
        </motion.h2>
      </div>

      {/* layout: stack on mobile, columns on sm+ */}
      <div className="mx-auto flex flex-col sm:flex-row max-w-7xl px-6 pb-10">
        {/* list */}
        <div className="relative flex w-full sm:w-1/3 flex-col">
          <div className="skills-fill absolute left-0 top-0 h-full w-1 bg-teal-600" />
          <ul className="skills-list ml-4 flex flex-col gap-6 sm:gap-8 font-michroma">
            {skillCards.map(card => (
              <li key={card.title} className="text-xl sm:text-2xl font-semibold text-[#008080]">
                {card.title}
              </li>
            ))}
          </ul>
        </div>

        {/* slides */}
        <div className="relative flex flex-1 mt-8 sm:mt-0 ml-0 sm:ml-8">
          {skillCards.map((card, idx) => {
            const cols =
              card.sections.length === 1
                ? "md:grid-cols-1 justify-center"
                : card.sections.length === 2
                ? "md:grid-cols-2 justify-center"
                : "md:grid-cols-3";

            return (
              <div
                key={card.title}
                style={{ background: cardGradients[idx] }}
                className={`skills-slide absolute inset-0 grid grid-cols-1 ${cols}
                            gap-4 sm:gap-8 rounded-xl
                            p-4 sm:p-8
                            min-h-[180px] max-h-[180px] overflow-y-auto   /* 📱 scrollable on phones */
                            sm:min-h-fit sm:max-h-none sm:overflow-visible
                            shadow-lg`}
              >
                {card.sections.map(sec => (
                  <div key={sec.heading || card.title}>
                    {sec.heading && (
                      <h4 className="mb-1 sm:mb-2 text-sm sm:text-lg font-semibold text-gray-700 font-michroma">
                        {sec.heading}
                      </h4>
                    )}
                    <ul className="list-none space-y-0.5 sm:space-y-1 text-[10px] sm:text-base text-gray-800 font-michroma">
                      {sec.items.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
