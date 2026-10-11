/**
 * BLACKLINE BARBERSHOP — CONTACT & INQUIRY FORM CONTROLLER
 * Handles client-side validation and demonstration status messaging.
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('contact-form-status');

  if (!contactForm) return;

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectSelect = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    let hasErrors = false;

    // Reset status
    if (formStatus) {
      formStatus.className = 'form-status';
      formStatus.style.display = 'none';
      formStatus.innerHTML = '';
    }

    [nameInput, emailInput, subjectSelect, messageInput].forEach(field => {
      if (field) field.classList.remove('is-invalid');
    });

    if (!nameInput.value.trim()) {
      nameInput.classList.add('is-invalid');
      hasErrors = true;
    }

    if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
      emailInput.classList.add('is-invalid');
      hasErrors = true;
    }

    if (!subjectSelect.value) {
      subjectSelect.classList.add('is-invalid');
      hasErrors = true;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageInput.classList.add('is-invalid');
      hasErrors = true;
    }

    if (hasErrors) {
      const firstInvalid = contactForm.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Display transparent demonstration notice
    if (formStatus) {
      formStatus.className = 'form-status status-success';
      formStatus.style.display = 'block';
      formStatus.innerHTML = `
        <strong>Message Processed (Demonstration Mode)</strong><br>
        Thank you, <em>${escapeHTML(nameInput.value.trim())}</em>. Because this is a static portfolio build without a live mailing backend, your inquiry has not been transmitted across the web. To connect with our team or schedule a visit, please use our <a href="booking.html" style="color:var(--color-accent-brass); text-decoration:underline;">Booking Request page</a>.
      `;
      contactForm.reset();
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
});
