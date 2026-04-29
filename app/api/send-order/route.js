import { Resend } from "resend";

export async function POST(req) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("BRAK RESEND_API_KEY");
      return Response.json({ success: false, error: "missing_api_key" }, { status: 500 });
    }

    if (!process.env.OWNER_EMAIL) {
      console.error("BRAK OWNER_EMAIL");
      return Response.json({ success: false, error: "missing_owner_email" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();

    console.log("Zamówienie:", body);

    const result = await resend.emails.send({
      from: "Tokitoki <onboarding@resend.dev>",
      to: process.env.OWNER_EMAIL,
      subject: "Nowe zamówienie — Tokitoki",
      html: `
        <h2>Nowe zamówienie</h2>
        <p><b>Klient:</b> ${body.name || "-"}</p>
        <p><b>Telefon:</b> ${body.phone}</p>
        <p><b>Adres:</b> ${body.address}</p>
        <p><b>Rejon:</b> ${body.zone}</p>
        <p><b>Termin:</b> ${body.date || "-"} ${body.time || ""}</p>
        <hr />
        <p><b>Produkty:</b></p>
        <p>${body.cart}</p>
        <hr />
        <p><b>Produkty netto:</b> ${body.productsNet}</p>
        <p><b>Transport:</b> ${body.deliveryNet}</p>
        <h3>Razem brutto: ${body.totalGross}</h3>
        <hr />
        <p><b>Uwagi:</b></p>
        <p>${body.notes || "-"}</p>
      `,
    });

    console.log("Resend result:", result);

    return Response.json({ success: true });
  } catch (error) {
    console.error("SEND ORDER ERROR:", error);
    return Response.json(
      { success: false, error: error?.message || "unknown_error" },
      { status: 500 }
    );
  }
}