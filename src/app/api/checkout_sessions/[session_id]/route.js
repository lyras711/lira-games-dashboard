
import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(request, context) {
  const { session_id } = context.params;

  const session = await stripe.checkout.sessions.retrieve(session_id);
  
  if (!session) {
    return new NextResponse('Not Found', { status: 404 });
  }
  
  return new NextResponse(JSON.stringify(session), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}