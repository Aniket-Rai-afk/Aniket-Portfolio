"use client";

import { motion } from "framer-motion";
import { FolderGit2, Github, ExternalLink, Activity } from "lucide-react";

export function Projects() {
    const projects = [
        {
            title: "IoT Anomaly Detection System",
            status: "ONGOING",
            desc: "Real-time detection of anomalies in smart home IoT networks using CluStream & Page-Hinkley algorithms.",
            tech: ["React", "Node.js", "PostgreSQL", "IoT"],
            metrics: "Real-time threat detection in smart home environments.",
            link: "https://github.com/Aniket-Rai-afk/Anomaly-Detection-in-Smart-Home-IoT-Networks",
        },
        {
            title: "File Integrity Monitor",
            status: "COMPLETED",
            desc: "Cross-platform security tool detecting unauthorized system modifications using 9-point cryptographic checks.",
            tech: ["Bash", "Linux", "Security"],
            metrics: "↓ 70% reduction in audit time for 50+ users.",
            link: "https://github.com/Aniket-Rai-afk/PROACTIVE-DETECTION-OF-UNAUTHORIZED-SYSTEM-MODIFICATIONS-USING-INTEGRITY-CHECKING",
        },
        {
            title: "Malware Classification ML Model",
            status: "COMPLETED",
            desc: "Machine Learning model for detecting malware with extremely high accuracy, trained extensively.",
            tech: ["Python", "scikit-learn", "ML"],
            metrics: "95% Accuracy | 10,000+ samples | 40% faster detection.",
            link: "#", // Add original link if provided, otherwise leave #
        },
    ];

    return (
        <section id="projects" className="py-24 md:py-32 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-white/5 relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-16 md:mb-24 flex items-center justify-center gap-4"
            >
                <FolderGit2 size={40} className="text-[#3b82f6]" />
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Featured Projects</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((proj, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="flex flex-col bg-[#1a222a] border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-2 hover:border-[#3b82f6]/50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group h-full"
                    >
                        {/* Status Header */}
                        <div className="flex items-center justify-between p-6 pb-4 border-b border-white/5">
                            <FolderGit2 className="text-[#06b6d4]" size={28} />
                            <div className="flex flex-col items-end gap-2">
                                <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-widest px-3 py-1 rounded-full border ${proj.status === "ONGOING" ? "border-amber-500/30 text-amber-500 bg-amber-500/10" : "border-emerald-500/30 text-emerald-500 bg-emerald-500/10"}`}>
                                    {proj.status}
                                </span>
                                <div className="flex gap-2">
                                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                        <Github size={20} />
                                    </a>
                                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#06b6d4] transition-colors">
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-[#3b82f6] transition-colors">{proj.title}</h3>
                            <p className="text-gray-400 text-sm mb-6 flex-1 leading-relaxed">
                                {proj.desc}
                            </p>

                            {/* Metrics highlight */}
                            <div className="mb-6 p-4 bg-black/40 rounded-xl border border-white/5 flex items-start gap-3">
                                <Activity size={18} className="text-[#06b6d4] mt-0.5 shrink-0" />
                                <span className="text-sm font-medium text-gray-300">{proj.metrics}</span>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {proj.tech.map((tag, j) => (
                                    <span
                                        key={j}
                                        className="px-3 py-1.5 text-xs font-mono font-medium tracking-wide text-[#3b82f6] bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
