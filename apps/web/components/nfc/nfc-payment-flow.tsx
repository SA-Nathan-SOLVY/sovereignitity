'use client';

import React, { useState } from 'react';
import { useNFC } from '../hooks/useNFC';
import { NFCMemberCard, NFCPaymentRequest } from '../types/nfc';

interface NFCPaymentFlowProps {
  myCard: NFCMemberCard;
  theirCard: NFCMemberCard;
}

export const NFCPaymentFlow: React.FC<NFCPaymentFlowProps> = ({
  myCard,
  theirCard
}) => {
  const { startPayment, processPayment, isProcessing } = useNFC();
  const [paymentRequest, setPaymentRequest] = useState<NFCPaymentRequest>({
    amount: 0,
    service: '',
    recipient: '',
    notes: '',
    timestamp: new Date()
  });

  const handleStartPayment = async () => {
    await startPayment(myCard, theirCard);
  };

  const handleProcessPayment = async () => {
    try {
      const success = await processPayment(paymentRequest);
      if (success) {
        console.log('Payment completed successfully!');
      }
    } catch (err) {
      console.error('Payment failed', err);
    }
  };

  return (
    <div className="nfc-payment-flow">
      <div className="card-display">
        <div className="my-card">
          <h3>{myCard.displayName}</h3>
          <p>SOLVY Card Member</p>
        </div>

        <div className="their-card">
          <h3>{theirCard.displayName}</h3>
          <p>SOLVY Card Member</p>
        </div>
      </div>

      <div className="payment-input">
        <input
          type="number"
          placeholder="Amount"
          value={paymentRequest.amount as unknown as string}
          onChange={(e) => setPaymentRequest({
            ...paymentRequest,
            amount: parseFloat(e.target.value) || 0
          })}
        />

        <input
          type="text"
          placeholder="Service"
          value={paymentRequest.service}
          onChange={(e) => setPaymentRequest({
            ...paymentRequest,
            service: e.target.value
          })}
        />

        <input
          type="text"
          placeholder="Recipient"
          value={paymentRequest.recipient}
          onChange={(e) => setPaymentRequest({
            ...paymentRequest,
            recipient: e.target.value
          })}
        />

        <textarea
          placeholder="Notes (speech to text or type)"
          value={paymentRequest.notes}
          onChange={(e) => setPaymentRequest({
            ...paymentRequest,
            notes: e.target.value
          })}
        />
      </div>

      <div className="nfc-actions">
        <button onClick={handleStartPayment} disabled={isProcessing}>
          Start NFC
        </button>

        <button onClick={handleProcessPayment} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Confirm Payment'}
        </button>
      </div>
    </div>
  );
};

export default NFCPaymentFlow;
