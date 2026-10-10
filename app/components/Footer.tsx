"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-white border-t border-gray-200 mt-16 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* ব্র্যান্ড ইনফো */}
          <Link href="/">
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center space-x-2">
                <span className="text-2xl  bg-green-500 p-2 rounded-2xl">
                  🛒
                </span>
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                  বাজার দর
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                প্রতিদিনের কাঁচাবাজার, চাল, ডাল, তেল, মাছ, মাংস ও
                নিত্যপ্রয়োজনীয় পণ্যের হালনাগাদ সঠিক মূল্য তালিকা।
              </p>
            </div>
          </Link>
          {/* দ্রুত লিংক */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              দ্রুত লিংক
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-green-600 transition">
                  হোম পেজ
                </Link>
              </li>
              <li>
                <Link
                  href="/category/chal"
                  className="hover:text-green-600 transition"
                >
                  চাল ও ডাল
                </Link>
              </li>
              <li>
                <Link
                  href="/category/sobji"
                  className="hover:text-green-600 transition"
                >
                  কাঁচা সবজি
                </Link>
              </li>
              <li>
                <Link
                  href="/category/mach"
                  className="hover:text-green-600 transition"
                >
                  মাছ ও মাংস
                </Link>
              </li>
            </ul>
          </div>

          {/* ক্যাটাগরি */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              মূল ক্যাটাগরি
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/category/tel"
                  className="hover:text-green-600 transition"
                >
                  তেল ও মসলা
                </Link>
              </li>
              <li>
                <Link
                  href="/category/dim-dui"
                  className="hover:text-green-600 transition"
                >
                  ডিম ও দুধ
                </Link>
              </li>
              <li>
                <Link
                  href="/category/mangsho"
                  className="hover:text-green-600 transition"
                >
                  মাংসের বাজার
                </Link>
              </li>
            </ul>
          </div>

          {/* তথ্য ও আপডেট */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              তথ্যসূত্র
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              বিভিন্ন বাজার ও নির্ভরযোগ্য সোর্স থেকে সংগৃহীত লাইভ মার্কেট ডেটার
              ওপর ভিত্তি করে মূল্য তালিকা আপডেট করা হয়।
            </p>
          </div>
        </div>

        {/* কপিরাইট ও বটম বার */}
        <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {currentYear} বাজার দর (Bajar Dor)। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex space-x-6">
            <span className="hover:text-gray-600 transition cursor-pointer">
              প্রাইভেসি পলিসি
            </span>
            <span className="hover:text-gray-600 transition cursor-pointer">
              শর্তাবলী
            </span>
            <span className="hover:text-gray-600 transition cursor-pointer">
              যোগাযোগ
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
