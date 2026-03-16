"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--accent)] text-black font-bold text-sm">
            e.
          </div>
          <span className="text-lg font-semibold tracking-tight">
            early<span className="text-[var(--muted)]">.build</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm text-[var(--muted)] transition hover:text-white"
          >
            Bounties
          </Link>
          <Link
            href="/leaderboard"
            className="text-sm text-[var(--muted)] transition hover:text-white"
          >
            Leaderboard
          </Link>
          <Link
            href="/about"
            className="text-sm text-[var(--muted)] transition hover:text-white"
          >
            About
          </Link>
          <a
            href="https://early.build"
            target="_blank"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-200"
          >
            Join early.build
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--card-border)] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-sm text-[var(--muted)]">
              Bounties
            </Link>
            <Link href="/leaderboard" className="text-sm text-[var(--muted)]">
              Leaderboard
            </Link>
            <Link href="/about" className="text-sm text-[var(--muted)]">
              About
            </Link>
            <a
              href="https://early.build"
              target="_blank"
              className="rounded-lg bg-white px-4 py-2 text-center text-sm font-medium text-black"
            >
              Join early.build
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
