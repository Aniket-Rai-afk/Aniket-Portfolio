"use client";

import { motion } from "framer-motion";
import { ChevronRight, Download, Terminal, Activity, Users, ShieldCheck } from "lucide-react";

export function Hero() {
    const metrics = [
        { label: "Malware Scanned", value: "10k+", icon: <ShieldCheck size={20} className="text-[#06b6d4]" /> },
        { label: "Major Projects", value: "4+", icon: <Terminal size={20} className="text-[#06b6d4]" /> },
        { label: "Network Boost", value: "20%", icon: <Activity size={20} className="text-[#06b6d4]" /> },
        { label: "Community Led", value: "1.5k+", icon: <Users size={20} className="text-[#06b6d4]" /> },
    ];

    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[90vh]">
            {/* Background glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3b82f6]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#06b6d4]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl max-h-full"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
                    <span className="text-xs font-mono text-[#06b6d4] tracking-widest uppercase">System Status: Secure</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6">
                    Hello, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]">Aniket Rai</span>
                </h1>

                <h2 className="text-2xl md:text-3xl font-medium text-gray-300 mb-8 tracking-tight">
                    Cybersecurity Engineer <span className="text-[#06b6d4]">/</span> Full-Stack Developer
                </h2>

                <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                    I build secure-by-design systems and automate defenses. Blending offensive security insights with practical engineering to create scalable, resilient solutions.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 relative z-20">
                    <a
                        href="#projects"
                        className="flex items-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(59,130,246,0.3)] w-full sm:w-auto justify-center"
                    >
                        View Projects
                        <ChevronRight size={20} />
                    </a>
                    <a
                        href="#contact"
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm hover:border-white/20 w-full sm:w-auto justify-center"
                    >
                        Contact Me
                    </a>
                    <a
                        href="/resume.pdf"
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white underline-offset-4 hover:underline px-4 py-4 font-medium transition-all w-full sm:w-auto justify-center"
                    >
                        <Download size={20} />
                        Resume
                    </a>
                </div>
            </motion.div>

            {/* Metrics Grid */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12"
            >
                {metrics.map((metric, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center justify-center p-6 bg-[#1a222a]/80 backdrop-blur-md rounded-2xl border border-white/5 hover:border-[#3b82f6]/30 transition-colors shadow-lg group relative"
                    >
                        {/* Subtle glow effect on hover */}
                        <div className="absolute inset-0 bg-[#06b6d4]/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-2xl" />

                        <div className="mb-3 p-3 bg-black/30 rounded-full border border-white/5">
                            {metric.icon}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 font-mono">
                            {metric.value}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-400 font-medium uppercase tracking-wider text-center">
                            {metric.label}
                        </p>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
