import api from "../services/api";
import { MissionItem } from "../types/missions";

// 🔹 Listar todas as missões
export const getMissions = async (): Promise<MissionItem[]> => {
  const response = await api.get("/missions/");
  return response.data;
};

// 🔹 Criar uma nova missão
// 🔹 Criar uma nova missão
export const createMission = async (missionData: Partial<MissionItem>) => {
  try {
    // Garantindo que todos os campos obrigatórios estejam no formato correto
    const formattedData = {
      name: missionData.name || "",
      description: missionData.description || "",
      quantity_na: missionData.quantity_na ?? 0,
      energy_meta: missionData.energy_meta ?? 0,
      quantity_xp: missionData.quantity_xp ?? 0,
      status: missionData.status || "pendente",
      date_start: missionData.date_start || new Date().toISOString().split("T")[0], // Data atual como fallback
      date_end: missionData.date_end || new Date().toISOString().split("T")[0],
      monitoring: missionData.monitoring ?? null,
    };

    return await api.post("/missions/", formattedData);
  } catch (error) {
    console.error("Erro ao criar missão", error);
    throw error;
  }
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