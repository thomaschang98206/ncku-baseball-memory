"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

type DonationModalProps = {
  buttonText?: string;
  className?: string;
};

type DonationSettings = {
  account_name: string;
  bank_name: string;
  account_number: string;
  donation_note: string;
  support_slogan?: string | null;
  support_message?: string | null;
};

const fallbackSettings: DonationSettings = {
  account_name: "成功大學棒球社王昱峻",
  bank_name: "中華郵政",
  account_number: "0031071-0891691",
  donation_note: "轉帳後請保留匯款資訊。若為商品購買，送出表單後再依此帳戶完成付款。",
  support_slogan: "YOUR MEMORY, OUR LEGACY",
  support_message:
    "這不只是一場比賽的紀念，而是把十年裡一起流汗、歡呼、失落與再站起來的片段，留給下一個還相信棒球的人。",
};

export default function DonationModal({
  buttonText = "支持我們",
  className = "",
}: DonationModalProps) {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<DonationSettings>(fallbackSettings);
  const [loading, setLoading] = useState(false);

  async function openSupportModal() {
    setOpen(true);
    setLoading(true);

    const { data, error } = await supabase
      .from("donation_settings")
      .select(
        "account_name, bank_name, account_number, donation_note, support_slogan, support_message, updated_at"
      )
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      setSettings({
        account_name: data.account_name || fallbackSettings.account_name,
        bank_name: data.bank_name || fallbackSettings.bank_name,
        account_number: data.account_number || fallbackSettings.account_number,
        donation_note: data.donation_note || fallbackSettings.donation_note,
        support_slogan:
          data.support_slogan || fallbackSettings.support_slogan,
        support_message:
          data.support_message || fallbackSettings.support_message,
      });
    }

    setLoading(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={openSupportModal}
        className={`fixed bottom-7 right-7 z-40 rounded-full bg-[#9F2D30] px-8 py-4 text-sm font-black tracking-[0.18em] text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:bg-[#7B1F22] ${className}`}
      >
        {buttonText}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#321010] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(239,229,214,0.26),transparent_38%),linear-gradient(180deg,#74362D_0%,#321010_58%,#EFE5D6_140%)]" />

          <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-7 top-7 z-20 rounded-full bg-[#321010]/85 px-6 py-3 text-sm font-black tracking-[0.16em] text-white shadow-[0_16px_48px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:bg-[#9F2D30]"
          >
            關閉
          </button>

          <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
              <div className="animate-[supportLogo_1.2s_ease-out_both]">
                <img
                  src="/logo.png"
                  alt="NCKU Baseball Club Project 10"
                  className="mx-auto h-28 w-28 object-contain drop-shadow-[0_18px_45px_rgba(0,0,0,0.45)] md:h-36 md:w-36"
                />
              </div>

              <p className="mt-10 animate-[supportFadeUp_1.1s_ease-out_0.45s_both] text-xs font-black tracking-[0.42em] text-white/55 md:text-sm">
                NCKU BASEBALL CLUB
              </p>

              <h2 className="mt-5 max-w-4xl animate-[supportFadeUp_1.2s_ease-out_0.9s_both] text-4xl font-black leading-tight tracking-tight text-white md:text-7xl">
                {loading
                  ? "LOADING MEMORY..."
                  : settings.support_slogan || fallbackSettings.support_slogan}
              </h2>

              <p className="mt-8 max-w-3xl animate-[supportFadeUp_1.25s_ease-out_1.45s_both] text-base font-bold leading-9 text-white/78 md:text-2xl md:leading-[2.2]">
                {loading
                  ? "正在讀取支持我們的文字。"
                  : settings.support_message || fallbackSettings.support_message}
              </p>

              <div className="mt-12 animate-[supportFadeUp_1.2s_ease-out_2.05s_both] rounded-[2rem] border border-white/15 bg-white/10 px-6 py-5 text-left text-sm leading-8 text-white/78 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-md md:px-8 md:text-base">
                <p>
                  <span className="font-black text-white">匯款帳戶：</span>
                  {settings.bank_name} 700｜{settings.account_number}
                </p>
                <p>
                  <span className="font-black text-white">戶名：</span>
                  {settings.account_name}
                </p>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes supportLogo {
              0% {
                opacity: 0;
                transform: scale(0.82) translateY(16px);
                filter: blur(10px);
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0);
                filter: blur(0);
              }
            }

            @keyframes supportFadeUp {
              0% {
                opacity: 0;
                transform: translateY(28px);
                filter: blur(8px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
                filter: blur(0);
              }
            }
          `}</style>
        </div>
      ) : null}
    </>
  );
}