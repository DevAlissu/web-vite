// src/store/monitoringSensorStore.ts
import { create } from "zustand";
import {
  fetchMonitoringsSensor,
  createMonitoringSensor,
  updateMonitoringSensor,
  deleteMonitoringSensor,
  fetchSectionsForSensor,
  createSectionForSensor,
  getSectionByIdForSensor,
  updateSectionForSensor,
  deleteSectionForSensor,
} from "@/services/monitoringSensorService";
import type { MonitoringItem } from "@/types/monitoringTypes";

export interface SectionSimple {
  id: number;
  description: string;
  is_monitored: boolean;
  monitoring: number | null;
}

interface MonitoringSensorState {
  monitorings: MonitoringItem[];
  sections: SectionSimple[];
  loadingMonitorings: boolean;
  loadingSections: boolean;

  fetchAllMonitorings: () => Promise<void>;
  fetchSectionsForMonitoring: (monitoringId: number) => Promise<void>;
  createMonitoring: (
    data: Omit<MonitoringItem, "id" | "created_at" | "type_mmonitoring">
  ) => Promise<void>;
  updateMonitoring: (
    id: number,
    data: Partial<
      Omit<MonitoringItem, "id" | "created_at" | "type_mmonitoring">
    >
  ) => Promise<void>;
  deleteMonitoring: (id: number) => Promise<void>;

  createSectionForMonitoring: (
    monitoringId: number,
    data: Partial<SectionSimple>
  ) => Promise<void>;
  fetchSingleSection: (sectionId: number) => Promise<SectionSimple>;
  updateSectionForMonitoring: (
    id: number,
    data: Partial<SectionSimple>
  ) => Promise<void>;
  deleteSectionById: (id: number) => Promise<void>;
}

export const useMonitoringSensorStore = create<MonitoringSensorState>(
  (set, get) => ({
    monitorings: [],
    sections: [],
    loadingMonitorings: false,
    loadingSections: false,

    // 1) Busca todos monitoramentos “Nansenson”
    fetchAllMonitorings: async () => {
      set({ loadingMonitorings: true });
      try {
        const list = await fetchMonitoringsSensor();
        set({ monitorings: list });
      } catch (err) {
        console.error("Erro ao buscar monitoramentos Nansenson:", err);
      } finally {
        set({ loadingMonitorings: false });
      }
    },

    // 2) Busca seções vinculadas a um monitoringId específico
    fetchSectionsForMonitoring: async (monitoringId) => {
      set({ loadingSections: true });
      try {
        const list = await fetchSectionsForSensor(monitoringId);
        // Simplifica para a interface SectionSimple
        const simplified = list.map((sec: any) => ({
          id: sec.id,
          description: sec.description,
          is_monitored: sec.is_monitored,
          monitoring: sec.monitoring,
        }));
        set({ sections: simplified });
      } catch (err) {
        console.error("Erro ao buscar seções para Nansenson:", err);
      } finally {
        set({ loadingSections: false });
      }
    },

    // 3) Cria monitoramento “Nansenson”
    createMonitoring: async (data) => {
      set({ loadingMonitorings: true });
      try {
        const created = await createMonitoringSensor(data);
        set((state) => ({ monitorings: [...state.monitorings, created] }));
      } catch (err) {
        console.error("Erro ao criar monitoramento Nansenson:", err);
      } finally {
        set({ loadingMonitorings: false });
      }
    },

    // 4) Atualiza monitoramento existente
    updateMonitoring: async (id, data) => {
      set({ loadingMonitorings: true });
      try {
        const updated = await updateMonitoringSensor(id, data);
        set((state) => ({
          monitorings: state.monitorings.map((m) =>
            m.id === id ? updated : m
          ),
        }));
      } catch (err) {
        console.error("Erro ao atualizar monitoramento Nansenson:", err);
      } finally {
        set({ loadingMonitorings: false });
      }
    },

    // 5) Deleta um monitoramento
    deleteMonitoring: async (id) => {
      set({ loadingMonitorings: true });
      try {
        await deleteMonitoringSensor(id);
        set((state) => ({
          monitorings: state.monitorings.filter((m) => m.id !== id),
        }));
      } catch (err) {
        console.error("Erro ao deletar monitoramento Nansenson:", err);
      } finally {
        set({ loadingMonitorings: false });
      }
    },

    // 6) Cria seção para o monitoringId (cast “as any” será feito no componente)
    createSectionForMonitoring: async (monitoringId, data) => {
      set({ loadingSections: true });
      try {
        await createSectionForSensor({ ...data, monitoring: monitoringId });
        // Após criar, recarrega a lista de seções
        await get().fetchSectionsForMonitoring(monitoringId);
      } catch (err) {
        console.error("Erro ao criar seção para Nansenson:", err);
      } finally {
        set({ loadingSections: false });
      }
    },

    // 7) Busca uma única seção por ID
    fetchSingleSection: async (sectionId) => {
      const sec = await getSectionByIdForSensor(sectionId);
      return {
        id: sec.id,
        description: sec.description,
        is_monitored: sec.is_monitored,
        monitoring: sec.monitoring,
      };
    },

    // 8) Atualiza seção
    updateSectionForMonitoring: async (id, data) => {
      set({ loadingSections: true });
      try {
        await updateSectionForSensor(id, data);
        // quem chamar decide recarregar manualmente
      } catch (err) {
        console.error("Erro ao atualizar seção Nansenson:", err);
      } finally {
        set({ loadingSections: false });
      }
    },

    // 9) Deleta seção
    deleteSectionById: async (id) => {
      set({ loadingSections: true });
      try {
        await deleteSectionForSensor(id);
      } catch (err) {
        console.error("Erro ao deletar seção Nansenson:", err);
      } finally {
        set({ loadingSections: false });
      }
    },
  })
);
