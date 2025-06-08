// components/sections/Projects.tsx
'use client';

import { useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
gsap.registerPlugin(ScrollTrigger);

/* ─────────────  SCOPED STYLES  ───────────── */
const Section = styled.section`
  background: #f5f5f7;
  color: #ddd;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 300;
  /* Allow vertical scrolling for footer; hide only horizontal overflow */
  overflow-x: hidden;
  overflow-y: visible;

  /* ─▷ BREAK OUT OF ANY PARENT CONTAINER ◁─ */
  position: relative;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;

  /* …… horizontal slider …… */
  .container {
    display: flex;
    flex-wrap: nowrap;
    height: 100vh;
    align-items: center; /* vertically center so top/bottom gap shows */
  }

  .panel {
    /* Every panel is exactly 100vw × 100vh */
    flex: 0 0 100vw;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;  /* center .panel-inner horizontally */
    align-items: center;      /* center .panel-inner vertically */
  }

  /* ─────────────  PANEL‐INNER (90vw×90vh “content box”) ───────────── */
  .panel-inner {
    width: 90vw;
    height: 90vh;
    border-radius: 24px;      /* rounder corners */
    overflow: hidden;         /* clip the blurred background to rounded corner */
    position: relative;       /* for pseudo‐element backgrounds */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #222;         /* fallback if images fail */
    opacity: 0;               /* start fully transparent; overwritten below for intro/outro */
    scale: 0.9;               /* start slightly scaled down; overwritten below for intro/outro */
  }

  /* ─────────────  BLURRED BACKGROUND FOR EACH PANEL‐INNER ───────────── */
  .panel-inner.red::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url('/prochess.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(8px);
    transform: scale(1.05);
    z-index: 0;
  }
  .panel-inner.gray::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url('/secondChance2.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(8px);
    transform: scale(1.05);
    z-index: 0;
  }
  .panel-inner.purple::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url('/recipe_recommendation.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(8px);
    transform: scale(1.05);
    z-index: 0;
  }
  .panel-inner.green::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url('/dice.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(8px);
    transform: scale(1.05);
    z-index: 0;
  }

  /* Ensure inner content sits above the blur */
  .panel-inner > * {
    position: relative;
    z-index: 1;
  }

  /* PROJECT IMAGE */
  .project-img {
    width: 60%;
    max-width: 800px;
    height: auto;
    border-radius: 14px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    margin-bottom: 32px;
    position: relative;
    z-index: 1;
  }

  /* BUTTON GROUP */
  .btn-group {
    display: flex;
    gap: 24px;
    position: relative;
    z-index: 1;
  }

  /* BUTTON STYLES (same as Hero.tsx) */
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: transparent;
    border: none;
    border-radius: 6.25rem;
    color: #FCF5E5; /* light cream */
    font-size: 1.2rem;
    font-weight: 600;
    gap: 0.363636em;
    letter-spacing: -0.01em;
    line-height: 1.04545;
    overflow: hidden;
    padding: 0.9375rem 1.5rem;
    cursor: pointer;
    text-decoration: none;
    word-break: break-word;
  }

  /* BUTTON HOVER */
  @media (hover: hover) {
    .button.button--stroke:hover {
      color: #000000;
      text-decoration: none;
    }
    .button.button--stroke:hover svg {
      color: #000000;
    }
  }

  /* BUTTON OUTLINE STROKE */
  .button.button--stroke::after {
    content: "";
    position: absolute;
    inset: 0;
    border: 0.125rem solid #FCF5E5;
    border-radius: 6.25rem;
    pointer-events: none;
  }

  /* FLAIR CIRCLE */
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
    aspect-ratio: 1/1;
    background-color: #FCF5E5;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
  }

  /* BUTTON LABEL */
  .button__label {
    position: relative;
    z-index: 10;
    text-align: center;
    transition: color 50ms cubic-bezier(0.77, 0, 0.175, 1);
  }

  /* INTRO/OUTRO SECTIONS */
  .description,
  .final {
    /* Treated as full‐screen panels but not inside .container */
    width: 100vw;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .description .panel-inner,
  .final .panel-inner {
    /* Override so that intro/outro always stay visible */
    opacity: 1 !important;
    scale: 1 !important;
    width: 100vw;
    height: 40vh; /* we'll override height for footer below */
    background: #f5f5f7;
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    box-sizing: border-box;
  }

  /* ───────────── OVERRIDE “.final.panel” AND ITS .panel-inner TO BE A FULL-WIDTH FOOTER ───────────── */
  .final.panel {
    /* no longer a 100vh panel—let it size to its content */
    height: auto;
  }

  .final .panel-inner {
    /* force the footer wrapper to span 100vw, break out of any parent container */
    width: 100vw;
    margin-left: -50vw;
    margin-right: -50vw;
    background: #ffffff;      /* white background behind the footer */
    border-radius: 0;         /* no rounded corners for footer */
    overflow: visible;
    position: relative;
    display: block;           /* the <footer> inside handles its own layout */
    padding: 0;               /* remove any panel‐inner padding */
    box-sizing: border-box;
    height: auto;             /* override 40vh so content can expand */
  }

  /* ensure the <footer> inside actually fills the full width of its parent */
  .final .panel-inner footer {
    width: 100%;
  }

  /* Header & paragraph styling inside description/final */
  .description h1,
  .final h1 {
    margin: 0 0 16px;
  }
  .description p,
  .final p {
    color: #ddd;
    margin: 0;
    text-align: center;
    max-width: 600px;
  }

  /* tiny “scroll-down” arrow */
  .scroll-down {
    margin-top: 20px;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .scroll-down .arrow {
    width: 8px;
    height: 20px;
    border: 2px solid currentColor;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-top: 4px;
  }
`;

export default function Projects() {
  const root = useRef<HTMLDivElement>(null);

  // const { scrollY } = useScroll();
  // // As scrollY goes 0 → 300px, yOffset goes 50px → 0px
  // const yOffset = useTransform(scrollY, [0, 300], [50, 0]);

  /* ──────  GSAP containerAnimation (horizontal scroll) ────── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1) Only select panels inside the `.container` (exclude intro/outro)
      const panelsInSlider = gsap.utils.toArray<HTMLElement>('.container .panel');

      // 2) Create the horizontal “pin + scrub” tween
      const scrollTween = gsap.to(panelsInSlider, {
        xPercent: -100 * (panelsInSlider.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '.container',
          pin: true,
          scrub: 0.3,
          end: () => `+=${window.innerWidth * (panelsInSlider.length - 1)}`,
        },
      });

      // 3) For each panel‐inner inside the slider, set up fade‐and‐scale tied to scrollTween
      panelsInSlider.forEach((panel) => {
        const inner = panel.querySelector<HTMLElement>('.panel-inner');
        if (!inner) return;

        // Make sure it starts invisible/scaled down (CSS already does, but reinforce here)
        gsap.set(inner, { opacity: 0, scale: 0.9 });

        // Build a timeline that fades in as the card approaches center, then fades out
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: inner,
            containerAnimation: scrollTween,
            start: 'left center',  // when left edge of inner hits viewport center
            end:   'right center', // when right edge of inner hits viewport center
            scrub: true,
          },
        });

        // first half: fade/scale up; second half: fade/scale down
        tl.fromTo(
          inner,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, ease: 'none', duration: 0.5 }
        ).to(inner, { opacity: 0, scale: 0.9, ease: 'none', duration: 0.5 });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  /* ──────  GSAP “Flair” Button Logic ────── */
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
        this.DOM = {
          button: this.block,
          flair: el('.button__flair')[0] as HTMLElement,
        };
        this.xSet = gsap.quickSetter(this.DOM.flair, 'xPercent');
        this.ySet = gsap.quickSetter(this.DOM.flair, 'yPercent');
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
        this.DOM.button.addEventListener('mouseenter', (e) => {
          const { x, y } = this.getXY(e as MouseEvent);
          this.xSet(x);
          this.ySet(y);
          gsap.to(this.DOM.flair, {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          });
        });

        this.DOM.button.addEventListener('mouseleave', (e) => {
          const { x, y } = this.getXY(e as MouseEvent);
          gsap.killTweensOf(this.DOM.flair);
          gsap.to(this.DOM.flair, {
            xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
            yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
            scale: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        this.DOM.button.addEventListener('mousemove', (e) => {
          const { x, y } = this.getXY(e as MouseEvent);
          gsap.to(this.DOM.flair, {
            xPercent: x,
            yPercent: y,
            duration: 0.4,
            ease: 'power2',
          });
        });
      }
    }

    document.querySelectorAll<HTMLElement>('[data-block="button"]').forEach((el) => {
      new Button(el);
    });
  }, []);

  /* ─────────────  MARKUP  ───────────── */
  return (
    <Section id="projects" ref={root as any} className="rounded-2xl">
      {/* … INTRO SLIDE with Framer Motion slide-up when in view … */}
      <motion.div
        className="description panel rounded-2xl"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ ease: 'easeOut', duration: 0.8 }}
      >
        <div className="panel-inner font-michroma text-zinc-800">
        
          <h1 className="text-zinc-950 font-michroma text-7xl leading-tight">
            The<br />
            <span className="font-krona-one text-9xl text-[#3C0061]">PROJECTS</span><br />
            I have been diving into…
          </h1>


        </div>
      </motion.div>

      {/* … HORIZONTAL SLIDER … */}
      <div className="container">
        {/* Panel 1 */}
        <section className="panel">
          <div className="panel-inner red">
            <h3 className="font-krona-one text-7xl relative text-[#f5f5f7] py-8">
              PROCHESS GAME
            </h3>
            <Image
              className="project-img"
              src="/prochess.jpeg"
              alt="Project One"
              width={1000}
              height={600}
            />
            <div className="btn-group">
              <a
                data-block="button"
                className="button button--stroke font-michroma"
                href="https://game.prochessgame.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="button__flair" />
                <span className="button__label">Launch Demo</span>
              </a>
              <a
                data-block="button"
                className="button button--stroke font-michroma"
                href="https://github.com/Rishi2772001/ProChessGame"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="button__flair" />
                <span className="button__label">Source Code</span>
              </a>
            </div>
          </div>
        </section>

        {/* Panel 2 */}
        <section className="panel">
          <div className="panel-inner green">
            <h3 className="font-krona-one text-7xl relative text-[#f5f5f7] py-8">
              PREDICTION GAME
            </h3>
            <Image
              className="project-img"
              src="/dice.jpeg"
              alt="Prediction Game"
              width={1000}
              height={600}
            />
            <div className="btn-group">
              <a
                data-block="button"
                className="button button--stroke font-michroma"
                href="https://project4-demo.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="button__flair" />
                <span className="button__label">Launch Demo</span>
              </a>
              <a
                data-block="button"
                className="button button--stroke font-michroma"
                href="https://github.com/you/project4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="button__flair" />
                <span className="button__label">Source Code</span>
              </a>
            </div>
          </div>
        </section>

        {/* Panel 3 */}
        <section className="panel">
          <div className="panel-inner gray">
            <h3 className="font-krona-one text-7xl relative text-[#f5f5f7] py-8">
              SECONDCHANCE MARKETPLACE
            </h3>
            <Image
              className="project-img"
              src="/secondChance2.jpeg"
              alt="Project Three"
              width={1000}
  height={600}
            />
            <div className="btn-group">
              <a
                data-block="button"
                className="button button--stroke font-michroma"
                href="https://gitlab.com/Rishi2001/final_project"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="button__flair" />
                <span className="button__label">Launch Demo</span>
              </a>
              <a
                data-block="button"
                className="button button--stroke font-michroma"
                href="https://gitlab.com/Rishi2001/final_project"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="button__flair" />
                <span className="button__label">Source Code</span>
              </a>
            </div>
          </div>
        </section>

        {/* Panel 4 */}
        <section className="panel">
          <div className="panel-inner purple">
            <h3 className="font-krona-one text-7xl relative text-[#f5f5f7] py-8">
              RECIPE RECOMMENDATION
            </h3>
            <Image
              className="project-img"
              src="/recipe_recommendation.jpeg"
              alt="Project Four"
              width={1000}
  height={600}
            />
            <div className="btn-group">
              <a
                data-block="button"
                className="button button--stroke font-michroma"
                href="https://recipe-recommendation-v1.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="button__flair" />
                <span className="button__label">Launch Demo</span>
              </a>
              <a
                data-block="button"
                className="button button--stroke font-michroma"
                href="https://github.com/Rishi2772001/Recipe_Recommendation"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="button__flair" />
                <span className="button__label">Source Code</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* … OUTRO SLIDE (now acts as a full-width footer) … */}
      <div id="contact" className="final panel">
        <div className="panel-inner">
          <footer className="bg-white dark:bg-gray-900">
            <div className="w-full">
              <div className="grid grid-cols-2 gap-8 px-10 py-6 lg:py-8 md:grid-cols-4">
                {/* Column 1: Menu */}
                <div>
                  <h2 className="mb-6 text-2xl font-semibold text-black font-michroma">
                    Menu
                  </h2>
                  <ul className="text-black font-medium space-y-4 font-michroma">
                    <li>
                      <a href="#Home" className="hover:underline">Home</a>
                    </li>
                    <li>
                      <a href="#Home" className="hover:underline">AboutMe</a>
                    </li>
                    <li>
                      <a href="#skills" className="hover:underline">Skills</a>
                    </li>
                    <li>
                      <a href="#experience" className="hover:underline">Work Experience</a>
                    </li>
                    <li>
                      <a href="#projects" className="hover:underline">Projects</a>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Socials (all as anchor tags) */}
                <div>
                  <h2 className="mb-6 text-2xl font-semibold text-black font-michroma">
                    Socials
                  </h2>
                  <ul className="text-black font-medium space-y-4 font-michroma">
                    <li className="flex items-center space-x-2">
                      <a
                        href="https://www.linkedin.com/in/rishi-ganji/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:underline"
                      >
                        <span>LinkedIn</span>
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                          />
                          <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                        </svg>
                      </a>
                    </li>
                    <li className="flex items-center space-x-2">
                      <a
                        href="https://github.com/Rishi2772001"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:underline"
                      >
                        <span>GitHub</span>
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                          />
                        </svg>
                      </a>
                    </li>
                    <li className="flex items-center space-x-2">
                      <a
                        href="https://www.instagram.com/_t.i.g.e.r_27?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:underline"
                      >
                        <span>Instagram</span>
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Get in Touch */}
                <div>
                  <h2 className="mb-6 text-2xl font-semibold text-black font-michroma">
                    Get in Touch
                  </h2>
                  <ul className="text-black font-medium space-y-4 font-michroma">
                    <li>+1(530)-715-9773</li>
                    <li>rishiganjik8@gmail.com</li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                      </svg>
                      <span>California</span>
                    </li>

                  </ul>
                </div>

                {/* Column 4: Profile Image (full width of its column) */}
                <div className="flex justify-center items-center">
                  <Image
                    src="/profile.jpeg"
                    alt="Rishi Ganji"
                    
                    width={400}
                    height={400}
                  />
                </div>
              </div>

              {/* Copyright at bottom, centered */}
              <div className="w-full text-center py-4">
                <span className="text-sm text-gray-600 font-michroma">
                  © 2025 Rishi Ganji. All Rights Reserved.
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Section>
  );
}
