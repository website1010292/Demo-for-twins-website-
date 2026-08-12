/* ==========================================================================
   TWIN DESIGN — script.js
   Centralized product data + all front-end functionality.
   Organized in sections: DATA, STATE/STORAGE, UTIL, HEADER/NAV, TOASTS,
   PRODUCT CARDS, SEARCH, WISHLIST, CART, FILTERS/SORT, PRODUCT PAGE,
   CHECKOUT, SCROLL REVEAL, INIT.
   ========================================================================== */

/* ==========================================================================
   1. PRODUCT DATA — edit names, prices, images, sizes, colors here.
   Image paths are relative to each HTML page's own folder depth; pages
   build the correct prefix via the IMG_BASE constant set per page.
   ========================================================================== */
const PRODUCTS = [
  {
    id: "m1", slug: "royal-sage-boski", name: "Royal Sage Boski Suit",
    gender: "men", category: "Boski", fabric: "Pure Boski",
    price: 4599, originalPrice: null, isNew: true,
    colors: [{ name: "Sage", hex: "#92A187" }, { name: "Espresso", hex: "#2A2219" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8, reviews: 24,
    description: "A refined take on pure Boski, cut for warm-weather comfort with a soft drape and understated sheen. Finished with a classic mandarin collar and clean button placket.",
    img: "royal-sage-boski"
  },
  {
    id: "m2", slug: "royal-lavender-boski", name: "Royal Lavender Boski Suit",
    gender: "men", category: "Boski", fabric: "Pure Boski",
    price: 4599, originalPrice: null, isNew: true,
    colors: [{ name: "Lavender", hex: "#A398B2" }, { name: "Charcoal", hex: "#362F28" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7, reviews: 18,
    description: "A soft lavender Boski suit with a fluid, breathable handle. Tailored with a modern straight-cut silhouette for everyday elegance.",
    img: "royal-lavender-boski"
  },
  {
    id: "m3", slug: "royal-white-cotton", name: "Royal White Cotton Suit",
    gender: "men", category: "Cotton", fabric: "Pure Cotton",
    price: 3999, originalPrice: 6000, isNew: false,
    colors: [{ name: "White", hex: "#EFE7D6" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9, reviews: 31,
    description: "Crisp pure cotton in a timeless white, breathable and easy to wear through the season. A wardrobe essential with a tailored, structured finish.",
    img: "royal-white-cotton"
  },
  {
    id: "m4", slug: "classic-off-white-boski", name: "Classic Off-White Boski Suit",
    gender: "men", category: "Boski", fabric: "Pure Boski",
    price: 4599, originalPrice: 6000, isNew: false,
    colors: [{ name: "Off-White", hex: "#DED1B8" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.6, reviews: 15,
    description: "An understated off-white Boski suit with a subtle natural texture. Designed for occasions that call for quiet, confident elegance.",
    img: "classic-off-white-boski"
  },
  {
    id: "w1", slug: "dusty-rose-grace", name: "Dusty Rose Grace",
    gender: "women", category: "3 Piece", fabric: "Lawn",
    price: 3199, originalPrice: 6000, isNew: true,
    colors: [{ name: "Dusty Rose", hex: "#C58F82" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.9, reviews: 42,
    description: "A dusty rose three-piece suit with delicate embroidery detail on the neckline. Paired with a soft chiffon dupatta for an elegant finish.",
    img: "dusty-rose-grace"
  },
  {
    id: "w2", slug: "zarmina-black-cotton", name: "Zarmina Black Cotton Suit",
    gender: "women", category: "Cotton", fabric: "Pure Cotton",
    price: 3499, originalPrice: null, isNew: false,
    colors: [{ name: "Black", hex: "#2A2219" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7, reviews: 27,
    description: "A refined black cotton suit with clean lines and a comfortable, breathable weave — versatile enough for everyday wear or evening occasions.",
    img: "zarmina-black-cotton"
  },
  {
    id: "w3", slug: "emerald-bandhani", name: "Emerald Bandhani",
    gender: "women", category: "3 Piece", fabric: "Lawn",
    price: 3499, originalPrice: 6000, isNew: true,
    colors: [{ name: "Emerald", hex: "#5C6E52" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8, reviews: 19,
    description: "A rich emerald bandhani-print three-piece suit, blending traditional tie-dye artistry with a contemporary silhouette.",
    img: "emerald-bandhani"
  },
  {
    id: "w4", slug: "sunehri-bahaar-floral", name: "Sunehri Bahaar Floral",
    gender: "women", category: "3 Piece", fabric: "Premium Printed Lawn",
    price: 2999, originalPrice: null, isNew: true,
    colors: [{ name: "Champagne", hex: "#C6A664" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6, reviews: 22,
    description: "A premium printed lawn three-piece suit in a warm golden floral motif — light, airy, and beautifully suited to festive daywear.",
    img: "sunehri-bahaar-floral"
  },
  {
    id: "w5", slug: "lavender-blossom-cotton", name: "Lavender Blossom Cotton Suit",
    gender: "women", category: "3 Piece", fabric: "Pure Cotton",
    price: 3499, originalPrice: null, isNew: false,
    colors: [{ name: "Lavender", hex: "#A398B2" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7, reviews: 16,
    description: "A soft lavender three-piece cotton suit with a gentle blossom motif, cut for a relaxed, breathable fit through warmer months.",
    img: "lavender-blossom-cotton"
  },
  {
    id: "w6", slug: "mocha-mustard-printed", name: "Mocha Mustard Printed 3 Piece Suit",
    gender: "women", category: "3 Piece", fabric: "Printed Lawn",
    price: 3599, originalPrice: 6000, isNew: false,
    colors: [{ name: "Mocha", hex: "#8A7A63" }, { name: "Mustard", hex: "#C6A664" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8, reviews: 29,
    description: "A warm mocha and mustard printed three-piece suit, rich in tone and detail — a striking choice for gatherings and celebrations.",
    img: "mocha-mustard-printed"
  }
];

/* Demo customer reviews shown on homepage */
const DEMO_REVIEWS = [
  { name: "Ayesha R.", rating: 5, product: "Dusty Rose Grace", text: "The fabric feels so much richer than the photos suggest. Stitching is neat and the fit was true to size." },
  { name: "Hamza K.", rating: 5, product: "Royal Sage Boski Suit", text: "Exactly the quiet, elegant look I wanted for Eid. Comfortable all day and the colour is beautiful in person." },
  { name: "Sana M.", rating: 4, product: "Emerald Bandhani", text: "Lovely print and colour depth. Delivery took a little longer than expected but the piece was worth the wait." }
];

/* ==========================================================================
   2. IMAGE PATH HELPER — each page sets window.IMG_BASE to "images" or "../images"
   ========================================================================== */
function imgBase() { return window.IMG_BASE || "images"; }
function productImg(product, view) {
  return `${imgBase()}/products/${product.img}-${view || "main"}.jpg`;
}
function categoryImg(path) { return `${imgBase()}/${path}`; }

/* ==========================================================================
   3. STORAGE HELPERS (localStorage — cart & wishlist persist across pages)
   ========================================================================== */
const Store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
};

const Cart = {
  KEY: "twindesign_cart",
  items() { return Store.get(this.KEY, []); },
  save(items) { Store.set(this.KEY, items); updateCartBadge(); },
  add(product, size, color, qty) {
    const items = this.items();
    const existing = items.find(i => i.id === product.id && i.size === size && i.color === color);
    if (existing) { existing.qty += qty; }
    else {
      items.push({
        id: product.id, slug: product.slug, name: product.name, price: product.price,
        image: productImg(product, "main"), size, color, qty, fabric: product.fabric
      });
    }
    this.save(items);
  },
  updateQty(index, qty) {
    const items = this.items();
    if (!items[index]) return;
    if (qty <= 0) { items.splice(index, 1); } else { items[index].qty = qty; }
    this.save(items);
  },
  remove(index) {
    const items = this.items();
    items.splice(index, 1);
    this.save(items);
  },
  clear() { this.save([]); },
  subtotal() { return this.items().reduce((sum, i) => sum + i.price * i.qty, 0); },
  count() { return this.items().reduce((sum, i) => sum + i.qty, 0); }
};

/* ==========================================================================
   3b. WHATSAPP ORDER — builds a professional quotation message from the
   cart and opens WhatsApp (wa.me) with it pre-filled.
   ========================================================================== */
const WHATSAPP_NUMBER = "923125395122"; // international format, no + or leading 0

function buildWhatsAppOrderMessage() {
  const items = Cart.items();
  if (items.length === 0) return null;

  const subtotal = Cart.subtotal();
  const shipping = subtotal >= 5000 ? 0 : 250;
  const total = subtotal + shipping;

  // Optional: pick up customer details if the checkout form is present & filled on this page
  const nameEl = document.getElementById("co-name");
  const phoneEl = document.getElementById("co-phone");
  const addressEl = document.getElementById("co-address");
  const cityEl = document.getElementById("co-city");
  const customer = {
    name: nameEl && nameEl.value.trim(),
    phone: phoneEl && phoneEl.value.trim(),
    address: addressEl && addressEl.value.trim(),
    city: cityEl && cityEl.value.trim()
  };

  let msg = "Hello TWIN DESIGN! I'd like to place an order.\n\n";
  msg += "*ORDER DETAILS*\n";
  items.forEach((item, i) => {
    const variant = [item.color, item.size ? "Size " + item.size : ""].filter(Boolean).join(", ");
    msg += `${i + 1}. ${item.name}${variant ? " (" + variant + ")" : ""}\n`;
    msg += `   Qty: ${item.qty} x Rs. ${formatPrice(item.price)} = Rs. ${formatPrice(item.price * item.qty)}\n`;
  });
  msg += `\nSubtotal: Rs. ${formatPrice(subtotal)}`;
  msg += `\nShipping: ${shipping === 0 ? "Free" : "Rs. " + formatPrice(shipping)}`;
  msg += `\n*Total: Rs. ${formatPrice(total)}*`;

  if (customer.name || customer.phone || customer.address) {
    msg += "\n\n*DELIVERY DETAILS*";
    if (customer.name) msg += `\nName: ${customer.name}`;
    if (customer.phone) msg += `\nPhone: ${customer.phone}`;
    if (customer.address) msg += `\nAddress: ${customer.address}${customer.city ? ", " + customer.city : ""}`;
  }

  msg += "\n\nPlease confirm availability and delivery details. Thank you!";
  return msg;
}

function orderOnWhatsApp() {
  const message = buildWhatsAppOrderMessage();
  if (!message) { showToast("Your bag is empty"); return; }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

const Wishlist = {
  KEY: "twindesign_wishlist",
  items() { return Store.get(this.KEY, []); },
  save(items) { Store.set(this.KEY, items); updateWishlistBadge(); refreshWishButtons(); },
  has(id) { return this.items().some(i => i.id === id); },
  toggle(product) {
    let items = this.items();
    if (this.has(product.id)) {
      items = items.filter(i => i.id !== product.id);
    } else {
      items.push({ id: product.id, slug: product.slug });
    }
    this.save(items);
    return this.has(product.id);
  },
  remove(id) {
    this.save(this.items().filter(i => i.id !== id));
  }
};

function updateCartBadge() {
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = Cart.count();
    el.style.display = Cart.count() > 0 ? "flex" : "none";
  });
}
function updateWishlistBadge() {
  document.querySelectorAll("[data-wishlist-count]").forEach(el => {
    el.textContent = Wishlist.items().length;
    el.style.display = Wishlist.items().length > 0 ? "flex" : "none";
  });
}
function refreshWishButtons() {
  document.querySelectorAll("[data-wish-btn]").forEach(btn => {
    const id = btn.getAttribute("data-wish-btn");
    btn.classList.toggle("active", Wishlist.has(id));
  });
}

/* ==========================================================================
   4. TOASTS
   ========================================================================== */
function ensureToastStack() {
  let stack = document.querySelector(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }
  return stack;
}
function showToast(message) {
  const stack = ensureToastStack();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  stack.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 350);
  }, 2600);
}

/* ==========================================================================
   5. HEADER / MOBILE DRAWER / SEARCH / CART DRAWER
   ========================================================================== */
function initHeader() {
  const hamburger = document.querySelector("[data-hamburger]");
  const drawer = document.querySelector("[data-mobile-drawer]");
  const overlay = document.querySelector("[data-drawer-overlay]");
  const drawerClose = document.querySelector("[data-drawer-close]");

  function openDrawer() { drawer && drawer.classList.add("open"); overlay && overlay.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeDrawer() { drawer && drawer.classList.remove("open"); overlay && overlay.classList.remove("open"); document.body.style.overflow = ""; }
  hamburger && hamburger.addEventListener("click", openDrawer);
  drawerClose && drawerClose.addEventListener("click", closeDrawer);
  overlay && overlay.addEventListener("click", closeDrawer);

  // Search flyout
  const searchTriggers = document.querySelectorAll("[data-search-trigger]");
  const searchFlyout = document.querySelector("[data-search-flyout]");
  const searchClose = document.querySelector("[data-search-close]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchResults = document.querySelector("[data-search-results]");

  function openSearch() {
    searchFlyout && searchFlyout.classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(() => searchInput && searchInput.focus(), 200);
  }
  function closeSearch() { searchFlyout && searchFlyout.classList.remove("open"); document.body.style.overflow = ""; }
  searchTriggers.forEach(btn => btn.addEventListener("click", openSearch));
  searchClose && searchClose.addEventListener("click", closeSearch);
  searchFlyout && searchFlyout.addEventListener("click", e => { if (e.target === searchFlyout) closeSearch(); });

  if (searchInput) {
    searchInput.addEventListener("input", () => renderSearchResults(searchInput.value, searchResults));
    renderSearchResults("", searchResults);
  }

  // Cart drawer
  const cartTriggers = document.querySelectorAll("[data-cart-trigger]");
  const cartDrawer = document.querySelector("[data-cart-drawer]");
  const cartOverlay = document.querySelector("[data-cart-overlay]");
  const cartClose = document.querySelector("[data-cart-close]");
  function openCartDrawer() { renderMiniCart(); cartDrawer && cartDrawer.classList.add("open"); cartOverlay && cartOverlay.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeCartDrawer() { cartDrawer && cartDrawer.classList.remove("open"); cartOverlay && cartOverlay.classList.remove("open"); document.body.style.overflow = ""; }
  cartTriggers.forEach(btn => btn.addEventListener("click", (e) => {
    if (btn.getAttribute("data-cart-trigger") === "drawer") { e.preventDefault(); openCartDrawer(); }
  }));
  cartClose && cartClose.addEventListener("click", closeCartDrawer);
  cartOverlay && cartOverlay.addEventListener("click", closeCartDrawer);
  window.closeCartDrawer = closeCartDrawer;

  // Sticky header shrink shadow
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 10 ? "0 2px 20px rgba(42,34,25,.06)" : "none";
  });

  updateCartBadge();
  updateWishlistBadge();

  // WhatsApp order button (delegated — works for buttons added dynamically too)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-whatsapp-order]");
    if (btn) { e.preventDefault(); orderOnWhatsApp(); }
  });
}

function renderSearchResults(query, container) {
  if (!container) return;
  const q = query.trim().toLowerCase();
  let matches = [];
  if (q.length > 0) {
    matches = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.gender.toLowerCase().includes(q)
    ).slice(0, 8);
  }
  if (q.length === 0) {
    container.innerHTML = `<div class="search-empty">Start typing to search products, categories, and fabrics.</div>`;
    return;
  }
  if (matches.length === 0) {
    container.innerHTML = `<div class="search-empty">No results for "<strong>${escapeHtml(query)}</strong>". Try “boski”, “lawn”, or “3 piece”.</div>`;
    return;
  }
  container.innerHTML = matches.map(p => `
    <a class="search-suggestion" href="${productLink(p)}">
      <img src="${productImg(p, 'main')}" alt="${p.name}">
      <div>
        <div class="ss-name">${p.name}</div>
        <div class="ss-meta">${p.fabric} · Rs. ${formatPrice(p.price)}</div>
      </div>
    </a>`).join("");
}

function productLink(p) {
  const prefix = (window.IMG_BASE && window.IMG_BASE.startsWith("..")) ? "" : "";
  return `product.html?slug=${p.slug}`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
function formatPrice(n) { return Number(n).toLocaleString("en-PK"); }

/* ==========================================================================
   6. MINI CART DRAWER RENDER
   ========================================================================== */
function renderMiniCart() {
  const container = document.querySelector("[data-mini-cart-items]");
  const subtotalEl = document.querySelector("[data-mini-cart-subtotal]");
  if (!container) return;
  const items = Cart.items();
  if (items.length === 0) {
    container.innerHTML = `<div class="search-empty">Your bag is empty.<br><br><a href="shop.html" class="link-underline">Continue shopping →</a></div>`;
  } else {
    container.innerHTML = items.map((item, idx) => `
      <div class="mini-cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div style="flex:1">
          <div class="mci-name">${item.name}</div>
          <div class="mci-meta">${item.color || ""}${item.color && item.size ? " · " : ""}${item.size ? "Size " + item.size : ""}</div>
          <div class="mci-meta">Rs. ${formatPrice(item.price)}</div>
          <div class="mci-qty">
            <div class="qty-control">
              <button data-mini-qty-dec="${idx}" aria-label="Decrease quantity">−</button>
              <span>${item.qty}</span>
              <button data-mini-qty-inc="${idx}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button class="mci-remove" data-mini-remove="${idx}">Remove</button>
        </div>
      </div>`).join("");
  }
  if (subtotalEl) subtotalEl.textContent = "Rs. " + formatPrice(Cart.subtotal());

  container.querySelectorAll("[data-mini-qty-inc]").forEach(btn => btn.addEventListener("click", () => {
    const i = +btn.getAttribute("data-mini-qty-inc"); Cart.updateQty(i, Cart.items()[i].qty + 1); renderMiniCart();
  }));
  container.querySelectorAll("[data-mini-qty-dec]").forEach(btn => btn.addEventListener("click", () => {
    const i = +btn.getAttribute("data-mini-qty-dec"); Cart.updateQty(i, Cart.items()[i].qty - 1); renderMiniCart();
  }));
  container.querySelectorAll("[data-mini-remove]").forEach(btn => btn.addEventListener("click", () => {
    const i = +btn.getAttribute("data-mini-remove"); Cart.remove(i); renderMiniCart(); showToast("Removed from bag");
  }));
}

/* ==========================================================================
   7. PRODUCT CARD RENDERING (used on home, shop, men, women, related, wishlist)
   ========================================================================== */
function productCardHtml(p) {
  const onSale = p.originalPrice && p.originalPrice > p.price;
  const priceHtml = onSale
    ? `<span class="price-original">Rs. ${formatPrice(p.originalPrice)}</span><span class="price-sale">Rs. ${formatPrice(p.price)}</span>`
    : `<span class="price-regular">Rs. ${formatPrice(p.price)}</span>`;
  const badge = onSale ? `<span class="product-badge">Sale</span>` : (p.isNew ? `<span class="product-badge">New</span>` : "");
  return `
  <div class="product-card" data-product-id="${p.id}">
    <div class="product-media">
      <a href="product.html?slug=${p.slug}">
        <img class="img-main" src="${productImg(p, 'main')}" alt="${p.name}" loading="lazy">
        <img class="img-alt" src="${productImg(p, 'alt')}" alt="" loading="lazy">
      </a>
      ${badge}
      <button class="product-wish" data-wish-btn="${p.id}" aria-label="Add ${p.name} to wishlist">
        <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.9-10-9.3C.3 8 2 4 6 4c2.2 0 3.7 1.2 6 3.8C14.3 5.2 15.8 4 18 4c4 0 5.7 4 4 7.7C19.5 16.1 12 21 12 21z"/></svg>
      </button>
      <span class="product-quickview" data-quickview="${p.id}">Quick View</span>
    </div>
    <div class="product-info">
      <div class="product-cat">${p.fabric}</div>
      <a href="product.html?slug=${p.slug}"><h3 class="product-name">${p.name}</h3></a>
      <div class="product-price">${priceHtml}</div>
      <div class="product-actions">
        <button class="add-to-bag-btn" data-quick-add="${p.id}">Add to Bag</button>
      </div>
    </div>
  </div>`;
}

function renderProductGrid(container, products) {
  if (!container) return;
  if (products.length === 0) {
    container.innerHTML = `<div class="no-results"><h3>No products found</h3><p>Try adjusting filters or search for something else.</p><button class="btn btn-outline" data-clear-filters>Clear Filters</button></div>`;
    return;
  }
  container.innerHTML = products.map(productCardHtml).join("");
  bindProductCardEvents(container);
}

function bindProductCardEvents(scope) {
  (scope || document).querySelectorAll("[data-wish-btn]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-wish-btn");
      const product = PRODUCTS.find(p => p.id === id);
      const nowActive = Wishlist.toggle(product);
      showToast(nowActive ? "Added to wishlist" : "Removed from wishlist");
    });
  });
  (scope || document).querySelectorAll("[data-quick-add]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-quick-add");
      const product = PRODUCTS.find(p => p.id === id);
      Cart.add(product, product.sizes[Math.floor(product.sizes.length/2)], product.colors[0].name, 1);
      showToast(`${product.name} added to bag`);
    });
  });
  (scope || document).querySelectorAll("[data-quickview]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-quickview");
      openQuickView(PRODUCTS.find(p => p.id === id));
    });
  });
  refreshWishButtons();
}

/* ==========================================================================
   8. QUICK VIEW MODAL
   ========================================================================== */
function openQuickView(product) {
  let modal = document.querySelector("[data-quickview-modal]");
  if (!modal) return;
  const onSale = product.originalPrice && product.originalPrice > product.price;
  modal.querySelector("[data-qv-body]").innerHTML = `
    <img src="${productImg(product, 'main')}" alt="${product.name}">
    <div>
      <div class="eyebrow">${product.fabric}</div>
      <h3 class="pd-title" style="font-size:24px;margin:10px 0">${product.name}</h3>
      <div class="pd-price" style="font-size:18px;margin-bottom:16px;">
        ${onSale ? `<span class="price-original">Rs. ${formatPrice(product.originalPrice)}</span><span class="price-sale">Rs. ${formatPrice(product.price)}</span>` : `<span class="price-regular">Rs. ${formatPrice(product.price)}</span>`}
      </div>
      <p class="pd-desc" style="font-size:13.5px;">${product.description}</p>
      <a class="btn btn-primary btn-block" href="product.html?slug=${product.slug}">View Full Details</a>
    </div>`;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}
function initQuickViewModal() {
  const modal = document.querySelector("[data-quickview-modal]");
  if (!modal) return;
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.hasAttribute("data-modal-close")) closeModal(modal); });
}
function closeModal(modal) { modal.classList.remove("open"); document.body.style.overflow = ""; }

