"use client";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
}

const filters = [
  { key: "all", label: "ALL" },
  { key: "open", label: "OPEN" },
  { key: "in_progress", label: "IN PROGRESS" },
  { key: "beginner", label: "BEGINNER" },
  { key: "intermediate", label: "INTERMEDIATE" },
  { key: "advanced", label: "ADVANCED" },
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
      <input
        type="text"
        placeholder="> SEARCH BOUNTIES..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full border border-gray-200 bg-white px-4 py-2 font-[family-name:var(--font-mono)] text-xs uppercase outline-none focus:border-black sm:w-64"
      />

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`border px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase transition ${
              activeFilter === f.key
                ? "border-black bg-black text-white"
                : "border-gray-200 bg-white text-gray-500 hover:border-black"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
