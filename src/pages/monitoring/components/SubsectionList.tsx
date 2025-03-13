// src/pages/monitoring/components/SubsectionList.tsx
import React from "react";
import { SectionItem } from "@/types/sectionTypes"; // Certifique-se que o tipo está correto

const SubsectionList: React.FC = () => {
  const { subsections, loading } = useSubsections(1, "setor"); // Exemplificando

  if (loading) return <p>Carregando subseções...</p>;

  return (
    <div>
      {subsections.map((sub: SectionItem, index: number) => (
        <div key={index}>
          <p>{sub.name}</p> {/* Ajuste conforme necessário */}
        </div>
      ))}
    </div>
  );
};

export default SubsectionList;