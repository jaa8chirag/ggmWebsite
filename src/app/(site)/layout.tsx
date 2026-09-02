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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "google37f47672baefed8c",
    other: {
      "google-site-verification": [
        "google37f47672baefed8c",
        "google37f47672baefed8c.html",
      ],
    },
  },
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
      <head>
        {/* Google Tag Manager */}
        <script
          id="google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K9GKNZG9');`,
          }}
        />
        {/* End Google Tag Manager */}
        <meta name="google-site-verification" content="google37f47672baefed8c" />
        <meta name="google-site-verification" content="google37f47672baefed8c.html" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "y9x769v08r");
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-chalk font-body">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K9GKNZG9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
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
