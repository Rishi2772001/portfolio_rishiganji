// components/sections/Projects.tsx – fine‑tune mobile spacing & wrap headings
'use client';

import { useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';
import Image from 'next/image';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────  STYLES  ──────────────────── */
const SliderSection = styled.section`
  background: #f5f5f7;
  color: #111;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 300;
  overflow-x: hidden;
  overflow-y: visible;
  position: relative;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;

  @media (max-width: 640px) {
    margin-left: 0;
    margin-right: 0;
  }

  /* slider track */
  .container {
    display: flex;
    flex-wrap: nowrap;
    height: 90vh;
    align-items: center;

    @media (max-width: 640px) {
      flex-direction: column;
      height: auto;
    }
  }

  /* individual panel */
  .panel {
    flex: 0 0 100vw;
    width: 100vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 4vw;
    box-sizing: border-box;

    @media (max-width: 640px) {
      flex: 0 0 auto;
      width: 100%;
      height: auto;
      padding: 4vh 4vw 6vh; /* extra bottom gap after buttons */
    }
  }

  /* card */
  .panel-inner {
    width: min(90vw, 1400px);
    height: min(90vh, 760px);
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #222;
    opacity: 0;
    transform: scale(.9);
    z-index: 1;

    @media (max-width: 640px) {
      width: 100%;
      height: auto;
      border-radius: 18px;
      opacity: 1;
      transform: none;
    }
  }
  .panel-inner > * { z-index: 2; }
  /* ---------- BLURRED BG UNDER EACH CARD ---------- */
.panel-inner::before {
  content: '';
  position: absolute; inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(8px);
  transform: scale(1.05);
  z-index: 0;                 /* sits beneath real content */
}

/* one rule per card so it grabs the right image */
.panel-inner.red::before    { background-image:url('/prochess.jpeg'); }
.panel-inner.green::before  { background-image:url('/dice.jpeg'); }
.panel-inner.gray::before   { background-image:url('/secondChance2.jpeg'); }
.panel-inner.purple::before { background-image:url('/recipe_recommendation.jpeg'); }

  /* ---------- intro card custom background ---------- */
.description .panel-inner {
  background: #f5f5f7;   /* soft light-grey backdrop */
  opacity:1; 
  tranform: none;
}

  /* headings */
  .panel-inner h3 {
  font-size: clamp(1.5rem, 5vw, 3rem);
  line-height: 1.15;
  text-align: center;
  word-break: break-word;
  padding: 0 0.5rem;
  margin: clamp(1rem, 3vw, 2rem) 0;  /* ⬅️ symmetric top + bottom gap */
}


  /* intro heading */
  .description h1       { font-size: clamp(2rem, 6vw, 4rem); line-height: 1.1; text-align: center; }
  .description h1 span  { font-size: clamp(3rem, 9vw, 7rem); }

  .project-img {
  display: block;
  width: 100%;           /* always fill card width */
  max-width: 600px;
  aspect-ratio: 16/9;    /* uniform height */
  height: auto;          /* let aspect-ratio control height */
  object-fit: cover;     /* crop if the source isn’t 16:9 */
  border-radius: 14px;
  box-shadow: 0 8px 30px rgba(0,0,0,.3);
  margin-bottom: clamp(1.5rem,4vw,2rem);

  @media (max-width: 640px) {
    max-width: none;     /* full width on phones */
  }
}


  .btn-group {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 1.5rem; /* gap after Source Code button */
  }
`;

/* footer wrapper unchanged */
const FooterWrapper = styled.footer`
  width: 100%;
  background: #ffffff;     /* pure-white canvas */
  color: #000;
  padding: 4rem 0;
  margin-left: -50vw;
  margin-right: -50vw;

  .panel-inner {          /* wrapper we kept for spacing */
    background: transparent;  /* 🆕 kill inherited dark bg */
    padding: 0;
  }

  /* mobile margins */
  @media (max-width: 640px) {
    margin-left: 0;
    margin-right: 0;
  }

  .grid { gap: 2rem; }
  @media (max-width: 640px) { .grid { grid-template-columns: repeat(1,minmax(0,1fr)); } }
`;



export default function Projects() {
  const root = useRef<HTMLDivElement>(null);

  /* ─────────── horizontal scroll only for ≥641 px ─────────── */
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 641px)', () => {
      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>('.container .panel');
        const scrollTween = gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: '.container',
            pin: true,
            scrub: 0.3,
            end: () => `+=${window.innerWidth * (panels.length - 1)}`,
          },
        });

        panels.forEach(panel => {
          const inner = panel.querySelector<HTMLElement>('.panel-inner');
          if (!inner) return;

          gsap.set(inner, { opacity: 0, scale: 0.9 });
          gsap.timeline({
            scrollTrigger: {
              trigger: inner,
              containerAnimation: scrollTween,
              start: 'left center',
              end:   'right center',
              scrub: true,
            },
          })
            .fromTo(inner, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, ease: 'none', duration: 0.5 })
            .to(inner,   { opacity: 0, scale: 0.9, ease: 'none', duration: 0.5 });
        });
      }, root);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  /* ──────  GSAP flair buttons (unchanged) ────── */
  useEffect(() => {
    class Button {
      block: HTMLElement;
      DOM: { button: HTMLElement; flair: HTMLElement };
      xSet: gsap.QuickSetter;
      ySet: gsap.QuickSetter;
      constructor(buttonElement: HTMLElement) {
        this.block = buttonElement;
        const el = gsap.utils.selector(this.block);
        this.DOM = { button: this.block, flair: el('.button__flair')[0] as HTMLElement };
        this.xSet = gsap.quickSetter(this.DOM.flair, 'xPercent');
        this.ySet = gsap.quickSetter(this.DOM.flair, 'yPercent');
        this.initEvents();
      }
      getXY(e: MouseEvent) {
        const { left, top, width, height } = this.DOM.button.getBoundingClientRect();
        const map = (a:number,b:number,c:number,d:number)=>gsap.utils.clamp(c,d,gsap.utils.mapRange(a,b,c,d));
        return { x: map(0,width,0,100)(e.clientX-left), y: map(0,height,0,100)(e.clientY-top) };
      }
      initEvents() {
        const enter = (e:MouseEvent)=>{ const {x,y}=this.getXY(e); this.xSet(x); this.ySet(y); gsap.to(this.DOM.flair,{scale:1,duration:0.4,ease:'power2.out'});} ;
        const leave = (e:MouseEvent)=>{ const {x,y}=this.getXY(e); gsap.killTweensOf(this.DOM.flair); gsap.to(this.DOM.flair,{xPercent:x>90?x+20:x<10?x-20:x,yPercent:y>90?y+20:y<10?y-20:y,scale:0,duration:0.3,ease:'power2.out'});} ;
        const move = (e:MouseEvent)=>{ const {x,y}=this.getXY(e); gsap.to(this.DOM.flair,{xPercent:x,yPercent:y,duration:0.4,ease:'power2'});} ;
        this.DOM.button.addEventListener('mouseenter',enter);
        this.DOM.button.addEventListener('mouseleave',leave);
        this.DOM.button.addEventListener('mousemove',move);
      }
    }
    document.querySelectorAll<HTMLElement>('[data-block="button"]').forEach((el)=>new Button(el));
  }, []);

  /* ---------- MARKUP ---------- */
  return (
    <>
      <SliderSection id="projects" ref={root as any} className="rounded-2xl">
        {/* INTRO */}
        <motion.div
          className="description panel rounded-2xl"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ ease: 'easeOut', duration: 0.8 }}
        >
          <div className="panel-inner font-michroma">
            <h1 className="leading-tight">
              The<br />
              <span className="font-krona-one text-[#3C0061]">PROJECTS</span><br />
              I have been diving into…
            </h1>
          </div>
        </motion.div>

        {/* SLIDER (panels) */}
        <div className="container">
          {/* ---- Panel 1 ---- */}
          <section className="panel">
            <div className="panel-inner red">
              <h3 className="font-michroma text-[#f5f5f7] py-8">PROCHESS GAME</h3>
              <Image className="project-img" src="/prochess.jpeg" alt="Project One" width={1000} height={600} />
              <div className="btn-group">
                <a data-block="button" className="button button--stroke font-michroma" href="https://game.prochessgame.com" target="_blank" rel="noopener noreferrer"><span className="button__flair" /><span className="button__label">Launch Demo</span></a>
                <a data-block="button" className="button button--stroke font-michroma" href="https://github.com/Rishi2772001/ProChessGame" target="_blank" rel="noopener noreferrer"><span className="button__flair" /><span className="button__label">Source Code</span></a>
              </div>
            </div>
          </section>

          {/* ---- Panel 2 ---- */}
          <section className="panel">
            <div className="panel-inner green">
              <h3 className="font-michroma text-[#f5f5f7] py-8">PREDICTION GAME</h3>
              <Image className="project-img" src="/dice.jpeg" alt="Prediction Game" width={1000} height={600} />
              <div className="btn-group">
                <a data-block="button" className="button button--stroke font-michroma" href="https://project4-demo.com" target="_blank" rel="noopener noreferrer"><span className="button__flair" /><span className="button__label">Launch Demo</span></a>
                <a data-block="button" className="button button--stroke font-michroma" href="https://github.com/you/project4" target="_blank" rel="noopener noreferrer"><span className="button__flair" /><span className="button__label">Source Code</span></a>
              </div>
            </div>
          </section>

          {/* ---- Panel 3 ---- */}
          <section className="panel">
            <div className="panel-inner gray">
              <h3 className="font-michroma text-[#f5f5f7] py-8">SECONDCHANCE MARKETPLACE</h3>
              <Image className="project-img" src="/secondChance2.jpeg" alt="Project Three" width={1000} height={600} />
              <div className="btn-group">
                <a data-block="button" className="button button--stroke font-michroma" href="https://gitlab.com/Rishi2001/final_project" target="_blank" rel="noopener noreferrer"><span className="button__flair" /><span className="button__label">Launch Demo</span></a>
                <a data-block="button" className="button button--stroke font-michroma" href="https://gitlab.com/Rishi2001/final_project" target="_blank" rel="noopener noreferrer"><span className="button__flair" /><span className="button__label">Source Code</span></a>
              </div>
            </div>
          </section>

          {/* ---- Panel 4 ---- */}
          <section className="panel">
            <div className="panel-inner purple">
              <h3 className="font-michroma text-[#f5f5f7] py-8">RECIPE RECOMMENDATION</h3>
              <Image className="project-img" src="/recipe_recommendation.jpeg" alt="Project Four" width={1000} height={600} />
              <div className="btn-group">
                <a data-block="button" className="button button--stroke font-michroma" href="https://recipe-recommendation-v1.streamlit.app/" target="_blank" rel="noopener noreferrer"><span className="button__flair" /><span className="button__label">Launch Demo</span></a>
                <a data-block="button" className="button button--stroke font-michroma" href="https://github.com/Rishi2772001/Recipe_Recommendation" target="_blank" rel="noopener noreferrer"><span className="button__flair" /><span className="button__label">Source Code</span></a>
              </div>
            </div>
          </section>
        </div>
      </SliderSection>
      
      {/* FOOTER – disconnected from slider */}
      
    </>
  );
}
