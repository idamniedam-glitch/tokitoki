import { Phone } from "lucide-react";
import LogoMark from "./LogoMark";

const PHONE = "+48692988692";
const PHONE_LABEL = "+48 692 988 692";

export default function Header({ goToStep, whatsappText }) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 text-left"
        >
          <LogoMark />
          <div>
            <div className="text-xl font-black leading-none tracking-tight sm:text-2xl">
              TOKITOKI
            </div>
            <div className="mt-1 text-[10px] font-black uppercase tracking-wide text-zinc-600">
              Kruszywa z dostawą
            </div>
          </div>
        </button>

        <nav className="hidden items-center gap-7 text-sm font-black md:flex">
          <button onClick={() => goToStep(1)} className="hover:text-emerald-800">
            Zamówienie
          </button>
          <a href="#kalkulator" className="hover:text-emerald-800">
            Kalkulator
          </a>
          <a href="#kontakt" className="hover:text-emerald-800">
            Kontakt
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${PHONE.replace("+", "")}?text=${whatsappText}`}
            className="hidden rounded-2xl bg-green-500 px-4 py-3 text-sm font-black text-white sm:inline-flex"
          >
            WhatsApp
          </a>

          <a
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl border-2 border-emerald-800 px-3 text-sm font-black text-emerald-900"
            href={`tel:${PHONE}`}
          >
            <Phone size={16} />
            <span className="hidden sm:inline">{PHONE_LABEL}</span>
          </a>
        </div>
      </div>
    </header>
  );
}