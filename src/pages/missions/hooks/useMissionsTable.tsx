import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { Button, Select, message } from "antd";
import { useMissionStore } from "../../../store/missions";
import { useMonitoringStore } from "../../../store/monitoringStore";
import { MissionItem } from "../../../types/missions";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const useMissionsTable = () => {
  const navigate = useNavigate();
  const { missions, fetchMissions, deleteMission, associateMissionToMonitoring } = useMissionStore();
  const { monitorings, fetchMonitorings } = useMonitoringStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchMissions();
      await fetchMonitorings();
    };
    fetchData();
  }, [fetchMissions, fetchMonitorings]);

  const handleDelete = async (id: number) => {
    try {
      await deleteMission(id);
      message.success("Missão excluída com sucesso!");
    } catch (error) {
      message.error("Erro ao excluir a missão.");
    }
  };

  const handleAssociateMonitoring = async (missionId: number, monitoringId: number) => {
    try {
      await associateMissionToMonitoring(missionId, monitoringId);
      message.success("Monitoramento associado com sucesso!");
    } catch (error) {
      message.error("Erro ao associar monitoramento.");
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
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/missions/edit/${record.id}`)}
            style={{ marginRight: 8 }}
          >
            Editar
          </Button>

          <Select
            placeholder="Associar Monitoramento"
            style={{ width: 180, marginRight: 8 }}
            onChange={(value) => handleAssociateMonitoring(record.id, value)}
          >
            {monitorings.map((monitoring) => (
              <Select.Option key={monitoring.id} value={monitoring.id}>
                {monitoring.name}
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

  return { columns, missions, loading, fetchMissions };
};