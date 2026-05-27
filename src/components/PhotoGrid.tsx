"use client";

import { useEffect, useState } from "react";
import ImageLightbox from "./ImageLightbox";
import { supabase } from "../lib/supabase";

type Photo = {
  id: string;
  title: string | null;
  caption: string | null;
  image_url: string;
  sort_order: number | null;
  created_at: string | null;
};

export default function PhotoGrid() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    async function loadPhotos() {
      const { data, error } = await supabase
        .from("photos")
        .select("id, title, caption, image_url, sort_order, created_at")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("讀取照片失敗：", error);
        setPhotos([]);
      } else {
        setPhotos(data || []);
      }

      setLoading(false);
    }

    loadPhotos();
  }, []);

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-[#D8C7B2] bg-[#F6EFE4]/95 p-10 shadow-xl">
        <p className="text-[#7A665B]">照片讀取中...</p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="rounded-[2rem] border border-[#D8C7B2] bg-[#F6EFE4]/95 p-10 shadow-xl">
        <p className="tracking-[0.35em] text-[#9E2F31] font-black text-sm">
          OB GAME PHOTO DATABASE
        </p>
        <h3 className="mt-16 text-4xl font-black text-[#2B0707] md:text-6xl">
          等待照片上傳
        </h3>
        <p className="mt-6 text-lg text-[#7A665B]">
          後台上傳 OB 賽照片後，此區會自動整理為照片牆並可點選放大查看。
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-[2rem] border border-[#D8C7B2] bg-[#F6EFE4]/95 p-6 shadow-xl md:p-10">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="tracking-[0.35em] text-[#9E2F31] font-black text-sm">
              OB GAME PHOTO DATABASE
            </p>
            <h3 className="mt-4 text-4xl font-black text-[#2B0707] md:text-6xl">
              OB 賽照片牆
            </h3>
          </div>
          <p className="text-[#7A665B]">{photos.length} 張照片</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setSelectedPhoto(photo)}
              className="group overflow-hidden rounded-[1.5rem] border border-[#D8C7B2] bg-[#FFFDF8] text-left shadow-md transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#E9DDCE]">
                <img
                  src={photo.image_url}
                  alt={photo.title || "OB Game Photo"}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <p className="text-xs font-black tracking-[0.35em] text-[#9E2F31]">
                  MEMORY {String(index + 1).padStart(2, "0")}
                </p>
                <h4 className="mt-3 text-2xl font-black text-[#2B0707]">
                  {photo.title || "OB Game Photo"}
                </h4>
                {photo.caption ? (
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#7A665B]">
                    {photo.caption}
                  </p>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedPhoto ? (
        <ImageLightbox
          imageUrl={selectedPhoto.image_url}
          title={selectedPhoto.title || "OB Game Photo"}
          description={selectedPhoto.caption || ""}
          onClose={() => setSelectedPhoto(null)}
        />
      ) : null}
    </>
  );
}