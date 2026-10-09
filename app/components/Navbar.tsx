"use client";

import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  };

  const categories = [
    { name: "চাল", slug: "chal", icon: "🍚" },
    { name: "ডাল", slug: "dal", icon: "🫘" },
    { name: "তেল", slug: "tel", icon: "🛢️" },
    { name: "সবজি", slug: "sobji", icon: "🥬" },
    { name: "মাছ", slug: "mach", icon: "🐟" },
    { name: "মাংস", slug: "mangsho", icon: "🍗" },
    { name: "ডিম-দুধ", slug: "dim-dui", icon: "🥛" },
    { name: "মসলা", slug: "mosla", icon: "🌶️" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* লোগো */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <span className="text-xl font-bold text-gray-900">বাজার দর</span>
        </Link>

        {/* ক্যাটাগরি লিংকগুলো (আইকনসহ স্ক্রিনশটের মতো) */}
        <div className="hidden lg:flex items-center space-x-5 text-sm font-medium text-gray-700">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex items-center gap-1.5 hover:text-green-600 transition px-2 py-1 rounded-lg hover:bg-gray-50"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>

        {/* ইউজার অথেনটিকেশন সেশন */}
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="text-sm font-semibold text-gray-700 hover:text-green-600"
              >
                👤 {session.user.name}
              </Link>
              <button
                onClick={handleSignOut}
                className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-medium px-3 py-1.5 rounded-lg transition"
              >
                লগআউট
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="text-sm font-medium text-gray-700 hover:text-green-600 px-3 py-1.5"
              >
                লগইন
              </Link>
              <Link
                href="/signup"
                className="text-sm bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-1.5 rounded-lg transition shadow-xs"
              >
                রেজিস্ট্রেশন
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
