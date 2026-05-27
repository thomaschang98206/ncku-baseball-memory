"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type DonationModalProps = {
  buttonText?: string;
  className?: string;
};

type SupportContent = {
  support_slogan: string;
  support_message: string;
};

const fallbackContent: SupportContent = {
  support_slogan: "YOUR MEMORY, OUR LEGACY",
  support_message:
    "這不只是一場比賽的紀念，而是把十年裡一起流汗、歡呼、失落與再站起來的片段，留給下一個還相信棒球的人。",
};

export default function DonationModal({
  buttonText = "支持我們",
  className = "",
}: DonationModalProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<SupportContent>(fallbackContent);

  useEffect(() => {
    if (!open) return;

    async function loadSupportContent() {
      const { data, error } = await supabase
        .from("donation_settings")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !data) {
        setContent(fallbackContent);
        return;
      }

      setContent({
        support_slogan:
          data.support_slogan?.trim() || fallbackContent.support_slogan,
        support_message:
          data.support_message?.trim() || fallbackContent.support_message,
      });
    }

    loadSupportContent();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`fixed bottom-7 right-7 z-40 rounded-full bg-[#A82D2F] px-8 py-4 text-sm font-black tracking-[0.16em] text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:bg-[#7D2528] ${className}`}
      >
        {buttonText}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#260808] px-5 text-white">
          <style>{`
            @keyframes supportBgIn {
              from {
                opacity: 0;
                transform: scale(1.04);
                filter: blur(10px);
              }
              to {
                opacity: 1;
                transform: scale(1);
                filter: blur(0);
              }
            }

            @keyframes supportLogoIn {
              from {
                opacity: 0;
                transform: translateY(20px) scale(0.92);
                filter: blur(8px);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0);
              }
            }

            @keyframes supportTextIn {
              from {
                opacity: 0;
                transform: translateY(28px);
                filter: blur(8px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
                filter: blur(0);
              }
            }

            @keyframes supportGlow {
              0%, 100% {
                opacity: 0.38;
                transform: translate(-50%, -50%) scale(1);
              }
              50% {
                opacity: 0.68;
                transform: translate(-50%, -50%) scale(1.08);
              }
            }
          `}</style>

          <div
            className="absolute inset-0"
            style={{
              animation: "supportBgIn 900ms ease-out both",
              background:
                "radial-gradient(circle at 50% 35%, rgba(168,45,47,0.52), transparent 34%), linear-gradient(180deg, #6F2D25 0%, #3A100E 52%, #1C0707 100%)",
            }}
          />

          <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:72px_72px]" />

          <div
            className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] rounded-full bg-[#EFE5D6] blur-[120px]"
            style={{
              animation: "supportGlow 5.5s ease-in-out infinite",
            }}
          />

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6 z-20 rounded-full bg-[#321010] px-7 py-4 text-base font-black tracking-[0.12em] text-white shadow-[0_16px_45px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:bg-[#4A1717]"
          >
            關閉
          </button>

          <div className="relative z-10 flex min-h-[80vh] w-full max-w-5xl flex-col items-center justify-center text-center">
            <div
              className="mb-10 flex flex-col items-center"
              style={{ animation: "supportLogoIn 1.1s ease-out both" }}
            >
              <img
                src="/images/logo.png"
                alt="NCKU Baseball Club Project 10"
                className="h-28 w-28 rounded-full object-contain drop-shadow-[0_20px_55px_rgba(0,0,0,0.45)] md:h-36 md:w-36"
              />

              <p className="mt-6 text-xs font-black tracking-[0.46em] text-white/70 md:text-sm">
                NCKU BASEBALL CLUB
              </p>

              <p className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
                PROJECT 10
              </p>
            </div>

            <div
              style={{
                animation: "supportTextIn 1.1s ease-out 650ms both",
              }}
            >
              <p className="text-xs font-black tracking-[0.48em] text-[#E0C9B5] md:text-sm">
                SUPPORT
              </p>

              <h2 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-7xl">
                {content.support_slogan}
              </h2>

              <p className="mx-auto mt-8 max-w-3xl text-lg font-bold leading-9 text-white/78 md:text-2xl md:leading-[2.4rem]">
                {content.support_message}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}