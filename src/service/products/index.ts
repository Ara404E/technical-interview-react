export async function getProductsApi() {
  const response = await fetch("https://dummyjson.com/products?limit=10");

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? "Failed to load products");
  }
  return response.json();
}

export async function getSingleProductApi(id: number) {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? "Failed to load product");
  }

  return response.json();
}

export async function getCategoriesApi() {
  const response = await fetch(`https://dummyjson.com/products/categories`);
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? "Failed to load categories");
  }

  return response.json();
}

export async function getProductByCategoryApi(slug: string) {
  const response = await fetch(`https://dummyjson.com/products/categories/${slug}`);
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? "Failed to load category products");
  }

  return response.json();
}