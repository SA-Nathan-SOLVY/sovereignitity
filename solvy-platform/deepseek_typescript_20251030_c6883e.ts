// types.ts
export interface ISO20022Message {
  messageId: string;
  messageType: 'pacs.008' | 'pacs.009' | 'pain.001' | 'pain.002';
  creationDateTime: string;
  transactionCount?: number;
  transactions: PaymentTransaction[];
}

export interface PaymentTransaction {
  transactionId: string;
  instructionId?: string;
  endToEndId?: string;
  debtor: Party;
  debtorAgent: FinancialInstitution;
  creditor: Party;
  creditorAgent: FinancialInstitution;
  amount: Amount;
  purposeCode?: string;
  remittanceInfo?: string;
  requestedExecutionDate?: string;
}

export interface Party {
  name: string;
  account?: string;
  address?: string;
  country?: string;
}

export interface FinancialInstitution {
  bic: string;
  name?: string;
  country?: string;
  blockchainAddress?: string; // Mapped address
}

export interface Amount {
  value: number;
  currency: string;
  equivalentAmount?: number;
  equivalentCurrency?: string;
}

export interface BlockchainTransaction {
  from: string;
  to: string;
  value: string; // in wei/smallest units
  data: string;
  chainId: number;
  gasLimit?: number;
  nonce?: number;
}

export interface ParserConfig {
  defaultChainId: number;
  gasLimit: number;
  bicToAddressMapping: Map<string, string>;
  supportedCurrencies: string[];
}