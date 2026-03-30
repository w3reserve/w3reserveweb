import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import GlobalSidebar from "@/components/GlobalSidebar";
import ShoppingCart from "@/components/ShoppingCart";
import { CartProvider } from "@/components/CartContext";
import Footer from "@/components/Footer";
import AgeModal from "@/components/AgeModal";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "W3 Reserve Experience",
  description: "Scroll-linked canvas animation of the W3 Reserve bottle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <AgeModal />
          <GlobalSidebar />
          <ShoppingCart />
          <div style={{ marginLeft: '80px', width: 'calc(100% - 80px)' }}>
            <SmoothScroll>
              {children}
              <Footer />
            </SmoothScroll>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
