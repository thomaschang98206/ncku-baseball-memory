"use client";

import { useState } from "react";

type ImageLightboxProps = {
  src: string;
  alt: string;
  title: string;
  label?: string;
  description?: string;
  imageClassName?: string;
};

export default function ImageLightbox({
  src,
  alt,
  title,
  label,
  description,
  imageClassName = "",
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group w-full overflow-hidden rounded-[2rem] border border-white/18 bg-white/10 text-left shadow-[0_18px_70px_rgba(0,0,0,0.22)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/45"
      >
        <div className="relative">
          <img
            src={src}
            alt={alt}
            className={`w-full object-contain transition duration-500 group-hover:scale-[1.015] ${imageClassName}`}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)] opacity-0 transition group-hover:opacity-100" />
          {label ? (
            <div className="absolute left-4 top-4 rounded-full border border-white/35 bg-[#421211]/70 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white backdrop-blur">
              {label}
            </div>
          ) : null}
        </div>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <button
            type="button"
            aria-label="Close image"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-[#421211]"
          >
            ??
          </button>

          <div className="grid max-h-[92vh] w-full max-w-6xl gap-5 overflow-auto rounded-[2rem] border border-white/20 bg-[#F4E8D9] p-4 text-[#421211] shadow-2xl md:grid-cols-[1fr_320px] md:p-6">
            <div className="flex items-center justify-center rounded-[1.5rem] bg-white/70 p-3">
              <img
                src={src}
                alt={alt}
                className="max-h-[82vh] w-full object-contain"
              />
            </div>

            <aside className="rounded-[1.5rem] border border-[#D8C3AD] bg-white/70 p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#A82128]">
                {label || "Image"}
              </p>
              <h3 className="mt-4 text-3xl font-black leading-tight">
                {title}
              </h3>
              {description ? (
                <p className="mt-5 text-sm leading-8 text-[#7A665B]">
                  {description}
                </p>
              ) : null}
            </aside>
          </div>
        </div>
      ) : null}
    </>
  );
}
