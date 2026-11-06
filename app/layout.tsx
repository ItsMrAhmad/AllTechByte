import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
  title: "All Tech Byte | Pakistan's Premier Robotics & Electronics Store",
  description:
    "All Tech Byte (alltechbyte.pk) is Pakistan's verified store for Arduino, Raspberry Pi 5, ESP32, sensors, motor drivers, spot welders & 500+ maker electronics. Same-day Lahore dispatch & instant WhatsApp ordering at 03298840694.",
  keywords: [
    "Arduino Pakistan",
    "Raspberry Pi 5 Pakistan",
    "ESP32 Lahore",
    "Robotics components Pakistan",
    "Electronic components Lahore",
    "All Tech Byte",
    "alltechbyte.pk",
    "Bund Road Lahore electronics",
    "Al Latif Center Gulberg",
    "Sensors Pakistan",
    "18650 Spot Welder",
    "Motor Drivers"
  ],
  authors: [{ name: "All Tech Byte", url: "https://alltechbyte.pk" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "192x192", type: "image/png" },
    ],
  },
  openGraph: {
    title: "All Tech Byte | Smart Tech, Honest Prices",
    description:
      "Buy Arduino, Raspberry Pi, ESP32, Sensors, and Maker Hardware with same-day Lahore dispatch. Order directly on WhatsApp without cart friction!",
    url: "https://alltechbyte.pk",
    siteName: "All Tech Byte",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "All Tech Byte Logo",
      },
    ],
    locale: "en_PK",
    type: "website",
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
