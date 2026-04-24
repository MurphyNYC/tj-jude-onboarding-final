import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TJ Jude — Agent Onboarding",
  description: "Premium onboarding experience for TJ Jude. Your new assistant. No downloads. No setup.",
  openGraph: {
    title: "TJ Jude — Agent Onboarding",
    description: "Premium onboarding experience for TJ Jude.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
