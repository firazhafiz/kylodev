import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/section/Navbar";
import { Footer } from "@/components/section/Footer";

export const metadata: Metadata = {
  title: "KyloDev - Develope Your Digital Platform",
  description: "Website and App Development Agency",
  icons: {
    icon: "/assets/kylo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-neuehaas antialiased">{children}</body>
    </html>
  );
}
