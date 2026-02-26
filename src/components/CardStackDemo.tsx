"use client";

import { CardStack, CardStackItem } from "@/components/ui/card-stack";

const items: CardStackItem[] = [
    {
        id: 1,
        title: "Malware Analysis & Reversing",
        description: "Deep dive into sophisticated payload obfuscation techniques",
        imageSrc: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1080",
        href: "/#projects",
    },
    {
        id: 2,
        title: "Network Defense Architectures",
        description: "Building resilient topographies against persistent threats",
        imageSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1080",
        href: "/#projects",
    },
    {
        id: 3,
        title: "Cloud Infrastructure Security",
        description: "Securing scalable workloads in multi-cloud environments",
        imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1080",
        href: "/#projects",
    },
    {
        id: 4,
        title: "Automated Pen-Testing",
        description: "Scaling vulnerability discovery with intelligent tooling",
        imageSrc: "https://images.unsplash.com/photo-1510511459019-5efa3acfa28c?auto=format&fit=crop&q=80&w=1080",
        href: "/#projects",
    },
    {
        id: 5,
        title: "Incident Response",
        description: "Rapid containment and forensic analysis of breaches",
        imageSrc: "https://images.unsplash.com/photo-1624969862644-791f3dc98927?auto=format&fit=crop&q=80&w=1080",
        href: "/#projects",
    }
];

export function CardStackDemo() {
    return (
        <div className="w-full py-20 flex flex-col items-center overflow-hidden">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Security <span className="text-[#06b6d4]">Spotlight</span></h2>
                <p className="text-gray-400 max-w-2xl text-lg leading-relaxed mx-auto">
                    A visual showcase of the domains I operate in, protecting digital infrastructure from the ground up.
                </p>
            </div>
            <div className="mx-auto w-full max-w-5xl p-8">
                <CardStack
                    items={items}
                    initialIndex={0}
                    autoAdvance
                    intervalMs={2500}
                    pauseOnHover
                    showDots
                />
            </div>
        </div>
    );
}
