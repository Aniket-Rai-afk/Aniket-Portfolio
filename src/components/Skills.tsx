"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, LibrarySquare } from "lucide-react";

export function Skills() {
    const engineering = ["Java", "Python", "JavaScript", "SQL", "React", "Linux", "Bash Scripting"];
    const securityOps = ["AWS (IAM, VPC, CloudTrail)", "Infrastructure Hardening", "Cloud Security", "VAPT", "QRadar", "Nessus", "Metasploit", "CI/CD Security", "DevSecOps"];
    const concepts = ["Secure SDLC", "Access Control Policies", "NIST Framework", "ISO 27001 Awareness", "IAM Governance"];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1 }
    };

    return (
        <section id="skills" className="py-24 md:py-32 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-white/5 relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left"
            >
                <Zap size={40} className="text-[#06b6d4]" />
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Technical Arsenal</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {/* Category: Engineering */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Cpu className="text-[#3b82f6]" size={24} />
                        <h3 className="text-2xl font-semibold text-white">Engineering Stack</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {engineering.map((skill, i) => (
                            <motion.span
                                variants={itemVariants}
                                key={i}
                                className="px-4 py-2 text-sm font-medium text-gray-300 bg-[#1a222a] border border-white/10 rounded-lg shadow-sm hover:border-[#3b82f6]/50 hover:bg-[#3b82f6]/10 transition-colors"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Category: Security & Ops */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <LibrarySquare className="text-[#06b6d4]" size={24} />
                        <h3 className="text-2xl font-semibold text-white">Security & Ops</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {securityOps.map((skill, i) => (
                            <motion.span
                                variants={itemVariants}
                                key={i}
                                className="px-4 py-2 text-sm font-medium text-[#06b6d4] bg-[#06b6d4]/10 border border-[#06b6d4]/20 rounded-lg shadow-sm hover:border-[#06b6d4]/50 hover:bg-[#06b6d4]/20 transition-colors"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Category: Concepts */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Zap className="text-[#3b82f6]" size={24} />
                        <h3 className="text-2xl font-semibold text-white">Core Concepts</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {concepts.map((skill, i) => (
                            <motion.span
                                variants={itemVariants}
                                key={i}
                                className="px-4 py-2 text-sm font-medium text-gray-300 bg-[#1a222a] border border-white/10 rounded-lg shadow-sm hover:border-white/30 transition-colors"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
