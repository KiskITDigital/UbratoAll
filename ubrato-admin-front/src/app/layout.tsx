import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import Provider from "@/components/layout/Provider";
import "./globals.css";
import { cn } from "@nextui-org/react";

const font = Mulish({ subsets: ["latin", "cyrillic", "cyrillic-ext"] });

export const metadata: Metadata = {
  title: "Ubrato Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={cn(font.className, "flex flex-col text-text")}>
      <body className="min-h-screen w-full">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
