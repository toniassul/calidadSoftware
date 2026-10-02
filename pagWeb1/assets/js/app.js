const setupNavigation = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  menuToggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-is-open', isOpen);
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-is-open');
    });
  });
};

const setupCatalog = () => {
  document.querySelectorAll('.filter-button').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-button').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      document.querySelectorAll('.catalog-grid .product-card').forEach((card) => {
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
      });
    });
  });
};

const setupContactForm = () => {
  const form = document.querySelector('#contact-form');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = document.querySelector('#form-status');
    status.textContent = 'Gracias. Hemos recibido tu mensaje y te responderemos pronto.';
    form.reset();
  });
};

const setupSlider = () => {
  const slider = document.querySelector('[data-slider]');
  if (!slider) return;

  const slides = [...slider.querySelectorAll('.slide')];
  const dots = [...slider.querySelectorAll('.slider-dot')];
  const counter = slider.querySelector('.slide-counter');
  let currentSlide = 0;
  let autoplayId;

  const showSlide = (nextSlide) => {
    currentSlide = (nextSlide + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const isActive = index === currentSlide;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    dots.forEach((dot, index) => {
      const isActive = index === currentSlide;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
    if (counter) counter.textContent = `0${currentSlide + 1} / 0${slides.length}`;
  };

  const stopAutoplay = () => window.clearInterval(autoplayId);
  const startAutoplay = () => {
    stopAutoplay();
    autoplayId = window.setInterval(() => showSlide(currentSlide + 1), 5000);
  };

  slider.querySelector('.slider-prev')?.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    startAutoplay();
  });
  slider.querySelector('.slider-next')?.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    startAutoplay();
  });
  dots.forEach((dot) => dot.addEventListener('click', () => {
    showSlide(Number(dot.dataset.slideTo));
    startAutoplay();
  }));
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('focusin', stopAutoplay);
  slider.addEventListener('focusout', startAutoplay);
  slider.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showSlide(currentSlide - 1);
    if (event.key === 'ArrowRight') showSlide(currentSlide + 1);
  });

  startAutoplay();
};

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupCatalog();
  setupContactForm();
  setupSlider();
});
