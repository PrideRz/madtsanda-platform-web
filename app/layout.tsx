import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { IS_STAGING, SCHOOL_DESCRIPTION, SCHOOL_KEYWORDS, SITE_URL } from "@/lib/seo";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MTsN 2 Kota Kediri | Madtsanda Platform",
    template: "%s | MTsN 2 Kota Kediri",
  },
  description: SCHOOL_DESCRIPTION,
  keywords: SCHOOL_KEYWORDS,
  applicationName: "Madtsanda Platform",
  authors: [{ name: "MTsN 2 Kota Kediri" }],
  creator: "MTsN 2 Kota Kediri",
  publisher: "MTsN 2 Kota Kediri",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MTsN 2 Kota Kediri | Madtsanda Platform",
    description: SCHOOL_DESCRIPTION,
    url: SITE_URL,
    siteName: "MTsN 2 Kota Kediri",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/icons/icon.png",
        width: 1200,
        height: 630,
        alt: "MTsN 2 Kota Kediri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MTsN 2 Kota Kediri | Madtsanda Platform",
    description: SCHOOL_DESCRIPTION,
    images: ["/icons/icon.png"],
  },
  robots: IS_STAGING
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : {
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        outfit.variable,
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Toaster position="top-center" />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
