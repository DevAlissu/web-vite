// src/pages/monitoring-sensor/hooks/useSensor.ts
import { useEffect } from "react";
import { useSensorMonitoringStore } from "@/store/sensorMonitoringStore";
import { MonitoringItem } from "@/types/monitoringTypes";

export const useSensor = () => {
  const { sensorMonitorings, fetchSensorMonitorings, deleteSensorMonitoring } =
    useSensorMonitoringStore();

  useEffect(() => {
    fetchSensorMonitorings();
  }, [fetchSensorMonitorings]);

  const addMonitoring = async (data: Partial<MonitoringItem>) => {
    await fetchSensorMonitorings();
  };

  const editMonitoring = async (id: number, data: Partial<MonitoringItem>) => {
    await fetchSensorMonitorings();
  };

  const removeMonitoring = async (id: number) => {
    await deleteSensorMonitoring(id);
  };

  return {
    sensorMonitorings,
    addMonitoring,
    editMonitoring,
    removeMonitoring,
  };
};
