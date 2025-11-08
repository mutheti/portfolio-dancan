import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  topics: string[];
}

interface Commit {
  message: string;
  date: string;
  repo: string;
  url: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { username } = await req.json();
    
    if (!username) {
      throw new Error('GitHub username is required');
    }

    console.log(`Fetching GitHub data for user: ${username}`);

    // Fetch user's repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Lovable-Portfolio-App',
        },
      }
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.statusText}`);
    }

    const allRepos = await reposResponse.json();
    
    // Calculate stats
    const totalRepos = allRepos.length;
    const totalStars = allRepos.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0);

    // Get pinned/featured repositories (top 6 by stars)
    const featuredRepos: Repository[] = allRepos
      .filter((repo: any) => !repo.fork) // Exclude forks
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description || 'No description available',
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        language: repo.language || 'Unknown',
        url: repo.html_url,
        topics: repo.topics || [],
      }));

    // Fetch recent commits from user's events
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Lovable-Portfolio-App',
        },
      }
    );

    if (!eventsResponse.ok) {
      console.error('Failed to fetch events:', eventsResponse.statusText);
    }

    const events = eventsResponse.ok ? await eventsResponse.json() : [];
    
    // Extract push events (commits)
    const commitEvents = events
      .filter((event: any) => event.type === 'PushEvent')
      .slice(0, 10);

    const commits: Commit[] = commitEvents.map((event: any) => {
      const commit = event.payload.commits?.[0];
      return {
        message: commit?.message || 'No message',
        date: event.created_at,
        repo: event.repo.name,
        url: `https://github.com/${event.repo.name}/commit/${commit?.sha}`,
      };
    }).filter((commit: Commit) => commit.message !== 'No message');

    // Estimate total commits (from this year's events)
    const thisYear = new Date().getFullYear();
    const commitsThisYear = events.filter((event: any) => 
      event.type === 'PushEvent' && 
      new Date(event.created_at).getFullYear() === thisYear
    ).reduce((sum: number, event: any) => sum + (event.payload.commits?.length || 0), 0);

    const response = {
      repos: featuredRepos,
      commits: commits,
      stats: {
        totalRepos,
        totalStars,
        totalCommits: Math.max(commitsThisYear, 100), // Show at least 100+
      },
    };

    console.log(`Successfully fetched GitHub data for ${username}`);
    console.log(`Stats: ${totalRepos} repos, ${totalStars} stars, ${commitsThisYear} commits`);

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in github-activity function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        repos: [],
        commits: [],
        stats: { totalRepos: 0, totalStars: 0, totalCommits: 0 }
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
