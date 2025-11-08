-- Hero section copy
INSERT INTO public.hero_content (headline, subheadline, summary, roles, resume_url, contact_cta, profile_image_url, background_image_url)
SELECT
  'Dancan Murithi',
  'Building scalable fintech, web, and mobile products across Africa.',
  'Results-driven Software Engineer specializing in scalable web and mobile applications. Expert in full-stack development with Java, Kotlin, Flutter, React, and cloud platforms.',
  ARRAY['Software Engineer', 'Full-Stack Developer', 'Mobile Developer', 'Backend Specialist'],
  'https://example.com/resume.pdf',
  'Get In Touch',
  'https://example.com/profile.png',
  'https://example.com/background.png'
WHERE NOT EXISTS (SELECT 1 FROM public.hero_content);

-- Contact preferences
INSERT INTO public.contact_settings (email, phone, location, calendar_url, whatsapp_url, preferred_response_time)
VALUES (
  'muthetidan@gmail.com',
  '+254790449157',
  'Nairobi, Kenya',
  'https://cal.com/dancan',
  'https://wa.me/254790449157',
  'Replies within 24 hours'
);

-- Social links
INSERT INTO public.social_links (platform, url, icon, order_index, is_primary) VALUES
  ('LinkedIn', 'https://linkedin.com/in/dancan-murithi-6843422bb', 'linkedin', 1, true),
  ('GitHub', 'https://github.com/dancanmurithi', 'github', 2, false),
  ('Twitter', 'https://twitter.com/dancanmurithi', 'twitter', 3, false),
  ('YouTube', 'https://youtube.com/@dancanmurithi', 'youtube', 4, false)
;

-- Experience timeline
INSERT INTO public.experiences (company, position, location, period, type, description, responsibilities, achievements, tech, order_index) VALUES
(
  'Bamaki Solutions',
  'Software Engineer (Remote)',
  'Nairobi, Kenya',
  'Jan 2024 – Present',
  'Full-time',
  'Design, build, and ship multi-tenant fintech and logistics platforms for clients across Africa.',
  ARRAY[
    'Architected scalable Node.js/Supabase backends for payment reconciliation dashboards',
    'Led Flutter and React feature delivery from ideation to release',
    'Coordinated M-Pesa integrations across STK, B2B, and transaction status APIs'
  ],
  ARRAY[
    'Launched donation platform processing 5,000+ monthly transactions',
    'Reduced Firestore reads by 40% via batched caching strategy',
    'Introduced automated CI pipelines, cutting deployment time by 60%'
  ],
  ARRAY['React', 'Flutter', 'Supabase', 'Node.js', 'AWS', 'M-Pesa Daraja'],
  1
),
(
  'Oseo Communication Limited',
  'Software Engineer',
  'Nairobi, Kenya',
  'May 2024 – Present',
  'Full-time',
  'Build and maintain mobile/web tooling for SIM registration, airtime auditing, and agent operations.',
  ARRAY[
    'Implemented Android + web apps for field agent onboarding and float reconciliation',
    'Created REST + Firebase services for real-time sales dashboards',
    'Rolled out secure network infrastructure and support processes'
  ],
  ARRAY[
    'Reduced onboarding time by 40% through workflow automation',
    'Cut reconciliation discrepancies by 70% with automated checks'
  ],
  ARRAY['Android', 'Firebase', 'React', 'AWS EC2', 'MySQL', 'M-Pesa'],
  2
);

-- Education history
INSERT INTO public.education (institution, degree, location, graduation_date, grade, highlights)
VALUES (
  'Masinde Muliro University of Science & Technology',
  'Bachelor of Science in Computer Science',
  'Kakamega, Kenya',
  'Dec 2024',
  'Second Class Honors (Upper Division)',
  ARRAY[
    'Led campus developer community events',
    'Researched scalable payment architectures for SMEs'
  ]
);

-- Skills categories
INSERT INTO public.skills (category, skills, order_index) VALUES
  ('Programming Languages & Frameworks', ARRAY['Java', 'Kotlin', 'Dart', 'TypeScript', 'React', 'Node.js', 'Flutter'], 1),
  ('Payments & Integrations', ARRAY['M-Pesa Daraja', 'Africa''s Talking', 'Stripe', 'REST APIs', 'Supabase Functions'], 2),
  ('Cloud & DevOps', ARRAY['AWS', 'Firebase', 'Render', 'Docker', 'CI/CD'], 3),
  ('Soft Skills', ARRAY['Client Communication', 'Team Leadership', 'Technical Mentorship'], 4);

-- Testimonials
INSERT INTO public.testimonials (name, role, company, avatar_url, content, rating, featured, order_index, status) VALUES
(
  'Grace K.',
  'Head of Digital Products',
  'FinServe Africa',
  'https://example.com/avatars/grace.jpg',
  'Dancan reimagined our payment infrastructure—STK push success rates improved immediately and the entire system feels resilient.',
  5,
  true,
  1,
  'approved'
),
(
  'Michael C.',
  'Product Manager',
  'InnovateLabs',
  'https://example.com/avatars/michael.jpg',
  'From architecture diagrams to deployment, he handled everything with clarity and speed. Communication was excellent throughout.',
  5,
  false,
  2,
  'approved'
);

-- Articles
INSERT INTO public.articles (title, summary, url, image_url, published_at, read_time, tags, platform, featured) VALUES
(
  'Scaling M-Pesa Integrations with Supabase Edge Functions',
  'How we orchestrated 10K+ daily transactions with automated reconciliation, error recovery, and observability built on Supabase.',
  'https://blog.example.com/supabase-mpesa-scale',
  'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80',
  '2024-08-12T00:00:00+03:00',
  9,
  ARRAY['Fintech', 'Supabase', 'Edge Functions'],
  'blog',
  true
),
(
  'Designing Full-Stack Flutter + Supabase Apps for Offline Field Teams',
  'Patterns that keep agents productive despite spotty network coverage, including conflict resolution and background sync.',
  'https://medium.com/@dancanmurithi/flutter-supabase-offline',
  'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1200&q=80',
  '2024-05-22T00:00:00+03:00',
  11,
  ARRAY['Flutter', 'Mobile', 'Architecture'],
  'medium',
  false
);

-- Blog tags and mappings
INSERT INTO public.blog_tags (tag, description) VALUES
  ('Supabase', 'Guides on Supabase and edge functions'),
  ('Fintech', 'Payment integrations, reconciliation, and compliance'),
  ('Flutter', 'Cross-platform mobile development tips')
ON CONFLICT (tag) DO NOTHING;

INSERT INTO public.article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM public.articles a
JOIN public.blog_tags t ON t.tag = ANY(a.tags)
ON CONFLICT DO NOTHING;

-- Certifications
INSERT INTO public.certifications (name, issuer, issued_on, status, logo_url, verification_url, skills, order_index)
VALUES
  
  (
    'Bachelor of Science in Computer Science',
    'Masinde Muliro University of Science & Technology',
    '2024',
    'Completed',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop',
    '#',
    ARRAY['Computer Science', 'Algorithms', 'Software Engineering'],
    5
  )
ON CONFLICT (id) DO NOTHING;

