'use strict';

/* --- Product catalogue --- */
const PRODUCTS = {
  /* -- Core catalogue (original 5) -- */
  solarbot:  { id:'solarbot',  name:'SolarBot Builder',         price:79.99, was:160, emoji:'☀️', variant:'Solar · 12 Robot Models',      ages:'8–13', stock:12 },
  metalbot:  { id:'metalbot',  name:'MetalBot Builder',         price:69.99, was:140, emoji:'⚙️', variant:'Metal · Up to 504 Pieces',     ages:'8–16', stock:9  },
  powerbot:  { id:'powerbot',  name:'PowerBot RC Builder',      price:79.99, was:160, emoji:'🎮', variant:'RC · Build It, Drive It',      ages:'8–14', stock:3  },
  scibot:    { id:'scibot',    name:'SciBot Experiment Kit',    price:69.99, was:140, emoji:'🧪', variant:'Science · 120+ Pieces',        ages:'8–14', stock:17 },
  minibot:   { id:'minibot',   name:'MiniBot Starter Kit',      price:59.99, was:120, emoji:'🤖', variant:'Starter · Best First Kit',     ages:'8–16', stock:22 },
  /* -- New products -- */
  sol12:     { id:'sol12',     name:'Nova RoverX',          price:79.99,  was:160, emoji:'☀️', variant:'Solar · 12 Robot Models',      ages:'8–12', stock:15, paymentLink:'https://buy.stripe.com/cNifZietv8flfva1ORfjG04' },
  roboarm:   { id:'roboarm',   name:'RoboArm 5DOF Kit',         price:74.99,  was:150, emoji:'🦾', variant:'Robotics · Programmable',      ages:'8–12', stock:8  },
  sol6exp:   { id:'sol6exp',   name:'Nova Orbit',               price:69.99,  was:130, emoji:'🚀', variant:'Solar · 6-in-1 STEM Kit',      ages:'8–16', stock:12, paymentLink:'https://buy.stripe.com/5kQ6oI99b5393Ms9hjfjG02' },
  solwave:   { id:'solwave',   name:'Nova Discovery',           price:59.99,  was:140, emoji:'🌊', variant:'Solar · Car, Boat & More',     ages:'8–12', stock:10, paymentLink:'https://buy.stripe.com/eVq6oIdprfHN0Ag657fjG01' },
  scilab120: { id:'scilab120', name:'Nova Patrol',              price:69.99,  was:120, emoji:'🔬', variant:'Science · 120 Pieces',         ages:'8–14', stock:18, paymentLink:'https://buy.stripe.com/8x2aEY2KN7bh5UA3WZfjG00' },
  sol25:     { id:'sol25',     name:'Nova Mecha',               price:159.99, was:320, emoji:'⚡', variant:'For advanced builders',        ages:'8–13', stock:6,  paymentLink:'https://buy.stripe.com/5kQ9AUcln3Z5beUdxzfjG03' },
  build8:    { id:'build8',    name:'BuildBot 8-in-1',          price:59.99, was:120, emoji:'🏗️', variant:'Construction · 8 Builds',     ages:'5+',   stock:22 },
  stem5pack: { id:'stem5pack', name:'STEM 5-Kit Bundle',        price:74.99, was:150, emoji:'📦', variant:'Science · 5 Kits Included',   ages:'8–12', stock:7  },
  codingj:   { id:'codingj',   name:'CodingBot J',              price:69.99, was:140, emoji:'💻', variant:'Coding · 6-in-1 Robot',       ages:'8–12', stock:11 },
};

/* --- Apply admin overrides from products-config.js if loaded --- */
if (typeof PRODUCT_OVERRIDES !== 'undefined' && PRODUCT_OVERRIDES) {
  Object.entries(PRODUCT_OVERRIDES).forEach(([id, ov]) => {
    if (PRODUCTS[id]) Object.assign(PRODUCTS[id], ov);
  });
}

