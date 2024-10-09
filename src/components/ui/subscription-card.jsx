'use client'
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";


export function SubscriptionCard({ email, title, children, price_id, price, isSelected }) {
  const handleSubmit = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    if (!stripe) {
      return;
    }

    try {
      const response = await fetch("/api/checkout_sessions/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price_id, email }),
      });

      const data = await response.json();
      console.log(data);
      if (!data.ok) {
        throw new Error("Failed to create checkout session");
      }

      const result = await stripe.redirectToCheckout({
        sessionId: data.result.id,
      });

      
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Card className="w-full flex flex-col text-center">
      <CardHeader className="text-center  border-b border-gray-300 flex flex-col items-center justify-center gap-2">
        <h4 className="text-lg font-medium leading-none tracking-tight">{title}</h4>
        <span className="text-sm font-medium">{`${price}€`} <span className="text-xs font-normal">/mo</span></span>
      </CardHeader>
      <CardContent className="h-full p-6">
        <div className="flex flex-col space-y-4">
          {children}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center text-center border-t border-gray-300 pt-4">
        <Button disabled={isSelected} variant={isSelected ? 'outline' : 'default'} size="sm" onClick={handleSubmit}>{isSelected ? 'Selected' : 'Select'}</Button>
      </CardFooter>
    </Card>
  )
}