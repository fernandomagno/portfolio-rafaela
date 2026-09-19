(() => {
  const images = document.querySelectorAll('.gallery-grid img, .hero .frame img');
  const sections = document.querySelectorAll('section, .page-footer');

  sections.forEach((section, index) => {
    section.classList.add('reveal');
    section.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  sections.forEach((section) => revealObserver.observe(section));

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Foto ampliada');
  lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Fechar foto">&times;</button><img alt=""><p class="lightbox-caption"></p>';
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('img');
  const caption = lightbox.querySelector('.lightbox-caption');
  const closeButton = lightbox.querySelector('.lightbox-close');

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
  };

  images.forEach((image) => {
    image.setAttribute('tabindex', '0');
    image.addEventListener('click', () => {
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      caption.textContent = image.alt;
      lightbox.classList.add('is-open');
      document.body.classList.add('lightbox-open');
      closeButton.focus();
    });
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        image.click();
      }
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });
})();