/* --- Extended product details (used by product.html) --- */
const PRODUCT_DETAILS = {
  solarbot: {
    tagline: 'The flagship kit — highest educational value, strongest gift appeal.',
    description: 'Solar and battery powered. 12 buildable robot models. 190+ ABS plastic parts. Ages 8–13. The flagship kit — highest educational value, strongest gift appeal, and the hero of the store.',
    features: [
      'Solar and battery powered — works indoors and outdoors',
      '12 different robot models from one kit',
      '190+ precision-moulded ABS plastic parts',
      'Illustrated step-by-step engineer-written instructions',
      'No glue, no soldering, no tools required',
      'Teaches solar energy, circuits and mechanical motion',
    ],
    includes: ['190+ ABS parts', 'Solar panel module', 'Battery pack', 'Illustrated instruction booklet', 'Parts sorting tray'],
    specs: { 'Parts': '190+', 'Models': '12 robot designs', 'Power': 'Solar + battery', 'Ages': '8–13 years', 'Difficulty': 'Beginner–Intermediate', 'Build time': '1–3 hours per model' },
    color: 'linear-gradient(135deg,#D4F5F5,#E8FFFE)',
  },
  metalbot: {
    tagline: 'A 3–5 hour serious build that becomes a display piece.',
    description: 'Real anti-rust metal parts. Choose from trucks, ships, tanks or planes. 280–504 pieces. Includes wrench and screwdriver. A 3–5 hour serious build that becomes a display piece when finished. Ages 8–16.',
    features: [
      'Real anti-rust metal components throughout',
      'Choose from trucks, ships, tanks, or planes',
      '280–504 pieces depending on selected model',
      'Wrench and screwdriver included — no extra tools needed',
      'Screw-fit assembly — no glue required',
      'Display-quality finish when complete',
    ],
    includes: ['280–504 metal parts', 'Mini wrench', 'Mini screwdriver', 'Illustrated instruction booklet', 'Parts organiser tray'],
    specs: { 'Parts': '280–504', 'Material': 'Anti-rust metal', 'Tools': 'Included', 'Ages': '8–16 years', 'Difficulty': 'Intermediate–Advanced', 'Build time': '3–5 hours' },
    color: 'linear-gradient(135deg,#E8EEF0,#F0F4F5)',
  },
  powerbot: {
    tagline: 'Build it. Then race it.',
    description: 'Build a tracked car, robot or tank — then drive it with a remote. USB rechargeable battery built in, no AA batteries needed. 390+ ABS parts. Best for kids who want to build something they can actually race. Ages 8–14.',
    features: [
      'Build a tracked car, robot, or tank — your choice',
      'Drive it with the included remote control',
      'USB rechargeable battery built in — no AA batteries ever',
      '390+ precision ABS plastic parts',
      'Teaches radio control, motors, and gear systems',
      'Best for kids who love RC vehicles',
    ],
    includes: ['390+ ABS parts', 'Remote control unit', 'USB charging cable', 'Illustrated instruction booklet', 'Parts tray'],
    specs: { 'Parts': '390+', 'Battery': 'USB rechargeable (built-in)', 'Control': 'Remote included', 'Ages': '8–14 years', 'Difficulty': 'Intermediate', 'Build time': '2–4 hours' },
    color: 'linear-gradient(135deg,#E0F5F5,#EAF9F9)',
  },
  scibot: {
    tagline: 'Robotics meets science experiments.',
    description: 'Robotics meets science experiments. Obstacle-avoiding robots, wind-powered cars and more. 120+ pieces in a premium gift box. Great for science fairs and gender-neutral gifting. Ages 8–14.',
    features: [
      'Builds obstacle-avoiding robots with real sensors',
      'Includes wind-powered car build',
      '120+ precision parts in a premium gift box',
      'Great for school science fairs',
      'Teaches sensor technology, aerodynamics and robotics',
      'Gender-neutral — ideal for any curious mind',
    ],
    includes: ['120+ parts', 'Sensor components', 'Premium gift box', 'Illustrated instruction booklet', 'Science experiment guide'],
    specs: { 'Parts': '120+', 'Key feature': 'Obstacle-avoidance sensors', 'Packaging': 'Premium gift box', 'Ages': '8–14 years', 'Difficulty': 'Beginner–Intermediate', 'Build time': '1–2 hours' },
    color: 'linear-gradient(135deg,#EEF5F0,#F3FAF5)',
  },
  minibot: {
    tagline: 'The ideal first STEM kit for curious beginners.',
    description: 'The most accessible kit in the range. Build a walking robot and a solar-powered car from a single set of components. Introduces motor and circuit basics through play. The ideal first STEM kit for curious beginners. Ages 8–16.',
    features: [
      'Two builds in one box: walking robot + solar-powered car',
      'Introduces motors, circuits and solar energy',
      'No prior experience or knowledge needed',
      'No glue, no soldering, no tools required',
      'The ideal first STEM kit — guaranteed to impress',
    ],
    includes: ['Walking robot parts', 'Solar car parts', 'Solar panel module', 'Illustrated instruction booklet'],
    specs: { 'Builds': '2 complete models', 'Power': 'Solar powered', 'Ages': '8–16 years', 'Difficulty': 'Beginner', 'Build time': '45 min – 1.5 hrs each' },
    color: 'linear-gradient(135deg,#F0EEFA,#F5F2FC)',
  },
  /* -- New product details -- */
  sol12: {
    image: 'Product 1/Product 1.webp',
    images: [
      { src: 'Product 1/Product 1.webp',        label: 'Blue' },
      { src: 'Product 1/Product 1 Yellow.webp', label: 'Yellow' },
      { src: 'Product 1/Product 1 types.webp',  label: 'All 12 Types' },
      { src: 'Product 1/How it works.webp',     label: 'How It Works' },
    ],
    variants: [
      { label: 'Blue',   color: '#4A90D9', image: 'Product 1/Product 1.webp' },
      { label: 'Yellow', color: '#F5C518', image: 'Product 1/Product 1 Yellow.webp' },
    ],
    tagline: '12 different robots powered by real solar energy.',
    description: '12-in-1 Solar Robot Kit — solar and battery powered, 190+ ABS plastic parts, ages 8–12. Build 12 completely different robot models from one kit. A top-rated STEM gift that teaches solar energy and mechanical engineering through hands-on play.',
    features: ['12 different robot configurations','Solar panel + battery powered','190+ ABS plastic parts','No tools, glue or soldering required','Teaches solar energy and mechanics','Perfect Christmas or birthday gift'],
    includes: ['190+ ABS parts','Solar panel module','Battery pack','Illustrated instruction booklet','Parts sorting tray'],
    specs: {'Parts':'190+','Models':'12 robot designs','Power':'Solar + battery','Ages':'8–12 years','Difficulty':'Beginner–Intermediate','Build time':'1–3 hours per model'},
    color: 'linear-gradient(135deg,#D4F5F5,#E8FFFE)',
  },
  roboarm: {
    image: 'https://m.media-amazon.com/images/P/B0F8HSNZ4T.jpg',
    tagline: 'A 5DOF robot arm that you build and program yourself.',
    description: 'Smart Robot Arm Car Kit with 5 degrees of freedom, ESP32 compatible with Arduino and Python coding, app and remote control. Ages 8–12. Build a fully functioning robot arm car, then program it to move using an app or write your own code.',
    features: ['5 degrees of freedom robot arm','ESP32 compatible with Arduino & Python','App and remote control included','Programmable for custom behaviour','STEM coding education built in','Advanced kit for curious builders'],
    includes: ['Robot arm car parts','ESP32 controller','Remote control','USB cable','Instruction manual','App download code'],
    specs: {'DOF':'5 degrees of freedom','Controller':'ESP32','Coding':'Arduino / Python','Control':'App + remote','Ages':'8–12 years','Difficulty':'Advanced'},
    color: 'linear-gradient(135deg,#E8F0FF,#EEF4FF)',
  },
  sol6exp: {
    image: 'Product 2/Product 2 Blue.webp',
    images: [
      { src: 'Product 2/Product 2 Blue.webp',  label: 'Blue' },
      { src: 'Product 2/Product 2 White.webp', label: 'White' },
      { src: 'Product 2/Types.webp',           label: 'All Types' },
      { src: 'Product 2/Charging.webp',        label: 'Charging' },
    ],
    variants: [
      { label: 'Blue',  color: '#4A90D9', image: 'Product 2/Product 2 Blue.webp' },
      { label: 'White', color: '#E8E8E8', image: 'Product 2/Product 2 White.webp' },
    ],
    tagline: '6 STEM builds — robots, solar cars, and space toys.',
    description: 'Lucky Doug 6-in-1 STEM Projects Kit — solar robot, space toys, and more. Ages 8–16. Six different builds from one box, with progressive difficulty across models. Great for both boys and girls and a standout gift for curious minds.',
    features: ['6 different STEM builds','Solar robot included','Space-themed exploration models','Suitable for ages 8–16','Progressive difficulty across builds','Great for boys and girls'],
    includes: ['Solar robot parts','Space model parts','STEM activity guide','Illustrated instruction booklet','Parts organiser'],
    specs: {'Builds':'6 different models','Power':'Solar','Themes':'Robots + Space','Ages':'8–16 years','Difficulty':'Beginner–Intermediate','Build time':'1–2 hours each'},
    color: 'linear-gradient(135deg,#EEF0FA,#F0F4FF)',
  },
  solwave: {
    image: 'Product 3/Product 1.webp',
    images: [
      { src: 'Product 3/Product 1.webp', label: 'Product' },
      { src: 'Product 3/Types.webp',     label: 'All Types' },
      { src: 'Product 3/Charging.webp',  label: 'Charging' },
    ],
    tagline: 'Solar-powered on land or water — 12 builds in one.',
    description: '12-in-1 Solar Robot Kit with rechargeable battery — builds a car, boat, and 10 more configurations. Ages 8–12. Solar powered with a backup rechargeable battery so you can build and drive it anywhere. One of the most versatile kits in the range.',
    features: ['12 different configurations','Runs on land and water','Solar + rechargeable battery','No AA batteries ever needed','USB rechargeable','Teaches solar and mechanical engineering'],
    includes: ['All robot parts','Solar panel module','Rechargeable battery','USB charging cable','Illustrated instructions'],
    specs: {'Models':'12 configurations','Power':'Solar + rechargeable','Environments':'Land + water','Ages':'8–12 years','Difficulty':'Beginner–Intermediate','Build time':'1–3 hours'},
    color: 'linear-gradient(135deg,#E0F5FF,#E8F9FF)',
  },
  scilab120: {
    image: 'Product 4/Product 4.webp',
    images: [
      { src: 'Product 4/Product 4.webp', label: 'Product' },
      { src: 'Product 4/Types.webp',     label: 'All Types' },
    ],
    tagline: '120-piece science and robot kit for curious minds.',
    description: 'STEM Science Kit — 120 pieces, solar space toys, building experiments, and robot projects. Ages 8–14. Science fair ready out of the box. Combines robotics, solar energy, and space exploration themes in a single comprehensive kit.',
    features: ['120 pieces included','Solar-powered experiments','Space exploration theme','Robot building projects','Science fair ready','Gender-neutral design'],
    includes: ['120+ parts','Solar components','Space model parts','Experiment guide','Illustrated instruction booklet'],
    specs: {'Pieces':'120','Themes':'Space + Robots + Science','Power':'Solar','Ages':'8–14 years','Difficulty':'Beginner–Intermediate','Build time':'Multiple sessions'},
    color: 'linear-gradient(135deg,#FFFFF0,#FAFFEE)',
  },
  sol25: {
    image: 'Product 5/Product 5.webp',
    images: [
      { src: 'Product 5/Product 5.webp',   label: 'Product' },
      { src: 'Product 5/Types.webp',       label: 'All Types' },
      { src: 'Product 5/How to use.webp',  label: 'How To Use' },
    ],
    tagline: '25 solar robot designs from a single kit.',
    description: 'CYZAM 25-in-1 STEM Solar Robot Building Kit — 25 different robot configurations, solar powered, ages 8–13. The ultimate solar robot kit. More builds, more variety, and more learning per box than any other kit in the range. A serious gift for serious young engineers.',
    features: ['25 different robot configurations','Solar powered throughout','No batteries required','Premium parts quality','The most versatile solar kit','Advanced mechanics and engineering'],
    includes: ['All robot parts for 25 builds','Solar panel module','Illustrated instruction booklet','Parts sorting system'],
    specs: {'Models':'25 robot designs','Power':'Solar only','Ages':'8–13 years','Difficulty':'Intermediate','Build time':'1–3 hours per model'},
    color: 'linear-gradient(135deg,#FFF8E0,#FFFAEC)',
  },
  build8: {
    image: 'https://m.media-amazon.com/images/P/B0FGQ276VY.jpg',
    tagline: '8 construction builds — excavators, cranes and more.',
    description: '8-in-1 STEM Building Block Kit — construction and engineering themed builds including excavators, cranes and vehicles. Ages 5+. The most beginner-friendly kit in the NovaBuild range. Perfect for younger engineers starting their STEM journey.',
    features: ['8 different construction builds','Excavator and crane included','Ages 5 and up — most accessible kit','Snap-together construction','Beginner-friendly, no tools needed','Great for younger engineers'],
    includes: ['Building block parts','Illustrated instruction booklet','Parts organiser tray'],
    specs: {'Builds':'8 construction models','Theme':'Construction & Engineering','Ages':'5+ years','Difficulty':'Beginner','Build time':'30–60 min each'},
    color: 'linear-gradient(135deg,#FFF0E8,#FFF5F0)',
  },
  stem5pack: {
    image: 'https://m.media-amazon.com/images/P/B0DH26GTPT.jpg',
    tagline: '5 complete robotics science kits in one bundle.',
    description: 'STEM Robotics Science 5-Kit Bundle — five complete kits for kids ages 8–12. The best value in the NovaBuild range. Five separate hands-on STEM experiments and builds in one box — ideal for families, classrooms, or multiple kids.',
    features: ['5 complete kits included','Robotics and science focus','Best value bundle in the range','Ideal for multiple children','Classroom and home use','Ages 8–12 throughout'],
    includes: ['5 individual kit sets','5 instruction booklets','All required parts','Storage organiser'],
    specs: {'Kits':'5 complete sets','Focus':'Robotics + Science','Ages':'8–12 years','Difficulty':'Beginner–Intermediate','Best for':'Families or classrooms'},
    color: 'linear-gradient(135deg,#F0EFFF,#F5F3FF)',
  },
  codingj: {
    image: 'https://m.media-amazon.com/images/P/B083B82JZ7.jpg',
    tagline: 'Build a robot, then code it to do anything.',
    description: 'Apitor Robot J — 6-in-1 Coding Robot Building Kit. Ages 8–12. Build one of 6 robot configurations then use the app to program it, write your own sequences, or control it remotely. The bridge between physical building and real programming skills.',
    features: ['6 robot configurations','App-based visual coding','Remote control included','Teaches real coding logic','Hands-on + screen-based learning','Perfect stepping stone to programming'],
    includes: ['All robot parts','Remote control','App download guide','USB cable','Illustrated instruction booklet'],
    specs: {'Builds':'6 configurations','Coding':'Visual + block coding','Control':'App + remote','Ages':'8–12 years','Difficulty':'Intermediate','Build time':'1–3 hours'},
    color: 'linear-gradient(135deg,#E8F8F0,#EDF9F4)',
  },
};

