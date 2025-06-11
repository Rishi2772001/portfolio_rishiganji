"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

/* ─────────── nav data ─────────── */
const navItems = [
  { path: "/",           name: "Home" },
  { path: "#projects",   name: "Projects" },
  { path: "#skills",     name: "Skills" },
  { path: "#experience", name: "Experience" },
  { path: "#contact",    name: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);

  /* -------------------------------------------------------------- */
  /*  Lock body scroll while the mobile drawer is open              */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* -------------------------------------------------------------- */
  /*  Render                                                        */
  /* -------------------------------------------------------------- */
  return (
    <>
      {/* Sticky / translucent header (stays above all content) */}
      <header className="fixed inset-x-0 top-0 z-50 h-16 bg-white/80 backdrop-blur-lg border-b border-white/10 dark:bg-neutral-950/20">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-8">
          {/* Logo / site‑title */}
          <Link
            href="/"
            className="text-lg font-michroma text-gray-500 font-semibold tracking-wide md:text-xl lg:text-2xl [font-size:clamp(1rem,2vw+0.5rem,2rem)]"
          >
            Full Stack Web Developer
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex space-x-8 text-sm font-medium">
            {navItems.map(({ path, name }) => (
              <Link
                key={path}
                href={path}
                className={clsx(
                  "transition-colors hover:text-blue-300 font-michroma",
                  pathname === path ? "text-gray-500" : "text-gray-500"
                )}
              >
                {name}
              </Link>
            ))}
          </nav>

          {/* Hamburger (mobile only) */}
          <button
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-md hover:bg-muted/40 focus:outline-none focus-visible:ring focus-visible:ring-primary-500"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile full‑screen drawer */}
      {isOpen && (
        <nav className="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-10 bg-black/70 backdrop-blur-lg lg:hidden">
          {navItems.map(({ path, name }) => (
            <Link
              key={path}
              href={path}
              onClick={() => setIsOpen(false)}
              className="uppercase tracking-wide font-michroma font-extrabold text-white text-4xl sm:text-5xl"
            >
              {name}
            </Link>
          ))}
        </nav>
      )}

      {/* Spacer so page content doesn’t hide under the fixed nav */}
      <div aria-hidden className="h-18 sm:h-19 lg:h-26" />
    </>
  );
}