/* ==========================================================================
   9. SCROLL REVEAL
   ========================================================================== */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || items.length === 0) {
    items.forEach(i => i.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
  items.forEach((item, idx) => {
    item.style.setProperty("--i", idx % 6);
    io.observe(item);
  });
}

/* ==========================================================================
   10. HERO LOAD ANIMATION
   ========================================================================== */
function initHero() {
  const hero = document.querySelector(".hero");
  if (hero) requestAnimationFrame(() => setTimeout(() => hero.classList.add("loaded"), 60));
}

/* ==========================================================================
   11. NEWSLETTER FORMS
   ========================================================================== */
function initNewsletterForms() {
  document.querySelectorAll("[data-newsletter-form]").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type=email]");
      if (input && input.value.trim()) {
        showToast("You're subscribed — welcome to Twin Design.");
        form.reset();
      }
    });
  });
}

/* ==========================================================================
   12. SHOP PAGE — filtering & sorting
   ========================================================================== */
function initShopPage() {
  const grid = document.querySelector("[data-shop-grid]");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const state = {
    gender: params.get("gender") || "all",
    categories: new Set(),
    fabrics: new Set(),
    sizes: new Set(),
    colors: new Set(),
    maxPrice: 6000,
    saleOnly: params.get("sale") === "1",
    newOnly: false,
    sort: "featured",
    query: params.get("q") || ""
  };
  // The "category" URL param is used two ways across the site: as a real
  // product category (Boski / Cotton / 3 Piece), or as a shortcut for
  // "New Arrivals" / a gender (e.g. shop.html?category=New, ?category=Men).
  // Detect which one it is so every link into the shop page filters correctly.
  const categoryParam = params.get("category");
  if (categoryParam) {
    const categoryLower = categoryParam.toLowerCase();
    if (categoryLower === "new") {
      state.newOnly = true;
    } else if (categoryLower === "men" || categoryLower === "women") {
      state.gender = categoryLower;
    } else {
      state.categories.add(categoryParam);
    }
  }

  function apply() {
    let list = PRODUCTS.slice();
    if (state.gender !== "all") list = list.filter(p => p.gender === state.gender);
    if (state.categories.size) list = list.filter(p => state.categories.has(p.category));
    if (state.fabrics.size) list = list.filter(p => state.fabrics.has(p.fabric));
    if (state.sizes.size) list = list.filter(p => p.sizes.some(s => state.sizes.has(s)));
    if (state.colors.size) list = list.filter(p => p.colors.some(c => state.colors.has(c.name)));
    if (state.saleOnly) list = list.filter(p => p.originalPrice && p.originalPrice > p.price);
    if (state.newOnly) list = list.filter(p => p.isNew);
    list = list.filter(p => p.price <= state.maxPrice);
    if (state.query) {
      const q = state.query.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.fabric.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    switch (state.sort) {
      case "price-low": list.sort((a,b) => a.price - b.price); break;
      case "price-high": list.sort((a,b) => b.price - a.price); break;
      case "newest": list.sort((a,b) => (b.isNew?1:0) - (a.isNew?1:0)); break;
      case "best-selling": list.sort((a,b) => b.reviews - a.reviews); break;
      default: break;
    }
    renderProductGrid(grid, list);
    const countEl = document.querySelector("[data-result-count]");
    if (countEl) countEl.textContent = `${list.length} ${list.length === 1 ? "product" : "products"}`;
  }

  // gender tabs
  document.querySelectorAll("[data-filter-gender]").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-filter-gender") === state.gender);
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-filter-gender]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.gender = btn.getAttribute("data-filter-gender");
      apply();
    });
  });

  // checkbox filters (category / fabric / size)
  document.querySelectorAll("[data-filter-category]").forEach(cb => {
    if (state.categories.has(cb.value)) cb.checked = true;
    cb.addEventListener("change", () => {
      const v = cb.value;
      cb.checked ? state.categories.add(v) : state.categories.delete(v);
      apply();
    });
  });
  document.querySelectorAll("[data-filter-fabric]").forEach(cb => {
    cb.addEventListener("change", () => {
      const v = cb.value;
      cb.checked ? state.fabrics.add(v) : state.fabrics.delete(v);
      apply();
    });
  });
  document.querySelectorAll("[data-filter-size]").forEach(pill => {
    pill.addEventListener("click", () => {
      const v = pill.getAttribute("data-filter-size");
      pill.classList.toggle("selected");
      pill.classList.contains("selected") ? state.sizes.add(v) : state.sizes.delete(v);
      apply();
    });
  });
  document.querySelectorAll("[data-filter-color]").forEach(sw => {
    sw.addEventListener("click", () => {
      const v = sw.getAttribute("data-filter-color");
      sw.classList.toggle("selected");
      sw.classList.contains("selected") ? state.colors.add(v) : state.colors.delete(v);
      apply();
    });
  });
  const saleCb = document.querySelector("[data-filter-sale]");
  if (saleCb) {
    saleCb.checked = state.saleOnly;
    saleCb.addEventListener("change", () => { state.saleOnly = saleCb.checked; apply(); });
  }
  const priceRange = document.querySelector("[data-filter-price]");
  if (priceRange) {
    priceRange.addEventListener("input", () => {
      state.maxPrice = +priceRange.value;
      const label = document.querySelector("[data-filter-price-label]");
      if (label) label.textContent = "Up to Rs. " + formatPrice(state.maxPrice);
      apply();
    });
  }
  const sortSelect = document.querySelector("[data-sort-select]");
  if (sortSelect) sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; apply(); });

  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-clear-filters]") || e.target.closest("[data-clear-filters]")) {
      state.categories.clear(); state.fabrics.clear(); state.sizes.clear(); state.colors.clear();
      state.saleOnly = false; state.maxPrice = 6000; state.query = "";
      document.querySelectorAll("[data-filter-category],[data-filter-fabric]").forEach(cb => cb.checked = false);
      document.querySelectorAll("[data-filter-size].selected,[data-filter-color].selected").forEach(el => el.classList.remove("selected"));
      if (saleCb) saleCb.checked = false;
      if (priceRange) priceRange.value = 6000;
      apply();
    }
  });

  // Mobile filter drawer
  const filterDrawer = document.querySelector("[data-filter-drawer]");
  const filterOverlay = document.querySelector("[data-filter-overlay]");
  document.querySelectorAll("[data-filter-toggle]").forEach(btn => btn.addEventListener("click", () => {
    filterDrawer && filterDrawer.classList.add("open");
    filterOverlay && filterOverlay.classList.add("open");
  }));
  document.querySelectorAll("[data-filter-close]").forEach(btn => btn.addEventListener("click", () => {
    filterDrawer && filterDrawer.classList.remove("open");
    filterOverlay && filterOverlay.classList.remove("open");
  }));
  filterOverlay && filterOverlay.addEventListener("click", () => {
    filterDrawer.classList.remove("open"); filterOverlay.classList.remove("open");
  });

  apply();
}