/* --- Active storefront products (used for upsells) --- */
const ACTIVE_PRODUCTS = ['sol12','sol6exp','solwave','scilab120','sol25'];

/* --- Cart state --- */
const Cart = {
  _k: 'nb_cart',
  get()       { try { return JSON.parse(localStorage.getItem(this._k) || '[]'); } catch { return []; } },
  save(a)     { localStorage.setItem(this._k, JSON.stringify(a)); },
  count()     { return this.get().reduce((s, i) => s + i.qty, 0); },
  subtotal()  { return this.get().reduce((s, i) => s + (PRODUCTS[i.id]?.price ?? 0) * i.qty, 0); },
  shipping()  { return this.subtotal() >= 99 ? 0 : 9.95; },
  total()     { return this.subtotal() + this.shipping(); },
  clear()     { this.save([]); CartUI.update(); },

  add(id, qty = 1) {
    const a = this.get(), x = a.find(i => i.id === id);
    if (x) x.qty = Math.min(10, x.qty + qty);
    else   a.push({ id, qty: Math.min(10, qty) });
    this.save(a); CartUI.update();
  },

  remove(id) { this.save(this.get().filter(i => i.id !== id)); CartUI.update(); },

  setQty(id, qty) {
    if (qty < 1) { this.remove(id); return; }
    const a = this.get(), x = a.find(i => i.id === id);
    if (x) { x.qty = Math.min(10, qty); this.save(a); CartUI.update(); }
  },
};

