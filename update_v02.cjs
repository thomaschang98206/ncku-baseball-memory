const fs = require("fs");
const path = require("path");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content.trimStart(), "utf8");
  console.log("wrote " + file);
}

write("src/components/DonationModal.tsx", `
"use client";

import { useState } from "react";

export default function DonationModal() {
  const [open, setOpen] = useState(false);

  const accountName = "帳戶資訊稍後公開";
  const bankName = "帳戶資訊稍後公開";
  const accountNumber = "帳戶資訊稍後公開";

  async function copyAccount() {
    await navigator.clipboard.writeText(accountNumber);
    alert("帳號已複製");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 rounded-full border border-white/20 bg-[#8E1F26] px-5 py-3 text-sm font-black text-white shadow-[0_0_30px_rgba(142,31,38,0.45)] transition hover:-translate-y-1 hover:bg-[#6F171D] md:bottom-8 md:right-8"
      >
        支持我們
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A0908]/70 px-4 backdrop-blur-md">
          <div className="w-full max-w-md overflow-hidden rounded-[2rem] border border-white/20 bg-[#F6EFE4]/95 shadow-2xl">
            <div className="border-b border-[#D8C7B2] bg-[#421211] px-6 py-5 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[#D8C7B2]">
                    Support Module
                  </p>
                  <h2 className="mt-2 text-2xl font-black">
                    支持 PROJECT 10
                  </h2>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full px-3 py-1 text-2xl leading-none text-white/70 hover:bg-white/10 hover:text-white"
                  aria-label="關閉捐款視窗"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm leading-7 text-[#6F5C54]">
                作為紀念成大乙棒走過的第一個 10 年，這裡將作為十週年 OB 賽照片與回憶的公開平台。
              </p>

              <div className="mt-5 rounded-3xl border border-[#D8C7B2] bg-white/70 p-4">
                <div className="grid gap-2 text-sm text-[#421211]">
                  <p><span className="text-[#8B7568]">戶名：</span>{accountName}</p>
                  <p><span className="text-[#8B7568]">銀行：</span>{bankName}</p>
                  <p><span className="text-[#8B7568]">帳號：</span>{accountNumber}</p>
                </div>

                <div className="mt-5 flex justify-center">
                  <div className="relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#BFAE99] bg-[#F8F4EC] text-center text-xs font-bold uppercase tracking-[0.18em] text-[#8B7568]">
                    <div className="absolute inset-x-0 top-0 h-px animate-pulse bg-[#8E1F26]" />
                    QR Code
                    <br />
                    Coming Soon
                  </div>
                </div>

                <button
                  onClick={copyAccount}
                  className="mt-5 w-full rounded-full bg-[#421211] py-3 text-sm font-black text-white transition hover:bg-[#8E1F26]"
                >
                  複製帳號
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
`);

write("src/components/PhotoGrid.tsx", `
const demoPhotos = [
  { id: 1, title: "OB Game Opening", tag: "Game Day", code: "OB-001", image: "/images/main-visual.png" },
  { id: 2, title: "Chapter 0 Memory", tag: "Archive", code: "CH0-105", image: "/images/main-visual.png" },
  { id: 3, title: "Chapter 1+ Start", tag: "Future", code: "CH1-118", image: "/images/main-visual.png" },
  { id: 4, title: "Project 10 Field", tag: "Field", code: "P10-530", image: "/images/main-visual.png" },
];

const filters = ["All", "Game Day", "Archive", "Field", "Team"];

export default function PhotoGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className="mb-8 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#A8222B]">
            OB Game Day Archive
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#421211] md:text-5xl">
            2026.05.30 影像資料庫
          </h2>
        </div>

        <p className="max-w-md text-sm leading-7 text-[#7A665B] md:text-base">
          第一階段以 OB 賽當天照片為主。正式上線後，這裡會由後台上傳照片並自動生成資料卡。
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            className="rounded-full border border-[#D8C7B2] bg-white/50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#421211] transition hover:border-[#8E1F26] hover:bg-[#8E1F26] hover:text-white"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {demoPhotos.map((photo) => (
          <article
            key={photo.id}
            className="group overflow-hidden rounded-[2rem] border border-[#D8C7B2] bg-white/65 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(66,18,17,0.18)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#E8D8C7]">
              <img
                src={photo.image}
                alt={photo.title}
                className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute left-4 top-4 rounded-full bg-[#421211]/80 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white backdrop-blur">
                {photo.code}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#421211]/70 to-transparent opacity-0 transition group-hover:opacity-100" />
            </div>

            <div className="p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#A8222B]">
                {photo.tag}
              </p>
              <h3 className="mt-2 text-xl font-black text-[#421211]">
                {photo.title}
              </h3>
              <p className="mt-3 text-xs leading-5 text-[#7A665B]">
                Metadata pending / 待後台上傳正式照片資料
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
`);

