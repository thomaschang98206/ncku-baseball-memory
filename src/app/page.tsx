"use client";

import { supabase } from "../lib/supabase";
import type { ReactNode } from "react";
import { useState } from "react";
import PhotoGrid from "../components/PhotoGrid";

type Product = {
  id: string;
  code: string;
  name: string;
  price: number;
  image: string;
  description: string;
  isJersey?: boolean;
};

const ACCOUNT_NAME = "成功大學棒球社王昱峻";
const BANK_NAME = "中華郵政";
const BANK_CODE = "700";
const BRANCH_NAME = "成功大學郵局";
const ACCOUNT_NUMBER = "0031071-0891691";

const products: Product[] = [
  {
    id: "towel",
    code: "PRODUCT 01",
    name: "PROJECT 10 毛巾",
    price: 450,
    image: "/images/towel.png",
    description: "十週年紀念毛巾，延續主視覺的紅、米、灰色系。",
  },
  {
    id: "jersey",
    code: "PRODUCT 02",
    name: "PROJECT 10 球衣",
    price: 1450,
    image: "/images/jersey.png",
    description: "十週年紀念球衣，可填寫尺寸、背號與英文姓名。",
    isJersey: true,
  },
];

export default function Home() {
  const [donateOpen, setDonateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [visualOpen, setVisualOpen] = useState<null | "chapter0" | "chapter1">(null);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#E8DDCC] text-[#341210]">
      <BackgroundLayer />
      <Header />

      <section className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 py-24 md:grid-cols-[1.02fr_0.98fr] md:px-10">
        <div>
          <div className="mb-8 flex flex-wrap gap-3">
            <Chip>STATUS: ONLINE</Chip>
            <Chip>ARCHIVE MODE</Chip>
            <Chip>2016 - 2026+</Chip>
          </div>

          <p className="mb-5 tracking-[0.35em] text-[#C8B99D]">
            NCKU BASEBALL CLUB 10TH ANNIVERSARY GAME
          </p>

          <h1 className="text-[4.5rem] font-black leading-[0.9] tracking-tight text-white drop-shadow md:text-[7.4rem]">
            PROJECT 10
            <br />
            ARCHIVE
          </h1>

          <p className="mt-8 max-w-2xl text-2xl font-black leading-snug text-white md:text-3xl">
            一旦怠惰，很快就會出現差距
            <br />
            不滿足於現狀，要越變越強
          </p>

          <p className="mt-7 max-w-xl text-base leading-8 text-[#F4E8D8]/90 md:text-lg">
            作為紀念成大乙棒走過的第一個 10 年，PROJECT 10 將成為照片、回憶與支持入口的公開平台。
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#archive"
              className="rounded-full bg-[#F4E8D8] px-8 py-4 text-sm font-black tracking-[0.16em] text-[#8B2024] shadow-xl transition hover:scale-[1.03]"
            >
              OPEN PHOTO DATABASE
            </a>

            <a
              href="#event"
              className="rounded-full border border-[#F4E8D8]/70 px-8 py-4 text-sm font-black tracking-[0.16em] text-white transition hover:bg-white/10"
            >
              EVENT DATA
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
            <DataBox label="ANNIVERSARY" value="10th" />
            <DataBox label="GAME DATE" value="05.30" />
            <DataBox label="CHAPTER" value="1+" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -right-5 -top-5 z-20 rounded-full bg-[#A82128] px-6 py-3 text-xs font-black tracking-[0.25em] text-white shadow-xl">
            DATA CARD
          </div>
          <div className="rounded-[2rem] border border-white/30 bg-[#F4E8D9]/20 p-3 shadow-2xl backdrop-blur">
            <img
              src="/images/main-visual.png"
              alt="PROJECT 10 main visual"
              className="max-h-[76vh] w-full rounded-[1.5rem] object-contain"
            />
          </div>
        </div>
      </section>

      <section id="event" className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-10">
        <div className="rounded-[2rem] border border-[#D8C7AE]/70 bg-[#F7F0E6]/90 p-8 shadow-xl md:p-12">
          <p className="mb-4 text-sm font-black tracking-[0.35em] text-[#A82128]">
            EVENT DATA
          </p>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            NCKU Baseball Club
            <br />
            10th Anniversary Game
          </h2>
          <p className="mt-8 text-lg leading-8 text-[#6F6257]">
            2026 年 5 月 30 日於中信科技大學舉辦十週年 OB 賽。這裡會逐步整理當天照片、活動紀錄與紀念商品資訊。
          </p>
        </div>

        <div className="rounded-[2rem] bg-[#3B1110] p-8 text-white shadow-xl md:p-12">
          <p className="mb-8 text-sm font-black tracking-[0.35em] text-[#D8C7AE]">
            SCOREBOARD
          </p>
          <div className="grid grid-cols-2 gap-8 border-b border-white/15 pb-8">
            <div>
              <p className="text-sm tracking-[0.28em] text-white/50">DATE</p>
              <p className="mt-3 text-4xl font-black">2026.05.30</p>
            </div>
            <div>
              <p className="text-sm tracking-[0.28em] text-white/50">PLACE</p>
              <p className="mt-3 text-3xl font-black">中信科大棒球場</p>
            </div>
          </div>
          <div className="pt-8">
            <p className="text-sm tracking-[0.28em] text-white/50">MODE</p>
            <p className="mt-3 text-3xl font-black">OB GAME / PHOTO ARCHIVE</p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-10">
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black tracking-[0.35em] text-[#A82128]">
              TIMELINE
            </p>
            <h2 className="text-4xl font-black text-white md:text-6xl">
              2016-2026+
              <br />
              CHAPTER 0 - CHAPTER 1+
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#F4E8D8]/85">
            Chapter 0 指 2021 以前的累積，是成大乙棒第一段歷史；Chapter 1+ 指 2021-2026，並且代表故事會繼續往後。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <VisualCard
            image="/images/chapter-0.png"
            label="CHAPTER 0"
            title="2016 - 2021"
            onClick={() => setVisualOpen("chapter0")}
          />
          <VisualCard
            image="/images/chapter-1.png"
            label="CHAPTER 1+"
            title="2021 - 2026+"
            onClick={() => setVisualOpen("chapter1")}
          />
        </div>
      </section>

      <section id="archive" className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-10">
        <div className="mb-12 grid grid-cols-1 gap-6 border-b border-[#D8C7AE]/50 pb-10 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="mb-4 text-sm font-black tracking-[0.35em] text-[#A82128]">
              PHOTO ARCHIVE
            </p>
            <h2 className="text-5xl font-black text-white md:text-7xl">
              OB Game
              <br />
              Archive
            </h2>
          </div>
          <p className="text-lg leading-8 text-[#F4E8D8]/80">
            2026.05.30 OB 賽當天影像整理中。照片上傳後，這裡會作為主要影像資料庫。
          </p>
        </div>

        <div className="rounded-[2rem] border border-dashed border-[#D8C7AE]/70 bg-[#F7F0E6]/90 p-6 shadow-xl md:p-10">
          <p className="mb-8 text-sm font-black tracking-[0.35em] text-[#A82128]">
            OB GAME PHOTO DATABASE
          </p>

          <PhotoGrid />
        </div>
      </section>

      <section id="goods" className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-10">
        <p className="mb-4 text-sm font-black tracking-[0.35em] text-[#A82128]">
          GOODS
        </p>
        <h2 className="mb-12 text-5xl font-black text-white md:text-7xl">
          紀念商品
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group overflow-hidden rounded-[2rem] border border-[#D8C7AE]/70 bg-[#F7F0E6]/95 p-5 text-left shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex aspect-[1.55] items-center justify-center overflow-hidden rounded-[1.5rem] bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-4">
                <p className="mb-4 text-sm font-black tracking-[0.35em] text-[#A82128]">
                  {product.code}
                </p>
                <h3 className="text-4xl font-black">{product.name}</h3>
                <p className="mt-4 text-3xl font-black text-[#A82128]">
                  NT${product.price}
                </p>
                <p className="mt-4 text-[#6F6257]">{product.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <button
        onClick={() => setDonateOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-[#A82128] px-8 py-4 text-base font-black tracking-[0.1em] text-white shadow-2xl transition hover:scale-[1.04] md:bottom-8 md:right-8"
      >
        支持我們
      </button>

      {donateOpen && <DonateModal onClose={() => setDonateOpen(false)} />}
      {selectedProduct && (
        <OrderModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
      {visualOpen && <VisualModal type={visualOpen} onClose={() => setVisualOpen(null)} />}
    </main>
  );
}

function BackgroundLayer() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_12%,#B75E4D_0%,transparent_28%),radial-gradient(circle_at_70%_8%,#8F302D_0%,transparent_32%),radial-gradient(circle_at_45%_75%,#E8DDCC_0%,transparent_35%),linear-gradient(180deg,#421211_0%,#8A302C_42%,#E8DDCC_100%)]" />
      <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(255,255,255,.36)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.36)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(30,0,0,.42)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#E8DDCC] to-transparent" />
    </div>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
        <div className="flex items-center gap-4">
          <img
            src="/images/logo.png"
            alt="NCKU Baseball Club logo"
            className="h-14 w-14 rounded-full"
          />
          <div className="text-white">
            <p className="text-xs font-black tracking-[0.35em]">
              NCKU BASEBALL CLUB
            </p>
            <p className="text-2xl font-black">PROJECT 10</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/25 bg-white/10 px-5 py-2 text-xs font-black tracking-[0.22em] text-[#F4E8D8] backdrop-blur">
      {children}
    </span>
  );
}

function DataBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-white shadow-lg backdrop-blur">
      <p className="text-xs font-black tracking-[0.25em] text-[#D8C7AE]">
        {label}
      </p>
      <p className="mt-3 text-4xl font-black">{value}</p>
    </div>
  );
}

function VisualCard({
  image,
  label,
  title,
  onClick,
}: {
  image: string;
  label: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group overflow-hidden rounded-[2rem] border border-[#D8C7AE]/70 bg-[#F7F0E6]/90 p-4 text-left shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="aspect-[0.78] overflow-hidden rounded-[1.4rem] bg-white">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-4">
        <p className="text-sm font-black tracking-[0.35em] text-[#A82128]">
          {label}
        </p>
        <h3 className="mt-3 text-3xl font-black">{title}</h3>
        <p className="mt-3 text-[#6F6257]">點選查看放大圖與章節說明</p>
      </div>
    </button>
  );
}

function DonateModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <p className="mb-4 text-sm font-black tracking-[0.35em] text-[#A82128]">
        SUPPORT
      </p>
      <h2 className="text-4xl font-black">支持我們</h2>
      <p className="mt-4 text-[#6F6257]">
        目前不串接金流，請依照下方帳戶資訊轉帳。轉帳後請保留匯款資訊。
      </p>

      <div className="mt-8 space-y-4 rounded-2xl bg-[#F4E8D9] p-6">
        <Info label="銀行" value={BANK_NAME} />
        <Info label="銀行代號" value={BANK_CODE} />
        <Info label="帳號" value={ACCOUNT_NUMBER} />
        <Info label="戶名" value={ACCOUNT_NAME} />
        <Info label="分行" value={BRANCH_NAME} />
      </div>

      <button
        onClick={onClose}
        className="mt-8 w-full rounded-full bg-[#A82128] py-4 font-black text-white"
      >
        關閉
      </button>
    </Modal>
  );
}

function OrderModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [quantity, setQuantity] = useState(1);
  const [delivery, setDelivery] = useState("親自找幹部取貨");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [storeInfo, setStoreInfo] = useState("");
  const [note, setNote] = useState("");

  const [jerseySize, setJerseySize] = useState("L");
  const [jerseyName, setJerseyName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const safeQuantity = Math.max(1, Number(quantity) || 1);
  const totalPrice = product.price * safeQuantity;

  async function submitOrder() {
    setErrorMessage("");

    if (!customerName.trim()) {
      setErrorMessage("請填寫姓名。");
      return;
    }

    if (!customerPhone.trim()) {
      setErrorMessage("請填寫電話。");
      return;
    }

    if (delivery === "7-11 店到店" && !storeInfo.trim()) {
      setErrorMessage("請填寫 7-11 收件門市資訊。");
      return;
    }

    setSubmitting(true);

    const payload = {
      product_name: product.name,
      product_type: product.id,
      product_price: product.price,
      unit_price: product.price,
      quantity: safeQuantity,
      total_price: totalPrice,
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim(),
      delivery_method: delivery,
      store_info: delivery === "7-11 店到店" ? storeInfo.trim() : "",
      note: note.trim(),
      payment_status: "unpaid",
      order_status: "pending",
      admin_note: "",
      jersey_size: product.isJersey ? jerseySize : "",
      jersey_name: product.isJersey ? jerseyName.trim() : "",
      jersey_number: product.isJersey ? jerseyNumber.trim() : "",
    };

    const { error } = await supabase.from("orders").insert(payload);

    setSubmitting(false);

    if (error) {
      console.error("Order insert error:", error);
      setErrorMessage(`訂單送出失敗：${error.message}`);
      return;
    }

    setDone(true);
  }

  return (
    <Modal onClose={onClose}>
      <p className="mb-4 text-sm font-black tracking-[0.35em] text-[#A82128]">
        ORDER FORM
      </p>
      <h2 className="text-4xl font-black">{product.name}</h2>
      <p className="mt-3 text-2xl font-black text-[#A82128]">
        NT${totalPrice}
      </p>

      {done ? (
        <div className="mt-8 rounded-2xl bg-[#F4E8D9] p-6">
          <p className="text-2xl font-black text-[#341210]">已送出訂購資料</p>
          <p className="mt-4 leading-7 text-[#6F6257]">
            請依照下方帳戶完成轉帳，並保留匯款紀錄。
          </p>
          <div className="mt-6 space-y-4 rounded-2xl bg-white/60 p-5">
            <Info label="銀行" value={BANK_NAME} />
            <Info label="銀行代號" value={BANK_CODE} />
            <Info label="帳號" value={ACCOUNT_NUMBER} />
            <Info label="戶名" value={ACCOUNT_NAME} />
          </div>
          <button
            onClick={onClose}
            className="mt-8 w-full rounded-full bg-[#A82128] py-4 font-black text-white"
          >
            完成
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4">
            <Field
              label="姓名"
              placeholder="請輸入姓名"
              value={customerName}
              onChange={setCustomerName}
            />

            <Field
              label="電話"
              placeholder="請輸入聯絡電話"
              value={customerPhone}
              onChange={setCustomerPhone}
            />

            <label className="block">
              <span className="mb-2 block text-sm font-black tracking-[0.18em] text-[#A82128]">
                數量
              </span>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full rounded-xl border border-[#D8C7AE] bg-white px-4 py-3 outline-none"
              />
            </label>

            {product.isJersey && (
              <>
                <label className="block">
                  <span className="mb-2 block text-sm font-black tracking-[0.18em] text-[#A82128]">
                    尺寸
                  </span>
                  <select
                    value={jerseySize}
                    onChange={(e) => setJerseySize(e.target.value)}
                    className="w-full rounded-xl border border-[#D8C7AE] bg-white px-4 py-3 outline-none"
                  >
                    <option value="2L">2L</option>
                    <option value="XL">XL</option>
                    <option value="L">L</option>
                    <option value="M">M</option>
                  </select>
                </label>

                <Field
                  label="球衣背面英文名字"
                  placeholder="範例：Y.H YEH"
                  value={jerseyName}
                  onChange={setJerseyName}
                />

                <Field
                  label="背號"
                  placeholder="範例：12"
                  value={jerseyNumber}
                  onChange={setJerseyNumber}
                />
              </>
            )}

            <label className="block">
              <span className="mb-2 block text-sm font-black tracking-[0.18em] text-[#A82128]">
                取貨方式
              </span>
              <select
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                className="w-full rounded-xl border border-[#D8C7AE] bg-white px-4 py-3 outline-none"
              >
                <option value="親自找幹部取貨">親自找幹部取貨</option>
                <option value="7-11 店到店">7-11 店到店</option>
              </select>
            </label>

            {delivery === "7-11 店到店" && (
              <Field
                label="7-11 收件門市資訊"
                placeholder="請填寫門市名稱或地址"
                value={storeInfo}
                onChange={setStoreInfo}
              />
            )}

            <label className="block">
              <span className="mb-2 block text-sm font-black tracking-[0.18em] text-[#A82128]">
                備註
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="有其他需求可以填寫在這裡"
                className="min-h-24 w-full rounded-xl border border-[#D8C7AE] bg-white px-4 py-3 outline-none"
              />
            </label>
          </div>

          <div className="mt-8 rounded-2xl bg-[#F4E8D9] p-5 text-sm leading-7 text-[#6F6257]">
            送出訂購需求後，請依照帳戶資訊完成轉帳。
            <br />
            {BANK_NAME} {BANK_CODE}｜{ACCOUNT_NUMBER}
            <br />
            戶名：{ACCOUNT_NAME}
          </div>

          {errorMessage ? (
            <p className="mt-4 rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-700">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="button"
            onClick={submitOrder}
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-[#A82128] py-4 font-black text-white transition hover:bg-[#8F1F25] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "送出中..." : "確認訂購"}
          </button>
        </>
      )}
    </Modal>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black tracking-[0.18em] text-[#A82128]">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#D8C7AE] bg-white px-4 py-3 outline-none"
      />
    </label>
  );
}

function VisualModal({
  type,
  onClose,
}: {
  type: "chapter0" | "chapter1";
  onClose: () => void;
}) {
  const data =
    type === "chapter0"
      ? {
          label: "CHAPTER 0",
          title: "2016 - 2021",
          image: "/images/chapter-0.png",
          text: "Chapter 0 是成大乙棒第一段累積，包含草創、延續與隊伍文化形成的時間。",
        }
      : {
          label: "CHAPTER 1+",
          title: "2021 - 2026+",
          image: "/images/chapter-1.png",
          text: "Chapter 1+ 是從 2021 到 2026 的延續，也代表故事不只停在十週年，而會繼續往後。",
        };

  return (
    <Modal onClose={onClose} wide>
      <p className="mb-4 text-sm font-black tracking-[0.35em] text-[#A82128]">
        {data.label}
      </p>
      <h2 className="text-4xl font-black">{data.title}</h2>
      <p className="mt-4 text-[#6F6257]">{data.text}</p>
      <img
        src={data.image}
        alt={data.title}
        className="mt-8 max-h-[70vh] w-full rounded-2xl object-contain"
      />
    </Modal>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 border-b border-[#D8C7AE] pb-3 last:border-0">
      <span className="font-black text-[#A82128]">{label}</span>
      <span className="text-right font-bold">{value}</span>
    </div>
  );
}

function Modal({
  children,
  onClose,
  wide = false,
}: {
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 backdrop-blur">
      <div
        className={`max-h-[92vh] overflow-auto rounded-[2rem] bg-[#F7F0E6] p-6 shadow-2xl md:p-8 ${
          wide ? "w-full max-w-5xl" : "w-full max-w-xl"
        }`}
      >
        <div className="mb-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-full bg-[#341210] px-5 py-2 font-black text-white"
          >
            關閉
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}