/* --- Cart UI --- */
const CartUI = {
  update() { this.updateBadge(); this.renderDrawer(); },

  updateBadge() {
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    const n = Cart.count();
    badge.textContent = n;
    badge.style.display = n ? 'flex' : 'none';
  },

  openDrawer() {
    document.getElementById('cart-drawer')?.classList.add('open');
    document.getElementById('cart-backdrop')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeDrawer() {
    document.getElementById('cart-drawer')?.classList.remove('open');
    document.getElementById('cart-backdrop')?.classList.remove('open');
    document.body.style.overflow = '';
  },

  showToast(msg) {
    const el = document.getElementById('toast-notif');
    if (!el) return;
    el.innerHTML = `<span class="toast-check">✓</span> ${msg}`;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 3200);
  },

  renderDrawer() {
    const scroll    = document.getElementById('cart-items-scroll');
    const upsellEl  = document.getElementById('cart-upsell-section');
    const summaryEl = document.getElementById('cart-summary-section');
    const ctaEl     = document.getElementById('cart-cta-section');
    if (!scroll) return;

    const items = Cart.get();

    if (!items.length) {
      scroll.innerHTML = `
        <div class="cart-empty-state">
          <div class="empty-box">📦</div>
          <p>Your cart is empty</p>
          <a href="index.html#products" class="pcard-btn" style="font-size:.78rem;padding:9px 18px;display:inline-block;text-decoration:none;margin-top:6px;" onclick="CartUI.closeDrawer()">SHOP KITS →</a>
        </div>`;
      if (upsellEl)  upsellEl.style.display  = 'none';
      if (summaryEl) summaryEl.innerHTML = '';
      if (ctaEl)     ctaEl.style.display = 'none';
      return;
    }

    if (ctaEl) ctaEl.style.display = '';

    /* Items */
    scroll.innerHTML = items.map(({ id, qty }) => {
      const p = PRODUCTS[id]; if (!p) return '';
      return `
        <div class="c-item">
          <div class="c-thumb">${PRODUCT_DETAILS?.[id]?.image ? `<img src="${encodeURI(PRODUCT_DETAILS[id].image)}" style="width:100%;height:100%;object-fit:cover" alt="${p.name}">` : p.emoji}</div>
          <div>
            <div class="c-name">${p.name}</div>
            <div class="c-variant">${p.variant}</div>
            <div class="c-controls">
              <div class="qty-c">
                <button onclick="Cart.setQty('${id}',${qty-1})"${qty<=1?' disabled':''}>−</button>
                <span>${qty}</span>
                <button onclick="Cart.setQty('${id}',${qty+1})"${qty>=10?' disabled':''}>+</button>
              </div>
              <button class="c-remove" onclick="Cart.remove('${id}')">✕ Remove</button>
            </div>
          </div>
          <div class="c-price">$${(p.price * qty).toFixed(2)}</div>
        </div>`;
    }).join('');

    /* Upsell */
    if (upsellEl) {
      const inCart = items.map(i => i.id);
      const sugg = ACTIVE_PRODUCTS.filter(id => !inCart.includes(id)).slice(0, 2).map(id => PRODUCTS[id]).filter(Boolean);
      if (sugg.length) {
        upsellEl.style.display = '';
        upsellEl.innerHTML = `
          <div class="cart-upsell-title">Customers who bought this also added:</div>
          ${sugg.map(p => `
            <div class="c-upsell-item">
              <span class="c-upsell-emoji">${PRODUCT_DETAILS?.[p.id]?.image ? `<img src="${encodeURI(PRODUCT_DETAILS[p.id].image)}" style="width:100%;height:100%;object-fit:cover;border-radius:6px" alt="${p.name}">` : p.emoji}</span>
              <span class="c-upsell-name">${p.name}</span>
              <span class="c-upsell-price">$${p.price.toFixed(2)}</span>
              <button class="c-upsell-add" onclick="Cart.add('${p.id}',1);CartUI.showToast('${p.name} added to cart')">+ ADD</button>
            </div>`).join('')}`;
      } else {
        upsellEl.style.display = 'none';
      }
    }

    /* Summary */
    if (summaryEl) {
      const sub      = Cart.subtotal();
      const ship     = Cart.shipping();
      const total    = Cart.total();
      const freeAt   = 99;
      const remaining = Math.max(0, freeAt - sub);
      const shipDisplay = ship === 0
        ? '<span class="cs-val free-ship">FREE</span>'
        : `<span class="cs-val">AUD $${ship.toFixed(2)}</span>`;
      const nudge = remaining > 0
        ? `<div style="background:var(--teal-light);border:1px solid var(--teal-mid);border-radius:7px;padding:8px 12px;font-size:0.74rem;color:var(--turquoise-dk);font-weight:500;margin-bottom:10px;">
            Add <strong>$${remaining.toFixed(2)}</strong> more for free
           </div>` : '';
      summaryEl.innerHTML = `
        ${nudge}
        <div class="cs-row"><span class="cs-lbl">Subtotal</span><span class="cs-val">$${sub.toFixed(2)}</span></div>
        <div class="cs-row"><span class="cs-lbl">Shipping</span>${shipDisplay}</div>
        <div class="cs-divider"></div>
        <div class="cs-total-row">
          <span class="cs-total-lbl">Total</span>
          <span class="cs-total-val">AUD $${total.toFixed(2)}</span>
        </div>`;
    }
  },
};

