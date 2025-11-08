import { useState, useEffect } from "react";
import { MapPin, Mail, Phone, Linkedin, Github, Download, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const roles = [
  "Software Engineer",
  "Full-Stack Developer", 
  "Mobile Developer",
  "Backend Specialist"
];

const fallbackBackgroundUrl =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80";
const localBackgroundUrl = "/background.png";

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [hasImageError, setHasImageError] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState(fallbackBackgroundUrl);
  const [isDownloadingResume, setIsDownloadingResume] = useState(false);
  const { toast } = useToast();
  const resumeUrl = "/resume.pdf";

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = localBackgroundUrl;
    img.onload = () => setBackgroundUrl(localBackgroundUrl);
  }, []);

  const handleScrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadResume = () => {
    if (!resumeUrl) {
      toast({
        title: "Resume unavailable",
        description: "Please check back shortly or reach out via the contact form.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloadingResume(true);
    toast({
      title: "Preparing download",
      description: "Your resume download will begin in a moment.",
    });

    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Dancan-Murithi-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setIsDownloadingResume(false), 1500);
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background imagery */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.35),_transparent_55%),_linear-gradient(to_bottom_right,_rgba(15,23,42,0.45),_rgba(15,23,42,0.25))]" />
      <div className="absolute inset-0 -z-10 bg-background/30 backdrop-blur-2xl" />
      
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
        <div className="relative mx-auto max-w-6xl space-y-12 animate-fade-in rounded-3xl border border-white/10 bg-white/35 p-8 sm:p-10 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.55)] backdrop-blur-2xl transition-all dark:border-white/5 dark:bg-slate-900/55">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,300px),1fr] items-center gap-10 lg:gap-14 text-center lg:text-left">
            <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur lg:mx-0 lg:h-52 lg:w-52">
              {hasImageError ? (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/10 via-white/10 to-slate-900/30">
                  <User className="h-16 w-16 text-white/70" />
                </div>
              ) : (
                <img
                  src="/profile.png"
                  alt="Portrait of Dancan Murithi"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={() => setHasImageError(true)}
                />
              )}
              <div className="pointer-events-none absolute inset-0 rounded-full border border-white/10" />
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                  <span className="text-foreground drop-shadow-[0_8px_16px_rgba(15,23,42,0.2)]">Dancan</span>
                  <span className="text-gradient-cool ml-4 drop-shadow-[0_8px_16px_rgba(59,130,246,0.35)]">Murithi</span>
                </h1>
                
                <div className="text-xl md:text-2xl text-muted-foreground/90 min-h-[2rem]">
                  <span className={`transition-all duration-500 ${isTyping ? "opacity-100" : "opacity-0"}`}>
                    {roles[currentRole]}
                  </span>
                </div>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed">
                Results-driven Software Engineer specializing in scalable web and mobile applications. Expert in full-stack
                development with Java, Kotlin, Flutter, React, and cloud platforms.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-2">
                <Button
                  size="lg"
                  className="gradient-accent text-white hover:opacity-90 transition-smooth glow-accent"
                  onClick={handleDownloadResume}
                  disabled={isDownloadingResume}
                >
                  {isDownloadingResume ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Preparing...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download Resume
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-accent text-accent hover:bg-accent hover:text-white transition-smooth"
                  onClick={handleScrollToContact}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>

          {/* Contact info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="card-elevated p-4 text-center space-y-2">
              <MapPin className="h-5 w-5 text-accent mx-auto" />
              <div className="text-sm text-muted-foreground">Location</div>
              <div className="font-medium">Nairobi, Kenya</div>
            </Card>
            
            <Card className="card-elevated p-4 text-center space-y-2">
              <Mail className="h-5 w-5 text-accent mx-auto" />
              <div className="text-sm text-muted-foreground">Email</div>
              <a href="mailto:muthetidan@gmail.com" className="font-medium hover:text-accent transition-smooth">
                muthetidan@gmail.com
              </a>
            </Card>
            
            <Card className="card-elevated p-4 text-center space-y-2">
              <Phone className="h-5 w-5 text-accent mx-auto" />
              <div className="text-sm text-muted-foreground">Phone</div>
              <a href="tel:+254790449157" className="font-medium hover:text-accent transition-smooth">
                (+254) 790 449 157
              </a>
            </Card>
            
            <Card className="card-elevated p-4 text-center space-y-2">
              <Linkedin className="h-5 w-5 text-accent mx-auto" />
              <div className="text-sm text-muted-foreground">LinkedIn</div>
              <a 
                href="https://linkedin.com/in/dancan-murithi-6843422bb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium hover:text-accent transition-smooth"
              >
                Connect
              </a>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}