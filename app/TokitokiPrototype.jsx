"use client";

import React, { useMemo, useState } from "react";
import {
  ShoppingCart,
  Phone,
  MessageCircle,
  MapPin,
  Truck,
  Trash2,
  Plus,
  Minus,
  Leaf,
  HardHat,
  CheckCircle2,
  HelpCircle,
  Gift,
  Calculator,
  ArrowLeft,
  ArrowRight,
  Pencil,
  ChevronDown,
  Sparkles,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VAT = 0.23;
const PHONE = "+48692988692";
const PHONE_LABEL = "+48 692 988 692";

const deliveryZones = [
  {
    id: "rzeszow",
    name: "Rzeszów",
    price: 100,
    note: "stała cena dostawy na terenie miasta",
  },
  {
    id: "area",
    name: "Okolice Rzeszowa",
    price: null,
    note: "wycena indywidualna po podaniu adresu",
  },
];

const products = [
  // KRUSZYWA BUDOWLANE — PIASEK
    {
    id: "piasek-do-piaskownic",
    type: "build",
    subcategory: "Piasek",
    name: "Piasek do piaskownic",
    priceNet: 80,
    unit: "t",
    description:
      "Jasny, drobny piasek do piaskownic, placów zabaw i przestrzeni rekreacyjnych przy domu. Dostawa na terenie Rzeszowa i okolic.",
    image: "/produkty/piasek-do-piaskownic.jpg",
  },
  {
    id: "piasek-zasypowy",
    type: "build",
    subcategory: "Piasek",
    name: "Piasek zasypowy",
    priceNet: 70,
    unit: "t",
    description:
      "Piasek do zasypywania wykopów, wyrównywania terenu, fundamentów i prac ziemnych. Dostępny z transportem w Rzeszowie i okolicach.",
    image: "/produkty/piasek-zasypowy.jpg",
  },
  {
    id: "piasek-plukany-0-2",
    type: "build",
    subcategory: "Piasek",
    name: "Piasek płukany 0–2 mm",
    priceNet: 80,
    unit: "t",
    description:
      "Czysty piasek płukany do betonu, zapraw, wylewek i prac budowlanych. Popularny wybór na budowę i remont.",
    image: "/produkty/piasek-plukany-0-2.jpg",
  },
  {
    id: "piasek-do-tynkow-0-1",
    type: "build",
    subcategory: "Piasek",
    name: "Piasek do tynków 0–1 mm",
    priceNet: 85,
    unit: "t",
    description:
      "Drobny piasek do tynków, zapraw murarskich i prac wykończeniowych wymagających równej, drobnej frakcji.",
    image: "/produkty/piasek-do-tynkow-0-1.jpg",
  },
  {
    id: "zwir-2-8",
    type: "build",
    subcategory: "Żwir",
    name: "Żwir 2–8 mm",
    priceNet: 95,
    unit: "t",
    description:
      "Drobny żwir do betonu, drenaży, podsypek oraz prac ogrodowo-budowlanych. Dostawa Rzeszów i okolice.",
    image: "/produkty/zwir-2-8.jpg",
  },
  {
    id: "zwir-8-16",
    type: "build",
    subcategory: "Żwir",
    name: "Żwir 8–16 mm",
    priceNet: 100,
    unit: "t",
    description:
      "Uniwersalny żwir do betonu, drenażu, opasek wokół budynków, podjazdów i prac przy domu.",
    image: "/produkty/zwir-8-16.jpg",
  },
  {
    id: "zwir-16-32",
    type: "build",
    subcategory: "Żwir",
    name: "Żwir 16–32 mm",
    priceNet: 105,
    unit: "t",
    description:
      "Grubszy żwir do drenaży, odwodnień, warstw filtracyjnych i prac ziemnych wokół budynków.",
    image: "/produkty/zwir-16-32.jpg",
  },
  {
    id: "grys-2-8",
    type: "build",
    subcategory: "Grys",
    name: "Grys 2–8 mm",
    priceNet: 110,
    unit: "t",
    description:
      "Drobny grys do utwardzeń, podjazdów, ścieżek, drenażu i prac wykończeniowych. Kruszywo z dostawą w Rzeszowie.",
    image: "/produkty/grys-2-8.jpg",
  },
  {
    id: "grys-8-16",
    type: "build",
    subcategory: "Grys",
    name: "Grys 8–16 mm",
    priceNet: 115,
    unit: "t",
    description:
      "Popularna frakcja grysu do podjazdów, ścieżek, opasek przy budynkach, utwardzeń i prac ogrodowych.",
    image: "/produkty/grys-8-16.jpg",
  },
  {
    id: "tluczen-32-63",
    type: "build",
    subcategory: "Tłuczeń i kliniec",
    name: "Tłuczeń 32–63 mm",
    priceNet: 95,
    unit: "t",
    description:
      "Grube kruszywo do mocnych podbudów, dróg dojazdowych, placów, parkingów i utwardzania terenu.",
    image: "/produkty/tluczen-32-63.jpg",
  },
  {
    id: "kliniec-4-32",
    type: "build",
    subcategory: "Tłuczeń i kliniec",
    name: "Kliniec 4–32 mm",
    priceNet: 95,
    unit: "t",
    description:
      "Kliniec do podjazdów, podbudów, wyrównywania terenu i zagęszczania nawierzchni pod dalsze prace.",
    image: "/produkty/kliniec-4-32.jpg",
  },
  {
    id: "kruszywo-niesortowane-0-32",
    type: "build",
    subcategory: "Tłuczeń i kliniec",
    name: "Kruszywo niesortowane 0–32 mm",
    priceNet: 85,
    unit: "t",
    description:
      "Mieszanka drobnej i grubszej frakcji do stabilnych podbudów, utwardzeń, wyrównania terenu i prac drogowych.",
    image: "/produkty/kruszywo-0-32.jpg",
  },
  {
    id: "kruszywo-niesortowane-0-63",
    type: "build",
    subcategory: "Tłuczeń i kliniec",
    name: "Kruszywo niesortowane 0–63 mm",
    priceNet: 85,
    unit: "t",
    description:
      "Grubsza mieszanka do mocnych podbudów, utwardzania dróg, placów, parkingów i warstw nośnych.",
    image: "/produkty/kruszywo-0-63.jpg",
  },
  {
    id: "pospolka",
    type: "build",
    subcategory: "Pospółka",
    name: "Pospółka żwirowo-piaskowa",
    priceNet: 75,
    unit: "t",
    description:
      "Naturalna mieszanka piasku i żwiru do podbudów, zasypek, wyrównywania terenu, fundamentów i prac drogowych.",
    image: "/produkty/pospolka.jpg",
  },
  {
    id: "przekrusz-betonowy-0-63",
    type: "build",
    subcategory: "Przekrusz betonowy",
    name: "Przekrusz betonowy 0–63 mm",
    priceNet: 60,
    unit: "t",
    description:
      "Ekonomiczne kruszywo z recyklingu do utwardzania dróg, placów, podjazdów, dojazdów i podbudów.",
    image: "/produkty/przekrusz-betonowy-0-63.jpg",
  },


  // KRUSZYWA OZDOBNE
  {
    id: "grys-bialy",
    type: "decor",
    subcategory: "Grys ozdobny",
    name: "Grys biały dekoracyjny",
    priceNet: 420,
    unit: "t",
    description:
      "Do ogrodów, rabat, opasek wokół domu, dekoracji i nowoczesnych aranżacji terenu.",
    image:
      "https://images.unsplash.com/photo-1622467827417-bbe2237067a9?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "otoczak-szary",
    type: "decor",
    subcategory: "Otoczak",
    name: "Otoczak szary",
    priceNet: 390,
    unit: "t",
    description:
      "Naturalny kamień ozdobny do ogrodu, rabat, oczek wodnych i opasek przy elewacji.",
    image:
      "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=900&auto=format&fit=crop",
  },
];

const steps = ["Rodzaj", "Produkt", "Dostawa", "Dane", "Gotowe"];

function currency(value) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(value);
}