/* --- Add-to-cart button handler --- */
function handleAddToCart(btn, productId) {
  const qtyEl = document.getElementById('qty-' + productId);
  const qty = qtyEl ? (parseInt(qtyEl.textContent) || 1) : 1;
  const p = PRODUCTS[productId];
  if (!p) return;

  Cart.add(productId, qty);
  CartUI.showToast(p.name + ' added to cart');
  CartUI.openDrawer();

  const orig = btn.innerHTML;
  btn.innerHTML = '✅ ADDED TO CART';
  btn.style.background = '#00B87A';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = orig;
    btn.style.background = '';
    btn.disabled = false;
  }, 2000);
}

/* --- Init --- */
document.addEventListener('DOMContentLoaded', () => {
  CartUI.update();

  document.getElementById('nav-cart-btn')
    ?.addEventListener('click', () => { CartUI.renderDrawer(); CartUI.openDrawer(); });

  document.getElementById('cart-backdrop')
    ?.addEventListener('click', () => CartUI.closeDrawer());

  document.getElementById('cart-close-btn')
    ?.addEventListener('click', () => CartUI.closeDrawer());

  /* Card quantity steppers */
  document.querySelectorAll('.card-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.product;
      const el = document.getElementById('qty-' + id);
      if (!el) return;
      let q = parseInt(el.textContent);
      q = btn.dataset.dir === 'up' ? Math.min(10, q + 1) : Math.max(1, q - 1);
      el.textContent = q;
      const wrap = btn.closest('.qty-c');
      wrap.querySelector('[data-dir="down"]').disabled = q <= 1;
      wrap.querySelector('[data-dir="up"]').disabled   = q >= 10;
    });
  });
});
