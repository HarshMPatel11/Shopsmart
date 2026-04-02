const FAKESTORE_BASE_URL = 'https://fakestoreapi.com';
const DUMMYJSON_BASE_URL = 'https://dummyjson.com';

function normalizeDummyProduct(product) {
  return {
    id: product.id,
    title: product.title,
    price: Number(product.price),
    description: product.description,
    category: product.category,
    image: product.thumbnail || product.images?.[0] || '',
    rating: {
      rate: Number(product.rating || 0),
      count: Number(product.stock || 0),
    },
  };
}

async function safeFetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchProducts() {
  try {
    return await safeFetchJson(`${FAKESTORE_BASE_URL}/products`);
  } catch {
    const fallback = await safeFetchJson(`${DUMMYJSON_BASE_URL}/products?limit=100`);
    return (fallback.products || []).map(normalizeDummyProduct);
  }
}

export async function fetchProductById(id) {
  try {
    return await safeFetchJson(`${FAKESTORE_BASE_URL}/products/${id}`);
  } catch {
    const fallback = await safeFetchJson(`${DUMMYJSON_BASE_URL}/products/${id}`);
    return normalizeDummyProduct(fallback);
  }
}

export async function fetchCategories() {
  try {
    return await safeFetchJson(`${FAKESTORE_BASE_URL}/products/categories`);
  } catch {
    return safeFetchJson(`${DUMMYJSON_BASE_URL}/products/category-list`);
  }
}
