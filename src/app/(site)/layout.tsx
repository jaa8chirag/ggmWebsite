import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Nav from "@/components/layout/Nav";
import FloatingSocials from "@/components/layout/FloatingSocials";
import CookieConsent from "@/components/legal/CookieConsent";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/schema";
import { getSettings } from "@/lib/queries";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display-raw",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-body-raw",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono-raw",
  subsets: ["latin"],
});

const title = "Digital Marketing Agency in Delhi | GGM Technologies";
const description =
  "GGM Technologies is a New Delhi digital growth partner running SEO, PPC, website development, lead generation, social media marketing, and Shopify & WordPress builds — measured in rankings and revenue.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s",
  },
  description,
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "GGM Technologies",
    title,
    description,
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();
  const company = {
    name: settings.name,
    email: settings.email,
    phone: settings.phone,
    addressLine1: settings.addressLine1,
    addressLine2: settings.addressLine2,
  };

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-chalk font-body">
        <JsonLd data={organizationSchema(company)} />
        <JsonLd data={websiteSchema(company)} />
        <JsonLd data={localBusinessSchema(company)} />
        <SmoothScroll>
          <Nav />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <FloatingSocials phoneHref={settings.phoneHref} whatsapp={settings.whatsapp} />
          <CookieConsent />
        </SmoothScroll>
      </body>
    </html>
  );
}
