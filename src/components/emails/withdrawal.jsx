import * as React from 'react';

// email for withdrawal request
export const EmailTemplate = ({
  user,
  coins
}) => (
  <div className="flex flex-col items-start justify-center p-4">
    <h1>New Withdrawal Request</h1>
    <p>A user has requested to withdraw coins from their account.</p>
    <div className="flex flex-col items-start justify-center p-4">
      <h3 className="text-2xl font-bold">User Details</h3>
      <p>Username: {user.username}</p>
    </div>
    <div className="flex flex-col items-start justify-center p-4">
      <h3 className="text-2xl font-bold">Withdrawal Details</h3>
      <p>Coins: {coins}</p>
    </div>
  </div>
);