-- Create certifications table backed by existing UI data
CREATE TABLE public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issued_on TEXT,
  status TEXT DEFAULT 'Active',
  logo_url TEXT,
  verification_url TEXT,
  skills TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view certifications"
ON public.certifications FOR SELECT USING (true);

CREATE POLICY "Service role manages certifications"
ON public.certifications FOR ALL USING (true);

CREATE TRIGGER update_certifications_updated_at
BEFORE UPDATE ON public.certifications
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

