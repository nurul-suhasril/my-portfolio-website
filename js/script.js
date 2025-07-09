// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initNavbarScroll();
    initTypingEffect();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = mobileMenu.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    
    // Combine all scroll links
    const scrollLinks = [...navLinks, ...heroButtons];
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an internal link (starts with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-content');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formInputs = contactForm.querySelectorAll('input, textarea');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (validateForm(formData)) {
            handleFormSubmission(formData, submitButton);
        }
    });

    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Form Validation
function validateForm(data) {
    let isValid = true;

    // Name validation
    if (!data.name.trim()) {
        showFieldError('name', 'Name is required');
        isValid = false;
    } else if (data.name.trim().length < 2) {
        showFieldError('name', 'Name must be at least 2 characters');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Subject validation
    if (!data.subject.trim()) {
        showFieldError('subject', 'Subject is required');
        isValid = false;
    }

    // Message validation
    if (!data.message.trim()) {
        showFieldError('message', 'Message is required');
        isValid = false;
    } else if (data.message.trim().length < 10) {
        showFieldError('message', 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

// Individual field validation
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;

    switch (fieldName) {
        case 'name':
            if (!value) {
                showFieldError(fieldName, 'Name is required');
                return false;
            } else if (value.length < 2) {
                showFieldError(fieldName, 'Name must be at least 2 characters');
                return false;
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                showFieldError(fieldName, 'Email is required');
                return false;
            } else if (!emailRegex.test(value)) {
                showFieldError(fieldName, 'Please enter a valid email address');
                return false;
            }
            break;

        case 'subject':
            if (!value) {
                showFieldError(fieldName, 'Subject is required');
                return false;
            }
            break;

        case 'message':
            if (!value) {
                showFieldError(fieldName, 'Message is required');
                return false;
            } else if (value.length < 10) {
                showFieldError(fieldName, 'Message must be at least 10 characters');
                return false;
            }
            break;
    }

    clearFieldError(field);
    return true;
}

// Show field error
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    clearFieldError(field);
    
    // Add error styling
    field.style.borderColor = '#ef4444';
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    formGroup.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const existingError = formGroup.querySelector('.error-message');
    
    if (existingError) {
        existingError.remove();
    }
    
    field.style.borderColor = '#e5e7eb';
}

// Handle form submission
function handleFormSubmission(formData, submitButton) {
    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    submitButton.disabled = true;

    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        document.getElementById('contact-form').reset();
    }, 2000);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styling
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add/remove shadow based on scroll position
        if (currentScrollY > 100) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// Typing Effect for Hero Title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    const highlight = heroTitle.querySelector('.highlight');
    
    if (highlight) {
        // Simple fade-in animation for the highlight
        highlight.style.opacity = '0';
        highlight.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            highlight.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            highlight.style.opacity = '1';
            highlight.style.transform = 'translateY(0)';
        }, 500);
    }
}

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.onclick = scrollToTop;
    
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 999;
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Hover effect
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
}

// Initialize scroll to top button
addScrollToTopButton();

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
window.addEventListener('scroll', debounce(function() {
    // Any scroll-based animations or effects can be optimized here
}, 16)); // ~60fps

// Preload images when they come into view
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if there are lazy images
initLazyLoading();

// Console message for developers
console.log('%c🚀 Portfolio Website', 'color: #3b82f6; font-size: 18px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #6b7280; font-size: 14px;');
console.log('%cFeel free to explore the code!', 'color: #10b981; font-size: 14px;');