const fs = require("fs");
const path = require("path");

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function write(filePath, content) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content.trimStart(), "utf8");
  console.log("wrote " + filePath);
}

write("src/components/ImageLightbox.tsx", String.raw`
"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  title: string;
  label?: string;
  description?: string;
  className?: string;
  imageClassName?: string;
};

export default function ImageLightbox({
  src,
  alt,
  title,
  label,
  description,
  className = "",
  imageClassName = "",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={"group block w-full text-left " + className}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/25 bg-[#F5E9DA]/85 shadow-[0_18px_50px_rgba(20,5,5,0.22)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_70px_rgba(20,5,5,0.32)]">
          <img
            src={src}
            alt={alt}
            className={"w-full object-contain " + imageClassName}
          />
          <div className="absolute bottom-4 right-4 rounded-full bg-[#8E1F26] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white opacity-95">
            View
          </div>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#120505]/80 px-4 py-6 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <section
            className="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-[2rem] border border-white/20 bg-[#F4E8D9] p-4 shadow-2xl md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                {label && (
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A82128]">
                    {label}
                  </p>
                )}
                <h2 className="mt-2 text-2xl font-black text-[#421211] md:text-4xl">
                  {title}
                </h2>
                {description && (
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[#7A665B]">
                    {description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="shrink-0 rounded-full bg-[#421211] px-4 py-2 text-sm font-black text-white hover:bg-[#A82128]"
              >
                關閉
              </button>
            </div>

            <div className="rounded-[1.5rem] bg-white/60 p-3">
              <img
                src={src}
                alt={alt}
                className="mx-auto max-h-[75vh] w-full object-contain"
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
}
`);

