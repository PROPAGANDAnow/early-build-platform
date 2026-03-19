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
    
    // Provide specific error messages for common issues
    let statusCode = 500;
    let errorMessage = "Failed to fetch bounties";
    
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
    
    return NextResponse.json(
      { 
        error: errorMessage, 
        bounties: [], 
        total: 0, 
        page: 1, 
        totalPages: 0 
      },
      { status: statusCode }
    );
  }
}
