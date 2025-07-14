// app/layout.tsx

import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers";
import { Toaster } from "sonner"; 
import SmartAI from '@/components/SmartAI/SmartAI';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster richColors position="top-center" /> 
        <Providers>
          <Navbar />
          {children}
          <SmartAI /> 
        </Providers>
      </body>
    </html>
  );
}
