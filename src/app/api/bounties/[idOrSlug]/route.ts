import { NextRequest, NextResponse } from "next/server";
import { getBountyByIdOrSlug } from "@/lib/notion";

export const revalidate = 60;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ idOrSlug: string }> }
) {
  try {
    const { idOrSlug } = await params;
    const bounty = await getBountyByIdOrSlug(idOrSlug);

    if (!bounty) {
      return NextResponse.json({ error: "Bounty not found" }, { status: 404 });
    }

    return NextResponse.json(
      { bounty },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("[api/bounties/detail] Error:", error);
    return NextResponse.json({ error: "Failed to fetch bounty" }, { status: 500 });
  }
}
