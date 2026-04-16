/* =========================================
   Studio Figura Wola — Interactions & Animations
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initHeroParticles();
  initLightbox();
  initSmoothScroll();
  initParallax();
});

/* --- Navbar scroll effect --- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 60) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initialize state
}

/* --- Mobile hamburger menu --- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileOverlay');
  const links = overlay.querySelectorAll('a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* --- Scroll-triggered animations (Intersection Observer) --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.anim-hidden');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* --- Hero floating particles --- */
function initHeroParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const particleCount = 30;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';

    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 6 + 4}s`;
    particle.style.animationDelay = `${Math.random() * 4}s`;
    particle.style.opacity = Math.random() * 0.5 + 0.1;

    fragment.appendChild(particle);
  }

  container.appendChild(fragment);
}

/* --- Gallery lightbox --- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item[data-lightbox]');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-lightbox');
      lightboxImage.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImage.src = ''; }, 300);
  }
}

/* --- Smooth scroll for anchor links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');

      if (href === '#') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --- Subtle parallax on hero --- */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg img');
  if (!heroBg) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const heroHeight = document.querySelector('.hero').offsetHeight;

        if (scrolled < heroHeight) {
          const parallaxSpeed = 0.3;
          heroBg.style.transform = `scale(1.1) translateY(${scrolled * parallaxSpeed}px)`;
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* --- Contact form handler --- */
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submitBtn');
  const originalText = btn.textContent;

  btn.textContent = 'Wysyłanie...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
  .then(async (response) => {
    let json = await response.json();
    if (response.status == 200) {
      btn.textContent = '✓ Wiadomość wysłana!';
      btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
      btn.style.opacity = '1';
      form.reset();
    } else {
      console.log(response);
      btn.textContent = 'Wystąpił błąd.';
      btn.style.background = '#ef4444';
    }
  })
  .catch(error => {
    console.log(error);
    btn.textContent = 'Wystąpił błąd.';
    btn.style.background = '#ef4444';
  })
  .then(function() {
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.background = '';
      btn.style.opacity = '';
    }, 4000);
  });
}

/* --- Active nav link on scroll --- */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-100px 0px -50% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

// Initialize active nav links
initActiveNavLinks();