write("src/app/page.tsx", String.raw`
import { supabase } from "../lib/supabase";
import DonationModal from "../components/DonationModal";
import ImageLightbox from "../components/ImageLightbox";

export const dynamic = "force-dynamic";

type SiteSettings = {
  site_title: string;
  subtitle: string;
  slogan: string;
  project_intro: string;
  event_intro: string;
  event_date: string;
  event_place: string;
  hero_image_url: string;
  logo_url: string;
  photo_section_title?: string;
  photo_section_note?: string;
  chapter_zero_text?: string;
  chapter_one_text?: string;
};

const fallbackSettings: SiteSettings = {
  site_title: "PROJECT 10",
  subtitle: "NCKU Baseball Club 10th Anniversary Game",
  slogan: "一旦怠惰，很快就會出現差距。不滿足於現狀，要越變越強！",
  project_intro: "作為紀念成大乙棒走過的第一個 10 年。",
  event_intro: "2026 年 5 月 30 日於中信科大舉辦十週年 OB 賽。",
  event_date: "2026.05.30",
  event_place: "中信科大棒球場",
  hero_image_url: "/images/main-visual.png",
  logo_url: "/images/logo.png",
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F0D6B8]">
      {children}
    </p>
  );
}

function SectionShell({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      {children}
    </section>
  );
}

export default async function HomePage() {
  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .single();

  const settings = (data ?? fallbackSettings) as SiteSettings;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#240909] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(178,87,65,0.75),transparent_38%),linear-gradient(180deg,#3A1110_0%,#6E231E_34%,#2A0C0B_72%,#160606_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.23] [background-image:linear-gradient(90deg,#F4E8D9_1px,transparent_1px),linear-gradient(#F4E8D9_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,transparent_0%,rgba(244,232,217,0.12)_58%,rgba(244,232,217,0.2)_100%)]" />

      <section className="relative min-h-screen">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-7 md:px-8">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={settings.logo_url}
                alt="NCKU Baseball Club Logo"
                className="h-14 w-14 rounded-full bg-white object-contain shadow-md"
              />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-white">
                  NCKU Baseball Club
                </p>
                <p className="text-2xl font-black text-white drop-shadow">
                  {settings.site_title}
                </p>
              </div>
            </div>
          </header>

          <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr]">
            <section>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/35 bg-white/12 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur">
                  Chapter 0 → Chapter 1+
                </span>
                <span className="rounded-full border border-white/35 bg-white/12 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur">
                  OB Game Archive
                </span>
              </div>

              <p className="mt-10 text-xs font-black uppercase tracking-[0.35em] text-white/85">
                {settings.subtitle}
              </p>

              <h1 className="mt-5 max-w-3xl text-6xl font-black leading-[0.92] tracking-tight text-white drop-shadow-xl md:text-8xl">
                YOUR
                <br />
                MEMORY
              </h1>

              <p className="mt-7 max-w-xl text-xl font-black leading-9 text-white md:text-2xl">
                {settings.slogan}
              </p>

              <p className="mt-6 max-w-xl text-base font-bold leading-8 text-white/85">
                {settings.project_intro}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#photos"
                  className="rounded-full bg-[#F4E8D9] px-7 py-4 text-sm font-black text-[#8E1F26] shadow-xl transition hover:-translate-y-1"
                >
                  查看照片輯
                </a>
                <a
                  href="#event"
                  className="rounded-full border border-white/45 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-[#8E1F26]"
                >
                  關於計畫
                </a>
              </div>
            </section>

            <section className="relative mx-auto w-full max-w-[520px]">
              <div className="absolute -inset-4 rounded-[2.4rem] border border-white/25 bg-white/12 backdrop-blur-sm" />
              <ImageLightbox
                src={settings.hero_image_url}
                alt="Project 10 Main Visual"
                title="PROJECT 10 主視覺"
                label="Main Visual"
                description="成大乙棒十週年活動主視覺。"
                imageClassName="max-h-[78vh] bg-[#F4E8D9]"
              />
            </section>
          </div>
        </div>
      </section>

      <SectionShell id="event">
        <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-white/18 bg-[#F4E8D9]/92 p-7 text-[#421211] shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur md:p-10">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#A82128]">
              Event Data
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              {settings.subtitle}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#7A665B]">
              {settings.event_intro}
            </p>
          </article>

          <article className="rounded-[2rem] border border-white/18 bg-[#421211]/88 p-7 text-white shadow-xl backdrop-blur md:p-10">
            <Label>Scoreboard</Label>
            <div className="mt-8 grid grid-cols-2 gap-8 border-b border-white/15 pb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">Date</p>
                <p className="mt-3 text-3xl font-black">{settings.event_date}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">Place</p>
                <p className="mt-3 text-3xl font-black">{settings.event_place}</p>
              </div>
            </div>
            <div className="mt-7">
              <p className="text-xs uppercase tracking-[0.25em] text-white/45">Mode</p>
              <p className="mt-3 text-3xl font-black">OB GAME / PHOTO ARCHIVE</p>
            </div>
          </article>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="mb-8">
          <Label>Chapter Index</Label>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">
            2016–2026+ CHAPTER 0 - CHAPTER 1+
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article>
            <ImageLightbox
              src="/images/chapter-0.png"
              alt="Chapter 0"
              title="Chapter 0 / 2016–2021"
              label="Chapter 0"
              description={settings.chapter_zero_text || "Chapter 0 指 2016–2021 以前的累積，是成大乙棒第一段歷史。"}
              imageClassName="h-[520px] bg-[#F4E8D9] p-2"
            />
            <div className="mt-5 rounded-[1.5rem] border border-white/18 bg-[#F4E8D9]/90 p-6 text-[#421211]">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#A82128]">
                Chapter 0 / 2016–2021
              </p>
              <p className="mt-4 text-sm leading-8 text-[#7A665B]">
                {settings.chapter_zero_text || "Chapter 0 指 2016–2021 以前的累積，是成大乙棒第一段歷史。"}
              </p>
            </div>
          </article>

          <article>
            <ImageLightbox
              src="/images/chapter-1.png"
              alt="Chapter 1+"
              title="Chapter 1+ / 2021–2026+"
              label="Chapter 1+"
              description={settings.chapter_one_text || "Chapter 1+ 指 2021–2026，並且代表故事會繼續往後。"}
              imageClassName="h-[520px] bg-[#F4E8D9] p-2"
            />
            <div className="mt-5 rounded-[1.5rem] border border-white/18 bg-[#F4E8D9]/90 p-6 text-[#421211]">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#A82128]">
                Chapter 1+ / 2021–2026+
              </p>
              <p className="mt-4 text-sm leading-8 text-[#7A665B]">
                {settings.chapter_one_text || "Chapter 1+ 指 2021–2026，並且代表故事會繼續往後。"}
              </p>
            </div>
          </article>
        </div>
      </SectionShell>

      <SectionShell id="photos">
        <div className="grid gap-8 border-y border-white/20 py-10 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Label>Photo Archive</Label>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
              {settings.photo_section_title || "OB Game Archive"}
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-8 text-white/72 md:text-base">
            {settings.photo_section_note || "2026.05.30 OB 賽當天影像整理中。正式照片上傳後，這裡會成為公開影像資料庫。"}
          </p>
        </div>

        <article className="mt-10 rounded-[2rem] border border-dashed border-white/25 bg-[#F4E8D9]/88 p-8 text-[#421211] backdrop-blur md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A82128]">
            OB Game / 2026.05.30
          </p>
          <h3 className="mt-16 text-3xl font-black md:text-5xl">等待 OB 賽照片上傳</h3>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-[#7A665B]">
            這裡只保留一個照片欄位：OB 賽當天影像。之後後台上傳照片後，會在這裡生成照片牆與可放大的影像卡。
          </p>
        </article>
      </SectionShell>

      <SectionShell>
        <div className="mb-8">
          <Label>Goods</Label>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">紀念商品</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[2rem] border border-white/18 bg-[#F4E8D9]/92 p-5 text-[#421211] shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
            <ImageLightbox
              src="/images/towel.png"
              alt="Project 10 Towel"
              title="PROJECT 10 毛巾"
              label="Product 01"
              description="PROJECT 10 十週年紀念毛巾，售價 NT$450。"
              imageClassName="h-72 bg-white p-4"
            />
            <div className="p-4">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#A82128]">Product 01</p>
              <h3 className="mt-3 text-3xl font-black">PROJECT 10 毛巾</h3>
              <p className="mt-2 text-2xl font-black text-[#A82128]">NT$450</p>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/18 bg-[#F4E8D9]/92 p-5 text-[#421211] shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
            <ImageLightbox
              src="/images/jersey.png"
              alt="Project 10 Jersey"
              title="PROJECT 10 球衣"
              label="Product 02"
              description="PROJECT 10 十週年紀念球衣，售價 NT$1450。"
              imageClassName="h-72 bg-white p-4"
            />
            <div className="p-4">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#A82128]">Product 02</p>
              <h3 className="mt-3 text-3xl font-black">PROJECT 10 球衣</h3>
              <p className="mt-2 text-2xl font-black text-[#A82128]">NT$1450</p>
            </div>
          </article>
        </div>
      </SectionShell>

      <footer className="mx-auto max-w-7xl px-5 pb-28 md:px-8">
        <div className="border-t border-white/20 py-8 text-sm text-white/65">
          <p className="font-black text-white">{settings.site_title} / NCKU Baseball Club</p>
        </div>
      </footer>

      <DonationModal />
    </main>
  );
}
`);

console.log("Updated to v0.4-D");