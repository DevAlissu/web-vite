#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

# 0) Limpa módulo pré-existente
rm -rf src/pages/monitoring-sensor

# 1) Copia módulo de monitoramento original
cp -R src/pages/monitoring src/pages/monitoring-sensor

# 2) Renomeia páginas principais
for f in Monitoring.tsx MonitoringForm.tsx MonitoringEdit.tsx MonitoringDetails.tsx; do
  [ -f "src/pages/monitoring-sensor/$f" ] || continue
  mv "src/pages/monitoring-sensor/$f" \
     "src/pages/monitoring-sensor/${f/Monitoring/MonitoringSensor}"
done

# 3) Hooks: recria pasta e copia renomeando
mv src/pages/monitoring-sensor/hooks src/pages/monitoring-sensor/hooks.orig
mkdir -p src/pages/monitoring-sensor/hooks
for file in src/pages/monitoring-sensor/hooks.orig/useMonitoring* src/pages/monitoring-sensor/hooks.orig/useSection*; do
  [ -e "$file" ] || continue
  base=$(basename "$file")
  newbase=${base/useMonitoring/useSensor}
  cp "$file" "src/pages/monitoring-sensor/hooks/$newbase"
done
rm -rf src/pages/monitoring-sensor/hooks.orig

# 4) Ajusta conteúdo dos hooks renomeados
# useSensor.ts
sed -i \
  -e 's/export const useMonitoring/export const useSensor/' \
  -e 's|from "@/store/monitoringStore"|from "@/store/sensorMonitoringStore"|' \
  -e 's/fetchMonitorings/fetchSensorMonitorings/' \
  -e 's/monitorings/sensorMonitorings/' \
  src/pages/monitoring-sensor/hooks/useSensor.ts

# useSensorTable.tsx
sed -i \
  -e 's/export const useMonitoringTable/export const useSensorTable/' \
  -e 's|from "@/store/monitoringStore"|from "@/store/sensorMonitoringStore"|' \
  -e 's/useMonitoringStore/useSensorMonitoringStore/' \
  -e 's/fetchMonitorings/fetchSensorMonitorings/' \
  -e 's/monitorings/sensorMonitorings/' \
  src/pages/monitoring-sensor/hooks/useSensorTable.tsx

# useSensorById.tsx
sed -i \
  -e 's/export const useMonitoringById/export const useSensorById/' \
  -e 's|from "@/store/monitoringStore"|from "@/store/sensorMonitoringStore"|' \
  -e 's/useMonitoringStore/useSensorMonitoringStore/' \
  -e 's/fetchMonitorings/fetchSensorMonitorings/' \
  -e 's/monitorings/sensorMonitorings/' \
  src/pages/monitoring-sensor/hooks/useSensorById.tsx

# 5) Ajustes internos nas pages (monitoring → sensor)
find src/pages/monitoring-sensor -type f -name "*.tsx" -exec sed -i \
  -e 's@useMonitoringTable@useSensorTable@g' \
  -e 's@useMonitoringById@useSensorById@g' \
  -e 's@"/monitoring@"/sensor-monitoring@g' \
  -e 's@navigate("/monitoring@navigate("/sensor-monitoring@g' \
  -e 's@title="Monitoramento de Energia"@title="NansenSensor (mock)"@g' \
  -e 's@subTitle="Lista de Monitoramento de Energia já cadastrados"@subTitle="Lista mock de NansenSensor"@g' \
  {} \;

# 6) Cria/atualiza store mock em src/store/sensorMonitoringStore.ts
cat > src/store/sensorMonitoringStore.ts << 'EOF'
import { create } from "zustand";
import { MonitoringItem } from "@/types/monitoringTypes";

const mockData: MonitoringItem[] = [
  { id: 1, name: "Sensor A", description: "Mock sensor A", estimated_consumption: 0, created_at: new Date().toISOString() },
  { id: 2, name: "Sensor B", description: "Mock sensor B", estimated_consumption: 0, created_at: new Date().toISOString() },
];

type State = {
  sensorMonitorings: MonitoringItem[];
  fetchSensorMonitorings: () => Promise<void>;
  deleteSensorMonitoring: (id: number) => Promise<void>;
};

export const useSensorMonitoringStore = create<State>((set: any) => ({
  sensorMonitorings: [],
  fetchSensorMonitorings: async () => {
    await new Promise((r) => setTimeout(r, 200));
    set({ sensorMonitorings: mockData });
  },
  deleteSensorMonitoring: async (id: number) => {
    set((state: State) => ({ sensorMonitorings: state.sensorMonitorings.filter((m) => m.id !== id) }));
  },
}));
EOF

echo "✅ Scaffold NansenSensor atualizado: imports dos hooks corrigidos!"