import api from "./api";
import { MonitoringItem } from "../types/monitoringTypes";

// 🔹 Buscar todos os monitoramentos
export const fetchMonitorings = async (): Promise<MonitoringItem[]> => {
  const response = await api.get("/monitorings/");
  return response.data;
};

// 🔹 Buscar monitoramento por ID
export const fetchMonitoringById = async (
  id: number
): Promise<MonitoringItem> => {
  const response = await api.get(`/monitorings/${id}/`);
  return response.data;
};

// 🔹 Contar monitoramentos ativos
export const fetchActiveMonitoringCount = async (): Promise<number> => {
  const response = await api.get("/monitoring-active-count/");
  return response.data;
};

// 🔹 Criar monitoramento
export const createMonitoring = async (
  data: Partial<MonitoringItem>
): Promise<MonitoringItem> => {
  const response = await api.post("/monitorings/", data);
  return response.data;
};

// 🔹 Atualizar monitoramento
export const updateMonitoring = async (
  id: number,
  data: Partial<MonitoringItem>
): Promise<MonitoringItem> => {
  const response = await api.put(`/monitorings/${id}/`, data);
  return response.data;
};

// 🔹 Excluir monitoramento
export const deleteMonitoring = async (id: number): Promise<void> => {
  await api.delete(`/monitorings/${id}/`);
};
