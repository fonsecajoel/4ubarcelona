const DEFAULT_USER = 'admin';
const DEFAULT_PASS = '4ubarcelona2025';

const TOURS = [
  { id: 'sagrada-familia', name: 'Sagrada Familia', file: 'sagrada-familia.html', img: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&q=80' },
  { id: 'park-guell', name: 'Park Güell', file: 'park-guell.html', img: 'https://images.unsplash.com/photo-1579282240050-352db0a14c21?w=400&q=80' },
  { id: 'gothic-quarter', name: 'Gothic Quarter', file: 'gothic-quarter.html', img: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&q=80' },
  { id: 'bike-tour', name: 'Bike Tour', file: 'bike-tour.html', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80' }
];

const DEFAULT_PRICES = {
  'sagrada-familia': { semi: 45, private: 350 },
  'park-guell': { private: 280 },
  'gothic-quarter': { private: 250 },
  'bike-tour': { private: 220 }
};

const DEFAULT_CONTENT = {
  heroTitle: 'Discover Barcelona Like Never Before',
  heroSub: 'Premium semi-private & private tours with expert local guides. Maximum 9 guests.',
  about: 'Born out of a deep love for our beautiful home city, we\'ve spent over two decades crafting unforgettable experiences that immerse you in the rich history and culture of Barcelona.',
  email: 'info@4ubarcelona.com',
  phone: '+34 663 331 088'
};

function getStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function setStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function showToast(msg, isError = false) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.style.borderColor = isError ? 'var(--danger)' : 'var(--success)';
  t.style.color = isError ? 'var(--danger)' : 'var(--success)';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function isLoggedIn() {
  return sessionStorage.getItem('4u_admin') === 'true';
}

function logout() {
  sessionStorage.removeItem('4u_admin');
  document.getElementById('admin-panel').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
}

document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  const user = document.getElementById('login-user').value.trim();
  const pass = document.getElementById('login-pass').value;
  const storedUser = localStorage.getItem('4u_admin_user') || DEFAULT_USER;
  const storedPass = localStorage.getItem('4u_admin_pass') || DEFAULT_PASS;

  if (user === storedUser && pass === storedPass) {
    sessionStorage.setItem('4u_admin', 'true');
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'grid';
    initDashboard();
  } else {
    document.getElementById('login-error').style.display = 'block';
  }
});

if (isLoggedIn()) {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-panel').style.display = 'grid';
  initDashboard();
}

function switchSection(name) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('section-' + name).classList.add('active');
  document.querySelector('[data-section="' + name + '"]').classList.add('active');
  document.getElementById('section-title').textContent = name.charAt(0).toUpperCase() + name.slice(1);
}

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => switchSection(btn.dataset.section));
});

function initDashboard() {
  renderDashboardStats();
  renderRecentBookings();
  renderToursEditor();
  renderPricesEditor();
  renderAvailabilityEditor();
  loadContent();
}

function getBookings() {
  return getStore('4u_bookings', []);
}

function renderDashboardStats() {
  const bookings = getBookings();
  const prices = getStore('4u_prices', DEFAULT_PRICES);
  const totalGuests = bookings.reduce((sum, b) => sum + (parseInt(b.guests) || 0), 0);
  const revenue = bookings.reduce((sum, b) => {
    const p = prices[b.tourId];
    if (!p) return sum;
    const price = b.type === 'private' ? (p.private || 0) : (p.semi || p.private || 0);
    return sum + (price * (parseInt(b.guests) || 1));
  }, 0);

  document.getElementById('stat-bookings').textContent = bookings.length;
  document.getElementById('stat-guests').textContent = totalGuests;
  document.getElementById('stat-revenue').textContent = '€' + revenue.toLocaleString();
}

function renderRecentBookings() {
  const bookings = getBookings().slice(-5).reverse();
  const el = document.getElementById('recent-bookings-list');
  if (!bookings.length) {
    el.innerHTML = '<p style="color:var(--muted);font-size:0.85rem;">No bookings yet.</p>';
    return;
  }
  el.innerHTML = bookings.map(b => `
    <div class="booking-list-item">
      <div>
        <span class="booking-tour">${b.tourName}</span>
        <span class="booking-meta"> — ${b.name}</span>
      </div>
      <div class="booking-meta">${b.date} · ${b.guests} guests</div>
    </div>`).join('');
}

