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
  bankName: "銝剛?菜",
  bankCode: "700",
  accountNumber: "0031071-0891691",
  accountName: "??憭批飛璉?蝷曄??勗?",
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
  const [deliveryMethod, setDeliveryMethod] = useState("閬芾?曉凳?典?鞎?);
  const [storeInfo, setStoreInfo] = useState("");
  const [note, setNote] = useState("");

  const [jerseySize, setJerseySize] = useState("L");
  const [jerseyName, setJerseyName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");

  const total = price * quantity;

  async function submitOrder() {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("隢‵撖怠????餉店??);
      return;
    }

    if (type === "jersey") {
      if (!jerseySize || !jerseyName.trim() || !jerseyNumber.trim()) {
        alert("?﹝隢‵撖怠偕撖詻??摮?????);
        return;
      }
    }

    if (deliveryMethod === "7-11 ?嗡辣" && !storeInfo.trim()) {
      alert("隢‵撖?7-11 ?撣?閮?);
      return;
    }

    setLoading(true);

    const jerseyDetail =
      type === "jersey"
        ? `?﹝撠箏站嚗?{jerseySize}嚗?敺??摮?${jerseyName}嚗???${jerseyNumber}?
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
      alert("?憭望?嚗?蝣箄? Supabase orders 甈??臬摮??);
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
            暺憛怠神鞈潸眺鞈???鞎冽撘?
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
                  NT${price} / 隞?
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
                ??
              </button>
            </div>

            {!done ? (
              <div className="mt-8 space-y-5">
                <label className="block">
                  <span className="text-sm font-black">?賊?</span>
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
                      <span className="text-sm font-black">撠箏站</span>
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
                      <span className="text-sm font-black">???望???</span>
                      <input
                        value={jerseyName}
                        onChange={(e) => setJerseyName(e.target.value)}
                        placeholder="靘? Y.H YEH"
                        className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 font-bold outline-none"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-black">??</span>
                      <input
                        value={jerseyNumber}
                        onChange={(e) => setJerseyNumber(e.target.value)}
                        placeholder="靘? 12"
                        className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 font-bold outline-none"
                      />
                    </label>
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-black">憪?</span>
                    <input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 font-bold outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-black">?餉店</span>
                    <input
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 font-bold outline-none"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-black">?疏?孵?</span>
                  <select
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 font-bold outline-none"
                  >
                    <option value="閬芾?曉凳?典?鞎?>閬芾?曉凳?典?鞎?/option>
                    <option value="7-11 ?嗡辣">7-11 ?嗡辣</option>
                  </select>
                </label>

                {deliveryMethod === "7-11 ?嗡辣" && (
                  <label className="block">
                    <span className="text-sm font-black">
                      7-11 ?撣?閮?
                    </span>
                    <textarea
                      value={storeInfo}
                      onChange={(e) => setStoreInfo(e.target.value)}
                      placeholder="隢‵撖恍?撣?蝔晞?撣?????
                      className="mt-2 min-h-24 w-full rounded-2xl border border-[#421211]/15 bg-white px-4 py-3 font-bold outline-none"
                    />
                  </label>
                )}

                <label className="block">
                  <span className="text-sm font-black">?酉</span>
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
                  {loading ? "?銝?.." : "?銵典銝行??撣唾?閮?}
                </button>
              </div>
            ) : (
              <div className="mt-8 space-y-5">
                <div className="rounded-[1.5rem] bg-white p-6">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A82128]">
                    Payment Info
                  </p>
                  <h3 className="mt-4 text-2xl font-black">
                    銵典撌脤嚗?靘??孵董?嗅???甈?
                  </h3>

                  <div className="mt-6 grid gap-3 text-base font-bold">
                    <p>?銵?{bankInfo.bankName}</p>
                    <p>?銵誨蝣潘?{bankInfo.bankCode}</p>
                    <p>撣唾?嚗bankInfo.accountNumber}</p>
                    <p>?嗅?嚗bankInfo.accountName}</p>
                    <p>??嚗T${total}</p>
                  </div>

                  <p className="mt-6 text-sm leading-7 text-[#7A665B]">
                    頧董敺?靽??舀狡鞈??蝷曉??閬撠????找?憛怠神?????餉店?舐鼠??
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
                  摰?
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
