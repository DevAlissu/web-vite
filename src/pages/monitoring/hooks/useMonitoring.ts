import { useEffect } from "react";
import { useMonitoringStore } from "@/store/monitoringStore";
import { getMonitorings, createMonitoring, updateMonitoring, deleteMonitoring } from "@/services/monitoringService";
import { MonitoringItem } from "@/types/monitoringTypes";

export const useMonitoring = () => {
  const { monitorings, fetchMonitorings, loading } = useMonitoringStore();

  useEffect(() => {
    fetchMonitorings();
  }, []);

  const addMonitoring = async (data: Partial<MonitoringItem>) => {
    await createMonitoring(data);
    fetchMonitorings(); // Atualiza os dados após a criação
  };

  const editMonitoring = async (id: number, data: Partial<MonitoringItem>) => {
    await updateMonitoring(id, data);
    fetchMonitorings();
  };

  const removeMonitoring = async (id: number) => {
    await deleteMonitoring(id);
    fetchMonitorings();
  };

  return { monitorings, loading, addMonitoring, editMonitoring, removeMonitoring };
};