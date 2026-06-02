import { Resend } from 'resend';
//import { EmailTemplate } from '../../../components/email-template';
import { NextResponse } from 'next/server';
export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Nombres vinculados 1 a 1 con el formulario
    const { name, email, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['pedrorodact01@gmail.com'],
      subject: `Nuevo mensaje de ${name}`,
     // react: EmailTemplate({ 
       text: `
Nombre: ${name}
Email: ${email}
Mensaje: ${message}
  `,
    });

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Fallo en el servidor" }, { status: 500 });
  }
}
