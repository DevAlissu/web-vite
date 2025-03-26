import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMonitoringStore } from "@/store/monitoringStore";
import { message } from "antd";
import { MonitoringItem } from "@/types/monitoringTypes";
import Actions from "@/components/actions/Actions";

export const useMonitoringTable = () => {
  const navigate = useNavigate();
  const { monitorings, fetchMonitorings, deleteMonitoring } = useMonitoringStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchMonitorings();
      } catch (error) {
        message.error("Erro ao carregar monitoramentos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a: MonitoringItem, b: MonitoringItem) => a.name.localeCompare(b.name),
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
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: MonitoringItem) => (
        <Actions
          onEdit={() => navigate(`/monitoring/edit/${record.id}`)} // Edita monitoramento
          onConfigure={() => navigate(`/monitoring/configure/${record.id}`)} // 🔧 Vai pra configuração de seções
          onDelete={async () => {
            if (record.id) {
              await deleteMonitoring(record.id);
              message.success("Monitoramento excluído.");
            }
          }}
        />
      ),
    }
  ];

  return { columns, monitorings, loading };
};