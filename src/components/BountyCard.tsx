import Link from "next/link";
import { Bounty } from "@/lib/bounties";

const difficultyLabels = {
  beginner: "BEGINNER",
  intermediate: "INTERMEDIATE",
  advanced: "ADVANCED",
};

export default function BountyCard({ bounty }: { bounty: Bounty }) {
  return (
    <Link href={`/bounty/${bounty.id}`} className="block border border-gray-200 bg-white p-5 transition-all hover:border-black">
      {/* Sponsor */}
      <div className="mb-3 flex items-center justify-between">
        <span className="font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-wider text-gray-400">
          {bounty.sponsor.name}
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-400">
          {bounty.status === "open" ? "● OPEN" : bounty.status === "in_progress" ? "◐ IN PROGRESS" : "✓ DONE"}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-2 font-[family-name:var(--font-mono)] text-sm font-bold uppercase leading-snug">
        {bounty.title}
      </h3>

      {/* Description */}
      <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed text-gray-500">
        {bounty.description}
      </p>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {bounty.tags.map((tag) => (
          <span
            key={tag}
            className="border border-gray-200 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-500"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <span className="bg-[#ffe600] px-2 py-0.5 font-[family-name:var(--font-mono)] text-sm font-bold">
          {bounty.reward}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-400">
            {difficultyLabels[bounty.difficulty]}
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[10px] text-gray-400">
            {bounty.applicants} applied
          </span>
        </div>
      </div>
    </Link>
  );
}
