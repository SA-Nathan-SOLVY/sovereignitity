export interface Form8949 {
  partI: ShortTermTransaction[]; // Short-term transactions
  partII: LongTermTransaction[]; // Long-term transactions
  summary: Form8949Summary;
}

export interface ScheduleD {
  shortTerm: ScheduleDLine;
  longTerm: ScheduleDLine;
  summary: ScheduleDSummary;
}

export class FormGenerator {
  generateForm8949(transactions: any[]): Form8949 {
    const oneYear = 365 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    const shortTerm = transactions
      .filter(tx => tx.type === 'TRADE')
      .filter(tx => now - tx.timestamp <= oneYear)
      .map(tx => this.format8949Transaction(tx, 'SHORT'));

    const longTerm = transactions
      .filter(tx => tx.type === 'TRADE')
      .filter(tx => now - tx.timestamp > oneYear)
      .map(tx => this.format8949Transaction(tx, 'LONG'));

    return {
      partI: shortTerm,
      partII: longTerm,
      summary: this.calculate8949Summary(shortTerm, longTerm)
    };
  }

  generateScheduleD(capitalGains: any): ScheduleD {
    return {
      shortTerm: {
        salesPrice: capitalGains.shortTermGains,
        costBasis: capitalGains.shortTermCostBasis,
        gainLoss: capitalGains.shortTermGains - capitalGains.shortTermCostBasis
      },
      longTerm: {
        salesPrice: capitalGains.longTermGains,
        costBasis: capitalGains.longTermCostBasis,
        gainLoss: capitalGains.longTermGains - capitalGains.longTermCostBasis
      },
      summary: {
        netGainLoss: (capitalGains.shortTermGains + capitalGains.longTermGains) - 
                    (capitalGains.shortTermCostBasis + capitalGains.longTermCostBasis)
      }
    };
  }

  private format8949Transaction(tx: any, term: 'SHORT' | 'LONG'): any {
    return {
      description: `${tx.fromAmount} ${tx.fromAsset} → ${tx.toAmount} ${tx.toAsset}`,
      dateAcquired: new Date(tx.timestamp).toLocaleDateString('en-US'),
      dateSold: new Date().toLocaleDateString('en-US'),
      salesPrice: tx.usdValue,
      costBasis: tx.costBasis || 0,
      gainLoss: tx.usdValue - (tx.costBasis || 0)
    };
  }

  private calculate8949Summary(shortTerm: any[], longTerm: any[]): any {
    return {
      shortTermProceeds: shortTerm.reduce((sum, tx) => sum + tx.salesPrice, 0),
      shortTermCostBasis: shortTerm.reduce((sum, tx) => sum + tx.costBasis, 0),
      longTermProceeds: longTerm.reduce((sum, tx) => sum + tx.salesPrice, 0),
      longTermCostBasis: longTerm.reduce((sum, tx) => sum + tx.costBasis, 0)
    };
  }

  generatePDF(form: Form8949 | ScheduleD): Buffer {
    // Implementation for PDF generation
    // Could use libraries like pdfkit or puppeteer
    return Buffer.from('PDF content would be generated here');
  }
}