import { useState, useCallback } from 'react';
import { TaxCalculator } from '../../src/engines/TaxCalculator';

export const useTaxCalculations = () => {
  const [calculations, setCalculations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const taxCalculator = new TaxCalculator();

  const calculateTaxSummary = useCallback(async (transactions) => {
    setLoading(true);
    setError(null);

    try {
      const summary = taxCalculator.calculateGainsLosses(transactions, 'FIFO');
      setCalculations(summary);
      return summary;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const optimizeTaxStrategy = useCallback(async (transactions, goals) => {
    // Implementation for tax optimization suggestions
    const suggestions = [];

    // Tax loss harvesting opportunities
    const losses = transactions.filter(tx => 
      tx.type === 'TRADE' && 
      tx.usdValue < (tx.costBasis || 0) &&
      !tx.washSale
    );

    if (losses.length > 0) {
      suggestions.push({
        type: 'TAX_LOSS_HARVESTING',
        description: `Consider realizing ${losses.length} losses to offset gains`,
        potentialSavings: losses.reduce((sum, loss) => sum + Math.abs(loss.usdValue - (loss.costBasis || 0)), 0) * 0.37,
        urgency: 'HIGH'
      });
    }

    // Holding period optimization
    const shortTermGains = transactions.filter(tx =>
      tx.type === 'TRADE' &&
      (Date.now() - tx.timestamp) < (365 * 24 * 60 * 60 * 1000) &&
      tx.usdValue > (tx.costBasis || 0)
    );

    if (shortTermGains.length > 0) {
      suggestions.push({
        type: 'HOLDING_PERIOD',
        description: `Consider holding ${shortTermGains.length} assets for long-term treatment`,
        potentialSavings: shortTermGains.reduce((sum, gain) => sum + (gain.usdValue - (gain.costBasis || 0)), 0) * 0.17,
        urgency: 'MEDIUM'
      });
    }

    return suggestions;
  }, []);

  return {
    calculations,
    loading,
    error,
    calculateTaxSummary,
    optimizeTaxStrategy
  };
};