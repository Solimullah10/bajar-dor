import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-6xl font-bold text-green-600 mb-4">৪০৪</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        আপনি যে পেজটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে অথবা লিংকটি ভুল রয়েছে।
      </p>
      <Link
        href="/"
        className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl transition shadow-md"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
