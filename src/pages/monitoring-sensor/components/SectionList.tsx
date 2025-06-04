// src/pages/monitoring-sensor/components/SectionList.tsx
import React from "react";
import { Table, Badge, Button, Tooltip } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useSectionTable } from "../hooks/useSectionTable";
import { useSectionHierarchy } from "../hooks/useSectionHierarchy";
import { useSectionActions } from "../hooks/useSectionActions";
import { columnsWithActions } from "./columnsWithActions";
import SectionExpandedTree from "./SectionExpandedTree";
import MonitoringConfigureSectionModal from "./MonitoringConfigureSectionModal";
import type { SectionItem } from "@/types/sections";

interface SectionListProps {
  monitoringId: number;
}

const SectionList: React.FC<SectionListProps> = ({ monitoringId }) => {
  const navigate = useNavigate();

  const {
    columns,
    sections,
    loading,
    sectionToConfigure,
    isConfigureModalVisible,
    handleOpenConfigure,
    handleCloseConfigure,
  } = useSectionTable();

  const { handleDelete } = useSectionActions();
  const { setoresPrincipais } = useSectionHierarchy(sections);

  // Verifica recursivamente se a seção ou quaisquer sub-seções têm DeviceIoT
  const hasIotDeviceRecursive = (
    section: SectionItem,
    allSections: SectionItem[]
  ): boolean => {
    if (section.DeviceIot) return true;
    const children = allSections.filter(
      (s) => s.secticon_parent === section.id
    );
    return children.some((child) => hasIotDeviceRecursive(child, allSections));
  };

  // Seção tem DeviceIoT diretamente associado (para desenhar o ícone de monitoramento)
  const hasDirectIotDevice = (section: SectionItem): boolean => {
    return !!section.DeviceIot;
  };

  // Ao clicar no ícone “⚡” de monitorar (pode abrir um mini-modal mais tarde)
  const handleMonitorClick = (section: SectionItem) => {
    console.log("🔍 Monitoramento da seção:", section.name);
    // Caso queira abrir um modal customizado, faça aqui
  };

  // “Injeta” o LED verde + ícone ⚡ na coluna “name”
  const enhancedColumns = columns.map((col) => {
    if (col.key === "name") {
      return {
        ...col,
        render: (_: unknown, record: SectionItem) => {
          const hasIot = hasIotDeviceRecursive(record, sections);
          const hasDirectIot = hasDirectIotDevice(record);

          return (
            <span style={{ display: "flex", alignItems: "center" }}>
              {hasIot && <Badge status="success" style={{ marginRight: 6 }} />}
              {record.name}
              {hasDirectIot && (
                <Tooltip title="Monitoramento Ativo">
                  <Button
                    type="text"
                    icon={<ThunderboltOutlined />}
                    onClick={() => handleMonitorClick(record)}
                    style={{ marginLeft: 8, color: "#faad14" }}
                  />
                </Tooltip>
              )}
            </span>
          );
        },
      };
    }
    return col;
  });

  // Colunas de ação: Edit | Configurar | Delete
  const actionColumns = columnsWithActions(enhancedColumns, {
    onEdit: (sectionId) =>
      navigate(`/sensor-monitoring/edit-section/${sectionId}`),
    onDelete: handleDelete,
    onConfigure: handleOpenConfigure,
  });

  return (
    <>
      {/* Tabela de Seções (filtradas pelo monitoringId) */}
      <Table
        columns={actionColumns}
        dataSource={setoresPrincipais.filter(
          (s) => s.monitoring === monitoringId
        )}
        loading={loading}
        rowKey="id"
        expandable={{
          expandedRowRender: (record: SectionItem) => (
            <SectionExpandedTree
              section={record}
              allSections={sections}
              onConfigure={handleOpenConfigure}
              onDelete={handleDelete}
              onMonitor={handleMonitorClick}
            />
          ),
        }}
        pagination={{ pageSize: 10 }}
      />

      {/* Modal de “Configurar Seção” */}
      {sectionToConfigure && (
        <MonitoringConfigureSectionModal
          section={sectionToConfigure}
          open={isConfigureModalVisible}
          onClose={handleCloseConfigure}
        />
      )}
    </>
  );
};

export default SectionList;
