import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBountyById, SAMPLE_BOUNTIES } from "@/lib/bounties";
import DashedContainer from "@/components/DashedContainer";
import SubmissionGate from "@/components/SubmissionGate";

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
              className="h-8 w-auto"
              priority
            />
          </a>
          <Link
            href="/"
            className="border border-black px-4 py-1.5 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider transition hover:bg-black hover:text-white"
          >
            {"<"} BACK TO BOUNTIES
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-gray-400">
              {bounty.sponsor.name}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase text-gray-400">
              •
            </span>
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase text-gray-400">
              {bounty.status === "open"
                ? "● OPEN"
                : bounty.status === "in_progress"
                  ? "◐ IN PROGRESS"
                  : "✓ COMPLETED"}
            </span>
            <span
              className={`px-2 py-0.5 font-[family-name:var(--font-mono)] text-xs uppercase ${difficultyColor}`}
            >
              {bounty.difficulty}
            </span>
          </div>

          <h1 className="mb-4 font-[family-name:var(--font-heading)] text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            {bounty.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-[#ffe600] px-3 py-1 font-[family-name:var(--font-mono)] text-lg font-bold">
              {bounty.reward}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-xs text-gray-400">
              {bounty.applicants} APPLIED
            </span>
            {bounty.deadline && (
              <span className="font-[family-name:var(--font-mono)] text-xs text-gray-400">
                DEADLINE:{" "}
                {new Date(bounty.deadline).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).toUpperCase()}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {bounty.tags.map((tag) => (
              <span
                key={tag}
                className="border border-gray-200 px-2 py-0.5 font-[family-name:var(--font-mono)] text-xs uppercase text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <DashedContainer className="mb-8">
              <h2 className="mb-4 font-[family-name:var(--font-mono)] text-sm font-bold uppercase">
                ABOUT THIS BOUNTY
              </h2>
              <p className="font-[family-name:var(--font-mono)] text-xs leading-relaxed text-gray-600">
                {bounty.fullDescription}
              </p>
            </DashedContainer>

            {/* Requirements */}
            <DashedContainer className="mb-8">
              <h2 className="mb-4 font-[family-name:var(--font-mono)] text-sm font-bold uppercase">
                REQUIREMENTS
              </h2>
              <ul className="space-y-2">
                {bounty.requirements.map((req, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 font-[family-name:var(--font-mono)] text-xs text-gray-600"
                  >
                    <span className="mt-0.5 text-black">→</span>
                    {req}
                  </li>
                ))}
              </ul>
            </DashedContainer>

            {/* Deliverables */}
            <DashedContainer className="mb-8">
              <h2 className="mb-4 font-[family-name:var(--font-mono)] text-sm font-bold uppercase">
                DELIVERABLES
              </h2>
              <ul className="space-y-2">
                {bounty.deliverables.map((del, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 font-[family-name:var(--font-mono)] text-xs text-gray-600"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-black font-[family-name:var(--font-mono)] text-xs text-white">
                      {i + 1}
                    </span>
                    {del}
                  </li>
                ))}
              </ul>
            </DashedContainer>

            {/* Submission (gated) */}
            <SubmissionGate bountyTitle={bounty.title} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply CTA */}
            <div className="border-2 border-black p-6 text-center">
              <h3 className="mb-2 font-[family-name:var(--font-mono)] text-sm font-bold uppercase">
                INTERESTED?
              </h3>
              <p className="mb-4 font-[family-name:var(--font-mono)] text-xs uppercase text-gray-500">
                APPLY TO CLAIM THIS BOUNTY
              </p>
              <button className="w-full bg-[#ffe600] px-6 py-3 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider transition hover:bg-[#e6cf00]">
                {">"} APPLY NOW
              </button>
            </div>

            {/* Details */}
            <div className="border border-gray-200 p-5">
              <h3 className="mb-4 font-[family-name:var(--font-mono)] text-xs font-bold uppercase">
                DETAILS
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-xs uppercase text-gray-400">
                    REWARD
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-xs font-bold">
                    {bounty.reward}
                  </span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-xs uppercase text-gray-400">
                    DIFFICULTY
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-xs font-bold uppercase">
                    {bounty.difficulty}
                  </span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-xs uppercase text-gray-400">
                    TIMELINE
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-xs font-bold uppercase">
                    {bounty.timeline}
                  </span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-xs uppercase text-gray-400">
                    APPLICANTS
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-xs font-bold">
                    {bounty.applicants}
                  </span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-xs uppercase text-gray-400">
                    POSTED
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-xs font-bold">
                    {new Date(bounty.createdAt)
                      .toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                      .toUpperCase()}
                  </span>
                </div>
                {bounty.deadline && (
                  <>
                    <div className="h-px bg-gray-100" />
                    <div className="flex justify-between">
                      <span className="font-[family-name:var(--font-mono)] text-xs uppercase text-gray-400">
                        DEADLINE
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-xs font-bold">
                        {new Date(bounty.deadline)
                          .toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                          .toUpperCase()}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sponsor */}
            <div className="border border-gray-200 p-5">
              <h3 className="mb-3 font-[family-name:var(--font-mono)] text-xs font-bold uppercase">
                POSTED BY
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-gray-100 font-[family-name:var(--font-mono)] text-sm font-bold">
                  {bounty.sponsor.name.charAt(0)}
                </div>
                <span className="font-[family-name:var(--font-mono)] text-sm font-bold uppercase">
                  {bounty.sponsor.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 text-center">
        <div className="font-[family-name:var(--font-mono)] text-3xl font-bold tracking-tight sm:text-4xl">
          {"<"}ear/y.bui/d{">"}
        </div>
      </footer>
    </div>
  );
}
