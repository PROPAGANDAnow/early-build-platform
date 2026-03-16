import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBountyById, SAMPLE_BOUNTIES } from "@/lib/bounties";
import DashedContainer from "@/components/DashedContainer";

export function generateStaticParams() {
  return SAMPLE_BOUNTIES.map((b) => ({ id: b.id }));
}

export default async function BountyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bounty = getBountyById(id);

  if (!bounty) {
    notFound();
  }

  const difficultyColor =
    bounty.difficulty === "beginner"
      ? "bg-green-100 text-green-800"
      : bounty.difficulty === "intermediate"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800";

  return (
    <div className="dot-bg min-h-screen">
      {/* Nav */}
      <nav className="px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <a href="https://early.build" className="flex items-center">
            <Image
              src="/early-logo.png"
              alt="early"
              width={120}
              height={40}
              className="h-12 w-auto"
              priority
            />
          </a>
          <Link
            href="/"
            className="border border-black px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition hover:bg-black hover:text-white"
          >
            {"<"} BACK TO BOUNTIES
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 rounded bg-white p-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              {bounty.sponsor.name}
            </span>
            <span className="text-xs uppercase text-gray-400">•</span>
            <span className={`flex items-center gap-1.5 text-xs font-bold uppercase ${bounty.status === "open" ? "text-green-600" : bounty.status === "in_progress" ? "text-yellow-600" : "text-red-600"}`}>
              <span className={`inline-block h-2 w-2 rounded-full ${bounty.status === "open" ? "bg-green-500" : bounty.status === "in_progress" ? "bg-yellow-500" : "bg-red-500"}`} />
              {bounty.status === "open" ? "OPEN" : bounty.status === "in_progress" ? "CLOSING SOON" : "CLOSED"}
            </span>
            <span className={`px-2 py-0.5 text-xs uppercase ${difficultyColor}`}>
              {bounty.difficulty}
            </span>
          </div>

          <h1 className="mb-4 font-[family-name:var(--font-heading)] text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            {bounty.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-[#ffe600] px-3 py-1 text-lg font-bold">
              {bounty.reward}
            </span>
            <span className="text-xs text-gray-400">
              {bounty.applicants} APPLIED
            </span>
            {bounty.deadline && (
              <span className="text-xs text-gray-400">
                DEADLINE:{" "}
                {new Date(bounty.deadline).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).toUpperCase()}
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {bounty.tags.map((tag) => (
              <span
                key={tag}
                className="border border-gray-200 px-2 py-0.5 text-xs uppercase text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded bg-white p-6">
              <h2 className="mb-4 text-sm font-bold uppercase">
                ABOUT THIS BOUNTY
              </h2>
              <p className="text-sm leading-relaxed text-gray-600">
                {bounty.fullDescription}
              </p>
            </div>

            <div className="rounded bg-white p-6">
              <h2 className="mb-4 text-sm font-bold uppercase">
                REQUIREMENTS
              </h2>
              <ul className="space-y-2">
                {bounty.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5 text-black">→</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded bg-white p-6">
              <h2 className="mb-4 text-sm font-bold uppercase">
                DELIVERABLES
              </h2>
              <ul className="space-y-2">
                {bounty.deliverables.map((del, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-black text-xs text-white">
                      {i + 1}
                    </span>
                    {del}
                  </li>
                ))}
              </ul>
            </div>

            {/* Gated submission — just a CTA to apply */}
            <div className="relative rounded border-2 border-dashed border-gray-300 bg-white p-8 text-center">
              <div className="pointer-events-none mb-6 select-none opacity-20 blur-sm">
                <div className="mb-3 text-sm font-bold uppercase">SUBMIT YOUR WORK</div>
                <div className="mb-2 h-10 w-full border border-gray-200 bg-gray-50" />
                <div className="mb-2 h-24 w-full border border-gray-200 bg-gray-50" />
                <div className="mb-2 h-10 w-full border border-gray-200 bg-gray-50" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 p-6">
                <div className="mb-2 text-2xl">🔒</div>
                <h3 className="mb-2 text-sm font-bold uppercase">SUBMISSION LOCKED</h3>
                <p className="mb-4 max-w-sm text-xs uppercase text-gray-500">
                  APPLY TO JOIN EARLY.BUILD TO UNLOCK THE SUBMISSION FORM AND START BUILDING
                </p>
                <a
                  href="https://early.build/apply"
                  className="bg-[#ffe600] px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition hover:bg-[#e6cf00]"
                >
                  {">"} APPLY TO UNLOCK
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply CTA */}
            <div className="rounded border-2 border-black bg-white p-6 text-center">
              <h3 className="mb-2 text-sm font-bold uppercase">INTERESTED?</h3>
              <p className="mb-4 text-xs uppercase text-gray-500">
                APPLY TO CLAIM THIS BOUNTY
              </p>
              <a
                href="https://early.build/apply"
                className="block w-full bg-[#ffe600] px-6 py-3 text-xs font-bold uppercase tracking-wider transition hover:bg-[#e6cf00]"
              >
                {">"} APPLY NOW
              </a>
            </div>

            {/* Details */}
            <div className="rounded border border-gray-200 bg-white p-5">
              <h3 className="mb-4 text-xs font-bold uppercase">DETAILS</h3>
              <div className="space-y-3">
                <div className="flex justify-between gap-4">
                  <span className="shrink-0 text-xs uppercase text-gray-400">REWARD</span>
                  <span className="text-xs font-bold text-right">{bounty.reward}</span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between gap-4">
                  <span className="shrink-0 text-xs uppercase text-gray-400">DIFFICULTY</span>
                  <span className="text-xs font-bold uppercase text-right">{bounty.difficulty}</span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between gap-4">
                  <span className="shrink-0 text-xs uppercase text-gray-400">TIMELINE</span>
                  <span className="text-xs font-bold uppercase text-right">{bounty.timeline}</span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between gap-4">
                  <span className="shrink-0 text-xs uppercase text-gray-400">APPLICANTS</span>
                  <span className="text-xs font-bold text-right">{bounty.applicants}</span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between gap-4">
                  <span className="shrink-0 text-xs uppercase text-gray-400">POSTED</span>
                  <span className="text-xs font-bold text-right">
                    {new Date(bounty.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()}
                  </span>
                </div>
                {bounty.deadline && (
                  <>
                    <div className="h-px bg-gray-100" />
                    <div className="flex justify-between gap-4">
                      <span className="shrink-0 text-xs uppercase text-gray-400">DEADLINE</span>
                      <span className="text-xs font-bold text-right">
                        {new Date(bounty.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sponsor */}
            <div className="rounded border border-gray-200 bg-white p-5">
              <h3 className="mb-3 text-xs font-bold uppercase">POSTED BY</h3>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-gray-100 text-sm font-bold">
                  {bounty.sponsor.name.charAt(0)}
                </div>
                <span className="text-sm font-bold uppercase">{bounty.sponsor.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-12 text-center">
        <div className="text-3xl font-bold tracking-tight sm:text-4xl">
          {"<"}ear/y.bui/d{">"}
        </div>
      </footer>
    </div>
  );
}
