// components/sections/Hero.tsx
"use client";

import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BlurIn } from "./BlurIn";
import { TextFade } from "./TextFade";
import gsap from "gsap";

export default function Hero() {
  // 1) useScroll() replaces deprecated useViewportScroll
  const { scrollY } = useScroll();

  // 2) Parallax effect: map scrollY [0 → 300px] to yOffset [0 → -50px]
  const yOffset = useTransform(scrollY, [0, 800], [0, -120]);

  useEffect(() => {
    // GSAP Button class (copied/adjusted from your snippet)
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
        this.DOM = {
          button: this.block,
          flair: el(".button__flair")[0] as HTMLElement,
        };
        this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
        this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
      }

      getXY(e: MouseEvent) {
        const { left, top, width, height } = this.DOM.button.getBoundingClientRect();

        const xTransformer = gsap.utils.pipe(
          gsap.utils.mapRange(0, width, 0, 100),
          gsap.utils.clamp(0, 100)
        );

        const yTransformer = gsap.utils.pipe(
          gsap.utils.mapRange(0, height, 0, 100),
          gsap.utils.clamp(0, 100)
        );

        return {
          x: xTransformer(e.clientX - left),
          y: yTransformer(e.clientY - top),
        };
      }

      initEvents() {
        this.DOM.button.addEventListener("mouseenter", (e) => {
          const { x, y } = this.getXY(e as MouseEvent);
          this.xSet(x);
          this.ySet(y);
          gsap.to(this.DOM.flair, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        this.DOM.button.addEventListener("mouseleave", (e) => {
          const { x, y } = this.getXY(e as MouseEvent);
          gsap.killTweensOf(this.DOM.flair);
          gsap.to(this.DOM.flair, {
            xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
            yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
            scale: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        this.DOM.button.addEventListener("mousemove", (e) => {
          const { x, y } = this.getXY(e as MouseEvent);
          gsap.to(this.DOM.flair, {
            xPercent: x,
            yPercent: y,
            duration: 0.4,
            ease: "power2",
          });
        });
      }
    }

    // Instantiate Button for each element with data-block="button"
    document.querySelectorAll<HTMLElement>('[data-block="button"]').forEach((el) => {
      new Button(el);
    });
  }, []);

  return (
    <>
      <motion.section 
        id="Home"
        style={{ y: yOffset }}
        className={`
          relative
          w-11/12
          mx-auto
          h-[85vh]
          rounded-3xl
          overflow-hidden
          bg-[#f5f5f7]
        `}
      >
        {/* Background video covering entire section */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/bgvid.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Overlayed name at 10% from top: */}
        <div className="absolute top-[10%] left-0 right-0 px-[1cm] text-[#FCF5E5]">
          <BlurIn>RISHI&nbsp;GANJI</BlurIn>
        </div>

        {/*
          Below the name, at 35% from top, split the remaining area into two halves:
          - Left: intro + Education 
          - Right: About Me + Download button
        */}
        <div
          className={`
            absolute
            top-[35%]
            left-0
            right-0
            bottom-0
            px-[1cm]
          `}
        >
          <div className="flex h-full space-x-8">
            {/* LEFT HALF */}
            <div className="w-1/2 overflow-y-auto pr-4">
              {/* 1) Intro paragraph with fade-up */}
              <TextFade direction="up" className="mb-6">
                <p className="text-2xl text-blue-200 leading-relaxed font-michroma italic">
                  I’m a software engineer driven by a passion for turning ideas into clean,
                  intuitive digital experiences.
                </p>
              </TextFade>

              {/* 2) Education block with fade-up */}
              <TextFade direction="up" staggerChildren={0.15} className="mt-6">
                <h2 className="text-3xl font-semibold text-gray-300 mb-4 font-michroma">
                  Education
                </h2>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white font-michroma">
                    Master of Science in Computer Science
                  </h3>
                  <p className="text-white font-michroma">
                    California State University, Chico | Aug 2023 – May 2025 | CGPA: 3.9
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white font-michroma">
                    Bachelor of Technology in Computer Science
                  </h3>
                  <p className="text-white font-michroma">
                    Anurag Group of Institutions | Aug 2019 – May 2023 | CGPA: 8.44
                  </p>
                </div>
              </TextFade>
            </div>

            {/* RIGHT HALF */}
            <div className="w-1/2 relative overflow-y-auto pl-4">
              {/* 3) About Me block with fade-up */}
              <TextFade direction="up" staggerChildren={0.15} className="mb-8">
                <h2 className="text-3xl font-semibold text-gray-300 mb-4 font-michroma">
                  About Me
                </h2>
                <p className="text-lg text-white leading-relaxed font-michroma text-justify">
                  I am a passionate Software Engineer with a knack for building full‐stack web
                  applications using modern technologies like Next.js and Tailwind CSS. My journey
                  in tech began with a curiosity for solving real‐world problems through innovative
                  solutions, which evolved into a love for crafting user‐centric digital experiences.
                  Beyond coding, I thrive in collaborative environments and enjoy tackling
                  challenging problems with creative solutions. I aim to contribute to impactful
                  projects that make a difference in users’ lives.
                </p>
              </TextFade>

              {/* Download Resume button at the bottom right of this half */}
              <div className="absolute bottom-9 right-1">
                <a
                  href="/Resume-Rishi.pdf"
                  download
                  data-block="button"
                  className={`
                    button
                    button--stroke
                    inline-flex
                    items-center
                    justify-center
                    bg-transparent
                    border-none
                    rounded-full
                    text-blue-500
                    font-semibold
                    overflow-hidden
                    relative
                    px-6
                    py-2
                    transition-colors
                    duration-200
                  `}
                >
                  {/* flair circle (z-index: 0) */}
                  <span className="button__flair z-0"></span>

                  {/* label and icon get z-index: 10 so they sit above the flair */}
                  <span className="button__label relative z-10">Download Resume</span>
                  <svg
                    className="w-6 h-6 text-current relative z-10 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Global CSS required for the GSAP “flair” button */}
      <style jsx global>{`
        /* Base body styles for full-height centering (optional) */
        body {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        /* BUTTON STYLES (blue variant) */
        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: transparent;
          border: none;
          border-radius: 6.25rem; /* 100px if base font is 16px */
          color: #FCF5E5; /* Tailwind’s blue-500 */
          font-size: 1.2rem;
          font-weight: 600;
          gap: 0.363636em;
          letter-spacing: -0.01em;
          line-height: 1.04545;
          overflow: hidden;
          padding: 0.9375rem 1.5rem; /* ~15px 24px */
          cursor: pointer;
          text-decoration: none;
          word-break: break-word;
        }

        /* On hover, change label (and icon) color to black */
        @media (hover: hover) {
          .button.button--stroke:hover {
            color: #000000;
            text-decoration: none;
          }
        }

        /* Make the SVG icon black when hovering over the button */
        .button.button--stroke:hover svg {
          color: #000000;
        }

        /* Outline stroke in #FCF5E5 (light cream) */
        .button.button--stroke::after {
          content: "";
          position: absolute;
          inset: 0;
          border: 0.125rem solid #FCF5E5;
          border-radius: 6.25rem;
          pointer-events: none;
        }

        /* Flair (circle) base state, z-index: 0 */
        .button__flair {
          position: absolute;
          inset: 0; /* top:0; right:0; bottom:0; left:0; */
          transform: scale(0);
          transform-origin: 0 0;
          will-change: transform;
          pointer-events: none;
          z-index: 0; /* keep it underneath */
        }

        .button__flair::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 170%;
          aspect-ratio: 1/1;
          background-color: #FCF5E5; /* light cream */
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
        }

        /* Label transition (z-index:10) */
        .button__label {
          position: relative;
          z-index: 10;
          text-align: center;
          transition: color 50ms cubic-bezier(0.77, 0, 0.175, 1);
        }
      `}</style>
    </>
  );
}
