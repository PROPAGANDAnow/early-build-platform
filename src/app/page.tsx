import Navbar from "@/components/Navbar";
import BountiesPage from "@/components/BountiesPage";
import DashedContainer from "@/components/DashedContainer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header */}
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-8">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          OPEN BOUNTIES
        </h1>
        <p className="mt-3 max-w-lg font-[family-name:var(--font-mono)] text-[11px] uppercase leading-relaxed tracking-wide text-gray-500">
          BROWSE PAID OPPORTUNITIES FROM TOP TEAMS. APPLY TO JOIN EARLY.BUILD
          TO UNLOCK FULL SPECS AND START BUILDING.
        </p>
        <a
          href="/apply"
          className="mt-5 inline-block border-2 border-black px-6 py-2.5 font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-wider transition hover:bg-black hover:text-white"
        >
          {">"} APPLY TO JOIN
        </a>
      </section>

      {/* Bounties List */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <DashedContainer>
          <BountiesPage />
        </DashedContainer>
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
