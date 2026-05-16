// ========== Theme Toggle ==========
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

function getTheme() {
  return document.documentElement.getAttribute('data-theme');
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// ========== Cursor Glow Effect ==========
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursorGlow.style.opacity = '1';
});

// ========== Scroll Animation ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .about-card, .skill-item, .project-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// ========== Smooth Nav Scroll Highlight ==========
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--text-primary)'
      : 'var(--text-secondary)';
  });
});

// ========== Skill Bar Animation on Scroll ==========
const skillBars = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'none';
      requestAnimationFrame(() => {
        entry.target.style.animation = 'fill-bar 1.2s ease-out forwards';
      });
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ========== Console Easter Egg ==========
console.log('%c✿ flowerdance', 'font-size: 24px; font-weight: bold; color: #7c5cfc;');
console.log('%c用代码把想法变成现实', 'font-size: 14px; color: #8888a0;');
