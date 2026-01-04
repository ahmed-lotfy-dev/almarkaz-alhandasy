import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "المركز الهندسي | قطع غيار غسالات وفلاتر مياه",
  description: "متجر قطع غيار غسالات وفلاتر مياه مع حجز مواعيد للصيانة",
};

import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} antialiased bg-background text-foreground`}
      >
        <Navbar />
        {children}
        <Toaster dir="rtl" />
      </body>
    </html>
  );
}