/* ==========================================================================
   13. PRODUCT DETAIL PAGE
   ========================================================================== */
function initProductPage() {
  const root = document.querySelector("[data-product-page]");
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug") || PRODUCTS[0].slug;
  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  const onSale = product.originalPrice && product.originalPrice > product.price;
  const discount = onSale ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  document.title = `${product.name} — TWIN DESIGN`;

  root.querySelectorAll("[data-pd-fabric]").forEach(el => { el.textContent = product.fabric; });
  root.querySelector("[data-pd-title]").textContent = product.name;
  root.querySelector("[data-pd-rating-count]").textContent = `${product.rating} (${product.reviews} reviews)`;
  root.querySelector("[data-pd-desc]").textContent = product.description;

  const priceEl = root.querySelector("[data-pd-price]");
  priceEl.innerHTML = onSale
    ? `<span class="price-original">Rs. ${formatPrice(product.originalPrice)}</span><span class="price-sale">Rs. ${formatPrice(product.price)}</span><span class="pd-discount">-${discount}%</span>`
    : `<span class="price-regular">Rs. ${formatPrice(product.price)}</span>`;

  // Gallery
  const views = ["main", "alt", "detail"];
  const mainImg = root.querySelector("[data-gallery-main] img");
  const thumbsWrap = root.querySelector("[data-gallery-thumbs]");
  mainImg.src = productImg(product, "main");
  mainImg.alt = product.name;
  thumbsWrap.innerHTML = views.map((v, i) => `
    <button class="gallery-thumb ${i===0?'active':''}" data-thumb="${v}">
      <img src="${productImg(product, v)}" alt="${product.name} ${v}">
    </button>`).join("");
  thumbsWrap.querySelectorAll("[data-thumb]").forEach(btn => {
    btn.addEventListener("click", () => {
      thumbsWrap.querySelectorAll(".gallery-thumb").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      mainImg.src = productImg(product, btn.getAttribute("data-thumb"));
    });
  });
  const galleryMain = root.querySelector("[data-gallery-main]");
  galleryMain.addEventListener("click", () => galleryMain.classList.toggle("zoomed"));

  // Sizes
  const sizeWrap = root.querySelector("[data-pd-sizes]");
  let selectedSize = product.sizes[0];
  sizeWrap.innerHTML = product.sizes.map((s,i) => `<button class="size-pill ${i===0?'selected':''}" data-size="${s}">${s}</button>`).join("");
  sizeWrap.querySelectorAll("[data-size]").forEach(btn => btn.addEventListener("click", () => {
    sizeWrap.querySelectorAll(".size-pill").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedSize = btn.getAttribute("data-size");
  }));

  // Colors
  const colorWrap = root.querySelector("[data-pd-colors]");
  let selectedColor = product.colors[0].name;
  colorWrap.innerHTML = product.colors.map((c,i) => `<button class="color-swatch ${i===0?'selected':''}" style="background:${c.hex}" data-color="${c.name}" aria-label="${c.name}" title="${c.name}"></button>`).join("");
  colorWrap.querySelectorAll("[data-color]").forEach(btn => btn.addEventListener("click", () => {
    colorWrap.querySelectorAll(".color-swatch").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedColor = btn.getAttribute("data-color");
  }));

  // Quantity
  let qty = 1;
  const qtyDisplay = root.querySelector("[data-pd-qty]");
  root.querySelector("[data-qty-inc]").addEventListener("click", () => { qty++; qtyDisplay.textContent = qty; });
  root.querySelector("[data-qty-dec]").addEventListener("click", () => { qty = Math.max(1, qty-1); qtyDisplay.textContent = qty; });

  // Wishlist
  const wishBtn = root.querySelector("[data-pd-wish]");
  wishBtn.setAttribute("data-wish-btn", product.id);
  if (Wishlist.has(product.id)) wishBtn.classList.add("active");
  wishBtn.addEventListener("click", () => {
    const nowActive = Wishlist.toggle(product);
    showToast(nowActive ? "Added to wishlist" : "Removed from wishlist");
  });

  // Add to bag / Buy now
  root.querySelector("[data-pd-add]").addEventListener("click", () => {
    Cart.add(product, selectedSize, selectedColor, qty);
    showToast(`${product.name} added to bag`);
  });
  root.querySelector("[data-pd-buynow]").addEventListener("click", () => {
    Cart.add(product, selectedSize, selectedColor, qty);
    window.location.href = "checkout.html";
  });

  // Accordions
  root.querySelectorAll(".accordion-item").forEach(item => {
    const head = item.querySelector(".accordion-head");
    const body = item.querySelector(".accordion-body");
    head.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      root.querySelectorAll(".accordion-item").forEach(i => { i.classList.remove("open"); i.querySelector(".accordion-body").style.maxHeight = null; });
      if (!isOpen) { item.classList.add("open"); body.style.maxHeight = body.scrollHeight + "px"; }
    });
  });

  // Size guide modal
  const sizeModal = document.querySelector("[data-sizeguide-modal]");
  document.querySelectorAll("[data-sizeguide-open]").forEach(btn => btn.addEventListener("click", (e) => { e.preventDefault(); sizeModal.classList.add("open"); }));

  // Related products
  const relatedGrid = root.querySelector("[data-related-grid]");
  if (relatedGrid) {
    const related = PRODUCTS.filter(p => p.gender === product.gender && p.id !== product.id).slice(0, 4);
    renderProductGrid(relatedGrid, related);
  }
}

