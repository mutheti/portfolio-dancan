import { useMemo, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Quote, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type TestimonialRecord = Tables<"testimonials">;

const fallbackTestimonials = [
  {
    name: "Grace K.",
    role: "Head of Digital Products",
    company: "FinServe Africa",
    avatar_url: "",
    content:
      "Dancan reimagined our payment infrastructure—STK push success rates improved immediately and the entire system feels resilient.",
    rating: 5,
    status: "approved",
  },
  {
    name: "Michael C.",
    role: "Product Manager",
    company: "InnovateLabs",
    avatar_url: "",
    content:
      "From architecture diagrams to deployment, he handled everything with clarity and speed. Communication was excellent throughout.",
    rating: 5,
    status: "approved",
  },
];

export function Testimonials() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    company: "",
    rating: 5,
    content: "",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "approved")
        .order("featured", { ascending: false })
        .order("order_index", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as TestimonialRecord[];
    },
    staleTime: 1000 * 60 * 10,
  });

  const testimonials = useMemo(() => {
    if (!error && data && data.length > 0) {
      return data;
    }
    return fallbackTestimonials;
  }, [data, error]);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "",
      company: "",
      rating: 5,
      content: "",
    });
    setFormErrors(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.content.trim()) {
      setFormErrors("Please provide your name and feedback before submitting.");
      return;
    }

    const rating = Math.min(5, Math.max(1, Number(formData.rating) || 5));

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("testimonials").insert({
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        role: formData.role.trim() || null,
        company: formData.company.trim() || null,
        rating,
        content: formData.content.trim(),
        status: "pending",
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Thanks for the feedback!",
        description: "Submission received — I’ll be in touch soon.",
      });
      setIsDialogOpen(false);
      setFormErrors(null);
      resetForm();
    } catch (submissionError) {
      console.error("Error submitting testimonial", submissionError);
      toast({
        title: "Unable to submit feedback",
        description: "Please try again or reach out via the contact form.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Quote className="w-4 h-4" />
            <span className="text-sm font-medium">Client Testimonials</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            What People Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feedback from clients, colleagues, and partners I've had the privilege to work with
            throughout my career.
          </p>
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                resetForm();
              } else {
                setFormErrors(null);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-6">
                Share Your Experience
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share your experience</DialogTitle>
                <DialogDescription>
                  Tell me how it was working together. Your feedback will be reviewed before it appears on the site.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="testimonial-name">Name*</Label>
                    <Input
                      id="testimonial-name"
                      value={formData.name}
                      onChange={(event) =>
                        setFormData((prev) => ({ ...prev, name: event.target.value }))
                      }
                      placeholder="Your full name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="testimonial-email">Email</Label>
                    <Input
                      id="testimonial-email"
                      type="email"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData((prev) => ({ ...prev, email: event.target.value }))
                      }
                      placeholder="you@example.com"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="testimonial-role">Role</Label>
                    <Input
                      id="testimonial-role"
                      value={formData.role}
                      onChange={(event) =>
                        setFormData((prev) => ({ ...prev, role: event.target.value }))
                      }
                      placeholder="Your title or relationship"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="testimonial-company">Company</Label>
                    <Input
                      id="testimonial-company"
                      value={formData.company}
                      onChange={(event) =>
                        setFormData((prev) => ({ ...prev, company: event.target.value }))
                      }
                      placeholder="Organisation (optional)"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="testimonial-rating">Rating (1-5)</Label>
                    <Input
                      id="testimonial-rating"
                      type="number"
                      min={1}
                      max={5}
                      value={formData.rating}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          rating: Number(event.target.value),
                        }))
                      }
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testimonial-content">Feedback*</Label>
                  <Textarea
                    id="testimonial-content"
                    value={formData.content}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, content: event.target.value }))
                    }
                    placeholder="Share your experience working together..."
                    rows={5}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                {formErrors && <p className="text-sm text-destructive">{formErrors}</p>}
                <DialogFooter className="flex justify-between sm:justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit feedback"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={`testimonial-skeleton-${index}`}
                className="p-6 border-border/50 bg-card/50 backdrop-blur"
              >
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-20 w-full mb-6" />
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </Card>
            ))}

          {!isLoading &&
            testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in border-border/50 bg-card/50 backdrop-blur"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating ?? 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <Quote className="w-8 h-8 text-primary/20 mb-4" />

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={testimonial.avatar_url ?? ""} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-primary">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
