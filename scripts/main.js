// ===================================
// Smooth Scrolling Navigation
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
});

// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = this.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (navLinks && navLinks.classList.contains('active')) {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            
            // Reset hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// ===================================
// Scroll Animations with Intersection Observer
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.course-card, .benefit-card, .feature-card, .stat-item, .comparison-side'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// Active Navigation Link Highlight
// ===================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    const scrollPosition = window.scrollY + navHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = '';
                link.style.background = '';
            });
            
            // Add active styling to current section link
            const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.style.color = '#2563eb';
                activeLink.style.background = '#f3f4f6';
            }
        }
    });
});


// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.75rem',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
        color: '#ffffff',
        fontWeight: '500',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease',
        maxWidth: '400px'
    });
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ===================================
// Navbar Background on Scroll
// ===================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// ===================================
// Counter Animation for Stats
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const suffix = element.dataset.suffix || '';
    const startTime = performance.now();
    
    // Easing function for smooth animation
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.floor(start + (target - start) * easedProgress);
        
        // Update text content
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Ensure final value is set
            element.textContent = target + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Observe stat items for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const h4 = entry.target.querySelector('h4');
            if (h4) {
                const text = h4.textContent.trim();
                // Extract number and suffix more accurately
                const match = text.match(/^(\d+)(.*)$/);
                if (match) {
                    const number = parseInt(match[1]);
                    const suffix = match[2] || '';
                    
                    // Store original values
                    h4.dataset.suffix = suffix;
                    h4.dataset.target = number;
                    
                    // Set initial value to prevent layout shift
                    h4.textContent = '0' + suffix;
                    
                    // Start animation
                    animateCounter(h4, number);
                    entry.target.dataset.animated = 'true';
                }
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => statsObserver.observe(item));
});

// ===================================
// Lazy Loading Images (Browser native)
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});

// ===================================
// Course Card Hover Effect Enhancement
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeft = '4px solid #2563eb';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeft = 'none';
        });
    });
});

// ===================================
// Back to Top Button (Optional)
// ===================================
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    
    Object.assign(button.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        fontSize: '1.5rem',
        border: 'none',
        cursor: 'pointer',
        opacity: '0',
        visibility: 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        zIndex: '999'
    });
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// ===================================
// Dynamic Numbers Animation
// ===================================
function generateRandomCalculation(operation) {
    let num1, num2, result, operator;
    
    switch(operation) {
        case 'multiply':
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 20) + 1;
            result = num1 * num2;
            operator = '×';
            break;
        case 'add':
            num1 = Math.floor(Math.random() * 50) + 1;
            num2 = Math.floor(Math.random() * 50) + 1;
            result = num1 + num2;
            operator = '+';
            break;
        case 'divide':
            num2 = Math.floor(Math.random() * 12) + 2;
            result = Math.floor(Math.random() * 20) + 1;
            num1 = num2 * result;
            operator = '÷';
            break;
        case 'subtract':
            num1 = Math.floor(Math.random() * 50) + 20;
            num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
            result = num1 - num2;
            operator = '−';
            break;
    }
    
    return { num1, num2, result, operator };
}

function updateCalculation(calcLine, operation) {
    const calc = generateRandomCalculation(operation);
    const numberSpans = calcLine.querySelectorAll('.number');
    const operatorSpan = calcLine.querySelector('.operator');
    const resultSpan = calcLine.querySelector('.result');
    
    // Add fade out animation
    calcLine.style.opacity = '0';
    calcLine.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        // Update numbers
        if (numberSpans.length >= 2) {
            numberSpans[0].textContent = calc.num1;
            numberSpans[1].textContent = calc.num2;
        }
        if (operatorSpan) {
            operatorSpan.textContent = calc.operator;
        }
        if (resultSpan) {
            resultSpan.textContent = calc.result;
        }
        
        // Fade in with new numbers
        calcLine.style.opacity = '1';
        calcLine.style.transform = 'translateY(0)';
    }, 300);
}

function initializeDynamicCalculations() {
    const calcLine1 = document.querySelector('.calc-line-1');
    const calcLine2 = document.querySelector('.calc-line-2');
    const calcLine3 = document.querySelector('.calc-line-3');
    const calcLine4 = document.querySelector('.calc-line-4');
    
    if (!calcLine1 || !calcLine2 || !calcLine3 || !calcLine4) return;
    
    // Add transition styles
    [calcLine1, calcLine2, calcLine3, calcLine4].forEach(line => {
        line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
    
    // Array of calculations with their operations
    const calculations = [
        { element: calcLine1, operation: 'multiply' },
        { element: calcLine2, operation: 'add' },
        { element: calcLine3, operation: 'divide' },
        { element: calcLine4, operation: 'subtract' }
    ];
    
    let currentIndex = 0;
    
    // Function to update next calculation in cycle
    function updateNextCalculation() {
        const calc = calculations[currentIndex];
        updateCalculation(calc.element, calc.operation);
        
        // Move to next calculation
        currentIndex = (currentIndex + 1) % calculations.length;
    }
    
    // Start updating after initial animations (2 seconds)
    // Then update every 2 seconds, cycling through all calculations
    setTimeout(() => {
        updateNextCalculation();
        setInterval(updateNextCalculation, 2000);
    }, 2000);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for initial animations to complete
    setTimeout(initializeDynamicCalculations, 2000);
});

// ===================================
// Console Welcome Message
// ===================================
console.log('%c Welcome to Institute of Jolly Learners! ', 
    'background: #2563eb; color: #ffffff; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('Empowering young minds through innovative learning methods.');

