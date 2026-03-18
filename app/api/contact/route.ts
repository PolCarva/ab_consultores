import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, telefono, email, servicio, mensaje } = body;

    // Validate required fields
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Por favor completa todos los campos obligatorios." },
        { status: 400 }
      );
    }

    // Map service values to display names
    const servicioNombre = {
      funcional: "Funcional",
      indicadores: "Indicadores",
      integral: "Servicio Integral (Premium)",
    }[servicio] || servicio || "No especificado";

    // Send email using Resend
    // Note: For development/testing with Resend free tier, emails can only be sent
    // to the verified account email. To send to other recipients, verify your domain
    // at resend.com/domains and change the from address.
    const data = await resend.emails.send({
      from: "A&B Consultores <onboarding@resend.dev>",
      to: "almadabadoconsultores@gmail.com", // Resend account email (verified for testing)
      subject: `Nueva consulta de ${nombre} - ${servicioNombre}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #4A7C59; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
              .content { background: #F2F0E9; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #2E4036; margin-bottom: 5px; }
              .value { color: #1A1A1A; padding: 10px; background: white; border-radius: 5px; }
              .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Nueva Consulta - A&B Consultores</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Nombre:</div>
                  <div class="value">${nombre}</div>
                </div>
                <div class="field">
                  <div class="label">Teléfono:</div>
                  <div class="value">${telefono || "No proporcionado"}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${email}</div>
                </div>
                <div class="field">
                  <div class="label">Servicio de interés:</div>
                  <div class="value">${servicioNombre}</div>
                </div>
                <div class="field">
                  <div class="label">Mensaje:</div>
                  <div class="value">${mensaje.replace(/\n/g, "<br>")}</div>
                </div>
              </div>
              <div class="footer">
                <p>Enviado desde el formulario de contacto de abconsultores.uy</p>
                <p>Fecha: ${new Date().toLocaleString("es-UY", { timeZone: "America/Montevideo" })}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "¡Mensaje enviado correctamente! Te contactaremos pronto.",
        data
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Hubo un error al enviar el mensaje. Por favor intenta nuevamente." },
      { status: 500 }
    );
  }
}