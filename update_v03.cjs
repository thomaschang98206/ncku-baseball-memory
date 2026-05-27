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

write("src/components/AdminSettingsForm.tsx", `
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type SiteSettings = {
  id: string;
  site_title: string;
  subtitle: string;
  slogan: string;
  project_intro: string;
  event_intro: string;
  event_date: string;
  event_place: string;
  hero_image_url: string;
  logo_url: string;
};

export default function AdminSettingsForm() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [status, setStatus] = useState("載入中");

  useEffect(() => {
    async function loadSettings() {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        setStatus("讀取失敗：" + error.message);
        return;
      }

      setSettings(data);
      setStatus("已連線");
    }

    loadSettings();
  }, []);

  function updateField(field: keyof SiteSettings, value: string) {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  }

  async function saveSettings() {
    if (!settings) return;

    setStatus("儲存中");

    const { error } = await supabase
      .from("site_settings")
      .update({
        site_title: settings.site_title,
        subtitle: settings.subtitle,
        slogan: settings.slogan,
        project_intro: settings.project_intro,
        event_intro: settings.event_intro,
        event_date: settings.event_date,
        event_place: settings.event_place,
        hero_image_url: settings.hero_image_url,
        logo_url: settings.logo_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", settings.id);

    if (error) {
      setStatus("儲存失敗：" + error.message);
      return;
    }

    setStatus("已儲存，請回首頁重新整理");
  }

  if (!settings) {
    return (
      <div className="rounded-[2rem] border border-[#D8C7B2] bg-white/70 p-6">
        {status}
      </div>
    );
  }

  const inputClass =
    "w-full rounded-2xl border border-[#D8C7B2] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8E1F26] focus:ring-4 focus:ring-[#8E1F26]/10";

  const labelClass = "text-xs font-black uppercase tracking-[0.18em] text-[#8E1F26]";

  return (
    <div className="grid gap-5">
      <div className="rounded-[2rem] border border-[#D8C7B2] bg-[#421211] p-5 text-white">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#D8C7B2]">
          Database Connection
        </p>
        <p className="mt-2 text-2xl font-black">{status}</p>
      </div>

      <div className="grid gap-5 rounded-[2rem] border border-[#D8C7B2] bg-white/70 p-6 backdrop-blur md:p-8">
        <div>
          <label className={labelClass}>網站正式名稱</label>
          <input
            className={inputClass}
            value={settings.site_title}
            onChange={(e) => updateField("site_title", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>副標題</label>
          <input
            className={inputClass}
            value={settings.subtitle}
            onChange={(e) => updateField("subtitle", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>標語 / 一句話介紹</label>
          <textarea
            className={inputClass}
            rows={3}
            value={settings.slogan}
            onChange={(e) => updateField("slogan", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>計畫簡介</label>
          <textarea
            className={inputClass}
            rows={4}
            value={settings.project_intro}
            onChange={(e) => updateField("project_intro", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>活動簡介</label>
          <textarea
            className={inputClass}
            rows={4}
            value={settings.event_intro}
            onChange={(e) => updateField("event_intro", e.target.value)}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>活動日期</label>
            <input
              className={inputClass}
              value={settings.event_date}
              onChange={(e) => updateField("event_date", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>活動地點</label>
            <input
              className={inputClass}
              value={settings.event_place}
              onChange={(e) => updateField("event_place", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>主視覺圖片路徑</label>
          <input
            className={inputClass}
            value={settings.hero_image_url}
            onChange={(e) => updateField("hero_image_url", e.target.value)}
          />
          <p className="mt-2 text-xs text-[#7A665B]">
            目前可填 /images/main-visual.png。之後會改成後台直接上傳。
          </p>
        </div>

        <div>
          <label className={labelClass}>Logo 圖片路徑</label>
          <input
            className={inputClass}
            value={settings.logo_url}
            onChange={(e) => updateField("logo_url", e.target.value)}
          />
        </div>

        <button
          onClick={saveSettings}
          className="rounded-full bg-[#8E1F26] px-7 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#421211]"
        >
          儲存網站內容
        </button>
      </div>
    </div>
  );
}
`);

write("src/app/admin/settings/page.tsx", `
import AdminNav from "../../../components/AdminNav";
import AdminSettingsForm from "../../../components/AdminSettingsForm";

export default function AdminSettingsPage() {
  return (
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
            這裡可以直接修改首頁文字。儲存後回首頁重新整理，就會讀取 Supabase 資料庫的新內容。
          </p>
        </div>

        <AdminSettingsForm />
      </section>
    </main>
  );
}
`);

