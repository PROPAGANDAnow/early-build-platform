"use client";

import { useState, useMemo } from "react";
import BountyCard from "./BountyCard";
import FilterBar from "./FilterBar";
import { SAMPLE_BOUNTIES } from "@/lib/bounties";

export default function BountiesPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let results = SAMPLE_BOUNTIES;

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q)) ||
          b.sponsor.name.toLowerCase().includes(q)
      );
    }

    if (filter === "open" || filter === "in_progress" || filter === "completed") {
      results = results.filter((b) => b.status === filter);
    } else if (
      filter === "beginner" ||
      filter === "intermediate" ||
      filter === "advanced"
    ) {
      results = results.filter((b) => b.difficulty === filter);
    }

    return results;
  }, [filter, search]);

  return (
    <div>
      <FilterBar
        activeFilter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
      />

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {filtered.map((bounty) => (
          <BountyCard key={bounty.id} bounty={bounty} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-lg text-[var(--muted)]">No bounties found</p>
          <p className="text-sm text-[var(--muted)]">
            Try adjusting your filters or search term
          </p>
        </div>
      )}
    </div>
  );
}
