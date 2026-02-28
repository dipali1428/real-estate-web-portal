"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#2076C7] to-[#1CADA3] origin-left z-50"
            style={{ scaleX }}
        >
            <div className="absolute top-0 right-0 h-full w-20 bg-white/20 blur-md animate-pulse" />
        </motion.div>
    );
}
