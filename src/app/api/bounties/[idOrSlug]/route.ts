import { NextRequest, NextResponse } from "next/server";
import { getBountyByIdOrSlug } from "@/lib/notion";

export const runtime = "nodejs";
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
    
    let statusCode = 500;
    let errorMessage = "Failed to fetch bounty";
    
    if (error instanceof Error) {
      if (error.message.includes("NOTION_KEY")) {
        statusCode = 503;
        errorMessage = "Notion API key not configured";
      } else if (error.message.includes("NOTION_BOUNTIES_DB")) {
        statusCode = 503;
        errorMessage = "Notion database ID not configured";
      } else if (error.message.includes("Environment validation")) {
        statusCode = 503;
        errorMessage = error.message;
      } else if (error.message.includes("Notion API error")) {
        statusCode = 502;
        errorMessage = "Notion API error: " + error.message;
      }
    }
    
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
