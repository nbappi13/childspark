import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers";
import { Toaster } from "sonner";
import SmartAI from "@/components/SmartAI/SmartAI";
import Footer from "@/components/Footer";

//  SEO metadata for all pages
export const metadata: Metadata = {
  title: "SmartParentsHC - Parenting Made Smarter",
  description:
    "SmartParentsHC offers expert parenting courses and a SmartAI assistant to guide families. Join today!",
  openGraph: {
    title: "SmartParentsHC - Parenting Made Smarter",
    description:
      "Expert parenting courses, AI assistant, and resources for parents and families.",
    url: "https://smartparentshc.vercel.app",
    siteName: "SmartParentsHC",
    images: [
      {
        url: "https://smartparentshc.vercel.app/og-image.png", 
        width: 1200,
        height: 630,
        alt: "SmartParentsHC",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartParentsHC - Parenting Made Smarter",
    description: "Expert parenting courses and SmartAI for families.",
    images: ["https://smartparentshc.vercel.app/og-image.png"],
  },
};

// root Layout Component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster richColors position="top-center" />
        <Providers>
          <Navbar />
          {children}
          <SmartAI />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
