/* ═══════════════════════════════════════════════════════
   nav.js — Ridhee Agritech Shared Navigation & Logic
   Include this script on every page.
   ═══════════════════════════════════════════════════════ */

// ─── Mobile Menu ───
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ─── Highlight current nav link ───
(function() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });
})();

// ─── Products Data ───
const PRODUCTS = [
  { name:'Pink Onion', img:"product_images/PINK_ONION_POWDER.jpg", cat:'vegetable', catLabel:'Vegetable', forms:['Slices','Flakes','Chopped','Powder'], app:'Seasoning, instant food, ready-to-cook mixes, sauces.' },
  { name:'Garlic', img:'product_images/GARLIC_POWDER_(A).jpg', cat:'vegetable', catLabel:'Vegetable', forms:['Flakes','Granules','Powder'], app:'Spice mixes, seasonings, ready-to-eat products.' },
  { name:'Tomato', img:'product_images/TOMATO_POWDER.png', cat:'vegetable', catLabel:'Vegetable', forms:['Slices','Powder'], app:'Sauces, soups, seasoning blends.' },
  { name:'Carrot', img:'product_images/Carrot_powder.png', cat:'vegetable', catLabel:'Vegetable', forms:['Flakes','Powder'], app:'Instant soups, baby food, health snacks.' },
  { name:'Beetroot', img:'product_images/beetroot_powder.png', cat:'vegetable', catLabel:'Vegetable', forms:['Slices','Powder'], app:'Nutraceuticals, food colouring, health food.' },
  { name:'Green Chilli', img:'product_images/green_chilli_powder.png', cat:'vegetable', catLabel:'Vegetable', forms:['Flakes','Powder'], app:'Spice blends, seasoning, snack coatings.' },
  { name:'White Onion', img:'product_images/white_onion_powder.png', cat:'vegetable', catLabel:'Vegetable', forms:['Powder'], app:'Seasoning blends, soups, sauces, ready-to-cook mixes.' },
  { name:'Moringa', img:'product_images/Moringa_powder.png', cat:'herb', catLabel:'Herb', forms:['Powder'], app:'Nutraceuticals, health supplements, ayurvedic products.' },
  { name:'Mango', img:'product_images/MANGO_POWDER.jpg', cat:'fruit', catLabel:'Fruit', forms:['Slices','Papad','Powder'], app:'Bakery, beverages, nutraceuticals, confectionery.' },
  { name:'Banana', img:'product_images/GREEN_BANANA_POWDER.jpg', cat:'fruit', catLabel:'Fruit', forms:['Chips','Powder'], app:'Snacking, health food, baby food, bakery.' },
  { name:'Guava', img:'product_images/guava_powder.png', cat:'fruit', catLabel:'Fruit', forms:['Slices','Powder'], app:'Health supplements, beverages, functional foods.' },
  { name:'Jamun (Indian Blackberry)', img:'product_images/Jamun_powder.png', cat:'fruit', catLabel:'Fruit', forms:['Slices','Powder'], app:'Nutraceuticals, Ayurvedic products, hair & skin care.' },
  { name:'Pomegranate', img:'product_images/pomgranate_powder.png', cat:'fruit', catLabel:'Fruit', forms:['Arils','Powder'], app:'Nutraceuticals, juices, cosmetics, Ayurvedic supplements.' },
  { name:'Pineapple', img:'product_images/pineapple_powder.png', cat:'fruit', catLabel:'Fruit', forms:['Slices','Powder'], app:'Bakery, tropical beverages, health snacks.' },
  { name:'Red Onion', img:'product_images/RED_ONION_POWDER.jpg', cat:'vegetable', catLabel:'Vegetable', forms:['Slices','Flakes','Chopped','Powder'], app:'Seasoning, instant food, ready-to-cook mixes, sauces.' },
  { name:'Chiku / Sapota', img:'product_images/SAPOTA_POWDER.png', cat:'fruit', catLabel:'Fruit', forms:['Slices','Powder'], app:'Desserts, health food, regional specialties.' },
  { name:'Turmeric', img:'product_images/Turmeric_powder.png', cat:'herb', catLabel:'Spices', forms:['Slices','Powder'], app:'Spice blends, medicinal use, cosmetics, Ayurvedic formulations.' },
  { name:'Other Regional Fruits,Vegetables,Herbs & Spices', img:'product_images/other_regional.png', cat:'', catLabel:'Other', forms:['Powder'], app:'Seasonal & customised on request.' },
];