function gross(net) {
  return net * (1 + VAT);
}

function todayDate() {
  return new Date().toISOString().slice(0, 10);
}

function tomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}

export default function TokitokiPrototype() {
  const [showCalc, setShowCalc] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("build");
  const [subcategory, setSubcategory] = useState("Piasek");
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [zoneId, setZoneId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    notes: "",
  });
  const [calc, setCalc] = useState({ length: "", width: "", depth: "", compaction: 1 });
  const [toast, setToast] = useState(null);

  const phoneDigits = form.phone.replace(/\D/g, "");
  const isPhoneValid = phoneDigits.length === 9;
  const isAddressValid = form.address.trim().length >= 5;
  const zone = deliveryZones.find((z) => z.id === zoneId);

  const subcategories = [...new Set(products.filter((p) => p.type === selectedType).map((p) => p.subcategory))];
  const visibleProducts = products.filter(
    (p) => p.type === selectedType && (selectedType === "decor" || p.subcategory === subcategory)
  );

  const totals = useMemo(() => {
    const productsNet = cart.reduce((sum, item) => sum + item.priceNet * Number(item.qty), 0);
    const hasDeliverySelected = Boolean(zone);
    const deliveryNet = !hasDeliverySelected
      ? 0
      : zone?.id === "rzeszow" && productsNet >= 2000
      ? 0
      : zone?.price ?? 0;
    const net = productsNet + deliveryNet;
    const vat = net * VAT;
    const brutto = net + vat;
    return { productsNet, deliveryNet, net, vat, brutto, hasDeliverySelected };
  }, [cart, zone]);

  const calcResult = useMemo(() => {
    const l = Number(calc.length);
    const w = Number(calc.width);
    const d = Number(calc.depth) / 100;
    if (!l || !w || !d) return null;
    const m2 = l * w;
    const m3 = m2 * d;
    const tons = m3 * 1.55 * calc.compaction;
    return { m2, m3, tons };
  }, [calc]);

  const whatsappText = encodeURIComponent(
    `Cześć, chcę zamówić kruszywo w Tokitoki. Rejon: ${zone?.name}. Produkty: ${
      cart.map((i) => `${i.name} ${i.qty}${i.unit}`).join(", ") || "jeszcze wybieram"
    }`
  );

  function getQty(id) {
    return quantities[id] ?? 1;
  }

  function setQty(id, qty) {
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  }

  function showToast(message) {
    setToast(message);
    window.clearTimeout(window.__tokitokiToastTimer);
    window.__tokitokiToastTimer = window.setTimeout(() => setToast(null), 1400);
  }

  function addToCart(product) {
    const qtyValue = Number(getQty(product.id));
    if (!qtyValue || qtyValue < 1) {
      alert("Najmniejsza ilość zamówienia to 1 tona.");
      setQty(product.id, 1);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: Number(i.qty) + qtyValue } : i));
      }
      return [...prev, { ...product, qty: qtyValue }];
    });

    showToast(`Dodano: ${product.name}`);
  }

  function updateCartQty(id, nextQty) {
    const value = Number(nextQty);

    if (!value || value < 1) {
      setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: 1 } : i)));
      return;
    }

    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: value } : i)));
  }

  function removeFromCart(id) {
    const item = cart.find((i) => i.id === id);
    const confirmed = window.confirm(`Usunąć z koszyka: ${item?.name || "ten produkt"}?`);
    if (!confirmed) return;

    setCart((prev) => prev.filter((i) => i.id !== id));
    showToast("Produkt usunięty z koszyka");
  }

  function scrollToCart() {
    document.getElementById("koszyk")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goToStep(nextStep) {
    setStep(nextStep);
    setTimeout(() => {
      document.getElementById("zamowienie")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function validateDeliveryAndGoNext() {
    if (!zoneId) return alert("Wybierz miejsce dostawy: Rzeszów albo okolice Rzeszowa.");
    goToStep(4);
  }

  function validateAndSendToSummary() {
    if (!zoneId) return alert("Wybierz miejsce dostawy.");
    if (!isPhoneValid) return alert("Podaj poprawny numer telefonu — 9 cyfr.");
    if (!isAddressValid) return alert("Podaj dokładny adres dostawy.");
    goToStep(5);
  }

  async function sendOrder() {
    if (!zoneId) return alert("Wybierz miejsce dostawy.");
    if (!isPhoneValid) return alert("Podaj poprawny numer telefonu — 9 cyfr.");
    if (!isAddressValid) return alert("Podaj dokładny adres dostawy.");
    if (cart.length === 0) return alert("Dodaj przynajmniej jeden produkt do koszyka.");

    const res = await fetch("/api/send-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        address: form.address,
        date: form.date,
        time: form.time,
        notes: form.notes,
        zone: zone?.name,
        productsNet: totals.productsNet,
        deliveryNet: zone?.price === null ? "do wyceny" : totals.deliveryNet,
        totalGross: zone?.price === null ? "do potwierdzenia" : totals.brutto,
        cart: cart.map((i) => `${i.name} ${i.qty}${i.unit}`).join(", "),
      }),
    });

    const data = await res.json();
    alert(data.success ? "Zamówienie wysłane!" : "Błąd wysyłki!");
  }

  return (
    <div className="min-h-screen bg-[#f7f4ee] pb-28 text-zinc-950 lg:pb-0 [&_a]:cursor-pointer [&_button]:cursor-pointer">
      <Header goToStep={goToStep} whatsappText={whatsappText} />

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-stone-50 to-emerald-50/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-8 pt-7 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-stone-100 px-4 py-2 text-xs font-bold text-zinc-700">
              Ponad 200 dostaw w Rzeszowie i regionie rocznie
            </div>

            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-900">
              <Sparkles size={16} /> Dostawa kruszyw — Rzeszów i okolice
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.03] tracking-tight sm:text-5xl lg:text-7xl">
              Zamów kruszywo <span className="text-emerald-800">szybko i wygodnie</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-700 sm:text-lg">
              Zamówienie potwierdzamy telefonicznie — nic nie ryzykujesz.
            </p>
            <p className="mt-2 text-sm font-bold text-zinc-500">
              Bez rejestracji • bez płatności online • szybkie zamówienia
            </p>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-700 sm:text-lg">
              Wybierz materiał, podaj ilość i adres.
              My to załadujemy na nasze "taczki" i przywieziemy :) ! 
            </p>

            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <button
  type="button"
  onClick={() => goToStep(1)}
  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-emerald-800 px-7 py-4 text-base font-black text-white shadow-xl shadow-emerald-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-900"
