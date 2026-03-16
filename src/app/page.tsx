import Navbar from "@/components/Navbar";
import BountiesPage from "@/components/BountiesPage";
import DashedContainer from "@/components/DashedContainer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Bounties Directory */}
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-16">
        <h2 className="mb-10 text-center font-[family-name:var(--font-heading)] text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          OPEN BOUNTIES
        </h2>
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
