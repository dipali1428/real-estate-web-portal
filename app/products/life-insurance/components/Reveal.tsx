"use client";

import { motion } from "framer-motion";

export default function Reveal({ children, width = "fit-content", delay = 0.2, overflowVisible = false }: { children: React.ReactNode, width?: "fit-content" | "100%", delay?: number, overflowVisible?: boolean }) {
    return (
        <div style={{ position: "relative", width, overflow: overflowVisible ? "visible" : "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
}
