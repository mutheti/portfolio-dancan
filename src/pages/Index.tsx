import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { Blog } from "@/components/Blog";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Blog />
        <Testimonials />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <div className="text-lg font-semibold text-gradient">
              Dancan Murithi
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Software Engineer passionate about building scalable solutions 
              that solve real-world problems.
            </p>
            <div className="text-xs text-muted-foreground">
              © 2024 Dancan Murithi. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
