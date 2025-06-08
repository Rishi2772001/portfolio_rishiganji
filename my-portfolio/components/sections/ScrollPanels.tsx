/* ------------------------------------------------------------------
   components/ScrollPanels.tsx
   ------------------------------------------------------------------ */
'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Scrollbar from 'smooth-scrollbar';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Observer from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger, Observer);

export default function ScrollPanels() {
  /* ----------------------------------------------------------------
     0.  DOM refs
  ------------------------------------------------------------------ */
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  /* ----------------------------------------------------------------
     1.  GSAP setup
  ------------------------------------------------------------------ */
  useLayoutEffect(() => {
    if (!scrollerRef.current) return;

    /* 1-A  Smooth-Scrollbar on .scroller */
    const scroller = scrollerRef.current;
    const sBar = Scrollbar.init(scroller, {
      damping: 0.1,
      delegateTo: document,
    });

    /* 1-B  ScrollTrigger <-> Smooth-Scrollbar bridge */
    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) sBar.scrollTop = value;
        return sBar.scrollTop;
      },
      getBoundingClientRect() {
        return {
          top:    0,
          left:   0,
          width:  window.innerWidth,
          height: window.innerHeight,
        };
      },
    });
    sBar.addListener(ScrollTrigger.update);

    /* for cleanup later */
    let slowScroll: Observer | null = null;

    /* ----------------------------------------------------------------
       2.  All GSAP work wrapped in a context (easier teardown)
    ------------------------------------------------------------------ */
    const ctx = gsap.context(() => {
      /* --------------------------------------------------------------
         2-A  Panel wipe timelines
      -------------------------------------------------------------- */
      gsap.set('.panel', { zIndex: (i, _, a) => a.length - i });
      const images = gsap.utils.toArray<HTMLElement>('.panel:not(.purple)');

      images.forEach((img, i) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: 'section.black',
            scroller,
            start: () => `top -${window.innerHeight * (i + 0.5)}`,
            end:   () => `+=${window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }).to(img, { height: 0 });
      });

      /* --------------------------------------------------------------
         2-B  Text fade-in/out timelines
      -------------------------------------------------------------- */
      gsap.set('.panel-text', { zIndex: (i, _, a) => a.length - i });
      const texts = gsap.utils.toArray<HTMLElement>('.panel-text');

      texts.forEach((txt, i) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: 'section.black',
            scroller,
            start: () => `top -${window.innerHeight * i}`,
            end:   () => `+=${window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
          .to(txt, { duration: 0.33, opacity: 1, y: '50%' })
          .to(txt, { duration: 0.33, opacity: 0, y: '0%' }, 0.66);
      });

      /* --------------------------------------------------------------
         2-C  Single pin trigger (with markers + slow-scroll Observer)
      -------------------------------------------------------------- */
      ScrollTrigger.create({
        id: 'pin-black',
        trigger: 'section.black',
        scroller,
        pin: true,
        scrub: true,
        start: 'top top',
        end: () => `+=${(images.length + 1) * window.innerHeight}`,
        invalidateOnRefresh: true,
        markers: true,

        /* Slow everything by ~70 % while pinned */
        onEnter() {
          slowScroll = Observer.create({
            target: scroller,                // wheel / touch on scroller
            type: 'wheel,touch',
            preventDefault: true,
            onChange(self) {
              sBar.scrollTop += self.deltaY * 0.3; // scale movement
            },
          });
        },
        onLeave()     { slowScroll?.kill(); slowScroll = null; },
        onLeaveBack() { slowScroll?.kill(); slowScroll = null; },
      });
    }, scrollerRef); // ctx

    /* ----------------------------------------------------------------
       3.  Cleanup when component unmounts
    ------------------------------------------------------------------ */
    return () => {
      slowScroll?.kill();
      ctx.revert();
      sBar.destroy();
    };
  }, []);

  /* ----------------------------------------------------------------
     4.  Mark-up & Tailwind / inline styles
  ------------------------------------------------------------------ */
  return (
    <div ref={scrollerRef} className="scroller">
      {/* orange intro */}
      <section className="orange">
        <div className="text">This is some text inside of a div block.</div>
      </section>

      {/* black – pinned */}
      <section className="black">
        <div className="text-wrap">
          <div className="panel-text blue-text">Blue</div>
          <div className="panel-text red-text">Red</div>
          <div className="panel-text orange-text">Orange</div>
          <div className="panel-text purple-text">Purple</div>
        </div>
        <div className="p-wrap">
          <div className="panel blue" />
          <div className="panel red" />
          <div className="panel orange" />
          <div className="panel purple" />
        </div>
      </section>

      {/* regular blue outro */}
      <section className="blue" />

      {/* ---------- scoped styles ---------- */}
      <style jsx>{`
        html, body { margin: 0; }

        /* Smooth-Scrollbar needs a fixed-height container */
        .scroller        { height: 100vh; }

        /* hero sections */
        .orange,.black,.blue { height: 100vh; }

        .orange { display:flex;justify-content:center;align-items:center;background:#753500; }
        .black  { display:flex;justify-content:space-around;align-items:center;background:#070707; }
        .blue   { background:#00026d; }

        .text { color:#fff; }

        .text-wrap,.p-wrap {
          position:relative;
          width:450px;
          height:80vh;
          overflow:hidden;
        }

        /* colour names */
        .panel-text {
          position:absolute;inset:0;
          font:900 40px/1 Helvetica,Arial,sans-serif;
          text-transform:uppercase;
          text-align:center;
          background:#070707;
          transform:translateY(100%);
          opacity:0;
        }
        .blue-text   { color:blue;   }
        .red-text    { color:red;    }
        .orange-text { color:orange; }
        .purple-text { color:purple; }

        /* colour panels */
        .panel {
          position:absolute;inset:0;
          background:center/cover no-repeat url('/images/5ed12171d9d512cb2feead83_5.jpg');
        }
        .panel.red    { background:red;     }
        .panel.orange { background:#cf5d00; }
        .panel.purple { background:#800080; }
      `}</style>
    </div>
  );
}
