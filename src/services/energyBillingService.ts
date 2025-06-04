// src/services/energyBillingService.ts

import { EnergyBillingItem } from "../types/energyBilling";
import { useEnergyBillingStore } from "../store/energyBillingStore";

export async function getAllBillings(): Promise<EnergyBillingItem[]> {
  const store = useEnergyBillingStore.getState();
  store.fetchBillings();
  return store.billings;
}

export async function getBillingById(
  id: number
): Promise<EnergyBillingItem | undefined> {
  const store = useEnergyBillingStore.getState();
  return store.fetchBillingById(id);
}

export async function createBilling(
  data: EnergyBillingItem
): Promise<EnergyBillingItem> {
  const store = useEnergyBillingStore.getState();
  store.createBilling(data);
  const [newItem] = store.billings;
  return newItem;
}

export async function updateBilling(
  id: number,
  data: Partial<EnergyBillingItem>
): Promise<EnergyBillingItem | undefined> {
  const store = useEnergyBillingStore.getState();
  store.updateBilling(id, data);
  return store.fetchBillingById(id);
}

export async function deleteBilling(id: number): Promise<void> {
  const store = useEnergyBillingStore.getState();
  store.deleteBilling(id);
}
