export interface Bounty {
  id: string;
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

// Placeholder data — will be replaced by DB/API
export const SAMPLE_BOUNTIES: Bounty[] = [
  {
    id: "1",
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
  {
    id: "2",
    title: "Implement Social Feed with Reactions",
    description:
      "Build a real-time social feed component with optimistic updates, reactions, and threaded replies.",
    fullDescription:
      "Build a performant social feed that supports real-time updates, emoji reactions with optimistic UI, and threaded conversations. The feed should handle high-frequency updates gracefully, support infinite scrolling, and maintain scroll position during updates. Reactions should be instant (optimistic) with server reconciliation. Threaded replies should be collapsible and support nested depth of 2 levels.",
    reward: "$1,800",
    status: "open",
    tags: ["React", "Real-time", "UI"],
    difficulty: "intermediate",
    sponsor: { name: "Corners" },
    applicants: 7,
    createdAt: "2026-03-12",
    requirements: [
      "Strong React/TypeScript skills",
      "Experience with WebSocket or SSE",
      "Understanding of optimistic updates",
      "Performance optimization experience",
    ],
    deliverables: [
      "Reusable React component library",
      "Storybook documentation",
      "Performance benchmarks",
      "Integration guide",
    ],
    timeline: "10 days from acceptance",
  },
  {
    id: "3",
    title: "Landing Page Redesign",
    description:
      "Redesign our landing page with modern animations, responsive layout, and improved conversion funnel.",
    fullDescription:
      "Complete redesign of our main landing page. We want a modern, high-converting page with smooth scroll animations, interactive elements, and a clear CTA funnel. The page should load fast (sub-2s LCP), be fully responsive, and follow accessibility best practices. We have existing brand guidelines and Figma mockups to work from.",
    reward: "$1,200",
    status: "open",
    tags: ["Design", "CSS", "Animation"],
    difficulty: "beginner",
    sponsor: { name: "Bodega" },
    applicants: 12,
    deadline: "2026-04-01",
    createdAt: "2026-03-14",
    requirements: [
      "HTML/CSS/JS proficiency",
      "Experience with CSS animations or Framer Motion",
      "Eye for design and attention to detail",
      "Understanding of web performance",
    ],
    deliverables: [
      "Deployed landing page",
      "Source code on GitHub",
      "Lighthouse score > 90",
      "Mobile + desktop screenshots",
    ],
    timeline: "1 week from acceptance",
  },
  {
    id: "4",
    title: "Smart Contract Audit Tool",
    description:
      "Build a web-based tool that analyzes Solidity contracts for common vulnerabilities and generates reports.",
    fullDescription:
      "Create a web application where users can paste or upload Solidity smart contracts and receive an automated security analysis. The tool should check for common vulnerabilities (reentrancy, overflow, access control issues), generate a readable report with severity ratings, and provide remediation suggestions. Think Slither meets a clean web UI.",
    reward: "$5,000",
    status: "open",
    tags: ["Solidity", "Security", "Tooling"],
    difficulty: "advanced",
    sponsor: { name: "Ink" },
    applicants: 2,
    deadline: "2026-05-01",
    createdAt: "2026-03-08",
    requirements: [
      "Deep understanding of Solidity and EVM",
      "Experience with static analysis tools",
      "Full-stack web development skills",
      "Security auditing knowledge",
    ],
    deliverables: [
      "Working web application",
      "API for programmatic access",
      "Documentation and examples",
      "At least 10 vulnerability detection rules",
    ],
    timeline: "3 weeks from acceptance",
  },
  {
    id: "5",
    title: "Chrome Extension for Wallet Analytics",
    description:
      "Create a Chrome extension that shows portfolio analytics and transaction history for any wallet address.",
    fullDescription:
      "Build a Chrome extension that provides at-a-glance portfolio analytics for any Ethereum wallet address. When a user highlights or visits a wallet address, the extension should show token balances, recent transactions, PnL estimates, and basic analytics. Support for ENS resolution, multiple chains (Ethereum, Base, Arbitrum), and a clean popup UI.",
    reward: "$3,000",
    status: "in_progress",
    tags: ["Extension", "Analytics", "Web3"],
    difficulty: "advanced",
    sponsor: { name: "Zerion" },
    applicants: 5,
    createdAt: "2026-03-05",
    requirements: [
      "Chrome extension development experience",
      "Familiarity with blockchain data APIs",
      "React or vanilla JS for popup UI",
      "Multi-chain data aggregation",
    ],
    deliverables: [
      "Published Chrome extension",
      "Source code repository",
      "User guide",
      "Demo video",
    ],
    timeline: "2 weeks from acceptance",
  },
  {
    id: "6",
    title: "Mobile-First Onboarding Flow",
    description:
      "Design and implement a mobile-optimized onboarding flow with progressive disclosure and social auth.",
    fullDescription:
      "Create a beautiful, mobile-first onboarding experience that guides new users through account creation, profile setup, and first actions. The flow should use progressive disclosure (don't overwhelm users), support social auth (Google, Twitter, GitHub), and feel native on mobile devices. Include skip options, progress indicators, and a completion celebration.",
    reward: "$1,500",
    status: "open",
    tags: ["Mobile", "UX", "Auth"],
    difficulty: "beginner",
    sponsor: { name: "Piggy" },
    applicants: 9,
    createdAt: "2026-03-15",
    requirements: [
      "Mobile-first design thinking",
      "React/Next.js experience",
      "Social auth integration (NextAuth or similar)",
      "Attention to micro-interactions",
    ],
    deliverables: [
      "Working onboarding flow",
      "Mobile + desktop responsive",
      "Auth integration code",
      "User testing feedback (3+ users)",
    ],
    timeline: "10 days from acceptance",
  },
];

export function getBountyById(id: string): Bounty | undefined {
  return SAMPLE_BOUNTIES.find((b) => b.id === id);
}
