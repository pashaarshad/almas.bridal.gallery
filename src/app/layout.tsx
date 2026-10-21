import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://almasbridalgallery.com"),
  title: "ALMAS BRIDAL GALLERY | Luxury Bridal Couture Dubai",
  description: "A Story of You. Timeless handcrafted luxury bridal lehengas, groom sherwanis, and reception couture for life's most unforgettable moments.",
  icons: {
    icon: "/logos/icon-02.png",
  },
  openGraph: {
    title: "ALMAS BRIDAL GALLERY | Luxury Bridal Couture",
    description: "Timeless designs for life's most beautiful moments.",
    url: "https://almasbridalgallery.com",
    siteName: "ALMAS Bridal Gallery",
    images: [
      {
        url: "/images/hero-bride.jpg",
        width: 1200,
        height: 630,
        alt: "ALMAS Bridal Gallery Luxury Couture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#FAF8F5] text-[#222222]">
        {children}
      </body>
    </html>
  );
}
