// src/pages/monitoring-sensor/hooks/useSensor.ts
import { useEffect } from "react";
import { useMonitoringSensorStore } from "@/store/monitoringSensorStore";
import type { MonitoringItem } from "@/types/monitoringTypes";

export const useSensor = () => {
  const {
    monitorings,
    fetchAllMonitorings,
    createMonitoring,
    updateMonitoring,
    deleteMonitoring,
    loadingMonitorings,
  } = useMonitoringSensorStore();

  useEffect(() => {
    fetchAllMonitorings();
  }, [fetchAllMonitorings]);

  const addMonitoring = async (data: {
    name: string;
    description: string;
    estimated_consumption: number;
  }) => {
    await createMonitoring(data);
    await fetchAllMonitorings();
  };

  const editMonitoring = async (
    id: number,
    data: {
      name: string;
      description: string;
      estimated_consumption: number;
    }
  ) => {
    await updateMonitoring(id, data);
    await fetchAllMonitorings();
  };

  const removeMonitoring = async (id: number) => {
    await deleteMonitoring(id);
    await fetchAllMonitorings();
  };

  return {
    sensorMonitorings: monitorings,
    addMonitoring,
    editMonitoring,
    removeMonitoring,
    loading: loadingMonitorings,
  };
};
