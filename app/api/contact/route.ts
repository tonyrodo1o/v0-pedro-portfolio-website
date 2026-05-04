import { Resend } from 'resend';
import { EmailTemplate } from '../../../components/email-template'; 
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Adaptamos los nombres para que coincidan con el formulario
    const { name, email, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['pedrorodact01@gmail.com'],
      subject: `Nuevo mensaje de: ${name}`,
      react: EmailTemplate({ 
        firstName: name, // Mapeamos 'name' a 'firstName' para el template
        email: email, 
        message: message 
      }),
    });

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
