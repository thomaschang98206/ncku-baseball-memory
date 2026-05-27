"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import AdminNav from "../../../components/AdminNav";
import { supabase } from "../../../lib/supabase";

type Photo = {
  id: string;
  title: string | null;
  caption: string | null;
  image_url: string;
  storage_path: string | null;
  category: string | null;
  sort_order: number | null;
  is_active: boolean | null;
  created_at: string | null;
};

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [titlePrefix, setTitlePrefix] = useState("OB Game Photo");
  const [caption, setCaption] = useState("");
  const [sortStart, setSortStart] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const selectedFiles = useMemo(() => {
    return files ? Array.from(files) : [];
  }, [files]);

  async function fetchPhotos() {
    setMessage("讀取照片中...");

    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .eq("category", "ob_game")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(`讀取失敗：${error.message}`);
      return;
    }

    setPhotos((data || []) as Photo[]);
    setMessage("");
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function uploadPhotos() {
    if (!selectedFiles.length) {
      setMessage("請先選擇照片。");
      return;
    }

    setUploading(true);
    setMessage(`開始上傳 ${selectedFiles.length} 張照片...`);

    let successCount = 0;

    for (let i = 0; i < selectedFiles.length; i += 1) {
      const file = selectedFiles[i];
      const safeName = file.name
        .replace(/\s+/g, "-")
        .replace(/[^\w.\-]/g, "");
      const path = `ob-game/${Date.now()}-${i}-${safeName}`;

      const uploadResult = await supabase.storage
        .from("photos")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadResult.error) {
        setMessage(`第 ${i + 1} 張上傳失敗：${uploadResult.error.message}`);
        setUploading(false);
        return;
      }

      const publicUrlResult = supabase.storage
        .from("photos")
        .getPublicUrl(path);

      const imageUrl = publicUrlResult.data.publicUrl;

      const insertResult = await supabase.from("photos").insert({
        title:
          selectedFiles.length === 1
            ? titlePrefix || "OB Game Photo"
            : `${titlePrefix || "OB Game Photo"} ${String(i + 1).padStart(2, "0")}`,
        caption,
        image_url: imageUrl,
        storage_path: path,
        category: "ob_game",
        sort_order: sortStart + i,
        is_active: true,
      });

      if (insertResult.error) {
        setMessage(`寫入資料庫失敗：${insertResult.error.message}`);
        setUploading(false);
        return;
      }

      successCount += 1;
      setMessage(`已上傳 ${successCount} / ${selectedFiles.length} 張照片...`);
    }

    setFiles(null);
    setCaption("");
    setUploading(false);
    setMessage(`完成，上傳 ${successCount} 張照片。`);
    fetchPhotos();
  }

  async function deletePhoto(photo: Photo) {
    const ok = window.confirm("確定要刪除這張照片嗎？");
    if (!ok) return;

    if (photo.storage_path) {
      await supabase.storage.from("photos").remove([photo.storage_path]);
    }

    const { error } = await supabase.from("photos").delete().eq("id", photo.id);

    if (error) {
      setMessage(`刪除失敗：${error.message}`);
      return;
    }

    setMessage("已刪除照片。");
    fetchPhotos();
  }

  async function togglePhoto(photo: Photo) {
    const { error } = await supabase
      .from("photos")
      .update({
        is_active: !photo.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", photo.id);

    if (error) {
      setMessage(`更新失敗：${error.message}`);
      return;
    }

    fetchPhotos();
  }

  return (
    <main className="min-h-screen bg-[#F4E8D9] text-[#421211]">
      <AdminNav />

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-black md:text-5xl">照片管理</h1>
            <p className="mt-3 max-w-2xl text-[#7A665B]">
              這裡可以批量上傳 OB 賽照片。照片會存到 Supabase Storage，並自動寫入照片資料表，前台會讀取顯示。
            </p>
          </div>

          <button
            type="button"
            onClick={fetchPhotos}
            className="rounded-full border border-[#D8C7B2] bg-white px-6 py-3 font-black text-[#421211] shadow-sm hover:bg-[#FFF8EF]"
          >
            重新整理
          </button>
        </div>

        {message ? (
          <div className="mt-6 rounded-3xl border border-[#D8C7B2] bg-white px-5 py-4 font-semibold text-[#8E1F26]">
            {message}
          </div>
        ) : null}

        <div className="mt-10 grid gap-8 lg:grid-cols-[420px_1fr]">
          <section className="rounded-[2rem] border border-[#D8C7B2] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-black md:text-3xl">批量上傳照片</h2>

            <div className="mt-8 space-y-6">
              <label className="block">
                <span className="tracking-[0.35em] text-[#9F2D31] font-black">
                  IMAGE FILES
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => setFiles(event.target.files)}
                  className="mt-3 block w-full rounded-2xl border border-[#D8C7B2] bg-[#F8F1E8] px-4 py-4"
                />
              </label>

              {selectedFiles.length ? (
                <div className="rounded-2xl bg-[#F8F1E8] p-4 text-sm text-[#7A665B]">
                  已選擇 {selectedFiles.length} 張照片
                </div>
              ) : null}

              <label className="block">
                <span className="tracking-[0.35em] text-[#9F2D31] font-black">
                  TITLE PREFIX
                </span>
                <input
                  value={titlePrefix}
                  onChange={(event) => setTitlePrefix(event.target.value)}
                  placeholder="例如：OB Game Memory"
                  className="mt-3 w-full rounded-2xl border border-[#D8C7B2] px-4 py-4"
                />
              </label>

              <label className="block">
                <span className="tracking-[0.35em] text-[#9F2D31] font-black">
                  CAPTION
                </span>
                <textarea
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                  placeholder="可以寫這批照片的說明，之後前台點開時會顯示。"
                  rows={5}
                  className="mt-3 w-full rounded-2xl border border-[#D8C7B2] px-4 py-4"
                />
              </label>

              <label className="block">
                <span className="tracking-[0.35em] text-[#9F2D31] font-black">
                  SORT START
                </span>
                <input
                  type="number"
                  value={sortStart}
                  onChange={(event) => setSortStart(Number(event.target.value))}
                  className="mt-3 w-full rounded-2xl border border-[#D8C7B2] px-4 py-4"
                />
              </label>

              <button
                type="button"
                onClick={uploadPhotos}
                disabled={uploading}
                className="w-full rounded-full bg-[#A52D2F] px-6 py-4 text-lg font-black text-white shadow-md hover:bg-[#8E1F26] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading ? "上傳中..." : "批量上傳照片"}
              </button>
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#D8C7B2] bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="tracking-[0.35em] text-[#9F2D31] font-black">
                  OB GAME ARCHIVE
                </p>
                <h2 className="mt-3 text-2xl font-black md:text-3xl">目前照片</h2>
              </div>
              <p className="font-black text-[#7A665B]">{photos.length} 張</p>
            </div>

            {photos.length === 0 ? (
              <div className="mt-8 rounded-3xl border border-dashed border-[#D8C7B2] bg-[#F8F1E8] p-8 text-[#7A665B]">
                目前還沒有照片。上傳後會出現在這裡。
              </div>
            ) : (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {photos.map((photo, index) => (
                  <article
                    key={photo.id}
                    className="overflow-hidden rounded-3xl border border-[#D8C7B2] bg-[#F8F1E8] shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedPhoto(photo)}
                      className="relative block aspect-[4/3] w-full overflow-hidden bg-[#E8D8C5]"
                    >
                      <Image
                        src={photo.image_url}
                        alt={photo.title || "OB Game Photo"}
                        fill
                        className="object-cover transition duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </button>

                    <div className="p-5">
                      <p className="tracking-[0.35em] text-[#9F2D31] font-black">
                        ORDER {photo.sort_order ?? index + 1}
                      </p>
                      <h3 className="mt-3 text-xl font-black">
                        {photo.title || "OB Game Photo"}
                      </h3>
                      {photo.caption ? (
                        <p className="mt-2 line-clamp-2 text-sm text-[#7A665B]">
                          {photo.caption}
                        </p>
                      ) : null}

                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedPhoto(photo)}
                          className="rounded-full border border-[#D8C7B2] bg-white px-4 py-2 font-black hover:bg-[#FFF8EF]"
                        >
                          放大查看
                        </button>
                        <button
                          type="button"
                          onClick={() => togglePhoto(photo)}
                          className="rounded-full border border-[#D8C7B2] bg-white px-4 py-2 font-black hover:bg-[#FFF8EF]"
                        >
                          {photo.is_active ? "隱藏" : "顯示"}
                        </button>
                        <button
                          type="button"
                          onClick={() => deletePhoto(photo)}
                          className="rounded-full bg-[#421211] px-4 py-2 font-black text-white hover:bg-[#6D1B1D]"
                        >
                          刪除
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>

      {selectedPhoto ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-[2rem] bg-[#F4E8D9] p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="tracking-[0.35em] text-[#9F2D31] font-black">
                  OB GAME PHOTO
                </p>
                <h3 className="mt-2 text-2xl font-black md:text-4xl">
                  {selectedPhoto.title || "OB Game Photo"}
                </h3>
                {selectedPhoto.caption ? (
                  <p className="mt-3 text-[#7A665B]">{selectedPhoto.caption}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="rounded-full bg-[#421211] px-5 py-3 font-black text-white"
              >
                關閉
              </button>
            </div>

            <div className="relative mt-6 min-h-[70vh] overflow-hidden rounded-3xl bg-black">
              <Image
                src={selectedPhoto.image_url}
                alt={selectedPhoto.title || "OB Game Photo"}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}