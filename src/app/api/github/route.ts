import { NextResponse } from "next/server";
import { getGitHubStats, getGitHubRepos } from "@/lib/api/github";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "SreekaraPenugonda";

  try {
    const [stats, repoData] = await Promise.all([
      getGitHubStats(username),
      getGitHubRepos(username),
    ]);

    return NextResponse.json({
      stats,
      repos: repoData.topRepos,
      topLanguages: repoData.topLanguages,
      totalStars: repoData.totalStars,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
