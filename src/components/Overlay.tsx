"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

export function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    // Section 1: 0% visibly, fading out at 20%
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]); // Moves up as we scroll down

    // Section 2: Fades in at 25%, peaks at 35%, fades out at 45%
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.25, 0.55], [-50, 50]); // Moves slightly right over time

    // Section 3: Fades in at 55%, peaks at 65%, fades out at 85%
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
    const x3 = useTransform(scrollYProgress, [0.55, 0.85], [50, -50]); // Moves slightly left over time

    return (
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full flex flex-col justify-center">

            {/* Section 1 */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute w-full px-6 flex justify-center text-center items-center top-1/2 -translate-y-1/2"
            >
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl">
                    Aniket Rai.<br />
                    <span className="text-3xl md:text-5xl font-medium text-[#06b6d4] block mt-4">
                        Security Engineer & Developer
                    </span>
                </h1>
            </motion.div>

            {/* Section 2 */}
            <motion.div
                style={{ opacity: opacity2, x: x2 }}
                className="absolute w-full px-6 md:px-24 flex justify-start text-left items-center top-1/2 -translate-y-1/2"
            >
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl max-w-3xl">
                    I build <br />
                    <span className="text-[#3b82f6] font-medium">secure systems.</span>
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
    );
}
