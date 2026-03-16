import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "early.build - Bounties",
  description:
    "Browse open bounties, claim tasks, and get paid. Apply to join early.build.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} antialiased`}
        style={{ fontFamily: "'Google Sans Code', monospace" }}
      >
        {children}
      </body>
    </html>
  );
}
