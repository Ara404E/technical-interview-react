import { useEffect, useState } from "react";
import { getProductsApi } from "../../service/products";
import type { Product } from "../../service/products/types";
import { DashboardLayout } from "../layout";
import { useNavigate } from "react-router";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const data = await getProductsApi();
      setProducts(data.products);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch products",
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProducts();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        <h1 className="mb-6 text-2xl font-bold text-white">Products</h1>

        {loading && <p className="text-slate-400">Loading products...</p>}

        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 transition hover:border-yellow-400 cursor-pointer"
                onClick={() => navigate(`/${product.id}`)}
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
