import { NextRequest, NextResponse } from "next/server";
import { listBounties } from "@/lib/notion";

export const runtime = "nodejs"; // Force Node.js runtime
export const revalidate = 60; // ISR: revalidate every 60 seconds

export async function GET(request: NextRequest) {
  try {
    // Debug: Check env vars
    console.log("[api/bounties] NOTION_KEY exists:", !!process.env.NOTION_KEY);
    console.log("[api/bounties] NOTION_BOUNTIES_DB exists:", !!process.env.NOTION_BOUNTIES_DB);
    
    const { searchParams } = request.nextUrl;

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10) || 10));
    const status = searchParams.get("status") || undefined;
    const difficulty = searchParams.get("difficulty") || undefined;
    const search = searchParams.get("search") || undefined;

    const result = await listBounties({ page, limit, status, difficulty, search });

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    console.error("[api/bounties] Error:", error);
    const errorDetails = error instanceof Error 
      ? { message: error.message, stack: error.stack, name: error.name }
      : { raw: JSON.stringify(error) };
    return NextResponse.json(
      { error: "Failed to fetch bounties", details: errorDetails, bounties: [], total: 0, page: 1, totalPages: 0 },
      { status: 500 }
    );
  }
}
