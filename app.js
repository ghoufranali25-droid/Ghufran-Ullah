/* Frontend demo only. Product, order, and admin data live in localStorage. */
(() => {
  "use strict";

  const image = (id, width = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
  const seedProducts = [
    { id: "dell-xps-14", brand: "Dell", model: "XPS 14 OLED", cpu: "Intel Core Ultra 7 155H", processor: "Intel", ram: 32, storage: 1000, gpu: "Intel Arc integrated", gpuType: "integrated", display: 14.5, os: "Windows 11", price: 489000, oldPrice: 539000, stock: 6, rating: 4.9, reviews: 138, usage: ["Business", "Professional", "Premium"], condition: "New", year: 2025, color: "Graphite", image: image("photo-1588872657578-7efd1f1555ed"), description: "A beautifully made, compact workstation with a vivid OLED display and plenty of headroom for demanding days." },
    { id: "asus-rog-zephyrus", brand: "ASUS", model: "ROG Zephyrus G16", cpu: "Intel Core Ultra 9 185H", processor: "Intel", ram: 32, storage: 1000, gpu: "NVIDIA RTX 4070 8 GB", gpuType: "dedicated", display: 16, os: "Windows 11", price: 729000, oldPrice: 799000, stock: 3, rating: 4.9, reviews: 96, usage: ["Gaming", "Professional", "Premium"], condition: "New", year: 2025, color: "Eclipse Gray", image: image("photo-1593642632823-8f785ba67e45"), description: "A sleek gaming powerhouse with high-refresh visuals, excellent cooling and enough GPU muscle for serious creative work." },
    { id: "apple-macbook-air", brand: "Apple", model: "MacBook Air 15 M3", cpu: "Apple M3 8-core", processor: "Apple", ram: 16, storage: 512, gpu: "Apple 10-core GPU", gpuType: "integrated", display: 15.3, os: "macOS", price: 459000, oldPrice: 499000, stock: 8, rating: 4.9, reviews: 214, usage: ["Student", "Business", "Professional", "Premium"], condition: "New", year: 2025, color: "Midnight", image: image("photo-1517336714731-489689fd1ca8"), description: "A silent, all-day companion with a generous display, an excellent trackpad and effortless everyday performance." },
    { id: "lenovo-thinkpad-x1", brand: "Lenovo", model: "ThinkPad X1 Carbon Gen 12", cpu: "Intel Core Ultra 7 155U", processor: "Intel", ram: 32, storage: 1000, gpu: "Intel Arc integrated", gpuType: "integrated", display: 14, os: "Windows 11", price: 569000, oldPrice: 619000, stock: 5, rating: 4.8, reviews: 84, usage: ["Business", "Professional", "Premium"], condition: "New", year: 2025, color: "Black", image: image("photo-1496181133206-80ce9b88a853"), description: "Lightweight, durable and ready for long days on the move, with a comfortable keyboard and business-grade security." },
    { id: "hp-omen-16", brand: "HP", model: "OMEN 16 Gaming", cpu: "AMD Ryzen 7 8845HS", processor: "AMD", ram: 16, storage: 1000, gpu: "NVIDIA RTX 4060 8 GB", gpuType: "dedicated", display: 16.1, os: "Windows 11", price: 469000, oldPrice: 519000, stock: 4, rating: 4.7, reviews: 67, usage: ["Gaming"], condition: "New", year: 2025, color: "Shadow Black", image: image("photo-1593642634367-d91a135587b5"), description: "A fast-refresh gaming setup with a capable RTX graphics card and an understated chassis that fits any desk." },
    { id: "acer-swift-go", brand: "Acer", model: "Swift Go 14 OLED", cpu: "Intel Core Ultra 5 125H", processor: "Intel", ram: 16, storage: 512, gpu: "Intel Arc integrated", gpuType: "integrated", display: 14, os: "Windows 11", price: 279000, oldPrice: 309000, stock: 11, rating: 4.6, reviews: 59, usage: ["Student", "Business", "Budget"], condition: "New", year: 2025, color: "Pure Silver", image: image("photo-1588872657578-7efd1f1555ed"), description: "A bright OLED screen and modern processor in a light, travel-friendly package that punches above its price." },
    { id: "asus-vivobook-16", brand: "ASUS", model: "Vivobook 16X", cpu: "AMD Ryzen 7 7730U", processor: "AMD", ram: 16, storage: 512, gpu: "AMD Radeon integrated", gpuType: "integrated", display: 16, os: "Windows 11", price: 239000, oldPrice: 269000, stock: 9, rating: 4.5, reviews: 42, usage: ["Student", "Business", "Budget"], condition: "New", year: 2024, color: "Indie Black", image: image("photo-1525547719571-a2d4ac8945e2"), description: "A roomy, practical everyday laptop for coursework, home office tasks and streaming after hours." },
    { id: "msi-katana-15", brand: "MSI", model: "Katana 15 B13V", cpu: "Intel Core i7-13620H", processor: "Intel", ram: 16, storage: 1000, gpu: "NVIDIA RTX 4060 8 GB", gpuType: "dedicated", display: 15.6, os: "Windows 11", price: 399000, oldPrice: 449000, stock: 2, rating: 4.6, reviews: 73, usage: ["Gaming"], condition: "New", year: 2024, color: "Black", image: image("photo-1593642634367-d91a135587b5"), description: "A no-nonsense gaming machine with an RTX 4060, high-refresh display and upgrade-friendly memory." },
    { id: "lenovo-ideapad-flex", brand: "Lenovo", model: "IdeaPad Flex 5 14", cpu: "AMD Ryzen 5 7530U", processor: "AMD", ram: 16, storage: 512, gpu: "AMD Radeon integrated", gpuType: "integrated", display: 14, os: "Windows 11", price: 249000, oldPrice: 279000, stock: 7, rating: 4.5, reviews: 38, usage: ["Student", "2-in-1", "Budget"], condition: "New", year: 2024, color: "Arctic Grey", image: image("photo-1496181133206-80ce9b88a853"), description: "A flexible 2-in-1 with a responsive touchscreen for note-taking, sketching and settling into a film." },
    { id: "microsoft-surface-pro", brand: "Microsoft", model: "Surface Pro 10", cpu: "Intel Core Ultra 5 135U", processor: "Intel", ram: 16, storage: 512, gpu: "Intel Arc integrated", gpuType: "integrated", display: 13, os: "Windows 11", price: 489000, oldPrice: 529000, stock: 4, rating: 4.7, reviews: 31, usage: ["Business", "Student", "2-in-1", "Premium"], condition: "New", year: 2025, color: "Platinum", image: image("photo-1525547719571-a2d4ac8945e2"), description: "A premium, pen-ready 2-in-1 tablet and laptop for sketching, presenting and working from anywhere." },
    { id: "hp-elitebook-840", brand: "HP", model: "EliteBook 840 G10", cpu: "Intel Core i5-1335U", processor: "Intel", ram: 16, storage: 512, gpu: "Intel Iris Xe integrated", gpuType: "integrated", display: 14, os: "Windows 11", price: 319000, oldPrice: 359000, stock: 6, rating: 4.6, reviews: 46, usage: ["Business", "Professional"], condition: "Refurbished", year: 2024, color: "Silver", image: image("photo-1588872657578-7efd1f1555ed"), description: "A professionally inspected business laptop with robust build quality, reliable performance and excellent value." },
    { id: "acer-aspire-3", brand: "Acer", model: "Aspire 3 A315", cpu: "AMD Ryzen 5 7520U", processor: "AMD", ram: 8, storage: 512, gpu: "AMD Radeon integrated", gpuType: "integrated", display: 15.6, os: "Windows 11", price: 159000, oldPrice: 179000, stock: 13, rating: 4.4, reviews: 102, usage: ["Student", "Budget"], condition: "New", year: 2024, color: "Pure Silver", image: image("photo-1525547719571-a2d4ac8945e2"), description: "A dependable, wallet-friendly everyday laptop for browsing, assignments and the essentials." },
    { id: "acer-chromebook-plus", brand: "Acer", model: "Chromebook Plus 514", cpu: "Intel Core i3-N305", processor: "Intel", ram: 8, storage: 256, gpu: "Intel UHD integrated", gpuType: "integrated", display: 14, os: "ChromeOS", price: 129000, oldPrice: 149000, stock: 9, rating: 4.5, reviews: 34, usage: ["Student", "Budget"], condition: "New", year: 2025, color: "Steel Gray", image: image("photo-1496181133206-80ce9b88a853"), description: "A lightweight Chromebook for cloud-first coursework, video calls, research and everyday browsing." },
    { id: "thinkpad-t480-linux", brand: "Lenovo", model: "ThinkPad T480 (Renewed)", cpu: "Intel Core i5-8350U", processor: "Intel", ram: 16, storage: 512, gpu: "Intel UHD integrated", gpuType: "integrated", display: 14, os: "Linux", price: 109000, oldPrice: 129000, stock: 3, rating: 4.4, reviews: 22, usage: ["Business", "Student", "Refurbished", "Budget"], condition: "Refurbished", year: 2023, color: "Black", image: image("photo-1588872657578-7efd1f1555ed"), description: "A durable, professionally inspected ThinkPad renewed for Linux users, developers and practical everyday work." },
    { id: "surface-laptop-7", brand: "Microsoft", model: "Surface Laptop 7 13.8", cpu: "Snapdragon X Plus X1P-64", processor: "Snapdragon", ram: 16, storage: 512, gpu: "Qualcomm Adreno integrated", gpuType: "integrated", display: 13.8, os: "Windows 11", price: 399000, oldPrice: 439000, stock: 5, rating: 4.7, reviews: 52, usage: ["Business", "Student", "Premium"], condition: "New", year: 2025, color: "Sapphire", image: image("photo-1525547719571-a2d4ac8945e2"), description: "A refined, all-day Windows laptop with a responsive touchscreen, quiet operation and efficient Snapdragon performance." },
    { id: "asus-proart-studiobook", brand: "ASUS", model: "ProArt Studiobook 16 OLED", cpu: "Intel Core Ultra 9 185H", processor: "Intel", ram: 64, storage: 2000, gpu: "NVIDIA RTX 4070 8 GB", gpuType: "dedicated", display: 16, os: "Windows 11", price: 779000, oldPrice: 849000, stock: 2, rating: 4.8, reviews: 41, usage: ["Professional", "Premium"], condition: "New", year: 2025, color: "Mineral Black", image: image("photo-1593642632823-8f785ba67e45"), description: "A creator-focused workstation pairing a color-rich OLED screen with generous memory, fast storage and dedicated RTX graphics." },
    { id: "apple-macbook-pro", brand: "Apple", model: "MacBook Pro 14 M3 Pro", cpu: "Apple M3 Pro 11-core", processor: "Apple", ram: 18, storage: 1000, gpu: "Apple 14-core GPU", gpuType: "integrated", display: 14.2, os: "macOS", price: 749000, oldPrice: 819000, stock: 3, rating: 5.0, reviews: 126, usage: ["Professional", "Premium"], condition: "New", year: 2025, color: "Space Black", image: image("photo-1517336714731-489689fd1ca8"), description: "A compact creator workstation with sustained performance, a stunning display and superb studio-quality speakers." },
    { id: "dell-latitude-7420-used", brand: "Dell", model: "Latitude 7420 (Renewed)", cpu: "Intel Core i7-1185G7", processor: "Intel", ram: 16, storage: 512, gpu: "Intel Iris Xe integrated", gpuType: "integrated", display: 14, os: "Windows 11", price: 179000, oldPrice: 219000, stock: 2, rating: 4.5, reviews: 28, usage: ["Business", "Student", "Refurbished", "Budget"], condition: "Refurbished", year: 2023, color: "Carbon Black", image: image("photo-1496181133206-80ce9b88a853"), description: "A renewed business-class laptop, quality checked and ready for dependable everyday work at a more accessible price." },
  ];

  const accessories = [
    { name: "Laptop bags", note: "Carry it with care", icon: "▱", price: 8500 },
    { name: "Wireless mouse", note: "Small, precise, reliable", icon: "◉", price: 4800 },
    { name: "Keyboards", note: "A better typing feel", icon: "⌨", price: 12500 },
    { name: "Headphones", note: "Find your focus", icon: "◖", price: 17900 },
    { name: "Cooling pads", note: "Keep things running cool", icon: "▤", price: 6900 },
    { name: "Laptop stands", note: "Bring your screen up", icon: "⌑", price: 7500 },
    { name: "USB hubs", note: "Room for everything", icon: "⊞", price: 5900 },
    { name: "Chargers", note: "Power for the road", icon: "ϟ", price: 9900 },
    { name: "SSD upgrades", note: "More space, more speed", icon: "▰", price: 21500 },
    { name: "Memory upgrades", note: "Keep your flow going", icon: "▥", price: 18900 },
  ];
  const sampleReviews = [
    { name: "Fatima R.", date: "Verified · 2 weeks ago", rating: 5, initials: "FR", text: "They actually listened to what I needed for design school and helped me avoid overspending. The laptop arrived quickly and was exactly as described." },
    { name: "Adeel M.", date: "Verified · 1 month ago", rating: 5, initials: "AM", text: "Clear advice, no hard sell. I had a couple of questions about warranty and got straight answers. Really good experience from start to finish." },
    { name: "Sana K.", date: "Verified · 3 weeks ago", rating: 5, initials: "SK", text: "Upgraded my work setup and the whole process was refreshingly easy. Delivery updates were clear, and the machine was packed with care." },
    { name: "Hamza T.", date: "Verified · 5 days ago", rating: 4, initials: "HT", text: "Great value and helpful support when I was comparing a few gaming options. I would shop here again." },
  ];
  const filterIds = ["brandFilter", "usageFilter", "processorFilter", "gpuFilter", "ramFilter", "storageFilter", "screenFilter", "osFilter", "ratingFilter", "priceFilter"];
  const storageKeys = { catalog: "ghufran.catalog.v1", cart: "ghufran.cart.v1", wishlist: "ghufran.wishlist.v1", comparison: "ghufran.comparison.v1", recent: "ghufran.recent.v1", theme: "ghufran.theme.v1", orders: "ghufran.orders.v1" };
  const state = {
    products: loadStore(storageKeys.catalog, seedProducts),
    cart: loadStore(storageKeys.cart, {}),
    wishlist: loadStore(storageKeys.wishlist, []),
    comparison: loadStore(storageKeys.comparison, []),
    recentlyViewed: loadStore(storageKeys.recent, []),
    orders: loadStore(storageKeys.orders, []),
    adminTab: "Products",
    editingProductId: null,
    apiAvailable: false,
    currentUser: null,
    productRequest: 0,
    activeCoupon: null,
  };

  function loadStore(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  function saveStore(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { showToast("Storage is full. Some changes may not persist."); }
  }
  function money(value) {
    return `Rs ${Number(value || 0).toLocaleString("en-PK")}`;
  }
  function discount(product) {
    return product.oldPrice > product.price ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  }
  function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }
  function productById(id) { return state.products.find((product) => String(product.id) === String(id)); }
  function setOverlay(id, open) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.hidden = !open;
    document.body.classList.toggle("modal-open", open || [...document.querySelectorAll(".overlay")].some((item) => !item.hidden));
    if (open) {
      const focusable = overlay.querySelector("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]");
      window.setTimeout(() => focusable?.focus(), 60);
    }
  }
  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.getElementById("toastRegion").append(toast);
    window.setTimeout(() => {
      toast.classList.add("is-leaving");
      window.setTimeout(() => toast.remove(), 300);
    }, 2600);
  }
  function escapeAttr(value) { return escapeHtml(value); }

  function init() {
    if (loadStore(storageKeys.theme, "dark") === "light") document.body.classList.add("theme-light");
    renderBrandOptions();
    renderAccessories();
    renderReviews();
    renderDeals();
    renderProducts();
    renderCart();
    renderWishlistCount();
    renderComparisonCount();
    renderRecentlyViewed();
    initEvents();
    startCountdown();
    initializeApi();
    window.setTimeout(() => document.getElementById("pageLoader").classList.add("is-done"), 360);
  }

  async function initializeApi() {
    if (!window.GhufranAPI || !(await window.GhufranAPI.initialize())) return;
    state.apiAvailable = true;
    document.getElementById("catalogSourceStatus").textContent = "Database live";
    document.getElementById("catalogSourceStatus").classList.add("is-live");
    try {
      const response = await window.GhufranAPI.request("/api/me");
      state.currentUser = response.user;
      await syncRemoteCart();
      await syncRemoteWishlist();
      updateAccountNav();
    } catch { /* A guest can browse the live catalog without an account. */ }
    loadRemoteAccessories();
    renderProducts();
  }

  async function loadRemoteAccessories() {
    try {
      const { products } = await window.GhufranAPI.getProducts({ category: 9, limit: 60, sort: "price_asc" });
      if (!products.length) return;
      state.products = [...new Map([...state.products, ...products].map((product) => [String(product.id), product])).values()];
      document.getElementById("accessoryGrid").innerHTML = products.map((product) => `<button class="accessory-item" type="button" data-accessory-product="${escapeAttr(product.id)}"><span class="accessory-icon" aria-hidden="true">⌑</span><strong>${escapeHtml(product.model)}</strong><small>${escapeHtml(product.brand)} · ${money(product.price)}</small></button>`).join("");
    } catch { /* Static accessories remain visible if this optional request fails. */ }
  }

  async function syncRemoteCart() {
    if (!state.apiAvailable || !state.currentUser) return;
    const data = await window.GhufranAPI.request("/api/cart");
    for (const item of data.items) {
      const product = window.GhufranAPI.mapProduct(item);
      const existing = state.products.findIndex((entry) => String(entry.id) === String(product.id));
      if (existing >= 0) state.products[existing] = product;
      else state.products.push(product);
    }
    state.cart = Object.fromEntries(data.items.map((item) => [String(item.id), Number(item.quantity)]));
    renderCart();
  }

  async function syncRemoteWishlist() {
    if (!state.apiAvailable || !state.currentUser) return;
    const data = await window.GhufranAPI.request("/api/wishlist");
    const products = data.products.map(window.GhufranAPI.mapProduct);
    state.wishlist = products.map((product) => String(product.id));
    state.products = [...new Map([...state.products, ...products].map((product) => [String(product.id), product])).values()];
    renderWishlistCount();
  }

  function updateAccountNav() {
    const button = document.getElementById("accountOpen");
    if (!button) return;
    button.innerHTML = state.currentUser ? `${escapeHtml(state.currentUser.name)} <span aria-hidden="true">⌄</span>` : 'Login / Register <span aria-hidden="true">↗</span>';
  }

  function renderBrandOptions() {
    const select = document.getElementById("brandFilter");
    const selected = select.value;
    const brands = [...new Set(state.products.map((product) => product.brand))].sort();
    select.innerHTML = '<option value="">All brands</option>' + brands.map((brand) => `<option>${escapeHtml(brand)}</option>`).join("");
    select.value = selected;
  }

  function renderAccessories() {
    document.getElementById("accessoryGrid").innerHTML = accessories.map((item) => `<button class="accessory-item" type="button" data-accessory="${escapeAttr(item.name)}"><span class="accessory-icon" aria-hidden="true">${item.icon}</span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.note)} · ${money(item.price)}+</small></button>`).join("");
  }

  function renderReviews() {
    document.getElementById("reviewsGrid").innerHTML = sampleReviews.map((review) => `<article class="review-card"><div class="review-top"><span class="review-avatar" aria-hidden="true">${review.initials}</span><span class="review-person"><strong>${escapeHtml(review.name)}</strong><small>${escapeHtml(review.date)}</small></span><span class="stars" aria-label="${review.rating} out of 5 stars">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span></div><p>${escapeHtml(review.text)}</p></article>`).join("");
  }

  function renderDeals() {
    const featured = productById("asus-rog-zephyrus") || state.products.find((product) => discount(product) > 0);
    if (!featured) return;
    document.getElementById("dealFeature").innerHTML = `<div class="deal-image-wrap"><img src="${escapeAttr(featured.image)}" alt="${escapeAttr(featured.brand + " " + featured.model)}" loading="lazy"></div><div class="deal-copy"><span class="deal-badge">SAVE ${discount(featured)}% · LOW STOCK</span><h3>${escapeHtml(featured.brand)} ${escapeHtml(featured.model)}</h3><p>${escapeHtml(featured.cpu)} · ${featured.ram} GB memory</p><div class="deal-price"><strong>${money(featured.price)}</strong><del>${money(featured.oldPrice)}</del></div><button class="button button--lime" type="button" data-action="details" data-id="${escapeAttr(featured.id)}">Take a closer look <span aria-hidden="true">↗</span></button></div>`;
  }

  function renderProducts() {
    if (state.apiAvailable) {
      renderRemoteProducts();
      return;
    }
    const search = document.getElementById("productSearch").value.trim().toLowerCase();
    const value = (id) => document.getElementById(id).value;
    let products = state.products.filter((product) => {
      const haystack = [product.brand, product.model, product.cpu, product.gpu, product.os, product.ram, product.storage, product.display, ...product.usage].join(" ").toLowerCase();
      if (search && !haystack.includes(search)) return false;
      if (value("brandFilter") && product.brand !== value("brandFilter")) return false;
      if (value("usageFilter") && !product.usage.includes(value("usageFilter"))) return false;
      if (value("processorFilter") && product.processor !== value("processorFilter")) return false;
      if (value("gpuFilter") && product.gpuType !== value("gpuFilter")) return false;
      if (value("ramFilter") && product.ram < Number(value("ramFilter"))) return false;
      if (value("storageFilter") && product.storage < Number(value("storageFilter"))) return false;
      if (value("screenFilter")) {
        const size = product.display;
        const range = value("screenFilter");
        if (range === "14" && size >= 14) return false;
        if (range === "14-15" && (size < 14 || size > 15)) return false;
        if (range === "15" && size < 15.6) return false;
        if (range === "16" && size < 16) return false;
      }
      if (value("osFilter") && product.os !== value("osFilter")) return false;
      if (product.rating < Number(value("ratingFilter"))) return false;
      return product.price <= Number(value("priceFilter"));
    });
    const sort = document.getElementById("sortSelect").value;
    if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") products.sort((a, b) => b.price - a.price);
    if (sort === "newest") products.sort((a, b) => b.year - a.year);
    if (sort === "rating") products.sort((a, b) => b.rating - a.rating);
    if (sort === "discount") products.sort((a, b) => discount(b) - discount(a));
    document.getElementById("resultCount").textContent = products.length;
    const active = [];
    if (search) active.push(`“${search}”`);
    if (value("brandFilter")) active.push(value("brandFilter"));
    if (value("usageFilter")) active.push(value("usageFilter"));
    if (Number(value("priceFilter")) < 800000) active.push(`Under ${money(value("priceFilter"))}`);
    document.getElementById("activeFilterLabel").textContent = active.join(" · ");
    document.getElementById("productGrid").innerHTML = products.map(productCard).join("");
    document.getElementById("emptyState").hidden = products.length > 0;
    document.getElementById("productGrid").hidden = products.length === 0;
  }

  async function renderRemoteProducts() {
    const requestId = ++state.productRequest;
    const value = (id) => document.getElementById(id).value;
    const categoryIds = { Gaming: 1, Business: 2, Student: 3, Professional: 4, Budget: 5, Premium: 6, "2-in-1": 7, Refurbished: 8 };
    const sortNames = { "price-asc": "price_asc", "price-desc": "price_desc", newest: "newest", rating: "rating", discount: "discount", featured: "featured" };
    const params = {
      q: document.getElementById("productSearch").value.trim(), brand: value("brandFilter"),
      category: categoryIds[value("usageFilter")], processor: value("processorFilter"),
      gpu: value("gpuFilter") === "dedicated" ? "NVIDIA" : "", ram: value("ramFilter"),
      storage: value("storageFilter"), os: value("osFilter"), rating: value("ratingFilter") || "",
      max_price: value("priceFilter"), sort: sortNames[document.getElementById("sortSelect").value] || "featured", limit: 60,
    };
    try {
      const result = await window.GhufranAPI.getProducts(params);
      if (requestId !== state.productRequest) return;
      state.products = result.products;
      renderBrandOptions();
      let products = result.products.filter((product) => product.category_id !== 9);
      state.products = [...new Map([...state.products.filter((product) => product.category_id === 9), ...result.products].map((product) => [String(product.id), product])).values()];
      if (value("gpuFilter") === "integrated") products = products.filter((product) => product.gpuType === "integrated");
      if (value("screenFilter")) products = products.filter((product) => {
        const size = product.display;
        const range = value("screenFilter");
        if (range === "14") return size < 14;
        if (range === "14-15") return size >= 14 && size <= 15;
        if (range === "15") return size >= 15.6;
        return size >= 16;
      });
      const active = [];
      if (params.q) active.push(`“${params.q}”`);
      if (params.brand) active.push(params.brand);
      if (value("usageFilter")) active.push(value("usageFilter"));
      if (Number(value("priceFilter")) < 800000) active.push(`Under ${money(value("priceFilter"))}`);
      document.getElementById("resultCount").textContent = products.length;
      document.getElementById("activeFilterLabel").textContent = active.join(" · ");
      document.getElementById("productGrid").innerHTML = products.map(productCard).join("");
      document.getElementById("emptyState").hidden = products.length > 0;
      document.getElementById("productGrid").hidden = products.length === 0;
      renderDeals();
    } catch (error) {
      if (requestId !== state.productRequest) return;
      showToast(`Catalog request failed: ${error.message}`);
    }
  }

  function productCard(product) {
    const saved = state.wishlist.some((id) => String(id) === String(product.id));
    const compared = state.comparison.some((id) => String(id) === String(product.id));
    const badge = product.condition === "Refurbished" ? `<span class="product-badge product-badge--used">RENEWED</span>` : discount(product) ? `<span class="product-badge">-${discount(product)}%</span>` : `<span class="product-badge product-badge--new">JUST IN</span>`;
    const stock = product.stock <= 3 ? `<span class="stock-dot stock-dot--low">${product.stock} left</span>` : `<span class="stock-dot">In stock</span>`;
    return `<article class="product-card"><div class="product-image-wrap"><img src="${escapeAttr(product.image)}" alt="${escapeAttr(product.brand + " " + product.model)}" loading="lazy">${badge}<div class="product-actions"><button type="button" data-action="wishlist" data-id="${escapeAttr(product.id)}" aria-label="${saved ? "Remove from" : "Add to"} wishlist" aria-pressed="${saved}" class="${saved ? "is-active" : ""}">${saved ? "♥" : "♡"}</button><button type="button" data-action="compare" data-id="${escapeAttr(product.id)}" aria-label="${compared ? "Remove from" : "Add to"} comparison" aria-pressed="${compared}" class="${compared ? "is-active" : ""}">⇄</button></div></div><div class="product-body"><div class="product-kicker"><span>${escapeHtml(product.brand)} · ${escapeHtml(product.condition)}</span>${stock}</div><h3>${escapeHtml(product.model)}</h3><div class="product-rating"><span class="stars" aria-label="${product.rating} out of 5 stars">★★★★★</span><strong>${product.rating.toFixed(1)}</strong><span>(${product.reviews})</span></div><div class="spec-pills"><span>${escapeHtml(product.cpu.replace("Intel Core ", "").replace("AMD Ryzen ", "R"))}</span><span>${product.ram} GB RAM</span><span>${product.storage >= 1000 ? `${product.storage / 1000} TB` : `${product.storage} GB`} SSD</span><span>${product.display}″</span></div><div class="product-price"><strong>${money(product.price)}</strong><del>${money(product.oldPrice)}</del><span class="save-label">SAVE ${discount(product)}%</span></div><div class="product-buttons"><button type="button" data-action="details" data-id="${escapeAttr(product.id)}">View details</button><button class="add-button" type="button" data-action="add" data-id="${escapeAttr(product.id)}">Add to bag</button></div></div></article>`;
  }

  function renderCart() {
    const entries = Object.entries(state.cart).filter(([id, quantity]) => productById(id) && quantity > 0);
    state.cart = Object.fromEntries(entries);
    saveStore(storageKeys.cart, state.cart);
    const count = entries.reduce((total, [, quantity]) => total + quantity, 0);
    document.getElementById("cartCount").textContent = count;
    document.getElementById("drawerCartCount").textContent = `(${count})`;
    document.getElementById("cartEmpty").classList.toggle("is-visible", entries.length === 0);
    document.getElementById("cartSummary").hidden = entries.length === 0;
    ensureCouponForm();
    document.getElementById("couponApplyForm").hidden = entries.length === 0;
    document.getElementById("cartItems").innerHTML = entries.map(([id, quantity]) => {
      const product = productById(id);
      return `<article class="cart-item"><img src="${escapeAttr(product.image)}" alt=""><div class="cart-item-info"><h3>${escapeHtml(product.brand)} ${escapeHtml(product.model)}</h3><p>${escapeHtml(product.cpu)} · ${product.ram} GB</p><strong>${money(product.price * quantity)}</strong><div class="qty-control"><button type="button" data-action="qty-minus" data-id="${escapeAttr(id)}" aria-label="Decrease quantity">−</button><span>${quantity}</span><button type="button" data-action="qty-plus" data-id="${escapeAttr(id)}" aria-label="Increase quantity">+</button></div></div><button class="remove-item" type="button" data-action="remove" data-id="${escapeAttr(id)}" aria-label="Remove ${escapeAttr(product.model)}">×</button></article>`;
    }).join("");
    const subtotal = entries.reduce((total, [id, quantity]) => total + productById(id).price * quantity, 0);
    const savings = entries.reduce((total, [id, quantity]) => total + Math.max(0, productById(id).oldPrice - productById(id).price) * quantity, 0);
    const couponDiscount = Math.min(subtotal, Number(state.activeCoupon?.discount || 0));
    const delivery = subtotal === 0 || subtotal - couponDiscount >= 300000 ? 0 : 1800;
    document.getElementById("cartSubtotal").textContent = money(subtotal);
    document.getElementById("cartSavings").textContent = money(savings + couponDiscount);
    document.getElementById("cartDelivery").textContent = delivery === 0 ? "Complimentary" : money(delivery);
    document.getElementById("cartTotal").textContent = money(subtotal - couponDiscount + delivery);
    renderCheckoutSummary();
  }

  function renderCheckoutSummary() {
    const target = document.getElementById("checkoutItems");
    if (!target) return;
    const entries = Object.entries(state.cart).filter(([id, quantity]) => productById(id) && quantity > 0);
    target.innerHTML = entries.map(([id, quantity]) => {
      const product = productById(id);
      return `<div class="checkout-line"><img src="${escapeAttr(product.image)}" alt=""><span>${escapeHtml(product.brand)} ${escapeHtml(product.model)}<small>Qty ${quantity}</small></span><strong>${money(product.price * quantity)}</strong></div>`;
    }).join("");
    const subtotal = entries.reduce((total, [id, quantity]) => total + productById(id).price * quantity, 0);
    const savings = entries.reduce((total, [id, quantity]) => total + Math.max(0, productById(id).oldPrice - productById(id).price) * quantity, 0);
    const couponDiscount = Math.min(subtotal, Number(state.activeCoupon?.discount || 0));
    const delivery = subtotal === 0 || subtotal - couponDiscount >= 300000 ? 0 : 1800;
    document.getElementById("checkoutSubtotal").textContent = money(subtotal);
    document.getElementById("checkoutSavings").textContent = money(savings + couponDiscount);
    document.getElementById("checkoutDelivery").textContent = delivery === 0 ? "Complimentary" : money(delivery);
    document.getElementById("checkoutTotal").textContent = money(subtotal - couponDiscount + delivery);
  }

  function ensureCouponForm() {
    if (document.getElementById("couponApplyForm")) return;
    const form = document.createElement("form");
    form.id = "couponApplyForm";
    form.className = "coupon-apply-form";
    form.innerHTML = '<label for="cartCouponCode">Promo code</label><div><input id="cartCouponCode" name="code" autocomplete="off" maxlength="40" placeholder="Enter a code"><button type="submit" aria-label="Apply promo code">Apply</button></div><small id="couponMessage">Coupons are checked securely at checkout.</small>';
    document.getElementById("cartItems").after(form);
  }

  async function applyCoupon(event) {
    event.preventDefault();
    if (!state.apiAvailable) return showToast("Coupons are validated by the live store server.");
    const code = new FormData(event.currentTarget).get("code").trim();
    const subtotal = Object.entries(state.cart).reduce((total, [id, quantity]) => total + (productById(id)?.price || 0) * quantity, 0);
    if (!code || subtotal <= 0) return showToast("Add items and enter a coupon code first.");
    try {
      state.activeCoupon = await window.GhufranAPI.request("/api/coupons/apply", { method: "POST", body: { code, subtotal } });
      document.getElementById("couponMessage").textContent = `${state.activeCoupon.code} applied. You save ${money(state.activeCoupon.discount)}.`;
      renderCart();
      showToast("Coupon applied.");
    } catch (error) {
      state.activeCoupon = null;
      document.getElementById("couponMessage").textContent = error.message;
      renderCart();
    }
  }

  async function addToCart(id, quantity = 1) {
    const product = productById(id);
    if (!product || product.stock <= 0) return showToast("That machine is currently out of stock.");
    state.activeCoupon = null;
    if (state.apiAvailable && state.currentUser) {
      try {
        await window.GhufranAPI.request("/api/cart", { method: "POST", body: { product_id: Number(id), quantity } });
        await syncRemoteCart();
        showToast(`${product.model} added to your bag.`);
      } catch (error) { showToast(error.message); }
      return;
    }
    state.cart[id] = Math.min(product.stock, (state.cart[id] || 0) + quantity);
    saveStore(storageKeys.cart, state.cart);
    renderCart();
    showToast(`${product.model} added to your bag.`);
  }
  function renderWishlistCount() { document.getElementById("wishlistCount").textContent = state.wishlist.length; }
  async function toggleWishlist(id) {
    const index = state.wishlist.indexOf(id);
    if (state.apiAvailable && state.currentUser) {
      try {
        if (index >= 0) await window.GhufranAPI.request(`/api/wishlist/${encodeURIComponent(id)}`, { method: "DELETE" });
        else await window.GhufranAPI.request("/api/wishlist", { method: "POST", body: { product_id: Number(id) } });
        await syncRemoteWishlist();
        renderProducts();
        showToast(index >= 0 ? "Removed from your wishlist." : "Saved to your wishlist.");
      } catch (error) { showToast(error.message); }
      return;
    }
    if (index >= 0) { state.wishlist.splice(index, 1); showToast("Removed from your wishlist."); }
    else { state.wishlist.push(id); showToast("Saved to your wishlist."); }
    saveStore(storageKeys.wishlist, state.wishlist);
    renderWishlistCount();
    renderProducts();
  }
  function renderComparisonCount() {
    document.getElementById("compareCount").textContent = state.comparison.length;
    saveStore(storageKeys.comparison, state.comparison);
  }
  function toggleComparison(id) {
    const index = state.comparison.indexOf(id);
    if (index >= 0) state.comparison.splice(index, 1);
    else if (state.comparison.length >= 4) return showToast("Compare up to four machines at a time.");
    else state.comparison.push(id);
    saveStore(storageKeys.comparison, state.comparison);
    renderComparisonCount();
    renderProducts();
    showToast(index >= 0 ? "Removed from comparison." : "Added to comparison.");
  }

  function openProduct(id) {
    const product = productById(id);
    if (!product) return;
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${product.brand} ${product.model}`,
      description: product.description,
      image: product.image,
      brand: { "@type": "Brand", name: product.brand },
      offers: {
        "@type": "Offer", priceCurrency: "PKR", price: Number(product.price).toFixed(2),
        availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
    };
    if (product.reviews > 0 && product.rating > 0) {
      structuredData.aggregateRating = { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews };
    }
    let productSchema = document.getElementById("productStructuredData");
    if (!productSchema) { productSchema = document.createElement("script"); productSchema.id = "productStructuredData"; productSchema.type = "application/ld+json"; document.head.append(productSchema); }
    productSchema.textContent = JSON.stringify(structuredData).replace(/</g, "\\u003c");
    state.recentlyViewed = [id, ...state.recentlyViewed.filter((item) => item !== id)].slice(0, 4);
    saveStore(storageKeys.recent, state.recentlyViewed);
    renderRecentlyViewed();
    document.getElementById("productModalContent").innerHTML = `<div class="product-detail-layout"><div class="product-detail-image"><img src="${escapeAttr(product.image)}" alt="${escapeAttr(product.brand + " " + product.model)}"><span class="product-badge">${discount(product) ? `SAVE ${discount(product)}%` : escapeHtml(product.condition)}</span></div><div class="product-detail-content"><div class="product-kicker"><span>${escapeHtml(product.brand)} · ${escapeHtml(product.condition)}</span><span class="stock-dot ${product.stock <= 3 ? "stock-dot--low" : ""}">${product.stock <= 3 ? `${product.stock} left in stock` : "In stock"}</span></div><h2 id="productModalTitle">${escapeHtml(product.model)}</h2><div class="detail-rating"><span class="stars">★★★★★</span> ${product.rating.toFixed(1)} · ${product.reviews} customer reviews</div><div class="detail-price"><strong>${money(product.price)}</strong><del>${money(product.oldPrice)}</del></div><p>${escapeHtml(product.description)}</p><dl class="detail-spec-list"><div><dt>Processor</dt><dd>${escapeHtml(product.cpu)}</dd></div><div><dt>Memory</dt><dd>${product.ram} GB RAM</dd></div><div><dt>Storage</dt><dd>${product.storage >= 1000 ? `${product.storage / 1000} TB` : `${product.storage} GB`} SSD</dd></div><div><dt>Graphics</dt><dd>${escapeHtml(product.gpu)}</dd></div><div><dt>Display</dt><dd>${product.display}″</dd></div><div><dt>Operating system</dt><dd>${escapeHtml(product.os)}</dd></div></dl><div class="detail-extra"><div><strong>Warranty</strong><span>${escapeHtml(product.warranty || "Warranty terms are confirmed with your order.")}</span></div><div><strong>Delivery</strong><span>Nationwide. Free over Rs 300,000.</span></div></div><div class="detail-color">Available color: <strong>${escapeHtml(product.color)}</strong> · 7-day returns on eligible items</div><div class="detail-buy-row"><label class="quantity-select">Qty<select id="detailQuantity" aria-label="Quantity">${Array.from({ length: Math.min(5, product.stock) }, (_, index) => `<option value="${index + 1}">${index + 1}</option>`).join("")}</select></label><button class="button button--dark" type="button" data-action="detail-add" data-id="${escapeAttr(id)}">Add to bag</button><button class="button button--lime" type="button" data-action="buy" data-id="${escapeAttr(id)}">Buy now</button></div><div class="detail-reviews"><h3>Customers say</h3><p>“${escapeHtml(sampleReviews.find((review) => review.rating >= 4)?.text || "A great experience from start to finish.")}” — Verified customer</p></div></div></div>`;
    renderDetailReviews(product);
    setOverlay("productOverlay", true);
  }

  function renderDetailReviews(product) {
    const target = document.querySelector("#productModalContent .detail-reviews");
    if (!target) return;
    target.innerHTML = `<h3>Customer reviews</h3><div class="detail-review-list"><p>“${escapeHtml(sampleReviews.find((review) => review.rating >= 4)?.text || "A great experience from start to finish.")}” — Verified customer</p></div><form class="detail-review-form" id="productReviewForm" data-product-id="${escapeAttr(product.id)}"><strong>Share your experience</strong><label>Rating<select name="rating" required><option value="">Choose</option><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select></label><label>Review<textarea name="review_text" rows="2" required minlength="5" maxlength="3000" placeholder="What should other shoppers know?"></textarea></label><button class="button button--dark" type="submit">Submit review</button><small>${state.currentUser ? "Your review will be checked before it appears." : "Sign in to submit a review."}</small></form>`;
    if (state.apiAvailable && Number.isFinite(Number(product.id))) {
      window.GhufranAPI.request(`/api/reviews?product_id=${encodeURIComponent(product.id)}`).then(({ reviews }) => {
        const list = target.querySelector(".detail-review-list");
        if (!list || !reviews.length) return;
        list.innerHTML = reviews.map((review) => `<p><span class="stars">${"★".repeat(Number(review.rating))}</span> “${escapeHtml(review.review_text)}” <small>— ${escapeHtml(review.customer_name)}</small></p>`).join("");
      }).catch(() => {});
    }
  }

  async function submitProductReview(event) {
    if (event.target.id !== "productReviewForm") return;
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    if (!state.apiAvailable || !state.currentUser) return showToast("Sign in to submit a product review.");
    const values = Object.fromEntries(new FormData(event.target).entries());
    try {
      await window.GhufranAPI.request("/api/reviews", { method: "POST", body: { product_id: Number(event.target.dataset.productId), rating: Number(values.rating), review_text: values.review_text } });
      event.target.reset();
      showToast("Review submitted for moderation.");
    } catch (error) { showToast(error.message); }
  }

  function renderRecentlyViewed() {
    const products = state.recentlyViewed.map(productById).filter(Boolean);
    const section = document.getElementById("recentlyViewed");
    section.hidden = products.length === 0;
    document.getElementById("recentList").innerHTML = products.map((product) => `<button class="recent-item" type="button" data-action="details" data-id="${escapeAttr(product.id)}"><img src="${escapeAttr(product.image)}" alt="" loading="lazy"><span><strong>${escapeHtml(product.model)}</strong><span>${money(product.price)}</span></span></button>`).join("");
  }

  function renderComparison() {
    const products = state.comparison.map(productById).filter(Boolean);
    const target = document.getElementById("compareContent");
    if (products.length === 0) {
      target.innerHTML = '<p class="compare-empty">Choose up to four laptops using the ⇄ button on a product card.</p>';
      return;
    }
    const rows = [["Price", (p) => money(p.price)], ["Processor", (p) => p.cpu], ["Memory", (p) => `${p.ram} GB`], ["Storage", (p) => `${p.storage >= 1000 ? `${p.storage / 1000} TB` : `${p.storage} GB`} SSD`], ["Graphics", (p) => p.gpu], ["Display", (p) => `${p.display}″`], ["Operating system", (p) => p.os], ["Rating", (p) => `${p.rating.toFixed(1)} / 5 (${p.reviews})`], ["Use", (p) => p.usage.join(", ")]];
    target.innerHTML = `<div class="compare-table-wrap"><table class="compare-table"><thead><tr><th>Machine</th>${products.map((p) => `<th><img src="${escapeAttr(p.image)}" alt=""><strong>${escapeHtml(p.brand)} ${escapeHtml(p.model)}</strong><button class="button button--dark" type="button" data-action="add" data-id="${escapeAttr(p.id)}">Add to bag</button></th>`).join("")}</tr></thead><tbody>${rows.map(([label, get]) => `<tr><td>${label}</td>${products.map((p) => `<td>${escapeHtml(get(p))}</td>`).join("")}</tr>`).join("")}<tr><td>Actions</td>${products.map((p) => `<td><button type="button" data-action="compare" data-id="${escapeAttr(p.id)}">Remove</button></td>`).join("")}</tr></tbody></table></div>`;
  }

  function openCheckout() {
    if (Object.keys(state.cart).length === 0) return showToast("Your bag is empty.");
    renderCheckoutSummary();
    setOverlay("cartOverlay", false);
    setOverlay("checkoutOverlay", true);
  }

  function startCountdown() {
    const endKey = "ghufran.dealEnd.v1";
    let end = Number(loadStore(endKey, 0));
    if (!end || end < Date.now()) { end = Date.now() + 12 * 60 * 60 * 1000; saveStore(endKey, end); }
    const tick = () => {
      const remaining = Math.max(0, end - Date.now());
      document.getElementById("timerHours").textContent = String(Math.floor(remaining / 3600000)).padStart(2, "0");
      document.getElementById("timerMinutes").textContent = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, "0");
      document.getElementById("timerSeconds").textContent = String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0");
      if (remaining <= 0) { end = Date.now() + 12 * 60 * 60 * 1000; saveStore(endKey, end); }
    };
    tick();
    window.setInterval(tick, 1000);
  }

  function renderAdmin() {
    const products = state.products;
    const orderCount = state.adminStats?.total_orders ?? state.orders.length;
    const sales = Number(state.adminStats?.total_sales ?? state.orders.reduce((total, order) => total + Number(order.total || 0), 0));
    const stock = products.reduce((total, product) => total + product.stock, 0);
    const tabContent = state.adminTab === "Products" ? `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Product</th><th>Brand</th><th>Price</th><th>Stock</th><th>Discount</th><th>Actions</th></tr></thead><tbody>${products.map((p) => `<tr><td>${escapeHtml(p.model)}</td><td>${escapeHtml(p.brand)}</td><td>${money(p.price)}</td><td>${p.stock}</td><td>${discount(p)}%</td><td><button type="button" data-admin="edit" data-id="${escapeAttr(p.id)}">Edit</button><button type="button" data-admin="delete" data-id="${escapeAttr(p.id)}">Delete</button></td></tr>`).join("")}</tbody></table></div><form class="admin-product-form" id="adminProductForm" hidden></form>` : state.adminTab === "Orders" ? (state.orders.length ? `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Payment</th><th>Total</th></tr></thead><tbody>${state.orders.map((order) => `<tr><td>${escapeHtml(order.id)}</td><td>${escapeHtml(order.customer)}</td><td>${escapeHtml(order.date)}</td><td>${escapeHtml(order.payment)}</td><td>${money(order.total)}</td></tr>`).join("")}</tbody></table></div>` : '<p class="admin-placeholder">No demo orders yet. Completed checkouts will appear here.</p>') : state.adminTab === "Customers" ? (state.orders.length ? `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Customer</th><th>Email</th><th>Phone</th><th>Orders</th></tr></thead><tbody>${state.orders.map((order) => `<tr><td>${escapeHtml(order.customer)}</td><td>${escapeHtml(order.email)}</td><td>${escapeHtml(order.phone)}</td><td>1</td></tr>`).join("")}</tbody></table></div>` : '<p class="admin-placeholder">Customer records are created only when a demo order is placed.</p>') : state.adminTab === "Reviews" ? `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Customer</th><th>Rating</th><th>Review</th><th>Date</th></tr></thead><tbody>${sampleReviews.map((r) => `<tr><td>${escapeHtml(r.name)}</td><td>${"★".repeat(r.rating)}</td><td>${escapeHtml(r.text)}</td><td>${escapeHtml(r.date)}</td></tr>`).join("")}</tbody></table></div>` : `<p class="admin-placeholder">Discounts and inventory are managed per product in the Products tab. Changes are stored in this browser only.</p>`;
    const customerCount = state.adminStats?.total_customers ?? new Set(state.orders.map((order) => order.email)).size;
    const pendingCount = state.adminStats?.pending_orders ?? 0;
    const storeLabel = state.apiAvailable ? "AUTHENTICATED ADMIN · MYSQL" : "LOCAL PREVIEW · NOT AUTHENTICATED";
    document.getElementById("adminContent").innerHTML = `<p class="eyebrow">${storeLabel}</p><div class="admin-topline"><div><h2 id="adminTitle">Store dashboard</h2><p class="checkout-intro">${state.apiAvailable ? "Changes are validated and saved by the C++ API." : "Local-only demonstration. Not a secure admin workspace."}</p></div><button class="button button--dark" id="adminAddProduct" type="button">＋ Add product</button></div><div class="admin-stats"><div class="admin-stat"><span>Total products</span><strong>${state.adminStats?.total_products ?? products.length}</strong></div><div class="admin-stat"><span>Customers</span><strong>${customerCount}</strong></div><div class="admin-stat"><span>Pending orders</span><strong>${pendingCount}</strong></div><div class="admin-stat"><span>Recorded sales</span><strong>${money(sales)}</strong></div></div><div class="admin-tabs">${["Products", "Orders", "Customers", "Inventory", "Discounts", "Reviews", "Analytics"].map((tab) => `<button type="button" data-admin-tab="${tab}" class="${state.adminTab === tab ? "is-active" : ""}">${tab}</button>`).join("")}</div><div class="admin-tab-content">${tabContent}</div>`;
    const statsGrid = document.querySelector(".admin-stats");
    statsGrid.innerHTML = [
      ["Total products", state.adminStats?.total_products ?? products.length],
      ["Total orders", orderCount],
      ["Customers", customerCount],
      ["Total sales", money(sales)],
      ["Pending orders", pendingCount],
      ["Low stock items", state.adminStats?.low_stock ?? products.filter((product) => product.stock < 10).length],
    ].map(([label, value]) => `<div class="admin-stat"><span>${label}</span><strong>${value}</strong></div>`).join("");
  }

  async function loadAdminTabData() {
    if (!state.apiAvailable || state.currentUser?.role !== "admin") return;
    const content = document.querySelector(".admin-tab-content");
    try {
      if (state.adminTab === "Orders") {
        const data = await window.GhufranAPI.request("/api/orders");
        state.orders = data.orders.map((order) => ({ ...order, customer: order.customer_name, date: order.created_at, payment: order.payment_method, total: Number(order.total) }));
        renderAdmin();
        document.querySelector(".admin-table thead tr")?.insertAdjacentHTML("beforeend", "<th>Status</th>");
        const rows = document.querySelectorAll(".admin-table tbody tr");
        state.orders.forEach((order, index) => {
          if (!rows[index]) return;
          const statusCell = document.createElement("td");
          statusCell.innerHTML = `<select data-order-status="${order.id}" aria-label="Order ${order.id} status">${["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => `<option ${order.order_status === status ? "selected" : ""}>${status}</option>`).join("")}</select>`;
          rows[index].append(statusCell);
        });
        return;
      }
      if (state.adminTab === "Customers") {
        const { customers } = await window.GhufranAPI.request("/api/admin/customers");
        content.innerHTML = `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Orders</th><th>Lifetime value</th></tr></thead><tbody>${customers.map((c) => `<tr><td>${escapeHtml(c.name)}</td><td>${escapeHtml(c.email)}</td><td>${escapeHtml(c.phone || "—")}</td><td>${c.order_count}</td><td>${money(c.lifetime_value)}</td></tr>`).join("")}</tbody></table></div>`;
      } else if (state.adminTab === "Inventory") {
        const { items } = await window.GhufranAPI.request("/api/admin/inventory");
        content.innerHTML = `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Product</th><th>Brand</th><th>Category</th><th>Units</th><th>Status</th></tr></thead><tbody>${items.map((item) => `<tr><td>${escapeHtml(item.model)}</td><td>${escapeHtml(item.brand)}</td><td>${escapeHtml(item.category)}</td><td>${item.stock_quantity}</td><td>${Number(item.stock_quantity) < 3 ? "Reorder soon" : "Low stock"}</td></tr>`).join("") || '<tr><td colspan="5">No low-stock items.</td></tr>'}</tbody></table></div>`;
      } else if (state.adminTab === "Reviews") {
        const { reviews } = await window.GhufranAPI.request("/api/admin/reviews");
        content.innerHTML = `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Customer</th><th>Product</th><th>Rating</th><th>Review</th><th>Status</th><th>Actions</th></tr></thead><tbody>${reviews.map((review) => `<tr><td>${escapeHtml(review.customer_name)}</td><td>${escapeHtml(review.model)}</td><td>${review.rating}/5</td><td>${escapeHtml(review.review_text)}</td><td>${escapeHtml(review.status)}</td><td><button type="button" data-review-action="approved" data-id="${review.id}">Approve</button><button type="button" data-review-action="rejected" data-id="${review.id}">Reject</button><button type="button" data-review-delete="true" data-id="${review.id}">Delete</button></td></tr>`).join("")}</tbody></table></div>`;
      } else if (state.adminTab === "Discounts") {
        const { coupons } = await window.GhufranAPI.request("/api/admin/coupons");
        content.innerHTML = `<form class="coupon-form" id="couponForm"><label>Code<input name="code" required minlength="3"></label><label>Type<select name="discount_type"><option value="percentage">Percent</option><option value="fixed">Fixed PKR</option></select></label><label>Value<input name="discount_value" type="number" min="1" step="0.01" required></label><label>Minimum order<input name="minimum_amount" type="number" min="0" value="0"></label><label>Expires<input name="expires_at" type="datetime-local"></label><button class="button button--dark" type="submit">Create coupon</button><button class="button" type="button" data-coupon-cancel hidden>Cancel edit</button></form><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Code</th><th>Type</th><th>Value</th><th>Minimum</th><th>Expires</th><th>Status</th><th></th></tr></thead><tbody>${coupons.map((coupon) => `<tr><td>${escapeHtml(coupon.code)}</td><td>${escapeHtml(coupon.discount_type)}</td><td>${coupon.discount_value}</td><td>${money(coupon.minimum_amount)}</td><td>${escapeHtml(coupon.expires_at || "Never")}</td><td>${escapeHtml(coupon.status)}</td><td><button type="button" data-coupon-edit="true" data-id="${coupon.id}" data-code="${escapeAttr(coupon.code)}" data-type="${escapeAttr(coupon.discount_type)}" data-value="${coupon.discount_value}" data-minimum="${coupon.minimum_amount}" data-expiry="${escapeAttr(coupon.expires_at || "")}" data-status="${escapeAttr(coupon.status)}">Edit</button><button type="button" data-coupon-toggle="${coupon.status === "active" ? "disabled" : "active"}" data-id="${coupon.id}">${coupon.status === "active" ? "Disable" : "Enable"}</button></td></tr>`).join("")}</tbody></table></div>`;
      } else if (state.adminTab === "Analytics") {
        const data = await window.GhufranAPI.request("/api/admin/analytics");
        const daily = data.daily_sales || [];
        const monthly = data.monthly_sales || [];
        const best = data.best_sellers || [];
        const maximum = Math.max(1, ...daily.map((day) => Number(day.revenue)));
        content.innerHTML = `<div class="analytics-grid"><section><h3>Daily revenue · last 30 days</h3><div class="analytics-bars">${daily.map((day) => `<div class="analytics-bar-row"><span>${escapeHtml(day.day)}</span><meter min="0" max="${maximum}" value="${Number(day.revenue)}" aria-label="${money(day.revenue)}"></meter><strong>${money(day.revenue)}</strong></div>`).join("") || "<p>No completed sales yet.</p>"}</div><h3>Monthly revenue · last 12 months</h3><div class="analytics-bars">${monthly.map((month) => `<div class="analytics-bar-row"><span>${escapeHtml(month.month)}</span><meter min="0" max="${Math.max(1,...monthly.map((entry) => Number(entry.revenue)))}" value="${Number(month.revenue)}" aria-label="${money(month.revenue)}"></meter><strong>${money(month.revenue)}</strong></div>`).join("") || "<p>No completed sales yet.</p>"}</div></section><section><h3>Best-selling products</h3><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Product</th><th>Units</th><th>Revenue</th></tr></thead><tbody>${best.map((item) => `<tr><td>${escapeHtml(item.brand)} ${escapeHtml(item.model)}</td><td>${item.units}</td><td>${money(item.revenue)}</td></tr>`).join("") || '<tr><td colspan="3">No sales yet.</td></tr>'}</tbody></table></div></section></div>`;
      }
    } catch (error) { showToast(error.message); }
  }

  function renderAccount(mode) {
    if (state.currentUser) {
      const adminAction = state.currentUser.role === "admin" ? '<button class="button button--dark" type="button" data-account-admin>Open admin dashboard</button>' : "";
      document.getElementById("accountContent").innerHTML = `<p class="eyebrow">YOUR GHUFRAN LAPTOP ACCOUNT</p><h2 id="accountTitle">Good to see you, ${escapeHtml(state.currentUser.name.split(" ")[0])}.</h2><p class="account-intro">Signed in as ${escapeHtml(state.currentUser.email)}.</p>${adminAction}<button class="button account-logout" type="button" data-account-logout>Sign out</button><p class="account-note">Your account is authenticated by the Ghufran LapTop server. Passwords are never stored in this browser.</p>`;
      return;
    }
    const registering = mode === "register";
    document.getElementById("accountContent").innerHTML = `<p class="eyebrow">YOUR GHUFRAN LAPTOP ACCOUNT</p><h2 id="accountTitle">${registering ? "Make yourself at home." : "Welcome back."}</h2><p class="account-intro">${registering ? "Create a secure Ghufran LapTop account." : "Sign in to your Ghufran LapTop account."}</p><div class="account-tabs"><button type="button" data-account-mode="login" class="${registering ? "" : "is-active"}">Login</button><button type="button" data-account-mode="register" class="${registering ? "is-active" : ""}">Register</button></div><form class="account-form" id="accountForm" data-mode="${mode}">${registering ? '<label>Your name<input name="name" autocomplete="name" required minlength="2"></label><label>Phone<input name="phone" type="tel" autocomplete="tel" required minlength="8"></label>' : ""}<label>Email address<input name="email" type="email" autocomplete="email" required></label><label>Password<input name="password" type="password" autocomplete="${registering ? "new-password" : "current-password"}" required minlength="12"></label>${registering ? '<label>Confirm password<input name="confirm_password" type="password" autocomplete="new-password" required minlength="12"></label>' : ""}<button class="button button--dark" type="submit">${registering ? "Create account" : "Sign in"} <span aria-hidden="true">↗</span></button></form><p class="account-note">${state.apiAvailable ? "Passwords are protected with server-side PBKDF2 hashing and a secure session cookie." : "Backend is offline. Account actions are disabled in local preview mode."}</p>`;
  }

  async function submitAccount(event) {
    if (event.target.id !== "accountForm") return;
    event.preventDefault();
    const form = event.target;
    if (!form.reportValidity()) return;
    if (!state.apiAvailable) return showToast("Start the C++ server to use accounts.");
    const values = Object.fromEntries(new FormData(form).entries());
    const registering = form.dataset.mode === "register";
    if (registering && values.password !== values.confirm_password) return showToast("Passwords do not match.");
    try {
      const result = await window.GhufranAPI.request(registering ? "/api/register" : "/api/login", {
        method: "POST", body: { name: values.name, email: values.email, phone: values.phone, password: values.password },
      });
      state.currentUser = result.user;
      await syncRemoteCart();
      await syncRemoteWishlist();
      updateAccountNav();
      setOverlay("accountOverlay", false);
      showToast(`Signed in as ${result.user.name}.`);
    } catch (error) { showToast(error.message); }
  }

  async function logoutAccount() {
    try {
      await window.GhufranAPI.request("/api/logout", { method: "POST" });
      state.currentUser = null;
      state.cart = {};
      state.wishlist = [];
      await window.GhufranAPI.initialize();
      updateAccountNav();
      renderCart(); renderWishlistCount(); renderProducts();
      renderAccount("login");
      showToast("You have signed out.");
    } catch (error) { showToast(error.message); }
  }

  async function submitContact(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form).entries());
    if (state.apiAvailable) {
      try {
        await window.GhufranAPI.request("/api/contacts", { method: "POST", body: { name: values.name, email: values.email, subject: values.topic, message: values.message } });
        form.reset(); showToast("Thanks for your note. We'll be in touch soon.");
      } catch (error) { showToast(error.message); }
      return;
    }
    form.reset(); showToast("Local preview only. Start the server to save your message.");
  }

  async function submitNewsletter(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (state.apiAvailable) {
      try { await window.GhufranAPI.request("/api/newsletter", { method: "POST", body: { email: new FormData(form).get("email") } }); form.reset(); showToast("You're on the list. Talk soon!"); }
      catch (error) { showToast(error.message); }
      return;
    }
    form.reset(); showToast("Local preview only. Start the server to subscribe.");
  }

  function beginAdminForm(product = null) {
    const form = document.getElementById("adminProductForm");
    if (!form) return;
    state.editingProductId = product?.id || null;
    form.hidden = false;
    form.innerHTML = `<h3>${product ? "Edit product" : "Add a product"}</h3><label>Brand<input name="brand" required value="${escapeAttr(product?.brand || "")}"></label><label>Model<input name="model" required value="${escapeAttr(product?.model || "")}"></label><label>Price (PKR)<input name="price" type="number" min="1" required value="${product?.price || ""}"></label><label>Original price<input name="oldPrice" type="number" min="1" required value="${product?.oldPrice || ""}"></label><label>Stock<input name="stock" type="number" min="0" required value="${product?.stock ?? 1}"></label><label>RAM (GB)<input name="ram" type="number" min="0" required value="${product?.ram ?? 16}"></label><label>Storage (GB)<input name="storage" type="number" min="0" required value="${product?.storage ?? 512}"></label><label>Processor<input name="cpu" required value="${escapeAttr(product?.cpu || "Intel Core i5")}"></label><label>Graphics<input name="gpu" required value="${escapeAttr(product?.gpu || "Integrated graphics")}"></label><label>Category<select name="category_id"><option value="2">Business laptops</option><option value="1">Gaming laptops</option><option value="3">Student laptops</option><option value="4">Professional laptops</option><option value="5">Budget laptops</option><option value="6">Premium laptops</option><option value="7">2-in-1 laptops</option><option value="8">Refurbished laptops</option><option value="9">Accessories</option></select></label><label>Display<input name="display" required value="${escapeAttr(product?.display_label || "FHD IPS")}"></label><label>Screen size (in)<input name="screen_size" type="number" min="0" step="0.1" required value="${product?.display || 15.6}"></label><label>Operating system<input name="operating_system" required value="${escapeAttr(product?.os || "Windows 11")}"></label><label>Warranty<input name="warranty" required value="${escapeAttr(product?.warranty || "12-month seller warranty; terms apply")}"></label><label class="field-full">Image URL<input name="image" type="url" required value="${escapeAttr(product?.image || "")}" placeholder="https://..."></label><label class="field-full">Short description<input name="description" required value="${escapeAttr(product?.description || "A thoughtfully selected laptop for everyday use.")}"></label><div class="form-actions"><button class="button button--dark" type="submit">${product ? "Save changes" : "Add product"}</button><button class="button" type="button" data-admin="cancel">Cancel</button></div>`;
    if (product?.category_id) form.elements.category_id.value = String(product.category_id);
    form.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function initEvents() {
    document.getElementById("productSearch").addEventListener("input", renderProducts);
    document.getElementById("sortSelect").addEventListener("change", renderProducts);
    filterIds.forEach((id) => document.getElementById(id).addEventListener("input", () => {
      if (id === "priceFilter") document.getElementById("priceValue").textContent = money(document.getElementById(id).value);
      renderProducts();
    }));
    document.getElementById("clearFilters").addEventListener("click", resetFilters);
    document.getElementById("emptyReset").addEventListener("click", resetFilters);
    document.getElementById("categoryGrid").addEventListener("click", (event) => selectCategory(event.target.closest("[data-category]")?.dataset.category));
    document.querySelector(".category-pills").addEventListener("click", (event) => selectCategory(event.target.closest("[data-category]")?.dataset.category));
    document.getElementById("productGrid").addEventListener("click", onProductAction);
    document.getElementById("dealFeature").addEventListener("click", onProductAction);
    document.getElementById("recentList").addEventListener("click", onProductAction);
    document.getElementById("cartItems").addEventListener("click", onProductAction);
    document.getElementById("compareContent").addEventListener("click", onProductAction);
    document.getElementById("productModalContent").addEventListener("click", onProductAction);
    document.getElementById("productModalContent").addEventListener("submit", submitProductReview);
    document.getElementById("productModalContent").addEventListener("change", (event) => { if (event.target.id === "detailQuantity") event.target.blur(); });
    document.getElementById("cartShortcut").addEventListener("click", () => setOverlay("cartOverlay", true));
    document.getElementById("wishlistShortcut").addEventListener("click", showWishlist);
    document.getElementById("compareOpen").addEventListener("click", () => { renderComparison(); setOverlay("compareOverlay", true); });
    document.getElementById("continueShopping").addEventListener("click", () => setOverlay("cartOverlay", false));
    document.getElementById("checkoutOpen").addEventListener("click", openCheckout);
    document.getElementById("clearCart").addEventListener("click", () => {
      state.activeCoupon = null;
      if (state.apiAvailable && state.currentUser) window.GhufranAPI.request("/api/cart", { method: "DELETE" }).then(syncRemoteCart).catch((error) => showToast(error.message));
      else { state.cart = {}; saveStore(storageKeys.cart, state.cart); renderCart(); }
      showToast("Your bag has been cleared.");
    });
    document.getElementById("checkoutForm").addEventListener("submit", submitCheckout);
    document.getElementById("cartOverlay").addEventListener("submit", (event) => {
      if (event.target.id === "couponApplyForm") applyCoupon(event);
    });
    document.getElementById("contactForm").addEventListener("submit", submitContact);
    document.getElementById("newsletterForm").addEventListener("submit", submitNewsletter);
    document.getElementById("accessoryGrid").addEventListener("click", (event) => {
      const product = event.target.closest("[data-accessory-product]");
      if (product) { addToCart(product.dataset.accessoryProduct); return; }
      const item = event.target.closest("[data-accessory]");
      if (item) showToast(`${item.dataset.accessory} added to your accessories list.`);
    });
    document.getElementById("themeToggle").addEventListener("click", () => { const light = document.body.classList.toggle("theme-light"); saveStore(storageKeys.theme, light ? "light" : "dark"); });
    document.getElementById("menuToggle").addEventListener("click", toggleMenu);
    document.getElementById("mainNav").addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(); });
    document.getElementById("adminOpen").addEventListener("click", openAdminDashboard);
    document.getElementById("accountOpen").addEventListener("click", () => { closeMenu(); renderAccount("login"); setOverlay("accountOverlay", true); });
    document.getElementById("adminContent").addEventListener("click", onAdminAction);
    document.getElementById("adminContent").addEventListener("change", async (event) => {
      const select = event.target.closest("[data-order-status]");
      if (!select) return;
      try {
        await window.GhufranAPI.request(`/api/orders/${encodeURIComponent(select.dataset.orderStatus)}`, { method: "PUT", body: { order_status: select.value } });
        showToast("Order status updated.");
      } catch (error) { showToast(error.message); }
    });
    document.getElementById("adminContent").addEventListener("submit", (event) => { saveAdminProduct(event); saveCoupon(event); });
    document.getElementById("accountContent").addEventListener("click", (event) => {
      const tab = event.target.closest("[data-account-mode]");
      if (tab) renderAccount(tab.dataset.accountMode);
      if (event.target.closest("[data-account-logout]")) logoutAccount();
      if (event.target.closest("[data-account-admin]")) { setOverlay("accountOverlay", false); openAdminDashboard(); }
    });
    document.getElementById("accountContent").addEventListener("submit", submitAccount);
    document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => setOverlay(button.dataset.close, false)));
    document.querySelectorAll(".overlay").forEach((overlay) => overlay.addEventListener("click", (event) => { if (event.target === overlay) setOverlay(overlay.id, false); }));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") { document.querySelectorAll(".overlay:not([hidden])").forEach((overlay) => setOverlay(overlay.id, false)); closeMenu(); }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); document.getElementById("productSearch").focus(); document.getElementById("laptops").scrollIntoView({ behavior: "smooth" }); }
    });
    document.getElementById("scrollTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => document.getElementById("scrollTop").classList.toggle("is-visible", window.scrollY > 650), { passive: true });
  }

  function selectCategory(category) {
    if (!category) return;
    document.getElementById("usageFilter").value = category;
    renderProducts();
    document.getElementById("laptops").scrollIntoView({ behavior: "smooth" });
  }
  function resetFilters() {
    document.getElementById("productSearch").value = "";
    filterIds.forEach((id) => { const element = document.getElementById(id); element.value = id === "priceFilter" ? "800000" : id === "ratingFilter" ? "0" : ""; });
    document.getElementById("priceValue").textContent = money(800000);
    document.getElementById("sortSelect").value = "featured";
    renderProducts();
  }
  function onProductAction(event) {
    const control = event.target.closest("[data-action]");
    if (!control) return;
    const { action, id } = control.dataset;
    if (action === "details") openProduct(id);
    if (action === "add") addToCart(id);
    if (action === "wishlist") toggleWishlist(id);
    if (action === "compare") { toggleComparison(id); if (!document.getElementById("compareOverlay").hidden) renderComparison(); }
    if (action === "remove") {
      state.activeCoupon = null;
      if (state.apiAvailable && state.currentUser) {
        window.GhufranAPI.request(`/api/cart/${encodeURIComponent(id)}`, { method: "DELETE" }).then(syncRemoteCart).catch((error) => showToast(error.message));
      } else { delete state.cart[id]; saveStore(storageKeys.cart, state.cart); renderCart(); }
    }
    if (action === "qty-minus" || action === "qty-plus") {
      state.activeCoupon = null;
      const next = (state.cart[id] || 0) + (action === "qty-plus" ? 1 : -1);
      if (state.apiAvailable && state.currentUser) {
        const request = next <= 0
          ? window.GhufranAPI.request(`/api/cart/${encodeURIComponent(id)}`, { method: "DELETE" })
          : window.GhufranAPI.request(`/api/cart/${encodeURIComponent(id)}`, { method: "PUT", body: { quantity: Math.min(productById(id).stock, next) } });
        request.then(syncRemoteCart).catch((error) => showToast(error.message));
        return;
      }
      if (next <= 0) delete state.cart[id];
      else state.cart[id] = Math.min(productById(id).stock, next);
      saveStore(storageKeys.cart, state.cart); renderCart();
    }
    if (action === "detail-add") { addToCart(id, Number(document.getElementById("detailQuantity")?.value || 1)); setOverlay("productOverlay", false); }
    if (action === "buy") { addToCart(id, Number(document.getElementById("detailQuantity")?.value || 1)); setOverlay("productOverlay", false); setOverlay("cartOverlay", true); }
  }

  function showWishlist() {
    if (state.wishlist.length === 0) return showToast("Your wishlist is empty. Tap a heart to save a favorite.");
    document.getElementById("productSearch").value = "";
    resetFilters();
    const wishlistSet = new Set(state.wishlist);
    const products = state.products.filter((product) => wishlistSet.has(product.id));
    document.getElementById("resultCount").textContent = products.length;
    document.getElementById("activeFilterLabel").textContent = "Your wishlist";
    document.getElementById("productGrid").innerHTML = products.map(productCard).join("");
    document.getElementById("productGrid").hidden = false;
    document.getElementById("emptyState").hidden = true;
    document.getElementById("laptops").scrollIntoView({ behavior: "smooth" });
  }

  function submitCheckout(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const details = Object.fromEntries(new FormData(form).entries());
    if (state.apiAvailable) {
      const paymentMap = { "Cash on Delivery": "cash_on_delivery", "Bank Transfer (details shared after order)": "bank_transfer", "Other method (confirmation required)": "gateway_placeholder" };
      const orderRequest = {
        customer_name: details.name, phone: details.phone, email: details.email,
        address: details.address, city: details.city, province: details.province,
        postal_code: details.postal, payment_method: paymentMap[details.payment], coupon: state.activeCoupon?.code || "",
        items: Object.entries(state.cart).map(([product_id, quantity]) => ({ product_id: Number(product_id), quantity })),
      };
      window.GhufranAPI.request("/api/orders", { method: "POST", body: orderRequest }).then(async (order) => {
        state.cart = {};
        saveStore(storageKeys.cart, state.cart);
        if (state.currentUser) await syncRemoteCart();
        else renderCart();
        form.reset();
        setOverlay("checkoutOverlay", false);
        showToast(`Order #${order.id} placed. No payment was processed.`);
      }).catch((error) => showToast(error.message));
      return;
    }
    const entries = Object.entries(state.cart).filter(([id, quantity]) => productById(id) && quantity > 0);
    if (entries.length === 0) { setOverlay("checkoutOverlay", false); return showToast("Your bag is empty."); }
    const subtotal = entries.reduce((total, [id, quantity]) => total + productById(id).price * quantity, 0);
    const total = subtotal + (subtotal > 0 && subtotal < 300000 ? 1800 : 0);
    const order = { id: `GL-${Date.now().toString().slice(-7)}`, customer: details.name, email: details.email, phone: details.phone, address: `${details.address}, ${details.city}, ${details.province} ${details.postal}`, payment: details.payment, total, date: new Date().toLocaleDateString("en-PK"), items: entries.map(([id, quantity]) => ({ id, quantity })) };
    state.orders.unshift(order);
    state.activeCoupon = null;
    saveStore(storageKeys.orders, state.orders);
    state.cart = {};
    saveStore(storageKeys.cart, state.cart);
    renderCart();
    form.reset();
    setOverlay("checkoutOverlay", false);
    showToast(`Demo order ${order.id} placed. No payment was taken.`);
  }

  function toggleMenu() {
    const nav = document.getElementById("mainNav");
    const open = nav.classList.toggle("is-open");
    document.getElementById("menuToggle").setAttribute("aria-expanded", String(open));
    document.getElementById("menuToggle").setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  }

  async function openAdminDashboard() {
    if (!state.apiAvailable || state.currentUser?.role !== "admin") {
      showToast("Sign in with an administrator account to access store management.");
      return;
    }
    try {
      const [stats, products, orders] = await Promise.all([
        window.GhufranAPI.request("/api/admin/stats"),
        window.GhufranAPI.getProducts({ limit: 60, sort: "newest" }),
        window.GhufranAPI.request("/api/orders"),
      ]);
      state.adminStats = Object.fromEntries(Object.entries(stats).map(([key, value]) => [key, Number(value)]));
      state.products = products.products;
      state.orders = orders.orders.map((order) => ({
        ...order, customer: order.customer_name, date: order.created_at,
        payment: order.payment_method, total: Number(order.total),
      }));
      renderBrandOptions();
      state.adminTab = "Products";
      renderAdmin();
      setOverlay("adminOverlay", true);
    } catch (error) { showToast(error.message); }
  }
  function closeMenu() {
    document.getElementById("mainNav").classList.remove("is-open");
    document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
    document.getElementById("menuToggle").setAttribute("aria-label", "Open navigation");
  }

  function onAdminAction(event) {
    const tab = event.target.closest("[data-admin-tab]");
    if (tab) { state.adminTab = tab.dataset.adminTab; renderAdmin(); loadAdminTabData(); return; }
    if (event.target.closest("#adminAddProduct")) { state.adminTab = "Products"; renderAdmin(); beginAdminForm(); return; }
    const reviewAction = event.target.closest("[data-review-action]");
    if (reviewAction) {
      window.GhufranAPI.request(`/api/admin/reviews/${encodeURIComponent(reviewAction.dataset.id)}`, { method: "PUT", body: { status: reviewAction.dataset.reviewAction } })
        .then(loadAdminTabData).catch((error) => showToast(error.message));
      return;
    }
    const reviewDelete = event.target.closest("[data-review-delete]");
    if (reviewDelete) {
      window.GhufranAPI.request(`/api/admin/reviews/${encodeURIComponent(reviewDelete.dataset.id)}`, { method: "DELETE" })
        .then(loadAdminTabData).catch((error) => showToast(error.message));
      return;
    }
    const couponToggle = event.target.closest("[data-coupon-toggle]");
    if (couponToggle) {
      window.GhufranAPI.request(`/api/admin/coupons/${encodeURIComponent(couponToggle.dataset.id)}`, { method: "PUT", body: { status: couponToggle.dataset.couponToggle } })
        .then(loadAdminTabData).catch((error) => showToast(error.message));
      return;
    }
    const couponEdit = event.target.closest("[data-coupon-edit]");
    if (couponEdit) {
      const form = document.getElementById("couponForm");
      form.dataset.couponId = couponEdit.dataset.id;
      form.dataset.status = couponEdit.dataset.status;
      form.elements.code.value = couponEdit.dataset.code;
      form.elements.discount_type.value = couponEdit.dataset.type;
      form.elements.discount_value.value = couponEdit.dataset.value;
      form.elements.minimum_amount.value = couponEdit.dataset.minimum;
      form.elements.expires_at.value = couponEdit.dataset.expiry ? couponEdit.dataset.expiry.replace(" ", "T").slice(0, 16) : "";
      form.querySelector('[type="submit"]').textContent = "Save coupon";
      form.querySelector("[data-coupon-cancel]").hidden = false;
      form.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }
    if (event.target.closest("[data-coupon-cancel]")) { loadAdminTabData(); return; }
    const action = event.target.closest("[data-admin]");
    if (!action) return;
    const product = productById(action.dataset.id);
    if (action.dataset.admin === "edit" && product) beginAdminForm(product);
    if (action.dataset.admin === "delete" && product) {
      if (state.apiAvailable && state.currentUser?.role === "admin") {
        window.GhufranAPI.request(`/api/products/${encodeURIComponent(product.id)}`, { method: "DELETE" })
          .then(openAdminDashboard).then(() => showToast(`${product.model} archived.`)).catch((error) => showToast(error.message));
        return;
      }
      state.products = state.products.filter((item) => item.id !== product.id);
      saveStore(storageKeys.catalog, state.products);
      renderAdmin(); renderBrandOptions(); renderProducts(); renderDeals();
      showToast(`${product.model} removed from the demo catalog.`);
    }
    if (action.dataset.admin === "cancel") { const form = document.getElementById("adminProductForm"); if (form) form.hidden = true; }
  }

  function saveAdminProduct(event) {
    if (event.target.id !== "adminProductForm") return;
    event.preventDefault();
    const form = event.target;
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form).entries());
    const current = state.editingProductId ? productById(state.editingProductId) : null;
    if (state.apiAvailable && state.currentUser?.role === "admin") {
      const body = {
        category_id: Number(values.category_id), brand: values.brand.trim(), model: values.model.trim(),
        description: values.description.trim(), processor: values.cpu.trim(), ram: Number(values.ram),
        storage: Number(values.storage), gpu: values.gpu.trim(), display: values.display.trim(),
        operating_system: values.operating_system.trim(), screen_size: Number(values.screen_size),
        price: Number(values.price), old_price: Number(values.oldPrice), stock_quantity: Number(values.stock),
        warranty: values.warranty.trim(), image: values.image.trim(), status: "active",
      };
      window.GhufranAPI.request(current ? `/api/products/${encodeURIComponent(current.id)}` : "/api/products", { method: current ? "PUT" : "POST", body })
        .then(() => openAdminDashboard()).then(() => showToast(current ? "Product changes saved." : "Product added to the catalog."))
        .catch((error) => showToast(error.message));
      return;
    }
    const brand = values.brand.trim();
    const model = values.model.trim();
    const product = {
      ...(current || {}), id: current?.id || `${brand}-${model}-${Date.now()}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"), brand, model,
      price: Number(values.price), oldPrice: Number(values.oldPrice), stock: Number(values.stock), ram: Number(values.ram), storage: Number(values.storage),
      cpu: values.cpu.trim(), processor: values.cpu.toLowerCase().includes("apple") ? "Apple" : values.cpu.toLowerCase().includes("ryzen") || values.cpu.toLowerCase().includes("amd") ? "AMD" : values.cpu.toLowerCase().includes("snapdragon") ? "Snapdragon" : "Intel",
      gpu: current?.gpu || "Integrated graphics", gpuType: current?.gpuType || "integrated", display: current?.display || 15.6, os: current?.os || "Windows 11", rating: current?.rating || 4.5, reviews: current?.reviews || 0,
      usage: [values.usage], condition: current?.condition || "New", year: current?.year || new Date().getFullYear(), color: current?.color || "Silver", image: values.image || current?.image || image("photo-1496181133206-80ce9b88a853"), description: values.description.trim(),
    };
    if (current) state.products = state.products.map((item) => item.id === current.id ? product : item);
    else state.products.unshift(product);
    saveStore(storageKeys.catalog, state.products);
    renderAdmin(); renderBrandOptions(); renderProducts(); renderDeals();
    showToast(current ? "Product changes saved." : "Product added to the demo catalog.");
  }

  async function saveCoupon(event) {
    if (event.target.id !== "couponForm") return;
    event.preventDefault();
    const form = event.target;
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      if (values.expires_at) values.expires_at = values.expires_at.replace("T", " ");
      const couponId = form.dataset.couponId;
      const method = couponId ? "PUT" : "POST";
      if (couponId) values.status = form.dataset.status || "active";
      await window.GhufranAPI.request(couponId ? `/api/admin/coupons/${encodeURIComponent(couponId)}` : "/api/admin/coupons", { method, body: values });
      await loadAdminTabData();
      showToast("Coupon created.");
    } catch (error) { showToast(error.message); }
  }

  init();
})();