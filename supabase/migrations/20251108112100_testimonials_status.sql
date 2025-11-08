-- Add status column to testimonials for moderation workflow
ALTER TABLE public.testimonials
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'approved';

ALTER TABLE public.testimonials
ADD COLUMN IF NOT EXISTS email TEXT;

UPDATE public.testimonials
SET status = 'approved'
WHERE status IS NULL;

-- Adjust RLS policies so public sees only approved testimonials and can submit pending ones
DROP POLICY IF EXISTS "Anyone can view testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Public can submit testimonials" ON public.testimonials;

CREATE POLICY "Public can view approved testimonials"
ON public.testimonials
FOR SELECT
TO anon, authenticated
USING (status = 'approved');

CREATE POLICY "Public can submit testimonials"
ON public.testimonials
FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'pending');

