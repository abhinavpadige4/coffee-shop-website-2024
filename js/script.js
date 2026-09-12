/* Coffee Shop Website JavaScript */
/* Features: Mobile Navigation, Smooth Scrolling, Form Validation */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('primary-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const hamburger = navToggle.querySelector('.hamburger');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                const hamburger = navToggle.querySelector('.hamburger');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error states
            resetFormErrors();
            
            // Validate form
            if (validateForm()) {
                // Simulate form submission
                submitForm();
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                validateField(this);
            });
        });
    }
    
    // Add fade-in animation to sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Header shadow on scroll
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-shadow');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-shadow')) {
            // Scrolling down
            header.classList.add('scroll-shadow');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-shadow')) {
            // Scrolling up
            header.classList.remove('scroll-shadow');
        }
        
        lastScroll = currentScroll;
    });
});

// Form Validation Functions
function validateForm() {
    let isValid = true;
    
    // Name validation
    const nameInput = document.getElementById('name');
    if (!validateField(nameInput)) {
        isValid = false;
    }
    
    // Email validation
    const emailInput = document.getElementById('email');
    if (!validateField(emailInput)) {
        isValid = false;
    }
    
    // Message validation
    const messageInput = document.getElementById('message');
    if (!validateField(messageInput)) {
        isValid = false;
    }
    
    return isValid;
}

function validateField(input) {
    // Clear previous error
    clearError(input);
    
    let isValid = true;
    const value = input.value.trim();
    
    // Required fields
    if (input.hasAttribute('required') && !value) {
        showError(input, 'This field is required');
        isValid = false;
    }
    
    // Email validation
    if (input.type === 'email' && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            showError(input, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    // Name validation (at least 2 characters)
    if (input.id === 'name' && value && value.length < 2) {
        showError(input, 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Message validation (at least 10 characters)
    if (input.id === 'message' && value && value.length < 10) {
        showError(input, 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.textContent = message;
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
    }
}

function clearError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.textContent = '';
        input.classList.remove('error');
        input.removeAttribute('aria-invalid');
    }
}

function resetFormErrors() {
    const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
    formInputs.forEach(input => {
        clearError(input);
    });
    
    const successMessage = document.getElementById('form-success');
    if (successMessage) {
        successMessage.style.display = 'none';
        successMessage.textContent = '';
    }
}

function submitForm() {
    const successMessage = document.getElementById('form-success');
    if (successMessage) {
        successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        successMessage.style.display = 'block';
        
        // Reset form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.reset();
        }
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
}

// Add scroll shadow class to header CSS
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        header.scroll-shadow {
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    `;
    document.head.appendChild(style);
});