import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ElxirWatches | L'Élégance à votre Poignet",
  description: "Découvrez notre collection exclusive de montres de luxe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${lato.variable}`}>
      <body className="antialiased bg-black-rich text-white-off font-sans">
        <Providers>
          <Navbar />
          <CartSidebar />
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
