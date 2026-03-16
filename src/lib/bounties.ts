export interface Bounty {
  id: string;
  title: string;
  description: string;
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
}

// Placeholder data — will be replaced by DB/API
export const SAMPLE_BOUNTIES: Bounty[] = [
  {
    id: "1",
    title: "Build a Token-Gated Dashboard",
    description:
      "Create a Next.js dashboard that gates access based on token holdings. Must support ERC-20 and ERC-721 verification.",
    reward: "$2,500",
    status: "open",
    tags: ["Next.js", "Web3", "Auth"],
    difficulty: "intermediate",
    sponsor: { name: "Fhenix" },
    applicants: 3,
    deadline: "2026-04-15",
    createdAt: "2026-03-10",
  },
  {
    id: "2",
    title: "Implement Social Feed with Reactions",
    description:
      "Build a real-time social feed component with optimistic updates, reactions, and threaded replies.",
    reward: "$1,800",
    status: "open",
    tags: ["React", "Real-time", "UI"],
    difficulty: "intermediate",
    sponsor: { name: "Corners" },
    applicants: 7,
    createdAt: "2026-03-12",
  },
  {
    id: "3",
    title: "Landing Page Redesign",
    description:
      "Redesign our landing page with modern animations, responsive layout, and improved conversion funnel.",
    reward: "$1,200",
    status: "open",
    tags: ["Design", "CSS", "Animation"],
    difficulty: "beginner",
    sponsor: { name: "Bodega" },
    applicants: 12,
    deadline: "2026-04-01",
    createdAt: "2026-03-14",
  },
  {
    id: "4",
    title: "Smart Contract Audit Tool",
    description:
      "Build a web-based tool that analyzes Solidity contracts for common vulnerabilities and generates reports.",
    reward: "$5,000",
    status: "open",
    tags: ["Solidity", "Security", "Tooling"],
    difficulty: "advanced",
    sponsor: { name: "Ink" },
    applicants: 2,
    deadline: "2026-05-01",
    createdAt: "2026-03-08",
  },
  {
    id: "5",
    title: "Chrome Extension for Wallet Analytics",
    description:
      "Create a Chrome extension that shows portfolio analytics and transaction history for any wallet address.",
    reward: "$3,000",
    status: "in_progress",
    tags: ["Extension", "Analytics", "Web3"],
    difficulty: "advanced",
    sponsor: { name: "Zerion" },
    applicants: 5,
    createdAt: "2026-03-05",
  },
  {
    id: "6",
    title: "Mobile-First Onboarding Flow",
    description:
      "Design and implement a mobile-optimized onboarding flow with progressive disclosure and social auth.",
    reward: "$1,500",
    status: "open",
    tags: ["Mobile", "UX", "Auth"],
    difficulty: "beginner",
    sponsor: { name: "Piggy" },
    applicants: 9,
    createdAt: "2026-03-15",
  },
];
