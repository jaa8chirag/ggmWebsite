import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Admin — GGM Technologies",
  robots: { index: false, follow: false },
};

// A separate root layout from the public site's — the admin panel doesn't
// need the marketing Nav/Footer/GSAP scroll setup. See Next.js docs on
// "Creating multiple root layouts" via route groups.
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-chalk font-body">
        {children}
      </body>
    </html>
  );
}
