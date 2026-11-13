"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PhotoItem } from "@/lib/portfolio-data";
import { Camera, ChevronLeft, ChevronRight, FolderPlus, MapPin, X } from "lucide-react";

const CATEGORIES = ["All", "Portrait", "Campus & Life", "Street & Travel", "Creative"] as const;

export function PhotoGallery({ photos }: { photos: PhotoItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredPhotos =
    selectedCategory === "All"
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredPhotos.length
        );
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, filteredPhotos.length]);

  const activePhoto = activeIndex !== null ? filteredPhotos[activeIndex] : null;

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelectedCategory(category);
                setActiveIndex(null);
              }}
              className={`cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
                isActive
                  ? "bg-gradient-to-r from-[#00cfff] to-[#0088ff] font-semibold text-black shadow-[0_4px_15px_rgba(0,207,255,0.25)]"
                  : "border border-[#30363d] bg-[#1a1d24] text-[#8b949e] hover:border-[#00cfff]/50 hover:text-[#f0f6fc]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#30363d] bg-white/[0.02] p-12 text-center">
          <Camera className="mx-auto mb-3 size-8 text-[#00cfff]" />
          <p className="text-base font-medium text-[#f0f6fc]">
            No photos in the &ldquo;{selectedCategory}&rdquo; category yet.
          </p>
          <p className="mt-1 text-sm text-[#8b949e]">
            Switch to &ldquo;All&rdquo; or drop new images into{" "}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-[#00cfff]">
              public/img/photos/
            </code>
            .
          </p>
        </div>
      ) : (
        <div className="animate-fade-in grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setActiveIndex(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveIndex(index);
                }
              }}
              className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00cfff]/40 hover:shadow-[0_15px_30px_rgba(0,0,0,0.45)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1a1d24]">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`transition-transform duration-500 group-hover:scale-105 ${
                    photo.id === "hcmiu-campus"
                      ? "object-contain p-8"
                      : "object-cover"
                  }`}
                />
                <div className="absolute top-3 left-3">
                  <span className="rounded-md bg-black/65 px-2.5 py-1 text-[11px] font-medium text-[#00cfff] backdrop-blur-sm">
                    {photo.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="text-base font-semibold text-[#f0f6fc] group-hover:text-[#00cfff]">
                    {photo.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#8b949e]">
                    {photo.caption}
                  </p>
                </div>

                {photo.location && (
                  <div className="mt-4 flex items-center gap-1.5 border-t border-[#30363d]/50 pt-3 text-xs text-[#8b949e]">
                    <MapPin className="size-3.5 text-[#00cfff]" />
                    <span>{photo.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Auto-discovery Folder Info Card */}
      <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#30363d]/80 bg-[#1a1d24]/60 p-6 sm:flex-row sm:items-center">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00cfff]/10 text-[#00cfff]">
            <FolderPlus className="size-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#f0f6fc]">
              Automatic Photo Folder Sync Enabled
            </h4>
            <p className="mt-0.5 text-xs text-[#8b949e]">
              Any <code className="text-[#00cfff]">.jpg</code>,{" "}
              <code className="text-[#00cfff]">.png</code>, or{" "}
              <code className="text-[#00cfff]">.webp</code> photo placed inside{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5 text-[#f0f6fc]">
                public/img/photos/
              </code>{" "}
              is automatically discovered and rendered in this gallery, or you can customize metadata in{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5 text-[#f0f6fc]">
                lib/portfolio-data.ts
              </code>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#30363d] bg-[#1a1d24] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#30363d] px-5 py-3.5">
              <div>
                <h3 className="text-base font-semibold text-[#f0f6fc]">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-[#00cfff]">{activePhoto.category}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close lightbox"
                className="cursor-pointer rounded-lg p-1.5 text-[#8b949e] transition-colors hover:bg-[#262a33] hover:text-[#f0f6fc]"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="relative flex h-[55vh] w-full items-center justify-center bg-[#0f1115] p-4 sm:h-[65vh]">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                sizes="90vw"
                className="object-contain p-4"
              />

              {filteredPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev === null
                          ? null
                          : (prev - 1 + filteredPhotos.length) %
                            filteredPhotos.length
                      )
                    }
                    aria-label="Previous photo"
                    className="absolute left-3 cursor-pointer rounded-full border border-[#30363d] bg-[#1a1d24]/80 p-2.5 text-[#f0f6fc] transition-all hover:border-[#00cfff] hover:text-[#00cfff]"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev === null
                          ? null
                          : (prev + 1) % filteredPhotos.length
                      )
                    }
                    aria-label="Next photo"
                    className="absolute right-3 cursor-pointer rounded-full border border-[#30363d] bg-[#1a1d24]/80 p-2.5 text-[#f0f6fc] transition-all hover:border-[#00cfff] hover:text-[#00cfff]"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#30363d] px-5 py-4 text-sm text-[#8b949e]">
              <p>{activePhoto.caption}</p>
              {activePhoto.location && (
                <span className="inline-flex items-center gap-1 text-xs text-[#00cfff]">
                  <MapPin className="size-3.5" />
                  {activePhoto.location}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