function renderBookingsTable() {
  const bookings = getBookings();
  const tbody = document.getElementById('bookings-tbody');
  const noEl = document.getElementById('no-bookings');
  const table = document.getElementById('bookings-table');

  if (!bookings.length) {
    table.style.display = 'none';
    noEl.style.display = 'block';
    return;
  }

  table.style.display = 'table';
  noEl.style.display = 'none';
  tbody.innerHTML = bookings.map((b, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${b.tourName}</strong></td>
      <td>${b.name}</td>
      <td>${b.email}</td>
      <td>${b.date}</td>
      <td>${b.guests}</td>
      <td>${b.type}</td>
      <td>${b.lang}</td>
      <td><button class="del-btn" onclick="deleteBooking(${i})">🗑 Delete</button></td>
    </tr>`).join('');
}

document.querySelector('[data-section="bookings"]').addEventListener('click', renderBookingsTable);

function deleteBooking(idx) {
  if (!confirm('Delete this booking?')) return;
  const bookings = getBookings();
  bookings.splice(idx, 1);
  setStore('4u_bookings', bookings);
  renderBookingsTable();
  renderDashboardStats();
  renderRecentBookings();
  showToast('Booking deleted');
}

function clearBookings() {
  if (!confirm('Delete ALL bookings? This cannot be undone.')) return;
  setStore('4u_bookings', []);
  renderBookingsTable();
  renderDashboardStats();
  renderRecentBookings();
  showToast('All bookings cleared');
}

function exportData() {
  const bookings = getBookings();
  if (!bookings.length) { showToast('No bookings to export', true); return; }
  const headers = ['Tour', 'Name', 'Email', 'Date', 'Guests', 'Type', 'Language'];
  const rows = bookings.map(b => [b.tourName, b.name, b.email, b.date, b.guests, b.type, b.lang]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '4u-bookings-' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
  showToast('CSV exported!');
}

function renderToursEditor() {
  const saved = getStore('4u_tours', {});
  const container = document.getElementById('tours-editor');
  container.innerHTML = TOURS.map(tour => {
    const data = saved[tour.id] || {};
    return `
    <div class="tour-edit-card">
      <h3>🗺️ ${tour.name}</h3>
      <div style="display:flex;gap:12px;margin-bottom:16px;">
        <img src="${tour.img}" style="width:80px;height:60px;object-fit:cover;border-radius:6px;">
        <a href="${tour.file}" target="_blank" style="color:var(--accent);font-size:0.8rem;align-self:flex-end;">View page →</a>
      </div>
      <div class="field-group">
        <label>Tour Name</label>
        <input type="text" id="tour-name-${tour.id}" value="${data.name || tour.name}">
      </div>
      <div class="field-group">
        <label>Tag Label</label>
        <input type="text" id="tour-tag-${tour.id}" value="${data.tag || (tour.id === 'sagrada-familia' ? 'Semi-Private' : 'Private')}">
      </div>
      <div class="field-group">
        <label>Short Description</label>
        <input type="text" id="tour-desc-${tour.id}" value="${data.desc || ''}">
      </div>
      <button class="btn-action" onclick="saveTour('${tour.id}')">💾 Save</button>
    </div>`;
  }).join('');
}

function saveTour(id) {
  const saved = getStore('4u_tours', {});
  saved[id] = {
    name: document.getElementById('tour-name-' + id).value,
    tag: document.getElementById('tour-tag-' + id).value,
    desc: document.getElementById('tour-desc-' + id).value
  };
  setStore('4u_tours', saved);
  showToast('Tour saved!');
}

function renderPricesEditor() {
  const prices = getStore('4u_prices', DEFAULT_PRICES);
  const container = document.getElementById('prices-editor');
  container.innerHTML = TOURS.map(tour => {
    const p = prices[tour.id] || {};
    const hasSemi = tour.id === 'sagrada-familia';
    return `
    <div class="price-card">
      <h3>${tour.name}</h3>
      ${hasSemi ? `
      <div class="price-row">
        <label>Semi-Private (p/p)</label>
        <input type="number" id="price-semi-${tour.id}" value="${p.semi || ''}" placeholder="€">
      </div>` : ''}
      <div class="price-row">
        <label>Private Tour</label>
        <input type="number" id="price-private-${tour.id}" value="${p.private || ''}" placeholder="€">
      </div>
    </div>`;
  }).join('');
}

function savePrices() {
  const prices = {};
  TOURS.forEach(tour => {
    const semiEl = document.getElementById('price-semi-' + tour.id);
    const privEl = document.getElementById('price-private-' + tour.id);
    prices[tour.id] = {};
    if (semiEl) prices[tour.id].semi = parseFloat(semiEl.value) || 0;
    if (privEl) prices[tour.id].private = parseFloat(privEl.value) || 0;
  });
  setStore('4u_prices', prices);
  renderDashboardStats();
  showToast('Prices saved!');
}

function renderAvailabilityEditor() {
  const avail = getStore('4u_availability', {});
  const container = document.getElementById('availability-editor');
  container.innerHTML = TOURS.map(tour => {
    const a = avail[tour.id] || { active: true, blockedDates: '' };
    return `
    <div class="avail-card">
      <h3>${tour.name}</h3>
      <div class="toggle-row">
        <label>Tour Active</label>
        <label class="toggle">
          <input type="checkbox" id="avail-active-${tour.id}" ${a.active ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
      </div>
      <div class="field-group">
        <label>Blocked Dates (comma separated, e.g. 2025-08-15, 2025-12-25)</label>
        <input type="text" id="avail-blocked-${tour.id}" value="${a.blockedDates || ''}" placeholder="2025-08-15, 2025-12-25">
      </div>
    </div>`;
  }).join('');
}

function saveAvailability() {
  const avail = {};
  TOURS.forEach(tour => {
    avail[tour.id] = {
      active: document.getElementById('avail-active-' + tour.id).checked,
      blockedDates: document.getElementById('avail-blocked-' + tour.id).value
    };
  });
  setStore('4u_availability', avail);
  showToast('Availability saved!');
}

function loadContent() {
  const c = getStore('4u_content', DEFAULT_CONTENT);
  document.getElementById('content-hero-title').value = c.heroTitle || '';
  document.getElementById('content-hero-sub').value = c.heroSub || '';
  document.getElementById('content-about').value = c.about || '';
  document.getElementById('content-email').value = c.email || '';
  document.getElementById('content-phone').value = c.phone || '';
}

function saveContent() {
  setStore('4u_content', {
    heroTitle: document.getElementById('content-hero-title').value,
    heroSub: document.getElementById('content-hero-sub').value,
    about: document.getElementById('content-about').value,
    email: document.getElementById('content-email').value,
    phone: document.getElementById('content-phone').value
  });
  showToast('Content saved!');
}

function changePassword() {
  const curr = document.getElementById('curr-pass').value;
  const newP = document.getElementById('new-pass').value;
  const conf = document.getElementById('confirm-pass').value;
  const stored = localStorage.getItem('4u_admin_pass') || DEFAULT_PASS;
  const msgEl = document.getElementById('pass-msg');

  if (curr !== stored) { msgEl.style.color = 'var(--danger)'; msgEl.textContent = '❌ Current password incorrect'; return; }
  if (newP.length < 6) { msgEl.style.color = 'var(--danger)'; msgEl.textContent = '❌ Password must be at least 6 characters'; return; }
  if (newP !== conf) { msgEl.style.color = 'var(--danger)'; msgEl.textContent = '❌ Passwords do not match'; return; }

  localStorage.setItem('4u_admin_pass', newP);
  msgEl.style.color = 'var(--success)';
  msgEl.textContent = '✅ Password updated!';
  document.getElementById('curr-pass').value = '';
  document.getElementById('new-pass').value = '';
  document.getElementById('confirm-pass').value = '';
}

function saveSocials() {
  setStore('4u_socials', {
    instagram: document.getElementById('social-ig').value,
    facebook: document.getElementById('social-fb').value,
    tiktok: document.getElementById('social-tt').value
  });
  showToast('Social links saved!');
}

function resetAll() {
  if (!confirm('Reset ALL admin settings to defaults? This cannot be undone.')) return;
  ['4u_prices', '4u_tours', '4u_availability', '4u_content', '4u_socials'].forEach(k => localStorage.removeItem(k));
  initDashboard();
  showToast('All settings reset to defaults');
}
