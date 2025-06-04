// src/store/energyBillingStore.ts

import { create } from "zustand";
import { EnergyBillingItem } from "../types/energyBilling";

interface EnergyBillingState {
  billings: EnergyBillingItem[];
  loading: boolean;
  error: string | null;
  fetchBillings: () => void;
  fetchBillingById: (id: number) => EnergyBillingItem | undefined;
  createBilling: (data: EnergyBillingItem) => void;
  updateBilling: (id: number, data: Partial<EnergyBillingItem>) => void;
  deleteBilling: (id: number) => void;
}

const mockData: EnergyBillingItem[] = [
  {
    id: 1,
    year: 2025,
    month: "Junho",
    generatorIssueDate: "2025-06-05",
    generatorConsumed: 60000,
    generatorCost: 30000,
    generatorInvoiceFileUrl: "/mock/geradora_junho_2025.pdf",
    distributorIssueDate: "2025-06-06",
    distributorConsumed: 40000,
    distributorCost: 22500,
    distributorInvoiceFileUrl: "/mock/distribuidora_junho_2025.pdf",
    unitsProduced: 500,
    totalConsumed: 100000,
    totalCost: 52500,
    costPerUnit: 105,
    totalCarbonFootprint: 9000,
    carbonPerUnit: 18,
    createdAt: "2025-06-07T10:00:00Z",
    updatedAt: "2025-06-07T10:00:00Z",
  },
  {
    id: 2,
    year: 2025,
    month: "Maio",
    generatorIssueDate: "2025-05-05",
    generatorConsumed: 55000,
    generatorCost: 28000,
    generatorInvoiceFileUrl: "/mock/geradora_maio_2025.pdf",
    distributorIssueDate: "2025-05-06",
    distributorConsumed: 38000,
    distributorCost: 20800,
    distributorInvoiceFileUrl: "/mock/distribuidora_maio_2025.pdf",
    unitsProduced: 530,
    totalConsumed: 93000,
    totalCost: 48800,
    costPerUnit: 92,
    totalCarbonFootprint: 8370,
    carbonPerUnit: 15.79,
    createdAt: "2025-05-07T10:00:00Z",
    updatedAt: "2025-05-07T10:00:00Z",
  },
  {
    id: 3,
    year: 2024,
    month: "Dezembro",
    generatorIssueDate: "2024-12-05",
    generatorConsumed: 400000,
    generatorCost: 95000,
    generatorInvoiceFileUrl: "/mock/geradora_dez_2024.pdf",
    distributorIssueDate: "2024-12-06",
    distributorConsumed: 222376,
    distributorCost: 51294.46,
    distributorInvoiceFileUrl: "/mock/distribuidora_dez_2024.pdf",
    unitsProduced: 1500,
    totalConsumed: 622376,
    totalCost: 146294.46,
    costPerUnit: 97.53,
    totalCarbonFootprint: 56013.84,
    carbonPerUnit: 37.34,
    createdAt: "2024-12-07T10:00:00Z",
    updatedAt: "2024-12-07T10:00:00Z",
  },
];

export const useEnergyBillingStore = create<EnergyBillingState>((set, get) => ({
  billings: [],
  loading: false,
  error: null,

  fetchBillings: () => {
    set({ loading: true });
    set({ billings: mockData, loading: false, error: null });
  },

  fetchBillingById: (id: number) => {
    const item = get().billings.find((b) => b.id === id);
    return item;
  },

  createBilling: (data: EnergyBillingItem) => {
    set({ loading: true });
    const all = get().billings;
    const newItem: EnergyBillingItem = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set({ billings: [newItem, ...all], loading: false });
  },

  updateBilling: (id: number, data: Partial<EnergyBillingItem>) => {
    set({ loading: true });
    const updatedList = get().billings.map((b) =>
      b.id === id ? { ...b, ...data, updatedAt: new Date().toISOString() } : b
    );
    set({ billings: updatedList, loading: false });
  },

  deleteBilling: (id: number) => {
    set({ loading: true });
    const filtered = get().billings.filter((b) => b.id !== id);
    set({ billings: filtered, loading: false });
  },
}));
