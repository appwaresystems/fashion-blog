import { Cormorant_Garamond, Manrope } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSearchIndex } from "@/lib/articles";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "The Style Edit | Year-Round Outfit Ideas for Women",
    template: "%s | The Style Edit",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name, url: absoluteUrl(siteConfig.author.url) }],
  creator: siteConfig.author.name,
  publisher: siteConfig.publisher,
  category: "Fashion",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Style Edit | Year-Round Outfit Ideas for Women",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: "/images/articles/chic-trench-dress.jpg",
        width: 1200,
        height: 1800,
        alt: "Woman in a trench coat and dress walking on a city street",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Style Edit | Year-Round Outfit Ideas for Women",
    description: siteConfig.description,
    images: ["/images/articles/chic-trench-dress.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  ...(siteConfig.pinterest.verificationCode
    ? {
        other: {
          "p:domain_verify": siteConfig.pinterest.verificationCode,
        },
      }
    : {}),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f1e6",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  const searchIndex = getSearchIndex();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/images/logo-mark.svg"),
    description: siteConfig.description,
  };

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-espresso px-5 py-3 font-sans text-xs uppercase tracking-editorial text-ivory transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader searchIndex={searchIndex} />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