write("src/app/page.tsx", `
import DonationModal from "../components/DonationModal";
import PhotoGrid from "../components/PhotoGrid";

const stats = [
  { label: "Anniversary", value: "10th" },
  { label: "Game Date", value: "05.30" },
  { label: "Chapter", value: "1+" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4E8D9] text-[#421211]">
      <section className="relative min-h-screen px-5 py-6 md:px-8 md:py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#C96E55_0%,#B95040_24%,#E7D9C8_72%,#F4E8D9_100%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,#421211_1px,transparent_1px),linear-gradient(#421211_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#421211]/20 to-transparent" />

        <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col">
          <header className="flex items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="NCKU Baseball Club Logo"
                className="h-12 w-12 rounded-full object-contain md:h-16 md:w-16"
              />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/80">
                  NCKU Baseball Club
                </p>
                <p className="text-lg font-black text-white md:text-2xl">
                  PROJECT 10
                </p>
              </div>
            </a>

            <a
              href="/admin"
              className="rounded-full border border-white/60 bg-white/10 px-4 py-2 text-xs font-black text-white backdrop-blur transition hover:bg-white hover:text-[#8E1F26] md:px-5 md:py-3 md:text-sm"
            >
              後台
            </a>
          </header>

          <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-8">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white backdrop-blur">
                Chapter 0 → Chapter 1+
              </div>

              <h1 className="mt-6 text-5xl font-black leading-[0.9] tracking-tight text-white drop-shadow-lg md:text-7xl lg:text-8xl">
                YOUR
                <br />
                MEMORY
              </h1>

              <p className="mt-6 max-w-2xl text-lg font-black leading-8 text-white md:text-2xl">
                一旦怠惰，很快就會出現差距。
                <br />
                不滿足於現狀，要越變越強！
              </p>

              <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-white/85 md:text-base">
                作為紀念成大乙棒走過的第一個 10 年，PROJECT 10 將整理 OB 賽當天的影像與回憶，成為持續公開的十週年資料庫。
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#photos"
                  className="rounded-full bg-white px-7 py-3 text-center text-sm font-black text-[#8E1F26] shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  查看照片輯
                </a>
                <a
                  href="#event"
                  className="rounded-full border border-white/70 px-7 py-3 text-center text-sm font-black text-white transition hover:bg-white hover:text-[#8E1F26]"
                >
                  活動資訊
                </a>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-white/25 bg-white/10 p-4 text-white backdrop-blur"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-black md:text-3xl">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="relative rounded-[2rem] border border-white/40 bg-white/20 p-3 shadow-2xl backdrop-blur-md">
                <div className="absolute -right-3 -top-3 rounded-full bg-[#8E1F26] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg">
                  Live Archive
                </div>
                <img
                  src="/images/main-visual.png"
                  alt="Project 10 Main Visual"
                  className="w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="event" className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[#D8C7B2] bg-white/60 p-6 backdrop-blur md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A8222B]">
              Event Info
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#421211] md:text-5xl">
              NCKU Baseball Club 10th Anniversary Game
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#7A665B] md:text-base">
              2026 年 5 月 30 日於中信科大舉辦十週年 OB 賽。這個網站將作為活動照片與回憶的公開入口。
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#D8C7B2] bg-[#421211] p-6 text-white shadow-xl md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#D8C7B2]">
              Scoreboard
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Date</p>
                <p className="mt-1 text-3xl font-black">2026.05.30</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Place</p>
                <p className="mt-1 text-2xl font-black">中信科大</p>
              </div>
              <div className="col-span-2 border-t border-white/20 pt-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Mode</p>
                <p className="mt-1 text-2xl font-black">OB GAME / PHOTO ARCHIVE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PhotoGrid />

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <footer className="rounded-[2rem] border border-[#D8C7B2] bg-white/50 p-6 text-sm text-[#7A665B] md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="font-black text-[#421211]">PROJECT 10 / NCKU Baseball Club</p>
            <p>Chapter 0 to Chapter 1+ / Your Memory</p>
          </div>
        </footer>
      </section>

      <DonationModal />
    </main>
  );
}
`);

console.log("Updated to PROJECT 10 v0.2");
`);