/* ------------------------------------------------------------------
   components/sections/Hero.tsx          (headline centered on all sizes)
   ------------------------------------------------------------------ */
"use client";

import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BlurIn } from "./BlurIn";
import { TextFade } from "./TextFade";
import gsap from "gsap";

export default function Hero() {
  /* -------------------------------------------------------------- */
  /*  Parallax offset                                               */
  /* -------------------------------------------------------------- */
  const { scrollY } = useScroll();
  const yOffset     = useTransform(scrollY, [0, 800], [0, -120]);

  /* -------------------------------------------------------------- */
  /*  GSAP flair‑button logic (unchanged)                           */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    class Button {
      block: HTMLElement;
      DOM: { button: HTMLElement; flair: HTMLElement };
      xSet: gsap.QuickSetter;
      ySet: gsap.QuickSetter;
      constructor(buttonElement: HTMLElement) {
        this.block = buttonElement;
        this.init();
        this.initEvents();
      }
      init() {
        const el = gsap.utils.selector(this.block);
        this.DOM  = {
          button: this.block,
          flair : el(".button__flair")[0] as HTMLElement,
        };
        this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
        this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
      }
      getXY(e: MouseEvent) {
        const { left, top, width, height } = this.DOM.button.getBoundingClientRect();
        const map = (a:number,b:number,c:number,d:number)=>
          gsap.utils.clamp(c,d,gsap.utils.mapRange(a,b,c,d));
        return { x: map(0,width,0,100)(e.clientX-left), y: map(0,height,0,100)(e.clientY-top) };
      }
      initEvents() {
        const enter = (e: MouseEvent) => {
          const { x, y } = this.getXY(e);
          this.xSet(x); this.ySet(y);
          gsap.to(this.DOM.flair,{ scale:1, duration:0.4, ease:"power2.out" });
        };
        const leave = (e: MouseEvent) => {
          const { x, y } = this.getXY(e);
          gsap.killTweensOf(this.DOM.flair);
          gsap.to(this.DOM.flair,{ xPercent:x>90?x+20:x<10?x-20:x,
            yPercent:y>90?y+20:y<10?y-20:y, scale:0, duration:0.3, ease:"power2.out" });
        };
        const move  = (e: MouseEvent) => {
          const { x, y } = this.getXY(e);
          gsap.to(this.DOM.flair,{ xPercent:x, yPercent:y, duration:0.4, ease:"power2" });
        };
        this.DOM.button.addEventListener("mouseenter", enter);
        this.DOM.button.addEventListener("mouseleave", leave);
        this.DOM.button.addEventListener("mousemove", move);
      }
    }
    document.querySelectorAll<HTMLElement>('[data-block="button"]').forEach(el=>new Button(el));
  }, []);

  /* -------------------------------------------------------------- */
  /*  JSX                                                           */
  /* -------------------------------------------------------------- */
  return (
    <>
      <motion.section
        id="Home"
        style={{ y: yOffset }}
        className="relative self-stretch isolate w-screen sm:mx-auto sm:w-11/12 bg-[#f5f5f7] overflow-hidden rounded-none sm:rounded-3xl py-20 sm:py-28 lg:py-32"
      >
        {/* Video background */}
        <video
          className="absolute inset-0 -z-10 w-full h-full object-cover [aspect-ratio:16/9]"
          src="/bgvid.mp4" autoPlay muted loop playsInline
        />

        {/* Name –– always centered */}
        <div className="flex justify-center px-4 sm:px-6 lg:px-[1cm]">
          <BlurIn>
            {/* ⬇️ change h1 -> span to avoid h1-in-h1 */}
            <span className="font-bold tracking-wide text-center text-[#FCF5E5] [font-size:clamp(2.25rem,8vw+0.5rem,8rem)]">
              RISHI&nbsp;GANJI
            </span>
          </BlurIn>
        </div>

        {/* About + Education */}
        <div className="mt-12 flex flex-col sm:flex-row gap-y-10 sm:gap-x-8 px-4 sm:px-6 lg:px-[1cm]">
          {/* Education */}
          <div className="sm:basis-1/2 space-y-8">
            <TextFade direction="up">
              <p className="text-blue-200 italic leading-relaxed font-michroma text-[clamp(1rem,2.5vw,1.25rem)]">
                I’m a software engineer driven by a passion for turning ideas into clean, intuitive digital experiences.
              </p>
            </TextFade>
            <TextFade direction="up" staggerChildren={0.15}>
              <h2 className="text-gray-300 font-semibold font-michroma text-[clamp(1.25rem,3vw,1.75rem)] mb-4">Education</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold font-michroma text-[clamp(1rem,2.5vw,1.25rem)]">Master of Science in Computer Science</h3>
                  <p className="text-white font-michroma text-sm sm:text-base">California State University, Chico | Aug 2023 – May 2025 | CGPA: 3.9</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold font-michroma text-[clamp(1rem,2.5vw,1.25rem)]">Bachelor of Technology in Computer Science</h3>
                  <p className="text-white font-michroma text-sm sm:text-base">Anurag Group of Institutions | Aug 2019 – May 2023 | CGPA: 8.44</p>
                </div>
              </div>
            </TextFade>
          </div>

          {/* About Me */}
          <div className="sm:basis-1/2 space-y-8">
            <TextFade direction="up" staggerChildren={0.15}>
              <h2 className="text-gray-300 font-semibold font-michroma text-[clamp(1.25rem,3vw,1.75rem)] mb-4">About Me</h2>
              <p className="text-white text-justify leading-relaxed font-michroma text-[clamp(0.875rem,2.2vw,1rem)]">
                I am a passionate Software Engineer with a knack for building full‑stack web applications using modern technologies like Next.js and Tailwind CSS. My journey in tech began with a curiosity for solving real‑world problems through innovative solutions, which evolved into a love for crafting user‑centric digital experiences. Beyond coding, I thrive in collaborative environments and enjoy tackling challenging problems with creative solutions. I aim to contribute to impactful projects that make a difference in users’ lives.
              </p>
            </TextFade>
          </div>
        </div>

        {/* Centered GSAP button */}
        <div className="mt-16 flex justify-center">
          <a href="/Resume-Rishi.pdf" download data-block="button" className="button button--stroke inline-flex items-center justify-center px-6 py-2 font-michroma">
            <span className="button__flair z-0" />
            <span className="button__label relative z-10 whitespace-nowrap">Download&nbsp;Resume</span>
            <svg className="w-6 h-6 ml-2 relative z-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
            </svg>
          </a>
        </div>
      </motion.section>

      {/* -------------- GSAP flair-button global CSS -------------- */}
      <style jsx global>{`
        body {
          margin: 0;
          min-height: 100vh;
        }
        /* centre container at sm and up */
        @media (min-width: 640px) {
          body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        }

        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: transparent;
          border: none;
          border-radius: 6.25rem;
          color: #fcf5e5;
          font-size: 1.1rem;
          font-weight: 600;
          gap: 0.4em;
          letter-spacing: -0.01em;
          line-height: 1.05;
          overflow: hidden;
          padding: 0.9rem 1.5rem;
          cursor: pointer;
          text-decoration: none;
        }
        @media (hover: hover) {
          .button.button--stroke:hover {
            color: #000000;
          }
          .button.button--stroke:hover svg {
            color: #000000;
          }
        }
        .button.button--stroke::after {
          content: "";
          position: absolute;
          inset: 0;
          border: 0.125rem solid #fcf5e5;
          border-radius: 6.25rem;
          pointer-events: none;
        }
        .button__flair {
          position: absolute;
          inset: 0;
          transform: scale(0);
          transform-origin: 0 0;
          will-change: transform;
          pointer-events: none;
          z-index: 0;
        }
        .button__flair::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 170%;
          aspect-ratio: 1 / 1;
          background-color: #fcf5e5;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .button__label {
          position: relative;
          z-index: 10;
          transition: color 50ms cubic-bezier(0.77, 0, 0.175, 1);
        }
      `}</style>
    </>
  );
}
