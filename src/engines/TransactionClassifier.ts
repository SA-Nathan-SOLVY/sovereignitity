export class TransactionClassifier {
  private classificationRules = [
    { pattern: /swap|trade|exchange/i, type: 'TRADE' as const },
    { pattern: /stake|farm|yield/i, type: 'STAKE' as const },
    { pattern: /reward|interest/i, type: 'REWARD' as const },
    { pattern: /airdrop|distribution/i, type: 'AIRDROP' as const },
    { pattern: /transfer|send|receive/i, type: 'TRANSFER' as const },
    { pattern: /mint|create/i, type: 'ASSET_CREATION' as const },
    { pattern: /burn|destroy/i, type: 'ASSET_DESTRUCTION' as const },
    { pattern: /lend|borrow/i, type: 'LOAN' as const }
  ];

  classifyTransaction(description: string, amount: number, counterparty: string): string {
    for (const rule of this.classificationRules) {
      if (rule.pattern.test(description)) {
        return rule.type;
      }
    }
    
    // Default classification based on amount and counterparty
    if (amount === 0) return 'TRANSFER';
    if (this.isExchange(counterparty)) return 'TRADE';
    
    return 'TRANSFER';
  }

  private isExchange(counterparty: string): boolean {
    const exchanges = [
      'binance', 'coinbase', 'kraken', 'gemini', 
      'uniswap', 'sushiswap', 'pancakeswap'
    ];
    return exchanges.some(exchange => 
      counterparty.toLowerCase().includes(exchange)
    );
  }

  detectAnomalies(transactions: any[]): string[] {
    const anomalies: string[] = [];
    
    // Check for wash sale patterns
    if (this.hasWashSalePattern(transactions)) {
      anomalies.push('POTENTIAL_WASH_SALE_DETECTED');
    }
    
    // Check for round-tripping
    if (this.hasRoundTripping(transactions)) {
      anomalies.push('POTENTIAL_ROUND_TRIPPING_DETECTED');
    }
    
    // Check for tax loss harvesting opportunities
    if (this.hasTaxLossOpportunity(transactions)) {
      anomalies.push('TAX_LOSS_HARVESTING_OPPORTUNITY');
    }
    
    return anomalies;
  }

  private hasWashSalePattern(transactions: any[]): boolean {
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    
    for (let i = 0; i < transactions.length; i++) {
      for (let j = i + 1; j < transactions.length; j++) {
        const timeDiff = Math.abs(transactions[i].timestamp - transactions[j].timestamp);
        if (timeDiff <= thirtyDays && 
            transactions[i].asset === transactions[j].asset) {
          return true;
        }
      }
    }
    
    return false;
  }

  private hasRoundTripping(transactions: any[]): boolean {
    // Implement round-tripping detection logic
    return transactions.some(tx => 
      tx.amount > 10000 && // Large amount
      tx.type === 'TRADE' &&
      this.getTimeSinceLastTrade(tx) < (24 * 60 * 60 * 1000) // Within 24 hours
    );
  }

  private hasTaxLossOpportunity(transactions: any[]): boolean {
    const currentYear = new Date().getFullYear();
    const yearTransactions = transactions.filter(tx => 
      new Date(tx.timestamp).getFullYear() === currentYear
    );
    
    const totalLosses = yearTransactions
      .filter(tx => tx.type === 'TRADE' && tx.gainLoss < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.gainLoss), 0);
    
    return totalLosses > 3000; // Opportunity if losses > $3,000
  }

  private getTimeSinceLastTrade(transaction: any): number {
    // Implementation for getting time since last trade
    return 0;
  }
}