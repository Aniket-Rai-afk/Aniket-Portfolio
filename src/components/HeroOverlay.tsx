"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroOverlay() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Section 1: 0% visibly, fading out
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

    // Section 2: Fades in, peaks, fades out
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.25, 0.55], [-50, 50]);

    // Section 3: Fades in, peaks, fades out
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
    const x3 = useTransform(scrollYProgress, [0.55, 0.85], [50, -50]);

    return (
        <div ref={containerRef} className="relative h-[400vh] w-full z-10">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pointer-events-none">

                {/* Section 1 */}
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className="absolute w-full px-6 flex justify-center text-center items-center top-1/2 -translate-y-1/2"
                >
                    <div className="flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-md mb-6 shadow-xl pointer-events-auto">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-mono text-green-400 tracking-widest uppercase">Open to Work</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl">
                            Aniket Rai.<br />
                            <span className="text-3xl md:text-5xl font-medium text-[#06b6d4] block mt-4">
                                Cybersecurity Engineer
                            </span>
                        </h1>
                    </div>
                </motion.div>

                {/* Section 2 */}
                <motion.div
                    style={{ opacity: opacity2, x: x2 }}
                    className="absolute w-full px-6 md:px-24 flex justify-start text-left items-center top-1/2 -translate-y-1/2"
                >
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl max-w-3xl">
                        I build <br />
                        <span className="text-[#3b82f6] font-medium">&amp; secure systems.</span>
                    </h2>
                </motion.div>

                {/* Section 3 */}
                <motion.div
                    style={{ opacity: opacity3, x: x3 }}
                    className="absolute w-full px-6 md:px-24 flex justify-end text-right items-center top-1/2 -translate-y-1/2"
                >
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl max-w-3xl">
                        Blending offensive security <br />
                        <span className="text-[#06b6d4] font-medium italic">&amp;</span> practical engineering.
                    </h2>
                </motion.div>
            </div>
        </div>
    );
}
