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

ensureDir("src/components");
ensureDir("src/app/admin/photos");
ensureDir("src/app/admin/donations");
ensureDir("src/app/admin/settings");
ensureDir("public/images");

write("src/components/DonationModal.tsx", `
"use client";

import { useState } from "react";

export default function DonationModal() {
  const [open, setOpen] = useState(false);

  const accountName = "請填入戶名";
  const bankName = "請填入銀行名稱";
  const accountNumber = "000-000-000000";

  async function copyAccount() {
    await navigator.clipboard.writeText(accountNumber);
    alert("帳號已複製");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 rounded-full bg-[#8E1F26] px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-105 hover:bg-[#6F171D] md:bottom-8 md:right-8"
      >
        支持我們
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
          <div className="w-full max-w-md rounded-[2rem] bg-[#F6EFE4] p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8E1F26]">
                  Donation
                </p>
                <h2 className="mt-2 text-2xl font-black text-[#421211]">
                  支持 NCKU Baseball Club
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#6F5C54]">
                  掃描 QR Code 或使用下方帳號支持我們，讓 PROJECT 10 的記憶繼續延伸。
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full px-3 py-1 text-2xl leading-none text-[#6F5C54] hover:bg-black/10"
                aria-label="關閉捐款視窗"
              >
                ×
              </button>
            </div>

            <div className="rounded-3xl border border-[#D8C7B2] bg-white/70 p-4">
              <div className="space-y-2 text-sm text-[#421211]">
                <p><span className="text-[#8B7568]">戶名：</span>{accountName}</p>
                <p><span className="text-[#8B7568]">銀行：</span>{bankName}</p>
                <p><span className="text-[#8B7568]">帳號：</span>{accountNumber}</p>
              </div>

              <div className="mt-5 flex justify-center">
                <div className="flex h-44 w-44 items-center justify-center rounded-2xl border border-dashed border-[#BFAE99] bg-[#F8F4EC] text-center text-xs leading-5 text-[#8B7568]">
                  QR Code<br />之後放這裡
                </div>
              </div>

              <button
                onClick={copyAccount}
                className="mt-5 w-full rounded-full bg-[#421211] py-3 text-sm font-semibold text-white transition hover:bg-[#8E1F26]"
              >
                複製帳號
              </button>
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
  { id: 1, title: "Memory 01", category: "Chapter 0", image: "/images/main-visual.png" },
  { id: 2, title: "Memory 02", category: "Project 10", image: "/images/main-visual.png" },
  { id: 3, title: "Memory 03", category: "Chapter 1+", image: "/images/main-visual.png" },
];

export default function PhotoGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#A8222B]">
            Photo Archive
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#421211] md:text-5xl">
            影像記憶牆
          </h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-[#7A665B] md:text-base">
          這裡之後會接後台上傳的照片。目前先用主視覺作為 placeholder。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {demoPhotos.map((photo) => (
          <article
            key={photo.id}
            className="group overflow-hidden rounded-[2rem] border border-[#D8C7B2] bg-white/70 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="aspect-[4/5] overflow-hidden bg-[#E8D8C7]">
              <img
                src={photo.image}
                alt={photo.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8222B]">
                {photo.category}
              </p>
              <h3 className="mt-2 text-xl font-black text-[#421211]">
                {photo.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
`);

write("src/components/AdminNav.tsx", `
import Link from "next/link";

const links = [
  { href: "/admin", label: "後台首頁" },
  { href: "/admin/photos", label: "照片管理" },
  { href: "/admin/donations", label: "捐款紀錄" },
  { href: "/admin/settings", label: "捐款設定" },
];

export default function AdminNav() {
  return (
    <nav className="border-b border-[#D8C7B2] bg-[#F6EFE4]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <Link href="/" className="font-black text-[#421211]">
          NCKU Baseball Admin
        </Link>
        <div className="flex flex-wrap gap-3 text-sm font-semibold text-[#7A665B]">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#8E1F26]">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
`);

