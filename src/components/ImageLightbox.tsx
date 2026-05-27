"use client";

type ImageLightboxProps = {
  imageUrl: string;
  title?: string;
  description?: string;
  onClose: () => void;
};

export default function ImageLightbox({
  imageUrl,
  title = "OB Game Photo",
  description = "",
  onClose,
}: ImageLightboxProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] bg-[#F4E8D9] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-[#421211]/90 px-4 py-2 text-sm font-black text-white shadow-lg transition hover:bg-[#A33232]"
        >
          關閉
        </button>

        <div className="grid max-h-[92vh] grid-cols-1 overflow-y-auto md:grid-cols-[1fr_320px]">
          <div className="flex min-h-[60vh] items-center justify-center bg-[#160403] p-4 md:min-h-[80vh]">
            <img
              src={imageUrl}
              alt={title}
              className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-xl"
            />
          </div>

          <aside className="border-l border-[#D8C7B2] bg-[#F4E8D9] p-6 text-[#421211]">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#A33232]">
              OB Game Archive
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight">
              {title}
            </h2>

            {description ? (
              <p className="mt-5 whitespace-pre-line text-base leading-8 text-[#7A665B]">
                {description}
              </p>
            ) : (
              <p className="mt-5 text-base leading-8 text-[#7A665B]">
                尚未填寫照片說明。
              </p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}