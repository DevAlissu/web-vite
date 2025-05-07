import { useParams } from "react-router-dom";
import { SectionItem } from "@/types/sections";

/**
 * Função recursiva que achata uma hierarquia de seções em uma lista única.
 */
const flattenHierarchy = (sections: SectionItem[]): SectionItem[] => {
  const result: SectionItem[] = [];

  for (const section of sections) {
    result.push(section);
    if (section.sections_filhas && section.sections_filhas.length > 0) {
      result.push(...flattenHierarchy(section.sections_filhas));
    }
  }

  return result;
};

export const useSectionHierarchy = (
  sections: SectionItem[]
): {
  setoresPrincipais: SectionItem[];
  filteredSections: SectionItem[];
} => {
  const { id } = useParams<{ id: string }>();
  const monitoringId = Number(id);

  // Se id não for válido, retorna arrays vazios
  if (isNaN(monitoringId)) {
    return {
      setoresPrincipais: [],
      filteredSections: [],
    };
  }

  // Setores principais (sem seção pai e pertencentes ao monitoramento)
  const setoresPrincipais = sections.filter(
    (s) => s.monitoring === monitoringId && !s.secticon_parent
  );

  // Achata a hierarquia a partir dos setores principais
  const filteredSections = flattenHierarchy(setoresPrincipais);

  return {
    setoresPrincipais,
    filteredSections,
  };
};