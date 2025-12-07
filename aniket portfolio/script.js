// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot matches cursor position instantly
    if (cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    }

    // Outline follows with delay
    if (cursorOutline) {
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
    });
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const roles = [
    'Cybersecurity Engineer',
    'Security Operations Analyst',
    'Full-Stack Developer',
    'Ethical Hacker',
    'DevSecOps Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before next word
    }

    setTimeout(typeRole, typingSpeed);
}

// Start typing animation
typeRole();

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(2, 6, 23, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(2, 6, 23, 0.6)';
        navbar.style.boxShadow = 'none';
    }
});

// Hero Parallax
window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && window.innerWidth > 768) {
        const scrolled = window.scrollY;
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

// Stats Counter Animation
const statsSection = document.querySelector('.hero-stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            animateStats();
            statsAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const originalText = stat.textContent;
        const isK = originalText.toLowerCase().includes('k');
        const numericValue = parseFloat(originalText.replace(/[^0-9.]/g, '')) * (isK ? 1000 : 1);

        let currentValue = 0;
        const duration = 2000;
        const steps = 60;
        const increment = numericValue / steps;
        const stepTime = duration / steps;

        const counter = setInterval(() => {
            currentValue += increment;

            let displayValue;
            if (currentValue >= numericValue) {
                displayValue = originalText;
                clearInterval(counter);
            } else {
                // Reformat
                if (isK) {
                    displayValue = (currentValue / 1000).toFixed(1) + 'k+';
                } else {
                    displayValue = Math.floor(currentValue) + '+';
                }
            }
            stat.textContent = displayValue;
        }, stepTime);
    });
}

// ===== Modal Functionality =====
const modalIds = [
    'thq', 'coal-india', 'yhills', 'vit-stellar',
    'malware', 'ceh', 'powerbi', 'prod-mgmt', 'risk-mgmt'
];

const modals = {};
modalIds.forEach(key => {
    const el = document.getElementById(`${key}-modal`);
    if (el) modals[key] = el;
});

function openModal(modal) {
    if (!modal) return;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

// Open triggers
document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const key = trigger.getAttribute('data-open-modal');
        if (modals[key]) openModal(modals[key]);
    });
});

// Timeline triggers
document.querySelectorAll('.timeline-content').forEach(item => {
    item.addEventListener('click', () => {
        const key = item.getAttribute('data-modal');
        if (modals[key]) openModal(modals[key]);
    });
});

// Close triggers
document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', function () {
        const modal = this.closest('.modal');
        closeModal(modal);
    });
});

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        Object.values(modals).forEach(modal => {
            if (modal.style.display === 'flex') closeModal(modal);
        });
    }
});


// Initialization of EmailJS (Contact Form)
// Replace with your keys if needed, keeping existing logic
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("3QNtVGYw7wuESBADB");
    }
})();

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';

        const templateParams = {
            from_name: contactForm.querySelector('input[name="name"]').value,
            from_email: contactForm.querySelector('input[name="email"]').value,
            message: contactForm.querySelector('textarea[name="message"]').value,
            subject: 'Portfolio Contact'
        };

        emailjs.send("service_jch7z9a", "template_ket11md", templateParams)
            .then(() => {
                btn.textContent = 'Sent Successfully!';
                btn.style.background = '#10b981';
                contactForm.reset();
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = ''; // reset
                }, 3000);
            })
            .catch((err) => {
                console.error('Failed:', err);
                btn.textContent = 'Failed. Try again.';
                btn.style.background = '#ef4444';
            });
    });
}
