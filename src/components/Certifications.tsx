import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Award, ExternalLink, CheckCircle, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type CertificationRecord = Tables<"certifications">;

const fallbackCertifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    issued_on: "2024",
    status: "Active",
    logo_url:
      "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop",
    verification_url: "#",
    skills: ["Cloud Architecture", "AWS Services", "Infrastructure Design"],
  },
  {
    name: "Azure Developer Associate",
    issuer: "Microsoft",
    issued_on: "2023",
    status: "Active",
    logo_url:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop",
    verification_url: "#",
    skills: ["Azure", "DevOps", "Cloud Development"],
  },
  {
    name: "Google Cloud Professional",
    issuer: "Google Cloud",
    issued_on: "2023",
    status: "Active",
    logo_url:
      "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop",
    verification_url: "#",
    skills: ["GCP", "Kubernetes", "Microservices"],
  },
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    issued_on: "2022",
    status: "Active",
    logo_url:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=100&h=100&fit=crop",
    verification_url: "#",
    skills: ["Security", "Risk Management", "Compliance"],
  },
  {
    name: "Bachelor of Science in Computer Science",
    issuer: "Masinde Muliro University of Science & Technology",
    issued_on: "2024",
    status: "Completed",
    logo_url:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop",
    verification_url: "#",
    skills: ["Computer Science", "Algorithms", "Software Engineering"],
  },
];

export function Certifications() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["certifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certifications")
        .select("*")
        .order("order_index", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as CertificationRecord[];
    },
    staleTime: 1000 * 60 * 10,
  });

  const certifications = useMemo(() => {
    const source =
      !error && data && data.length > 0 ? data : (fallbackCertifications as CertificationRecord[]);

    return source.filter((cert) =>
      ["active", "completed"].includes((cert.status ?? "active").toLowerCase())
    );
  }, [data, error]);

  return (
    <section id="certifications" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">Professional Certifications</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Certifications & Credentials
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Industry-recognized certifications demonstrating expertise in cloud computing,
            security, and modern development practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={`cert-skeleton-${index}`}
                className="p-6 border-border/50 bg-card/50 backdrop-blur"
              >
                <div className="flex items-start gap-4">
                  <Skeleton className="w-16 h-16 rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-24" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-8 w-32" />
                  </div>
                </div>
              </Card>
            ))}

          {!isLoading &&
            certifications.map((cert, index) => (
            <Card
              key={cert.id ?? index}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in border-border/50 bg-card/50 backdrop-blur"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  {cert.logo_url ? (
                    <img
                      src={cert.logo_url}
                      alt={cert.issuer}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-accent/10">
                      <GraduationCap className="h-8 w-8 text-accent" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {cert.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    Issued: {cert.issued_on}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(cert.skills ?? []).map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80"
                    onClick={() => cert.verification_url && window.open(cert.verification_url, '_blank')}
                    disabled={!cert.verification_url}
                  >
                    Verify Credential
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
