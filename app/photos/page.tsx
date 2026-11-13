import type { Metadata } from "next";
import { getAllPhotos } from "@/lib/photos";
import { PhotoGallery } from "@/components/photo-gallery";

export const metadata: Metadata = {
  title: "Photos & Gallery",
  description:
    "Photography, portraits, and visual moments by Nguyen Binh Phuong Huy.",
};

export default async function PhotosPage() {
  const photos = await getAllPhotos();

  return (
    <main className="mx-auto w-full max-w-[1200px] px-5 pt-[110px] pb-[80px]">
      <h1 className="section-title">Photos &amp; Visuals</h1>
      <p className="mb-8 max-w-2xl text-sm text-[#8b949e]">
        Alongside software engineering, photography and color grading are my favorite creative outlets. Click any photo to view it in full resolution.
      </p>

      <PhotoGallery photos={photos} />
    </main>
  );
}
