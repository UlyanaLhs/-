/**
 * BLACKLINE BARBERSHOP — GLOBAL SITE SCRIPTS
 * Lightbox controller, FAQ accordion interactions, and scroll reveals.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Accessible Image Lightbox Controller
  initGalleryLightbox();

  // 2. Global Accordion Handler (for general FAQs)
  initAccordions();

  // 3. Smooth IntersectionObserver Scroll Reveals
  initScrollReveals();
});

/**
 * Accessible Image Lightbox
 */
function initGalleryLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!lightbox || galleryItems.length === 0) return;

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  let currentIndex = 0;
  let lastActiveElement = null;

  // Extract images array from gallery items
  const itemsData = Array.from(galleryItems).map(item => ({
    src: item.getAttribute('data-src') || item.querySelector('img')?.getAttribute('src'),
    alt: item.getAttribute('data-alt') || item.querySelector('img')?.getAttribute('alt') || 'Barbershop gallery image',
    title: item.getAttribute('data-title') || item.querySelector('.gallery-caption-title')?.textContent || 'BLACKLINE Craft'
  }));

  function openLightbox(index) {
    currentIndex = index;
    lastActiveElement = document.activeElement;
    updateLightboxContent();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveElement) lastActiveElement.focus();
  }

  function updateLightboxContent() {
    const item = itemsData[currentIndex];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${itemsData.length}`;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % itemsData.length;
    updateLightboxContent();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + itemsData.length) % itemsData.length;
    updateLightboxContent();
  }

  // Attach click to gallery items
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  // Click on backdrop to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation: Escape, Left, Right
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });
}

/**
 * Accordion Handler
 */
function initAccordions() {
  const triggers = document.querySelectorAll('.accordion-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      if (!item) return;
      const isOpen = item.classList.contains('is-open');
      
      // Close sibling items in the same accordion if preferred, or keep multi-open
      item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', !isOpen);
    });
  });
}

/**
 * IntersectionObserver Scroll Reveals
 */
function initScrollReveals() {
  if (!('IntersectionObserver' in window)) return;

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}
