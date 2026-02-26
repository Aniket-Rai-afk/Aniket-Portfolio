// Blog Data Configuration
const blogPosts = [
    {
        id: 'starlink-mesh-dec-2025',
        title: "How Starlink Handles Internet in Low Earth Orbit — My Deep Dive Into Mesh Networking in Space",
        summary: "Starlink doesn’t just provide internet from space. It routes the internet in space. A deep dive into laser crosslinks, orbital mesh networking, and how they solve congestion in LEO.",
        date: "2025-12-07",
        tags: ["Space Tech", "Networking", "Cloud Architecture"],
        readTime: "8 min read",
        link: "posts/starlink-mesh.html"
    },
    {
        id: 'midnight-blizzard-oct-2024',
        title: "When Identity Became the New Attack Surface — My Technical Breakdown of the Midnight Blizzard Microsoft Breach",
        summary: "They didn't break a firewall or exploit a zero-day. They forged an identity. A breakdown of the Microsoft Midnight Blizzard incident showing why identity is the new perimeter.",
        date: "2024-10-27",
        tags: ["Identity Security", "Cloud Security", "Breach Analysis"],
        readTime: "7 min read",
        link: "posts/midnight-blizzard.html"
    },
    {
        id: 'crowdstrike-outage-nov-2024',
        title: "When One Update Took Down the World — My Technical Breakdown of the CrowdStrike Global Outage",
        summary: "Flights canceled, banks offline, and millions of BSODs. A deep look at how a single kernel driver update crashed the modern world.",
        date: "2024-11-22",
        tags: ["Security", "Infrastructure", "Kernel"],
        readTime: "10 min read",
        link: "posts/crowdstrike-outage.html"
    },
    {
        id: 'nasa-dtn-oct-2025',
        title: "How NASA Routes Internet in Space — The Real Engineering Behind Delay-Tolerant Networking",
        summary: "When people talk about “Internet in space,” they usually imagine a Wi-Fi router on a satellite. The real story is far more interesting. NASA’s solution is Delay-Tolerant Networking (DTN), which solves the problem of communicating without guaranteed connections.",
        date: "2025-10-15",
        tags: ["Networking", "Space Tech", "Engineering"],
        readTime: "6 min read",
        link: "posts/nasa-dtn.html"
    },
    {
        id: 'cloudflare-outage-nov-2025',
        title: "When Cloudflare Went Down — A Deep Technical Breakdown of the November 2025 Internet Outage",
        summary: "A clear, research-based breakdown of the massive Cloudflare outage: what caused it, which global systems failed, how Cloudflare recovered, and what developers and security engineers should learn from it.",
        date: "2025-11-15",
        tags: ["Cloud", "Security", "Outage Analysis"],
        readTime: "8 min read",
        link: "posts/cloudflare-outage.html"
    },
    // Add more posts here
];

// DOM Elements
const blogList = document.getElementById('blog-list');
const searchInput = document.getElementById('search-input');
const tagsContainer = document.getElementById('tags-filter');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // === Dark Mode Toggle Logic ===
    const toggleBtn = document.getElementById('theme-toggle');
    const toggleIcon = toggleBtn ? toggleBtn.querySelector('i') : null;
    const body = document.documentElement; // html tag

    // 1. Check Saved Theme
    const savedTheme = localStorage.getItem('blog-theme') || 'light';
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
        }
    }

    // 2. Event Listener
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                localStorage.setItem('blog-theme', 'light');
                if (toggleIcon) {
                    toggleIcon.classList.remove('fa-sun');
                    toggleIcon.classList.add('fa-moon');
                }
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('blog-theme', 'dark');
                if (toggleIcon) {
                    toggleIcon.classList.remove('fa-moon');
                    toggleIcon.classList.add('fa-sun');
                }
            }
        });
    }

    // === Blog Listing Logic ===
    if (blogList) {
        renderTags();
        renderPosts(blogPosts);

        // Search & Filter
        if (searchInput) {
            searchInput.addEventListener('input', (e) => filterPosts(e.target.value));
        }
    }

    // === Article Page Logic ===

    // Auto-Generate Table of Contents
    const tocList = document.getElementById('toc-list');
    if (tocList) {
        generateTOC(tocList);
    }

    // Calculate Reading Time dynamically
    const articleContent = document.querySelector('.article-content');
    const readTimeEl = document.getElementById('read-time');
    if (articleContent && readTimeEl) {
        const words = articleContent.innerText.split(' ').length;
        const minutes = Math.ceil(words / 200);
        readTimeEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${minutes} min read`;
    }
});

// Render Blog Posts
function renderPosts(posts) {
    if (!blogList) return;
    blogList.innerHTML = '';

    if (posts.length === 0) {
        blogList.innerHTML = '<p class="no-results">No posts found matching your criteria.</p>';
        return;
    }

    // Sort by Date (Newest First)
    const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedPosts.forEach(post => {
        const dateObj = new Date(post.date);
        const dateStr = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        const card = document.createElement('article');
        card.className = 'blog-card';
        card.innerHTML = `
            <div class="card-meta">
                <span>${dateStr}</span>
                <span>•</span>
                <span>${post.readTime}</span>
                ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
            </div>
            <h2><a href="${post.link}">${post.title}</a></h2>
            <p>${post.summary}</p>
            <a href="${post.link}" class="read-more-link">Read Analysis <i class="fa-solid fa-arrow-right"></i></a>
        `;
        blogList.appendChild(card);
    });
}

// Render Tags
function renderTags() {
    if (!tagsContainer) return;
    const allTags = new Set();
    blogPosts.forEach(post => post.tags.forEach(tag => allTags.add(tag)));

    const allBtn = document.createElement('button');
    allBtn.className = 'tag-btn active';
    allBtn.innerText = 'All';
    allBtn.onclick = () => filterByTag('All', allBtn);
    tagsContainer.appendChild(allBtn);

    allTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-btn';
        btn.innerText = tag;
        btn.onclick = () => filterByTag(tag, btn);
        tagsContainer.appendChild(btn);
    });
}

// Filter Logic
let currentTag = 'All';

function filterPosts(searchTerm = '') {
    const term = searchTerm.toLowerCase();

    const filtered = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(term) || post.summary.toLowerCase().includes(term);
        const matchesTag = currentTag === 'All' || post.tags.includes(currentTag);
        return matchesSearch && matchesTag;
    });

    renderPosts(filtered);
}

function filterByTag(tag, btnElement) {
    currentTag = tag;

    // Update active state
    document.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    // Re-filter with current search term
    filterPosts(searchInput ? searchInput.value : '');
}

// Generate Table of Contents
function generateTOC(tocList) {
    const headers = document.querySelectorAll('.article-content h2, .article-content h3');
    if (headers.length === 0) return;

    headers.forEach((header, index) => {
        const id = header.id || `header-${index}`;
        header.id = id;

        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.innerText = header.innerText;

        // Indent h3
        if (header.tagName === 'H3') {
            li.style.marginLeft = '1rem';
            li.style.listStyle = 'circle';
        }

        li.appendChild(link);
        tocList.appendChild(li);

        // Smooth scroll adjustment for fixed navbar
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(id);
            if (target) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}
