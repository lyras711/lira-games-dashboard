import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {

    // you can implement some basic check here like, is user valid or not
    const data = await request.json();
    const price_id = data.price_id;
    const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: data.email,
        line_items: [
          {
            price: price_id,
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_BASE_URL}/?canceled=true`
      });
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server', { status: 500 });
  }
}