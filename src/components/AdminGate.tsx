"use client";

import { useEffect, useState } from "react";

const ADMIN_PASSWORD = "baseball0530";

export default function AdminGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);

    const saved = window.sessionStorage.getItem("project10-admin-login");
    if (saved === "ok") {
      setAllowed(true);
    }
  }, []);

  function login() {
    if (password === ADMIN_PASSWORD) {
      window.sessionStorage.setItem("project10-admin-login", "ok");
      setAllowed(true);
      setError("");
    } else {
      setError("密碼錯誤，請重新輸入。");
    }
  }

  function logout() {
    window.sessionStorage.removeItem("project10-admin-login");
    setAllowed(false);
    setPassword("");
  }

  if (!mounted) {
    return null;
  }

  if (!allowed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#1B0707] px-5 text-[#421211]">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(244,232,217,0.72),transparent_26%),radial-gradient(circle_at_58%_18%,rgba(168,57,47,0.75),transparent_36%),linear-gradient(180deg,#32100F_0%,#7B2D25_48%,#180606_100%)]" />
        <div className="fixed inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(90deg,#F4E8D9_1px,transparent_1px),linear-gradient(#F4E8D9_1px,transparent_1px)] [background-size:42px_42px]" />

        <section className="w-full max-w-md rounded-[2rem] border border-white/20 bg-[#F4E8D9]/95 p-8 shadow-2xl backdrop-blur">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A82128]">
            Restricted Area
          </p>

          <h1 className="mt-4 text-4xl font-black">PROJECT 10 後台</h1>

          <p className="mt-4 text-sm leading-7 text-[#7A665B]">
            請輸入管理密碼。此頁不會從首頁顯示，只能透過後台網址進入。
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") login();
            }}
            placeholder="Admin password"
            className="mt-6 w-full rounded-2xl border border-[#D8C3AD] bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#A82128]"
          />

          {error ? (
            <p className="mt-3 text-sm font-black text-[#A82128]">{error}</p>
          ) : null}

          <button
            type="button"
            onClick={login}
            className="mt-5 w-full rounded-full bg-[#A82128] px-6 py-4 text-sm font-black text-white transition hover:bg-[#421211]"
          >
            進入後台
          </button>

          <p className="mt-5 text-xs leading-6 text-[#7A665B]">
            預設密碼：秘密
          </p>
        </section>
      </main>
    );
  }

  return (
    <>
      <div className="border-b border-[#D8C3AD] bg-[#421211] px-5 py-3 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#F0D6B8]">
            PROJECT 10 ADMIN MODE
          </p>

          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-white/25 px-4 py-2 text-xs font-black transition hover:bg-white hover:text-[#421211]"
          >
            登出
          </button>
        </div>
      </div>

      {children}
    </>
  );
}