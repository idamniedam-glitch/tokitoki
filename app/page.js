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
  Shovel,
  Leaf,
  HardHat,
  CheckCircle2,
  HelpCircle,
  Gift,
  Calculator,
  ArrowLeft,
  ArrowRight,
  Pencil,
} from "lucide-react";
import { motion } from "framer-motion";

const VAT = 0.23;

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
  {
    id: "piasek-plukany-0-2",
    type: "build",
    subcategory: "Piasek",
    name: "Piasek płukany 0–2 mm",
    priceNet: 80,
    unit: "t",
    description: "Do betonu, zapraw, wylewek i prac budowlanych.",
    image:
      "https://images.unsplash.com/photo-1605366344364-8f6f0108d891?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "piasek-zasypowy",
    type: "build",
    subcategory: "Piasek",
    name: "Piasek zasypowy",
    priceNet: 70,
    unit: "t",
    description: "Do zasypywania wykopów, pod kostkę i fundamenty.",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "pospolka",
    type: "build",
    subcategory: "Pospółka",
    name: "Pospółka żwirowo-piaskowa",
    priceNet: 75,
    unit: "t",
    description: "Podbudowy, wyrównania terenu i prace drogowe.",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "kliniec-31-63",
    type: "build",
    subcategory: "Kamień",
    name: "Kliniec 31–63 mm",
    priceNet: 95,
    unit: "t",
    description: "Na podbudowy, drogi dojazdowe i utwardzenia.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "grys-bialy",
    type: "decor",
    subcategory: "Grys",
    name: "Grys biały dekoracyjny",
    priceNet: 420,
    unit: "t",
    description: "Do ogrodów, rabat, opasek wokół domu i dekoracji.",
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
    description: "Naturalny kamień ozdobny do ogrodu i przy elewacji.",
    image:
      "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=900&auto=format&fit=crop",
  },
];

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

const steps = ["Rodzaj", "Produkt", "Dostawa", "Dane", "Podsumowanie"];

