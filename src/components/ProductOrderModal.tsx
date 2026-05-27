"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

type ProductOrderModalProps = {
  type: "towel" | "jersey";
  name: string;
  price: number;
  image: string;
  label: string;
};

const ACCOUNT_NAME = "成功大學棒球社王昱峻";
const BANK_NAME = "中華郵政";
const BANK_CODE = "700";
const ACCOUNT_NUMBER = "0031071-0891691";

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

  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("親自找幹部取貨");
  const [storeInfo, setStoreInfo] = useState("");
  const [note, setNote] = useState("");

  const [jerseySize, setJerseySize] = useState("L");
  const [jerseyName, setJerseyName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");

  const totalPrice = price * quantity;
  const isJersey = type === "jersey";

  async function submitOrder() {
    if (!customerName.trim()) {
      alert("請填寫姓名");
      return;
    }

    if (!customerPhone.trim()) {
      alert("請填寫電話");
      return;
    }

    if (!quantity || quantity < 1) {
      alert("數量至少為 1");
      return;
    }

    if (deliveryMethod === "7-11 店到店" && !storeInfo.trim()) {
      alert("請填寫 7-11 門市資訊");
      return;
    }

    setSubmitting(true);

    const finalNote = [
      note.trim() ? `備註：${note.trim()}` : "",
      isJersey ? `球衣尺寸：${jerseySize}` : "",
      isJersey && jerseyName.trim() ? `球衣姓名：${jerseyName.trim()}` : "",
      isJersey && jerseyNumber.trim() ? `球衣背號：${jerseyNumber.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await supabase.from("orders").insert({
      product_name: name,
      product_type: type,
      product_price: price,
      unit_price: price,
      quantity,
      total_price: totalPrice,
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim(),
      delivery_method: deliveryMethod,
      store_info: deliveryMethod === "7-11 店到店" ? storeInfo.trim() : null,
      note: finalNote || null,
      payment_status: "pending",
      order_status: "pending",
      admin_note: null,
      jersey_size: isJersey ? jerseySize : null,
      jersey_name: isJersey ? jerseyName.trim() || null : null,
      jersey_number: isJersey ? jerseyNumber.trim() || null : null,
    });

    setSubmitting(false);

    if (error) {
      console.error(error);
      alert(`訂購送出失敗：${error.message}`);
      return;
    }

    setDone(true);
    alert("訂購資料已送出，請依照帳戶資訊完成轉帳。");
  }

  function resetAndClose() {
    setOpen(false);
    setDone(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group overflow-hidden rounded-[2rem] border border-[#D8C7AE]/70 bg-[#F7F0E6]/90 p-4 text-left text-[#421211] shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
      >
        <div className="aspect-[0.78] overflow-hidden rounded-[1.4rem] bg-white">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="p-4">
          <p className="text-sm font-black tracking-[0.35em] text-[#A82128]">
            {label}
          </p>
          <h3 className="mt-3 text-3xl font-black">{name}</h3>
          <p className="mt-3 text-2xl font-black text-[#A82128]">NT${price}</p>
          <p className="mt-3 text-[#6F6257]">點選填寫訂購表單</p>
        </div>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 backdrop-blur">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-[2rem] bg-[#F7F0E6] p-6 text-[#421211] shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-black tracking-[0.35em] text-[#A82128]">
                  ORDER FORM
                </p>
                <h2 className="mt-6 text-4xl font-black md:text-5xl">{name}</h2>
                <p className="mt-3 text-3xl font-black text-[#A82128]">
                  NT${totalPrice}
                </p>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="rounded-full bg-[#421211] px-6 py-3 font-black text-white"
              >
                關閉
              </button>
            </div>

            <div className="mt-8 grid gap-5">
              <label className="block">
                <span className="mb-2 block text-sm font-black tracking-[0.18em] text-[#A82128]">
                  姓名
                </span>
                <input
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="請輸入姓名"
                  className="w-full rounded-xl border border-[#D8C7AE] bg-white px-4 py-3 outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-black tracking-[0.18em] text-[#A82128]">
                  電話
                </span>
                <input
                  value={customerPhone}
                  onChange={(event) => setCustomerPhone(event.target.value)}
                  placeholder="請輸入聯絡電話"
                  className="w-full rounded-xl border border-[#D8C7AE] bg-white px-4 py-3 outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-black tracking-[0.18em] text-[#A82128]">
                  數量
                </span>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(Math.max(1, Number(event.target.value) || 1))
                  }
                  className="w-full rounded-xl border border-[#D8C7AE] bg-white px-4 py-3 outline-none"
                />
              </label>

              {isJersey ? (
                <>
                  <label className="block">
                    <span className="mb-2 block text-sm font-black tracking-[0.18em] text-[#A82128]">
                      球衣尺寸
                    </span>
                    <select
                      value={jerseySize}
                      onChange={(event) => setJerseySize(event.target.value)}
                      className="w-full rounded-xl border border-[#D8C7AE] bg-white px-4 py-3 outline-none"
                    >
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="2L">2L</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-black tracking-[0.18em] text-[#A82128]">
                      球衣背面英文名字
                    </span>
                    <input
                      value={jerseyName}
                      onChange={(event) => setJerseyName(event.target.value)}
                      placeholder="例如：Y.H YEH"
                      className="w-full rounded-xl border border-[#D8C7AE] bg-white px-4 py-3 outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-black tracking-[0.18em] text-[#A82128]">
                      背號
                    </span>
                    <input
                      value={jerseyNumber}
                      onChange={(event) => setJerseyNumber(event.target.value)}
                      placeholder="例如：12"
                      className="w-full rounded-xl border border-[#D8C7AE] bg-white px-4 py-3 outline-none"
                    />
                  </label>
                </>
              ) : null}

              <label className="block">
                <span className="mb-2 block text-sm font-black tracking-[0.18em] text-[#A82128]">
                  取貨方式
                </span>
                <select
                  value={deliveryMethod}
                  onChange={(event) => setDeliveryMethod(event.target.value)}
                  className="w-full rounded-xl border border-[#D8C7AE] bg-white px-4 py-3 outline-none"
                >
                  <option value="親自找幹部取貨">親自找幹部取貨</option>
                  <option value="7-11 店到店">7-11 店到店</option>
                </select>
              </label>

              {deliveryMethod === "7-11 店到店" ? (
                <label className="block">
                  <span className="mb-2 block text-sm font-black tracking-[0.18em] text-[#A82128]">
                    7-11 門市資訊
                  </span>
                  <input
                    value={storeInfo}
                    onChange={(event) => setStoreInfo(event.target.value)}
                    placeholder="請填寫門市名稱或地址"
                    className="w-full rounded-xl border border-[#D8C7AE] bg-white px-4 py-3 outline-none"
                  />
                </label>
              ) : null}

              <label className="block">
                <span className="mb-2 block text-sm font-black tracking-[0.18em] text-[#A82128]">
                  備註
                </span>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="可填寫特殊需求或備註"
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

            <button
              type="button"
              onClick={submitOrder}
              disabled={submitting || done}
              className="mt-8 w-full rounded-full bg-[#A82128] py-4 font-black text-white transition hover:bg-[#7D2528] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "送出中..." : done ? "已送出訂購資料" : "確認訂購"}
            </button>

            {done ? (
              <p className="mt-4 rounded-2xl bg-white p-4 text-sm font-bold leading-7 text-[#6F6257]">
                訂購資料已送出。請依照上方帳戶資訊轉帳，並保留匯款紀錄。
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}