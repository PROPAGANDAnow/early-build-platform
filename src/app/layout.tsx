import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "early.build - Public Bounties",
  description:
    "Build Real Apps with Founders & New Tech. Browse open bounties, claim tasks, and get paid.",
  openGraph: {
    title: "early.build - Public Bounties",
    description:
      "Build Real Apps with Founders & New Tech. Browse open bounties, claim tasks, and get paid.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
