"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export default function CategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">
          লোড হচ্ছে...
        </div>
      }
    >
      <CategoryContent />
    </Suspense>
  );
}

function CategoryContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    if (slug) {
      setLoading(true);
      console.log("Current Slug from URL:", slug);

      // fetch("https://api.api-store.workers.dev/api/bazardor/products")
      fetch("https://api.abcz.workers.dev/api/bazardor/products")
        .then((res) => res.json())
        .then((data) => {
          console.log("API Full Data Response:", data); // কনসোলে দেখুন ডেটা আসছে কিনা
          const productList = Array.isArray(data) ? data : data.products || [];
          console.log("Parsed Product List:", productList);

          const currentSlug = String(slug || "").toLowerCase();

          const filtered = productList.filter((item: Product) => {
            const itemCategory = String(item.category || "").toLowerCase();
            return (
              itemCategory === currentSlug || itemCategory.includes(currentSlug)
            );
          });

          console.log("Filtered Products:", filtered);

          setProducts(filtered);

          if (filtered.length > 0) {
            setCategoryTitle(
              filtered[0].categoryNameBn || filtered[0].category,
            );
          } else {
            setCategoryTitle(slug);
          }

          setLoading(false);
        })
        .catch((err) => {
          console.error("Category fetch error:", err);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">
        লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* হেডার ও ব্যাক বাটন */}
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              ক্যাটাগরি: {categoryTitle}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              এই ক্যাটাগরির অন্তর্ভুক্ত পণ্যের তালিকা ও বর্তমান বাজার দর
            </p>
          </div>
          <Link
            href="/"
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-xl transition"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-gray-500 text-base">
              এই ক্যাটাগরিতে এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const isUp = product.change?.dir === "up";
              const isDown = product.change?.dir === "down";

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="bg-white border border-gray-200 hover:border-green-500 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl bg-gray-50 p-2 rounded-xl border border-gray-100 flex items-center justify-center">
                        {product.image || product.categoryIcon || "📦"}
                      </span>
                      <div>
                        <h3 className="font-bold text-gray-900 text-base">
                          {product.nameBn}
                        </h3>
                        <p className="text-xs text-gray-400">
                          প্রতি {product.unit}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-between">
                    <div>
                      <span className="text-[11px] text-gray-400 block">
                        আজকের দাম
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ৳{product.today}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        isUp
                          ? "text-red-600 bg-red-50"
                          : isDown
                            ? "text-green-600 bg-green-50"
                            : "text-gray-600 bg-gray-100"
                      }`}
                    >
                      {isUp ? "▲" : isDown ? "▼" : ""}{" "}
                      {Math.abs(product.change?.pct || 0)}%
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
