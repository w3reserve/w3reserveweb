import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, date, guests, message } = body;

    if (!name || !email || !date || guests === undefined) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const reservation = await prisma.experienceReservation.create({
      data: {
        name,
        email,
        date,
        guests: parseInt(guests),
        message: message || '',
      },
    });

    return NextResponse.json({ success: true, reservation }, { status: 201 });
  } catch (error) {
    console.error('Experience Reservation Error:', error);
    return NextResponse.json({ success: false, error: 'Error submitting reservation' }, { status: 500 });
  }
}
