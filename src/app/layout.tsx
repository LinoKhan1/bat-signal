// src/app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Providers from "../providers/providers"
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Panic Button App",
  description: "Fusebox technical assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
         <Providers>
          <main className="p-6">{children}</main>
         </Providers>
          
      </body>
    </html>
  );
}