write("src/app/page.tsx", `
import DonationModal from "../components/DonationModal";
import PhotoGrid from "../components/PhotoGrid";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4E8D9] text-[#421211]">
      <section className="relative min-h-screen px-5 py-6 md:px-8 md:py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#C96E55_0%,#B95040_22%,#E7D9C8_74%,#F4E8D9_100%)]" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(90deg,#421211_1px,transparent_1px),linear-gradient(#421211_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col">
          <header className="flex items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="NCKU Baseball Club Logo"
                className="h-12 w-12 rounded-full object-contain md:h-16 md:w-16"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                  NCKU Baseball Club
                </p>
                <p className="text-lg font-black text-white md:text-2xl">
                  PROJECT 10
                </p>
              </div>
            </a>

            <a
              href="/admin"
              className="rounded-full border border-white/60 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur transition hover:bg-white hover:text-[#8E1F26] md:px-5 md:py-3 md:text-sm"
            >
              後台
            </a>
          </header>

          <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-white/80">
                Chapter 0 → Chapter 1+
              </p>

              <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight text-white drop-shadow-lg md:text-7xl lg:text-8xl">
                YOUR<br />MEMORY
              </h1>

              <p className="mt-6 max-w-xl text-base font-medium leading-8 text-white/90 md:text-lg">
                NCKU Baseball Club 十週年影像計畫。這裡會成為照片、回憶與支持入口的公開平台。
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#photos" className="rounded-full bg-white px-7 py-3 text-center text-sm font-black text-[#8E1F26] shadow-xl transition hover:scale-105">
                  查看照片輯
                </a>
                <a href="#about" className="rounded-full border border-white/70 px-7 py-3 text-center text-sm font-black text-white transition hover:bg-white hover:text-[#8E1F26]">
                  關於計畫
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="rounded-[2rem] border border-white/40 bg-white/20 p-3 shadow-2xl backdrop-blur-md">
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

      <section id="about" className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="rounded-[2rem] border border-[#D8C7B2] bg-white/60 p-6 md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#A8222B]">
            About
          </p>
          <h2 className="mt-3 text-3xl font-black text-[#421211] md:text-5xl">
            一座給十年記憶的線上球場
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-[#7A665B] md:text-base">
            這個網站目前先建立基本框架：前台展示、照片區、捐款彈窗與後台入口。
          </p>
        </div>
      </section>

      <div id="photos">
        <PhotoGrid />
      </div>

      <DonationModal />
    </main>
  );
}
`);

write("src/app/admin/page.tsx", `
import AdminNav from "../../components/AdminNav";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#F4E8D9] text-[#421211]">
      <AdminNav />
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <h1 className="text-3xl font-black md:text-5xl">後台首頁</h1>
        <p className="mt-3 text-[#7A665B]">
          目前先建立後台框架。之後會加入登入、照片上傳與捐款紀錄管理。
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          <a href="/admin/photos" className="rounded-[2rem] border border-[#D8C7B2] bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-xl">
            <h2 className="text-xl font-black">照片管理</h2>
            <p className="mt-2 text-sm leading-6 text-[#7A665B]">上傳、編輯、公開或隱藏照片。</p>
          </a>
          <a href="/admin/donations" className="rounded-[2rem] border border-[#D8C7B2] bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-xl">
            <h2 className="text-xl font-black">捐款紀錄</h2>
            <p className="mt-2 text-sm leading-6 text-[#7A665B]">手動新增與確認捐款資料。</p>
          </a>
          <a href="/admin/settings" className="rounded-[2rem] border border-[#D8C7B2] bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-xl">
            <h2 className="text-xl font-black">捐款設定</h2>
            <p className="mt-2 text-sm leading-6 text-[#7A665B]">編輯戶名、銀行帳號與 QR Code。</p>
          </a>
        </div>
      </section>
    </main>
  );
}
`);

write("src/app/admin/photos/page.tsx", `
import AdminNav from "../../../components/AdminNav";

export default function AdminPhotosPage() {
  return (
    <main className="min-h-screen bg-[#F4E8D9] text-[#421211]">
      <AdminNav />
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <h1 className="text-3xl font-black md:text-5xl">照片管理</h1>
        <p className="mt-3 text-[#7A665B]">之後這裡會接 Supabase Storage，讓你從後台上傳照片。</p>
      </section>
    </main>
  );
}
`);

write("src/app/admin/donations/page.tsx", `
import AdminNav from "../../../components/AdminNav";

export default function AdminDonationsPage() {
  return (
    <main className="min-h-screen bg-[#F4E8D9] text-[#421211]">
      <AdminNav />
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <h1 className="text-3xl font-black md:text-5xl">捐款紀錄</h1>
        <p className="mt-3 text-[#7A665B]">目前是手動管理版。之後可新增資料庫、新增表單與 CSV 匯出。</p>
      </section>
    </main>
  );
}
`);

write("src/app/admin/settings/page.tsx", `
import AdminNav from "../../../components/AdminNav";

export default function AdminSettingsPage() {
  return (
    <main className="min-h-screen bg-[#F4E8D9] text-[#421211]">
      <AdminNav />
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <h1 className="text-3xl font-black md:text-5xl">捐款設定</h1>
        <p className="mt-3 text-[#7A665B]">之後這裡會接資料庫，讓你直接從後台改戶名、帳號與 QR Code。</p>
      </section>
    </main>
  );
}
`);

console.log("");
console.log("Done. 請確認圖片放在 public/images/main-visual.png 與 public/images/logo.png");