import { Github, GitCommit, Star, GitFork, Calendar, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

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

interface GitHubData {
  repos: Repository[];
  commits: Commit[];
  stats: {
    totalRepos: number;
    totalStars: number;
    totalCommits: number;
  };
}

export function GitHubActivity() {
  const { data: githubData, isLoading, error } = useQuery({
    queryKey: ['github-activity'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('github-activity', {
        body: { username: 'dancanmurithi' } // Replace with your GitHub username
      });
      
      if (error) throw error;
      return data as GitHubData;
    },
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
  });

  if (isLoading) {
    return (
      <section id="github" className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-[600px] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="github" className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <Card className="p-8 text-center">
            <Github className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Unable to load GitHub activity</p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Github className="w-4 h-4" />
            <span className="text-sm font-medium">Open Source</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            GitHub Activity
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My open source contributions, projects, and development activity across GitHub.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center animate-fade-in border-border/50 bg-card/50 backdrop-blur">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
              <Github className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-1">{githubData?.stats.totalRepos || 0}</div>
            <div className="text-sm text-muted-foreground">Public Repositories</div>
          </Card>

          <Card className="p-6 text-center animate-fade-in border-border/50 bg-card/50 backdrop-blur" style={{ animationDelay: '100ms' }}>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
              <Star className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-1">{githubData?.stats.totalStars || 0}</div>
            <div className="text-sm text-muted-foreground">Total Stars</div>
          </Card>

          <Card className="p-6 text-center animate-fade-in border-border/50 bg-card/50 backdrop-blur" style={{ animationDelay: '200ms' }}>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
              <GitCommit className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-1">{githubData?.stats.totalCommits || 0}+</div>
            <div className="text-sm text-muted-foreground">Contributions This Year</div>
          </Card>
        </div>

        {/* Pinned Repositories */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Featured Repositories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {githubData?.repos.map((repo, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in border-border/50 bg-card/50 backdrop-blur"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <Github className="w-5 h-5 text-primary" />
                    {repo.name}
                  </h4>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {repo.forks}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {repo.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.language && (
                    <Badge variant="secondary" className="text-xs">
                      {repo.language}
                    </Badge>
                  )}
                  {repo.topics.slice(0, 3).map((topic, topicIndex) => (
                    <Badge key={topicIndex} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary/80"
                  onClick={() => window.open(repo.url, '_blank')}
                >
                  View Repository
                  <Github className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Commits */}
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <GitCommit className="w-6 h-6 text-primary" />
            Recent Commits
          </h3>
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur">
            <div className="space-y-4">
              {githubData?.commits.map((commit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium mb-1 truncate">
                      {commit.message}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Github className="w-3 h-3" />
                        {commit.repo}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(commit.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0"
                    onClick={() => window.open(commit.url, '_blank')}
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button
            size="lg"
            variant="outline"
            className="group"
            onClick={() => window.open('https://github.com/dancanmurithi', '_blank')}
          >
            <Github className="w-5 h-5 mr-2" />
            View Full Profile
          </Button>
        </div>
      </div>
    </section>
  );
}
