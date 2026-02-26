"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, CalendarIcon } from "lucide-react";

export function Experience() {
    const experiences = [
        {
            title: "Cybersecurity Engineer",
            company: "Clarity2Cloud",
            date: "Nov 2025 – Present",
            description: "Integrated security checks into CI/CD workflows and automated log monitoring using Python. Conducted VAPT across AWS environments, identifying infrastructure misconfigurations. Strengthened cloud security posture by analyzing IAM, CloudTrail, and VPC logs while enforcing secure configurations from build to runtime.",
        },
        {
            title: "Chairperson",
            company: "VIT-Stellar Technical Club",
            date: "Jan 2024 – Jan 2025",
            description: "Led and scaled a massive technical community of over 1,500 members. Spearheaded the organization of numerous high-impact hackathons, security workshops, and specialized training programs, cultivating a culture of hands-on innovation and mentorship.",
        },
        {
            title: "Networking Analyst Intern",
            company: "Coal India Limited",
            date: "Aug 2023 – Sep 2023",
            description: "Spearheaded network optimization efforts targeting critical organizational infrastructure. Analyzed traffic, minimized latency bottlenecks, and enhanced the overall network performance reliability for widespread internal systems.",
        },
        {
            title: "Jr. Cybersecurity Analyst Intern",
            company: "YHills",
            date: "Dec 2022 – Feb 2023",
            description: "Executed comprehensive vulnerability assessments and introductory penetration testing on internal test environments. Documented identified gaps and collaborated on remediation strategies.",
        },
    ];

    return (
        <section id="experience" className="py-24 md:py-32 px-6 md:px-12 w-full max-w-5xl mx-auto border-t border-white/5 relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-16 md:mb-24 flex items-center justify-center gap-4"
            >
                <BriefcaseBusiness size={40} className="text-[#3b82f6]" />
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Experience</h2>
            </motion.div>

            <div className="relative pl-8 md:pl-0">
                {/* Vertical timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2"></div>

                <div className="space-y-16">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className={`relative flex flex-col md:flex-row items-start ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                        >
                            {/* Timeline dot */}
                            <div className="absolute -left-10 md:left-1/2 md:-translate-x-1/2 mt-2 md:mt-0 w-4 h-4 rounded-full bg-[#06b6d4] shadow-[0_0_15px_#06b6d4] z-10"></div>

                            {/* Content box */}
                            <div className={`w-full md:w-[45%] ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                                <div className="bg-[#1a222a]/80 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:bg-[#1a222a] hover:border-[#06b6d4]/30 transition-colors shadow-lg group">
                                    <div className="flex flex-col mb-4">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-[#06b6d4] transition-colors">{exp.title}</h3>
                                        <div className="text-lg font-medium text-[#3b82f6] mt-1">{exp.company}</div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-3 font-mono">
                                            <CalendarIcon size={14} />
                                            {exp.date}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
