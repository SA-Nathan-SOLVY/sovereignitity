"use client";

import React from 'react';
import NFCPaymentFlow from '../../components/nfc/nfc-payment-flow';
import { NFCMemberCard } from '../../types/nfc';

const myCard: NFCMemberCard = {
  id: 'me-001',
  displayName: 'Alice — SOLVY',
  cardType: 'personal',
  balance: 1250.5,
  avatar: ''
};

const theirCard: NFCMemberCard = {
  id: 'them-001',
  displayName: 'Bob — Coffee Shop',
  cardType: 'business',
  balance: 9800,
  avatar: ''
};

export default function NFCDemoPage() {
  return (
    <div style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1>NFC Payment Demo</h1>
      <p>Demo page for the SOLVY NFC payment flow.</p>
      <div style={{ maxWidth: 720 }}>
        <NFCPaymentFlow myCard={myCard} theirCard={theirCard} />
      </div>
    </div>
  );
}
