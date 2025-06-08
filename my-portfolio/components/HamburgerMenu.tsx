// components/HamburgerMenu.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClick }) => {
  const commonStyles = "block h-1 w-8 bg-black transform transition-all duration-300 ease-in-out";

  return (
    <button
      className="fixed top-6 right-6 z-50 flex flex-col items-center justify-center space-y-2 focus:outline-none"
      onClick={onClick}
      aria-label="Toggle navigation"
    >
      <motion.span
        className={`${commonStyles} ${isOpen ? 'rotate-45 translate-y-3' : ''}`}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: { rotate: 45, y: 12 },
          closed: { rotate: 0, y: 0 },
        }}
      ></motion.span>
      <motion.span
        className={`${commonStyles} ${isOpen ? 'opacity-0' : ''}`}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 0 },
          closed: { opacity: 1 },
        }}
      ></motion.span>
      <motion.span
        className={`${commonStyles} ${isOpen ? '-rotate-45 -translate-y-3' : ''}`}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: { rotate: -45, y: -12 },
          closed: { rotate: 0, y: 0 },
        }}
      ></motion.span>
    </button>
  );
};

export default HamburgerMenu;