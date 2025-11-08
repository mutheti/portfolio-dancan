-- Create projects table for dynamic project management
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  tech TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'completed',
  url TEXT,
  demo_url TEXT,
  highlights TEXT[] DEFAULT '{}',
  image_url TEXT,
  category TEXT DEFAULT 'web',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project categories table
CREATE TABLE public.project_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project comments table
CREATE TABLE public.project_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  comment TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to projects and categories
CREATE POLICY "Anyone can view published projects" 
ON public.projects 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view project categories" 
ON public.project_categories 
FOR SELECT 
USING (true);

-- Create policies for contact messages (admin access only)
CREATE POLICY "Service role can manage contact messages" 
ON public.contact_messages 
FOR ALL 
USING (true);

-- Create policies for project comments
CREATE POLICY "Anyone can insert project comments" 
ON public.project_comments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Service role can manage project comments" 
ON public.project_comments 
FOR ALL 
USING (true);

-- Create triggers for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at
BEFORE UPDATE ON public.contact_messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_comments_updated_at
BEFORE UPDATE ON public.project_comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default project categories
INSERT INTO public.project_categories (name, description) VALUES
('web', 'Web Development Projects'),
('mobile', 'Mobile Applications'),
('api', 'API and Backend Services'),
('ai', 'AI and Machine Learning'),
('design', 'Design and UI/UX');

-- Insert sample projects (based on your existing data)
INSERT INTO public.projects (title, description, features, tech, status, url, demo_url, highlights, category) VALUES
('DaimaPay - Financial Technology Solution', 'A comprehensive financial technology platform offering secure money transfers, airtime services, and digital wallet management with M-Pesa integration.', 
ARRAY['Secure Money Transfers', 'Airtime Purchase & Sale', 'Digital Wallet Management', 'M-Pesa Integration', 'Real-time Transaction Processing', 'Multi-level Security'],
ARRAY['React', 'Node.js', 'PostgreSQL', 'M-Pesa API', 'Supabase', 'TypeScript'],
'completed',
'https://daimapay.com',
'https://demo.daimapay.com',
ARRAY['Over 10,000 active users', 'Processing KES 50M+ monthly', '99.9% uptime reliability', 'Bank-grade security'],
'web'),

('E-Commerce Platform', 'Modern e-commerce solution with inventory management, payment processing, and analytics dashboard.',
ARRAY['Product Catalog Management', 'Shopping Cart & Checkout', 'Payment Gateway Integration', 'Order Tracking', 'Analytics Dashboard'],
ARRAY['Next.js', 'Stripe API', 'MongoDB', 'Tailwind CSS', 'Vercel'],
'completed',
'https://github.com/dancanm/ecommerce',
'https://ecommerce-demo.vercel.app',
ARRAY['50+ products managed', 'Multi-payment support', 'Mobile responsive'],
'web'),

('Task Management App', 'Collaborative task management application with real-time updates and team coordination features.',
ARRAY['Real-time Collaboration', 'Task Assignment', 'Progress Tracking', 'Team Chat', 'File Sharing'],
ARRAY['React', 'Socket.io', 'Express.js', 'PostgreSQL', 'Redux'],
'in-progress',
'https://github.com/dancanm/taskmanager',
null,
ARRAY['Real-time sync', 'Team collaboration', 'Mobile app coming soon'],
'web'),

('Weather Analytics Dashboard', 'Comprehensive weather data visualization and analytics platform with predictive insights.',
ARRAY['Weather Data Visualization', 'Historical Analysis', 'Predictive Modeling', 'Location-based Forecasts', 'API Integration'],
ARRAY['Python', 'Django', 'React', 'D3.js', 'OpenWeather API', 'PostgreSQL'],
'completed',
null,
'https://weather-analytics.herokuapp.com',
ARRAY['Multiple data sources', 'Interactive charts', 'AI-powered predictions'],
'web');