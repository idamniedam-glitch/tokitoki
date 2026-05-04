"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem("tokitoki_cookie_consent");

    if (!consent) {
      setVisible(true);
    }
  }, []);

  function acceptCookies() {
    window.localStorage.setItem("tokitoki_cookie_consent", "accepted");
    setVisible(false);
  }

  function rejectCookies() {
    window.localStorage.setItem("tokitoki_cookie_consent", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-stone-200 bg-white p-4 shadow-2xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-sm leading-6 text-zinc-600">
          <b className="text-zinc-950">Pliki cookies</b>
          <br />
          Używamy cookies technicznych do działania strony.
          <a
            href="#polityka-cookies"
            className="ml-1 font-bold text-emerald-800"
          >
            Polityka cookies
          </a>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={rejectCookies}
            className="min-h-12 rounded-2xl bg-stone-100 px-5 font-black text-zinc-700"
          >
            Odrzuć
          </button>

          <button
            type="button"
            onClick={acceptCookies}
            className="min-h-12 rounded-2xl bg-emerald-800 px-5 font-black text-white"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}