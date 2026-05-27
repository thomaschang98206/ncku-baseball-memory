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

write("src/components/DonationModal.tsx", String.raw`
"use client";

import { useEffect, useState } from "react";

export default function DonationModal() {
  const [open, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowButton(window.scrollY > window.innerHeight * 0.55);
    }

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function copyAccount() {
    await navigator.clipboard.writeText("0031071-0891691");
    alert("帳號已複製");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          "fixed bottom-5 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 items-center justify-between rounded-full border border-white/30 bg-[#8E1F26] px-5 py-3 text-white shadow-[0_18px_50px_rgba(66,18,17,0.25)] transition duration-300 hover:bg-[#5B1719] md:px-7 " +
          (showButton ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0")
        }
      >
        <span className="text-xs font-black uppercase tracking-[0.22em] md:text-sm">
          SUPPORT PROJECT 10
        </span>
        <span className="text-sm font-black">捐款與紀念品付款 →</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#160808]/70 px-4 backdrop-blur-md">
          <section className="w-full max-w-lg overflow-hidden rounded-[1.75rem] border border-[#E6D9C8] bg-[#F7EEE3] shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#DCCDBB] px-6 py-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A82128]">
                  Payment Information
                </p>
                <h2 className="mt-2 text-2xl font-black text-[#421211]">
                  轉帳資訊
                </h2>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full px-3 py-1 text-2xl leading-none text-[#7A665B] hover:bg-[#421211] hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="grid gap-3 rounded-[1.25rem] border border-[#DCCDBB] bg-white/70 p-5 text-sm text-[#421211]">
                <p><span className="font-black text-[#A82128]">銀行：</span>中華郵政</p>
                <p><span className="font-black text-[#A82128]">代碼：</span>700</p>
                <p><span className="font-black text-[#A82128]">帳號：</span>0031071-0891691</p>
                <p><span className="font-black text-[#A82128]">戶名：</span>成功大學棒球社王昱崚</p>
                <p><span className="font-black text-[#A82128]">分行：</span>成功大學郵局</p>
              </div>

              <p className="mt-4 text-sm leading-7 text-[#7A665B]">
                轉帳後請保留匯款資訊。若為商品購買，送出表單後再依此帳戶完成付款。
              </p>

              <button
                onClick={copyAccount}
                className="mt-6 w-full rounded-full bg-[#421211] py-3 text-sm font-black text-white transition hover:bg-[#A82128]"
              >
                複製帳號
              </button>
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

function SmallLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#A82128]">
      {children}
    </p>
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
    <main className="min-h-screen overflow-x-hidden bg-[#EFE3D4] text-[#421211]">
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_20%,rgba(168,73,53,0.62),transparent_38%),linear-gradient(180deg,#B76551_0%,#D5BDA8_48%,#EFE3D4_100%)]" />
        <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(90deg,#421211_1px,transparent_1px),linear-gradient(#421211_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#EFE3D4] to-transparent" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-7 md:px-8">
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
                <span className="rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur">
                  Chapter 0 → Chapter 1+
                </span>
                <span className="rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur">
                  Photo Archive
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

              <p className="mt-6 max-w-xl text-base font-bold leading-8 text-white/86">
                {settings.project_intro}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#photos"
                  className="rounded-full bg-white px-7 py-4 text-sm font-black text-[#8E1F26] shadow-xl transition hover:-translate-y-1"
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
              <div className="absolute -inset-4 rounded-[2.4rem] border border-white/35 bg-white/18 backdrop-blur-sm" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-[#F4E8D9]/70 p-3 shadow-[0_24px_80px_rgba(66,18,17,0.28)]">
                <img
                  src={settings.hero_image_url}
                  alt="Project 10 Main Visual"
                  className="w-full rounded-[1.5rem] object-contain"
                />
              </div>
            </section>
          </div>
        </div>
      </section>

      <section id="event" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-[#D6C5B2] bg-white/60 p-7 shadow-sm backdrop-blur md:p-10">
            <SmallLabel>Event Data</SmallLabel>
            <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              {settings.subtitle}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#7A665B]">
              {settings.event_intro}
            </p>
          </article>

          <article className="rounded-[2rem] bg-[#421211] p-7 text-white shadow-xl md:p-10">
            <SmallLabel>Scoreboard</SmallLabel>
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
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <SmallLabel>Chapter Index</SmallLabel>
            <h2 className="mt-3 text-4xl font-black">兩個章節，一條球隊時間線</h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="overflow-hidden rounded-[2rem] border border-[#D6C5B2] bg-white/65 shadow-sm">
            <img src="/images/chapter-0.png" alt="Chapter 0" className="h-[420px] w-full object-cover object-top" />
            <div className="p-7">
              <SmallLabel>Chapter 0 / 2016–2021</SmallLabel>
              <p className="mt-4 text-sm leading-8 text-[#7A665B]">
                {settings.chapter_zero_text || "Chapter 0 指 2016–2021 以前的累積，是成大乙棒第一段歷史。"}
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-[2rem] border border-[#D6C5B2] bg-white/65 shadow-sm">
            <img src="/images/chapter-1.png" alt="Chapter 1+" className="h-[420px] w-full object-cover object-top" />
            <div className="p-7">
              <SmallLabel>Chapter 1+ / 2021–2026+</SmallLabel>
              <p className="mt-4 text-sm leading-8 text-[#7A665B]">
                {settings.chapter_one_text || "Chapter 1+ 指 2021–2026，並且代表故事會繼續往後。"}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section id="photos" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-8 border-y border-[#D6C5B2] py-10 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SmallLabel>Photo Archive</SmallLabel>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
              {settings.photo_section_title || "OB Game Archive"}
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-8 text-[#7A665B] md:text-base">
            {settings.photo_section_note || "2026.05.30 OB 賽當天影像整理中。正式照片上傳後，這裡會成為公開影像資料庫。"}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {["Chapter 0", "Project 10", "Chapter 1+"].map((label, index) => (
            <article
              key={label}
              className="rounded-[1.5rem] border border-dashed border-[#CBB9A5] bg-white/45 p-6"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#A82128]">
                {label}
              </p>
              <h3 className="mt-16 text-2xl font-black">等待照片上傳</h3>
              <p className="mt-3 text-sm leading-7 text-[#7A665B]">
                Memory {String(index + 1).padStart(2, "0")} 將由後台上傳後自動生成。
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="mb-8">
          <SmallLabel>Goods</SmallLabel>
          <h2 className="mt-3 text-4xl font-black">紀念商品</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[2rem] border border-[#D6C5B2] bg-white/65 p-5 shadow-sm">
            <div className="overflow-hidden rounded-[1.4rem] bg-[#E8D8C7]">
              <img src="/images/towel.png" alt="Project 10 Towel" className="h-72 w-full object-cover" />
            </div>
            <div className="p-4">
              <SmallLabel>Product 01</SmallLabel>
              <h3 className="mt-3 text-3xl font-black">PROJECT 10 毛巾</h3>
              <p className="mt-2 text-2xl font-black text-[#A82128]">NT$450</p>
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#D6C5B2] bg-white/65 p-5 shadow-sm">
            <div className="overflow-hidden rounded-[1.4rem] bg-[#E8D8C7]">
              <img src="/images/jersey.png" alt="Project 10 Jersey" className="h-72 w-full object-cover" />
            </div>
            <div className="p-4">
              <SmallLabel>Product 02</SmallLabel>
              <h3 className="mt-3 text-3xl font-black">PROJECT 10 球衣</h3>
              <p className="mt-2 text-2xl font-black text-[#A82128]">NT$1450</p>
            </div>
          </article>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-5 pb-28 md:px-8">
        <div className="border-t border-[#D6C5B2] py-8 text-sm text-[#7A665B]">
          <p className="font-black text-[#421211]">{settings.site_title} / NCKU Baseball Club</p>
        </div>
      </footer>

      <DonationModal />
    </main>
  );
}
`);

console.log("Updated to v0.4-C");