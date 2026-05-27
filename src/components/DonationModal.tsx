"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type DonationModalProps = {
  buttonText?: string;
  className?: string;
};

type SupportSettings = {
  support_slogan?: string | null;
  support_message?: string | null;
};

const DEFAULT_SLOGAN = "YOUR MEMORY, OUR LEGACY";

const DEFAULT_MESSAGE =
  "這不只是一場比賽的紀念，而是把十年裡一起流汗、歡呼、失落與再站起來的片段，留給下一個還相信棒球的人。";

export default function DonationModal({
  buttonText = "支持我們",
  className = "",
}: DonationModalProps) {
  const [open, setOpen] = useState(false);
  const [slogan, setSlogan] = useState(DEFAULT_SLOGAN);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);

  useEffect(() => {
    async function loadSupportText() {
      const { data, error } = await supabase
        .from("donation_settings")
        .select("support_slogan, support_message")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle<SupportSettings>();

      if (error) {
        console.warn("Failed to load support intro text:", error.message);
        return;
      }

      if (data?.support_slogan) {
        setSlogan(data.support_slogan);
      }

      if (data?.support_message) {
        setMessage(data.support_message);
      }
    }

    loadSupportText();
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`fixed bottom-7 right-7 z-40 rounded-full bg-[#A82D30] px-8 py-4 text-sm font-black tracking-[0.18em] text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:bg-[#7D2528] ${className}`}
      >
        {buttonText}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#2A0908] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.22),transparent_36%),linear-gradient(180deg,#6F2F26_0%,#2A0908_70%,#130404_100%)]" />

          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-7 top-7 z-20 rounded-full bg-white/90 px-6 py-3 text-sm font-black tracking-[0.18em] text-[#321010] shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:bg-white"
          >
            關閉
          </button>

          <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
              <div className="animate-[supportLogo_1.1s_ease-out_both]">
                <img
                  src="/logo.png"
                  alt="NCKU Baseball Club Project 10"
                  className="mx-auto h-28 w-28 rounded-full object-contain shadow-[0_20px_80px_rgba(0,0,0,0.35)] md:h-36 md:w-36"
                />
              </div>

              <p className="mt-8 animate-[supportFadeUp_1.2s_ease-out_0.45s_both] text-xs font-black tracking-[0.45em] text-white/60 md:text-sm">
                NCKU BASEBALL CLUB PROJECT 10
              </p>

              <h2 className="mt-8 max-w-4xl animate-[supportFadeUp_1.3s_ease-out_0.9s_both] text-4xl font-black leading-tight tracking-[-0.04em] md:text-7xl">
                {slogan}
              </h2>

              <p className="mt-10 max-w-3xl animate-[supportFadeUp_1.5s_ease-out_1.45s_both] text-lg font-bold leading-9 text-white/82 md:text-2xl md:leading-[1.8]">
                {message}
              </p>

              <div className="mt-14 animate-[supportFadeUp_1.5s_ease-out_2s_both]">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/25 bg-white/10 px-10 py-4 text-sm font-black tracking-[0.24em] text-white shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-md transition hover:-translate-y-1 hover:bg-white hover:text-[#321010]"
                >
                  ENTER
                </button>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes supportLogo {
              0% {
                opacity: 0;
                transform: scale(0.82);
                filter: blur(14px);
              }
              100% {
                opacity: 1;
                transform: scale(1);
                filter: blur(0);
              }
            }

            @keyframes supportFadeUp {
              0% {
                opacity: 0;
                transform: translateY(28px);
                filter: blur(10px);
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