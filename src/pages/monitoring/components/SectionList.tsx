import React, { useState } from "react";
import { Table, Collapse, Tree, Button, message } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { SectionItem } from "@/types/sections";
import { useSectionTable } from "../hooks/useSectionTable";
import MonitoringConfigureSectionModal from "./MonitoringConfigureSectionModal";
import Actions from "@/components/actions/Actions";

const SectionList: React.FC = () => {
  const {
    columns,
    sections,
    loading,
    deleteSection,
  } = useSectionTable();

  const [sectionToConfigure, setSectionToConfigure] = useState<SectionItem | null>(null);

  const setores = sections.filter((s) => !s.secticon_parent);

  const handleOpenConfig = (section: SectionItem) => setSectionToConfigure(section);
  const handleCloseConfig = () => setSectionToConfigure(null);

  const columnsWithActions = [
    ...columns,
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: SectionItem) => (
        <Actions
          // Descomente abaixo quando a tela de edição estiver pronta
          // onEdit={() => navigate(`/monitoring/configure/${record.monitoring}/edit-section/${record.id}`)}
          onEdit={() => console.log("Editar:", record.id)}
          onDelete={async () => {
            try {
              await deleteSection(record.id);
              message.success("Seção excluída com sucesso.");
            } catch (err) {
              message.error("Erro ao excluir.");
            }
          }}
          onConfigure={() => handleOpenConfig(record)}
        />
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columnsWithActions}
        dataSource={setores}
        loading={loading}
        rowKey="id"
        expandedRowRender={(record: SectionItem) => {
          const linhas = sections.filter((l) => l.secticon_parent === record.id);

          const treeData = linhas.map((linha) => ({
            title: (
              <span>
                {linha.name}
                <Button
                  type="text"
                  icon={<SettingOutlined />}
                  onClick={() => handleOpenConfig(linha)}
                  style={{ marginLeft: 8 }}
                />
              </span>
            ),
            key: `linha-${linha.id}`,
            children: sections
              .filter((e) => e.secticon_parent === linha.id)
              .map((equip) => ({
                title: (
                  <span>
                    {equip.name}
                    <Button
                      type="text"
                      icon={<SettingOutlined />}
                      onClick={() => handleOpenConfig(equip)}
                      style={{ marginLeft: 8 }}
                    />
                  </span>
                ),
                key: `equip-${equip.id}`,
              })),
          }));

          return (
            <Collapse
              items={[
                {
                  key: `panel-${record.id}`,
                  label: "Subseções",
                  children: treeData.length > 0 ? (
                    <Tree treeData={treeData} defaultExpandAll />
                  ) : (
                    <p>Não há subseções associadas.</p>
                  ),
                },
              ]}
            />
          );
        }}
      />

      {sectionToConfigure && (
        <MonitoringConfigureSectionModal
          section={sectionToConfigure}
          open={!!sectionToConfigure}
          onClose={handleCloseConfig}
        />
      )}
    </>
  );
};

export default SectionList;


