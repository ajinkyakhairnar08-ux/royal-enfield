// JS: keep behaviour native bootstrap toggle (no custom animation)
// Bind header buttons & location fetch

// Location & account buttons (desktop)
const accountBtn = document.getElementById('accountBtn');
const locationBtn = document.getElementById('locationBtn');

// Mobile copies inside collapsed menu
const accountBtnMobile = document.getElementById('accountBtnMobile');
const locationBtnMobile = document.getElementById('locationBtnMobile');

function showAccountModal() {
  const modalEl = document.getElementById('accountModal');
  if (modalEl) {
    const m = new bootstrap.Modal(modalEl);
    m.show();
  }
}
function showLocationModalAndLoad() {
  const modalEl = document.getElementById('locationModal');
  if (modalEl) {
    const m = new bootstrap.Modal(modalEl);
    m.show();
    fetchCountries();
  }
}

if (accountBtn) accountBtn.addEventListener('click', showAccountModal);
if (locationBtn) locationBtn.addEventListener('click', showLocationModalAndLoad);
if (accountBtnMobile) accountBtnMobile.addEventListener('click', showAccountModal);
if (locationBtnMobile) locationBtnMobile.addEventListener('click', showLocationModalAndLoad);

// Fetch and display countries for the Location modal
async function fetchCountries() {
  const list = document.getElementById('countryList');
  const search = document.getElementById('searchCountry');
  if (!list || !search) return;

  list.innerHTML = '<li class="list-group-item bg-dark text-light border-secondary">Loading...</li>';

  try {
    const res = await fetch('https://restcountries.com/v3.1/all');
    const data = await res.json();

    const countries = data
      .map(c => c.name && c.name.common ? c.name.common : '')
      .filter(Boolean)
      .sort((a,b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    const renderList = (names) => {
      list.innerHTML = '';
      if (names.length === 0) {
        list.innerHTML = '<li class="list-group-item bg-dark text-light border-secondary">No results</li>';
        return;
      }
      names.forEach(name => {
        const li = document.createElement('li');
        li.className = 'list-group-item bg-dark text-light border-secondary';
        li.textContent = name;
        li.addEventListener('click', () => {
          alert(`Selected country: ${name}`);
        });
        list.appendChild(li);
      });
    };

    renderList(countries);

    search.value = '';
    search.addEventListener('input', () => {
      const value = search.value.trim().toLowerCase();
      const filtered = countries.filter(n => n.toLowerCase().includes(value));
      renderList(filtered);
    });
  } catch (err) {
    list.innerHTML = '<li class="list-group-item bg-dark text-danger border-secondary">Failed to load countries</li>';
    console.error(err);
  }
}

// MotoCulture slider scroll buttons
const slider = document.getElementById('motocultureSlider');
const leftBtn = document.getElementById('scrollLeft');
const rightBtn = document.getElementById('scrollRight');
if (leftBtn && rightBtn && slider) {
  leftBtn.addEventListener('click', () => slider.scrollBy({ left: -400, behavior: 'smooth' }));
  rightBtn.addEventListener('click', () => slider.scrollBy({ left: 400, behavior: 'smooth' }));
}
