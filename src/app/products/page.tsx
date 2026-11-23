import { useEffect, useState } from "react";
import {
  getProductsApi,
  searchProductsApi,
  getCategoriesApi,
  getProductByCategoryApi,
} from "../../service/products";
import type { Product, ProductCategory } from "../../service/products/types";
import { DashboardLayout } from "../layout";
import { useNavigate } from "react-router";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      setError(null);
      const data = await getProductsApi();
      setProducts(data.products);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch products",
      );
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const data = await getCategoriesApi();
      setCategories(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch categories",
      );
    }
  };

  const searchProducts = async () => {
    setSelectedCategory("");

    if (!search.trim()) {
      setLoading(true);
      await getProducts();
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await searchProductsApi(search);
      setProducts(data.products);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to search products",
      );
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = async (slug: string) => {
    setSearch("");
    setSelectedCategory(slug);

    if (!slug) {
      setLoading(true);
      await getProducts();
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await getProductByCategoryApi(slug);
      setProducts(data.products);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch category products",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProducts();
    getCategories();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        <h1 className="mb-6 text-2xl font-bold text-white">Products</h1>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchProducts();
            }}
            placeholder="Search products..."
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <button
            onClick={searchProducts}
            className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-slate-900 hover:bg-yellow-300"
          >
            Search
          </button>

          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => getProductsByCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3  text-white sm:w-56"
          >
            <option value="">All Categories</option>

            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {loading && <p className="text-slate-400">Loading products...</p>}

        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="text-slate-400">No products found.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800"
              >
                <img
                  src={product.thumbnail}
                  loading="lazy"
                  alt={product.title}
                  className="h-48 w-full bg-white object-contain p-4"
                />

                <div className="p-4">
                  <h2 className="line-clamp-2 min-h-12 font-semibold text-white">
                    {product.title}
                  </h2>

                  <p className="mt-3 text-xl font-bold text-yellow-400">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
