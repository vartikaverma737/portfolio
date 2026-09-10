// ===== Navbar scroll state =====
const nav = document.getElementById('nav');
const toTop = document.getElementById('to-top');

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    toTop.classList.toggle('visible', y > 500);
}, { passive: true });

// ===== Mobile menu =====
const burger = document.getElementById('nav-burger');
const links = document.getElementById('nav-links');

burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
});

links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        links.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
    });
});

// ===== Back to top =====
toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Scroll reveal =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Animated counters =====
function animateCount(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('en-US');
        if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-num').forEach(el => countObserver.observe(el));

// ===== Contact form (mailto fallback) =====
const form = document.getElementById('contact-form');
const msg = document.getElementById('form-msg');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            msg.textContent = 'Please fill in all fields before sending.';
            msg.className = 'form-msg err';
            return;
        }

        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:vermavartika58@gmail.com?subject=${subject}&body=${body}`;

        msg.textContent = 'Opening your email app to send...';
        msg.className = 'form-msg ok';
        form.reset();
    });
}