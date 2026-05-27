"use client";

type ImageLightboxProps = {
  src?: string;
  imageUrl?: string;
  alt?: string;
  title?: string;
  description?: string;
  onClose: () => void;
};

export default function ImageLightbox({
  src,
  imageUrl,
  alt,
  title,
  description,
  onClose,
}: ImageLightboxProps) {
  const finalSrc = src || imageUrl || "";

  if (!finalSrc) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-[#F7F0E6] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-[#421211] px-4 py-2 text-sm font-black text-white shadow-lg transition hover:bg-[#A42B2F]"
        >
          關閉
        </button>

        <div className="grid max-h-[92vh] grid-cols-1 overflow-y-auto md:grid-cols-[1.35fr_0.65fr]">
          <div className="flex min-h-[50vh] items-center justify-center bg-[#1F0807] p-4 md:min-h-[80vh]">
            <img
              src={finalSrc}
              alt={alt || title || "Photo"}
              className="max-h-[82vh] w-full object-contain"
            />
          </div>

          <aside className="flex flex-col justify-between p-6 text-[#421211] md:p-8">
            <div>
              <p className="text-sm font-black tracking-[0.35em] text-[#A42B2F]">
                OB GAME PHOTO
              </p>

              <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                {title || "OB Game Photo"}
              </h2>

              {description ? (
                <p className="mt-5 whitespace-pre-line text-base leading-8 text-[#6F6257]">
                  {description}
                </p>
              ) : (
                <p className="mt-5 text-base leading-8 text-[#6F6257]">
                  這張照片目前尚未填寫說明。
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-full bg-[#A42B2F] px-6 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#421211]"
            >
              返回照片牆
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}