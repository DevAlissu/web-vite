import React from "react";
import { Table, Collapse, Tree } from "antd";
import { SectionItem } from "@/types/sections";
import { useSectionTable } from "../hooks/useSectionTable";

const { Panel } = Collapse;

const SectionList: React.FC = () => {
  const { columns, sections, loading } = useSectionTable();

  // Filtra apenas os setores (pai de linhas)
  const setores = sections.filter((s) => !s.secticon_parent);

  return (
    <Table
      columns={columns}
      dataSource={setores}
      loading={loading}
      rowKey="id"
      expandedRowRender={(record: SectionItem) => {
        // Filtra linhas de produção associadas ao setor
        const linhas = sections.filter((linha) => linha.secticon_parent === record.id);

        const treeData = linhas.map((linha) => ({
          title: linha.name,
          key: `linha-${linha.id}`,
          children: sections
            .filter((equipamento) => equipamento.secticon_parent === linha.id)
            .map((equipamento) => ({
              title: equipamento.name,
              key: `equip-${equipamento.id}`,
            })),
        }));

        return (
          <Collapse items={[{ key: `panel-${record.id}`, label: "Subseções", children: 
            treeData.length > 0 ? (
              <Tree treeData={treeData} defaultExpandAll />
            ) : (
              <p>Não há subseções associadas.</p>
            )
          }]} />
        );
      }}
    />
  );
};

export default SectionList;