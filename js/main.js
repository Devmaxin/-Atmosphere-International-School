const nav = document.querySelector('.floating-navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = [...document.querySelectorAll('main section[id], header[id]')];
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

const heroSwiper = new Swiper('.hero-swiper', {
  effect: 'fade',
  loop: true,
  speed: 1400,
  autoplay: {
    delay: 5200,
    disableOnInteraction: false
  },
  fadeEffect: {
    crossFade: true
  }
});

const testimonialSwiper = new Swiper('.testimonial-swiper', {
  loop: true,
  speed: 800,
  spaceBetween: 24,
  autoplay: {
    delay: 4600,
    disableOnInteraction: false
  },
  pagination: {
    el: '.testimonial-pagination',
    clickable: true
  },
  breakpoints: {
    768: {
      slidesPerView: 2
    }
  }
});

const updateNav = () => {
  nav.classList.toggle('scrolled', window.scrollY > 24);

  const current = sections
    .filter(section => window.scrollY >= section.offsetTop - 140)
    .pop();

  navLinks.forEach(link => {
    link.classList.toggle('active', current && link.getAttribute('href') === `#${current.id}`);
  });
};

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

document.querySelectorAll('.navbar-nav .nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    const collapse = document.querySelector('.navbar-collapse.show');
    if (collapse) {
      bootstrap.Collapse.getOrCreateInstance(collapse).hide();
    }
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.image;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  });
});

const closeLightbox = () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightboxImage.src = '';
};

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});

document.querySelector('.contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button[type="submit"]');
  const original = button.innerHTML;
  button.innerHTML = 'Message Ready <i class="fa-solid fa-check"></i>';
  button.disabled = true;
  setTimeout(() => {
    button.innerHTML = original;
    button.disabled = false;
    event.currentTarget.reset();
  }, 2200);
});
