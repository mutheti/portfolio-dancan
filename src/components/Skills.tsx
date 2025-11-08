import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Code2,
  Smartphone,
  Globe,
  Server,
  Database,
  Cloud,
  Settings,
  Users,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type SkillRecord = Tables<"skills">;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Programming Languages & Frameworks": Code2,
  "Mobile Development": Smartphone,
  "Web Development": Globe,
  "M-Pesa & Payment Integrations": Server,
  "Backend Integration & APIs": Database,
  "Databases & Storage": Cloud,
  "Cloud & DevOps": Cloud,
  "Networking & IT Support": Settings,
  "Soft Skills": Users,
};

const fallbackSkillCategories: Array<{
  category: string;
  skills: string[];
}> = [
  {
    category: "Programming Languages & Frameworks",
    skills: ["Java", "Kotlin", "Dart", "TypeScript", "React", "Node.js", "Next.js"],
  },
  {
    category: "Mobile Development",
    skills: ["Native Android (Java/Kotlin)", "Cross-platform Apps (Flutter)", "Mobile UI/UX"],
  },
  {
    category: "Web Development",
    skills: ["React", "Next.js", "Node.js", "Express.js", "REST APIs", "Supabase Functions"],
  },
  {
    category: "M-Pesa & Payment Integrations",
    skills: [
      "M-Pesa STK Push",
      "B2B/B2C Workflows",
      "Daraja API",
      "Africa's Talking",
      "Webhooks",
    ],
  },
  {
    category: "Backend Integration & APIs",
    skills: ["Supabase Edge Functions", "GraphQL", "Webhook Automation", "API Gateway"],
  },
  {
    category: "Databases & Storage",
    skills: ["Supabase PostgreSQL", "MySQL", "Firestore", "Realtime Database", "Data Migration"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS", "Firebase", "Render", "Docker", "CI/CD Pipelines"],
  },
  {
    category: "Networking & IT Support",
    skills: ["Structured Cabling", "Network Setup", "MySQL Replication", "Disaster Recovery"],
  },
  {
    category: "Soft Skills",
    skills: ["Problem-solving", "Team Leadership", "Client Communication", "Mentorship"],
  },
];

export function Skills() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data as SkillRecord[];
    },
    staleTime: 1000 * 60 * 10,
  });

  const skillCategories = useMemo(() => {
    if (!error && data && data.length > 0) {
      return data.map((record) => ({
        category: record.category,
        skills: record.skills ?? [],
      }));
    }
    return fallbackSkillCategories;
  }, [data, error]);

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section header */}
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              Technical <span className="text-gradient-purple">Skills</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and competencies across various domains of software development.
            </p>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={`skeleton-${index}`} className="card-elevated p-6 space-y-4">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-6 w-2/3" />
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 6 }).map((__, badgeIndex) => (
                      <Skeleton key={badgeIndex} className="h-6 w-20 rounded-full" />
                    ))}
                  </div>
                </Card>
              ))}

            {!isLoading &&
              skillCategories.map((category, index) => {
                const IconComponent =
                  iconMap[category.category] ??
                  [Code2, Smartphone, Globe, Server, Database, Cloud, Settings, Users][
                    index % 8
                  ];
              return (
                <Card 
                  key={category.category}
                  className="card-elevated p-6 space-y-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      index % 4 === 0 ? 'bg-accent/10' :
                      index % 4 === 1 ? 'bg-accent-cyan/10' :
                      index % 4 === 2 ? 'bg-accent-purple/10' :
                      'bg-accent-orange/10'
                    }`}>
                      <IconComponent className={`h-6 w-6 ${
                        index % 4 === 0 ? 'text-accent' :
                        index % 4 === 1 ? 'text-accent-cyan' :
                        index % 4 === 2 ? 'text-accent-purple' :
                        'text-accent-orange'
                      }`} />
                    </div>
                    <h3 className="text-lg font-semibold">{category.category}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge 
                        key={skill}
                        variant="secondary"
                        className="hover:bg-accent hover:text-accent-foreground transition-smooth cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}