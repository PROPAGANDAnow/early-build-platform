import Navbar from "@/components/Navbar";
import BountiesPage from "@/components/BountiesPage";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-xs text-[var(--accent)]">
            New bounties added weekly
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Build Real Apps.
          <br />
          <span className="text-[var(--accent)]">Get Paid.</span>
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-base text-[var(--muted)] sm:text-lg">
          Browse open bounties from top companies, claim tasks that match your
          skills, and ship real products with founders &amp; protocols.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button className="rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[var(--accent-dim)]">
            Browse Bounties
          </button>
          <button className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-6 py-3 text-sm font-medium text-white transition hover:border-white/20">
            Post a Bounty
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 flex items-center justify-center gap-12 text-center">
          <div>
            <div className="text-2xl font-bold">$50K+</div>
            <div className="text-xs text-[var(--muted)]">Paid Out</div>
          </div>
          <div className="h-8 w-px bg-[var(--card-border)]" />
          <div>
            <div className="text-2xl font-bold">120+</div>
            <div className="text-xs text-[var(--muted)]">Builders</div>
          </div>
          <div className="h-8 w-px bg-[var(--card-border)]" />
          <div>
            <div className="text-2xl font-bold">45</div>
            <div className="text-xs text-[var(--muted)]">Bounties Shipped</div>
          </div>
        </div>
      </section>

      {/* Bounties Section */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <BountiesPage />
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--card-border)] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[var(--accent)] text-xs font-bold text-black">
              e.
            </div>
            <span className="text-sm text-[var(--muted)]">
              early.build © 2026
            </span>
          </div>
          <div className="flex gap-6">
            <a
              href="https://twitter.com/eabordev"
              target="_blank"
              className="text-sm text-[var(--muted)] hover:text-white transition"
            >
              Twitter
            </a>
            <a
              href="https://github.com/PROPAGANDAnow"
              target="_blank"
              className="text-sm text-[var(--muted)] hover:text-white transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
