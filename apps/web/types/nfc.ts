export interface NFCMemberCard {
  id: string;
  displayName: string;  // User's choice: name, business, or logo text
  cardType: 'personal' | 'business';
  avatar?: string;      // Logo or profile image
  balance: number;
}

export interface NFCPaymentRequest {
  amount: number;
  service: string;
  recipient: string;
  notes: string;
  timestamp: Date;
}

export interface NFCPaymentSession {
  sessionId: string;
  memberA: NFCMemberCard;
  memberB: NFCMemberCard;
  status: 'connecting' | 'negotiating' | 'processing' | 'success' | 'failed';
  paymentRequest?: NFCPaymentRequest;
}
