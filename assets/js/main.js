document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle */
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const isOpen = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.textContent = isOpen ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  /* Mega-menu: click-to-toggle for touch devices, alongside the CSS
     :hover/:focus-within behavior for pointer users. On mobile this
     trigger is hidden — a native <details> accordion takes over. */
  document.querySelectorAll('.nav-item').forEach(item => {
    const trigger = item.querySelector('.nav-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      item.classList.toggle('open');
    });
  });
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-item.open').forEach(item => {
      if (!item.contains(e.target)) item.classList.remove('open');
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-item.open').forEach(item => item.classList.remove('open'));
    }
  });

  /* Hero carousel — autoplay every 5s, pauses on hover, dots + click */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const carousel = document.querySelector('.hero-carousel');
  if (slides.length > 1) {
    let current = 0;
    let timer = null;

    function goTo(i) {
      slides[current].classList.remove('active');
      dots[current]?.classList.remove('active');
      current = i;
      slides[current].classList.add('active');
      dots[current]?.classList.add('active');
    }
    function next() { goTo((current + 1) % slides.length); }
    function start() { timer = setInterval(next, 5000); }
    function stop() { clearInterval(timer); }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); stop(); start(); });
    });
    if (carousel) {
      carousel.addEventListener('mouseenter', stop);
      carousel.addEventListener('mouseleave', start);
    }
    start();
  }

  /* Wishlist heart toggle */
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
    });
  });

  /* Scroll reveal — anything already in view at load is shown instantly
     rather than waiting on the async observer callback; only elements
     below the fold animate in on scroll. */
  const revealEls = document.querySelectorAll('.reveal');
  const hasIO = 'IntersectionObserver' in window;
  const io = hasIO ? new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 }) : null;

  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (!hasIO || rect.top < window.innerHeight * 0.92) {
      el.style.transition = 'none';
      el.classList.add('in');
    } else {
      io.observe(el);
    }
  });

  /* Newsletter form (front-end only) */
  const form = document.querySelector('.newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      if (input && input.value) {
        const original = btn.textContent;
        btn.textContent = 'Merci ✓';
        input.value = '';
        setTimeout(() => { btn.textContent = original; }, 2500);
      }
    });
  }

});
