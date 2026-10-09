"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
    }
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session, isPending, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authClient.updateUser({
        name: name,
      });
      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      refetch(); // সেশন ডেটা রিফ্রেশ করা
    } catch (err: any) {
      toast.error(err?.message || "প্রোফাইল আপডেট করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">
        লোড হচ্ছে...
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          ইউজার প্রোফাইল
        </h1>

        <div className="flex items-center gap-4 mb-8 bg-green-50 p-4 rounded-xl border border-green-100">
          <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
            {session.user.name?.[0] || "👤"}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              {session.user.name}
            </h2>
            <p className="text-sm text-gray-500">{session.user.email}</p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              নাম পরিবর্তন করুন
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ইমেইল (পরিবর্তনযোগ্য নয়)
            </label>
            <input
              type="email"
              disabled
              value={session.user.email}
              className="w-full px-3 py-2 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200"
          >
            {loading ? "আপডেট হচ্ছে..." : "প্রোফাইল আপডেট করুন"}
          </button>
        </form>
      </div>
    </div>
  );
}
