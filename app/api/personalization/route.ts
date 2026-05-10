import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, details } = body;

    if (!name || !email || !details) {
      return NextResponse.json({ success: false, error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const request = await prisma.personalizationRequest.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        details,
      },
    });

    return NextResponse.json({ success: true, request }, { status: 201 });
  } catch (error) {
    console.error('Personalization Request Error:', error);
    return NextResponse.json({ success: false, error: 'Error al enviar la solicitud' }, { status: 500 });
  }
}
