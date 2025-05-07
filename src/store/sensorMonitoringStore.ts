// src/store/sensorMonitoringStore.ts
import { create } from "zustand";
import { MonitoringItem } from "@/types/monitoringTypes";

const mockData: MonitoringItem[] = [
  {
    id: 1,
    name: "Sensor A",
    description: "Mock sensor A",
    estimated_consumption: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Sensor B",
    description: "Mock sensor B",
    estimated_consumption: 0,
    created_at: new Date().toISOString(),
  },
];

type State = {
  sensorMonitorings: MonitoringItem[];
  fetchSensorMonitorings: () => Promise<void>;
  deleteSensorMonitoring: (id: number) => Promise<void>;
};

export const useSensorMonitoringStore = create<State>((set) => ({
  sensorMonitorings: [],
  fetchSensorMonitorings: async () => {
    await new Promise((r) => setTimeout(r, 200));
    set({ sensorMonitorings: mockData });
  },
  deleteSensorMonitoring: async (id) => {
    set((state) => ({
      sensorMonitorings: state.sensorMonitorings.filter((m) => m.id !== id),
    }));
  },
}));
