import { Bounty } from "@/lib/bounties";

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-400 border-green-500/20",
  intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  advanced: "bg-red-500/10 text-red-400 border-red-500/20",
};

const statusLabels = {
  open: { label: "Open", class: "bg-green-500/10 text-green-400" },
  in_progress: {
    label: "In Progress",
    class: "bg-blue-500/10 text-blue-400",
  },
  completed: { label: "Completed", class: "bg-gray-500/10 text-gray-400" },
};

export default function BountyCard({ bounty }: { bounty: Bounty }) {
  const status = statusLabels[bounty.status];

  return (
    <div className="group relative rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 transition-all hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-xs font-medium">
            {bounty.sponsor.name.charAt(0)}
          </div>
          <span className="text-xs text-[var(--muted)]">
            {bounty.sponsor.name}
          </span>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs ${status.class}`}>
          {status.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-base font-semibold leading-snug group-hover:text-[var(--accent)] transition-colors">
        {bounty.title}
      </h3>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)] line-clamp-2">
        {bounty.description}
      </p>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {bounty.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-xs text-[var(--muted)]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[var(--card-border)] pt-4">
        <span className="text-lg font-bold text-[var(--accent)]">
          {bounty.reward}
        </span>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-md border px-2 py-0.5 text-xs ${difficultyColors[bounty.difficulty]}`}
          >
            {bounty.difficulty}
          </span>
          <span className="text-xs text-[var(--muted)]">
            {bounty.applicants} applicant{bounty.applicants !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {bounty.deadline && (
        <div className="mt-2 text-xs text-[var(--muted)]">
          Deadline:{" "}
          {new Date(bounty.deadline).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      )}
    </div>
  );
}
