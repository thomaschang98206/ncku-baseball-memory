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

write("src/components/AdminGate.tsx", String.raw`
"use client";

import { useEffect, useState } from "react";

const ADMIN_PASSWORD = "baseball0530";

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem("project10-admin") === "ok") {
      setAllowed(true);
    }
  }, []);

  function login() {
    if (password === ADMIN_PASSWORD) {
      window.localStorage.setItem("project10-admin", "ok");
      setAllowed(true);
      setError("");
    } else {
      setError("密碼錯誤");
    }
  }

  function logout() {
    window.localStorage.removeItem("project10-admin");
    setAllowed(false);
    setPassword("");
  }

  if (allowed) {
    return (
      <>
        <div className="border-b border-[#D8C7B2] bg-[#1A0908] px-5 py-3 text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D8C7B2]">
              PROJECT 10 ADMIN MODE
            </p>
            <button
              onClick={logout}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-black hover:bg-white hover:text-[#421211]"
            >
              登出
            </button>
          </div>
        </div>
        {children}
      </>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4E8D9] px-5 text-[#421211]">
      <section className="w-full max-w-md rounded-[2rem] border border-[#D8C7B2] bg-white/80 p-8 shadow-2xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8E1F26]">
          Restricted Area
        </p>
        <h1 className="mt-3 text-3xl font-black">PROJECT 10 後台</h1>
        <p className="mt-3 text-sm leading-7 text-[#7A665B]">
          請輸入管理密碼。
        </p>

        <input
          type="password"
          className="mt-6 w-full rounded-2xl border border-[#D8C7B2] bg-white px-4 py-3 text-sm outline-none focus:border-[#8E1F26] focus:ring-4 focus:ring-[#8E1F26]/10"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") login();
          }}
        />

        {error && <p className="mt-3 text-sm font-bold text-[#8E1F26]">{error}</p>}

        <button
          onClick={login}
          className="mt-5 w-full rounded-full bg-[#421211] py-3 text-sm font-black text-white transition hover:bg-[#8E1F26]"
        >
          進入後台
        </button>
      </section>
    </main>
  );
}
`);

write("src/components/DonationModal.tsx", String.raw`
"use client";

import { useState } from "react";

export default function DonationModal() {
  const [open, setOpen] = useState(false);

  async function copyAccount() {
    await navigator.clipboard.writeText("0031071-0891691");
    alert("帳號已複製");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 items-center justify-between rounded-full bg-[#8E1F26] px-5 py-3 text-white shadow-2xl transition hover:bg-[#421211] md:px-7"
      >
        <span className="text-xs font-black uppercase tracking-[0.22em] md:text-sm">
          SUPPORT PROJECT 10
        </span>
        <span className="text-sm font-black">捐款與紀念品付款 →</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#160808]/75 px-4 backdrop-blur-md">
          <section className="w-full max-w-lg overflow-hidden rounded-[1.5rem] border border-[#D8C7B2] bg-[#F8F2E8] shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#D8C7B2] px-6 py-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8E1F26]">
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
              <div className="grid gap-3 rounded-[1.25rem] border border-[#D8C7B2] bg-white/70 p-5 text-sm text-[#421211]">
                <p><span className="font-black text-[#8E1F26]">銀行：</span>中華郵政</p>
                <p><span className="font-black text-[#8E1F26]">代碼：</span>700</p>
                <p><span className="font-black text-[#8E1F26]">帳號：</span>0031071-0891691</p>
                <p><span className="font-black text-[#8E1F26]">戶名：</span>成功大學棒球社王昱崚</p>
                <p><span className="font-black text-[#8E1F26]">分行：</span>成功大學郵局</p>
              </div>

              <p className="mt-4 text-sm leading-7 text-[#7A665B]">
                轉帳後請保留匯款資訊。若為商品購買，送出表單後再依此帳戶完成付款。
              </p>

              <button
                onClick={copyAccount}
                className="mt-6 w-full rounded-full bg-[#421211] py-3 text-sm font-black text-white transition hover:bg-[#8E1F26]"
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

write("src/app/admin/page.tsx", String.raw`
import AdminGate from "../../components/AdminGate";
import AdminNav from "../../components/AdminNav";

export default function AdminPage() {
  return (
    <AdminGate>
      <main className="min-h-screen bg-[#F4E8D9] text-[#421211]">
        <AdminNav />
        <section className="mx-auto max-w-5xl px-5 py-12 md:px-8">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8E1F26]">
            Control Panel
          </p>
          <h1 className="mt-3 text-4xl font-black">PROJECT 10 後台</h1>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <a
              href="/admin/settings"
              className="rounded-[1.5rem] border border-[#D8C7B2] bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8E1F26]">
                Site Settings
              </p>
              <h2 className="mt-3 text-2xl font-black">網站內容設定</h2>
              <p className="mt-3 text-sm leading-7 text-[#7A665B]">
                修改首頁文字、照片區說明與活動資訊。
              </p>
            </a>
          </div>
        </section>
      </main>
    </AdminGate>
  );
}
`);

write("src/app/admin/settings/page.tsx", String.raw`
import AdminGate from "../../../components/AdminGate";
import AdminNav from "../../../components/AdminNav";
import AdminSettingsForm from "../../../components/AdminSettingsForm";

