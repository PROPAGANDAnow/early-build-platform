import { z } from "zod";
import type { Bounty } from "./bounties";

// Use raw fetch instead of @notionhq/client to avoid Turbopack bundling issues
const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

// Track if we've validated env vars
let envValidated = false;

function validateEnv(): { notionKey: string; databaseId: string } {
  if (envValidated) {
    return {
      notionKey: process.env.NOTION_KEY!,
      databaseId: process.env.NOTION_BOUNTIES_DB!,
    };
  }

  const errors: string[] = [];

  const notionKey = process.env.NOTION_KEY;
  if (!notionKey) {
    errors.push("NOTION_KEY is not set");
  } else if (!notionKey.startsWith("ntn_")) {
    errors.push("NOTION_KEY appears invalid (should start with 'ntn_')");
  }

  const databaseId = process.env.NOTION_BOUNTIES_DB;
  if (!databaseId) {
    errors.push("NOTION_BOUNTIES_DB is not set");
  } else if (!/^[a-f0-9]{32}$/i.test(databaseId.replace(/-/g, ""))) {
    errors.push("NOTION_BOUNTIES_DB appears invalid (should be a UUID)");
  }

  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.map(e => "  - " + e).join("\n")}`);
  }

  envValidated = true;
  return { notionKey: notionKey!, databaseId: databaseId! };
}

function getHeaders() {
  const { notionKey } = validateEnv();
  return {
    Authorization: `Bearer ${notionKey}`,
    "Content-Type": "application/json",
    "Notion-Version": NOTION_VERSION,
  };
}

function getDatabaseId(): string {
  const { databaseId } = validateEnv();
  return databaseId;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function notionPost(endpoint: string, body: any): Promise<any> {
  const res = await fetch(`${NOTION_API}${endpoint}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion API error ${res.status}: ${text}`);
  }
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function notionGet(endpoint: string): Promise<any> {
  const res = await fetch(`${NOTION_API}${endpoint}`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion API error ${res.status}: ${text}`);
  }
  return res.json();
}

// --- Zod schema for validating bounties from Notion ---
const BountySchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().default(""),
  fullDescription: z.string().default(""),
  reward: z.string().default("$0"),
  status: z.enum(["open", "in_progress", "completed"]),
  tags: z.array(z.string()).default([]),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  sponsor: z.object({
    name: z.string().min(1),
    logo: z.string().optional(),
  }),
  applicants: z.number().default(0),
  deadline: z.string().optional(),
  createdAt: z.string(),
  requirements: z.array(z.string()).default([]),
  deliverables: z.array(z.string()).default([]),
  timeline: z.string().default(""),
});

// --- Notion property helpers ---
function getRichText(
  prop: { type: string; rich_text?: Array<{ plain_text: string }> } | undefined
): string {
  if (!prop || prop.type !== "rich_text" || !prop.rich_text) return "";
  return prop.rich_text.map((t) => t.plain_text).join("");
}

function getTitle(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prop: any
): string {
  if (!prop || prop.type !== "title" || !prop.title) return "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return prop.title.map((t: any) => t.plain_text).join("");
}

function getSelect(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prop: any
): string | null {
  if (!prop || prop.type !== "select" || !prop.select) return null;
  return prop.select.name;
}

function getMultiSelect(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prop: any
): string[] {
  if (!prop || prop.type !== "multi_select" || !prop.multi_select) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return prop.multi_select.map((s: any) => s.name);
}

function getNumber(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prop: any
): number {
  if (!prop || prop.type !== "number" || prop.number == null) return 0;
  return prop.number;
}

function getDate(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prop: any
): string | undefined {
  if (!prop || prop.type !== "date" || !prop.date) return undefined;
  return prop.date.start;
}

