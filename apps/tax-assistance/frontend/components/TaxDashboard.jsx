import React, { useState, useEffect } from 'react';
import { useTaxCalculations } from '../hooks/useTaxCalculations';
import { useMemberData } from '../hooks/useMemberData';

export const TaxDashboard = () => {
  const [memberData, setMemberData] = useState(null);
  const [taxSummary, setTaxSummary] = useState(null);
  const { calculateTaxSummary } = useTaxCalculations();
  const { fetchMemberData } = useMemberData();

  useEffect(() => {
    loadMemberData();
  }, []);

  const loadMemberData = async () => {
    const data = await fetchMemberData();
    setMemberData(data);
    
    const summary = await calculateTaxSummary(data.transactions);
    setTaxSummary(summary);
  };

  if (!taxSummary) {
    return <div className="loading">Loading tax dashboard...</div>;
  }

  return (
    <div className="tax-dashboard">
      <header className="dashboard-header">
        <h1>Cooperative Tax Dashboard</h1>
        <p>Your sovereign tax assistance portal</p>
      </header>

      <div className="tax-overview-grid">
        <div className="tax-card income">
          <h3>Total Income</h3>
          <div className="amount">${taxSummary.income.toLocaleString()}</div>
          <small>Staking rewards, airdrops, etc.</small>
        </div>

        <div className="tax-card gains">
          <h3>Short-Term Gains</h3>
          <div className="amount">${taxSummary.shortTermGains.toLocaleString()}</div>
          <small>Assets held under 1 year</small>
        </div>

        <div className="tax-card losses">
          <h3>Capital Losses</h3>
          <div className="amount">${taxSummary.losses.toLocaleString()}</div>
          <small>Available for deduction</small>
        </div>

        <div className="tax-card wash-sales">
          <h3>Wash Sales</h3>
          <div className="amount">{taxSummary.washSales}</div>
          <small>Disallowed losses</small>
        </div>
      </div>

      <div className="tax-actions">
        <button className="btn-primary">Generate Tax Forms</button>
        <button className="btn-secondary">Optimize Tax Strategy</button>
        <button className="btn-outline">Request Professional Review</button>
      </div>

      <div className="tax-timeline">
        <h3>Filing Timeline</h3>
        <div className="timeline">
          <div className="timeline-item completed">
            <span>Data Imported</span>
            <small>{memberData?.transactions.length} transactions</small>
          </div>
          <div className="timeline-item active">
            <span>Calculations Complete</span>
            <small>Ready for review</small>
          </div>
          <div className="timeline-item">
            <span>Forms Generated</span>
            <small>Pending</small>
          </div>
          <div className="timeline-item">
            <span>Ready to File</span>
            <small>Estimated: April 15</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxDashboard;