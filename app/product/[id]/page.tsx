"use client";

interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

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
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: MarketPrice[];
}

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">
          লোড হচ্ছে...
        </div>
      }
    >
      <ProductDetailsContent />
    </Suspense>
  );
}

function ProductDetailsContent() {
  const params = useParams();
  const slug = params?.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetch("https://api.api-store.workers.dev/api/bazardor/products")
        .then((res) => res.json())
        .then((data) => {
          const productList = Array.isArray(data) ? data : data.products || [];
          const found = productList.find((p: Product) => p.slug === slug);
          setProduct(found || null);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product details:", err);
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">
        পণ্যটি পাওয়া যায়নি।
      </div>
    );
  }

  // বাজারের ডেটা থেকে সর্বনিম্ন, সর্বাধিক ও গড় হিসাব করা
  const markets = product.markets || [];
  const minPrices = markets.map((m) => m.min);
  const maxPrices = markets.map((m) => m.max);

  const overallMin =
    minPrices.length > 0 ? Math.min(...minPrices) : product.today;
  const overallMax =
    maxPrices.length > 0 ? Math.max(...maxPrices) : product.today;

  const avgPrices = markets.map((m) => (m.min + m.max) / 2);
  const overallAvg =
    avgPrices.length > 0
      ? Math.round(avgPrices.reduce((a, b) => a + b, 0) / avgPrices.length)
      : product.today;

  // দাম পরিবর্তনের টেক্সট নির্ধারণ
  const diff = product.today - product.yesterday;
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ব্রেডক্রাম্ব (Breadcrumb Navigation) */}
        <nav className="text-sm text-gray-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-green-600 transition">
            হোম
          </Link>
          <span>›</span>
          <span className="text-gray-700">
            {product.categoryNameBn || product.category}
          </span>
          <span>›</span>
          <span className="text-gray-900 font-medium">{product.nameBn}</span>
        </nav>

        {/* টপ প্রোডাক্ট হেডার কার্ড (আরেকটি কার্ড যাতে ছবি/ইমোজি ও আজকের দাম আছে) */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="text-5xl sm:text-6xl bg-gray-50 border border-gray-100 p-4 rounded-2xl flex items-center justify-center shadow-inner">
              {product.image || product.categoryIcon || "📦"}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                প্রতি {product.unit} ·{" "}
                {product.categoryNameBn || product.category}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                গতকালের তুলনায় আজ দাম{" "}
                <span
                  className={
                    isUp
                      ? "text-red-600 font-semibold"
                      : isDown
                        ? "text-green-600 font-semibold"
                        : "text-gray-600 font-semibold"
                  }
                >
                  {diff > 0
                    ? `বেড়েছে ${diff} টাকা`
                    : diff < 0
                      ? `কমেছে ${Math.abs(diff)} টাকা`
                      : "অপরিবর্তিত রয়েছে"}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 text-center min-w-[140px] shadow-sm">
            <span className="text-[11px] text-gray-400 block mb-1">
              আজকের দাম
            </span>
            <span className="text-2xl sm:text-3xl font-black text-gray-900">
              ৳{product.today}
            </span>
            <span className="text-xs text-gray-500 block mt-0.5">
              টাকা / {product.unit}
            </span>
            <div
              className={`text-xs font-semibold mt-1.5 ${isUp ? "text-red-600" : isDown ? "text-green-600" : "text-gray-600"}`}
            >
              {isUp ? "▲" : isDown ? "▼" : ""}{" "}
              {Math.abs(product.change?.pct || 0)}%
            </div>
          </div>
        </div>

        {/* দামের সারসংক্ষেপ (Summary Cards) */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <span className="text-xs text-gray-400 block mb-1">
                সর্বনিম্ন দাম
              </span>
              <span className="text-2xl font-bold text-emerald-600">
                ৳{overallMin} টাকা
              </span>
              <span className="text-[11px] text-gray-500 block mt-1">
                সবচেয়ে কম দামের বাজার
              </span>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <span className="text-xs text-gray-400 block mb-1">
                সর্বাধিক দাম
              </span>
              <span className="text-2xl font-bold text-red-600">
                ৳{overallMax} টাকা
              </span>
              <span className="text-[11px] text-gray-500 block mt-1">
                সবচেয়ে বেশি দামের বাজার
              </span>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <span className="text-xs text-gray-400 block mb-1">গড় দাম</span>
              <span className="text-2xl font-bold text-emerald-600">
                ৳{overallAvg} টাকা
              </span>
              <span className="text-[11px] text-gray-500 block mt-1">
                প্রতি {product.unit}-এর হিসাবে
              </span>
            </div>
          </div>
        </div>

        {/* বাজারভিত্তিক আজকের দাম (Table Layout) */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs sm:text-sm">
                    <th className="py-3.5 px-6 text-right font-semibold">
                      বাজার
                    </th>
                    <th className="py-3.5 px-6 text-right font-semibold">
                      বিভাগ
                    </th>
                    <th className="py-3.5 px-6 text-right font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th className="py-3.5 px-6 text-right font-semibold">
                      সর্বাধিক
                    </th>
                    <th className="py-3.5 px-6 text-right font-semibold">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {markets.length > 0 ? (
                    markets.map((m, index) => {
                      const marketAvg = Math.round((m.min + m.max) / 2);
                      return (
                        <tr
                          key={index}
                          className="hover:bg-gray-50/80 transition"
                        >
                          <td className="py-3.5 px-6 font-medium text-gray-900">
                            {m.market}
                          </td>
                          <td className="py-3.5 px-6 text-gray-500">
                            {m.division}
                          </td>
                          <td className="py-3.5 px-6 font-semibold text-gray-800">
                            ৳{m.min} টাকা
                          </td>
                          <td className="py-3.5 px-6 font-semibold text-gray-800">
                            ৳{m.max} টাকা
                          </td>
                          <td className="py-3.5 px-6 font-bold text-emerald-600">
                            ৳{marketAvg} টাকা
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-6 text-center text-gray-400"
                      >
                        এই পণ্যের বাজারভিত্তিক ডেটা এই মুহূর্তে উপলব্ধ নেই।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
