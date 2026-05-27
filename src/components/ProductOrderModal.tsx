"use client";

import { useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type ProductOrderModalProps = {
  type: "towel" | "jersey";
  name: string;
  price: number;
  image: string;
  label: string;
};

const deliveryOptions = [
  { value: "pickup", label: "親自找幹部取貨" },
  { value: "seven", label: "7-11 店到店" },
  { value: "family", label: "全家店到店" },
  { value: "post", label: "郵寄" },
];

const jerseySizes = ["2L", "XL", "L", "M"];

export default function ProductOrderModal({
  type,
  name,
  price,
  image,
  label,
}: ProductOrderModalProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [storeInfo, setStoreInfo] = useState("");
  const [note, setNote] = useState("");

  const [jerseySize, setJerseySize] = useState("L");
  const [jerseyName, setJerseyName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");

  const totalPrice = useMemo(() => {
    const safeQuantity = Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
    return price * safeQuantity;
  }, [price, quantity]);

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

    if (!quantity || quantity < 1) {
      setErrorMessage("數量至少要 1。");
      return;
    }

    if (type === "jersey") {
      if (!jerseyName.trim()) {
        setErrorMessage("請填寫球衣背面英文名字，例如 Y.H YEH。");
        return;
      }

      if (!jerseyNumber.trim()) {
        setErrorMessage("請填寫球衣背號。");
        return;
      }
    }

    setSubmitting(true);

    const payload = {
      product_name: name,
      product_type: type,
      unit_price: price,
      product_price: price,
      quantity,
      total_price: totalPrice,
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim(),
      delivery_method: deliveryMethod,
      store_info: storeInfo.trim(),
      note: note.trim(),
      payment_status: "pending",
      order_status: "pending",
      admin_note: "",
      jersey_size: type === "jersey" ? jerseySize : null,
      jersey_name: type === "jersey" ? jerseyName.trim().toUpperCase() : null,
      jersey_number: type === "jersey" ? jerseyNumber.trim() : null,
    };

    const { error } = await supabase.from("orders").insert(payload);

    if (error) {
      console.error(error);
      setErrorMessage(`送出失敗：${error.message}`);
      setSubmitting(false);
      return;
    }

    setDone(true);
    setSubmitting(false);
  }

  function closeModal() {
    setOpen(false);
    setDone(false);
    setErrorMessage("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 rounded-full bg-[#A62F2F] px-8 py-4 text-lg font-black text-white shadow-lg transition hover:bg-[#7D2528]"
      >
        我要訂購
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/55 px-4 py-8 backdrop-blur-md">
          <div className="mx-auto max-w-2xl rounded-[2rem] bg-[#F4EFE6] p-6 text-[#2B0F0F] shadow-2xl md:p-10">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full bg-[#351211] px-6 py-3 font-black text-white transition hover:bg-[#7D2528]"
              >
                關閉
              </button>
            </div>

            <p className="mt-4 text-sm font-black tracking-[0.45em] text-[#A62F2F]">
              ORDER FORM
            </p>

            <div className="mt-4 grid gap-6 md:grid-cols-[160px_1fr] md:items-start">
              <img
                src={image}
                alt={name}
                className="hidden rounded-3xl border border-[#D8C7AE] bg-white object-contain md:block"
              />

              <div>
                <h2 className="text-4xl font-black md:text-5xl">{name}</h2>
                <p className="mt-3 text-3xl font-black text-[#A62F2F]">
                  NT${price}
                </p>
                <p className="mt-2 text-sm font-semibold text-[#7A665B]">
                  {label}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <Field label="姓名">
                <input
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="請輸入姓名"
                  className="w-full rounded-2xl border border-[#D8C7AE] bg-white px-5 py-4 outline-none focus:border-[#A62F2F]"
                />
              </Field>

              <Field label="電話">
                <input
                  value={customerPhone}
                  onChange={(event) => setCustomerPhone(event.target.value)}
                  placeholder="請輸入聯絡電話"
                  className="w-full rounded-2xl border border-[#D8C7AE] bg-white px-5 py-4 outline-none focus:border-[#A62F2F]"
                />
              </Field>

              <Field label="數量">
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                  className="w-full rounded-2xl border border-[#D8C7AE] bg-white px-5 py-4 outline-none focus:border-[#A62F2F]"
                />
              </Field>

              {type === "jersey" ? (
                <>
                  <Field label="球衣尺寸">
                    <select
                      value={jerseySize}
                      onChange={(event) => setJerseySize(event.target.value)}
                      className="w-full rounded-2xl border border-[#D8C7AE] bg-white px-5 py-4 outline-none focus:border-[#A62F2F]"
                    >
                      {jerseySizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="球衣背面英文名字">
                    <input
                      value={jerseyName}
                      onChange={(event) => setJerseyName(event.target.value)}
                      placeholder="例如：Y.H YEH"
                      className="w-full rounded-2xl border border-[#D8C7AE] bg-white px-5 py-4 uppercase outline-none focus:border-[#A62F2F]"
                    />
                  </Field>

                  <Field label="球衣背號">
                    <input
                      value={jerseyNumber}
                      onChange={(event) => setJerseyNumber(event.target.value)}
                      placeholder="例如：12"
                      className="w-full rounded-2xl border border-[#D8C7AE] bg-white px-5 py-4 outline-none focus:border-[#A62F2F]"
                    />
                  </Field>
                </>
              ) : null}

              <Field label="取貨方式">
                <select
                  value={deliveryMethod}
                  onChange={(event) => setDeliveryMethod(event.target.value)}
                  className="w-full rounded-2xl border border-[#D8C7AE] bg-white px-5 py-4 outline-none focus:border-[#A62F2F]"
                >
                  {deliveryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>

              {deliveryMethod !== "pickup" ? (
                <Field label="店到店 / 郵寄資訊">
                  <textarea
                    value={storeInfo}
                    onChange={(event) => setStoreInfo(event.target.value)}
                    placeholder="請填寫門市名稱、店號，或郵寄地址。"
                    className="min-h-24 w-full rounded-2xl border border-[#D8C7AE] bg-white px-5 py-4 outline-none focus:border-[#A62F2F]"
                  />
                </Field>
              ) : null}

              <Field label="備註">
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="可以填寫其他需求。"
                  className="min-h-24 w-full rounded-2xl border border-[#D8C7AE] bg-white px-5 py-4 outline-none focus:border-[#A62F2F]"
                />
              </Field>
            </div>

            <div className="mt-8 rounded-2xl bg-[#EFE3D2] p-5 text-[#7A665B]">
              <p>送出訂購需求後，請依照帳戶資訊完成轉帳。</p>
              <p className="mt-2">中華郵政 700｜0031071-0891691</p>
              <p className="mt-2">戶名：成功大學棒球社王昱峻</p>
              <p className="mt-2 font-black text-[#2B0F0F]">
                總金額：NT${totalPrice}
              </p>
            </div>

            {errorMessage ? (
              <div className="mt-5 rounded-2xl bg-red-100 p-4 font-bold text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <button
              type="button"
              onClick={submitOrder}
              disabled={submitting}
              className="mt-8 w-full rounded-full bg-[#A62F2F] px-8 py-5 text-xl font-black text-white transition hover:bg-[#7D2528] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "送出中..." : "確認訂購"}
            </button>

            {done ? (
              <div className="mt-5 rounded-2xl bg-[#EFE3D2] p-5">
                <p className="font-black text-[#2B0F0F]">已送出訂購資料</p>
                <p className="mt-2 text-sm leading-7 text-[#7A665B]">
                  請依支持我們區塊的轉帳資訊完成付款，並保留匯款紀錄。
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-black tracking-[0.12em] text-[#A62F2F]">
        {label}
      </span>
      {children}
    </label>
  );
}