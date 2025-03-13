import { create } from "zustand";
import { MissionItem } from "../types/missions";
import {
  getMissions,
  createMission,
  updateMission,
  deleteMission,
  associateMissionToMonitoring,
} from "../services/MissionService";

interface MissionStore {
  missions: MissionItem[];
  fetchMissions: () => Promise<void>;
  createMission: (missionData: Partial<MissionItem>) => Promise<void>;
  updateMission: (id: number, missionData: Partial<MissionItem>) => Promise<void>;
  deleteMission: (id: number) => Promise<void>;
  associateMissionToMonitoring: (missionId: number, monitoringId: number) => Promise<void>;
}

export const useMissionStore = create<MissionStore>((set) => ({
  missions: [],

  fetchMissions: async () => {
    try {
      const data = await getMissions();
      set({ missions: data });
    } catch (error) {
      console.error("Erro ao buscar missões", error);
    }
  },

  createMission: async (missionData) => {
    try {
      await createMission(missionData);
    } catch (error) {
      console.error("Erro ao criar missão", error);
    }
  },

  updateMission: async (id, missionData) => {
    try {
      await updateMission(id, missionData);
    } catch (error) {
      console.error("Erro ao atualizar missão", error);
    }
  },

  deleteMission: async (id) => {
    try {
      await deleteMission(id);
      set((state) => ({
        missions: state.missions.filter((mission) => mission.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao deletar missão", error);
    }
  },

  associateMissionToMonitoring: async (missionId, monitoringId) => {
    try {
      await associateMissionToMonitoring(missionId, monitoringId);
    } catch (error) {
      console.error("Erro ao associar missão ao monitoramento", error);
    }
  },
}));
