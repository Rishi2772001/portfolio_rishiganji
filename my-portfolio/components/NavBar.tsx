// components/Navbar.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import gsap from "gsap";

/* ─────────── nav data ─────────── */
const navItems = [
  { path: "/",           name: "Home" },
  { path: "#skills",     name: "Skills" },
  { path: "#experience", name: "Experience" },
  { path: "#projects",   name: "Projects" },
  { path: "#contact",    name: "Contact" },
];

export default function Navbar() {
  /* -------- active / hover paths -------- */
  let pathname = usePathname() || "/";
  if (pathname.includes("/contact/")) pathname = "/contact";

  const [hoveredPath, setHoveredPath]   = useState(pathname);
  const [showHamburger, setShowHamburger] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const mobileNavRef      = useRef<HTMLDivElement>(null);
  const mobileNavItemsRef = useRef<HTMLLIElement[]>([]);

  /* ─────────── scroll‑trigger hamburger ─────────── */
  useEffect(() => {
    const handleScroll = () => {
      const threshold = 100;
      if (window.scrollY > threshold) {
        setShowHamburger(true);
      } else {
        setShowHamburger(false);
        if (isMobileNavOpen) setIsMobileNavOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileNavOpen]);

  /* ─────────── mobile drawer animation ─────────── */
  useEffect(() => {
    mobileNavItemsRef.current = []; // clear stale refs

    const ctx = gsap.context(() => {
      if (isMobileNavOpen) {
        gsap.to(mobileNavRef.current, {
          duration: 0.8,
          x: "0%",
          ease: "power3.inOut",
          onStart: () => (document.body.style.overflow = "hidden"),
        });

        gsap.fromTo(
          mobileNavItemsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.4 }
        );
      } else {
        gsap.to(mobileNavRef.current, {
          duration: 0.8,
          x: "100%",
          ease: "power3.inOut",
          onComplete: () => (document.body.style.overflow = ""),
        });
      }
    });

    return () => ctx.revert();
  }, [isMobileNavOpen]);

  const addItemRef = (el: HTMLLIElement) => {
    if (el && !mobileNavItemsRef.current.includes(el)) mobileNavItemsRef.current.push(el);
  };

  /* ─────────── markup ─────────── */
  return (
    <header className="w-full">
      <div className="mx-auto max-w-9xl flex items-center justify-between px-4 py-6">
        {/* site title */}
        <div className="font-michroma text-3xl font-extrabold text-black px-5">
          Full Stack Web Developer
        </div>

        {/* desktop nav */}
        <nav className="relative hidden lg:flex space-x-6 font-michroma">
          {navItems.map((item) => {
            const isActive = item.path === pathname;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-3 py-1 text-sm lg:text-base transition-colors duration-200 ${
                  isActive ? "text-black" : "text-gray-500"
                }`}
                onMouseOver={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(pathname)}
              >
                <span>{item.name}</span>
                {item.path === hoveredPath && (
                  <motion.div
                    layoutId="navbarHighlight"
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-md bg-blue-300/50"
                    transition={{ type: "spring", bounce: 0.25, stiffness: 130, damping: 9 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* hamburger icon (mobile) */}
      {showHamburger && (
        <HamburgerMenu
          isOpen={isMobileNavOpen}
          onClick={() => setIsMobileNavOpen((prev) => !prev)}
        />
      )}

      {/* full‑screen drawer with BACKDROP BLUR (no dark overlay) */}
      <div
        ref={mobileNavRef}
        className={`fixed inset-0 z-[999] flex h-full w-full translate-x-full transform items-center justify-center backdrop-blur-lg bg-white/5 will-change-transform`}
      >
        {/* close (×) */}
        <button
          aria-label="Close navigation"
          onClick={() => setIsMobileNavOpen(false)}
          className="absolute right-6 top-6 z-[1000] text-5xl font-bold text-gray-800 focus:outline-none"
        >
          &times;
        </button>

        <nav className="text-center">
          <ul className="space-y-6">
            {navItems.map((item) => (
              <li key={item.path} ref={addItemRef}>
                <Link
                  href={item.path}
                  onClick={() => setIsMobileNavOpen(false)}
                  className=" glow-hover font-michroma text-7xl font-bold text-gray-800 transition-colors duration-300 "
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
