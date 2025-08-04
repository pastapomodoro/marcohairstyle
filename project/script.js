// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn i');
    const overlay = document.getElementById('mobileOverlay');
    
    mobileNav.classList.toggle('active');
    
    if (mobileNav.classList.contains('active')) {
        menuBtn.className = 'fas fa-times';
        overlay.classList.add('active');
    } else {
        menuBtn.className = 'fas fa-bars';
        overlay.classList.remove('active');
    }
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn i');
    const overlay = document.getElementById('mobileOverlay');
    
    mobileNav.classList.remove('active');
    menuBtn.className = 'fas fa-bars';
    overlay.classList.remove('active');
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    closeMobileMenu();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const elementPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
        closeMobileMenu();
    });
});

// Booking Modal Functions
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('bookingModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeBookingModal();
    }
});

// Form Submission Handlers
function handleBookingSubmit(event) {
    event.preventDefault();
    alert('Grazie per la tua richiesta! Ti contatteremo presto per confermare l\'appuntamento.');
    closeBookingModal();
    event.target.reset();
}

function handleFormSubmit(event) {
    event.preventDefault();
    alert('Grazie per la tua richiesta! Ti contatteremo presto per confermare l\'appuntamento.');
    event.target.reset();
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Gallery item click handlers
document.querySelectorAll('.gallery-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        alert('Funzionalità gallery in arrivo!');
    });
});

// Intersection Observer for animations
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
    const animatedElements = document.querySelectorAll('.gallery-item, .about-text, .contact-info, .contact-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form validation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff6b6b';
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Per favore, compila tutti i campi obbligatori.');
        }
    });
});

// Phone number formatting
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.startsWith('39')) {
                value = '+' + value;
            } else if (!value.startsWith('+')) {
                value = '+39 ' + value;
            }
        }
        e.target.value = value;
    });
});

// Date input minimum date (today)
document.querySelectorAll('input[type="date"]').forEach(input => {
    const today = new Date().toISOString().split('T')[0];
    input.setAttribute('min', today);
});

// Time input business hours validation
document.querySelectorAll('input[type="time"]').forEach(input => {
    input.addEventListener('change', function(e) {
        const time = e.target.value;
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        
        // Business hours: 9:00 - 19:00 (Mon-Fri), 9:00 - 18:00 (Sat)
        const minTime = 9 * 60; // 9:00
        const maxTime = 19 * 60; // 19:00
        
        if (totalMinutes < minTime || totalMinutes > maxTime) {
            alert('Gli orari di apertura sono: Lun-Ven 9:00-19:00, Sabato 9:00-18:00');
            e.target.value = '';
        }
    });
});