import type { Metadata } from "next";
// Global styles first, so per-component stylesheets load after (and can build on) them.
import "../globals.css";
import { Fraunces, Outfit } from "next/font/google";
import Script from "next/script";
import { ChatLauncher } from "@/components/chat-launcher";
import { getSiteUrl } from "@/lib/site";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Grand River Labs | Fractional Marketing Director",
  description:
    "A fractional marketing director for lead-driven businesses. GR Labs owns the plan: patching lead leaks, verifying which spend is working, deciding where the budget goes, and managing your vendors.",
  openGraph: {
    siteName: "Grand River Labs",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NBVHT2RL');`}
        </Script>
      </head>
      <body className="min-h-full">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NBVHT2RL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <ChatLauncher />
      </body>
    </html>
  );
}