export default function AdminSettingsPage() {
  return (
    <AdminGate>
      <main className="min-h-screen bg-[#F4E8D9] text-[#421211]">
        <AdminNav />
        <section className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A8222B]">
              Control Panel
            </p>
            <h1 className="mt-3 text-3xl font-black md:text-5xl">
              網站內容設定
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#7A665B]">
              修改後回首頁重新整理，即可看到資料庫的新內容。
            </p>
          </div>
          <AdminSettingsForm />
        </section>
      </main>
    </AdminGate>
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

export default async function HomePage() {
  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .single();

  const settings = (data ?? fallbackSettings) as SiteSettings;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4E8D9] text-[#421211]">
      <section className="px-4 pt-4 md:px-6 md:pt-6">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] border border-[#D8C7B2] bg-[#F8F2E8] shadow-sm">
          <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex flex-col justify-between border-b border-[#D8C7B2] p-6 md:p-10 lg:border-b-0 lg:border-r">
              <header className="flex items-center gap-3">
                <img
                  src={settings.logo_url}
                  alt="NCKU Baseball Club Logo"
                  className="h-12 w-12 rounded-full object-contain"
                />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8E1F26]">
                    NCKU Baseball Club
                  </p>
                  <p className="text-xl font-black">{settings.site_title}</p>
                </div>
              </header>

              <div className="py-16 md:py-20">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#8E1F26]">
                  Archive Cover / 2016–2026+
                </p>
                <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
                  成大乙棒
                  <br />
                  十週年影像計畫
                </h1>
                <p className="mt-6 max-w-xl text-base font-bold leading-8 text-[#6F5C54] md:text-lg">
                  {settings.slogan}
                </p>
                <p className="mt-5 max-w-xl text-sm leading-8 text-[#7A665B]">
                  {settings.project_intro}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="border-t border-[#D8C7B2] pt-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8E1F26]">Date</p>
                  <p className="mt-2 font-black">{settings.event_date}</p>
                </div>
                <div className="border-t border-[#D8C7B2] pt-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8E1F26]">Place</p>
                  <p className="mt-2 font-black">{settings.event_place}</p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center bg-[#E8D8C7] p-4 md:p-8">
              <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,#421211_1px,transparent_1px),linear-gradient(#421211_1px,transparent_1px)] [background-size:40px_40px]" />
              <img
                src={settings.hero_image_url}
                alt="Project 10 Main Visual"
                className="relative max-h-[88vh] w-full max-w-xl rounded-[1rem] object-contain shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-6 border-y border-[#D8C7B2] py-10 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8E1F26]">
              Event Data
            </p>
            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              {settings.subtitle}
            </h2>
          </div>
          <p className="text-sm leading-8 text-[#7A665B] md:text-base">
            {settings.event_intro}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-[1.5rem] border border-[#D8C7B2] bg-white/55 p-6 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8E1F26]">
              Chapter 0
            </p>
            <h2 className="mt-3 text-3xl font-black">2016–2021</h2>
            <p className="mt-5 text-sm leading-8 text-[#7A665B]">
              {settings.chapter_zero_text || "Chapter 0 指 2016–2021 以前的累積，是成大乙棒第一段歷史。"}
            </p>
          </article>

          <article className="rounded-[1.5rem] border border-[#D8C7B2] bg-[#421211] p-6 text-white md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#D8C7B2]">
              Chapter 1+
            </p>
            <h2 className="mt-3 text-3xl font-black">2021–2026+</h2>
            <p className="mt-5 text-sm leading-8 text-[#F4E8D9]/80">
              {settings.chapter_one_text || "Chapter 1+ 指 2021–2026，並且代表故事會繼續往後。"}
            </p>
          </article>
        </div>
      </section>

      <section id="photos" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-8 border-y border-[#D8C7B2] py-10 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#8E1F26]">
              Photo Archive
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              {settings.photo_section_title || "OB Game Archive"}
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-8 text-[#7A665B] md:text-base">
            {settings.photo_section_note || "2026.05.30 OB 賽當天影像整理中。正式照片上傳後，這裡會成為公開影像資料庫。"}
          </p>
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-dashed border-[#BFAE99] bg-white/45 p-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8E1F26]">
            Archive Status
          </p>
          <p className="mt-3 text-2xl font-black">等待 OB 賽照片上傳</p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#7A665B]">
            這一區不再使用主視覺當假照片。之後會從後台上傳照片，並自動生成影像資料卡。
          </p>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-5 pb-28 md:px-8">
        <div className="border-t border-[#D8C7B2] py-8 text-sm text-[#7A665B]">
          <p className="font-black text-[#421211]">{settings.site_title} / NCKU Baseball Club</p>
        </div>
      </footer>

      <DonationModal />
    </main>
  );
}
`);

console.log("Updated to v0.4-A FIX");