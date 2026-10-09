"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PriceTicker() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.products || [];
        setProducts(list);
      })
      .catch((err) => console.error("Ticker fetch error:", err));
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="bg-emerald-50 border-y border-emerald-100 py-2.5 overflow-hidden flex items-center shadow-inner">
      <div className="bg-green-600 text-white text-xs font-bold px-4 py-1 rounded-r-lg z-10 shrink-0 ml-0 shadow-sm flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
        লাইভ দর:
      </div>

      {/* মারকিউ ইফেক্ট */}

      <div className="flex whitespace-nowrap animate-marquee items-center space-x-8 text-xs text-gray-700">
        {products.concat(products).map((item, index) => {
          const isUp = item.change?.dir === "up";
          return (
            <Link
              key={index}
              href={`/product/${item.slug}`}
              className="flex items-center gap-2 hover:text-green-700 transition bg-white/60 px-3 py-1 rounded-full border border-emerald-100"
            >
              <span>{item.image || item.categoryIcon || "📦"}</span>
              <span className="font-semibold text-gray-800">{item.nameBn}</span>
              <span className="font-bold text-gray-900">৳{item.today}</span>
              <span
                className={`font-semibold ${isUp ? "text-red-600" : "text-green-600"}`}
              >
                {isUp ? "▲" : "▼"} {Math.abs(item.change?.pct || 0)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
