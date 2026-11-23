import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getSingleProductApi } from "../../service/products";
import type { Product } from "../../service/products/types";
import { DashboardLayout } from "../layout";

export function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getProduct = async () => {
    try {
      const data = await getSingleProductApi(Number(id));
      setProduct(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch product",
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProduct();
  }, [id]);

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-yellow-400 transition hover:text-yellow-300 cursor-pointer"
        >
          Back to products
        </button>

        {loading && <p className="text-slate-400">Loading product...</p>}

        {error && <p className="text-red-400">{error}</p>}

        {!loading && product && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-72 w-full object-contain"
              />

              <div className="mt-4 grid grid-cols-3 gap-3">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    loading="lazy"
                    className="h-24 w-full rounded-lg bg-white object-contain p-2"
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm capitalize text-yellow-400">
                {product.category}
              </p>

              <h1 className="mt-2 text-2xl font-bold text-white lg:text-3xl">
                {product.title}
              </h1>

              <p className="mt-4 leading-relaxed text-slate-400">
                {product.description}
              </p>

              <p className="mt-6 text-3xl font-bold text-yellow-400">
                ${product.price}
              </p>

              <div className="mt-6 space-y-4 rounded-xl border border-slate-700 bg-slate-800 p-5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Brand</span>
                  <span className="text-white">{product.brand}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Category</span>
                  <span className="capitalize text-white">
                    {product.category}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Rating</span>
                  <span className="text-white"> {product.rating} / 5</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Stock</span>
                  <span className="text-white">{product.stock}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Availability</span>
                  <span className="text-white">
                    {product.availabilityStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
