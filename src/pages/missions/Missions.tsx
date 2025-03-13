import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMissionStore } from "../../store/missions";
import { useMonitoringStore } from "../../store/monitoringStore";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";

const Missions: React.FC = () => {
  const navigate = useNavigate();
  const { missions, fetchMissions, deleteMission } = useMissionStore();
  const { monitorings, fetchMonitorings } = useMonitoringStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchMissions();
      await fetchMonitorings();
      setLoading(false);
    };
    loadData();
  }, []);

  // Confirmar exclusão de missão
  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "Tem certeza que deseja excluir esta missão?",
      content: "Essa ação não pode ser desfeita.",
      okText: "Sim, excluir",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteMission(id);
        message.success("Missão excluída com sucesso!");
      },
    });
  };

  const columns = [
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
      title: "Monitoramento Associado",
      dataIndex: "monitoring",
      key: "monitoring",
      render: (monitoringId: number) => {
        const monitoring = monitorings.find((m) => m.id === monitoringId);
        return monitoring ? monitoring.name : "Nenhum";
      },
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "8px" }}>
          {/* Botão Editar */}
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/missions/edit/${record.id}`)}
          >
            Editar
          </Button>

          {/* Botão Excluir */}
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => confirmDelete(record.id)}
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          {/* Cabeçalho da página */}
          <ItemHeaderCabecalho title="Missões" subTitle="Lista de missões já cadastradas" />

          {/* Botões de ação */}
          <section className="actions-section">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/missions/register")}
            >
              Criar Missão
            </Button>
          </section>

          {/* Tabela de missões */}
          <section className="table-container">
            <Table columns={columns} dataSource={missions} loading={loading} rowKey="id" />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Missions;