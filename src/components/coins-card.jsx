'use client'

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WithdrawModal } from "@/components/withdraw-modal";
import { TopUpModal } from "@/components/top-up-modal";

export default function CoinsCard({
  username,
  email,
  balance
}) {

  const [status, setStatus] = useState(null);

  async function checkStripeSession(session_id) {
    const response = await fetch(`/api/checkout_sessions/${session_id}`);
    const data = await response.json();
    console.log(data);
    if (data.payment_status === 'paid') {
      setStatus('success');
    } else {
      setStatus('canceled');
    }
  }
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const session_id = queryParams.get('session_id');

      if (session_id) {
        checkStripeSession(session_id);
      }
    }
  }, []);

  return (
    <Card className="md:col-span-2">
      <CardHeader className="text-center">
        <h4 className="text-lg font-medium leading-none tracking-tight">Coins</h4>
      </CardHeader>
      <CardContent className="text-center flex flex-col items-center justify-center">
        <div className="space-y-4">
          <p className="text-2xl font-bold">{balance}</p>
        </div>
        <div className="flex space-x-2 mt-4">
          <WithdrawModal
            user={{
              username: username,
            }}
          />
          <TopUpModal email={email} />
          {
            status && (
              <Dialog open={status === 'success' || status === 'canceled'} onOpenChange={(open) => {
                // remove query param session_id from url
                  window.history.replaceState({}, document.title, window.location.pathname);
                setStatus(null)
              }}>
                <DialogContent className="sm:max-w-[400px]">
                  <DialogHeader>
                    <DialogTitle>
                      {status === 'success' ? 'Payment Successful' : 'Payment Canceled'}
                    </DialogTitle>
                    <DialogDescription>
                      {status === 'success' ? 'Your payment has been successful.' : 'Your payment has been canceled.'}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )
          }
        </div>
      </CardContent>
    </Card>
  );
}