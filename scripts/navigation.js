/**
 * BLACKLINE BARBERSHOP — NAVIGATION & ACCESSIBLE MENU SYSTEM
 * Handles sticky header, mobile drawer, focus trapping, and active states.
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // 1. Sticky Header scroll listener
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Active Page Link Detection
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Check if link matches current page
    const filename = href.split('/').pop().split('?')[0];
    const currentFilename = currentPath.split('/').pop() || 'index.html';

    if (filename === currentFilename || (currentFilename === '' && filename === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // 3. Mobile Menu Toggle & Focus Management
  if (menuToggle && mobileDrawer) {
    let lastActiveElement = null;

    const openDrawer = () => {
      lastActiveElement = document.activeElement;
      menuToggle.classList.add('is-open');
      mobileDrawer.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';

      // Focus first link in drawer
      const firstLink = mobileDrawer.querySelector('a, button');
      if (firstLink) firstLink.focus();
    };

    const closeDrawer = () => {
      menuToggle.classList.remove('is-open');
      mobileDrawer.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lastActiveElement) lastActiveElement.focus();
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    // Close when clicking any link inside drawer
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });
  }
});
