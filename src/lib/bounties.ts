import { listBounties, getBountyByIdOrSlug, type ListBountiesOptions, type ListBountiesResult } from "./notion";

export interface Bounty {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  reward: string;
  status: "open" | "in_progress" | "completed";
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  sponsor: {
    name: string;
    logo?: string;
  };
  applicants: number;
  deadline?: string;
  createdAt: string;
  requirements: string[];
  deliverables: string[];
  timeline: string;
}

// Placeholder data — used as fallback if Notion is unavailable
export const SAMPLE_BOUNTIES: Bounty[] = [
  {
    id: "1",
    slug: "token-gated-dashboard",
    title: "Build a Token-Gated Dashboard",
    description:
      "Create a Next.js dashboard that gates access based on token holdings. Must support ERC-20 and ERC-721 verification.",
    fullDescription:
      "We need a production-ready dashboard that verifies token holdings before granting access. The solution should integrate with popular wallet providers (MetaMask, WalletConnect, Coinbase Wallet) and support both ERC-20 balance checks and ERC-721 ownership verification. The UI should clearly communicate gating requirements to users and provide a smooth onboarding experience for token holders.",
    reward: "$2,500",
    status: "open",
    tags: ["Next.js", "Web3", "Auth"],
    difficulty: "intermediate",
    sponsor: { name: "Fhenix" },
    applicants: 3,
    deadline: "2026-04-15",
    createdAt: "2026-03-10",
    requirements: [
      "Experience with Next.js 14+ and App Router",
      "Familiarity with wagmi/viem or ethers.js",
      "Understanding of ERC-20 and ERC-721 token standards",
      "Clean, responsive UI implementation",
    ],
    deliverables: [
      "GitHub repo with full source code",
      "Deployed preview on Vercel",
      "README with setup instructions",
      "Demo video (2-3 min walkthrough)",
    ],
    timeline: "2 weeks from acceptance",
  },
];

/**
 * Fetch bounties from Notion. In production, throws on error. In development, falls back to sample data.
 */
export async function getBounties(
  opts?: ListBountiesOptions
): Promise<ListBountiesResult> {
  try {
    return await listBounties(opts);
  } catch (error) {
    console.error("[bounties] Notion fetch failed:", error);
    
    // In production, don't silently serve fake data
    if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
      throw new Error(`Failed to fetch bounties from Notion: ${error instanceof Error ? error.message : String(error)}`);
    }
    
    // Development fallback only
    console.warn("[bounties] Using SAMPLE_BOUNTIES fallback in development");
    const all = SAMPLE_BOUNTIES;
    const page = opts?.page || 1;
    const limit = opts?.limit || 10;
    return {
      bounties: all.slice((page - 1) * limit, page * limit),
      total: all.length,
      page,
      totalPages: Math.ceil(all.length / limit),
    };
  }
}

/**
 * Fetch a single bounty by ID or slug from Notion.
 * In production, throws on error. In development, falls back to sample data.
 */
export async function getBountyById(
  idOrSlug: string
): Promise<Bounty | undefined> {
  try {
    const bounty = await getBountyByIdOrSlug(idOrSlug);
    return bounty || undefined;
  } catch (error) {
    console.error("[bounties] Notion detail fetch failed:", error);
    
    // In production, don't silently serve fake data
    if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
      throw new Error(`Failed to fetch bounty from Notion: ${error instanceof Error ? error.message : String(error)}`);
    }
    
    // Development fallback only
    console.warn("[bounties] Using SAMPLE_BOUNTIES fallback in development");
    return SAMPLE_BOUNTIES.find((b) => b.id === idOrSlug);
  }
}
