import { create } from "zustand";
import { MonitoringItem } from "@/types/monitoringTypes";
import api from "@/services/api";

interface MonitoringState {
  monitorings: MonitoringItem[];
  loading: boolean;
  fetchMonitorings: () => Promise<void>;
  createMonitoring: (data: Partial<MonitoringItem>) => Promise<void>;
  updateMonitoring: (id: number, data: Partial<MonitoringItem>) => Promise<void>;
  deleteMonitoring: (id: number) => Promise<void>;
}

export const useMonitoringStore = create<MonitoringState>((set) => ({
  monitorings: [],
  loading: false,

  fetchMonitorings: async () => {
    set({ loading: true });
    try {
      const response = await api.get<MonitoringItem[]>("/monitorings/");
      set({ monitorings: response.data });
    } catch (error) {
      console.error("Erro ao buscar monitoramentos:", error);
    } finally {
      set({ loading: false });
    }
  },

  createMonitoring: async (data) => {
    try {
      const response = await api.post("/monitorings/", data);
      set((state) => ({
        monitorings: [...state.monitorings, response.data],
      }));
    } catch (error) {
      console.error("Erro ao criar monitoramento:", error);
    }
  },

  updateMonitoring: async (id, data) => {
    try {
      await api.put(`/monitorings/${id}/`, data);
      set((state) => ({
        monitorings: state.monitorings.map((m) =>
          m.id === id ? { ...m, ...data } : m
        ),
      }));
    } catch (error) {
      console.error("Erro ao atualizar monitoramento:", error);
    }
  },

  deleteMonitoring: async (id) => {
    try {
      await api.delete(`/monitorings/${id}/`);
      set((state) => ({
        monitorings: state.monitorings.filter((m) => m.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao excluir monitoramento:", error);
    }
  },
}));
