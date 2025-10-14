import { FinancialOverview } from '@/components/dashboard/financial-overview';
import { BudgetOverview } from '@/components/dashboard/budget-overview';
import { LoanRequestForm } from '@/components/loans/loan-request-form';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SOVEREIGNITITY™</h1>
        <p className="text-gray-600 text-lg">Sovereign Banking Platform</p>
        <p className="text-gray-500 text-sm mt-2">VA Benefits + IBC Policy Loans + Business Integration</p>
      </header>
      
      <div className="max-w-6xl mx-auto space-y-8">
        <FinancialOverview />
        <BudgetOverview />
        <LoanRequestForm />
      </div>
    </div>
  );
}