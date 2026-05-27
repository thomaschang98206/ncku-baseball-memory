@'
import type { ReactNode } from "react";
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
  slogan: "一旦怠惰，很快就會出現差距\n不滿足於現狀，要越變越強！",
  project_intro: "作為紀念成大乙棒走過的第一個 10 年，PROJECT 10 會成為照片、回憶與支持入口的公開平台。",
  event_intro: "2026 年 5 月 30 日於中信科大舉辦十週年 OB 賽。",
  event_date: "2026.05.30",
  event_place: "中信科大棒球場",
  hero_image_url: "/images/main-visual.png",
  logo_url: "/images/logo.png",
  photo_section_title: "OB Game Archive",
  photo_section_note: "2026.05.30 OB 賽當天影像整理中。照片上傳後，這裡將成為當天記憶的影像資料庫。",
  chapter_zero_text: "Chapter 0 指 2016–2021 以前的累積，是成大乙棒第一段歷史。",
  chapter_one_text: "Chapter 1+ 指 2021–2026，並且代表故事會繼續往後。",
};

function HudTag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white shadow-[inset_0_0_18px_rgba(255,255,255,0.08)] backdrop-blur-md">
      {children}
    </span>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F0D6B8]">
      {children}
    </p>
  );
}

function SectionShell({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
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
    <main className="min-h-screen overflow-x-hidden bg-[#160707] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_8%_8%,rgba(244,232,217,0.78),transparent_22%),radial-gradient(circle_at_38%_6%,rgba(181,83,63,0.86),transparent_32%),radial-gradient(circle_at_74%_18%,rgba(216,188,160,0.58),transparent_31%),radial-gradient(circle_at_34%_55%,rgba(128,34,32,0.86),transparent_40%),radial-gradient(circle_at_88%_84%,rgba(239,227,212,0.42),transparent_34%),linear-gradient(180deg,#270909_0%,#7B2D25_34%,#4B1714_66%,#170606_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.2] [background-image:linear-gradient(90deg,#F4E8D9_1px,transparent_1px),linear-gradient(#F4E8D9_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="fixed inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(180deg,transparent_0,rgba(255,255,255,0.7)_50%,transparent_100%)] [background-size:100%_6px]" />
      <div className="fixed inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-[#F4E8D9]/24 to-transparent" />

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
                <p className="text-xs font-black uppercase tracking-[0.25em]">
                  NCKU Baseball Club
                </p>
                <p className="text-2xl font-black">{settings.site_title}</p>
              </div>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <HudTag>Status: Online</HudTag>
              <HudTag>Archive Mode</HudTag>
            </div>
          </header>

          <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[0.92fr_1.08fr]">
            <section>
              <div className="flex flex-wrap gap-2">
                <HudTag>Chapter 0 to Chapter 1+</HudTag>
                <HudTag>OB Game Archive</HudTag>
                <HudTag>Project 10</HudTag>
              </div>

              <p className="mt-10 text-xs font-black uppercase tracking-[0.35em] text-white/85">
                {settings.subtitle}
              </p>

              <h1 className="mt-5 max-w-3xl text-6xl font-black leading-[0.92] tracking-tight text-white drop-shadow-xl md:text-8xl">
                PROJECT 10
                <br />
                ARCHIVE
              </h1>

              <p className="mt-7 max-w-xl whitespace-pre-line text-xl font-black leading-9 md:text-2xl">
                {settings.slogan}
              </p>

              <p className="mt-6 max-w-xl text-base font-bold leading-8 text-white/85">
                {settings.project_intro}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#photos"
                  className="rounded-full bg-[#F4E8D9] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#8E1F26] shadow-xl transition hover:-translate-y-1"
                >
                  Open Photo Database
                </a>
                <a
                  href="#event"
                  className="rounded-full border border-white/45 px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white backdrop-blur transition hover:bg-white hover:text-[#8E1F26]"
                >
                  Event Data
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3">
                {[
                  ["Anniversary", "10th"],
                  ["Game Date", "05.30"],
                  ["Chapter", "1+"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="rounded-3xl border border-white/18 bg-white/12 p-5 shadow-[inset_0_0_24px_rgba(255,255,255,0.08)] backdrop-blur"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F0D6B8]">
                      {k}
                    </p>
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
                title="PROJECT 10 主視覺"
                label="Main Visual"
                description="十週年主視覺，以球隊時間線、年份與影像欄位組成 PROJECT 10 的記憶入口。"
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
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  Date
                </p>
                <p className="mt-3 text-3xl font-black">{settings.event_date}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  Place
                </p>
                <p className="mt-3 text-3xl font-black">{settings.event_place}</p>
              </div>
            </div>
            <div className="mt-7">
              <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                Mode
              </p>
              <p className="mt-3 text-3xl font-black">OB GAME / PHOTO ARCHIVE</p>
            </div>
          </article>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="mb-8">
          <Label>Chapter Index</Label>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">
            2016-2026+ CHAPTER 0 - CHAPTER 1+
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article>
            <ImageLightbox
              src="/images/chapter-0.png"
              alt="Chapter 0"
              title="Chapter 0 / 2016-2021"
              label="Chapter 0"
              description={settings.chapter_zero_text || fallbackSettings.chapter_zero_text}
              imageClassName="h-[520px] bg-[#F4E8D9] p-2"
            />
            <div className="mt-5 rounded-[1.5rem] border border-white/18 bg-[#F4E8D9]/90 p-6 text-[#421211]">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#A82128]">
                Chapter 0 / 2016-2021
              </p>
              <p className="mt-4 text-sm leading-8 text-[#7A665B]">
                {settings.chapter_zero_text || fallbackSettings.chapter_zero_text}
              </p>
            </div>
          </article>

          <article>
            <ImageLightbox
              src="/images/chapter-1.png"
              alt="Chapter 1+"
              title="Chapter 1+ / 2021-2026+"
              label="Chapter 1+"
              description={settings.chapter_one_text || fallbackSettings.chapter_one_text}
              imageClassName="h-[520px] bg-[#F4E8D9] p-2"
            />
            <div className="mt-5 rounded-[1.5rem] border border-white/18 bg-[#F4E8D9]/90 p-6 text-[#421211]">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#A82128]">
                Chapter 1+ / 2021-2026+
              </p>
              <p className="mt-4 text-sm leading-8 text-[#7A665B]">
                {settings.chapter_one_text || fallbackSettings.chapter_one_text}
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
              {settings.photo_section_title || fallbackSettings.photo_section_title}
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-8 text-white/72 md:text-base">
            {settings.photo_section_note || fallbackSettings.photo_section_note}
          </p>
        </div>

        <article className="mt-10 rounded-[2rem] border border-dashed border-white/25 bg-[#F4E8D9]/88 p-8 text-[#421211] backdrop-blur md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A82128]">
            OB Game / 2026.05.30
          </p>
          <h3 className="mt-16 text-3xl font-black md:text-5xl">
            等待 OB 賽照片上傳
          </h3>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-[#7A665B]">
            目前先保留單一影像資料庫欄位。之後後台上傳照片後，這裡會自動成為 OB 賽當天照片整理頁面。
          </p>
        </article>
      </SectionShell>

      <SectionShell>
        <div className="mb-8">
          <Label>Goods</Label>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">紀念商品</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ProductOrderModal
            type="towel"
            name="PROJECT 10 毛巾"
            price={450}
            image="/images/towel.png"
            label="Product 01"
          />

          <ProductOrderModal
            type="jersey"
            name="PROJECT 10 球衣"
            price={1450}
            image="/images/jersey.png"
            label="Product 02"
          />
        </div>
      </SectionShell>

      <footer className="mx-auto max-w-7xl px-5 pb-28 md:px-8">
        <div className="border-t border-white/20 py-8 text-sm text-white/65">
          <p className="font-black text-white">
            {settings.site_title} / NCKU Baseball Club
          </p>
        </div>
      </footer>

      <DonationModal />
    </main>
  );
}
'@ | Set-Content -Encoding UTF8 src\app\page.tsx

@'
"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

type ProductType = "towel" | "jersey";

type ProductOrderModalProps = {
  type: ProductType;
  name: string;
  price: number;
  image: string;
  label: string;
};

const bankInfo = {
  bankName: "中華郵政",
  bankCode: "700",
  accountNumber: "0031071-0891691",
  accountName: "成功大學棒球社王昱崚",
};

export default function ProductOrderModal({
  type,
  name,
  price,
  image,
  label,
}: ProductOrderModalProps) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("親自找幹部取貨");
  const [storeInfo, setStoreInfo] = useState("");
  const [note, setNote] = useState("");

  const [jerseySize, setJerseySize] = useState("L");
  const [jerseyName, setJerseyName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");

  const total = price * quantity;

  async function submitOrder() {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("請填寫姓名與電話。");
      return;
    }

    if (type === "jersey") {
      if (!jerseySize || !jerseyName.trim() || !jerseyNumber.trim()) {
        alert("球衣請填寫尺寸、英文名字與背號。");
        return;
      }
    }

    if (deliveryMethod === "7-11 收件" && !storeInfo.trim()) {
      alert("請填寫 7-11 門市資訊。");
      return;
    }

    setLoading(true);

    const jerseyDetail =
      type === "jersey"
        ? `球衣尺寸：${jerseySize}；背後英文名字：${jerseyName}；背號：${jerseyNumber}。`
        : "";

    const finalNote = [jerseyDetail, note].filter(Boolean).join(" ");

    const { error } = await supabase.from("orders").insert({
      product_name: name,
      unit_price: price,
      quantity,
      total_price: total,
      customer_name: customerName,
      customer_phone: customerPhone,
      delivery_method: deliveryMethod,
      store_info: storeInfo,
      note: finalNote,
      payment_status: "pending",
    });

    setLoading(false);

    if (error) {
      alert("送出失敗，請確認 Supabase orders 欄位是否存在。");
      console.error(error);
      return;
    }

    setDone(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group overflow-hidden rounded-[2rem] border border-white/18 bg-[#F4E8D9]/92 p-4 text-left text-[#421211] shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(0,0,0,0.25)]"
      >
        <div className="overflow-hidden rounded-[1.5rem] bg-white">
          <img
            src={image}
            alt={name}
            className="h-[280px] w-full object-contain transition duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="p-5">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A82128]">
            {label}
          </p>
          <h3 className="mt-5 text-3xl font-black">{name}</h3>
          <p className="mt-3 text-2xl font-black text-[#A82128]">
            NT${price}
          </p>
          <p className="mt-4 text-sm font-bold text-[#7A665B]">
            點選填寫購買資料與取貨方式
          </p>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-md">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/20 bg-[#F4E8D9] p-6 text-[#421211] shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A82128]">
                  Order Form
                </p>
                <h2 className="mt-3 text-3xl font-black">{name}</h2>
                <p className="mt-2 text-xl font-black text-[#A82128]">
                  NT${price} / 件
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setDone(false);
                }}
                className="rounded-full border border-[#421211]/20 px-4 py-2 text-sm font-black"
              >
                關閉
              </button>
            </div>

            {!done ? (
              <div className="mt-8 space-y-5">
                <label className="block">
                  <span className="text-sm font-black">數量</span>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, Number(e.target.value)))
                    }
                    className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 font-bold outline-none"
                  />
                </label>

                {type === "jersey" && (
                  <div className="grid gap-4 md:grid-cols-3">
                    <label className="block">
                      <span className="text-sm font-black">尺寸</span>
                      <select
                        value={jerseySize}
                        onChange={(e) => setJerseySize(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 font-bold outline-none"
                      >
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="2L">2L</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="text-sm font-black">背後英文名字</span>
                      <input
                        value={jerseyName}
                        onChange={(e) => setJerseyName(e.target.value)}
                        placeholder="例如 Y.H YEH"
                        className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 font-bold outline-none"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-black">背號</span>
                      <input
                        value={jerseyNumber}
                        onChange={(e) => setJerseyNumber(e.target.value)}
                        placeholder="例如 12"
                        className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 font-bold outline-none"
                      />
                    </label>
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-black">姓名</span>
                    <input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 font-bold outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-black">電話</span>
                    <input
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 font-bold outline-none"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-black">取貨方式</span>
                  <select
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 font-bold outline-none"
                  >
                    <option value="親自找幹部取貨">親自找幹部取貨</option>
                    <option value="7-11 收件">7-11 收件</option>
                  </select>
                </label>

                {deliveryMethod === "7-11 收件" && (
                  <label className="block">
                    <span className="text-sm font-black">
                      7-11 門市資訊
                    </span>
                    <textarea
                      value={storeInfo}
                      onChange={(e) => setStoreInfo(e.target.value)}
                      placeholder="請填寫門市名稱、門市地址或店號"
                      className="mt-2 min-h-24 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 font-bold outline-none"
                    />
                  </label>
                )}

                <label className="block">
                  <span className="text-sm font-black">備註</span>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mt-2 min-h-20 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 font-bold outline-none"
                  />
                </label>

                <div className="rounded-2xl bg-[#421211] p-5 text-white">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/55">
                    Total
                  </p>
                  <p className="mt-2 text-3xl font-black">NT${total}</p>
                </div>

                <button
                  type="button"
                  disabled={loading}
                  onClick={submitOrder}
                  className="w-full rounded-full bg-[#A82128] px-6 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-1 disabled:opacity-60"
                >
                  {loading ? "送出中..." : "送出表單並查看轉帳資訊"}
                </button>
              </div>
            ) : (
              <div className="mt-8 space-y-5">
                <div className="rounded-[1.5rem] bg-white p-6">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A82128]">
                    Payment Info
                  </p>
                  <h3 className="mt-4 text-2xl font-black">
                    表單已送出，請依下方帳戶完成付款
                  </h3>

                  <div className="mt-6 grid gap-3 text-base font-bold">
                    <p>銀行：{bankInfo.bankName}</p>
                    <p>銀行代碼：{bankInfo.bankCode}</p>
                    <p>帳號：{bankInfo.accountNumber}</p>
                    <p>戶名：{bankInfo.accountName}</p>
                    <p>金額：NT${total}</p>
                  </div>

                  <p className="mt-6 text-sm leading-7 text-[#7A665B]">
                    轉帳後請保留匯款資訊。若社團需要核對，會依照你填寫的姓名與電話聯繫。
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setDone(false);
                  }}
                  className="w-full rounded-full bg-[#421211] px-6 py-4 text-sm font-black text-white"
                >
                  完成
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
'@ | Set-Content -Encoding UTF8 src\components\ProductOrderModal.tsx

Write-Host "Done. Full front-end repair completed."