import api from "./api";
import { MonitoringItem } from "../types/monitoringTypes";

// Buscar todos os monitoramentos
export const getMonitorings = async (): Promise<MonitoringItem[]> => {
  const response = await api.get("/monitorings/");
  return response.data;
};

// Buscar um monitoramento específico
export const getMonitoringById = async (id: number): Promise<MonitoringItem> => {
  const response = await api.get(`/monitorings/${id}/`);
  return response.data;
};

export const getMonitoringsCountActive = async (): Promise<number> => {
   const response = await api.get("/monitoring-active-count/");
   return response.data;
}

// Criar um novo monitoramento
export const createMonitoring = async (monitoring: Partial<MonitoringItem>): Promise<void> => {
  await api.post("/monitorings/", monitoring);
};

// Atualizar um monitoramento (PUT)
export const updateMonitoring = async (id: number, monitoring: Partial<MonitoringItem>): Promise<void> => {
  await api.put(`/monitorings/${id}/`, monitoring);
};

// Excluir um monitoramento
export const deleteMonitoring = async (id: number): Promise<void> => {
  await api.delete(`/monitorings/${id}/`);
};