import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { NotFoundContent } from "@/components/not-found-content";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Page not found | Grand River Labs",
  description: "That page isn't here. Head back to Grand River Labs.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <NotFoundContent />
      </body>
    </html>
  );
}
