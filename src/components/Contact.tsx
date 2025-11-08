import { useMemo, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Send,
  GraduationCap,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tables } from "@/integrations/supabase/types";

type ContactSettings = Tables<"contact_settings">;
type SocialLink = Tables<"social_links">;
type EducationRecord = Tables<"education">;

const fallbackContact = {
  email: "muthetidan@gmail.com",
  phone: "+254 790 449 157",
  location: "Nairobi, Kenya",
};

const fallbackEducation = {
  degree: "Bachelor of Science in Computer Science",
  institution: "Masinde Muliro University of Science & Technology",
  location: "Kakamega, Kenya",
  graduation_date: "Dec 2024",
};

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setFormErrors(null);
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormErrors("Please fill in all fields before submitting.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setFormErrors("Please provide a valid email address.");
      return false;
    }

    setFormErrors(null);
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("contact-email", {
        body: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      });

      if (error || (result && !(result as { success?: boolean }).success)) {
        throw error ?? new Error("Unable to send message");
      }

      toast({
        title: "Message sent ✅",
        description: "Thanks for reaching out! I’ll reply within one business day.",
      });
      resetForm();
    } catch (err) {
      console.error("Error submitting contact form", err);
      toast({
        title: "Something went wrong",
        description:
          "Unable to send your message right now. Please try again later or email muthetidan@gmail.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { data: contactData, isLoading: contactLoading, error: contactError } = useQuery({
    queryKey: ["contact-settings"],
    queryFn: async () => {
      const [{ data: settings }, { data: socials }] = await Promise.all([
        supabase.from("contact_settings").select("*").limit(1),
        supabase.from("social_links").select("*").order("order_index", { ascending: true }),
      ]);

      return {
        settings: (settings as ContactSettings[] | null)?.[0] ?? null,
        socials: (socials as SocialLink[]) ?? [],
      };
    },
    staleTime: 1000 * 60 * 60,
  });

  const { data: educationData, isLoading: educationLoading } = useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const { data } = await supabase
        .from("education")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);
      return (data as EducationRecord[]) ?? [];
    },
    staleTime: 1000 * 60 * 60,
  });

  const contactInfo = useMemo(() => {
    const settings = !contactError && contactData?.settings ? contactData.settings : null;
    const socials = !contactError ? contactData?.socials ?? [] : [];

    const email = settings?.email ?? fallbackContact.email;
    const phone = settings?.phone ?? fallbackContact.phone;
    const location = settings?.location ?? fallbackContact.location;

    const linkedin = socials.find(
      (social) => social.platform?.toLowerCase() === "linkedin" && social.url
    );

    return [
      {
        icon: Mail,
        label: "Email",
        value: email,
        href: `mailto:${email}`,
      },
      {
        icon: Phone,
        label: "Phone",
        value: phone,
        href: `tel:${phone.replace(/\s|\(|\)|\+/g, "")}`,
      },
      {
        icon: MapPin,
        label: "Location",
        value: location,
        href: null,
      },
      ...(linkedin
        ? [
            {
              icon: Linkedin,
              label: "LinkedIn",
              value: "Connect with me",
              href: linkedin.url ?? undefined,
            },
          ]
        : []),
    ];
  }, [contactData, contactError]);

  const educationInfo = useMemo(() => {
    if (educationData && educationData.length > 0) {
      const record = educationData[0];
      return {
        degree: record.degree ?? fallbackEducation.degree,
        institution: record.institution ?? fallbackEducation.institution,
        location: record.location ?? fallbackEducation.location,
        graduation_date: record.graduation_date ?? fallbackEducation.graduation_date,
      };
    }
    return fallbackEducation;
  }, [educationData]);

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let&apos;s discuss how we can work together to bring your next project to life.
              I&apos;m always open to new opportunities and interesting challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <Card className="card-elevated p-8 space-y-6 animate-slide-in-left">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Send a Message</h3>
                <p className="text-muted-foreground">
                  Fill out the form below and I&apos;ll get back to you as soon as possible.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(event) =>
                        setFormData((prev) => ({ ...prev, name: event.target.value }))
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData((prev) => ({ ...prev, email: event.target.value }))
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, subject: event.target.value }))
                    }
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or how I can help..."
                    rows={5}
                    value={formData.message}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, message: event.target.value }))
                    }
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {formErrors && <p className="text-sm text-destructive">{formErrors}</p>}

                <Button
                  type="submit"
                  className="w-full gradient-accent text-white hover:opacity-90 transition-smooth"
                  disabled={isSubmitting}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>

            {/* Contact info & additional sections */}
            <div className="space-y-8 animate-slide-in-right">
              {/* Contact information */}
              <Card className="card-elevated p-6 space-y-6">
                <h3 className="text-xl font-bold">Contact Information</h3>
                {contactLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Skeleton key={index} className="h-12 w-full rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contactInfo.map((info) => {
                      const IconComponent = info.icon;
                      const content = (
                        <div className="flex items-center space-x-3 group">
                          <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-smooth">
                            <IconComponent className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{info.label}</div>
                            <div className="text-sm text-muted-foreground group-hover:text-accent transition-smooth">
                              {info.value}
                            </div>
                          </div>
                        </div>
                      );

                      return info.href ? (
                        <a
                          key={info.label}
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="block transition-smooth hover:scale-105"
                        >
                          {content}
                        </a>
                      ) : (
                        <div key={info.label}>{content}</div>
                      );
                    })}
                  </div>
                )}
              </Card>

              {/* Education */}
              <Card className="card-elevated p-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-accent" />
                  <h3 className="text-xl font-bold">Education</h3>
                </div>
                {educationLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="font-medium text-foreground">{educationInfo.degree}</div>
                    <div className="text-sm text-muted-foreground">
                      {educationInfo.institution}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {educationInfo.location}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Graduated: {educationInfo.graduation_date}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}