import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMonitoringSensorStore } from "@/store/monitoringSensorStore";
import { message } from "antd";
import { MonitoringItem } from "@/types/monitoringTypes";
import Actions from "@/components/actions/Actions"; // <-- Aqui igual ao Nansenic

export function useSensorTable() {
  const navigate = useNavigate();
  const {
    monitorings,
    fetchAllMonitorings,
    deleteMonitoring,
    loadingMonitorings,
  } = useMonitoringSensorStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAllMonitorings();
      } catch (error) {
        message.error("Erro ao carregar monitoramentos NANSENsor.");
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      // Se quiser sorting, copie o sorter igual do Nansenic
      sorter: (a: MonitoringItem, b: MonitoringItem) =>
        a.name.localeCompare(b.name),
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Consumo Estimado (kWh)",
      dataIndex: "estimated_consumption",
      key: "estimated_consumption",
      // Não precisa render custom se quiser igual ao Nansenic!
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: MonitoringItem) => (
        <Actions
          onEdit={() => navigate(`/sensor-monitoring/edit/${record.id}`)}
          onConfigure={() =>
            navigate(`/sensor-monitoring/configure/${record.id}`)
          }
          onDelete={async () => {
            if (record.id) {
              await deleteMonitoring(record.id);
              message.success("Monitoramento excluído.");
            }
          }}
        />
      ),
    },
  ];

  return {
    columns,
    monitorings,
    loading: loadingMonitorings,
  };
}
