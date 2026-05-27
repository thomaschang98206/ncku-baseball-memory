"use client";

import { useEffect, useMemo, useState } from "react";
import AdminNav from "../../../components/AdminNav";
import { supabase } from "../../../lib/supabase";

type PhotoItem = {
  id: string;
  title: string | null;
  caption: string | null;
  image_url: string;
  sort_order: number | null;
  created_at: string | null;
};

const BUCKET_NAME = "project10-photos";

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const filePreview = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  async function loadPhotos() {
    setMessage("");

    const { data, error } = await supabase
      .from("photos")
      .select("id,title,caption,image_url,sort_order,created_at")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(`讀取照片失敗：${error.message}`);
      return;
    }

    setPhotos((data ?? []) as PhotoItem[]);
  }

  useEffect(() => {
    loadPhotos();
  }, []);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      setMessage("請先選擇一張照片。");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const ext = file.name.split(".").pop() || "jpg";
      const safeName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;
      const storagePath = `ob-game/${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`上傳失敗：${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(storagePath);

      const publicUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase.from("photos").insert({
        title: title.trim() || "OB Game Photo",
        caption: caption.trim() || "",
        image_url: publicUrl,
        sort_order: Number(sortOrder) || 0,
      });

      if (insertError) {
        throw new Error(`寫入資料庫失敗：${insertError.message}`);
      }

      setFile(null);
      setTitle("");
      setCaption("");
      setSortOrder("0");
      setMessage("照片已上傳。");
      await loadPhotos();
    } catch (err) {
      const text = err instanceof Error ? err.message : "未知錯誤";
      setMessage(text);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(photo: PhotoItem) {
    const ok = window.confirm(`確定要刪除「${photo.title || "這張照片"}」嗎？`);
    if (!ok) return;

    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("photos").delete().eq("id", photo.id);

    if (error) {
      setMessage(`刪除失敗：${error.message}`);
      setLoading(false);
      return;
    }

    setMessage("照片資料已刪除。若 Storage 仍有原圖，可之後再清理。");
    await loadPhotos();
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#F4E8D9] text-[#421211]">
      <AdminNav />

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black tracking-[0.35em] text-[#A82128]">
              PHOTO STORAGE
            </p>
            <h1 className="mt-3 text-3xl font-black md:text-5xl">照片管理</h1>
            <p className="mt-3 max-w-2xl text-[#7A665B]">
              這裡上傳 OB 賽當天照片。照片會存到 Supabase Storage，並寫入照片資料表，之後前台可讀取顯示。
            </p>
          </div>

          <button
            type="button"
            onClick={loadPhotos}
            className="rounded-full border border-[#D8C7B2] bg-white px-5 py-3 text-sm font-black text-[#421211] shadow-sm hover:bg-[#FFF8ED]"
          >
            重新整理
          </button>
        </div>

        {message && (
          <div className="mt-6 rounded-2xl border border-[#D8C7B2] bg-white px-5 py-4 text-sm font-bold text-[#8E1F26]">
            {message}
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
          <form
            onSubmit={handleUpload}
            className="rounded-[28px] border border-[#D8C7B2] bg-white/90 p-6 shadow-sm"
          >
            <h2 className="text-2xl font-black">上傳新照片</h2>

            <label className="mt-6 block">
              <span className="text-sm font-black tracking-[0.2em] text-[#A82128]">
                IMAGE FILE
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="mt-3 block w-full rounded-2xl border border-[#D8C7B2] bg-[#F6EFE4] px-4 py-3 text-sm"
              />
            </label>

            {filePreview && (
              <div className="mt-4 overflow-hidden rounded-2xl border border-[#D8C7B2] bg-[#F6EFE4]">
                <img
                  src={filePreview}
                  alt="Preview"
                  className="h-56 w-full object-cover"
                />
              </div>
            )}

            <label className="mt-5 block">
              <span className="text-sm font-black tracking-[0.2em] text-[#A82128]">
                TITLE
              </span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例如：OB Game Memory 01"
                className="mt-3 w-full rounded-2xl border border-[#D8C7B2] bg-white px-4 py-3 text-sm outline-none focus:border-[#A82128]"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-black tracking-[0.2em] text-[#A82128]">
                CAPTION
              </span>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="可以寫這張照片的說明，之後前台點開時會顯示。"
                rows={4}
                className="mt-3 w-full rounded-2xl border border-[#D8C7B2] bg-white px-4 py-3 text-sm outline-none focus:border-[#A82128]"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-black tracking-[0.2em] text-[#A82128]">
                SORT ORDER
              </span>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="mt-3 w-full rounded-2xl border border-[#D8C7B2] bg-white px-4 py-3 text-sm outline-none focus:border-[#A82128]"
              />
            </label>

            <button
              disabled={loading}
              className="mt-6 w-full rounded-full bg-[#A82128] px-5 py-4 text-sm font-black text-white shadow-sm hover:bg-[#8E1F26] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "處理中..." : "上傳照片"}
            </button>
          </form>

          <section className="rounded-[28px] border border-[#D8C7B2] bg-white/70 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black tracking-[0.35em] text-[#A82128]">
                  OB GAME ARCHIVE
                </p>
                <h2 className="mt-2 text-2xl font-black">目前照片</h2>
              </div>
              <p className="text-sm font-bold text-[#7A665B]">
                {photos.length} 張
              </p>
            </div>

            {photos.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-[#D8C7B2] p-8 text-[#7A665B]">
                目前還沒有照片。先從左側上傳一張。
              </div>
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {photos.map((photo) => (
                  <article
                    key={photo.id}
                    className="overflow-hidden rounded-[24px] border border-[#D8C7B2] bg-[#FDF8F0] shadow-sm"
                  >
                    <a
                      href={photo.image_url}
                      target="_blank"
                      rel="noreferrer"
                      className="block"
                    >
                      <img
                        src={photo.image_url}
                        alt={photo.title || "OB Game Photo"}
                        className="h-52 w-full object-cover transition hover:scale-[1.02]"
                      />
                    </a>

                    <div className="p-4">
                      <p className="text-xs font-black tracking-[0.25em] text-[#A82128]">
                        ORDER {photo.sort_order ?? 0}
                      </p>
                      <h3 className="mt-2 text-lg font-black">
                        {photo.title || "未命名照片"}
                      </h3>
                      {photo.caption && (
                        <p className="mt-2 line-clamp-3 text-sm text-[#7A665B]">
                          {photo.caption}
                        </p>
                      )}

                      <div className="mt-4 flex gap-3">
                        <a
                          href={photo.image_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 rounded-full border border-[#D8C7B2] px-4 py-2 text-center text-xs font-black hover:bg-white"
                        >
                          放大查看
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(photo)}
                          disabled={loading}
                          className="flex-1 rounded-full bg-[#421211] px-4 py-2 text-xs font-black text-white hover:bg-[#2A0908] disabled:opacity-60"
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
    </main>
  );
}