/* ==========================================================================
   14. CART PAGE
   ========================================================================== */
function initCartPage() {
  const wrap = document.querySelector("[data-cart-page]");
  if (!wrap) return;
  function render() {
    const items = Cart.items();
    const listEl = wrap.querySelector("[data-cart-list]");
    const emptyEl = wrap.querySelector("[data-cart-empty]");
    const filledEl = wrap.querySelector("[data-cart-filled]");
    if (items.length === 0) {
      emptyEl.style.display = "block";
      filledEl.style.display = "none";
      return;
    }
    emptyEl.style.display = "none";
    filledEl.style.display = "grid";
    listEl.innerHTML = items.map((item, idx) => `
      <div class="cart-row">
        <div class="cart-row-product">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <div class="cart-row-name">${item.name}</div>
            <div class="cart-row-meta">${item.color || ""}${item.color && item.size ? " · " : ""}${item.size ? "Size " + item.size : ""}</div>
            <div class="cart-row-meta">${item.fabric || ""}</div>
          </div>
        </div>
        <div class="cart-row-qtyprice">
          <div class="qty-control">
            <button data-cart-dec="${idx}" aria-label="Decrease quantity">−</button>
            <span>${item.qty}</span>
            <button data-cart-inc="${idx}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div>Rs. ${formatPrice(item.price)}</div>
        <div>Rs. ${formatPrice(item.price * item.qty)}</div>
        <button class="cart-remove-btn" data-cart-remove="${idx}" aria-label="Remove item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 7h16M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0v13a2 2 0 01-2 2H9a2 2 0 01-2-2V7h10z"/></svg>
        </button>
      </div>`).join("");

    const subtotal = Cart.subtotal();
    const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 250;
    const total = subtotal + shipping;
    wrap.querySelector("[data-summary-subtotal]").textContent = "Rs. " + formatPrice(subtotal);
    wrap.querySelector("[data-summary-shipping]").textContent = shipping === 0 ? "Free" : "Rs. " + formatPrice(shipping);
    wrap.querySelector("[data-summary-total]").textContent = "Rs. " + formatPrice(total);

    listEl.querySelectorAll("[data-cart-inc]").forEach(b => b.addEventListener("click", () => { const i=+b.getAttribute("data-cart-inc"); Cart.updateQty(i, Cart.items()[i].qty+1); render(); }));
    listEl.querySelectorAll("[data-cart-dec]").forEach(b => b.addEventListener("click", () => { const i=+b.getAttribute("data-cart-dec"); Cart.updateQty(i, Cart.items()[i].qty-1); render(); }));
    listEl.querySelectorAll("[data-cart-remove]").forEach(b => b.addEventListener("click", () => { const i=+b.getAttribute("data-cart-remove"); Cart.remove(i); render(); showToast("Removed from bag"); }));
  }
  render();
}

