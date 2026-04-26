import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, phone, address, cart } = body;

    await resend.emails.send({
      from: "Tokitoki <onboarding@resend.dev>",
      to: "TWÓJ_EMAIL@gmail.com", // ← zmień na swój
      subject: "Nowe zamówienie - Tokitoki",
      html: `
        <h2>Nowe zamówienie</h2>
        <p><b>Imię:</b> ${name}</p>
        <p><b>Telefon:</b> ${phone}</p>
        <p><b>Adres:</b> ${address}</p>
        <p><b>Koszyk:</b> ${cart}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false });
  }
}