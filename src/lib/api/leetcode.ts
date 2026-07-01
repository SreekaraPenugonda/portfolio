/**
 * LeetCode stats helper.
 *
 * LeetCode's public GraphQL API blocks server-side requests (no CSRF token).
 * We use the community-maintained alfa-leetcode-api as a reliable proxy,
 * with a fallback to null so the UI falls back to siteConfig static data.
 */
export async function getLeetCodeStats(username: string) {
  try {
    // Community-maintained open API that proxies LeetCode stats
    const response = await fetch(
      `https://alfa-leetcode-api.onrender.com/${encodeURIComponent(username)}/solved`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        signal: AbortSignal.timeout(8000), // Don't hang indefinitely
      }
    );

    if (!response.ok) throw new Error(`LeetCode proxy responded ${response.status}`);

    const data = await response.json();

    if (!data || typeof data.solvedProblem !== "number") {
      return null;
    }

    return {
      totalSolved: data.solvedProblem,
      totalProblems: 3400, // approximate LeetCode total
      ranking: data.ranking ?? 0,
      easy: data.easySolved ?? 0,
      medium: data.mediumSolved ?? 0,
      hard: data.hardSolved ?? 0,
      byDifficulty: {
        easy: data.easySolved ?? 0,
        medium: data.mediumSolved ?? 0,
        hard: data.hardSolved ?? 0,
      },
    };
  } catch (error) {
    // Non-critical — the UI falls back to siteConfig static data
    console.error("LeetCode stats unavailable:", error instanceof Error ? error.message : error);
    return null;
  }
}