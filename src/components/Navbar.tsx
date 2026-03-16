"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="px-6 py-4">
      <div className="mx-auto flex max-w-4xl items-center">
        {/* Logo */}
        <a href="https://early.build" className="flex items-center">
          <Image
            src="/early-logo.png"
            alt="early"
            width={120}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </a>
      </div>
    </nav>
  );
}
