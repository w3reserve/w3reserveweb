import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { company, contactName, email, message } = body;

    if (!company || !contactName || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const lead = await prisma.contactB2B.create({
      data: {
        company,
        contactName,
        email,
        message,
      },
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('B2B Lead Error:', error);
    return NextResponse.json({ success: false, error: 'Error submitting lead' }, { status: 500 });
  }
}
