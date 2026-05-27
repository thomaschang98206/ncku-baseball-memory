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
