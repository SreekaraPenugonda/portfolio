export async function getGitHubStats(username: string) {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
    };
    // Add auth if available — raises rate limit from 60 to 5000 req/hour
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) throw new Error(`GitHub API responded ${response.status}`);

    const data = await response.json();

    return {
      repos: data.public_repos as number,
      followers: data.followers as number,
      following: data.following as number,
      avatar: data.avatar_url as string,
      bio: data.bio as string | null,
      location: data.location as string | null,
      blog: data.blog as string | null,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error instanceof Error ? error.message : error);
    return null;
  }
}

export async function getGitHubRepos(username: string) {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
    };
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch up to 100 repos so language aggregation is accurate
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`,
      { headers, next: { revalidate: 3600 } }
    );

    if (!response.ok) throw new Error(`GitHub repos API responded ${response.status}`);

    const repos = await response.json() as Array<Record<string, unknown>>;

    // Aggregate language frequencies for "Top Languages"
    const langCount: Record<string, number> = {};
    for (const repo of repos) {
      const lang = repo.language as string | null;
      if (lang) {
        langCount[lang] = (langCount[lang] ?? 0) + 1;
      }
    }
    const topLanguages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name]) => name);

    // Total stars across all repos
    const totalStars = repos.reduce(
      (sum, repo) => sum + ((repo.stargazers_count as number) ?? 0),
      0
    );

    // Top 6 repos by stars for showcase
    const topRepos = [...repos]
      .sort(
        (a, b) =>
          ((b.stargazers_count as number) ?? 0) -
          ((a.stargazers_count as number) ?? 0)
      )
      .slice(0, 6)
      .map((repo) => ({
        name: repo.name as string,
        description: repo.description as string | null,
        stars: repo.stargazers_count as number,
        forks: repo.forks_count as number,
        language: repo.language as string | null,
        url: repo.html_url as string,
      }));

    return { topRepos, topLanguages, totalStars };
  } catch (error) {
    console.error("Error fetching GitHub repos:", error instanceof Error ? error.message : error);
    return { topRepos: [], topLanguages: [], totalStars: 0 };
  }
}