// Map Notion status values to our frontend status type
const STATUS_MAP: Record<string, Bounty["status"] | null> = {
  Open: "open",
  "In Progress": "in_progress",
  Completed: "completed",
  Draft: null,
  Review: null,
  Closed: null,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseNotionBounty(page: any): Bounty | null {
  try {
    const props = page.properties;
    const notionStatus = getSelect(props["Status"]);
    const mappedStatus = notionStatus ? STATUS_MAP[notionStatus] : null;

    if (!mappedStatus) return null;

    const raw = {
      id: page.id,
      title: getTitle(props["Title"]),
      slug: getRichText(props["Slug"]) || page.id,
      description: getRichText(props["Description"]),
      fullDescription: getRichText(props["Full Description"]),
      reward: getRichText(props["Reward"]),
      status: mappedStatus,
      tags: getMultiSelect(props["Tags"]),
      difficulty: (getSelect(props["Difficulty"]) || "beginner").toLowerCase(),
      sponsor: {
        name: getRichText(props["Sponsor"]) || "Unknown",
      },
      applicants: getNumber(props["Applicants"]),
      deadline: getDate(props["Deadline"]),
      createdAt: page.created_time?.split("T")[0] || new Date().toISOString().split("T")[0],
      requirements: getRichText(props["Requirements"])
        .split("\n")
        .map((s: string) => s.trim())
        .filter(Boolean),
      deliverables: getRichText(props["Deliverables"])
        .split("\n")
        .map((s: string) => s.trim())
        .filter(Boolean),
      timeline: getRichText(props["Timeline"]),
    };

    const result = BountySchema.safeParse(raw);
    if (!result.success) {
      console.warn(`[notion] Skipping invalid bounty ${page.id}:`, result.error.issues);
      return null;
    }

    return result.data as Bounty;
  } catch (err) {
    console.warn(`[notion] Error parsing bounty ${page.id}:`, err);
    return null;
  }
}

// --- Public API ---

export interface ListBountiesOptions {
  page?: number;
  limit?: number;
  status?: string;
  difficulty?: string;
  search?: string;
}

export interface ListBountiesResult {
  bounties: Bounty[];
  total: number;
  page: number;
  totalPages: number;
}

export async function listBounties(
  opts: ListBountiesOptions = {}
): Promise<ListBountiesResult> {
  const { page = 1, limit = 10, status, difficulty, search } = opts;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filters: any[] = [
    {
      or: [
        { property: "Status", select: { equals: "Open" } },
        { property: "Status", select: { equals: "In Progress" } },
        { property: "Status", select: { equals: "Completed" } },
      ],
    },
  ];

  if (status) {
    const notionStatus = Object.entries(STATUS_MAP).find(
      ([, v]) => v === status
    )?.[0];
    if (notionStatus) {
      filters.push({ property: "Status", select: { equals: notionStatus } });
    }
  }

  if (difficulty) {
    const capitalized = difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
    filters.push({ property: "Difficulty", select: { equals: capitalized } });
  }

  if (search) {
    filters.push({ property: "Title", title: { contains: search } });
  }

  const allBounties: Bounty[] = [];
  let cursor: string | undefined = undefined;
  let hasMore = true;

  while (hasMore) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = {
      filter: filters.length === 1 ? filters[0] : { and: filters },
      sorts: [{ timestamp: "created_time", direction: "descending" }],
      page_size: 100,
    };
    if (cursor) body.start_cursor = cursor;

    const response = await notionPost(`/databases/${getDatabaseId()}/query`, body);

    for (const p of response.results) {
      const bounty = parseNotionBounty(p);
      if (bounty) allBounties.push(bounty);
    }

    hasMore = response.has_more;
    cursor = response.next_cursor ?? undefined;
  }

  const total = allBounties.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const bounties = allBounties.slice(start, start + limit);

  return { bounties, total, page, totalPages };
}

export async function getBountyByIdOrSlug(
  idOrSlug: string
): Promise<Bounty | null> {
  // Try by page ID first
  try {
    const page = await notionGet(`/pages/${idOrSlug}`);
    const bounty = parseNotionBounty(page);
    if (bounty) return bounty;
  } catch {
    // Not a valid page ID — try slug
  }

  // Search by slug
  const response = await notionPost(`/databases/${getDatabaseId()}/query`, {
    filter: {
      property: "Slug",
      rich_text: { equals: idOrSlug },
    },
    page_size: 1,
  });

  if (response.results.length === 0) return null;
  return parseNotionBounty(response.results[0]);
}
