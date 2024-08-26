// post request to confirm the payment details of a stripe payment

import { NextResponse } from "next/server";


export async function POST(request, response) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const body = await request.text();
    // console.log(body);
    const sig = request.headers.get('stripe-signature');
    // const sig = request.headers['stripe-signature'];
    console.log(sig);

    let event;
  
    try {
      event = await stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_SIGNING_SECRET);
    } catch (err) {
      console.error(err);
      // response.status(400).send(`Webhook Error: ${err.message}`);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    console.log(event);
    // Handle the event 
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        
        // update the user's subscription status in your database
        // send a confirmation email to the user
        
        const coins = paymentIntentSucceeded.id

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ message: 'Payment successful' }, { status: 200 });
  };