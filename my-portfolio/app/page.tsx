import Hero                      from '@/components/sections/Hero';
import Skills                    from '@/components/sections/Skills';
import Experience                from '@/components/sections/Experience';
import Projects                 from '@/components/sections/Projects';

export default function Home() {
  /* This file stays a **Server Component** (no "use client") */
  return (
    <>
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      
    </>
  );
}
