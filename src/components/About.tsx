"use client";

import { motion } from "framer-motion";
import { Code, ShieldCheck, Server, Users } from "lucide-react";

export function About() {
    const cards = [
        {
            title: "Security Engineering",
            desc: "Threat Modeling, VAPT, DevSecOps, Cloud Security",
            icon: <ShieldCheck size={32} className="text-[#06b6d4]" />,
        },
        {
            title: "Development",
            desc: "Full-Stack MERN, Python, Java, Secure Coding",
            icon: <Code size={32} className="text-[#3b82f6]" />,
        },
        {
            title: "Infrastructure",
            desc: "Network Optimization, System Hardening, Architecture",
            icon: <Server size={32} className="text-[#06b6d4]" />,
        },
        {
            title: "Leadership",
            desc: "Strategy, Mentorship, Cross-functional Collaboration",
            icon: <Users size={32} className="text-[#3b82f6]" />,
        },
    ];

    return (
        <section id="about" className="py-24 md:py-32 px-6 md:px-12 w-full bg-[#1a222a]/50 border-t border-white/5 relative">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">
                {/* Left Col - Text */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-1/2 flex flex-col justify-center"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">About Me</h2>
                        <div className="h-px bg-white/20 w-32 ml-4"></div>
                    </div>

                    <div className="text-gray-400 space-y-6 text-lg leading-relaxed">
                        <p>
                            My journey began deeply rooted in Software Engineering with Java and Python, scaling up to Full-Stack development. As I built systems, my passion shifted towards breaking them—and figuring out how to stop others from doing the same. Today, I operate at the intersection of development and cybersecurity.
                        </p>
                        <p>
                            Currently, I serve as a <strong className="text-white">Cybersecurity Engineer at Clarity2Cloud</strong>, orchestrating security operations, conducting VAPT, and automating threat hunters (Sophos, Fortinet, AWS WAF). My goal is simple: ensure our infrastructure remains impenetrable.
                        </p>
                        <p>
                            Beyond the terminal, I led <strong className="text-[#06b6d4] font-medium">1,500+ members</strong> as the Chairperson of the VIT-Stellar Technical Club, fostering innovation, organizing large-scale hackathons, and mentoring the next generation of engineers.
                        </p>
                    </div>
                </motion.div>

                {/* Right Col - Cards */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    {cards.map((card, i) => (
                        <div
                            key={i}
                            className="bg-[#0f1419] border border-white/5 p-8 rounded-2xl hover:bg-[#1a222a] hover:border-[#3b82f6]/30 transition-all duration-300 shadow-xl group"
                        >
                            <div className="mb-6 p-4 rounded-xl bg-white/5 w-max group-hover:scale-110 transition-transform">
                                {card.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
