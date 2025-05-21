// src/pages/missions/hooks/useMissionsTable.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { Button, Select, message, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMissionStore } from "../../../store/missions";
import { useMonitoringStore } from "../../../store/monitoringStore";
import { MissionItem } from "../../../types/missions";

export const useMissionsTable = () => {
  const navigate = useNavigate();
  const {
    missions,
    fetchMissions,
    deleteMission,
    associateMissionToMonitoring,
  } = useMissionStore();
  const { monitorings, fetchMonitorings } = useMonitoringStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchMissions();
      await fetchMonitorings();
      setLoading(false);
    })();
  }, [fetchMissions, fetchMonitorings]);

  const handleDelete = async (id: number) => {
    try {
      await deleteMission(id);
      message.success("Missão excluída com sucesso!");
    } catch {
      message.error("Falha ao excluir a missão.");
    }
  };

  const handleAssociateMonitoring = async (
    missionId: number,
    monitoringId: number | null
  ) => {
    try {
      await associateMissionToMonitoring(missionId, monitoringId);
      message.success("Monitoramento atualizado com sucesso!");
      await fetchMissions();
    } catch {
      message.error("Falha ao atualizar o monitoramento.");
    }
  };

  const columns: ColumnsType<MissionItem> = [
    {
      title: "Nome da Missão",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Tipo",
      dataIndex: "is_order_production",
      key: "tipo",
      render: (isOp: boolean) =>
        isOp ? (
          <Tag color="blue">Ordem de Produção</Tag>
        ) : (
          <Tag color="default">Normal</Tag>
        ),
    },
    {
      title: "Monitoramento Associado",
      dataIndex: "monitoring",
      key: "monitoring",
      render: (monitoringId: number | null) =>
        monitoringId
          ? monitorings.find((m) => m.id === monitoringId)?.name ??
            `#${monitoringId}`
          : "Nenhum",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: MissionItem) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/missions/edit/${record.id}`)}
            style={{ marginRight: 8 }}
          >
            Editar
          </Button>

          <Select<number>
            placeholder="Associar Monitoramento"
            style={{ width: 200, marginRight: 8 }}
            allowClear
            value={record.monitoring ?? undefined}
            onChange={(value) =>
              handleAssociateMonitoring(record.id, value ?? null)
            }
          >
            {monitorings.map((m) => (
              <Select.Option key={m.id} value={m.id}>
                {m.name}
              </Select.Option>
            ))}
          </Select>

          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Excluir
          </Button>
        </>
      ),
    },
  ];

  return { columns, missions, loading };
};
