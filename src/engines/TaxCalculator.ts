export interface Transaction {
  id: string;
  timestamp: number;
  type: 'TRADE' | 'STAKE' | 'REWARD' | 'AIRDROP' | 'TRANSFER';
  fromAsset: string;
  toAsset: string;
  fromAmount: number;
  toAmount: number;
  usdValue: number;
  costBasis?: number;
}

export interface TaxSummary {
  shortTermGains: number;
  longTermGains: number;
  income: number;
  losses: number;
  washSales: number;
}

export class TaxCalculator {
  private readonly WASH_SALE_PERIOD = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

  calculateGainsLosses(
    transactions: Transaction[], 
    method: 'FIFO' | 'LIFO' | 'HIFO' = 'FIFO'
  ): TaxSummary {
    const sortedTransactions = this.sortTransactions(transactions, method);
    const washSales = this.detectWashSales(sortedTransactions);
    
    return {
      shortTermGains: this.calculateShortTermGains(sortedTransactions, washSales),
      longTermGains: this.calculateLongTermGains(sortedTransactions, washSales),
      income: this.calculateIncome(sortedTransactions),
      losses: this.calculateLosses(sortedTransactions, washSales),
      washSales: washSales.length
    };
  }

  private detectWashSales(transactions: Transaction[]): Transaction[] {
    const washSales: Transaction[] = [];
    
    for (let i = 0; i < transactions.length; i++) {
      const current = transactions[i];
      if (current.type !== 'TRADE') continue;

      for (let j = i + 1; j < transactions.length; j++) {
        const future = transactions[j];
        const timeDiff = future.timestamp - current.timestamp;
        
        if (timeDiff <= this.WASH_SALE_PERIOD && 
            future.fromAsset === current.toAsset) {
          washSales.push(current);
          break;
        }
      }
    }
    
    return washSales;
  }

  private calculateShortTermGains(
    transactions: Transaction[], 
    washSales: Transaction[]
  ): number {
    const oneYear = 365 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    
    return transactions
      .filter(tx => tx.type === 'TRADE')
      .filter(tx => !washSales.includes(tx))
      .filter(tx => now - tx.timestamp <= oneYear)
      .reduce((total, tx) => total + (tx.usdValue - (tx.costBasis || 0)), 0);
  }

  private calculateLongTermGains(
    transactions: Transaction[], 
    washSales: Transaction[]
  ): number {
    const oneYear = 365 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    
    return transactions
      .filter(tx => tx.type === 'TRADE')
      .filter(tx => !washSales.includes(tx))
      .filter(tx => now - tx.timestamp > oneYear)
      .reduce((total, tx) => total + (tx.usdValue - (tx.costBasis || 0)), 0);
  }

  private calculateIncome(transactions: Transaction[]): number {
    return transactions
      .filter(tx => ['REWARD', 'AIRDROP', 'STAKE'].includes(tx.type))
      .reduce((total, tx) => total + tx.usdValue, 0);
  }

  private calculateLosses(
    transactions: Transaction[], 
    washSales: Transaction[]
  ): number {
    return transactions
      .filter(tx => tx.type === 'TRADE')
      .filter(tx => !washSales.includes(tx))
      .filter(tx => tx.usdValue < (tx.costBasis || 0))
      .reduce((total, tx) => total + ((tx.costBasis || 0) - tx.usdValue), 0);
  }

  private sortTransactions(
    transactions: Transaction[], 
    method: 'FIFO' | 'LIFO' | 'HIFO'
  ): Transaction[] {
    const sorted = [...transactions].sort((a, b) => a.timestamp - b.timestamp);
    
    switch (method) {
      case 'FIFO': return sorted;
      case 'LIFO': return sorted.reverse();
      case 'HIFO': return this.sortByHighestCostBasis(sorted);
      default: return sorted;
    }
  }

  private sortByHighestCostBasis(transactions: Transaction[]): Transaction[] {
    return transactions.sort((a, b) => (b.costBasis || 0) - (a.costBasis || 0));
  }
}