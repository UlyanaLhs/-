/**
 * BLACKLINE BARBERSHOP — BOOKING ENGINE & CLIENT-SIDE VALIDATION
 * Handles appointment request form, date constraints, pre-fills from URL params,
 * and clear demonstration modal with transparent backend disclosure.
 */

document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('booking-form');
  const dateInput = document.getElementById('booking-date');
  const serviceSelect = document.getElementById('booking-service');
  const barberSelect = document.getElementById('booking-barber');
  const modalBackdrop = document.getElementById('booking-modal');
  const modalSummary = document.getElementById('modal-booking-summary');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDoneBtn = document.getElementById('modal-done-btn');

  // 1. Enforce minimum date to today (prevent past dates)
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // 2. Pre-fill service and barber from URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  const barberParam = urlParams.get('barber');

  if (serviceSelect && serviceParam) {
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].value.toLowerCase() === serviceParam.toLowerCase()) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (barberSelect && barberParam) {
    for (let i = 0; i < barberSelect.options.length; i++) {
      if (barberSelect.options[i].value.toLowerCase().includes(barberParam.toLowerCase())) {
        barberSelect.selectedIndex = i;
        break;
      }
    }
  }

  // Helper function to safely escape strings
  function escapeText(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Helper validation for email
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // 3. Form Validation & Submission Handling
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasErrors = false;

      // Fields
      const nameField = document.getElementById('booking-name');
      const emailField = document.getElementById('booking-email');
      const phoneField = document.getElementById('booking-phone');
      const timeSelect = document.getElementById('booking-time');
      const privacyCheck = document.getElementById('booking-privacy');
      const notesField = document.getElementById('booking-notes');

      // Reset invalid states
      [nameField, emailField, phoneField, serviceSelect, dateInput, timeSelect].forEach(field => {
        if (field) field.classList.remove('is-invalid');
      });

      // Name validation
      if (!nameField.value.trim()) {
        nameField.classList.add('is-invalid');
        hasErrors = true;
      }

      // Email validation
      if (!emailField.value.trim() || !isValidEmail(emailField.value.trim())) {
        emailField.classList.add('is-invalid');
        hasErrors = true;
      }

      // Phone validation (required or format)
      if (!phoneField.value.trim()) {
        phoneField.classList.add('is-invalid');
        hasErrors = true;
      }

      // Service selection validation
      if (!serviceSelect.value) {
        serviceSelect.classList.add('is-invalid');
        hasErrors = true;
      }

      // Date validation
      if (!dateInput.value) {
        dateInput.classList.add('is-invalid');
        hasErrors = true;
      }

      // Time validation
      if (!timeSelect.value) {
        timeSelect.classList.add('is-invalid');
        hasErrors = true;
      }

      // Privacy checkbox
      if (privacyCheck && !privacyCheck.checked) {
        alert('Please acknowledge the privacy policy to proceed with the booking request.');
        hasErrors = true;
      }

      if (hasErrors) {
        // Focus first invalid field
        const firstInvalid = bookingForm.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Populate demo confirmation summary
      const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
      const barberName = barberSelect.value ? barberSelect.options[barberSelect.selectedIndex].text : 'Any Available Master Barber';

      modalSummary.innerHTML = `
        <div class="modal-summary-row">
          <span>Client Name:</span>
          <strong>${escapeText(nameField.value.trim())}</strong>
        </div>
        <div class="modal-summary-row">
          <span>Contact:</span>
          <strong>${escapeText(emailField.value.trim())} / ${escapeText(phoneField.value.trim())}</strong>
        </div>
        <div class="modal-summary-row">
          <span>Selected Service:</span>
          <strong>${escapeText(serviceName)}</strong>
        </div>
        <div class="modal-summary-row">
          <span>Requested Barber:</span>
          <strong>${escapeText(barberName)}</strong>
        </div>
        <div class="modal-summary-row">
          <span>Date & Window:</span>
          <strong>${escapeText(dateInput.value)} (${escapeText(timeSelect.value)})</strong>
        </div>
        ${notesField && notesField.value.trim() ? `
          <div class="modal-summary-row">
            <span>Special Notes:</span>
            <span>${escapeText(notesField.value.trim())}</span>
          </div>
        ` : ''}
      `;

      // Open demo modal
      modalBackdrop.classList.add('is-open');
      modalDoneBtn.focus();
    });
  }

  // 4. Modal Close Handling
  const closeModal = () => {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('is-open');
      if (bookingForm) bookingForm.reset();
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('is-open')) {
      closeModal();
    }
  });
});
