import Navbar from "@/app/components/Navbar";
import PriceTicker from "@/app/components/PriceTicker";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body>
        <Toaster position="top-right" />
        <Navbar />
        <PriceTicker />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
