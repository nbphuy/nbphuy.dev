-- =============================================================================
-- SUPABASE POSTGRESQL SCHEMA & ROW LEVEL SECURITY (RLS)
-- Project: Nguyen Binh Phuong Huy — Personal Website & Portfolio
-- =============================================================================

-- Enable UUID generation extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. Helper Function: Check if the current authenticated user is Admin
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT COALESCE(
    (auth.jwt() ->> 'email') = 'nguyenbinhphuonghuy.work@gmail.com'
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin',
    false
  );
$$;

-- -----------------------------------------------------------------------------
-- 2. Table: blog_posts
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Visitors can only read published blog posts
DROP POLICY IF EXISTS "Public visitors can read published blog posts" ON public.blog_posts;
CREATE POLICY "Public visitors can read published blog posts"
  ON public.blog_posts
  FOR SELECT
  USING (published = true OR public.is_admin());

-- Only Admin can insert, update, or delete blog posts
DROP POLICY IF EXISTS "Admin full access on blog_posts" ON public.blog_posts;
CREATE POLICY "Admin full access on blog_posts"
  ON public.blog_posts
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 3. Table: projects
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  role TEXT,
  period TEXT,
  description TEXT NOT NULL,
  highlights JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  thumbnail_type TEXT NOT NULL DEFAULT 'accent',
  thumbnail_image TEXT,
  thumbnail_alt TEXT,
  accent_gradient TEXT,
  links JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_original BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Visitors can read all projects
DROP POLICY IF EXISTS "Public visitors can read projects" ON public.projects;
CREATE POLICY "Public visitors can read projects"
  ON public.projects
  FOR SELECT
  USING (true);

-- Only Admin can insert, update, or delete projects
DROP POLICY IF EXISTS "Admin full access on projects" ON public.projects;
CREATE POLICY "Admin full access on projects"
  ON public.projects
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 4. Table: photos
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.photos (
  id TEXT PRIMARY KEY,
  src TEXT NOT NULL,
  title TEXT NOT NULL,
  caption TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Street & Travel',
  date TEXT,
  location TEXT DEFAULT 'Vietnam',
  aspect TEXT DEFAULT 'landscape',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Visitors can read all photos
DROP POLICY IF EXISTS "Public visitors can read photos" ON public.photos;
CREATE POLICY "Public visitors can read photos"
  ON public.photos
  FOR SELECT
  USING (true);

-- Only Admin can insert, update, or delete photos
DROP POLICY IF EXISTS "Admin full access on photos" ON public.photos;
CREATE POLICY "Admin full access on photos"
  ON public.photos
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 5. Table: certifications
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.certifications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  platform TEXT,
  badge_text TEXT,
  category TEXT NOT NULL DEFAULT 'AI & Data',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public visitors can read certifications" ON public.certifications;
CREATE POLICY "Public visitors can read certifications"
  ON public.certifications
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admin full access on certifications" ON public.certifications;
CREATE POLICY "Admin full access on certifications"
  ON public.certifications
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 6. Table: experiences
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.experiences (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  type TEXT NOT NULL,
  period TEXT NOT NULL,
  points JSONB NOT NULL DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public visitors can read experiences" ON public.experiences;
CREATE POLICY "Public visitors can read experiences"
  ON public.experiences
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admin full access on experiences" ON public.experiences;
CREATE POLICY "Admin full access on experiences"
  ON public.experiences
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