// ─── Products Page: Render & Filter ───
function renderProducts(filter) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  grid.innerHTML = list.map(p => `
    <div class="prod-card">
      <div class="prod-card-header">
        <div class="prod-emoji"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
        <div>
          <div class="cat">${p.catLabel}</div>
          <h3>${p.name}</h3>
        </div>
      </div>
      <div class="prod-card-body">
        <div class="forms-list">
          ${p.forms.map(f => `<span class="form-chip">${f}</span>`).join('')}
        </div>
        <p class="prod-app"><strong>Use:</strong> ${p.app}</p>
      </div>
    </div>
  `).join('');
}

function filterProducts(filter, btn) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(filter);
}

// ─── Star Rating ───
let selectedRating = 0;
function setRating(val) {
  selectedRating = val;
  window._selectedRating = val + ' / 5 stars';
  document.querySelectorAll('.star-btn').forEach((btn, i) => {
    btn.classList.toggle('lit', i < val);
  });
}

// ─── Contact / Enquiry Form ───
async function submitContact() {
  const first   = document.getElementById('cf_first').value.trim();
  const last    = document.getElementById('cf_last').value.trim();
  const email   = document.getElementById('cf_email').value.trim();
  const phone   = document.getElementById('cf_phone').value.trim();
  const company = document.getElementById('cf_company').value.trim();
  const product = document.getElementById('cf_product').value.trim();
  const message = document.getElementById('cf_message').value.trim();

  if (!first)   { alert('Please enter your first name.'); return; }
  if (!email)   { alert('Please enter your email address.'); return; }
  if (!product) { alert('Please select a product of interest.'); return; }
  if (!message) { alert('Please describe your requirements.'); return; }

  const btn = document.querySelector('.form-submit');
  btn.textContent = 'Sending…'; btn.disabled = true;

  const data = new FormData();
  data.append('type',    'enquiry');
  data.append('name',    first + ' ' + last);
  data.append('email',   email);
  data.append('phone',   phone);
  data.append('company', company);
  data.append('product', product);
  data.append('message', message);

  try {
    const res = await fetch('mail.php', { method: 'POST', body: data });
    const json = await res.json();
    if (json.success) {
      document.getElementById('contactFormContent').style.display = 'none';
      document.getElementById('contactSuccess').style.display = 'block';
    } else {
      alert('Something went wrong: ' + (json.error || 'Unknown error. Please try again.'));
      btn.textContent = 'Send Enquiry →'; btn.disabled = false;
    }
  } catch (e) {
    alert('Could not send. Please check your internet connection and try again.');
    btn.textContent = 'Send Enquiry →'; btn.disabled = false;
  }
}

// ─── Feedback Form ───
async function submitFeedback() {
  const name    = document.getElementById('fb_name').value.trim();
  const company = document.getElementById('fb_company').value.trim();
  const product = document.getElementById('fb_product').value.trim();
  const review  = document.getElementById('fb_review').value.trim();

  if (!name)   { alert('Please enter your name.'); return; }
  if (!review) { alert('Please write your review.'); return; }

  const btn = document.querySelector('.feedback-submit');
  btn.textContent = 'Submitting…'; btn.disabled = true;

  const data = new FormData();
  data.append('type',    'feedback');
  data.append('name',    name);
  data.append('company', company);
  data.append('product', product);
  data.append('rating',  window._selectedRating || 'Not rated');
  data.append('review',  review);

  try {
    const res = await fetch('mail.php', { method: 'POST', body: data });
    const json = await res.json();
    if (json.success) {
      document.getElementById('feedbackFormWrap').style.display = 'none';
      document.getElementById('feedbackSuccess').style.display = 'block';
    } else {
      alert('Something went wrong: ' + (json.error || 'Please try again.'));
      btn.textContent = 'Submit Review'; btn.disabled = false;
    }
  } catch (e) {
    alert('Could not send. Please check your connection and try again.');
    btn.textContent = 'Submit Review'; btn.disabled = false;
  }
}

// ─── Auto-init Products Grid ───
if (document.getElementById('productsGrid')) renderProducts('all');
