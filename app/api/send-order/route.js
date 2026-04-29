import { Resend } from "resend";
import SMSAPI from "smsapi";

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

    /*
     |--------------------------------------------------------------------------
     | EMAIL
     |--------------------------------------------------------------------------
     */

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

    /*
     |--------------------------------------------------------------------------
     | SMS API
     |--------------------------------------------------------------------------
     */

    try {
      const smsapi = new SMSAPI({
        accessToken: process.env.SMSAPI_TOKEN,
      });

      /*
       |--------------------------------------------------------------------------
       | SMS DO CIEBIE
       |--------------------------------------------------------------------------
       */

      await smsapi.sms.sendSms({
        to: process.env.OWNER_PHONE,
        from: process.env.SMSAPI_FROM,
        message: `NOWE ZAMÓWIENIE TOKITOKI

${name || "Klient"}
${phone}

${cart}

${totalGross}`,
      });

      /*
       |--------------------------------------------------------------------------
       | SMS DO KLIENTA
       |--------------------------------------------------------------------------
       */

      await smsapi.sms.sendSms({
        to: `48${phone.replace(/\D/g, "")}`,
        from: process.env.SMSAPI_FROM,
        message: `Dziękujemy za złożenie zamówienia w TOKITOKI. Skontaktujemy się wkrótce w celu potwierdzenia dostępności materiału i terminu dostawy.`,
      });
    } catch (smsError) {
      console.error("SMSAPI ERROR:", smsError);
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("SEND ORDER ERROR:", error);

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