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

write("src/components/ProductOrderModal.tsx", String.raw`
"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

type ProductType = "towel" | "jersey";

type Props = {
  type: ProductType;
  name: string;
  price: number;
  image: string;
  label: string;
};

export default function ProductOrderModal({ type, name, price, image, label }: Props) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("閬芾?曉凳?典?鞎?);
  const [storeInfo, setStoreInfo] = useState("");
  const [note, setNote] = useState("");

  const [size, setSize] = useState("L");
  const [jerseyName, setJerseyName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");

  const total = quantity * price;

  async function copyAccount() {
    await navigator.clipboard.writeText("0031071-0891691");
    alert("撣唾?撌脰?鋆?);
  }

  async function submitOrder() {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("隢‵撖怠????餉店");
      return;
    }

    if (type === "jersey") {
      if (!jerseyName.trim() || !jerseyNumber.trim()) {
        alert("?﹝隢‵撖怨??摮???");
        return;
      }
    }

    setSending(true);

    const productDetail =
      type === "jersey"
        ? name + " / 撠箏站 " + size + " / ?? " + jerseyName + " / ?? " + jerseyNumber
        : name;

    const orderNote =
      [
        note,
        type === "jersey" ? "撠箏站嚗? + size : "",
        type === "jersey" ? "?望???嚗? + jerseyName : "",
        type === "jersey" ? "??嚗? + jerseyNumber : "",
      ]
        .filter(Boolean)
        .join("嚗?);

    const { error } = await supabase.from("orders").insert({
      product_name: productDetail,
      unit_price: price,
      quantity,
      total_price: total,
      customer_name: customerName,
      customer_phone: customerPhone,
      delivery_method: deliveryMethod,
      store_info: deliveryMethod.includes("7-11") ? storeInfo : "",
      note: orderNote,
      payment_status: "pending",
    });

    setSending(false);

    if (error) {
      console.error(error);
      alert("?憭望?嚗?瑼Ｘ Supabase orders 甈????”??);
      return;
    }

    setDone(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group w-full text-left"
      >
        <article className="h-full rounded-[2rem] border border-white/18 bg-[#F4E8D9]/90 p-5 text-[#421211] shadow-[0_18px_60px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-[#D9C8B5] bg-white">
            <img src={image} alt={name} className="h-72 w-full object-contain p-4" />
            <div className="absolute bottom-4 right-4 rounded-full bg-[#8E1F26] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">
              Order
            </div>
          </div>

          <div className="p-4">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#A82128]">{label}</p>
            <h3 className="mt-3 text-3xl font-black">{name}</h3>
            <p className="mt-2 text-2xl font-black text-[#A82128]">NT\${price}</p>
          </div>
        </article>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#120505]/80 px-4 py-6 backdrop-blur-md">
          <section className="max-h-[92vh] w-full max-w-4xl overflow-auto rounded-[2rem] border border-white/20 bg-[#F4E8D9] p-5 text-[#421211] shadow-2xl md:p-7">
            <div className="flex items-start justify-between gap-4 border-b border-[#D8C7B2] pb-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A82128]">
                  Product Order
                </p>
                <h2 className="mt-2 text-3xl font-black">{name}</h2>
                <p className="mt-2 text-sm text-[#7A665B]">憛怠神鞈?敺?隢?頧董鞈?摰?隞狡??/p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setDone(false);
                }}
                className="rounded-full bg-[#421211] px-4 py-2 text-sm font-black text-white hover:bg-[#A82128]"
              >
                ??
              </button>
            </div>

            {!done ? (
              <div className="mt-6 grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[1.5rem] border border-[#D8C7B2] bg-white/70 p-4">
                  <img src={image} alt={name} className="max-h-[520px] w-full object-contain" />
                </div>

                <div className="grid gap-4">
                  <label className="grid gap-2 text-sm font-bold">
                    ?賊?
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="rounded-2xl border border-[#D8C7B2] bg-white px-4 py-3 outline-none focus:border-[#A82128]"
                    />
                  </label>

                  {type === "jersey" && (
                    <>
                      <label className="grid gap-2 text-sm font-bold">
                        撠箏站
                        <select
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                          className="rounded-2xl border border-[#D8C7B2] bg-white px-4 py-3 outline-none focus:border-[#A82128]"
                        >
                          <option value="2L">2L</option>
                          <option value="XL">XL</option>
                          <option value="L">L</option>
                          <option value="M">M</option>
                        </select>
                      </label>

                      <label className="grid gap-2 text-sm font-bold">
                        ?﹝??望???
                        <input
                          value={jerseyName}
                          onChange={(e) => setJerseyName(e.target.value.toUpperCase())}
                          placeholder="靘?嚗.H YEH"
                          className="rounded-2xl border border-[#D8C7B2] bg-white px-4 py-3 outline-none focus:border-[#A82128]"
                        />
                      </label>

                      <label className="grid gap-2 text-sm font-bold">
                        ??
                        <input
                          value={jerseyNumber}
                          onChange={(e) => setJerseyNumber(e.target.value)}
                          placeholder="靘?嚗?2"
                          className="rounded-2xl border border-[#D8C7B2] bg-white px-4 py-3 outline-none focus:border-[#A82128]"
                        />
                      </label>
                    </>
                  )}

                  <label className="grid gap-2 text-sm font-bold">
                    憪?
                    <input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="rounded-2xl border border-[#D8C7B2] bg-white px-4 py-3 outline-none focus:border-[#A82128]"
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-bold">
                    ?餉店
                    <input
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="rounded-2xl border border-[#D8C7B2] bg-white px-4 py-3 outline-none focus:border-[#A82128]"
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-bold">
                    ?疏?孵?
                    <select
                      value={deliveryMethod}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="rounded-2xl border border-[#D8C7B2] bg-white px-4 py-3 outline-none focus:border-[#A82128]"
                    >
                      <option>閬芾?曉凳?典?鞎?/option>
                      <option>7-11 摨摨?/option>
                    </select>
                  </label>

                  {deliveryMethod.includes("7-11") && (
                    <label className="grid gap-2 text-sm font-bold">
                      7-11 ?嗡辣?撣?閮?
                      <textarea
                        value={storeInfo}
                        onChange={(e) => setStoreInfo(e.target.value)}
                        placeholder="隢‵?撣?蝔晞????啣?"
                        className="min-h-24 rounded-2xl border border-[#D8C7B2] bg-white px-4 py-3 outline-none focus:border-[#A82128]"
                      />
                    </label>
                  )}

                  <label className="grid gap-2 text-sm font-bold">
                    ?酉
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="min-h-20 rounded-2xl border border-[#D8C7B2] bg-white px-4 py-3 outline-none focus:border-[#A82128]"
                    />
                  </label>

                  <div className="rounded-2xl bg-[#421211] p-5 text-white">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/50">Total</p>
                    <p className="mt-2 text-3xl font-black">NT\${total}</p>
                  </div>

                  <button
                    type="button"
                    disabled={sending}
                    onClick={submitOrder}
                    className="rounded-full bg-[#A82128] py-4 text-sm font-black text-white transition hover:bg-[#421211] disabled:opacity-50"
                  >
                    {sending ? "?銝?.." : "?閮頃鞈?"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 grid gap-5">
                <div className="rounded-[1.5rem] border border-[#D8C7B2] bg-white/70 p-6">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A82128]">
                    Order Received
                  </p>
                  <h3 className="mt-3 text-3xl font-black">閮撌脤</h3>
                  <p className="mt-3 text-sm leading-7 text-[#7A665B]">
                    隢?銝鞈?摰?頧董??撣喳?隢??甈曇?閮?
                  </p>
                </div>

                <div className="grid gap-3 rounded-[1.5rem] border border-[#D8C7B2] bg-white/70 p-6 text-sm">
                  <p><span className="font-black text-[#A82128]">?銵?</span>銝剛?菜</p>
                  <p><span className="font-black text-[#A82128]">隞?Ⅳ嚗?/span>700</p>
                  <p><span className="font-black text-[#A82128]">撣唾?嚗?/span>0031071-0891691</p>
                  <p><span className="font-black text-[#A82128]">?嗅?嚗?/span>??憭批飛璉?蝷曄??勗?</p>
                  <p><span className="font-black text-[#A82128]">??嚗?/span>NT\${total}</p>
                </div>

                <button
                  type="button"
                  onClick={copyAccount}
                  className="rounded-full bg-[#421211] py-4 text-sm font-black text-white hover:bg-[#A82128]"
                >
                  銴ˊ撣唾?
                </button>
              </div>
            )}
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
import ProductOrderModal from "../components/ProductOrderModal";

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
  slogan: "銝?行嚗?敹怠停??曉榆頝?皛輯雲?潛?嚗?頞?頞撥嚗?,
  project_intro: "雿蝝敹菜?憭找?璉粥??蝚砌???10 撟氬?,
  event_intro: "2026 撟?5 ??30 ?交銝凋縑蝘之?齒?勗僑 OB 鞈賬?,
  event_date: "2026.05.30",
  event_place: "銝凋縑蝘之璉???,
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

function HudTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white backdrop-blur">
      {children}
    </span>
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
    <main className="min-h-screen overflow-x-hidden bg-[#1B0707] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(235,215,190,0.82),transparent_24%),radial-gradient(circle_at_56%_7%,rgba(178,79,58,0.82),transparent_36%),radial-gradient(circle_at_85%_26%,rgba(214,188,162,0.55),transparent_34%),radial-gradient(circle_at_45%_62%,rgba(146,37,36,0.7),transparent_32%),radial-gradient(circle_at_82%_88%,rgba(239,227,212,0.38),transparent_30%),linear-gradient(180deg,#2A0908_0%,#7B2D25_36%,#4A1513_66%,#180606_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.24] [background-image:linear-gradient(90deg,#F4E8D9_1px,transparent_1px),linear-gradient(#F4E8D9_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="fixed inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(180deg,transparent_0,rgba(255,255,255,0.65)_50%,transparent_100%)] [background-size:100%_6px]" />
      <div className="fixed inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-white/14 to-transparent" />
      <div className="fixed inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#F4E8D9]/20 to-transparent" />

      <section className="relative min-h-screen">
        <div className="pointer-events-none absolute left-6 top-24 hidden h-[60vh] w-px bg-white/25 md:block" />
        <div className="pointer-events-none absolute right-6 top-24 hidden h-[60vh] w-px bg-white/25 md:block" />

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

            <div className="hidden items-center gap-2 md:flex">
              <HudTag>Status: Online</HudTag>
              <HudTag>Archive Mode</HudTag>
            </div>
          </header>

          <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr]">
            <section>
              <div className="flex flex-wrap gap-2">
                <HudTag>Chapter 0 ??Chapter 1+</HudTag>
                <HudTag>OB Game Archive</HudTag>
                <HudTag>Project 10</HudTag>
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
                  ?亦??抒?頛?
                </a>
                <a
                  href="#event"
                  className="rounded-full border border-white/45 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-[#8E1F26]"
                >
                  ?閮
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3">
                {[
                  ["Anniversary", "10th"],
                  ["Game Date", "05.30"],
                  ["Chapter", "1+"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-3xl border border-white/18 bg-white/12 p-5 backdrop-blur">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F0D6B8]">{k}</p>
                    <p className="mt-3 text-3xl font-black">{v}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="relative mx-auto w-full max-w-[520px]">
              <div className="absolute -inset-4 rounded-[2.4rem] border border-white/25 bg-white/12 backdrop-blur-sm" />
              <div className="absolute -right-4 -top-5 rounded-full bg-[#A82128] px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-white shadow-xl">
                Data Card
              </div>
              <ImageLightbox
                src={settings.hero_image_url}
                alt="Project 10 Main Visual"
                title="PROJECT 10 銝餉?閬?
                label="Main Visual"
                description="?之銋??勗僑瘣餃?銝餉?閬箝?
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
            2016??026+ CHAPTER 0 - CHAPTER 1+
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article>
            <ImageLightbox
              src="/images/chapter-0.png"
              alt="Chapter 0"
              title="Chapter 0 / 2016??021"
              label="Chapter 0"
              description={settings.chapter_zero_text || "Chapter 0 ??2016??021 隞亙??敞蝛??舀?憭找?璉洵銝畾菜風?脯?}
              imageClassName="h-[520px] bg-[#F4E8D9] p-2"
            />
            <div className="mt-5 rounded-[1.5rem] border border-white/18 bg-[#F4E8D9]/90 p-6 text-[#421211]">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#A82128]">
                Chapter 0 / 2016??021
              </p>
              <p className="mt-4 text-sm leading-8 text-[#7A665B]">
                {settings.chapter_zero_text || "Chapter 0 ??2016??021 隞亙??敞蝛??舀?憭找?璉洵銝畾菜風?脯?}
              </p>
            </div>
          </article>

          <article>
            <ImageLightbox
              src="/images/chapter-1.png"
              alt="Chapter 1+"
              title="Chapter 1+ / 2021??026+"
              label="Chapter 1+"
              description={settings.chapter_one_text || "Chapter 1+ ??2021??026嚗蒂銝誨銵冽?鈭?蝜潛?敺敺?}
              imageClassName="h-[520px] bg-[#F4E8D9] p-2"
            />
            <div className="mt-5 rounded-[1.5rem] border border-white/18 bg-[#F4E8D9]/90 p-6 text-[#421211]">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#A82128]">
                Chapter 1+ / 2021??026+
              </p>
              <p className="mt-4 text-sm leading-8 text-[#7A665B]">
                {settings.chapter_one_text || "Chapter 1+ ??2021??026嚗蒂銝誨銵冽?鈭?蝜潛?敺敺?}
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
            {settings.photo_section_note || "2026.05.30 OB 鞈賜憭拙蔣??葉?迤撘???喳?嚗ㄐ???箏?蔣???澈??}
          </p>
        </div>

        <article className="mt-10 rounded-[2rem] border border-dashed border-white/25 bg-[#F4E8D9]/88 p-8 text-[#421211] backdrop-blur md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A82128]">
            OB Game / 2026.05.30
          </p>
          <h3 className="mt-16 text-3xl font-black md:text-5xl">蝑? OB 鞈賜????/h3>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-[#7A665B]">
            ?ㄐ?芯??????雿?OB 鞈賜憭拙蔣??敺??唬??喟??嚗??券ㄐ???抒????舀憭抒?敶勗??～?
          </p>
        </article>
      </SectionShell>

      <SectionShell>
        <div className="mb-8">
          <Label>Goods</Label>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">蝝敹萄???/h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ProductOrderModal
            type="towel"
            name="PROJECT 10 瘥溝"
            price={450}
            image="/images/towel.png"
            label="Product 01"
          />

          <ProductOrderModal
            type="jersey"
            name="PROJECT 10 ?﹝"
            price={1450}
            image="/images/jersey.png"
            label="Product 02"
          />
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

console.log("Updated to v0.4-E");