/* ==========================================================================
   15. WISHLIST PAGE
   ========================================================================== */
function initWishlistPage() {
  const wrap = document.querySelector("[data-wishlist-page]");
  if (!wrap) return;
  function render() {
    const ids = Wishlist.items().map(i => i.id);
    const products = PRODUCTS.filter(p => ids.includes(p.id));
    const grid = wrap.querySelector("[data-wishlist-grid]");
    const emptyEl = wrap.querySelector("[data-wishlist-empty]");
    if (products.length === 0) {
      emptyEl.style.display = "block"; grid.style.display = "none";
      return;
    }
    emptyEl.style.display = "none"; grid.style.display = "grid";
    renderProductGrid(grid, products);
    grid.querySelectorAll("[data-wish-btn]").forEach(btn => {
      btn.addEventListener("click", () => setTimeout(render, 50));
    });
  }
  render();
}

/* ==========================================================================
   16. CHECKOUT PAGE
   ========================================================================== */
function initCheckoutPage() {
  const wrap = document.querySelector("[data-checkout-page]");
  if (!wrap) return;
  const items = Cart.items();
  const listEl = wrap.querySelector("[data-checkout-items]");
  const subtotal = Cart.subtotal();
  const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 250;
  const total = subtotal + shipping;

  if (listEl) {
    listEl.innerHTML = items.length ? items.map(item => `
      <div class="checkout-summary-item">
        <img src="${item.image}" alt="${item.name}">
        <div style="flex:1">
          <div>${item.name} × ${item.qty}</div>
          <div class="mci-meta">${item.color || ""}${item.color && item.size ? " · " : ""}${item.size ? "Size " + item.size : ""}</div>
        </div>
        <div>Rs. ${formatPrice(item.price * item.qty)}</div>
      </div>`).join("") : `<p style="color:var(--ink-soft);font-size:13.5px;">Your bag is empty. <a class="link-underline" href="shop.html">Continue shopping</a></p>`;
  }
  wrap.querySelector("[data-checkout-subtotal]").textContent = "Rs. " + formatPrice(subtotal);
  wrap.querySelector("[data-checkout-shipping]").textContent = shipping === 0 ? "Free" : "Rs. " + formatPrice(shipping);
  wrap.querySelector("[data-checkout-total]").textContent = "Rs. " + formatPrice(total);

  // Payment method selection
  wrap.querySelectorAll(".payment-option").forEach(opt => {
    opt.addEventListener("click", () => {
      wrap.querySelectorAll(".payment-option").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      opt.querySelector("input[type=radio]").checked = true;
    });
  });

  // Validation + submit
  const form = wrap.querySelector("[data-checkout-form]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll("[required]").forEach(input => {
        const field = input.closest(".field");
        const isValid = input.type === "email" ? /^\S+@\S+\.\S+$/.test(input.value) : input.value.trim().length > 1;
        if (field) field.classList.toggle("error", !isValid);
        if (!isValid) valid = false;
      });
      if (!valid) { showToast("Please complete all required fields"); return; }
      if (Cart.items().length === 0) { showToast("Your bag is empty"); return; }
      // No payment is actually processed — this simply captures order intent.
      wrap.querySelector("[data-checkout-form-wrap]").style.display = "none";
      wrap.querySelector("[data-checkout-success]").style.display = "block";
      Cart.clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

