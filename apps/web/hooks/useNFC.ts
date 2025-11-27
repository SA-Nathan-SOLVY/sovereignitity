import { useState, useCallback } from 'react';
import { SOLVYNFCManager } from '../lib/nfc/solvy-nfc-manager';
import { NFCMemberCard, NFCPaymentRequest } from '../types/nfc';

export const useNFC = () => {
  const [nfcManager] = useState(() => new SOLVYNFCManager());
  const [isProcessing, setIsProcessing] = useState(false);

  const startPayment = useCallback(async (
    myCard: NFCMemberCard,
    theirCard: NFCMemberCard
  ) => {
    setIsProcessing(true);
    try {
      const session = await nfcManager.startPaymentSession(myCard, theirCard);
      return session;
    } finally {
      setIsProcessing(false);
    }
  }, [nfcManager]);

  const processPayment = useCallback(async (
    paymentRequest: NFCPaymentRequest
  ) => {
    setIsProcessing(true);
    try {
      const success = await nfcManager.processPayment(paymentRequest);
      return success;
    } finally {
      setIsProcessing(false);
    }
  }, [nfcManager]);

  return {
    startPayment,
    processPayment,
    isProcessing,
    endSession: nfcManager.endSession.bind(nfcManager)
  };
};
