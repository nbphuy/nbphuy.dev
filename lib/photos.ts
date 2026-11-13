import fs from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";
import { DEFAULT_PHOTOS, PhotoItem } from "./portfolio-data";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export async function getAllPhotos(): Promise<PhotoItem[]> {
  "use cache";
  cacheLife("hours");

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
