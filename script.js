// Responsive Navbar Hamburger
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (
            navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Button click handlers
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Handle specific button actions
        if (this.textContent.includes('JOIN US')) {
            alert('Thank you for your interest! Our team will contact you soon.');
        } else if (this.textContent.includes('REQUEST A DEMO')) {
            alert('Demo request received! We\'ll schedule a personalized demo for you.');
        }
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.bg-shape');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.hero-content, .hero-visual');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// School bus interactive effects
const schoolBus = document.querySelector('.school-bus');
const busImage = document.querySelector('.bus-image');
if (schoolBus && busImage) {
    schoolBus.addEventListener('mouseenter', () => {
        busImage.style.transform = 'rotateY(-15deg) rotateX(5deg) scale(1.1)';
        busImage.style.transition = 'transform 0.3s ease';
    });
    
    schoolBus.addEventListener('mouseleave', () => {
        busImage.style.transform = 'rotateY(-15deg) rotateX(5deg) scale(1)';
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Form validation for future forms
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can go here
}, 16)); // ~60fps

// Statistics counter animation
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = stat.textContent;
        const isPlus = target.includes('+');
        const isK = target.includes('K');
        
        let numericValue;
        if (isK) {
            numericValue = parseInt(target.replace('K+', '').replace('K', '')) * 1000;
        } else {
            numericValue = parseInt(target.replace('+', ''));
        }
        
        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue;
            if (isK) {
                displayValue = Math.floor(current / 1000) + 'K';
            } else {
                displayValue = Math.floor(current);
            }
            
            if (isPlus) {
                displayValue += '+';
            }
            
            stat.textContent = displayValue;
        }, 30);
    });
}

// Intersection Observer for statistics
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe statistics section
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.statistics-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Pricing toggle functionality
    const toggleSwitch = document.querySelector('.toggle-switch');
    if (toggleSwitch) {
        toggleSwitch.addEventListener('click', () => {
            toggleSwitch.classList.toggle('active');
            
            // Update pricing based on toggle state
            const isAnnual = toggleSwitch.classList.contains('active');
            updatePricing(isAnnual);
        });
    }
});

// Update pricing based on billing period
function updatePricing(isAnnual) {
    const prices = document.querySelectorAll('.plan-price');
    const buttons = document.querySelectorAll('.plan-button');
    
    if (isAnnual) {
        // Show annual pricing (with discount)
        prices[0].textContent = '#2.5k /month';
        prices[1].textContent = '#6k /month';
        prices[2].textContent = '#8k /month';
        prices[3].textContent = '#1m /month';
        
        // Update toggle labels
        document.querySelectorAll('.toggle-label').forEach((label, index) => {
            if (index === 0) label.textContent = 'Bill Monthly';
            if (index === 1) label.textContent = 'Bill Annually';
        });
    } else {
        // Show monthly pricing
        prices[0].textContent = '#300k /month';
        prices[1].textContent = '#700k /month';
        prices[2].textContent = '#900k /month';
        prices[3].textContent = '#1.2 million /month';
        
        // Update toggle labels
        document.querySelectorAll('.toggle-label').forEach((label, index) => {
            if (index === 0) label.textContent = 'Bill Monthly';
            if (index === 1) label.textContent = 'Bill Annually';
        });
    }
}

// Add loading state styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #e3f2fd 0%, #ffffff 50%, #f3e5f5 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading MySchoolBus...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Inter', sans-serif;
        font-size: 1.2rem;
        color: #0395D3;
        z-index: 10000;
    }
`;
document.head.appendChild(loadingStyles);

// Console welcome message
console.log(`
🚌 Welcome to MySchoolBus! 🚌
Safe, Smart School Bus Tracking for Schools

Features:
• Real-time GPS tracking
• Biometric attendance
• Instant parent alerts
• Mobile-friendly platform

For support: contact@myschoolbus.com
`);

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.firstName || !data.lastName || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
} 