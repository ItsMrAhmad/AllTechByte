import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B1E48",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://alltechbyte.pk"),
  title: {
    default: "All Tech Byte | Robotics & Electronics Store in Pakistan",
    template: "%s | All Tech Byte",
  },
  description:
    "Buy Arduino, Raspberry Pi 5, ESP32, sensors & maker electronics in Pakistan. Same-day Lahore dispatch, cash on delivery & instant WhatsApp ordering.",
  keywords: [
    "Arduino Pakistan",
    "Raspberry Pi 5 Pakistan",
    "ESP32 Lahore",
    "Robotics components Pakistan",
    "Electronic components Lahore",
    "All Tech Byte",
    "alltechbyte.pk",
    "Bund Road Lahore electronics",
    "Sensors Pakistan",
    "18650 Spot Welder",
    "Motor Drivers",
    "Electronics Shop Lahore"
  ],
  authors: [{ name: "All Tech Byte", url: "https://alltechbyte.pk" }],
  alternates: {
    canonical: "https://alltechbyte.pk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "192x192", type: "image/png" },
    ],
  },
  openGraph: {
    title: "All Tech Byte | Robotics & Electronics Store in Pakistan",
    description:
      "Buy Arduino, Raspberry Pi 5, ESP32, sensors & maker electronics in Pakistan. Same-day Lahore dispatch & instant WhatsApp ordering.",
    url: "https://alltechbyte.pk",
    siteName: "All Tech Byte",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "All Tech Byte Pakistan Logo",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Tech Byte | Robotics & Electronics Store in Pakistan",
    description:
      "Buy Arduino, Raspberry Pi 5, ESP32 & electronics components with same-day Lahore delivery.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <StructuredData />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#fafbfc] text-[#1e293b] antialiased">
        {children}
      </body>
    </html>
  );
}
