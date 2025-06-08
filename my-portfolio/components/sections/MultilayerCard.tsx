// components/MultilayerCard.tsx
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

/* under-sheet halo */
const glowVariants = {
  initial: { opacity: 0, scale: 1 },
  hover:   { opacity: 1, scale: 1.08, transition: { duration: 0.35, ease: [0.45, 0, 0.2, 1] } },
};

/* rim-light halo */
const rimVariants = {
  initial: { boxShadow: "0 0 0 0 rgba(0,255,255,0)", opacity: 0 },
  hover: {
    boxShadow: "0 0 12px 2px rgba(56,189,248,0.85), 0 0 24px 9px rgba(56,189,248,0.45)",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.45, 0, 0.2, 1] },
  },
};

/* gradient-overlay opacity */
const gradientOverlay = {
  initial: { opacity: 0 },
  hover:   { opacity: 1, transition: { duration: 1, ease: [0.45, 0, 0.2, 1] } }, // ⬅ speed
};

export const MultilayerCardV_2 = ({ children, className = "" }: CardProps) => (
  <motion.div initial="initial" whileHover="hover" className={cn("group relative w-full", className)}>
    <div className="py-8">
      <div className="relative mx-auto w-full min-h-[28rem] md:min-h-[26rem]">
        {/* back sheet */}
        <div
          className="absolute inset-0 -top-5 scale-y-[1.05] scale-x-90 rounded-4xl
                     border border-neutral-300 bg-zinc-300 dark:border-zinc-900 dark:bg-zinc-900"
          style={{ transformOrigin: "top center" }}
        />

        {/* glow between sheets */}
        <motion.div
          variants={glowVariants}
          className="absolute inset-0 z-[5] rounded-4xl
                     bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.7)_0%,rgba(59,130,246,0.4)_35%,transparent_80%)]
                     blur-[80px]"
        />

        {/* main sheet (dark) */}
        <div
          className="absolute inset-0 z-10 rounded-4xl border border-neutral-700
                     bg-[#18181b] p-10 shadow-[0px_0px_24px_rgba(0,0,0,0.4)]
                     flex flex-col justify-start text-gray-100 overflow-hidden"
          style={{ transformOrigin: "top center" }}
        >
          {/* gradient overlay that fades in/out */}
          <motion.div
            variants={gradientOverlay}
            className="pointer-events-none absolute inset-0 rounded-4xl bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(130deg,#00357d 0%,#0056a3 25%,#007bbf 50%,#009ecf 70%,#28f1e0 100%)",
            }}
          />
          {children}
        </div>

        {/* rim-light halo above sheet */}
        <motion.div variants={rimVariants} className="pointer-events-none absolute inset-0 z-20 rounded-4xl" />
      </div>
    </div>
  </motion.div>
);
