import React, { useState } from "react";
import { Table, Dropdown, Menu, Button } from "antd";
import { SectionItem } from "@/types/sectionTypes";
import { useSectionTable } from "../hooks/useSectionTable"; 
import { useSubsections } from "../hooks/useSubsection"; 

const SectionList: React.FC = () => {
  const { columns, sections, loading } = useSectionTable(); 
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  
 
  
  const { subsections, loading: loadingSubsections } = useSubsections(
    selectedSectionId || 0,
    selectedSectionId ? "setor" : "" 
  );

  const handleSectionClick = (section: SectionItem) => {
    setSelectedSectionId(section.id); 
  };

  return (
    <Table
      columns={columns}
      dataSource={sections}
      loading={loading}
      rowKey="id"
      expandedRowRender={(record: SectionItem) => (
        <div>
          {selectedSectionId === record.id && (
            <div>
              {loadingSubsections ? (
                <p>Carregando Subsequências...</p>
              ) : (
                <ul>
                  {subsections.length > 0 ? (
                    subsections.map((sub, index) => (
                      <li key={index}>{sub.description}</li> // Exibe a descrição das subseções
                    ))
                  ) : (
                    <p>Não há subseções para esta seção.</p>
                  )}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
      onRow={(record) => ({
        onClick: () => handleSectionClick(record),
      })}
    />
  );
};

export default SectionList;