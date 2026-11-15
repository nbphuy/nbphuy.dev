import fs from "node:fs/promises";
import path from "node:path";
import { createClient as createSupabaseJsClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import {
  CERTIFICATIONS_DATA,
  CertificationItem,
  DEFAULT_PHOTOS,
  EXPERIENCE_DATA,
  ExperienceItem,
  PROJECTS_DATA,
  PhotoItem,
  ProjectItem,
} from "./portfolio-data";

export interface PortfolioOverrides {
  projects?: ProjectItem[];
  photos?: PhotoItem[];
  certifications?: CertificationItem[];
  experiences?: ExperienceItem[];
}

const OVERRIDES_FILE = path.join(
  process.cwd(),
  "data",
  "portfolio-overrides.json"
);

/**
 * Creates a stateless Supabase client suitable for use inside `"use cache"` scopes
 * (does not read request cookies).
 */
export function getPublicSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createSupabaseJsClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Creates a privileged Supabase Admin client (using Service Role / Secret Key)
 * strictly for server-side Admin CRUD route handlers.
 */
export function getAdminSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !serviceKey) return null;

  return createSupabaseJsClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function readLocalOverrides(): Promise<PortfolioOverrides> {
  try {
    const raw = await fs.readFile(OVERRIDES_FILE, "utf8");
    return JSON.parse(raw) as PortfolioOverrides;
  } catch {
    return {};
  }
}

export async function writeLocalOverrides(
  overrides: PortfolioOverrides
): Promise<boolean> {
  try {
    await fs.mkdir(path.dirname(OVERRIDES_FILE), { recursive: true });
    await fs.writeFile(
      OVERRIDES_FILE,
      JSON.stringify(overrides, null, 2),
      "utf8"
    );
    return true;
  } catch {
    // On read-only serverless filesystems (e.g., Vercel), primary persistence is Supabase Postgres
    return false;
  }
}

/**
 * Fetches all projects (Supabase Postgres -> Local Overrides -> Default Static Data)
 */
export async function getAllProjects(): Promise<ProjectItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("portfolio-projects");

  const supabase = getPublicSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: String(row.id),
          title: String(row.title),
          role: row.role ? String(row.role) : undefined,
          period: row.period ? String(row.period) : undefined,
          description: String(row.description),
          highlights: Array.isArray(row.highlights)
            ? (row.highlights as string[])
            : [],
          tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
          thumbnailType:
            (row.thumbnail_type as ProjectItem["thumbnailType"]) || "accent",
          thumbnailImage: row.thumbnail_image
            ? String(row.thumbnail_image)
            : undefined,
          thumbnailAlt: row.thumbnail_alt
            ? String(row.thumbnail_alt)
            : undefined,
          accentGradient: row.accent_gradient
            ? String(row.accent_gradient)
            : undefined,
          links: Array.isArray(row.links)
            ? (row.links as ProjectItem["links"])
            : [],
          isOriginal: Boolean(row.is_original),
        }));
      }
    } catch {
      // Fallback below
    }
  }

  const overrides = await readLocalOverrides();
  if (overrides.projects && overrides.projects.length > 0) {
    return overrides.projects;
  }

  return PROJECTS_DATA;
}

/**
 * Fetches all certifications (Supabase Postgres -> Local Overrides -> Default Static Data)
 */
export async function getAllCertifications(): Promise<CertificationItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("portfolio-certifications");

  const supabase = getPublicSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("certifications")
        .select("*")
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: String(row.id),
          title: String(row.title),
          issuer: String(row.issuer),
          platform: row.platform ? String(row.platform) : undefined,
          badgeText: row.badge_text ? String(row.badge_text) : undefined,
          category:
            (row.category as CertificationItem["category"]) || "AI & Data",
        }));
      }
    } catch {
      // Fallback below
    }
  }

  const overrides = await readLocalOverrides();
  if (overrides.certifications && overrides.certifications.length > 0) {
    return overrides.certifications;
  }

  return CERTIFICATIONS_DATA;
}

/**
 * Fetches all work experiences (Supabase Postgres -> Local Overrides -> Default Static Data)
 */
export async function getAllExperiences(): Promise<ExperienceItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("portfolio-experiences");

  const supabase = getPublicSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: String(row.id),
          company: String(row.company),
          role: String(row.role),
          type: String(row.type),
          period: String(row.period),
          points: Array.isArray(row.points)
            ? (row.points as ExperienceItem["points"])
            : [],
        }));
      }
    } catch {
      // Fallback below
    }
  }

  const overrides = await readLocalOverrides();
  if (overrides.experiences && overrides.experiences.length > 0) {
    return overrides.experiences;
  }

  return EXPERIENCE_DATA;
}

/**
 * Helper to get default static photos for seeding/fallback
 */
export function getDefaultPhotos(): PhotoItem[] {
  return DEFAULT_PHOTOS;
}
