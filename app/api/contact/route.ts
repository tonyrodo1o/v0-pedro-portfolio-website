import { Resend } from 'resend';
import { EmailTemplate } from '../../../components/email-template';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Extraemos las variables que envía el formulario (name, email, message)
    const { name, email, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['pedrorodact01@gmail.com'],
      subject: `Nuevo mensaje de ${name}`,
      react: EmailTemplate({ 
        firstName: name, // Mapeamos el 'name' del formulario al 'firstName' del template
        email: email, 
        message: message 
      }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
