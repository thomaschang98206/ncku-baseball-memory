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
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [storeInfo, setStoreInfo] = useState("");
  const [note, setNote] = useState("");

  const [jerseySize, setJerseySize] = useState("L");
  const [jerseyName, setJerseyName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");

  const totalPrice = price * quantity;
  const isJersey = type === "jersey";

  async function submitOrder() {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("請填寫姓名與電話");
      return;
    }

    if (deliveryMethod === "seven" && !storeInfo.trim()) {
      alert("請填寫 7-11 門市資訊");
      return;
    }

    if (isJersey && (!jerseyName.trim() || !jerseyNumber.trim())) {
      alert("球衣請填寫英文名字與背號");
      return;
    }

    setSubmitting(true);

    const finalNote = [
      note ? `備註：${note}` : "",
      isJersey ? `尺寸：${jerseySize}` : "",
      isJersey ? `背面英文名：${jerseyName}` : "",
      isJersey ? `背號：${jerseyNumber}` : "",
    ]
      .filter(Boolean)
      .join(" / ");

    const { error } = await supabase.from("orders").insert({
      product_name: name,
      unit_price: price,
      quantity,
      total_price: totalPrice,
      customer_name: customerName,
      customer_phone: customerPhone,
      delivery_method:
        deliveryMethod === "pickup" ? "親自找幹部取貨" : "7-11 店到店",
      store_info: deliveryMethod === "seven" ? storeInfo : "",
      note: finalNote,
      payment_status: "pending",
    });

    setSubmitting(false);

    if (error) {
      console.error(error);
      alert("送出失敗，請稍後再試");
      return;
    }

    setDone(true);
  }

  return (
    <>
      <article
        className="group cursor-pointer rounded-[2rem] border border-white/20 bg-[#F4E8D9]/92 p-5 text-[#421211] shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:bg-white"
        onClick={() => setOpen(true)}
      >
        <div className="overflow-hidden rounded-[1.5rem] bg-white">
          <img
            src={image}
            alt={name}
            className="h-[300px] w-full object-contain p-4 transition duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="mt-7">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#A82128]">
            {label}
          </p>
          <h3 className="mt-5 text-3xl font-black tracking-tight">{name}</h3>
          <p className="mt-3 text-2xl font-black text-[#A82128]">
            NT${price}
          </p>
          <p className="mt-5 text-sm leading-7 text-[#7A665B]">
            點選商品填寫訂購資料。完成後請依轉帳資訊付款。
          </p>
        </div>
      </article>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-md">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/20 bg-[#F4E8D9] p-6 text-[#421211] shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.32em] text-[#A82128]">
                  Order Form
                </p>
                <h2 className="mt-3 text-3xl font-black md:text-5xl">
                  {name}
                </h2>
                <p className="mt-3 text-xl font-black text-[#A82128]">
                  NT${price}
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-[#421211]/20 px-4 py-2 text-sm font-black"
              >
                關閉
              </button>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[1.5rem] bg-white p-4">
                <img
                  src={image}
                  alt={name}
                  className="h-[320px] w-full object-contain"
                />
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-bold">數量</span>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 outline-none"
                  />
                </label>

                {isJersey && (
                  <>
                    <label className="block">
                      <span className="text-sm font-bold">球衣尺寸</span>
                      <select
                        value={jerseySize}
                        onChange={(e) => setJerseySize(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 outline-none"
                      >
                        <option value="2L">2L</option>
                        <option value="XL">XL</option>
                        <option value="L">L</option>
                        <option value="M">M</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="text-sm font-bold">
                        背面英文名字，例如 Y.H YEH
                      </span>
                      <input
                        value={jerseyName}
                        onChange={(e) => setJerseyName(e.target.value)}
                        placeholder="Y.H YEH"
                        className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 outline-none"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-bold">背號</span>
                      <input
                        value={jerseyNumber}
                        onChange={(e) => setJerseyNumber(e.target.value)}
                        placeholder="12"
                        className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 outline-none"
                      />
                    </label>
                  </>
                )}

                <label className="block">
                  <span className="text-sm font-bold">姓名</span>
                  <input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 outline-none"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold">電話</span>
                  <input
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 outline-none"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold">取貨方式</span>
                  <select
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 outline-none"
                  >
                    <option value="pickup">親自找幹部取貨</option>
                    <option value="seven">7-11 店到店</option>
                  </select>
                </label>

                {deliveryMethod === "seven" && (
                  <label className="block">
                    <span className="text-sm font-bold">
                      7-11 門市資訊
                    </span>
                    <textarea
                      value={storeInfo}
                      onChange={(e) => setStoreInfo(e.target.value)}
                      placeholder="請填寫門市名稱、店號或地址"
                      className="mt-2 min-h-24 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 outline-none"
                    />
                  </label>
                )}

                <label className="block">
                  <span className="text-sm font-bold">備註</span>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mt-2 min-h-20 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 outline-none"
                  />
                </label>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-sm text-[#7A665B]">合計金額</p>
                  <p className="text-3xl font-black text-[#A82128]">
                    NT${totalPrice}
                  </p>
                </div>

                <button
                  onClick={submitOrder}
                  disabled={submitting}
                  className="w-full rounded-full bg-[#A82128] px-6 py-4 text-base font-black text-white transition hover:bg-[#7D2528] disabled:opacity-50"
                >
                  {submitting ? "送出中" : "送出訂購資料"}
                </button>

                {done && (
                  <div className="rounded-2xl border border-[#A82128]/20 bg-white p-5">
                    <p className="font-black text-[#A82128]">
                      已送出訂購資料
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#7A665B]">
                      請依支持我們內的轉帳資訊完成付款，並保留匯款紀錄。
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}