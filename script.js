/**
 * SUCCESS STORY - Main Script
 * Organized by features and functionality.
 */

// 1. Sticky Header Functionality
const initStickyHeader = () => {
    const header = document.querySelector('.header');
    if (!header) return;

    const handleScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
};

// 2. Mobile Menu System
const initMobileMenu = () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    if (!menuToggle || !navLinks) return;

    const openMenu = () => {
        navLinks.classList.add('active');
        document.body.classList.add('menu-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        if (navOverlay) {
            navOverlay.classList.add('active');
            navOverlay.setAttribute('aria-hidden', 'false');
        }
        // Switch to close icon
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-times';
    };

    const closeMenu = () => {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        if (navOverlay) {
            navOverlay.classList.remove('active');
            navOverlay.setAttribute('aria-hidden', 'true');
        }
        // Switch back to menu icon
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
    };

    menuToggle.addEventListener('click', () => {
        navLinks.classList.contains('active') ? closeMenu() : openMenu();
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when overlay is clicked
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Keyboard support (Escape key)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
            menuToggle.focus();
        }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });
};

// 3. Smooth Scrolling for Internal Links
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
};

// 4. Counter Animation (used in About Page)
const initCounters = () => {
    const counterSection = document.querySelector('.counter-section');
    if (!counterSection) return;

    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter-number');
        const speed = 200;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const inc = target / speed;

            const updateCount = () => {
                count += inc;
                if (count < target) {
                    counter.textContent = Math.ceil(count) + '+';
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target + '+';
                }
            };
            requestAnimationFrame(updateCount);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.4 });

    observer.observe(counterSection);
};

// 5. Initialize External Libraries (Swiper & AOS)
const initLibraries = () => {
    if (typeof Swiper === 'undefined') return;

    // Clients Slider
    if (document.querySelector('.clients-slider')) {
        new Swiper('.clients-slider', {
            loop: true,
            speed: 600,
            autoplay: { delay: 2200, disableOnInteraction: false, pauseOnMouseEnter: true },
            breakpoints: {
                320: { slidesPerView: 2, spaceBetween: 10 },
                576: { slidesPerView: 3, spaceBetween: 15 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 20 }
            }
        });
    }

    // Team Slider (About Page)
    if (document.querySelector('.team-slider')) {
        const handleTeamAutoplay = (swiper) => {
            window.innerWidth >= 992 ? swiper.autoplay.stop() : swiper.autoplay.start();
        };

        const teamSwiper = new Swiper('.team-slider', {
            loop: true,
            speed: 600,
            centeredSlides: true,
            grabCursor: true,
            autoplay: { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true },
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 14 },
                576: { slidesPerView: 1, spaceBetween: 14 },
                768: { slidesPerView: 2, spaceBetween: 16 },
                992: { slidesPerView: 3, spaceBetween: 16, centeredSlides: false }
            },
            on: {
                init: function() { handleTeamAutoplay(this); },
                resize: function() { handleTeamAutoplay(this); }
            }
        });
    }

    // Audience Slider
    if (document.querySelector('.audience-slider')) {
        new Swiper('.audience-slider', {
            loop: true,
            speed: 600,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            autoplay: { delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true },
            slidesPerView: 1,
            spaceBetween: 20
        });
    }

    // AOS Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            once: true,
            offset: 60,
            easing: 'ease-out-cubic',
        });
    }
};

// 6. Form Handling
const initForms = () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm && typeof Swal !== 'undefined') {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            Swal.fire({
                title: 'تم الإرسال بنجاح!',
                text: 'شكراً لتواصلك معنا، سيقوم فريقنا بالرد عليك قريباً.',
                icon: 'success',
                confirmButtonColor: '#D4AF37',
                confirmButtonText: 'حسناً',
                timer: 4000,
                timerProgressBar: true,
            });
            contactForm.reset();
        });
    }
};

// 7. Navigation Highlighting
const initNavHighlight = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

// Initialize Everything on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initMobileMenu();
    initSmoothScroll();
    initCounters();
    initLibraries();
    initForms();
    initNavHighlight();
});