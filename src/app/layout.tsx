import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getSiteUrl } from "@/lib/metadata";
import "./globals.css";

const rubik = localFont({
  src: "./fonts/rubik-latin.woff2",
  variable: "--font-rubik",
  display: "swap",
  weight: "400 700",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Academic Excellence Tutors | Online Tutoring",
    template: "%s | Academic Excellence Tutors",
  },
  description:
    "Structured online tutoring for Grades 8–12 under CAPS and IEB. Weekly live lessons, dedicated tutors and connected parent support.",
  applicationName: "Academic Excellence Tutors",
  icons: { icon: "/brand/aet-logo.jpg", apple: "/brand/aet-logo.jpg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA">
      <body className={rubik.variable}>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-50 -translate-y-28 rounded-lg border border-ink bg-brand-yellow px-5 py-3 font-medium focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
