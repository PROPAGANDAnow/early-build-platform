"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="px-6 py-4">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
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

        {/* Spots Badge */}
        <div className="flex items-center gap-2 rounded-full bg-[#22c55e] px-3 py-1">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          <span className="font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-wider text-white">
            50 Spots Left
          </span>
        </div>
      </div>
    </nav>
  );
}
