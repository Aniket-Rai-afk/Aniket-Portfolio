import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-[#0f1419] text-gray-200 flex flex-col items-center overflow-x-hidden selection:bg-[#3b82f6] selection:text-white pt-24">
      <Navbar />
      <div className="w-full relative z-10 max-w-4xl mx-auto px-6 py-10 blog-content-wrapper">
        <div dangerouslySetInnerHTML={{ __html: `
        <header class="article-header">
            <div class="article-meta">
                <span class="blog-tag">Networking</span>
                <span><i class="fa-regular fa-calendar"></i> Oct 15, 2025</span>
                <span id="read-time"><i class="fa-regular fa-clock"></i> 6 min read</span>
            </div>
            <h1 class="article-title">How NASA Routes Internet in Space — The Real Engineering Behind Delay-Tolerant
                Networking</h1>
        </header>

        <!-- TOC -->
        <nav class="toc">
            <h4>Table of Contents</h4>
            <ul id="toc-list"></ul>
        </nav>

        <div class="article-content">
            <p>When people talk about “Internet in space,” they usually imagine a Wi-Fi router on a satellite. The real
                story is far more interesting — and far more difficult. Every computer network protocol we rely on on
                Earth assumes something that space does not offer: a stable connection.</p>

            <p>Satellites lose signal because they move out of range. Probes have blackout periods when planets block
                line of sight. And when you’re exchanging data with a spacecraft near Mars, even light takes more than
                20 minutes to arrive. Under those conditions, the classic Internet model — one device sending packets to
                another and expecting instant acknowledgment — simply cannot work.</p>

            <p>NASA’s solution is <strong>Delay-Tolerant Networking (DTN)</strong>. The name sounds modest, but DTN
                quietly solves one of the hardest problems in networking: how to communicate when you cannot guarantee a
                connection at the moment you want to communicate.</p>

            <h2>A Different Kind of Network</h2>
            <p>The normal Internet aims for continuity. DTN aims for survival.</p>

            <p>Instead of assuming the sender and receiver are connected at the same time, DTN assumes the opposite.
                Every spacecraft, satellite, ground station, or relay becomes a temporary “checkpoint.” Data is packaged
                into bundles and held there — however long it takes — until the next route opens. At each stage, another
                node stores and forwards the bundle.</p>

            <blockquote>
                "If the environment cannot match your protocol’s expectations, change the protocol — not the
                environment."
            </blockquote>

            <p>This one shift — from “real-time packet delivery” to “long-term responsibility for delivery” — is what
                makes space networking possible.</p>

            <h2>Why This Matters More Now Than Ever</h2>
            <p>For years, DTN was something only deep-space missions used. But as humanity begins building a space
                infrastructure — satellites working as networks, lunar stations, Mars missions, optical communication
                links — DTN becomes the foundation.</p>

            <p>And the driving force isn’t convenience. It’s engineering pressure.</p>

            <p>Future missions will not have one spacecraft talking to Earth. They will have networks talking to
                networks: rovers talking to orbiters, orbiters talking to relays, relays talking to stations, and
                stations talking to Earth. DTN allows those nodes to cooperate without assuming perfect conditions.</p>

            <p>In other words, DTN shifts space communication from a “radio link” model to a true network model.</p>

            <h2>What Engineers Should Learn From DTN</h2>
            <p>The most important takeaway isn’t about space. It’s about how we build software. When the Internet works
                perfectly, it teaches the wrong lessons. It makes us believe:</p>

            <ul>
                <li>Failures are rare</li>
                <li>Connections are reliable</li>
                <li>Retries are automatic</li>
            </ul>

            <p>In real systems — and certainly in distributed ones — that is not true.</p>

            <p>DTN is what networking looks like when designers accept the world as it is, rather than as the protocol
                would prefer it to be. It embraces:</p>

            <ul>
                <li>Delayed success over immediate failure</li>
                <li>Progress over timeout</li>
                <li>Resilience over elegance</li>
            </ul>

            <p>Those are the values modern backend, security, and distributed-system engineers need more than ever. It
                answers the question: <em>“how do we build systems that continue working even when everything goes
                    wrong?”</em></p>

            <div class="references">
                <h3>References</h3>
                <ul>
                    <li><a href="#" target="_blank">NASA — Delay/Disruption-Tolerant Networking Overview</a></li>
                    <li><a href="#" target="_blank">NASA — Space Communications and DTN Mission Resources</a></li>
                    <li><a href="#" target="_blank">NASA JPL — Interplanetary Overlay Network (ION-DTN)</a></li>
                    <li><a href="#" target="_blank">Scientific literature on DTN and interplanetary networking</a></li>
                </ul>
            </div>
        </div>
    ` }} />
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-content-wrapper { font-family: 'Inter', sans-serif; }
        .blog-content-wrapper h1 { font-size: 2.2rem; font-weight: 800; color: white; margin-bottom: 2rem; line-height: 1.25; padding-top: 1rem; }
        .blog-content-wrapper h2 { font-size: 1.6rem; font-weight: 700; color: white; margin-top: 2.5rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
        .blog-content-wrapper h3 { font-size: 1.3rem; font-weight: 600; color: #06b6d4; margin-top: 1.5rem; margin-bottom: 0.8rem; }
        .blog-content-wrapper p { margin-bottom: 1.5rem; line-height: 1.8; color: #cbd5e1; font-size: 1.05rem; }
        .blog-content-wrapper a { color: #3b82f6; text-decoration: underline; text-underline-offset: 4px; }
        .blog-content-wrapper a:hover { color: #60a5fa; }
        .blog-content-wrapper ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; color: #cbd5e1; font-size: 1.05rem; line-height: 1.8; }
        .blog-content-wrapper li { margin-bottom: 0.5rem; }
        .blog-content-wrapper blockquote { border-left: 4px solid #3b82f6; padding-left: 1rem; margin: 1.5rem 0; font-style: italic; color: #94a3b8; background: rgba(59,130,246,0.05); padding: 1rem; border-radius: 0.5rem; }
        .blog-content-wrapper strong { color: white; font-weight: 600; }
        .blog-tag { display: inline-block; background: rgba(6,182,212,0.1); color: #06b6d4; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-right: 0.5rem; }
        .article-meta { display: flex; align-items: center; gap: 1rem; font-size: 0.9rem; color: #94a3b8; margin-bottom: 1rem; flex-wrap: wrap; }
        .article-header { margin-bottom: 2.5rem; }
        .toc { background: #1a222a; padding: 1.5rem; border-radius: 0.75rem; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 2.5rem; }
        .toc h4 { font-size: 1.1rem; font-weight: 600; color: white; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .references h3 { margin-bottom: 1rem; color: white; border-bottom: 0; }
        .references ul { font-size: 0.95rem; }
        ` }} />
      <Footer />
    </main>
  );
}
