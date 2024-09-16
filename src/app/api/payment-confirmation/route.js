// post request to confirm the payment details of a stripe payment

import { NextResponse } from "next/server";
import { getUserByEmail, updateUserBalance, updateUserSubscriptionPlan } from "@/actions/users";

const coins_amounts = {
  '599': 300,
  '1199': 650,
  '2399': 1350,
  '4799': 2800,
  '11999': 7750
}

const subscription_plans = {
  '0': 0,
  '499': 1,
  '1499': 2,
}

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
    // Handle the event 
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        
        // update the user's subscription status in your database
        // send a confirmation email to the user
        
        const coins = paymentIntentSucceeded.id

        break;
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object;
        console.log(checkoutSessionCompleted);
        const customer_email = checkoutSessionCompleted.customer_details.email;
        const amount = checkoutSessionCompleted.amount_total
        let user_id = null;
        try {
          user_id = await getUserByEmail(customer_email);
        } catch (error) {
          console.log("User not found");
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
        if (checkoutSessionCompleted.mode === 'payment') {
          if (checkoutSessionCompleted.payment_status === 'paid') {
            const coins = coins_amounts[amount.toString()];
            console.log(coins);
            // update the user's balance
            await updateUserBalance(user_id, coins);

          }
        } else if (checkoutSessionCompleted.mode === 'subscription') {
          if (checkoutSessionCompleted.subscription) {
            // update the user's subscription plan
            console.log("Updating subscription plan");
            await updateUserSubscriptionPlan(user_id, checkoutSessionCompleted.subscription, subscription_plans[amount.toString()]);
          }
        }
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ message: 'Payment successful' }, { status: 200 });
  };