/* ==========================================================================
   17. INIT — runs on every page
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initQuickViewModal();
  initScrollReveal();
  initHero();
  initNewsletterForms();
  initShopPage();
  initProductPage();
  initCartPage();
  initWishlistPage();
  initCheckoutPage();

  // generic modal close (size guide etc.)
  document.querySelectorAll(".modal-overlay").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.closest("[data-modal-close]")) closeModal(modal);
    });
  });

  // bind any static product grids present on load (home page featured sections)
  document.querySelectorAll("[data-static-grid]").forEach(grid => {
    const filter = grid.getAttribute("data-static-grid");
    let list = PRODUCTS;
    if (filter === "featured") list = PRODUCTS.slice(0, 4);
    else if (filter === "new") list = PRODUCTS.filter(p => p.isNew);
    else if (filter === "sale") list = PRODUCTS.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0,4);
    else if (filter === "men") list = PRODUCTS.filter(p => p.gender === "men");
    else if (filter === "women") list = PRODUCTS.filter(p => p.gender === "women");
    renderProductGrid(grid, list);
  });

  // reviews (home page)
  const reviewsGrid = document.querySelector("[data-reviews-grid]");
  if (reviewsGrid) {
    reviewsGrid.innerHTML = DEMO_REVIEWS.map(r => `
      <div class="review-card reveal">
        <div class="review-stars">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div>
        <p>"${r.text}"</p>
        <div class="review-name">${r.name}</div>
        <div class="review-product">Purchased: ${r.product}</div>
      </div>`).join("");
    initScrollReveal();
  }
});
