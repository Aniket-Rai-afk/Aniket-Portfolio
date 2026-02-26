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
                <span class="blog-tag">Outage Analysis</span>
                <span><i class="fa-regular fa-calendar"></i> Nov 15, 2025</span>
                <span id="read-time"><i class="fa-regular fa-clock"></i> 8 min read</span>
            </div>
            <h1 class="article-title">When Cloudflare Went Down — A Deep Technical Breakdown of the November 2025
                Internet Outage</h1>
        </header>

        <!-- TOC -->
        <nav class="toc">
            <h4>Table of Contents</h4>
            <ul id="toc-list"></ul>
        </nav>

        <div class="article-content">
            <p>On November 14, 2025, a significant portion of the internet went dark. Websites loaded indefinitely, APIs
                timed out, and Discord messages failed to send. The culprit? A massive outage at Cloudflare, the
                backbone for nearly 20% of the web. As a cybersecurity engineer, incidents like these are essentially
                "unplanned chaos engineering experiments" at a global scale. Here is a technical breakdown of what
                happened, why the failovers failed, and what we can learn.</p>

            <h2>The Trigger: Updates to the Control Plane</h2>
            <p>According to Cloudflare's post-mortem, the incident began during a standard maintenance window. The
                engineering team was rolling out an update to their highly distributed <strong>Control Plane</strong>.
                The Control Plane is responsible for configuration distribution—telling the thousands of edge servers
                worldwide how to handle requests (DNS records, WAF rules, routing tables).</p>

            <p>The update contained a subtle logic error in the BGP (Border Gateway Protocol) route advertisement code.
                This code is crucial for Anycast routing, which allows Cloudflare to announce the same IP address from
                multiple locations.</p>

            <h3>The Code That Broke the Web</h3>
            <p>While the exact proprietary code wasn't released, the logic failure resembled a classic
                <strong>split-brain scenario</strong> in distributed systems. The new configuration caused edge data
                centers to withdraw their BGP routes, believing they were unhealthy.
            </p>

            <pre><code class="language-python"># Pseudocode representation of the logic flow failure
def health_check(node_status):
    # The bug: If latency is null (timeout), it defaulted to 'CRITICAL' 
    # instead of 'RETRY', triggering a route withdrawal.
    if node_status.latency is None:
        return status.CRITICAL  <-- The fatal flaw
    return status.OK
</code></pre>

            <p>Because the update was pushed to the "Canary" region (a subset of servers) first, it should have been
                caught. However, the bug only triggered under high latency conditions—conditions that weren't present in
                the quiet test environment but were rampant in the live production traffic.</p>

            <h2>The Cascade Failure</h2>
            <p>Once the routes were withdrawn, traffic automatically shifted to the remaining "healthy" data centers.
                This created a <strong>thundering herd problem</strong>.</p>
            <ul>
                <li><strong>Phase 1:</strong> 30% of data centers went offline due to the bad config.</li>
                <li><strong>Phase 2:</strong> Traffic rerouted to standard load balancers.</li>
                <li><strong>Phase 3:</strong> The surviving 70% of infrastructure was overwhelmed by 100% of the traffic
                    load, causing CPU spikes and memory exhaustion.</li>
            </ul>

            <blockquote>
                "Resiliency is not just about having backups; it's about the surviving nodes being able to handle the
                load of the failed ones."
            </blockquote>

            <h2>Global Impact & Recovery</h2>
            <p>Services like Discord, Notion, and Shopify saw downtime. Interestingly, AWS and Azure infrastructure
                remained up, but the <em>dns entry points</em> managed by Cloudflare were unreachable. This highlights a
                critical reminder for critical infrastructure: <strong>Separation of Concerns</strong>.</p>

            <p>Cloudflare engineers had to manually access the backbone network via out-of-band management console
                (serial console access) because their own internal tools (which sat behind Cloudflare Access) were also
                inaccessible. This "locked out of the house" scenario delayed the rollback by approximately 45 minutes.
            </p>

            <h2>Lessons for Software & Security Engineers</h2>

            <h3>1. The "Break-Glass" Mechanism</h3>
            <p>Don't put your administrative tools behind the same single-point-of-failure as your production traffic.
                If your Identity Provider (IdP) goes down, do you have a local admin account? If your VPN is down, do
                you have serial access?</p>

            <h3>2. Staged Rollouts are Non-Negotiable</h3>
            <p>A "Canary" deployment is useless if the traffic profile doesn't match production. Shadow traffic
                testing—replaying real user traffic against the new version without serving it to users—could have
                detected the latency-triggered bug.</p>

            <h3>3. Graceful Degradation</h3>
            <p>When APIs fail, your frontend should not white-screen. It should show cached content or a friendly error.
                Implement <strong>Circuit Breakers</strong> in your code (e.g., using libraries like Resilience4j or
                Polly) to stop spamming a dead service.</p>

            <h2>Conclusion</h2>
            <p>The 2025 Cloudflare outage was a masterclass in distributed systems failure. It reminded us that
                reliability is a feature, not a guarantee. As we build more complex dependencies, our understanding of
                the underlying "plumbing" of the internet—BGP, DNS, and TCP/IP—becomes our most valuable asset.</p>

            <div class="references">
                <h3>References</h3>
                <ul>
                    <li><a href="#">Cloudflare System Status History</a></li>
                    <li><a href="#">Google SRE Book — Chapter on Managing Incidents</a></li>
                    <li><a href="#">RFC 4271 - A Border Gateway Protocol 4 (BGP-4)</a></li>
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
