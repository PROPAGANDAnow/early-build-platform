"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="px-6 py-4">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-[var(--font-mono)] text-lg font-bold tracking-tight">
            {"<"}
            <span className="font-bold">early</span>
            {"/>"}
          </span>
        </Link>

        {/* Spots Badge */}
        <div className="flex items-center gap-2 rounded-full bg-[#22c55e] px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          <span className="font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-wider text-white">
            50 Spots Left
          </span>
        </div>
      </div>
    </nav>
  );
}
