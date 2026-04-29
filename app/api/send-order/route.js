import { Resend } from "resend";

function cleanPhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");

  if (digits.startsWith("48") && digits.length === 11) {
    return digits;
  }

  if (digits.length === 9) {
    return `48${digits}`;
  }

  return digits;
}

async function sendSms({ to, message }) {
  if (!process.env.SMSAPI_TOKEN) {
    console.error("BRAK SMSAPI_TOKEN");
    return;
  }

  const params = new URLSearchParams();
  params.append("to", cleanPhone(to));
  params.append("message", message);
  params.append("format", "json");

  if (process.env.SMSAPI_FROM) {
    params.append("from", process.env.SMSAPI_FROM);
  }

  const res = await fetch("https://api.smsapi.pl/sms.do", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SMSAPI_TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`SMSAPI ${res.status}: ${text}`);
  }

  console.log("SMSAPI OK:", text);
}

export async function POST(req) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("BRAK RESEND_API_KEY");
      return Response.json({ success: false }, { status: 500 });
    }

    if (!process.env.OWNER_EMAIL) {
      console.error("BRAK OWNER_EMAIL");
      return Response.json({ success: false }, { status: 500 });
    }

    const body = await req.json();

    const {
      name,
      phone,
      address,
      date,
      time,
      notes,
      zone,
      productsNet,
      deliveryNet,
      totalGross,
      cart,
    } = body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Tokitoki <onboarding@resend.dev>",
      to: process.env.OWNER_EMAIL,
      subject: "Nowe zamówienie — Tokitoki",
      html: `
        <h2>Nowe zamówienie</h2>

        <p><b>Klient:</b> ${name || "-"}</p>
        <p><b>Telefon:</b> ${phone}</p>
        <p><b>Adres:</b> ${address}</p>

        <hr />

        <p><b>Rejon:</b> ${zone}</p>
        <p><b>Termin:</b> ${date || "-"} ${time || ""}</p>

        <hr />

        <p><b>Produkty:</b></p>
        <p>${cart}</p>

        <hr />

        <p><b>Produkty netto:</b> ${productsNet} PLN</p>
        <p><b>Transport:</b> ${deliveryNet}</p>

        <h3>Razem brutto: ${totalGross}</h3>

        <hr />

        <p><b>Uwagi:</b></p>
        <p>${notes || "-"}</p>
      `,
    });

    try {
      if (process.env.OWNER_PHONE) {
        await sendSms({
          to: process.env.OWNER_PHONE,
          message: `NOWE ZAMOWIENIE TOKITOKI. Sprawdz maila. Tel klienta: ${phone}`,
        });
      }

      await sendSms({
        to: phone,
        message:
          "Dziekujemy za zlozenie zamowienia w TOKITOKI. Sprawdzimy dostepnosc materialu i mozliwosc dostawy, a nastepnie oddzwonimy z potwierdzeniem.",
      });
    } catch (smsError) {
      console.error("SMSAPI ERROR:", smsError);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("SEND ORDER ERROR:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}