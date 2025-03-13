import api from "../services/api";
import { MissionItem } from "../types/missions";

// 🔹 Listar todas as missões
export const getMissions = async (): Promise<MissionItem[]> => {
  const response = await api.get("/missions/");
  return response.data;
};

// 🔹 Criar uma nova missão
export const createMission = async (missionData: Partial<MissionItem>) => {
  return await api.post("/missions/", missionData);
};

// 🔹 Atualizar uma missão existente
export const updateMission = async (id: number, missionData: Partial<MissionItem>) => {
  return await api.put(`/missions/${id}/`, missionData);
};

// 🔹 Deletar uma missão
export const deleteMission = async (id: number) => {
  return await api.delete(`/missions/${id}/`);
};

// 🔹 Associar missão a um monitoramento
export const associateMissionToMonitoring = async (missionId: number, monitoringId: number) => {
  return await api.post(`/missions/${missionId}/associate-monitoring/`, { monitoringId });
};