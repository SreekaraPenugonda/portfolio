export async function getLeetCodeStats(username: string) {
  try {
    // Using LeetCode's GraphQL API
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
            reputation
          }
        }
      }
    `;

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) throw new Error('LeetCode API error');
    
    const data = await response.json();
    const user = data.data.matchedUser;
    
    if (!user) return null;

    const stats = user.submitStats.acSubmissionNum;
    
    return {
      ranking: user.profile.ranking,
      totalSolved: stats[0].count,
      easy: stats[1].count,
      medium: stats[2].count,
      hard: stats[3].count,
    };
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    return null;
  }
}