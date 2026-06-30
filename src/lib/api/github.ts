export async function getGitHubStats(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) throw new Error('GitHub API error');
    
    const data = await response.json();
    
    return {
      repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      avatar: data.avatar_url,
      bio: data.bio,
      location: data.location,
      blog: data.blog,
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}

export async function getGitHubRepos(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=10`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) throw new Error('GitHub API error');
    
    const repos = await response.json();
    
    return repos.map((repo: any) => ({
      name: repo.name,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      description: repo.description,
    }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}