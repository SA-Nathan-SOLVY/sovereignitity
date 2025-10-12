import { FinancialOverview } from '@/components/dashboard/financial-overview';
import { BudgetOverview } from '@/components/dashboard/budget-overview';
import { LoanRequestForm } from '@/components/loans/loan-request-form';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sovereign Banking Dashboard</h1>
        <p className="text-gray-600">
          Integrated VA Benefits + IBC Policy Loans + Business Revenue
        </p>
      </header>
      
      <div className="space-y-8">
        <FinancialOverview />
        <BudgetOverview />
        <LoanRequestForm />
      </div>
    </div>
  );
}