function initFooterYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

function initMobileNavActiveTab() {
    const mobileTabs = document.querySelectorAll('.mobile-tabs .tab-item');
    let currentPage = window.location.pathname.split('/').pop() || 'index_mobile.html';

    mobileTabs.forEach(tab => {
        const tabTarget = tab.getAttribute('href');
        tab.classList.remove('active');
        tab.removeAttribute('aria-current');
        if (tabTarget === currentPage) {
            tab.classList.add('active');
            tab.setAttribute('aria-current', 'page');
        }
    });
}

/* Intersection Observer for fade-in-on-scroll */
function initScrollAnimations() {
    const sections = document.querySelectorAll('.content-section .section-container');
    if (!sections.length || !('IntersectionObserver' in window)) return;

    sections.forEach(s => {
        s.style.opacity = '0';
        s.style.transform = 'translateY(20px)';
        s.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    sections.forEach(s => observer.observe(s));
}

/* Header shrink on scroll */
function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;
    let lastScroll = 0;
    const threshold = 60;

    window.addEventListener('scroll', () => {
        const current = window.pageYOffset;
        if (current > threshold) {
            header.style.boxShadow = '0 4px 20px -4px rgba(0,51,102,0.12)';
        } else {
            header.style.boxShadow = '0 4px 20px -4px rgba(0,51,102,0.08)';
        }
        lastScroll = current;
    }, { passive: true });
}

/* Login page toggle (if on login page) */
function initLoginToggle() {
    const toggleBtn = document.getElementById('auth-toggle-btn');
    const titleEl = document.getElementById('auth-title');
    const submitBtn = document.getElementById('auth-submit-btn');
    const forgotEl = document.getElementById('forgot-link');

    if (!toggleBtn) return;

    let isSignUp = false;

    toggleBtn.addEventListener('click', () => {
        isSignUp = !isSignUp;
        if (isSignUp) {
            titleEl.textContent = 'Create your client account';
            submitBtn.textContent = 'Create Account';
            toggleBtn.textContent = 'Sign In';
            toggleBtn.previousSibling.textContent = 'Already have an account? ';
            if (forgotEl) forgotEl.style.display = 'none';
        } else {
            titleEl.textContent = 'Sign in to your account';
            submitBtn.textContent = 'Sign In';
            toggleBtn.textContent = 'Sign Up';
            toggleBtn.previousSibling.textContent = "Don't have an account? ";
            if (forgotEl) forgotEl.style.display = '';
        }
    });
}

/* Password visibility toggle */
function initPasswordToggle() {
    const toggleBtns = document.querySelectorAll('.toggle-password');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                btn.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
            } else {
                input.type = 'password';
                btn.innerHTML = '<i class="fa-regular fa-eye"></i>';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initFooterYear();
    initMobileNavActiveTab();
    initScrollAnimations();
    initHeaderScroll();
    initLoginToggle();
    initPasswordToggle();
});

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        initMobileNavActiveTab();
    }
});