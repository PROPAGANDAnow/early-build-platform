import Link from "next/link";
import { Bounty } from "@/lib/bounties";

const difficultyLabels = {
  beginner: "BEGINNER",
  intermediate: "INTERMEDIATE",
  advanced: "ADVANCED",
};

function StatusBadge({ status }: { status: Bounty["status"] }) {
  const config = {
    open: { label: "OPEN", color: "text-green-600", dot: "bg-green-500" },
    in_progress: { label: "CLOSING SOON", color: "text-yellow-600", dot: "bg-yellow-500" },
    completed: { label: "CLOSED", color: "text-red-600", dot: "bg-red-500" },
  };
  const { label, color, dot } = config[status];
  return (
    <span className={`flex items-center gap-1.5 text-xs font-bold uppercase ${color}`}>
      <span className={`inline-block h-2 w-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

export default function BountyCard({ bounty }: { bounty: Bounty }) {
  return (
    <Link href={`/bounty/${bounty.slug || bounty.id}`} className="block border border-gray-200 bg-white p-7 transition-all hover:border-black">
      {/* Sponsor + Status */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          {bounty.sponsor.name}
        </span>
        <StatusBadge status={bounty.status} />
      </div>

      {/* Title */}
      <h3 className="mb-2 text-base font-bold uppercase leading-snug">
        {bounty.title}
      </h3>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-gray-500">
        {bounty.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <span className="bg-[#ffe600] px-2 py-0.5 text-base font-bold">
          {bounty.reward}
        </span>
        <span className="text-xs uppercase text-gray-400">
          {difficultyLabels[bounty.difficulty]}
        </span>
      </div>
    </Link>
  );
}
