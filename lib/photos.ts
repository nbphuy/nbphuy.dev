import fs from "node:fs/promises";
import path from "node:path";
import { cacheLife, cacheTag } from "next/cache";
import { DEFAULT_PHOTOS, PhotoItem } from "./portfolio-data";
import { getPublicSupabaseClient, readLocalOverrides } from "./portfolio-db";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export async function getAllPhotos(): Promise<PhotoItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("portfolio-photos");

  // 1. Check Supabase PostgreSQL `photos` table first
  const supabase = getPublicSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: String(row.id),
          src: String(row.src),
          title: String(row.title),
          caption: String(row.caption),
          category:
            (row.category as PhotoItem["category"]) || "Street & Travel",
          date: row.date ? String(row.date) : undefined,
          location: row.location ? String(row.location) : undefined,
          aspect: (row.aspect as PhotoItem["aspect"]) || "landscape",
        }));
      }
    } catch {
      // Fallback below
    }
  }

  // 2. Check local overrides file (if Admin edited via Local CMS)
  const overrides = await readLocalOverrides();
  if (overrides.photos && overrides.photos.length > 0) {
    return overrides.photos;
  }

  // 3. Fallback to default static photos + public/img/photos/ directory auto-discovery
  const photos: PhotoItem[] = [...DEFAULT_PHOTOS];
  const existingSrcs = new Set(photos.map((p) => p.src));

  try {
    const photosDir = path.join(process.cwd(), "public", "img", "photos");
    const files = await fs.readdir(photosDir);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!IMAGE_EXTENSIONS.has(ext)) continue;

      const src = `/img/photos/${file}`;
      if (existingSrcs.has(src)) continue;

      const baseName = path.basename(file, ext);
      const formattedTitle = baseName
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      photos.unshift({
        id: `custom-${baseName}`,
        src,
        title: formattedTitle,
        caption: "Personal photography collection.",
        category: "Street & Travel",
        location: "Vietnam",
        aspect: "landscape",
      });
    }
  } catch {
    // Directory is optional or empty
  }

  return photos;
}
