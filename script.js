// ============================
// Navigation Functionality
// ============================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================
// Active Navigation Link
// ============================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================
// Skill Bar Animation
// ============================

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const targetWidth = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

animateSkillBars();

// ============================
// Fade In Animation on Scroll
// ============================

function fadeInElements() {
    const elements = document.querySelectorAll('.project-card, .skill-category, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

fadeInElements();

// ============================
// Contact Form Handling
// ============================

const contactForm = document.getElementById('contactForm');

// Create message container for form feedback
const createMessageElement = (type, text) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = text;
    messageDiv.style.cssText = `
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        animation: fadeInUp 0.3s ease-out;
        background-color: ${type === 'success' ? 'rgba(39, 201, 63, 0.1)' : 'rgba(255, 45, 85, 0.1)'};
        border: 1px solid ${type === 'success' ? '#27c93f' : '#ff2d55'};
        color: ${type === 'success' ? '#27c93f' : '#ff2d55'};
    `;
    return messageDiv;
};

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Remove any existing messages
    const existingMessage = contactForm.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        const errorMessage = createMessageElement('error', 'Please fill in all fields');
        contactForm.appendChild(errorMessage);
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        const errorMessage = createMessageElement('error', 'Please enter a valid email address');
        contactForm.appendChild(errorMessage);
        return;
    }
    
    // Simulate form submission
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    const successMessage = createMessageElement('success', 'Thank you for your message! I\'ll get back to you soon.');
    contactForm.appendChild(successMessage);
    
    // Reset form
    contactForm.reset();
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
});

// ============================
// Dynamic Year in Footer
// ============================

function updateFooterYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }
}

updateFooterYear();

// ============================
// Keyboard Navigation
// ============================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ============================
// Performance: Reduce Motion
// ============================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.scrollBehavior = 'auto';
}

// ============================
// Loading Animation
// ============================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================
// Console Easter Egg
// ============================

console.log('%c🎸 Buffer Punk Portfolio 🎸', 'color: #ff2d55; font-size: 24px; font-weight: bold;');
console.log('%cLike what you see? Let\'s build something awesome together!', 'color: #00d9ff; font-size: 14px;');
console.log('%cEmail: hello@bufferpunk.com', 'color: #a1a1aa; font-size: 12px;');
