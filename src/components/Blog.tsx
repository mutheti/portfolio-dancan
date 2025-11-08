import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type ArticleRecord = Tables<"articles">;

const fallbackArticles = [
  {
    title: "Scaling M-Pesa Integrations with Supabase Edge Functions",
    summary:
      "How to orchestrate 10K+ daily transactions with automated reconciliation, retries, and observability powered by Supabase.",
    published_at: "2024-08-12T00:00:00+03:00",
    read_time: 9,
    tags: ["Fintech", "Supabase", "Edge Functions"],
    url: "https://blog.example.com/supabase-mpesa-scale",
    image_url:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Designing Full-Stack Flutter + Supabase Apps for Offline Field Teams",
    summary:
      "Patterns that keep agents productive during connectivity drops, including conflict resolution and background sync.",
    published_at: "2024-05-22T00:00:00+03:00",
    read_time: 11,
    tags: ["Flutter", "Mobile", "Architecture"],
    url: "https://medium.com/@dancanmurithi/flutter-supabase-offline",
    image_url:
      "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1200&q=80",
  },
];

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function Blog() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("featured", { ascending: false })
        .order("published_at", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ArticleRecord[];
    },
    staleTime: 1000 * 60 * 10,
  });

  const articles = useMemo(() => {
    if (!error && data && data.length > 0) {
      return data;
    }
    return fallbackArticles;
  }, [data, error]);

  return (
    <section id="blog" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Technical Writing</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Blog & Articles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sharing insights, tutorials, and lessons learned from real-world development
            experiences and technical challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={`article-skeleton-${index}`}
                className="overflow-hidden border-border/50 bg-card/50 backdrop-blur"
              >
                <Skeleton className="w-full aspect-video" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-32" />
                </div>
              </Card>
            ))}

          {!isLoading &&
            articles.map((article, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in border-border/50 bg-card/50 backdrop-blur group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={article.image_url ?? ""}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(article.published_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.read_time ? `${article.read_time} min read` : "Quick read"}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {article.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(article.tags ?? []).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="group/btn text-primary hover:text-primary/80 p-0"
                  onClick={() => article.url && window.open(article.url, "_blank")}
                  disabled={!article.url}
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="group">
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
