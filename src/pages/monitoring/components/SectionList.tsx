import { Table, Badge } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useSectionTable } from "../hooks/useSectionTable";
import { useSectionHierarchy } from "../hooks/useSectionHierarchy";
import { useSectionActions } from "../hooks/useSectionActions";
import { columnsWithActions } from "./columnsWithActions";
import SectionExpandedTree from "./SectionExpandedTree";
import MonitoringConfigureSectionModal from "./MonitoringConfigureSectionModal";
import { SectionItem } from "@/types/sections";

const SectionList = () => {
  const { id } = useParams<{ id: string }>();
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

  // Verifica se uma seção ou qualquer descendente possui IoT
  const hasIotDeviceRecursive = (section: SectionItem, allSections: SectionItem[]): boolean => {
    if (section.DeviceIot) return true;
    const children = allSections.filter((s) => s.secticon_parent === section.id);
    return children.some((child) => hasIotDeviceRecursive(child, allSections));
  };

  // Substituir a coluna "Nome" para adicionar LED verde
  const enhancedColumns = columns.map((col) => {
    if (col.key === "name") {
      return {
        ...col,
        render: (_: unknown, record: SectionItem) => {
          const hasIot = hasIotDeviceRecursive(record, sections);
          return (
            <span>
              {hasIot && <Badge status="success" style={{ marginRight: 6 }} />}
              {record.name}
            </span>
          );
        },
      };
    }
    return col;
  });

  const actionColumns = columnsWithActions(enhancedColumns, {
    onEdit: (sectionId) => navigate(`/monitoring/edit-section/${sectionId}`),
    onDelete: handleDelete,
    onConfigure: handleOpenConfigure,
  });

  return (
    <>
      <Table
        columns={actionColumns}
        dataSource={setoresPrincipais.filter((s) => s.monitoring === Number(id))}
        loading={loading}
        rowKey="id"
        expandable={{
          expandedRowRender: (record: SectionItem) => (
            <SectionExpandedTree
              section={record}
              allSections={sections}
              onConfigure={handleOpenConfigure}
              onDelete={handleDelete}
            />
          ),
        }}
        pagination={{ pageSize: 10 }}
      />

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