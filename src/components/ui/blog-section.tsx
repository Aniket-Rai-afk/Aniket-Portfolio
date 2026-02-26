"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { LazyImage } from './lazy-image';

export type BlogPost = {
    id: string;
    title: string;
    link: string;
    summary: string;
    image: string;
    date: string;
    author: string;
    readTime: string;
    tags: string[];
};

export const blogs: BlogPost[] = [
    {
        id: 'starlink-mesh-dec-2025',
        title: "How Starlink Handles Internet in Low Earth Orbit — Deep Dive Into Mesh Networking in Space",
        summary: "Starlink doesn’t just provide internet from space. It routes the internet in space. A deep dive into laser crosslinks, orbital mesh networking, and how they solve congestion in LEO.",
        date: "Dec 07, 2025",
        author: "Aniket Rai",
        tags: ["Space Tech", "Networking", "Cloud Architecture"],
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1080&auto=format&fit=crop",
        link: "/posts/starlink-mesh"
    },
    {
        id: 'midnight-blizzard-oct-2024',
        title: "When Identity Became the New Attack Surface — Technical Breakdown of the Midnight Blizzard Breach",
        summary: "They didn't break a firewall or exploit a zero-day. They forged an identity. A breakdown of the Microsoft Midnight Blizzard incident showing why identity is the new perimeter.",
        date: "Oct 27, 2024",
        author: "Aniket Rai",
        tags: ["Identity Security", "Cloud Security", "Breach Analysis"],
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1080&auto=format&fit=crop",
        link: "/posts/midnight-blizzard"
    },
    {
        id: 'crowdstrike-outage-nov-2024',
        title: "When One Update Took Down the World — Technical Breakdown of the CrowdStrike Global Outage",
        summary: "Flights canceled, banks offline, and millions of BSODs. A deep look at how a single kernel driver update crashed the modern world.",
        date: "Nov 22, 2024",
        author: "Aniket Rai",
        tags: ["Security", "Infrastructure", "Kernel"],
        readTime: "10 min read",
        image: "https://images.unsplash.com/photo-1624969862644-791f3dc98927?q=80&w=1080&auto=format&fit=crop",
        link: "/posts/crowdstrike-outage"
    },
    {
        id: 'nasa-dtn-oct-2025',
        title: "How NASA Routes Internet in Space — Engineering Behind Delay-Tolerant Networking",
        summary: "When people talk about “Internet in space,” they usually imagine a Wi-Fi router on a satellite. The real story is far more interesting. NASA’s solution is Delay-Tolerant Networking.",
        date: "Oct 15, 2025",
        author: "Aniket Rai",
        tags: ["Networking", "Space Tech", "Engineering"],
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1080&auto=format&fit=crop",
        link: "/posts/nasa-dtn"
    },
    {
        id: 'cloudflare-outage-nov-2025',
        title: "When Cloudflare Went Down — Breakdown of the November 2025 Internet Outage",
        summary: "A clear, research-based breakdown of the massive Cloudflare outage: what caused it, which global systems failed, how Cloudflare recovered, and what to learn from it.",
        date: "Nov 15, 2025",
        author: "Aniket Rai",
        tags: ["Cloud", "Security", "Outage Analysis"],
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1080&auto=format&fit=crop",
        link: "/posts/cloudflare-outage"
    }
];

export function BlogSection() {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Extract unique tags and count them
    const tagsCount: Record<string, number> = {};
    blogs.forEach((post) => {
        post.tags.forEach(tag => {
            tagsCount[tag] = (tagsCount[tag] || 0) + 1;
        });
    });

    const uniqueTags = Object.keys(tagsCount).sort();

    const filteredBlogs = selectedTag
        ? blogs.filter(b => b.tags.includes(selectedTag))
        : blogs;

    return (
        <div className="mx-auto w-full max-w-7xl grow text-white py-12 px-6">
            <div
                aria-hidden
                className="absolute inset-0 isolate contain-strict -z-10 opacity-60 pointer-events-none"
            >
                <div className="-rotate-45 bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(6,182,212,0.1)_0,rgba(59,130,246,0.05)_50%,rgba(0,0,0,0)_80%)] absolute top-0 left-0 h-[800px] w-[600px] -translate-y-87.5 rounded-full" />
            </div>
            <div className="space-y-4 py-8 mb-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                    <span className="text-[#06b6d4]">Security</span> Insights
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl">
                    Deep technical breakdowns, architectural teardowns, and analyses of how the digital world breaks—and how to fix it.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <div className="flex flex-wrap gap-2 items-center">
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={`px-4 py-2 text-sm rounded-full transition-colors border ${selectedTag === null
                            ? 'bg-white text-black border-white'
                            : 'bg-[#1a222a] text-gray-400 border-white/10 hover:border-[#3b82f6]/50 hover:bg-[#1a222a]/80'
                            }`}
                    >
                        All Articles ({blogs.length})
                    </button>
                    {uniqueTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 text-sm rounded-full transition-colors border ${selectedTag === tag
                                ? 'bg-[#06b6d4] text-black border-[#06b6d4]'
                                : 'bg-[#1a222a] text-gray-400 border-white/10 hover:border-[#3b82f6]/50 hover:bg-[#1a222a]/80'
                                }`}
                        >
                            {tag} ({tagsCount[tag]})
                        </button>
                    ))}
                </div>
            </div>

            <div className="absolute inset-x-0 h-px w-full border-b border-dashed border-white/10" />

            <div className="grid pt-8 md:grid-cols-2 lg:grid-cols-3 z-10 gap-x-6 gap-y-12">
                {filteredBlogs.map((blog) => (
                    <Link
                        href={blog.link}
                        key={blog.id}
                        className="group flex flex-col gap-4 rounded-xl p-3 bg-[#0f1419]/50 hover:bg-[#1a222a]/80 border border-transparent hover:border-white/5 transition-all duration-300"
                    >
                        <LazyImage
                            src={blog.image}
                            fallback="https://placehold.co/640x360?text=fallback-image"
                            inView={true}
                            alt={blog.title}
                            ratio={16 / 9}
                            className="transition-transform duration-700 group-hover:scale-[1.03] group-hover:rotate-1"
                        />
                        <div className="space-y-3 px-1 pb-1">
                            <div className="flex flex-wrap gap-2 mt-1">
                                {blog.tags.slice(0, 2).map((tag, i) => (
                                    <span key={i} className="text-[#06b6d4] text-[11px] font-mono uppercase tracking-wider bg-[#06b6d4]/10 px-2 py-0.5 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h2 className="line-clamp-2 text-xl leading-snug font-bold text-white group-hover:text-[#3b82f6] transition-colors">
                                {blog.title}
                            </h2>
                            <p className="text-gray-400 line-clamp-3 text-sm leading-relaxed">
                                {blog.summary}
                            </p>
                            <div className="text-gray-500 font-mono flex items-center gap-2 text-[11px] sm:text-xs pt-2">
                                <p>by {blog.author}</p>
                                <div className="bg-gray-600 size-1 rounded-full" />
                                <p>{blog.date}</p>
                                <div className="bg-gray-600 size-1 rounded-full" />
                                <p>{blog.readTime}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
