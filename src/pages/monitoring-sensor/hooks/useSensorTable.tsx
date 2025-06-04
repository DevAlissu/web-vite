// src/pages/monitoring-sensor/hooks/useSensorTable.ts

import { useEffect } from "react";
import { Button, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMonitoringSensorStore } from "@/store/monitoringSensorStore";
import type { MonitoringItem } from "@/types/monitoringTypes";

/**
 * useSensorTable retorna as colunas (com “Configurar”) e a lista de monitoramentos do tipo NANSENsor.
 */
export function useSensorTable() {
  const navigate = useNavigate();
  const {
    monitorings,
    fetchAllMonitorings,
    deleteMonitoring,
    loadingMonitorings,
  } = useMonitoringSensorStore();

  // Ao montar, busca todos os monitoramentos tipo NANSENsor
  useEffect(() => {
    fetchAllMonitorings();
  }, [fetchAllMonitorings]);

  // Handler para “Configurar Seções” → leva à página de seções deste monitoramento
  const handleConfigure = (monitoringId: number) => {
    navigate(`/sensor-monitoring/configure/${monitoringId}`);
  };

  // Colunas para a tabela de NANSENsor (sem o botão de “Visualizar”)
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Consumo Estimado",
      dataIndex: "estimated_consumption",
      key: "estimated_consumption",
      render: (value: number) => `${value} kWh`,
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: MonitoringItem) => (
        <div className="actions">
          {/* Editar */}
          <Tooltip title="Editar">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => navigate(`/sensor-monitoring/edit/${record.id}`)}
            >
              Editar
            </Button>
          </Tooltip>

          {/* Excluir */}
          <Tooltip title="Excluir">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteMonitoring(record.id)}
            >
              Excluir
            </Button>
          </Tooltip>

          {/* Configurar Seções */}
          <Tooltip title="Configurar Seções">
            <Button
              type="text"
              icon={<SettingOutlined />}
              onClick={() => handleConfigure(record.id)}
              style={{ marginLeft: 8 }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return {
    columns,
    monitorings,
    loading: loadingMonitorings,
  };
}
