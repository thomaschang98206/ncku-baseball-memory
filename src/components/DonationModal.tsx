"use client";

import { useState } from "react";

type DonationModalProps = {
  buttonText?: string;
  className?: string;
};

const donationSettings = {
  account_name: "成功大學棒球社王昱峻",
  bank_name: "中華郵政",
  bank_code: "700",
  branch_name: "成功大學郵局",
  account_number: "0031071-0891691",
  donation_note:
    "轉帳後請保留匯款資訊。若為商品購買，送出表單後再依此帳戶完成付款。",
};

export default function DonationModal({
  buttonText = "支持我們",
  className = "",
}: DonationModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`fixed bottom-7 right-7 z-40 rounded-full bg-[#9F2D30] px-8 py-4 text-sm font-black tracking-[0.18em] text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:bg-[#7B1F22] ${className}`}
      >
        {buttonText}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-md">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#EFE5D6] p-7 text-[#321010] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 rounded-full border border-[#321010]/20 px-4 py-2 text-xs font-black tracking-[0.16em] text-[#321010]/70 hover:bg-white/60"
            >
              CLOSE
            </button>

            <p className="mb-3 text-xs font-black tracking-[0.32em] text-[#9F2D30]">
              SUPPORT PROJECT 10
            </p>

            <h2 className="text-3xl font-black tracking-tight">
              支持我們
            </h2>

            <p className="mt-4 leading-8 text-[#705F56]">
              若你想支持 PROJECT 10 十週年影像計畫，可以透過以下帳戶轉帳。
              商品購買也會使用同一個帳戶完成付款。
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-[#321010]/15 bg-white/55 p-5">
              <div className="grid gap-4 text-sm">
                <InfoRow label="銀行" value={donationSettings.bank_name} />
                <InfoRow label="銀行代號" value={donationSettings.bank_code} />
                <InfoRow label="分行" value={donationSettings.branch_name} />
                <InfoRow label="戶名" value={donationSettings.account_name} />
                <InfoRow label="帳號" value={donationSettings.account_number} />
              </div>
            </div>

            <div className="mt-5 rounded-[1.25rem] bg-[#321010] p-5 text-white">
              <p className="text-xs font-black tracking-[0.24em] text-white/55">
                NOTE
              </p>
              <p className="mt-2 leading-7 text-white/85">
                {donationSettings.donation_note}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-[#321010]/10 pb-3 last:border-b-0 last:pb-0">
      <span className="text-xs font-black tracking-[0.18em] text-[#9F2D30]">
        {label}
      </span>
      <span className="text-right text-base font-black text-[#321010]">
        {value}
      </span>
    </div>
  );
}