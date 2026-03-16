"use client";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
}

const filters = [
  { key: "all", label: "All Bounties" },
  { key: "open", label: "Open" },
  { key: "in_progress", label: "In Progress" },
  { key: "beginner", label: "Beginner" },
  { key: "intermediate", label: "Intermediate" },
  { key: "advanced", label: "Advanced" },
];

export default function FilterBar({
  activeFilter,
  onFilterChange,
  search,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search bounties..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] py-2 pl-10 pr-4 text-sm text-white placeholder-[var(--muted)] outline-none focus:border-[var(--accent)]/50 sm:w-72"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              activeFilter === f.key
                ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)]"
                : "border-[var(--card-border)] bg-[var(--card)] text-[var(--muted)] hover:border-white/20"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
