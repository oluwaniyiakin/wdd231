// Import JSON Data (assuming data is in a separate module file)
import marketData from './data/markets.json' assert { type: 'json' };

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const directoryContainer = document.getElementById('directory');
const vendorContainer = document.getElementById('vendors');
const eventContainer = document.getElementById('events');

// Toggle Navigation Menu
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Lazy Load Images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach((image) => {
  imageObserver.observe(image);
});

// Fetch and Display Market Data
async function fetchMarketData() {
  try {
    // Simulate fetching data from a remote source
    const data = await Promise.resolve(marketData);
    buildDirectory(data.markets);
    buildVendors(data.vendors);
    buildEvents(data.events);
  } catch (error) {
    console.error('Error fetching market data:', error);
  }
}

// Build Directory Page
function buildDirectory(markets) {
  if (!directoryContainer) return;

  markets.forEach((market) => {
    const marketCard = document.createElement('div');
    marketCard.classList.add('market-card');
    marketCard.innerHTML = `
      <img src="${market.image}" alt="${market.name}" loading="lazy">
      <h3>${market.name}</h3>
      <p>${market.description}</p>
      <a href="${market.link}" target="_blank">Visit Market</a>
    `;
    directoryContainer.appendChild(marketCard);
  });
}

// Build Vendors Page
function buildVendors(vendors) {
  if (!vendorContainer) return;

  vendors.forEach((vendor) => {
    const vendorCard = document.createElement('div');
    vendorCard.classList.add('vendor-card');
    vendorCard.innerHTML = `
      <img src="${vendor.image}" alt="${vendor.name}" loading="lazy">
      <h3>${vendor.name}</h3>
      <p>${vendor.specialty}</p>
      <a href="${vendor.contact}" target="_blank">Contact</a>
    `;
    vendorContainer.appendChild(vendorCard);
  });
}

// Build Events Page
function buildEvents(events) {
  if (!eventContainer) return;

  events.forEach((event) => {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');
    eventCard.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.date} | ${event.location}</p>
      <p>${event.details}</p>
      <button class="rsvp-button">RSVP</button>
    `;

    const rsvpButton = eventCard.querySelector('.rsvp-button');
    rsvpButton.addEventListener('click', () => {
      showModal(event);
    });

    eventContainer.appendChild(eventCard);
  });
}

// Modal Dialog
function showModal(event) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <h2>${event.title}</h2>
      <p>${event.date} | ${event.location}</p>
      <p>${event.details}</p>
      <form>
        <label for="name">Name:</label>
        <input type="text" id="name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" required>
        <button type="submit">Confirm RSVP</button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  const closeButton = modal.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    modal.remove();
  });

  modal.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    saveRSVP({ name, email, event: event.title });
    modal.remove();
    alert('RSVP Confirmed!');
  });
}

// Save RSVP Data to LocalStorage
function saveRSVP(rsvp) {
  const rsvpList = JSON.parse(localStorage.getItem('rsvpList')) || [];
  rsvpList.push(rsvp);
  localStorage.setItem('rsvpList', JSON.stringify(rsvpList));
}

// Load and Display RSVP Data (for potential future use)
function loadRSVPData() {
  const rsvpList = JSON.parse(localStorage.getItem('rsvpList')) || [];
  console.log('RSVP List:', rsvpList); // Modify this to display data if needed
}

// Conditional Example: Highlight Markets Open Today
function highlightOpenMarkets(markets) {
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  markets.forEach((market) => {
    if (market.openDays.includes(today)) {
      const marketElement = document.querySelector(`[alt="${market.name}"]`).parentElement;
      marketElement.classList.add('highlight');
    }
  });
}

// Initialize
fetchMarketData();
loadRSVPData();
