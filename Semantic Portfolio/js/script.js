const root = document.documentElement;
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.nav-list a');
const themeToggle = document.querySelector('.theme-toggle');
const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');
const revealItems = document.querySelectorAll('.reveal');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  if (themeToggle) {
    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
  }
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    siteNav.classList.toggle('is-open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 767) {
        navToggle.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('is-open');
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
      navToggle.focus();
    }
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please complete all fields before sending your message.';
      formStatus.style.color = 'var(--muted-text)';
      return;
    }

    formStatus.textContent = 'Thanks for reaching out. Please email me directly at sandesh@example.com.';
    formStatus.style.color = 'var(--secondary-color)';
    form.reset();
  });
}

initializeTheme();
