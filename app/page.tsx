"use client";

import React, { useState, useEffect } from "react";
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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        // এপিআই যেহেতু সরাসরি অ্যারে দিচ্ছে, তাই সরাসরি ডাটা সেট হবে
        const productList = Array.isArray(data) ? data : data.products || [];
        setProducts(productList);

        // হোম পেজে ক্যাশ সেভ করে রাখতে পারেন যাতে ক্যাটাগরি পেজে ফাস্ট কাজ করে
        sessionStorage.setItem(
          "bazardor_all_products",
          JSON.stringify(productList),
        );

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const scrollToProducts = () => {
    const section = document.getElementById("all-products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const risers = products.filter((p) => p.change?.dir === "up").slice(0, 4);
  const fallers = products.filter((p) => p.change?.dir === "down").slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">
        হোম পেজের ডেটা লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
            বাজার মনিটরিং
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত এক জায়গায়।
          </p>
          <div>
            <button
              onClick={scrollToProducts}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-xl shadow transition"
            >
              সব পণ্য দেখুন 👇
            </button>
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 flex items-center justify-center w-full md:w-auto text-7xl">
          🧺
        </div>
      </section>

      {/* আজ দাম বেড়েছে */}
      {risers.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <span className="text-red-600">▲</span>
            <span>আজ দাম বেড়েছে</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* আজ দাম কমেছে */}
      {fallers.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <span className="text-green-600">▼</span>
            <span>আজ দাম কমেছে</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* সব পণ্য */}
      <section id="all-products" className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
          <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <Link
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
            <p className="text-xs text-gray-400">প্রতি {product.unit}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-between">
        <div>
          <span className="text-[11px] text-gray-400 block">আজকের দাম</span>
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
          {isUp ? "▲" : isDown ? "▼" : ""} {Math.abs(product.change?.pct || 0)}%
        </span>
      </div>
    </Link>
  );
}