export default function TokitokiPrototype() {
  const [showCalc, setShowCalc] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("build");
  const [subcategory, setSubcategory] = useState("Piasek");
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [zoneId, setZoneId] = useState("rzeszow");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    notes: "",
  });
  const [calc, setCalc] = useState({
    length: "",
    width: "",
    depth: "",
    compaction: 1,
  });

  const phoneDigits = form.phone.replace(/\D/g, "");
  const isPhoneValid = phoneDigits.length === 9;
  const isAddressValid = form.address.trim().length >= 5;
  const zone = deliveryZones.find((z) => z.id === zoneId);

  const subcategories = [
    ...new Set(
      products
        .filter((p) => p.type === selectedType)
        .map((p) => p.subcategory)
    ),
  ];

  const visibleProducts = products.filter(
    (p) =>
      p.type === selectedType &&
      (selectedType === "decor" || p.subcategory === subcategory)
  );

  const totals = useMemo(() => {
    const productsNet = cart.reduce(
      (sum, item) => sum + item.priceNet * Number(item.qty),
      0
    );

    const deliveryNet =
      zone?.id === "rzeszow" && productsNet >= 2000
        ? 0
        : zone?.price ?? 0;

    const net = productsNet + deliveryNet;
    const vat = net * VAT;
    const brutto = net + vat;

    return { productsNet, deliveryNet, net, vat, brutto };
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

  function getQty(id) {
    return quantities[id] ?? 1;
  }

  function setQty(id, qty) {
    setQuantities((prev) => ({ ...prev, [id]: qty }));
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
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: Number(i.qty) + qtyValue } : i
        );
      }

      return [...prev, { ...product, qty: qtyValue }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function goToStep(nextStep) {
    setStep(nextStep);

    setTimeout(() => {
      document.getElementById("zamowienie")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  }

  function validateAndSendToSummary() {
    if (!isPhoneValid) {
      alert("Podaj poprawny numer telefonu — 9 cyfr.");
      return;
    }

    if (!isAddressValid) {
      alert("Podaj dokładny adres dostawy.");
      return;
    }

    goToStep(5);
  }

  const whatsappText = encodeURIComponent(
    `Cześć, chcę zamówić kruszywo w Tokitoki. Rejon: ${
      zone?.name
    }. Produkty: ${
      cart.map((i) => `${i.name} ${i.qty}${i.unit}`).join(", ") ||
      "jeszcze wybieram"
    }`
  );

  return (
    <div className="min-h-screen bg-stone-50 text-zinc-950">
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <button
            type="button"
            onClick={() => goToStep(1)}
            className="flex items-center gap-3 text-left"
          >
            <LogoMark />
            <div>
              <div className="text-2xl font-black leading-none tracking-tight">
                TOKITOKI
              </div>
              <div className="mt-1 text-[10px] font-black uppercase tracking-wide text-zinc-700">
                Kruszywa z dostawą
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-8 text-sm font-bold md:flex">
            <a href="#zamowienie" className="hover:text-emerald-800">
              Strona główna
            </a>
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="hover:text-emerald-800"
            >
              Kruszywa
            </button>
            <a href="#kalkulator" className="hover:text-emerald-800">
              Kalkulator
            </a>
            <a href="#kontakt" className="hover:text-emerald-800">
              Kontakt
            </a>
          </nav>

          <a
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-700 px-4 py-2 text-sm font-black text-emerald-800"
            href="tel:+48123456789"
          >
            <Phone size={16} /> +48 123 456 789
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-stone-200 bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/10" />

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col justify-center"
          >
            <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Kruszywa z dostawą{" "}
              <span className="block text-emerald-800">
                w Rzeszowie i okolicach
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-700">
              Szeroki wybór kruszyw budowlanych i ozdobnych z szybką dostawą
              pod wskazany adres.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => goToStep(1)}
                className="inline-flex items-center gap-3 rounded-2xl bg-emerald-800 px-6 py-4 font-black text-white shadow-lg shadow-emerald-900/15"
              >
                Zamów kruszywo <ArrowRight size={18} />
              </button>

              <a
                href={`https://wa.me/48123456789?text=${whatsappText}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-emerald-800 px-6 py-4 font-black text-emerald-900"
              >
                Skontaktuj się <Phone size={17} />
              </a>
            </div>

            <div className="mt-10 grid gap-4 text-sm sm:grid-cols-3">
              <TrustBadge
                icon={<MapPin size={24} />}
                title="Lokalna firma"
                text="z Rzeszowa"
              />
              <TrustBadge
                icon={<CheckCircle2 size={24} />}
                title="Uczciwe ceny"
                text="bez ukrytych kosztów"
              />
              <TrustBadge
                icon={<Truck size={24} />}
                title="Szybka dostawa"
                text="na terenie miasta"
              />
            </div>
          </motion.div>

          <div className="relative z-0 min-h-[300px] overflow-hidden rounded-[2rem] bg-stone-100 shadow-2xl shadow-stone-300 lg:min-h-[440px] lg:rounded-none lg:shadow-none">
            <img
              className="h-full w-full object-cover"
              src="/hero-taczki-rzeszow.png"
              alt="Taczka z kamieniem na tle Rzeszowa"
            />
            <div className="absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-white to-transparent lg:block" />
          </div>
        </div>
      </section>

      <section
        id="kalkulator"
        className="scroll-mt-28 mx-auto max-w-7xl px-4 py-6 lg:px-8"
      >
        <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-stone-200">
          <button
            type="button"
            onClick={() => setShowCalc(!showCalc)}
            className="flex w-full items-center justify-between gap-4 text-left"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-2xl bg-emerald-50 p-3 text-emerald-800">
                <Calculator size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-black">Nie wiem ile zamówić</h2>
                <p className="mt-1 text-sm text-zinc-600">
                  Rozwiń kalkulator i policz orientacyjną ilość materiału.
                </p>
              </div>
            </div>

            <span className="shrink-0 rounded-xl bg-emerald-800 px-4 py-2 text-sm font-bold text-white">
              {showCalc ? "Zwiń" : "Rozwiń"}
            </span>
          </button>

          {showCalc && (
            <div className="mt-6">
              <div className="grid gap-4 md:grid-cols-3">
                <input
                  type="number"
                  placeholder="Długość (m)"
                  value={calc.length}
                  onChange={(e) =>
                    setCalc({ ...calc, length: e.target.value })
                  }
                  className="rounded-2xl border border-stone-200 p-4"
                />
                <input
                  type="number"
                  placeholder="Szerokość (m)"
                  value={calc.width}
                  onChange={(e) => setCalc({ ...calc, width: e.target.value })}
                  className="rounded-2xl border border-stone-200 p-4"
                />
                <input
                  type="number"
                  placeholder="Grubość (cm)"
                  value={calc.depth}
                  onChange={(e) => setCalc({ ...calc, depth: e.target.value })}
                  className="rounded-2xl border border-stone-200 p-4"
                />
              </div>

              <div className="mt-6">
                <div className="mb-3">
                  <p className="font-bold">
                    Czy materiał będzie ubijany / zagęszczany?
                  </p>
                  <p className="mt-1 text-sm text-zinc-600">
                    Dotyczy podjazdu, kostki, drogi, fundamentu lub mocno
                    ubijanej warstwy.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setCalc({ ...calc, compaction: 1 })}
                    className={`rounded-xl px-4 py-2 font-bold ${
                      calc.compaction === 1
                        ? "bg-emerald-800 text-white"
                        : "bg-stone-100"
                    }`}
                  >
                    Nie
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalc({ ...calc, compaction: 1.15 })}
                    className={`rounded-xl px-4 py-2 font-bold ${
                      calc.compaction === 1.15
                        ? "bg-emerald-800 text-white"
                        : "bg-stone-100"
                    }`}
                  >
                    Lekko (+15%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalc({ ...calc, compaction: 1.2 })}
                    className={`rounded-xl px-4 py-2 font-bold ${
                      calc.compaction === 1.2
                        ? "bg-emerald-800 text-white"
                        : "bg-stone-100"
                    }`}
                  >
                    Mocno (+20%)
                  </button>
                </div>
              </div>

              {calcResult && (
                <div className="mt-6 rounded-2xl bg-emerald-50 p-5">
                  <div className="text-lg font-bold">
                    Powierzchnia: {calcResult.m2.toFixed(2)} m²
                  </div>
                  <div className="text-lg font-bold">
                    Objętość: {calcResult.m3.toFixed(2)} m³
                  </div>
                  <div className="mt-2 text-2xl font-black text-emerald-800">
                    ≈ {calcResult.tons.toFixed(2)} ton
                  </div>
                </div>
              )}

              <div className="mt-6 rounded-2xl bg-stone-50 p-4 text-sm text-zinc-600">
                <p>
                  Wynik jest orientacyjny. Przyjęto przelicznik{" "}
                  <b>1 m³ ≈ 1,55 t</b>. Przy warstwach ubijanych warto doliczyć{" "}
                  <b>15–20%</b> materiału.
                </p>

                <a
                  href="tel:+48123456789"
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 font-bold text-white"
                >
                  <Phone size={16} /> Nie wiem ile zamówić — zadzwoń
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <main
        id="zamowienie"
        className="scroll-mt-28 mx-auto max-w-7xl px-4 py-10 lg:px-8"
      >
        <section className="mb-6 rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-stone-200">
          <div className="grid grid-cols-5 gap-2 text-center text-[11px] font-black md:text-sm">
            {steps.map((label, index) => {
              const number = index + 1;

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => goToStep(number)}
                  className={`rounded-2xl px-2 py-3 transition ${
                    step === number
                      ? "bg-emerald-800 text-white"
                      : step > number
                      ? "bg-emerald-50 text-emerald-800"
                      : "bg-stone-100 text-zinc-500"
                  }`}
                >
                  <span className="block md:hidden">{number}</span>
                  <span className="hidden md:block">
                    {number}. {label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl bg-stone-50 p-3 text-sm">
            <div>
              <b>{cart.length}</b> produktów w koszyku
            </div>
            <div className="font-black text-emerald-800">
              {zone?.price === null ? "do potwierdzenia" : currency(totals.brutto)}
            </div>
          </div>
        </section>

        {step === 1 && (
          <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <h2 className="text-2xl font-black">Wybierz rodzaj kruszywa</h2>
            <p className="mt-2 text-zinc-600">
              Najpierw wybierz, czy szukasz materiału budowlanego, czy kamienia
              dekoracyjnego.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedType("build");
                  setSubcategory("Piasek");
                }}
                className={`rounded-3xl border p-6 text-left transition ${
                  selectedType === "build"
                    ? "border-emerald-700 bg-emerald-50"
                    : "border-stone-200 bg-stone-50"
                }`}
              >
                <HardHat className="mb-4 text-emerald-800" />
                <div className="text-2xl font-black">Kruszywa budowlane</div>
                <p className="mt-2 text-zinc-600">
                  Piasek, pospółka, kamień, kliniec
                </p>

                {selectedType === "build" && (
                  <div className="mt-4 inline-flex rounded-full bg-emerald-800 px-4 py-2 text-sm font-black text-white">
                    Wybrane
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedType("decor")}
                className={`rounded-3xl border p-6 text-left transition ${
                  selectedType === "decor"
                    ? "border-emerald-700 bg-emerald-50"
                    : "border-stone-200 bg-stone-50"
                }`}
              >
                <Leaf className="mb-4 text-emerald-800" />
                <div className="text-2xl font-black">Kruszywa ozdobne</div>
                <p className="mt-2 text-zinc-600">
                  Grys, otoczaki, kamień dekoracyjny
                </p>

                {selectedType === "decor" && (
                  <div className="mt-4 inline-flex rounded-full bg-emerald-800 px-4 py-2 text-sm font-black text-white">
                    Wybrane
                  </div>
                )}
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-800 px-6 py-4 font-black text-white"
              >
                Dalej <ArrowRight size={18} />
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-6">
            {selectedType === "build" && (
              <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-stone-200">
                <h2 className="text-2xl font-black">Wybierz podkategorię</h2>

                <div className="mt-4 flex flex-wrap gap-3">
                  {subcategories.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSubcategory(s)}
                      className={`rounded-2xl px-5 py-3 font-bold ${
                        subcategory === s
                          ? "bg-emerald-800 text-white"
                          : "bg-stone-100 text-zinc-700"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-black">
                {selectedType === "build"
                  ? `Produkty: ${subcategory}`
                  : "Kamienie ozdobne"}
              </h2>
              <p className="mt-1 text-sm text-zinc-600">
                Dodaj wybrany produkt do koszyka. Ilość możesz zwiększać przed
                dodaniem.
              </p>
            </div>

            {visibleProducts.map((product) => {
              const qty = getQty(product.id);
              const safeQty = Number(qty) || 0;
              const net = product.priceNet * safeQty;

              return (
                <div
                  key={product.id}
                  className="grid gap-4 rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-stone-200 md:grid-cols-[130px_1fr_180px_190px]"
                >
                  <img
                    className="h-32 w-full rounded-2xl object-cover"
                    src={product.image}
                    alt={product.name}
                  />

                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-black">{product.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      {product.description}
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-sm font-bold text-emerald-700">
                      <CheckCircle2 size={16} /> Dostępność: do potwierdzenia
                    </p>
                  </div>

                  <div className="flex flex-col justify-center border-stone-200 md:border-l md:pl-5">
                    <div className="text-sm text-zinc-500">
                      Cena netto / {product.unit}
                    </div>
                    <div className="text-2xl font-black">
                      {currency(product.priceNet)}
                    </div>
                    <div className="mt-2 text-sm text-zinc-600">
                      Brutto: <b>{currency(gross(product.priceNet))}</b>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-3">
                    <div className="flex items-center justify-between rounded-2xl border border-stone-200 p-2">
                      <button
                        type="button"
                        onClick={() =>
                          setQty(
                            product.id,
                            Math.max(1, Number(qty || 1) - 1)
                          )
                        }
                        className="rounded-xl bg-stone-100 p-2"
                      >
                        <Minus size={16} />
                      </button>

                      <input
                        type="number"
                        value={qty}
                        onChange={(e) => setQty(product.id, e.target.value)}
                        onBlur={() => {
                          if (qty === "" || Number(qty) < 1) {
                            setQty(product.id, 1);
                          }
                        }}
                        className="w-20 border-none text-center font-black outline-none"
                        min="1"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setQty(product.id, Number(qty || 1) + 1)
                        }
                        className="rounded-xl bg-stone-100 p-2"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-sm text-zinc-600">
                      Razem netto: <b>{currency(net)}</b>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="rounded-2xl bg-emerald-800 px-4 py-3 font-bold text-white"
                    >
                      Dodaj do koszyka
                    </button>
                  </div>
                </div>
              );
            })}

            <CartBox
              cart={cart}
              totals={totals}
              zone={zone}
              removeFromCart={removeFromCart}
            />

            <div className="flex justify-between gap-3">
              <button
                type="button"
                onClick={() => goToStep(1)}
                className="inline-flex items-center gap-2 rounded-2xl bg-stone-100 px-6 py-4 font-black text-zinc-700"
              >
                <ArrowLeft size={18} /> Wstecz
              </button>

              <button
                type="button"
                onClick={() => {
                  if (cart.length === 0) {
                    alert("Dodaj przynajmniej jeden produkt.");
                    return;
                  }
                  goToStep(3);
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-800 px-6 py-4 font-black text-white"
              >
                Dalej: dostawa <ArrowRight size={18} />
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-6">
            <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-stone-200">
              <h2 className="text-2xl font-black">Miejsce dostawy</h2>
              <p className="mt-1 text-sm text-zinc-600">
                Wybierz, czy dostawa jest na terenie Rzeszowa, czy poza miastem.
              </p>

              <div className="mt-4 space-y-2">
                {deliveryZones.map((z) => {
                  const isFreeDelivery =
                    z.id === "rzeszow" && totals.productsNet >= 2000;

                  const displayPrice = isFreeDelivery
                    ? "gratis"
                    : z.price
                    ? currency(z.price)
                    : "wycena";

                  return (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => setZoneId(z.id)}
                      className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left ${
                        zoneId === z.id
                          ? "border-emerald-700 bg-emerald-50"
                          : "border-stone-200"
                      }`}
                    >
                      <span>
                        <span className="flex items-center gap-2 font-bold">
                          {z.name}

                          {z.id === "area" && (
                            <span
                              title="Po złożeniu zamówienia podaj dokładny adres dostawy. Skontaktujemy się telefonicznie i potwierdzimy indywidualny koszt transportu."
                              className="inline-flex items-center text-zinc-400"
                            >
                              <HelpCircle size={16} />
                            </span>
                          )}
                        </span>

                        <span className="text-xs text-zinc-500">{z.note}</span>
                      </span>

                      <span className="font-black text-emerald-800">
                        {displayPrice}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900">
                <div className="flex items-start gap-3">
                  <Gift size={20} className="mt-0.5 shrink-0" />
                  <div>
                    <b>Transport gratis na terenie Rzeszowa</b>
                    <p className="mt-1 text-emerald-800">
                      Przy zamówieniu powyżej 2000 zł netto transport na terenie
                      Rzeszowa naliczy się automatycznie jako 0 zł.
                    </p>
                  </div>
                </div>
              </div>

              {zoneId === "area" && (
                <div className="mt-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
                  Dostawa poza Rzeszów jest wyceniana indywidualnie. Po złożeniu
                  zamówienia zadzwonimy, potwierdzimy adres i podamy koszt
                  transportu.
                </div>
              )}
            </div>

            <div className="flex justify-between gap-3">
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="inline-flex items-center gap-2 rounded-2xl bg-stone-100 px-6 py-4 font-black text-zinc-700"
              >
                <ArrowLeft size={18} /> Wstecz
              </button>

              <button
                type="button"
                onClick={() => goToStep(4)}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-800 px-6 py-4 font-black text-white"
              >
                Dalej: dane <ArrowRight size={18} />
              </button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <h2 className="text-2xl font-black">Dane zamówienia</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Podaj dane do kontaktu. Zamówienie i tak będzie potwierdzane
              telefonicznie.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input
                className="rounded-2xl border border-stone-200 p-4"
                placeholder="Imię i nazwisko / firma"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <div>
                <input
                  required
                  className={`w-full rounded-2xl border p-4 ${
                    form.phone && !isPhoneValid
                      ? "border-red-500 bg-red-50"
                      : "border-stone-200"
                  }`}
                  placeholder="Telefon *"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />

                {form.phone && !isPhoneValid && (
                  <p className="mt-1 text-sm font-bold text-red-600">
                    Numer telefonu powinien mieć 9 cyfr.
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <input
                  required
                  className={`w-full rounded-2xl border p-4 ${
                    form.address && !isAddressValid
                      ? "border-red-500 bg-red-50"
                      : "border-stone-200"
                  }`}
                  placeholder="Dokładny adres dostawy *"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />

                {form.address && !isAddressValid && (
                  <p className="mt-1 text-sm font-bold text-red-600">
                    Podaj dokładniejszy adres dostawy.
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-stone-200 p-4 md:col-span-2">
                <p className="mb-3 font-bold">Preferowany termin dostawy</p>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, date: todayDate() })}
                    className={`rounded-xl px-4 py-2 font-bold ${
                      form.date === todayDate()
                        ? "bg-emerald-800 text-white"
                        : "bg-stone-100 text-zinc-700"
                    }`}
                  >
                    Dziś
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, date: tomorrowDate() })}
                    className={`rounded-xl px-4 py-2 font-bold ${
                      form.date === tomorrowDate()
                        ? "bg-emerald-800 text-white"
                        : "bg-stone-100 text-zinc-700"
                    }`}
                  >
                    Jutro
                  </button>

                  <input
                    type="date"
                    className="rounded-xl border border-stone-200 px-4 py-2"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
              </div>

              <input
                type="time"
                className="rounded-2xl border border-stone-200 p-4"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />

              <textarea
                className="min-h-28 rounded-2xl border border-stone-200 p-4 md:col-span-2"
                placeholder="Uwagi do zamówienia, np. ograniczenia tonażowe, wąski wjazd, brak miejsca do zawracania lub inne trudności."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            <div className="mt-6 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="inline-flex items-center gap-2 rounded-2xl bg-stone-100 px-6 py-4 font-black text-zinc-700"
              >
                <ArrowLeft size={18} /> Wstecz
              </button>

              <button
                type="button"
                onClick={validateAndSendToSummary}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-800 px-6 py-4 font-black text-white"
              >
                Dalej: podsumowanie <ArrowRight size={18} />
              </button>
            </div>
          </section>
        )}

        {step === 5 && (
          <section className="mx-auto max-w-3xl rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <h2 className="text-2xl font-black">Podsumowanie zamówienia</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Sprawdź produkty, dostawę i dane. Potem wyślij zamówienie do
              potwierdzenia.
            </p>

            <div className="mt-5 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-2xl border border-stone-200 p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm text-zinc-500">
                      {item.qty} {item.unit} · {currency(item.priceNet * item.qty)} netto
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-stone-50 p-4 text-sm">
              <div className="flex justify-between">
                <span>Miejsce dostawy:</span>
                <b>{zone?.name}</b>
              </div>

              <div className="mt-2 flex justify-between">
                <span>Produkty netto:</span>
                <b>{currency(totals.productsNet)}</b>
              </div>

              <div className="mt-2 flex justify-between">
                <span>Transport netto:</span>
                <b>
                  {zone?.price === null
                    ? "do wyceny"
                    : currency(totals.deliveryNet)}
                </b>
              </div>

              <div className="mt-2 flex justify-between">
                <span>VAT 23%:</span>
                <b>{zone?.price === null ? "—" : currency(totals.vat)}</b>
              </div>

              <div className="mt-3 flex justify-between text-lg text-emerald-800">
                <span className="font-black">Razem brutto:</span>
                <b>
                  {zone?.price === null
                    ? "do potwierdzenia"
                    : currency(totals.brutto)}
                </b>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-stone-50 p-4 text-sm">
              <div className="font-black">Dane klienta</div>
              <div className="mt-2 text-zinc-600">
                {form.name || "Brak imienia / firmy"}
              </div>
              <div className="text-zinc-600">Tel: {form.phone}</div>
              <div className="text-zinc-600">Adres: {form.address}</div>
              {(form.date || form.time) && (
                <div className="text-zinc-600">
                  Termin: {form.date || "bez daty"} {form.time || ""}
                </div>
              )}
              {form.notes && (
                <div className="mt-2 text-zinc-600">Uwagi: {form.notes}</div>
              )}
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-100 px-6 py-4 font-black text-zinc-700"
              >
                <Pencil size={18} /> Edytuj koszyk
              </button>

              <button
                type="button"
                onClick={() => goToStep(4)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-100 px-6 py-4 font-black text-zinc-700"
              >
                <Pencil size={18} /> Edytuj dane
              </button>
            </div>

            <button
              onClick={async () => {
                if (!isPhoneValid) {
                  alert("Podaj poprawny numer telefonu — 9 cyfr.");
                  return;
                }

                if (!isAddressValid) {
                  alert("Podaj dokładny adres dostawy.");
                  return;
                }

                if (cart.length === 0) {
                  alert("Dodaj przynajmniej jeden produkt do koszyka.");
                  return;
                }

                const res = await fetch("/api/send-order", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
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
                    totalGross:
                      zone?.price === null ? "do potwierdzenia" : totals.brutto,
                    cart: cart
                      .map((i) => `${i.name} ${i.qty}${i.unit}`)
                      .join(", "),
                  }),
                });

                const data = await res.json();

                if (data.success) {
                  alert("Zamówienie wysłane!");
                } else {
                  alert("Błąd wysyłki!");
                }
              }}
              className="mt-5 w-full rounded-2xl bg-emerald-800 px-6 py-4 font-black text-white"
            >
              Złóż zamówienie do potwierdzenia
            </button>

            <p className="mt-3 text-xs leading-5 text-zinc-500">
              Dziękujemy. Zamówienie zostanie przyjęte do weryfikacji. Po
              wysłaniu potwierdzimy telefonicznie dostępność, koszt dostawy i
              możliwy termin realizacji.
            </p>
          </section>
        )}
      </main>

      {cart.length > 0 && step < 5 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 p-3 shadow-2xl backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-zinc-500">Koszyk</div>
              <div className="font-black text-emerald-800">
                {cart.length} prod. ·{" "}
                {zone?.price === null
                  ? "do potwierdzenia"
                  : currency(totals.brutto)}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (step < 3) goToStep(3);
                else if (step < 4) goToStep(4);
                else goToStep(5);
              }}
              className="rounded-2xl bg-emerald-800 px-5 py-3 text-sm font-black text-white"
            >
              Dalej
            </button>
          </div>
        </div>
      )}

      <section
        id="kontakt"
        className="scroll-mt-28 mx-auto max-w-7xl px-4 pb-20 lg:px-8"
      >
        <div className="rounded-[2rem] bg-emerald-950 p-5 text-white shadow-sm">
          <h2 className="text-xl font-black">Potrzebujesz pomocy?</h2>
          <p className="mt-2 text-sm text-emerald-50/80">
            Doradzimy ilość, rodzaj kruszywa i możliwość dostawy.
          </p>

          <div className="mt-4 grid gap-2 md:grid-cols-2">
            <a
              href={`https://wa.me/48123456789?text=${whatsappText}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-4 py-3 font-black"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>

            <a
              href="tel:+48123456789"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-black text-emerald-950"
            >
              <Phone size={18} /> Zadzwoń
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function LogoMark() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <svg
        viewBox="0 0 64 64"
        className="h-12 w-12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M14 26h34l-5 17H21L14 26Z"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
          className="text-zinc-950"
        />
        <path
          d="M48 29l9-7M17 43l-8 8M41 43l9 8"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-zinc-950"
        />
        <circle cx="27" cy="51" r="5" stroke="currentColor" strokeWidth="4" className="text-zinc-950" />
        <path
          d="M25 23c3-8 9-13 17-15 0 8-4 14-12 18"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-800"
        />
        <path
          d="M31 20c-4-5-9-7-15-7 1 7 5 11 12 13"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-800"
        />
      </svg>
    </div>
  );
}

function TrustBadge({ icon, title, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-emerald-800">{icon}</div>
      <div>
        <div className="font-black text-zinc-950">{title}</div>
        <div className="text-zinc-600">{text}</div>
      </div>
    </div>
  );
}

function CartBox({ cart, totals, zone, removeFromCart }) {
  return (
    <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-stone-200">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black">Koszyk ({cart.length})</h2>
        <ShoppingCart className="text-emerald-800" />
      </div>

      <div className="mt-4 space-y-3">
        {cart.length === 0 && (
          <p className="rounded-2xl bg-stone-50 p-4 text-sm text-zinc-600">
            Dodaj produkt, żeby zobaczyć podsumowanie.
          </p>
        )}

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 rounded-2xl border border-stone-200 p-3"
          >
            <img
              className="h-16 w-16 rounded-xl object-cover"
              src={item.image}
              alt=""
            />

            <div className="flex-1">
              <div className="font-bold">{item.name}</div>
              <div className="text-sm text-zinc-500">
                {item.qty} {item.unit} · {currency(item.priceNet * item.qty)} netto
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className="text-zinc-400 hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2 border-t border-stone-200 pt-4 text-sm">
        <div className="flex justify-between">
          <span>Produkty netto</span>
          <b>{currency(totals.productsNet)}</b>
        </div>

        <div className="flex justify-between">
          <span>Transport netto</span>
          <b>{zone?.price === null ? "do wyceny" : currency(totals.deliveryNet)}</b>
        </div>

        <div className="flex justify-between text-lg text-emerald-800">
          <span className="font-black">Razem brutto</span>
          <b>
            {zone?.price === null
              ? "do potwierdzenia"
              : currency(totals.brutto)}
          </b>
        </div>
      </div>
    </section>
  );
}
