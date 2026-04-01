import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    const lineItems = items.map((item: any) => {
      // Prepare image URL if valid, otherwise empty array
      const origin = req.headers.get('origin') || 'https://w3r-web.vercel.app';
      const images = item.image ? [new URL(item.image, origin).toString()] : [];

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            images,
            description: item.brand,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const origin = req.headers.get('origin') || 'https://w3r-web.vercel.app';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
