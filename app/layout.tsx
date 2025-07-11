// app/layout.tsx

import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers"; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers> {/* wrap only inside client provider */}
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
