'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function PaymentConfirmation() {
  const [status, setStatus] = useState(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const success = queryParams.get('success');
      const canceled = queryParams.get('canceled');
      if (success) {
        setStatus('success');
      } else if (canceled) {
        setStatus('canceled');
      } else {
        setStatus('failed');
      }
    }
  }, []);

  if (status === 'success') {
    return (
      <div className="min-h-[80vh]] space-y-6 flex flex-col items-center justify-center p-4">
        <img src="/coins_1.png" alt="Coins" className="mb-4" width="300px" />
        <h1 className="text-2xl font-bold">Payment Successful</h1>
        <p>Your payment has been successful.</p>
        <a href="/">
          <Button variant="default" size="sm">
            Return Home
          </Button>
        </a>
      </div>
    );
  } else if (status === 'canceled') {
    return (
      <div className="min-h-[80vh]] space-y-6 flex flex-col items-center justify-center p-4">
        <img src="/coins_1.png" alt="Coins" className="mb-4" width="300px" />
        <h1 className="text-2xl font-bold">Payment Canceled</h1>
        <p>Your payment has been canceled.</p>
        <a href="/">
          <Button variant="default" size="sm">
            Return Home
          </Button>
        </a> 
      </div>
    );
  } else {
    return (
      <div className="min-h-[80vh]] space-y-6 flex flex-col items-center justify-center p-4">
        <img src="/coins_1.png" alt="Coins" className="mb-4" width="300px" />
        <h1 className="text-2xl font-bold">Payment Failed</h1>
        <p>Your payment has failed.</p>
        <a href="/">
          <Button variant="default" size="sm">
            Return Home
          </Button>
        </a> 
      </div>
    );  
  }
}