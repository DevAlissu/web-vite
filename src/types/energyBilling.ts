export interface EnergyBillingItem {
  id: number;
  year: number;
  month: string;
  generatorIssueDate: string;
  generatorConsumed: number;
  generatorCost: number;
  generatorInvoiceFileUrl?: string;
  distributorIssueDate: string;
  distributorConsumed: number;
  distributorCost: number;
  distributorInvoiceFileUrl?: string;
  unitsProduced: number;
  totalConsumed?: number;
  totalCost?: number;
  costPerUnit?: number;
  totalCarbonFootprint?: number;
  carbonPerUnit?: number;
  createdAt?: string;
  updatedAt?: string;
}
