const PHONE = "+48692988692";
const PHONE_LABEL = "+48 692 988 692";

export default function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 text-sm text-zinc-600 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <div className="font-black text-zinc-950">
            TOKITOKI — kruszywa z dostawą
          </div>
          <div className="mt-1">
            Kruszywa Polska Sp. z o.o. · NIP: 813 38 40 157 · Rzeszów i okolice
          </div>
        </div>

        <div className="flex flex-wrap gap-4 font-bold">
          <a href="#regulamin" className="hover:text-emerald-800">
            Regulamin
          </a>
          <a href="#polityka-prywatnosci" className="hover:text-emerald-800">
            Polityka prywatności
          </a>
          <a href="#polityka-cookies" className="hover:text-emerald-800">
            Polityka cookies
          </a>
          <a href={`tel:${PHONE}`} className="hover:text-emerald-800">
            {PHONE_LABEL}
          </a>
        </div>
      </div>
    </footer>
  );
}