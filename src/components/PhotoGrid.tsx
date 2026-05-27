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

  async function loadPhotos() {
    setLoading(true);

    const { data, error } = await supabase
      .from("photos")
      .select("id,title,caption,image_url,sort_order,created_at")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("讀取照片失敗：", error.message);
      setPhotos([]);
      setLoading(false);
      return;
    }

    setPhotos(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadPhotos();
  }, []);

  if (loading) {
    return (
      <section className="rounded-[2rem] border border-white/20 bg-[#F4E8D9]/95 p-10 text-[#421211] shadow-2xl md:p-16">
        <p className="text-sm font-black tracking-[0.35em] text-[#A63232]">
          OB GAME PHOTO DATABASE
        </p>
        <h2 className="mt-10 text-4xl font-black md:text-6xl">照片讀取中</h2>
        <p className="mt-5 text-lg text-[#7A665B]">
          正在從後台資料庫同步照片。
        </p>
      </section>
    );
  }

  if (photos.length === 0) {
    return (
      <section className="rounded-[2rem] border border-white/20 bg-[#F4E8D9]/95 p-10 text-[#421211] shadow-2xl md:p-16">
        <p className="text-sm font-black tracking-[0.35em] text-[#A63232]">
          OB GAME PHOTO DATABASE
        </p>
        <h2 className="mt-10 text-4xl font-black md:text-6xl">等待照片上傳</h2>
        <p className="mt-5 text-lg text-[#7A665B]">
          後台上傳 OB 賽照片後，此區會自動整理為照片牆並可點選放大查看。
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="rounded-[2rem] border border-white/20 bg-[#F4E8D9]/95 p-6 text-[#421211] shadow-2xl md:p-10">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black tracking-[0.35em] text-[#A63232]">
              OB GAME PHOTO DATABASE
            </p>
            <h2 className="mt-3 text-4xl font-black md:text-6xl">OB 賽影像庫</h2>
          </div>
          <p className="font-bold text-[#7A665B]">{photos.length} 張</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setSelectedPhoto(photo)}
              className="group overflow-hidden rounded-[1.5rem] border border-[#D8C7B2] bg-[#FFF9F1] text-left shadow-md transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#E6D8C8]">
                <img
                  src={photo.image_url}
                  alt={photo.title || "OB Game Photo"}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <p className="text-xs font-black tracking-[0.35em] text-[#A63232]">
                  PHOTO {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-2xl font-black">
                  {photo.title || "OB Game Photo"}
                </h3>
                {photo.caption ? (
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#7A665B]">
                    {photo.caption}
                  </p>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedPhoto ? (
        <ImageLightbox
          src={selectedPhoto.image_url}
          alt={selectedPhoto.title || "OB Game Photo"}
          title={selectedPhoto.title || "OB Game Photo"}
          description={selectedPhoto.caption || ""}
          onClose={() => setSelectedPhoto(null)}
        />
      ) : null}
    </>
  );
}