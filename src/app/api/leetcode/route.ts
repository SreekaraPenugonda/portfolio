import { NextResponse } from "next/server";
import { getLeetCodeStats } from "@/lib/api/leetcode";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "Sreekara_Penugonda";

  try {
    const stats = await getLeetCodeStats(username);

    return NextResponse.json({
      stats,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch LeetCode data" },
      { status: 500 }
    );
  }
}