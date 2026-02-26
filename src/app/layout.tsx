import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aniket Rai — Cybersecurity Engineer & Full-Stack Developer",
  description: "Security engineer building secure-by-design systems with expertise in VAPT, DevSecOps, and full-stack development.",
  keywords: ["Cybersecurity", "DevSecOps", "VAPT", "Full-Stack Developer", "React", "Python", "Aniket Rai"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#0f1419] text-gray-200 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
