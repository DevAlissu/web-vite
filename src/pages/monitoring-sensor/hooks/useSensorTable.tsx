// src/pages/monitoring-sensor/hooks/useSensorTable.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import Actions from "@/components/actions/Actions";
import { useSensorMonitoringStore } from "@/store/sensorMonitoringStore";
import type { MonitoringItem } from "@/types/monitoringTypes";

export const useSensorTable = () => {
  const navigate = useNavigate();
  const { sensorMonitorings, fetchSensorMonitorings, deleteSensorMonitoring } =
    useSensorMonitoringStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        await fetchSensorMonitorings();
      } catch {
        message.error("Erro ao carregar sensores.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [fetchSensorMonitorings]);

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a: MonitoringItem, b: MonitoringItem) =>
        a.name.localeCompare(b.name),
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ações",
      key: "actions",
      align: "center",
      render: (_: any, record: MonitoringItem) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          <Actions
            onEdit={() => navigate(`/sensor-monitoring/edit/${record.id}`)}
            onConfigure={() =>
              navigate(`/sensor-monitoring/configure/${record.id}`)
            }
            onDelete={async () => {
              await deleteSensorMonitoring(record.id);
              message.success("Sensor excluído.");
            }}
          />
        </div>
      ),
    },
  ];

  return {
    columns,
    monitorings: sensorMonitorings,
    loading,
  };
};