write("src/app/page.tsx", `
import { supabase } from "../lib/supabase";
import DonationModal from "../components/DonationModal";
import PhotoGrid from "../components/PhotoGrid";

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

const stats = [
  { label: "Anniversary", value: "10th" },
  { label: "Game Date", value: "05.30" },
  { label: "Chapter", value: "1+" },
];

function splitSlogan(slogan: string) {
  return slogan
    .split(/[。！!\\n]/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default async function HomePage() {
  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .single();

  const settings = (data ?? fallbackSettings) as SiteSettings;
  const sloganLines = splitSlogan(settings.slogan);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4E8D9] text-[#421211]">
      <section className="relative min-h-screen px-5 py-6 md:px-8 md:py-8">
        <div className="absolute inset-0 bg-[#160808]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#8E1F26_0%,#421211_45%,#160808_100%)]" />
        <div className="absolute inset-0 opacity-[0.20] [background-image:linear-gradient(90deg,#F4E8D9_1px,transparent_1px),linear-gradient(#F4E8D9_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[#F4E8D9]/40" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F4E8D9] to-transparent" />

        <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col">
          <header className="flex items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-3">
              <img
                src={settings.logo_url}
                alt="NCKU Baseball Club Logo"
                className="h-12 w-12 rounded-full object-contain md:h-16 md:w-16"
              />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D8C7B2]">
                  NCKU Baseball Club
                </p>
                <p className="text-lg font-black text-white md:text-2xl">
                  {settings.site_title}
                </p>
              </div>
            </a>

            <a
              href="/admin/settings"
              className="rounded-full border border-[#D8C7B2]/60 bg-white/10 px-4 py-2 text-xs font-black text-white backdrop-blur transition hover:bg-[#F4E8D9] hover:text-[#8E1F26] md:px-5 md:py-3 md:text-sm"
            >
              後台
            </a>
          </header>

          <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-8">
            <div className="max-w-3xl">
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#D8C7B2]/40 bg-[#F4E8D9]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#F4E8D9] backdrop-blur">
                  STATUS: ONLINE
                </span>
                <span className="rounded-full border border-[#D8C7B2]/40 bg-[#F4E8D9]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#F4E8D9] backdrop-blur">
                  ARCHIVE MODE
                </span>
              </div>

              <p className="text-sm font-black uppercase tracking-[0.28em] text-[#D8C7B2]">
                {settings.subtitle}
              </p>

              <h1 className="mt-5 text-5xl font-black leading-[0.9] tracking-tight text-white drop-shadow-lg md:text-7xl lg:text-8xl">
                {settings.site_title}
                <br />
                ARCHIVE
              </h1>

              <div className="mt-6 max-w-2xl text-lg font-black leading-8 text-white md:text-2xl">
                {sloganLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-[#F4E8D9]/85 md:text-base">
                {settings.project_intro}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#photos"
                  className="rounded-full bg-[#F4E8D9] px-7 py-3 text-center text-sm font-black text-[#8E1F26] shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  OPEN PHOTO DATABASE
                </a>
                <a
                  href="#event"
                  className="rounded-full border border-[#D8C7B2]/70 px-7 py-3 text-center text-sm font-black text-white transition hover:bg-[#F4E8D9] hover:text-[#8E1F26]"
                >
                  EVENT DATA
                </a>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-[#D8C7B2]/30 bg-[#F4E8D9]/10 p-4 text-white backdrop-blur"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#D8C7B2]">
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
              <div className="relative rounded-[2rem] border border-[#D8C7B2]/40 bg-[#F4E8D9]/10 p-3 shadow-2xl backdrop-blur-md">
                <div className="absolute -right-3 -top-3 rounded-full bg-[#8E1F26] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg">
                  DATA CARD
                </div>
                <img
                  src={settings.hero_image_url}
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
          <div className="rounded-[2rem] border border-[#D8C7B2] bg-white/70 p-6 backdrop-blur md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A8222B]">
              Event Data
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#421211] md:text-5xl">
              {settings.subtitle}
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#7A665B] md:text-base">
              {settings.event_intro}
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#D8C7B2] bg-[#421211] p-6 text-white shadow-xl md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#D8C7B2]">
              Scoreboard
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Date</p>
                <p className="mt-1 text-3xl font-black">{settings.event_date}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Place</p>
                <p className="mt-1 text-2xl font-black">{settings.event_place}</p>
              </div>
              <div className="col-span-2 border-t border-white/20 pt-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Mode</p>
                <p className="mt-1 text-2xl font-black">OB GAME / PHOTO ARCHIVE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="photos">
        <PhotoGrid />
      </div>

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <footer className="rounded-[2rem] border border-[#D8C7B2] bg-white/50 p-6 text-sm text-[#7A665B] md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="font-black text-[#421211]">{settings.site_title} / NCKU Baseball Club</p>
            <p>Chapter 0 to Chapter 1+ / Database Online</p>
          </div>
        </footer>
      </section>

      <DonationModal />
    </main>
  );
}
`);

console.log("Updated to v0.3 editable settings");