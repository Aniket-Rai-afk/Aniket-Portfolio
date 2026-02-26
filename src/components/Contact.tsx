"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import emailjs from '@emailjs/browser';

export function Contact() {
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("Sending...");

        emailjs.sendForm('service_jch7z9a', 'template_ket11md', e.currentTarget, '3QNtVGYw7wuESBADB')
            .then(() => {
                setStatus("Sent Successfully!");
                (e.target as HTMLFormElement).reset();
                setTimeout(() => setStatus(null), 3000);
            }, (error) => {
                setStatus("Failed. Try again.");
                console.error(error);
            });
    };
    return (
        <section id="contact" className="py-24 md:py-32 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-white/5 relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-16 flex flex-col items-center justify-center text-center"
            >
                <Mail size={40} className="text-[#3b82f6] mb-4" />
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Contact Me</h2>
                <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
                    I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
                {/* Left Col - Links */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-1/3 flex flex-col gap-6"
                >
                    <a href="mailto:aniiket2004@gmail.com" className="flex items-center gap-4 p-6 bg-[#1a222a] border border-white/5 rounded-2xl hover:border-[#3b82f6]/50 hover:bg-[#1a222a]/80 transition-all group">
                        <div className="p-3 bg-[#3b82f6]/10 text-[#3b82f6] rounded-xl group-hover:scale-110 transition-transform">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Email</h4>
                            <p className="text-gray-400 text-sm">aniiket2004@gmail.com</p>
                        </div>
                    </a>

                    <a href="https://www.linkedin.com/in/aniket-rai-694b5b244/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-[#1a222a] border border-white/5 rounded-2xl hover:border-[#06b6d4]/50 hover:bg-[#1a222a]/80 transition-all group">
                        <div className="p-3 bg-[#06b6d4]/10 text-[#06b6d4] rounded-xl group-hover:scale-110 transition-transform">
                            <Linkedin size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">LinkedIn</h4>
                            <p className="text-gray-400 text-sm">/in/aniket-rai-694b5b244</p>
                        </div>
                    </a>

                    <a href="https://github.com/Aniket-Rai-afk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-[#1a222a] border border-white/5 rounded-2xl hover:border-gray-400/50 hover:bg-[#1a222a]/80 transition-all group">
                        <div className="p-3 bg-gray-500/10 text-gray-300 rounded-xl group-hover:scale-110 transition-transform">
                            <Github size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">GitHub</h4>
                            <p className="text-gray-400 text-sm">Aniket-Rai-afk</p>
                        </div>
                    </a>
                </motion.div>

                {/* Right Col - Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full md:w-2/3"
                >
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Name</label>
                                <input type="text" name="name" className="w-full bg-[#1a222a] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/50 transition-all placeholder:text-gray-600" placeholder="John Doe" required />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Email</label>
                                <input type="email" name="email" className="w-full bg-[#1a222a] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#06b6d4]/50 focus:ring-1 focus:ring-[#06b6d4]/50 transition-all placeholder:text-gray-600" placeholder="john@example.com" required />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 relative">
                            <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Message</label>
                            <textarea rows={6} name="message" className="w-full bg-[#1a222a] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/50 transition-all placeholder:text-gray-600 resize-none" placeholder="Hello Aniket, I would like to discuss..." required></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === "Sending..."}
                            className={`flex items-center justify-center gap-3 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.2)] mt-2 ${status === "Sent Successfully!" ? 'bg-[#10b981] hover:bg-[#10b981]'
                                    : status === "Failed. Try again." ? 'bg-[#ef4444] hover:bg-[#ef4444]'
                                        : 'bg-[#3b82f6] hover:bg-[#2563eb] hover:scale-[1.02]'
                                }`}
                        >
                            {status || "Send Message"}
                            <Send size={20} />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
