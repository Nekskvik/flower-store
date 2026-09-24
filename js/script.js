// ===== HEADER SCROLL STATE =====
const header = document.getElementById('header');
function updateHeader() {
    if (window.pageYOffset > 40) {
    header.classList.add('scrolled');
    } else {
    header.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', updateHeader);
updateHeader();

// ===== BURGER / MOBILE NAV =====
const burger = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('overlay');

function toggleNav() {
    burger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    overlay.classList.toggle('show');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
}

burger?.addEventListener('click', toggleNav);
overlay?.addEventListener('click', toggleNav);
mobileNav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
    if (mobileNav.classList.contains('open')) toggleNav();
    });
});

// ===== PARALLAX =====
const heroBg = document.getElementById('heroBg');
const decorBg = document.getElementById('decorBg');
const benefitBg = document.getElementById('benefitBg');

function parallax() {
    const scrolled = window.pageYOffset;
    const wh = window.innerHeight;

    if (heroBg) {
    heroBg.style.transform = `translateY(${scrolled * 0.35}px)`;
    }

    [decorBg, benefitBg].forEach(bg => {
    if (!bg) return;
    const rect = bg.parentElement.getBoundingClientRect();
    if (rect.top < wh && rect.bottom > 0) {
        const offset = (scrolled - (rect.top + scrolled - wh * 0.5)) * 0.15;
        bg.style.transform = `translateY(${offset}px)`;
    }
    });
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
    requestAnimationFrame(() => { parallax(); ticking = false; });
    ticking = true;
    }
});

// ===== REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// ===== ACCORDION =====
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
    const item = header.parentElement;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
    });
});

// ===== CAROUSEL =====
const track = document.getElementById('carouselTrack');
const slides = track ? track.children : [];
let currentIndex = 0;

function updateCarousel() {
    if (!track || slides.length === 0) return;
    const slideWidth = slides[0].offsetWidth + 40;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

document.getElementById('nextBtn')?.addEventListener('click', () => {
    currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
    updateCarousel();
});

document.getElementById('prevBtn')?.addEventListener('click', () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
    updateCarousel();
});

window.addEventListener('resize', updateCarousel);

let autoRotate = setInterval(() => {
    if (slides.length > 1) {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
    }
}, 4500);

const carousel = document.querySelector('.logo-carousel');
carousel?.addEventListener('mouseenter', () => clearInterval(autoRotate));
carousel?.addEventListener('mouseleave', () => {
    autoRotate = setInterval(() => {
    if (slides.length > 1) {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }
    }, 4500);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
    });
});

parallax();
updateCarousel();