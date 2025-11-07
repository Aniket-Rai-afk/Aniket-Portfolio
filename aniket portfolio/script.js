// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const roles = [
    'Cybersecurity Analyst',
    'Full-Stack Developer',
    'Python Developer',
    'Security Automation Engineer',
    'Ethical Hacker',
    'Network Security Specialist'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
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

// Smooth Scroll with Offset for Fixed Navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 247, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .cert-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ===== Modal Functionality (Experience + Projects) =====
const modals = {};
['coal-india','yhills','vit-stellar','malware',
 'ceh','powerbi','prod-mgmt','risk-mgmt'
].forEach(key => {
  const el = document.getElementById(`${key}-modal`);
  if (el) modals[key] = el;
});


function openModal(modal) {
  if (!modal) return;
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModal(modal) {
  if (!modal) return;
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';
}

// Open from timeline cards (experience)
document.querySelectorAll('.timeline-item').forEach(item => {
  const key = item.getAttribute('data-modal');
  const modal = modals[key];
  if (!modal) return;

  item.addEventListener('click', () => openModal(modal));
  const btn = item.querySelector('.view-details-btn');
  if (btn) btn.addEventListener('click', (e) => { e.stopPropagation(); openModal(modal); });
});

// Open from any button/link with data-open-modal (projects etc.)
document.querySelectorAll('[data-open-modal]').forEach(btn => {
  const key = btn.getAttribute('data-open-modal');
  const modal = modals[key];
  if (!modal) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(modal);
  });
});

// Close handlers
Object.values(modals).forEach(modal => {
  const closeBtn = modal.querySelector('.close');
  if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  Object.values(modals).forEach(m => { if (m.style.display === 'block') closeModal(m); });
});



// EmailJS Integration for Contact Form
// Initialize EmailJS with your public key
(function() {
    emailjs.init("3QNtVGYw7wuESBADB"); // Replace with your EmailJS public key
})();

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    formStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    formStatus.className = '';

    // Get form data
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_email: 'aniiket2004@gmail.com'
    };

    // Send email using EmailJS
    emailjs.send("service_jch7z9a", "template_ket11md", templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
            formStatus.className = 'success';
            contactForm.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        }, function(error) {
            console.log('FAILED...', error);
            formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again or email me directly.';
            formStatus.className = 'error';
            
            // Clear error message after 5 seconds
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        });
});

// Add animation to stats on scroll
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
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const numericValue = parseInt(finalValue);
        let currentValue = 0;
        const increment = numericValue / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                stat.textContent = finalValue;
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(currentValue) + (isPercentage ? '%' : '');
            }
        }, stepTime);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroShape = document.querySelector('.hero-shape');
    
    if (heroContent && window.innerWidth > 768) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (heroShape) {
        heroShape.style.transform = `translateY(${scrolled * 0.5}px) scale(${1 + scrolled * 0.0005})`;
    }
});

// Add hover effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Console message for curious developers
console.log('%c🔒 Cybersecurity Developer Portfolio', 'color: #00f7ff; font-size: 20px; font-weight: bold;');
console.log('%c👋 Hey there! Interested in the code? Check out my GitHub!', 'color: #7c3aed; font-size: 14px;');
console.log('%c🔗 https://github.com/Aniket-Rai-afk/Portfolio', 'color: #00f7ff; font-size: 14px;');

// Performance optimization: Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
// ===== Smooth Delayed Cursor (Centered Fix) =====
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.cursor-dot');
  if (!cursor) return;

  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;
  const delay = 0.15; // 0.1 = faster, 0.2 = slower follow

  // Track actual mouse position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animation loop for smooth delayed follow
  function animate() {
    // interpolate between current dot pos and mouse pos
    dotX += (mouseX - dotX) * delay;
    dotY += (mouseY - dotY) * delay;

    // directly position it centered on the cursor
    cursor.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;

    requestAnimationFrame(animate);
  }

  animate();

  // Fade when cursor leaves the page
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
});