>
  Wybierz kruszywo <ArrowRight size={20} />
</button>
              <a href={`https://wa.me/${PHONE.replace("+", "")}?text=${whatsappText}`} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border-2 border-emerald-800 bg-white px-7 py-4 text-base font-black text-emerald-900 transition hover:bg-emerald-50">
                Zapytaj na WhatsApp <MessageCircle size={20} />
              </a>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <MiniProof icon={<Truck size={19} />} title="Szybka dostawa" text="Rzeszów i okolice" />
              <MiniProof icon={<ShieldCheck size={19} />} title="Uczciwe ceny" text="bez ukrytych kosztów" />
              <MiniProof icon={<Clock3 size={19} />} title="Lokalna firma" text="działamy na miejscu" />
            </div>
          </motion.div>

          <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] bg-stone-200 shadow-2xl shadow-stone-300/60 lg:min-h-[520px]">
            <img className="h-full w-full object-cover" src="/hero-taczki-rzeszow.png" alt="Dostawa kruszyw w Rzeszowie" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/55 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <CalculatorBox showCalc={showCalc} setShowCalc={setShowCalc} calc={calc} setCalc={setCalc} calcResult={calcResult} />

      <main id="zamowienie" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <OrderProgress step={step} goToStep={goToStep} cart={cart} totals={totals} zone={zone} />

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
            {step === 1 && (
              <Panel>
                <SectionIntro eyebrow="Krok 1" title="Co chcesz zamówić?" text="Wybierz kategorię — potem pokażemy tylko pasujące produkty." />
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <TypeCard active={selectedType === "build"} icon={<HardHat size={30} />} title="Kruszywa budowlane" text="Piasek, pospółka, kliniec, kamień" onClick={() => { setSelectedType("build"); setSubcategory("Piasek"); }} />
                  <TypeCard active={selectedType === "decor"} icon={<Leaf size={30} />} title="Kruszywa ozdobne" text="Grys, otoczaki i kamień dekoracyjny" onClick={() => setSelectedType("decor")} />
                </div>
                <StepActions onNext={() => goToStep(2)} nextLabel="Pokaż produkty" />
              </Panel>
            )}

            {step === 2 && (
              <section className="space-y-6">
                {selectedType === "build" && (
                  <Panel>
                    <SectionIntro eyebrow="Krok 2" title="Wybierz podkategorię" text="Szybki filtr pomaga szybciej znaleźć właściwy materiał." />
                    <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                      {subcategories.map((s) => (
                        <button key={s} type="button" onClick={() => setSubcategory(s)} className={`min-h-12 shrink-0 rounded-2xl px-5 font-black transition ${subcategory === s ? "bg-emerald-800 text-white shadow-lg shadow-emerald-900/15" : "bg-stone-100 text-zinc-700 hover:bg-stone-200"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </Panel>
                )}

                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-black uppercase tracking-wide text-emerald-800">Produkty</p>
                    <h2 className="text-3xl font-black tracking-tight">{selectedType === "build" ? subcategory : "Kamienie ozdobne"}</h2>
                  </div>
                  <p className="text-sm font-bold text-zinc-500">Kliknij „Dodaj” — koszyk pojawi się na dole ekranu.</p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} qty={getQty(product.id)} setQty={setQty} addToCart={addToCart} />
                  ))}
                </div>

                <CartBox cart={cart} totals={totals} zone={zone} removeFromCart={removeFromCart} updateCartQty={updateCartQty} />
                <StepActions backLabel="Wstecz" nextLabel="Dalej: dostawa" onBack={() => goToStep(1)} onNext={() => { if (cart.length === 0) return alert("Dodaj przynajmniej jeden produkt."); goToStep(3); }} />
              </section>
            )}

            {step === 3 && (
              <section className="space-y-6">
                <Panel>
                  <SectionIntro eyebrow="Krok 3" title="Gdzie dostarczyć?" text="Cena transportu naliczy się automatycznie dla Rzeszowa albo przejdzie do wyceny indywidualnej." />
                  <div className="mt-5 grid gap-3">
                    {deliveryZones.map((z) => {
                      const isFreeDelivery = z.id === "rzeszow" && totals.productsNet >= 2000;
                      const displayPrice = isFreeDelivery ? "gratis" : z.price ? currency(z.price) : "wycena";
                      return (
                        <button key={z.id} type="button" onClick={() => setZoneId(z.id)} className={`flex min-h-20 w-full items-center justify-between gap-4 rounded-3xl border p-4 text-left transition ${zoneId === z.id ? "border-emerald-700 bg-emerald-50 shadow-sm" : "border-stone-200 bg-white hover:bg-stone-50"}`}>
                          <span>
                            <span className="flex items-center gap-2 text-lg font-black">{z.name}{z.id === "area" && <HelpCircle size={17} className="text-zinc-400" />}</span>
                            <span className="mt-1 block text-sm text-zinc-500">{z.note}</span>
                          </span>
                          <span className="rounded-2xl bg-white px-4 py-2 font-black text-emerald-800 shadow-sm">{displayPrice}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-950">
                    <div className="flex items-start gap-3"><Gift size={22} className="mt-0.5 shrink-0" /><div><b>Transport gratis na terenie Rzeszowa</b><p className="mt-1 text-emerald-800">Przy zamówieniu powyżej 2000 zł netto transport naliczy się jako 0 zł.</p></div></div>
                  </div>
                </Panel>
                <StepActions backLabel="Wstecz" nextLabel="Dalej: dane" onBack={() => goToStep(2)} onNext={validateDeliveryAndGoNext} />
              </section>
            )}

            {step === 4 && (
              <Panel>
                <SectionIntro eyebrow="Krok 4" title="Dane do potwierdzenia" text="Nie pobieramy płatności online. Najpierw potwierdzimy telefonicznie szczegóły zamówienia." />
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <Input placeholder="Imię i nazwisko / firma" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <div>
                    <Input required placeholder="Telefon *" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} error={form.phone && !isPhoneValid} />
                    {form.phone && !isPhoneValid && <p className="mt-1 text-sm font-bold text-red-600">Numer telefonu powinien mieć 9 cyfr.</p>}
                  </div>
                  <div className="md:col-span-2">
                    <Input required placeholder="Dokładny adres dostawy *" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} error={form.address && !isAddressValid} />
                    {form.address && !isAddressValid && <p className="mt-1 text-sm font-bold text-red-600">Podaj dokładniejszy adres dostawy.</p>}
                  </div>
                  <div className="rounded-3xl border border-stone-200 bg-white p-4 md:col-span-2">
                    <p className="mb-3 font-black">Preferowany termin dostawy</p>
                    <div className="flex flex-wrap gap-3">
                      <DateButton active={form.date === todayDate()} onClick={() => setForm({ ...form, date: todayDate() })}>Dziś</DateButton>
                      <DateButton active={form.date === tomorrowDate()} onClick={() => setForm({ ...form, date: tomorrowDate() })}>Jutro</DateButton>
                      <input type="date" className="min-h-12 rounded-2xl border border-stone-200 px-4 font-bold" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                    </div>
                  </div>
                  <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                  <textarea className="min-h-32 rounded-3xl border border-stone-200 bg-white p-4 outline-none transition focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 md:col-span-2" placeholder="Uwagi: wąski wjazd, brak miejsca do zawracania, ograniczenia tonażowe..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>
                <StepActions backLabel="Wstecz" nextLabel="Dalej: podsumowanie" onBack={() => goToStep(3)} onNext={validateAndSendToSummary} />
              </Panel>
            )}

            {step === 5 && (
              <section className="mx-auto max-w-3xl">
                <Panel>
                  <SectionIntro eyebrow="Krok 5" title="Sprawdź i wyślij zamówienie" text="Po wysłaniu oddzwonimy, żeby potwierdzić dostępność, transport i termin." />
                  <div className="mt-5 space-y-3">
                    {cart.map((item) => <SummaryItem key={item.id} item={item} />)}
                  </div>
                  <SummaryTotals zone={zone} totals={totals} />
                  <div className="mt-5 rounded-3xl bg-stone-50 p-4 text-sm">
                    <div className="font-black">Dane klienta</div>
                    <div className="mt-2 text-zinc-600">{form.name || "Brak imienia / firmy"}</div>
                    <div className="text-zinc-600">Tel: {form.phone}</div>
                    <div className="text-zinc-600">Adres: {form.address}</div>
                    {(form.date || form.time) && <div className="text-zinc-600">Termin: {form.date || "bez daty"} {form.time || ""}</div>}
                    {form.notes && <div className="mt-2 text-zinc-600">Uwagi: {form.notes}</div>}
                  </div>
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    <button type="button" onClick={() => goToStep(2)} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-stone-100 px-6 font-black text-zinc-700"><Pencil size={18} /> Edytuj koszyk</button>
                    <button type="button" onClick={() => goToStep(4)} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-stone-100 px-6 font-black text-zinc-700"><Pencil size={18} /> Edytuj dane</button>
                  </div>
                  <button onClick={sendOrder} className="mt-5 w-full rounded-2xl bg-emerald-800 px-6 py-5 text-lg font-black text-white shadow-xl shadow-emerald-900/20 transition hover:bg-emerald-900">Wyślij zamówienie do potwierdzenia</button>
                  <p className="mt-3 text-xs leading-5 text-zinc-500">Zamówienie zostanie przyjęte do weryfikacji. Nie jest to jeszcze płatna rezerwacja.</p>
                </Panel>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
  <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-stone-200">
    <h2 className="text-2xl font-black">
      Kruszywa Rzeszów – sprzedaż i transport
    </h2>

    <p className="mt-3 leading-7 text-zinc-600">
      Dostarczamy kruszywa budowlane na terenie Rzeszowa i okolic: piasek,
      żwir, grys, kliniec, pospółkę oraz przekrusz betonowy.
    </p>

    <p className="mt-3 leading-7 text-zinc-600">
      Zamówienie złożysz szybko online, bez rejestracji i bez płatności z góry.
      Szczegóły dostawy potwierdzamy telefonicznie.
    </p>
  </div>
</section>

      <ContactSection whatsappText={whatsappText} />
      <Toast message={toast} />
      <MobileSticky cart={cart} totals={totals} zone={zone} step={step} goToStep={goToStep} scrollToCart={scrollToCart} />
    </div>
  );
}

function Header({ goToStep, whatsappText }) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-8">
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 text-left"
        >
          <LogoMark />
          <div><div className="text-xl font-black leading-none tracking-tight sm:text-2xl">TOKITOKI</div><div className="mt-1 text-[10px] font-black uppercase tracking-wide text-zinc-600">Kruszywa z dostawą</div></div>
        </button>
        <nav className="hidden items-center gap-7 text-sm font-black md:flex">
          <button onClick={() => goToStep(1)} className="hover:text-emerald-800">Zamówienie</button>
          <a href="#kalkulator" className="hover:text-emerald-800">Kalkulator</a>
          <a href="#kontakt" className="hover:text-emerald-800">Kontakt</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href={`https://wa.me/${PHONE.replace("+", "")}?text=${whatsappText}`} className="hidden rounded-2xl bg-green-500 px-4 py-3 text-sm font-black text-white sm:inline-flex">WhatsApp</a>
          <a className="inline-flex min-h-11 items-center gap-2 rounded-2xl border-2 border-emerald-800 px-3 text-sm font-black text-emerald-900" href={`tel:${PHONE}`}><Phone size={16} /> <span className="hidden sm:inline">{PHONE_LABEL}</span></a>
        </div>
      </div>
    </header>
  );
}

function CalculatorBox({ showCalc, setShowCalc, calc, setCalc, calcResult }) {
  return (
    <section id="kalkulator" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-stone-200">
        <button type="button" onClick={() => setShowCalc(!showCalc)} className="flex min-h-20 w-full items-center justify-between gap-4 text-left">
          <div className="flex items-start gap-3"><div className="mt-1 rounded-2xl bg-emerald-50 p-3 text-emerald-800"><Calculator size={22} /></div><div><h2 className="text-2xl font-black">Nie wiesz ile zamówić?</h2><p className="mt-1 text-sm text-zinc-600">Policz orientacyjną ilość materiału przed dodaniem do koszyka.</p></div></div>
          <span className="inline-flex items-center gap-1 rounded-xl bg-emerald-800 px-4 py-2 text-sm font-black text-white">{showCalc ? "Zwiń" : "Rozwiń"}<ChevronDown size={16} className={showCalc ? "rotate-180" : ""} /></span>
        </button>
        <AnimatePresence>
          {showCalc && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <Input type="number" placeholder="Długość (m)" value={calc.length} onChange={(e) => setCalc({ ...calc, length: e.target.value })} />
                <Input type="number" placeholder="Szerokość (m)" value={calc.width} onChange={(e) => setCalc({ ...calc, width: e.target.value })} />
                <Input type="number" placeholder="Grubość (cm)" value={calc.depth} onChange={(e) => setCalc({ ...calc, depth: e.target.value })} />
              </div>
              <div className="mt-6"><p className="font-black">Czy materiał będzie zagęszczany?</p><div className="mt-3 flex flex-wrap gap-3"><DateButton active={calc.compaction === 1} onClick={() => setCalc({ ...calc, compaction: 1 })}>Nie</DateButton><DateButton active={calc.compaction === 1.15} onClick={() => setCalc({ ...calc, compaction: 1.15 })}>Lekko +15%</DateButton><DateButton active={calc.compaction === 1.2} onClick={() => setCalc({ ...calc, compaction: 1.2 })}>Mocno +20%</DateButton></div></div>
              {calcResult && <div className="mt-6 rounded-3xl bg-emerald-50 p-5"><div className="text-lg font-bold">Powierzchnia: {calcResult.m2.toFixed(2)} m²</div><div className="text-lg font-bold">Objętość: {calcResult.m3.toFixed(2)} m³</div><div className="mt-2 text-3xl font-black text-emerald-800">≈ {calcResult.tons.toFixed(2)} ton</div></div>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function OrderProgress({ step, goToStep }) {
  return (
    <section className="mb-6 rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-stone-200 sm:p-4">
      <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-black sm:gap-2 sm:text-sm">
        {steps.map((label, index) => {
          const number = index + 1;
          const isActive = step === number;
          const isDone = step > number;

          return (
            <button
              key={label}
              type="button"
              onClick={() => goToStep(number)}
              className={`flex min-h-14 flex-col items-center justify-center rounded-2xl px-1.5 leading-tight transition sm:min-h-12 sm:flex-row sm:gap-1 sm:px-2 ${
                isActive
                  ? "bg-emerald-800 text-white shadow-lg shadow-emerald-900/15"
                  : isDone
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-stone-100 text-zinc-500"
              }`}
            >
              <span className="text-[11px] sm:text-sm">{number}.</span>
              <span className="mt-0.5 max-w-full truncate text-[10px] sm:mt-0 sm:text-sm">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ProductCard({ product, qty, setQty, addToCart }) {
  const safeQty = Number(qty) || 0;
  return (
    <article className="group overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-300/40">
      <div className="relative h-48 overflow-hidden"><img
  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
  src={product.image}
  alt={`${product.name} Rzeszów dostawa kruszywa`}
  loading="lazy"
/>
      <div className="p-4">
        <h3 className="text-xl font-black leading-tight">{product.name}</h3>
        <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-600">{product.description}</p>
        <div className="mt-3 flex items-end justify-between gap-3 rounded-2xl bg-stone-50 p-3">
          <div><div className="text-xs font-bold text-zinc-500">Netto / {product.unit}</div><div className="text-2xl font-black">{currency(product.priceNet)}</div></div>
          <div className="text-right text-sm text-zinc-600">Brutto<br /><b>{currency(gross(product.priceNet))}</b></div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex min-h-14 flex-1 items-center justify-between rounded-2xl border border-stone-200 p-2">
            <button type="button" onClick={() => setQty(product.id, Math.max(1, Number(qty || 1) - 1))} className="rounded-xl bg-stone-100 p-3"><Minus size={16} /></button>
            <input type="number" value={qty} min="1" onChange={(e) => setQty(product.id, e.target.value)} onBlur={() => { if (qty === "" || Number(qty) < 1) setQty(product.id, 1); }} className="w-16 border-none bg-transparent text-center text-lg font-black outline-none" />
            <button type="button" onClick={() => setQty(product.id, Number(qty || 1) + 1)} className="rounded-xl bg-stone-100 p-3"><Plus size={16} /></button>
          </div>
          <button type="button" onClick={() => addToCart(product)} className="min-h-14 rounded-2xl bg-emerald-800 px-5 font-black text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-900">Dodaj</button>
        </div>
        <div className="mt-3 text-sm text-zinc-600">Razem netto: <b>{currency(product.priceNet * safeQty)}</b></div>
      </div>
    </article>
  );
}

function MobileSticky({ cart, totals, zone, step, goToStep, scrollToCart }) {
  if (step >= 5) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 p-3 shadow-2xl backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-3">
        <button
          type="button"
          onClick={() => {
            if (cart.length === 0) return goToStep(2);
            if (step !== 2) return goToStep(2);
            scrollToCart();
          }}
          className="flex min-h-14 items-center gap-3 rounded-2xl bg-stone-50 px-3 text-left ring-1 ring-stone-200 active:scale-[0.99]"
        >
          <div className="rounded-xl bg-emerald-100 p-2 text-emerald-800">
            <ShoppingCart size={18} />
          </div>
          <div>
            <div className="text-xs font-bold text-zinc-500">Kliknij, aby zobaczyć koszyk</div>
            <div className="font-black text-emerald-800">
              {cart.length} prod. · {!totals.hasDeliverySelected ? currency(totals.productsNet ? gross(totals.productsNet) : 0) : zone?.price === null ? "do potwierdzenia" : currency(totals.brutto)}
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            if (cart.length === 0) return goToStep(2);
            if (step === 1) goToStep(2);
            else if (step === 2) goToStep(3);
            else if (step === 3) {
              if (!zone?.id) return alert("Wybierz miejsce dostawy.");
              goToStep(4);
            } else if (step === 4) goToStep(5);
          }}
          className="min-h-14 rounded-2xl bg-emerald-800 px-5 text-sm font-black text-white active:scale-[0.98]"
        >
          {cart.length === 0 ? "Wybierz" : "Dalej"}
        </button>
      </div>
    </div>
  );
}

function Panel({ children }) { return <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-stone-200 sm:p-6">{children}</section>; }
function SectionIntro({ eyebrow, title, text }) { return <div><p className="text-sm font-black uppercase tracking-wide text-emerald-800">{eyebrow}</p><h2 className="mt-1 text-3xl font-black tracking-tight">{title}</h2><p className="mt-2 max-w-2xl text-zinc-600">{text}</p></div>; }
function TypeCard({ active, icon, title, text, onClick }) { return <button type="button" onClick={onClick} className={`min-h-44 rounded-3xl border p-6 text-left transition hover:-translate-y-1 hover:shadow-xl ${active ? "border-emerald-700 bg-emerald-50 shadow-lg shadow-emerald-900/10" : "border-stone-200 bg-stone-50"}`}><div className="text-emerald-800">{icon}</div><div className="mt-4 text-2xl font-black">{title}</div><p className="mt-2 text-zinc-600">{text}</p>{active && <div className="mt-4 inline-flex rounded-full bg-emerald-800 px-4 py-2 text-sm font-black text-white">Wybrane</div>}</button>; }
function StepActions({ onBack, onNext, backLabel, nextLabel }) { return <div className="mt-6 flex justify-between gap-3"><button type="button" onClick={onBack} disabled={!onBack} className={`inline-flex min-h-14 items-center gap-2 rounded-2xl px-5 font-black ${onBack ? "bg-stone-100 text-zinc-700" : "invisible"}`}><ArrowLeft size={18} /> {backLabel || "Wstecz"}</button><button type="button" onClick={onNext} className="inline-flex min-h-14 items-center gap-2 rounded-2xl bg-emerald-800 px-6 font-black text-white shadow-lg shadow-emerald-900/15">{nextLabel || "Dalej"} <ArrowRight size={18} /></button></div>; }
function Input({ error, className = "", ...props }) { return <input {...props} className={`min-h-14 w-full rounded-2xl border bg-white p-4 outline-none transition focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 ${error ? "border-red-500 bg-red-50" : "border-stone-200"} ${className}`} />; }
function DateButton({ active, children, ...props }) { return <button type="button" {...props} className={`min-h-12 rounded-2xl px-4 font-black transition ${active ? "bg-emerald-800 text-white" : "bg-stone-100 text-zinc-700 hover:bg-stone-200"}`}>{children}</button>; }
function MiniProof({ icon, title, text }) { return <div className="flex items-center gap-3 rounded-2xl bg-white/80 p-3 shadow-sm ring-1 ring-stone-200"><div className="text-emerald-800">{icon}</div><div><div className="text-sm font-black">{title}</div><div className="text-xs text-zinc-600">{text}</div></div></div>; }
function SummaryItem({ item }) { return <div className="flex items-center gap-3 rounded-2xl border border-stone-200 p-3"><img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" /><div className="flex-1"><div className="font-black">{item.name}</div><div className="text-sm text-zinc-500">{item.qty} {item.unit} · {currency(item.priceNet * item.qty)} netto</div></div></div>; }
function SummaryTotals({ zone, totals }) { return <div className="mt-5 rounded-3xl bg-stone-50 p-4 text-sm"><div className="flex justify-between"><span>Miejsce dostawy:</span><b>{zone?.name}</b></div><div className="mt-2 flex justify-between"><span>Produkty netto:</span><b>{currency(totals.productsNet)}</b></div><div className="mt-2 flex justify-between"><span>Transport netto:</span><b>{!totals.hasDeliverySelected ? "wybierz dostawę" : zone?.price === null ? "do wyceny" : currency(totals.deliveryNet)}</b></div><div className="mt-2 flex justify-between"><span>VAT 23%:</span><b>{zone?.price === null ? "—" : currency(totals.vat)}</b></div><div className="mt-3 flex justify-between text-lg text-emerald-800"><span className="font-black">Razem brutto:</span><b>{!totals.hasDeliverySelected ? currency(totals.productsNet ? gross(totals.productsNet) : 0) : zone?.price === null ? "do potwierdzenia" : currency(totals.brutto)}</b></div></div>; }

function CartBox({ cart, totals, zone, removeFromCart, updateCartQty }) {
  return (
    <section id="koszyk" className="scroll-mt-28 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-stone-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black">Koszyk ({cart.length})</h2>
          <p className="mt-1 text-sm text-zinc-500">Tutaj możesz zmienić ilość ton albo usunąć produkt.</p>
        </div>
        <ShoppingCart className="text-emerald-800" />
      </div>

      <div className="mt-4 space-y-3">
        {cart.length === 0 && (
          <p className="rounded-2xl bg-stone-50 p-4 text-sm text-zinc-600">
            Dodaj produkt, żeby zobaczyć podsumowanie.
          </p>
        )}

        {cart.map((item) => (
          <div key={item.id} className="rounded-3xl border border-stone-200 p-3">
            <div className="flex gap-3">
              <img className="h-16 w-16 rounded-xl object-cover" src={item.image} alt="" />
              <div className="min-w-0 flex-1">
                <div className="font-bold leading-tight">{item.name}</div>
                <div className="mt-1 text-sm text-zinc-500">
                  {currency(item.priceNet)} netto / {item.unit}
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="h-11 w-11 rounded-2xl text-zinc-400 transition hover:bg-red-50 hover:text-red-600 active:scale-95"
                aria-label={`Usuń ${item.name} z koszyka`}
              >
                <Trash2 size={18} className="mx-auto" />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-stone-50 p-2">
              <div className="flex min-h-12 items-center rounded-2xl bg-white ring-1 ring-stone-200">
                <button
                  type="button"
                  onClick={() => updateCartQty(item.id, Math.max(1, Number(item.qty || 1) - 1))}
                  className="h-12 w-12 rounded-l-2xl font-black text-zinc-700 active:bg-stone-100"
                  aria-label="Zmniejsz ilość"
                >
                  <Minus size={16} className="mx-auto" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateCartQty(item.id, e.target.value)}
                  onBlur={(e) => updateCartQty(item.id, e.target.value)}
                  className="h-12 w-16 border-x border-stone-100 text-center text-lg font-black outline-none"
                  aria-label={`Ilość ton dla ${item.name}`}
                />
                <button
                  type="button"
                  onClick={() => updateCartQty(item.id, Number(item.qty || 1) + 1)}
                  className="h-12 w-12 rounded-r-2xl font-black text-zinc-700 active:bg-stone-100"
                  aria-label="Zwiększ ilość"
                >
                  <Plus size={16} className="mx-auto" />
                </button>
              </div>

              <div className="text-right text-sm">
                <div className="text-zinc-500">Razem netto</div>
                <div className="font-black text-emerald-800">{currency(item.priceNet * item.qty)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2 border-t border-stone-200 pt-4 text-sm">
        <div className="flex justify-between"><span>Produkty netto</span><b>{currency(totals.productsNet)}</b></div>
        <div className="flex justify-between"><span>Transport netto</span><b>{!totals.hasDeliverySelected ? "wybierz dostawę" : zone?.price === null ? "do wyceny" : currency(totals.deliveryNet)}</b></div>
        <div className="flex justify-between text-lg text-emerald-800"><span className="font-black">Razem brutto</span><b>{!totals.hasDeliverySelected ? currency(totals.productsNet ? gross(totals.productsNet) : 0) : zone?.price === null ? "do potwierdzenia" : currency(totals.brutto)}</b></div>
      </div>
    </section>
  );
}

function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          className="fixed bottom-24 left-4 right-4 z-[60] mx-auto flex max-w-md items-center gap-3 rounded-3xl bg-zinc-950 px-4 py-4 text-white shadow-2xl lg:bottom-8"
          role="status"
        >
          <div className="rounded-2xl bg-emerald-500 p-2">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div className="font-black">Gotowe</div>
            <div className="text-sm text-white/80">{message}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContactSection({ whatsappText }) {
  return <section id="kontakt" className="scroll-mt-28 mx-auto max-w-7xl px-4 pb-20 lg:px-8"><div className="rounded-[2rem] bg-emerald-950 p-6 text-white shadow-sm"><h2 className="text-2xl font-black">Potrzebujesz pomocy?</h2><p className="mt-2 text-sm text-emerald-50/80">Doradzimy ilość, rodzaj kruszywa i możliwość dostawy.</p><div className="mt-4 grid gap-3 md:grid-cols-2"><a href={`https://wa.me/${PHONE.replace("+", "")}?text=${whatsappText}`} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-green-500 px-4 font-black"><MessageCircle size={18} /> WhatsApp</a><a href={`tel:${PHONE}`} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white px-4 font-black text-emerald-950"><Phone size={18} /> Zadzwoń</a></div></div></section>;
}

function LogoMark() {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center sm:h-12 sm:w-12">
      <svg viewBox="0 0 64 64" className="h-11 w-11 sm:h-12 sm:w-12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M14 26h34l-5 17H21L14 26Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" className="text-zinc-950" />
        <path d="M48 29l9-7M17 43l-8 8M41 43l9 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-zinc-950" />
        <circle cx="27" cy="51" r="5" stroke="currentColor" strokeWidth="4" className="text-zinc-950" />
        <path d="M25 23c3-8 9-13 17-15 0 8-4 14-12 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-800" />
        <path d="M31 20c-4-5-9-7-15-7 1 7 5 11 12 13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-800" />
      </svg>
    </div>
  );
}
