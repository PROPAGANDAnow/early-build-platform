"use client";

import { useState } from "react";

export default function SubmissionGate({
  bountyTitle,
}: {
  bountyTitle: string;
}) {
  const [applied, setApplied] = useState(false);

  if (!applied) {
    return (
      <div className="relative border-2 border-dashed border-gray-300 p-8 text-center">
        {/* Blurred preview */}
        <div className="pointer-events-none mb-6 select-none opacity-20 blur-sm">
          <div className="mb-3 font-[family-name:var(--font-mono)] text-sm font-bold uppercase">
            SUBMIT YOUR WORK
          </div>
          <div className="mb-2 h-10 w-full border border-gray-200 bg-gray-50" />
          <div className="mb-2 h-24 w-full border border-gray-200 bg-gray-50" />
          <div className="mb-2 h-10 w-full border border-gray-200 bg-gray-50" />
        </div>

        {/* Gate overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 p-6">
          <div className="mb-2 text-2xl">🔒</div>
          <h3 className="mb-2 font-[family-name:var(--font-mono)] text-sm font-bold uppercase">
            SUBMISSION LOCKED
          </h3>
          <p className="mb-4 max-w-sm font-[family-name:var(--font-mono)] text-xs uppercase text-gray-500">
            APPLY TO THIS BOUNTY TO UNLOCK THE SUBMISSION FORM AND START
            BUILDING
          </p>
          <button
            onClick={() => setApplied(true)}
            className="bg-[#ffe600] px-6 py-2.5 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider transition hover:bg-[#e6cf00]"
          >
            {">"} APPLY TO UNLOCK
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-black p-6">
      <h2 className="mb-6 font-[family-name:var(--font-mono)] text-sm font-bold uppercase">
        SUBMIT YOUR WORK
      </h2>

      <div className="space-y-4">
        {/* GitHub Repo */}
        <div>
          <label className="mb-1 block font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-gray-500">
            GITHUB REPO URL
          </label>
          <input
            type="url"
            placeholder="https://github.com/you/project"
            className="w-full border border-gray-200 px-4 py-2.5 font-[family-name:var(--font-mono)] text-xs outline-none focus:border-black"
          />
        </div>

        {/* Demo Link */}
        <div>
          <label className="mb-1 block font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-gray-500">
            LIVE DEMO URL
          </label>
          <input
            type="url"
            placeholder="https://your-demo.vercel.app"
            className="w-full border border-gray-200 px-4 py-2.5 font-[family-name:var(--font-mono)] text-xs outline-none focus:border-black"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-gray-500">
            DESCRIBE YOUR APPROACH
          </label>
          <textarea
            rows={4}
            placeholder="How did you approach this bounty? What decisions did you make?"
            className="w-full resize-none border border-gray-200 px-4 py-2.5 font-[family-name:var(--font-mono)] text-xs outline-none focus:border-black"
          />
        </div>

        {/* Demo Video */}
        <div>
          <label className="mb-1 block font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-gray-500">
            DEMO VIDEO URL (OPTIONAL)
          </label>
          <input
            type="url"
            placeholder="https://loom.com/share/..."
            className="w-full border border-gray-200 px-4 py-2.5 font-[family-name:var(--font-mono)] text-xs outline-none focus:border-black"
          />
        </div>

        {/* Submit */}
        <button className="mt-2 w-full bg-black px-6 py-3 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-white transition hover:bg-gray-800">
          {">"} SUBMIT FOR REVIEW
        </button>

        <p className="font-[family-name:var(--font-mono)] text-xs uppercase text-gray-400">
          YOUR SUBMISSION WILL BE REVIEWED BY THE {bountyTitle.toUpperCase()}{" "}
          TEAM. YOU&apos;LL HEAR BACK WITHIN 48 HOURS.
        </p>
      </div>
    </div>
  );
}
