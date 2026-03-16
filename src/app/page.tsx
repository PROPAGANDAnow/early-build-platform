import Navbar from "@/components/Navbar";
import BountiesPage from "@/components/BountiesPage";

export default function Home() {
  return (
    <div className="dot-bg min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="mx-auto max-w-5xl px-6 pt-12 pb-6 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          BOUNTIES
        </h1>
        <p className="mx-auto mt-4 max-w-lg font-[family-name:var(--font-mono)] text-sm uppercase leading-relaxed tracking-wide text-gray-500">
          BROWSE PAID OPPORTUNITIES FROM TOP TEAMS. APPLY TO JOIN EARLY.BUILD
          TO UNLOCK FULL SPECS AND START BUILDING.
        </p>
        <a
          href="https://early.build/apply"
          className="mt-6 inline-block border-2 border-black px-8 py-3 font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-wider transition hover:bg-black hover:text-white"
        >
          {">"} APPLY TO JOIN
        </a>
      </section>

      {/* Bounties List */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <BountiesPage />
      </section>

      {/* Footer */}
      <footer className="py-12 text-center">
        <div className="font-[family-name:var(--font-mono)] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {"<"}ear/y.bui/d{">"}
        </div>
      </footer>
    </div>
  );
}
