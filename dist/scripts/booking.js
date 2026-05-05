document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.tour-booking form');
  if (!form) return;

  const tourId = document.body.dataset.tourId;
  const tourName = document.body.dataset.tourName;

  const prices = JSON.parse(localStorage.getItem('4u_prices') || '{}');
  const avail = JSON.parse(localStorage.getItem('4u_availability') || '{}');

  if (avail[tourId] && avail[tourId].active === false) {
    form.innerHTML = '<p style="text-align:center;color:#e74c3c;padding:20px;">This tour is currently not available. Please contact us directly.</p>';
    return;
  }

  const blockedDates = avail[tourId]?.blockedDates?.split(',').map(d => d.trim()).filter(Boolean) || [];

  const dateInput = form.querySelector('input[type="date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    dateInput.addEventListener('change', () => {
      if (blockedDates.includes(dateInput.value)) {
        dateInput.setCustomValidity('This date is not available. Please choose another date.');
        dateInput.reportValidity();
      } else {
        dateInput.setCustomValidity('');
      }
    });
  }

  const tourPrices = prices[tourId];
  if (tourPrices) {
    const priceEl = form.closest('.tour-booking').querySelector('.price');
    const typeSelect = form.querySelector('select[id="booking-type"], select:nth-of-type(2)');

    function updatePrice() {
      if (!priceEl) return;
      const type = typeSelect ? typeSelect.value : 'semi';
      const p = type === 'private' ? tourPrices.private : (tourPrices.semi || tourPrices.private);
      if (p) priceEl.innerHTML = `€${p} <span>per person</span>`;
    }

    if (typeSelect) typeSelect.addEventListener('change', updatePrice);
    updatePrice();
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input, select');
    const data = {};
    inputs.forEach(el => {
      if (el.name) data[el.name] = el.value;
    });

    const formData = {
      tourId,
      tourName,
      date: form.querySelector('input[type="date"]')?.value || '',
      guests: form.querySelector('select')?.value || '',
      type: form.querySelectorAll('select')[1]?.value || 'semi-private',
      lang: form.querySelectorAll('select')[2]?.value || 'en',
      name: form.querySelector('input[type="text"]')?.value || '',
      email: form.querySelector('input[type="email"]')?.value || '',
      submittedAt: new Date().toISOString()
    };

    const bookings = JSON.parse(localStorage.getItem('4u_bookings') || '[]');
    bookings.push(formData);
    localStorage.setItem('4u_bookings', JSON.stringify(bookings));

    form.innerHTML = `
      <div style="text-align:center; padding: 40px 20px;">
        <div style="font-size:3rem; margin-bottom:16px;">✅</div>
        <h3 style="margin-bottom:12px;">Booking Request Sent!</h3>
        <p style="color:var(--gray-600); font-size:0.95rem;">Thank you, <strong>${formData.name}</strong>. We'll confirm your <strong>${tourName}</strong> tour for <strong>${formData.date}</strong> shortly.</p>
        <p style="margin-top:12px; font-size:0.85rem; color:var(--gray-600);">Check your email at <strong>${formData.email}</strong></p>
      </div>`;
  });
});
