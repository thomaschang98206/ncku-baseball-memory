"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type DonationSettings = {
  account_name: string;
  bank_name: string;
  account_number: string;
  donation_note: string;
  qr_code_url?: string | null;
};

const fallbackDonation: DonationSettings = {
  account_name: "??憭批飛璉?蝷曄??勗?",
  bank_name: "銝剛?菜",
  account_number: "0031071-0891691",
  donation_note:
    "頧董敺?靽??舀狡鞈???箏??頃鞎瘀??銵典敺?靘迨撣單摰?隞狡??,
  qr_code_url: "",
};

export default function DonationModal() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState<DonationSettings>(fallbackDonation);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll);

    supabase
      .from("donation_settings")
      .select("*")
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) setSettings(data as DonationSettings);
      });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-5 z-50 rounded-full border border-white/25 bg-[#A82128] px-8 py-4 text-sm font-black tracking-[0.12em] text-white shadow-[0_18px_45px_rgba(66,18,17,0.32)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-[#8E1F26] md:right-8 ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-8 opacity-0"
        }`}
      >
        ?舀???
      </button>

      {open ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <div className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/20 bg-[#F4E8D9] text-[#421211] shadow-2xl">
            <div className="border-b border-[#D8C3AD] bg-[#421211] p-6 text-white">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F0D6B8]">
                Support Project 10
              </p>
              <h2 className="mt-3 text-3xl font-black">?舀???/h2>
            </div>

            <div className="space-y-4 p-6">
              <div className="rounded-2xl border border-[#D8C3AD] bg-white/70 p-5">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#A82128]">
                  Bank
                </p>
                <p className="mt-2 text-2xl font-black">{settings.bank_name}</p>
              </div>

              <div className="rounded-2xl border border-[#D8C3AD] bg-white/70 p-5">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#A82128]">
                  Account Name
                </p>
                <p className="mt-2 text-2xl font-black">
                  {settings.account_name}
                </p>
              </div>

              <div className="rounded-2xl border border-[#D8C3AD] bg-white/70 p-5">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#A82128]">
                  Account Number
                </p>
                <p className="mt-2 text-3xl font-black tracking-wider">
                  {settings.account_number}
                </p>
              </div>

              {settings.qr_code_url ? (
                <div className="rounded-2xl border border-[#D8C3AD] bg-white/70 p-5">
                  <img
                    src={settings.qr_code_url}
                    alt="QR Code"
                    className="mx-auto max-h-64 object-contain"
                  />
                </div>
              ) : null}

              <p className="text-sm leading-7 text-[#7A665B]">
                {settings.donation_note}
              </p>
            </div>

            <div className="flex gap-3 border-t border-[#D8C3AD] p-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border border-[#A82128]/25 px-6 py-3 text-sm font-black text-[#A82128]"
              >
                ??
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
