import { MessageCircle, Phone } from "lucide-react";

const PHONE = "+48692988692";

export default function ContactSection({ whatsappText }) {
  return (
    <section
      id="kontakt"
      className="scroll-mt-28 mx-auto max-w-7xl px-4 pb-20 lg:px-8"
    >
      <div className="rounded-[2rem] bg-emerald-950 p-6 text-white shadow-sm">
        <h2 className="text-2xl font-black">
          Potrzebujesz pomocy?
        </h2>

        <p className="mt-2 text-sm text-emerald-50/80">
          Doradzimy ilość, rodzaj kruszywa i możliwość dostawy.
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <a
            href={`https://wa.me/${PHONE.replace("+", "")}?text=${whatsappText}`}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-green-500 px-4 font-black"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>

          <a
            href={`tel:${PHONE}`}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white px-4 font-black text-emerald-950"
          >
            <Phone size={18} />
            Zadzwoń
          </a>
        </div>
      </div>
    </section>
  );
}