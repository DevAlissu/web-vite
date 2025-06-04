// src/pages/monitoring-sensor/components/SectionListSensor.tsx
import React, { useEffect } from "react";
import { Table, Badge, Button, Popconfirm } from "antd";
import {
  useMonitoringSensorStore,
  SectionSimple,
} from "../../../store/monitoringSensorStore";

interface Props {
  monitoringId: number;
}

const SectionListSensor: React.FC<Props> = ({ monitoringId }) => {
  const {
    sections,
    loadingSections,
    fetchSectionsForMonitoring,
    deleteSectionById,
  } = useMonitoringSensorStore();

  // Quando o component monta (ou quando monitoringId muda), busca as seções deste sensor
  useEffect(() => {
    fetchSectionsForMonitoring(monitoringId);
  }, [fetchSectionsForMonitoring, monitoringId]);

  // Colunas da tabela
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
      render: (desc: string) => desc || "-",
    },
    {
      title: "Monitora?",
      dataIndex: "is_monitored",
      key: "is_monitored",
      render: (val: boolean) =>
        val ? (
          <Badge status="success" text="Sim" />
        ) : (
          <Badge status="default" text="Não" />
        ),
    },
    {
      title: "Ações",
      key: "actions",
      width: 180,
      render: (_: any, record: SectionSimple) => (
        <div style={{ display: "flex", gap: 8 }}>
          {/* Botão de excluir seção */}
          <Popconfirm
            title="Deseja excluir esta seção?"
            onConfirm={async () => {
              await deleteSectionById(record.id);
              // depois de excluir, recarrega a lista
              await fetchSectionsForMonitoring(monitoringId);
            }}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger>Excluir</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={sections}
      loading={loadingSections}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      locale={{ emptyText: "Nenhuma seção cadastrada" }}
    />
  );
};

export default SectionListSensor;
