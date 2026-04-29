import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
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

    await resend.emails.send({
      from: "Tokitoki <zamowienia@tokitoki.pl>",
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
        <p><b>Transport:</b> ${
          typeof deliveryNet === "string"
            ? deliveryNet
            : `${deliveryNet} PLN`
        }</p>

        <h3>Razem brutto: ${
          typeof totalGross === "string"
            ? totalGross
            : `${totalGross} PLN`
        }</h3>

        <hr />

        <p><b>Uwagi klienta:</b></p>
        <p>${notes || "-"}</p>
      `,
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}