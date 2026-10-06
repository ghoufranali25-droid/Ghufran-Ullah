/* Same-origin REST client. No secrets or credentials are persisted in the browser. */
(() => {
  "use strict";
  let csrfToken = "";
  let available = false;

  async function request(path, options = {}) {
    const headers = new Headers(options.headers || {});
    if (options.body && typeof options.body !== "string") {
      headers.set("Content-Type", "application/json");
      options.body = JSON.stringify(options.body);
    }
    if (options.method && !["GET", "HEAD", "OPTIONS"].includes(options.method.toUpperCase()) && csrfToken) {
      headers.set("X-CSRF-Token", csrfToken);
    }
    const response = await fetch(path, { ...options, headers, credentials: "same-origin" });
    const data = await response.json().catch(() => ({}));
    if (data.csrfToken) csrfToken = data.csrfToken;
    if (!response.ok) {
      const error = new Error(data.error || `Request failed (${response.status})`);
      error.status = response.status;
      throw error;
    }
    return data;
  }

  async function initialize() {
    try {
      const health = await request("/api/health", { cache: "no-store" });
      if (!health.ok || health.database !== "connected") return false;
      available = true;
      const csrf = await request("/api/csrf", { cache: "no-store" });
      csrfToken = csrf.csrfToken || "";
      return Boolean(csrfToken);
    } catch {
      available = false;
      return false;
    }
  }

  function productFromApi(product) {
    const category = Array.isArray(product.usage) ? product.usage[0] || "" : "";
    return {
      ...product,
      id: String(product.id),
      oldPrice: Number(product.oldPrice),
      price: Number(product.price),
      stock: Number(product.stock),
      ram: Number(product.ram),
      storage: Number(product.storage),
      rating: Number(product.rating),
      reviews: Number(product.reviews),
      display: Number(product.display),
      year: Number(product.year),
      usage: [category.replace(/ Laptops$/i, "")],
      color: product.color || "See product listing",
    };
  }

  window.GhufranAPI = {
    request,
    initialize,
    isAvailable: () => available,
    getProducts: async (params) => {
      const query = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) if (value !== "" && value != null) query.set(key, value);
      const result = await request(`/api/products?${query.toString()}`);
      return { ...result, products: result.products.map(productFromApi) };
    },
    getProduct: async (id) => productFromApi(await request(`/api/products/${encodeURIComponent(id)}`)),
    mapProduct: productFromApi,
  };
})();
