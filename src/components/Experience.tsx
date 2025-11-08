import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type ExperienceRecord = Tables<"experiences">;

const fallbackExperiences = [
  {
    company: "Bamaki Solutions",
    position: "Software Engineer (Remote)",
    location: "Nairobi, Kenya",
    period: "Jan 2024 – Present",
    type: "Full-time",
    description:
      "Collaborate with a remote-first team to design, develop, and deploy custom software solutions for multiple clients across sectors.",
    responsibilities: [
      "Build scalable web and mobile applications using React, Flutter, Firebase, Node.js, and AWS",
      "Work closely with clients to gather requirements, propose solutions, and deliver timely feature updates",
      "Contribute to both frontend and backend systems, including APIs, dashboards, and cloud infrastructure",
    ],
    achievements: [
      "Delivered 5+ production-ready systems for clients in retail, fintech, and logistics",
      "Optimized inventory dashboards by reducing Firestore reads by 40% through caching and batching",
      "Spearheaded a mobile-first donation platform with multi-payment support (M-Pesa, PayPal, card)",
    ],
    tech: ["React", "Flutter", "Firebase", "Node.js", "AWS", "M-Pesa API"],
  },
  {
    company: "Oseo Communication Limited",
    position: "Software Engineer",
    location: "Nairobi, Kenya",
    period: "May 2024 – Present",
    type: "Full-time",
    description:
      "Develop Android and web applications to support SIM card registration, airtime distribution, and float reconciliation processes.",
    responsibilities: [
      "Design backend systems to track airtime purchases and reconcile vendor transactions",
      "Build REST APIs and Firebase-integrated services for real-time dashboards",
      "Provide cross-department technical support and network troubleshooting",
      "Lead secure network infrastructure setup for distributed teams",
    ],
    achievements: [
      "Launched a real-time airtime reconciliation dashboard used by field agents",
      "Streamlined registration workflows, reducing onboarding time by 40%",
      "Cut discrepancies in vendor transactions by 70% through automation",
    ],
    tech: ["Android", "Firebase", "REST APIs", "AWS EC2", "MySQL", "Networking"],
  },
];

export function Experience() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("order_index", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ExperienceRecord[];
    },
    staleTime: 1000 * 60 * 10,
  });

  const experiences = useMemo(() => {
    if (!error && data && data.length > 0) {
      return data.map((experience) => ({
        company: experience.company,
        position: experience.position,
        location: experience.location ?? "",
        period: experience.period ?? "",
        type: experience.type ?? "Full-time",
        description: experience.description ?? "",
        responsibilities: experience.responsibilities ?? [],
        achievements: experience.achievements ?? [],
        tech: experience.tech ?? [],
      }));
    }
    return fallbackExperiences;
  }, [data, error]);

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Section header */}
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              Professional <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My journey in software development, from internship to senior engineering roles, 
              building impactful solutions across various industries.
            </p>
          </div>

          {/* Experience timeline */}
          <div className="space-y-8">
            {isLoading &&
              Array.from({ length: 2 }).map((_, index) => (
                <Card key={`skeleton-${index}`} className="card-elevated p-6 space-y-6">
                  <Skeleton className="h-6 w-40" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-20 w-full" />
                </Card>
              ))}

            {!isLoading &&
              experiences.map((exp, index) => (
              <Card 
                key={`${exp.company}-${exp.period}`}
                className="card-elevated p-6 space-y-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-foreground">{exp.position}</h3>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {exp.type}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>

                {/* Responsibilities */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Key Responsibilities:</h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((responsibility, i) => (
                      <li key={i} className="flex items-start space-x-2 text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start space-x-2 text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}