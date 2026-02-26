"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

export function Certifications() {
    const certifications = [
        { name: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", date: "Jan 2024", link: "https://aspen.eccouncil.org/Verify" },
        { name: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services", date: "Feb 2026" },
        { name: "AWS IAM & Cloud Security Specialization", issuer: "Amazon Web Services", date: "Jan 2026" },
        { name: "AWS Security – Encryption Fundamentals", issuer: "Amazon Web Services", date: "Dec 2025" },
        { name: "Microsoft Power BI", issuer: "Udemy", date: "Dec 2024", link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-811fe6fb-d31e-44ee-be77-35cae2e34c54.pdf" },
        { name: "Product Management", issuer: "LinkedIn", date: "Mar 2025" },
        { name: "Risk Management", issuer: "LinkedIn", date: "Apr 2025" },
    ];

    return (
        <section id="certifications" className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-white/5 relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-12 flex flex-col items-center justify-center text-center"
            >
                <BadgeCheck size={40} className="text-[#3b82f6] mb-4" />
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Certifications</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {certifications.map((cert, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex flex-col items-center justify-center text-center bg-[#1a222a] border border-white/5 p-8 rounded-2xl hover:bg-[#1a222a]/80 hover:border-[#06b6d4]/50 transition-colors shadow-lg"
                    >
                        <h3 className="text-lg font-bold text-white mb-2">{cert.name}</h3>
                        <p className="text-[#3b82f6] font-medium text-sm mb-2">{cert.issuer}</p>
                        <p className="text-gray-500 text-sm font-mono mb-4">{cert.date}</p>
                        {cert.link && (
                            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="mt-auto px-4 py-1.5 border border-[#3b82f6]/30 text-[#3b82f6] hover:bg-[#3b82f6]/10 text-xs font-bold rounded-lg uppercase tracking-wider transition-colors inline-block">
                                Verify
                            </a>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
