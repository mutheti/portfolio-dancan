import { useState, type ElementType } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Globe,
  Smartphone,
  Mail,
  ChevronDown,
  ChevronUp,
  Eye,
  CreditCard,
  Server,
  Brain,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";

type Project = Tables<"projects">;

const categoryIconMap: Record<string, ElementType> = {
  web: Globe,
  mobile: Smartphone,
  api: Server,
  fintech: CreditCard,
  ai: Brain,
};

const statusVariantMap: Record<string, { variant: "default" | "secondary"; className?: string }> = {
  production: { variant: "default", className: "gradient-accent text-white" },
  "in-progress": { variant: "secondary" },
  completed: { variant: "secondary" },
};

const formatStatus = (status?: string | null) => {
  if (!status) return "Planned";
  return status
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getStatusConfig = (status?: string | null) => {
  if (!status) {
    return statusVariantMap.completed;
  }

  const key = status.toLowerCase() as keyof typeof statusVariantMap;
  return statusVariantMap[key] || statusVariantMap.completed;
};

const getIconForProject = (project: Project, index: number) => {
  if (project.category) {
    const icon = categoryIconMap[project.category.toLowerCase()];
    if (icon) return icon;
  }

  // fall back to deterministic rotation for visual variety
  const icons = [CreditCard, Smartphone, Globe, Server];
  return icons[index % icons.length];
};

export function Projects() {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data as Project[];
    },
    staleTime: 1000 * 60 * 10,
  });

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const handleDiscussProject = (projectTitle: string) => {
    const subject = `Inquiry about ${projectTitle}`;
    const body = `Hi Dancan,\n\nI'm interested in learning more about your ${projectTitle} project. Could you please provide more details?\n\nBest regards`;
    window.open(
      `mailto:muthetidan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    );
  };

  const handleViewDemo = (demoUrl: string | null) => {
    if (demoUrl) {
      window.open(demoUrl, "_blank");
    }
  };

  const handleViewProject = (projectUrl: string | null) => {
    if (projectUrl) {
      window.open(projectUrl, "_blank");
    }
  };

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured <span className="text-gradient-warm">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Latest client and personal builds powered by Supabase, M-Pesa integrations, and modern web/mobile stacks.
            </p>
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="card-elevated p-6 space-y-4">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((__, i) => (
                      <Skeleton key={i} className="h-3 w-full" />
                    ))}
                  </div>
                  <Skeleton className="h-8 w-full" />
                </Card>
              ))}
            </div>
          )}

          {error && (
            <Card className="card-elevated p-6 text-center text-muted-foreground">
              Unable to load projects right now. Please refresh the page or check back later.
            </Card>
          )}

          {!isLoading && !error && projects && projects.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project, index) => {
                const IconComponent = getIconForProject(project, index);
                const statusConfig = getStatusConfig(project.status);
                const key = project.id ?? project.title;
                const features = project.features ?? [];
                const highlights = project.highlights ?? [];
                const tech = project.tech ?? [];
                const isExpanded = expandedProjects[key];

                return (
                  <Card
                    key={key}
                    className="card-elevated p-6 space-y-6 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div
                          className={`p-2 rounded-lg ${
                            index % 4 === 0
                              ? "bg-accent/10"
                              : index % 4 === 1
                                ? "bg-accent-cyan/10"
                                : index % 4 === 2
                                  ? "bg-accent-purple/10"
                                  : "bg-accent-orange/10"
                          }`}
                        >
                          <IconComponent
                            className={`h-6 w-6 ${
                              index % 4 === 0
                                ? "text-accent"
                                : index % 4 === 1
                                  ? "text-accent-cyan"
                                  : index % 4 === 2
                                    ? "text-accent-purple"
                                    : "text-accent-orange"
                            }`}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={statusConfig.variant}
                            className={statusConfig.className}
                          >
                            {formatStatus(project.status)}
                          </Badge>
                          {project.category && (
                            <Badge variant="outline" className="text-xs capitalize">
                              {project.category}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-foreground leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {features.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground text-sm">Key Features:</h4>
                        <ul className="space-y-1">
                          {(isExpanded ? features : features.slice(0, 3)).map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start space-x-2 text-sm text-muted-foreground"
                            >
                              <span
                                className={`h-1 w-1 rounded-full mt-2 flex-shrink-0 ${
                                  index % 4 === 0
                                    ? "bg-accent"
                                    : index % 4 === 1
                                      ? "bg-accent-cyan"
                                      : index % 4 === 2
                                        ? "bg-accent-purple"
                                        : "bg-accent-orange"
                                }`}
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {isExpanded && highlights.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground text-sm">Impact:</h4>
                        <ul className="space-y-1">
                          {highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className="flex items-start space-x-2 text-sm text-muted-foreground"
                            >
                              <span className="h-1 w-1 rounded-full bg-accent-cyan mt-2 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {isExpanded && tech.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground text-sm">Technologies:</h4>
                        <div className="flex flex-wrap gap-1">
                          {tech.map((item) => (
                            <Badge key={item} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {project.demo_url && (
                          <Button
                            onClick={() => handleViewDemo(project.demo_url)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 text-xs"
                          >
                            <Eye className="w-3 h-3" />
                            Demo
                          </Button>
                        )}

                        {project.url && (
                          <Button
                            onClick={() => handleViewProject(project.url)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 text-xs"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View
                          </Button>
                        )}

                        <Button
                          onClick={() => handleDiscussProject(project.title)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 text-xs"
                        >
                          <Mail className="w-3 h-3" />
                          Contact
                        </Button>
                      </div>

                      {features.length > 3 || highlights.length > 0 || tech.length > 0 ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => toggleProject(key)}
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="h-3 w-3 mr-1" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-3 w-3 mr-1" />
                              Show More
                            </>
                          )}
                        </Button>
                      ) : null}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {!isLoading && !error && projects && projects.length === 0 && (
            <Card className="card-elevated p-6 text-center text-muted-foreground">
              No projects published yet. Check back soon for new case studies.
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}