import type { Metadata } from "next";
import { Bitter, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jbmono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const siteUrl = "https://menoughttopray.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Men Ought to Pray | A Men's Prayer Breakfast Meeting",
    template: "%s | Men Ought to Pray",
  },
  description:
    "A Breakfast Meeting for Every Man Who Needs Strength. Join us Saturday, September 19, 2026 at 9am for a men's prayer breakfast meeting of worship, the Word, and brotherhood.",
  openGraph: {
    title: "Men Ought to Pray | A Men's Prayer Breakfast Meeting",
    description:
      "You've been strong for everyone. But who is strengthening you? Join us for a morning of prayer, brotherhood, and renewed strength.",
    url: siteUrl,
    siteName: "Men Ought to Pray",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bitter.variable} ${inter.variable} ${jbmono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">{children}</body>
    </html>
  );
}
