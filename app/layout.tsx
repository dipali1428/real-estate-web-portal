import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootClientWrapper from './RootClientWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Works now because this is still a Server Component
export const metadata: Metadata = {
  title: "Infinity Arthvishva Advisory",
  description: "Financial Solutions Platform for Investment, Finance, and Protection",
  keywords: ["investment", "finance", "insurance", "arthvishva", "infinity", "wealth"],
  authors: [{ name: "Infinity Arthvishva" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RootClientWrapper>{children}</RootClientWrapper>
      </body>
    </html>
  );
}
