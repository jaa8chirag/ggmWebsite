"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.76, 0, 0.24, 1] as const;

const noopSubscribe = () => () => {};
const getReducedSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getReducedServerSnapshot = () => false;

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduced = useSyncExternalStore(
    noopSubscribe,
    getReducedSnapshot,
    getReducedServerSnapshot
  );

  const wipeVariants = {
    initial: { scaleY: 1 },
    animate: { scaleY: 0, transition: { duration: reduced ? 0 : 0.6, ease: EASE } },
    exit: { scaleY: 1, transition: { duration: reduced ? 0 : 0.5, ease: EASE } },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={pathname} className="relative">
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60] bg-ink"
          style={{ originY: 0 }}
          variants={wipeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        />
      </motion.div>
    </AnimatePresence>
  );
}
