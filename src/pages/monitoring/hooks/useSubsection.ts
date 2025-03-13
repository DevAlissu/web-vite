import { useState, useEffect } from "react";
import { useSectionStore } from "@/store/sectionStore"; 
import { message } from "antd"; 
import { SectionItem } from "@/types/sectionTypes"; 
import { Subsection } from "@/types/subsectionTypes"; 

export const useSubsections = (sectionId: number, sectionType: string) => {
  const { sections } = useSectionStore();
  const [subsections, setSubsections] = useState<Subsection[]>([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubsections = async () => {
      setLoading(true);
      try {
        const section = sections.find((sec) => sec.id === sectionId);
        if (section) {
          // Para o setor, pega as subseções (linhas de produção associadas)
          if (sectionType === "setor") {
            const subsectionsForSector = await fetchSubsectionsForSector(sectionId); // Função para buscar linhas associadas a um setor
            setSubsections(subsectionsForSector);
          } 
          // Para linha de produção, pega os equipamentos
          else if (sectionType === "linha") {
            const subsectionsForLine = await fetchSubsectionsForLine(sectionId); // Função para buscar equipamentos associados a uma linha
            setSubsections(subsectionsForLine);
          }
        }
      } catch (error) {
        message.error("Erro ao buscar subseções.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubsections();
  }, [sectionId, sectionType, sections]);

  const fetchSubsectionsForSector = async (sectionId: number) => {
    
    try {
      const response = await fetch(`/sub_sections/?section=${sectionId}`); 
      const data = await response.json();
      return data.filter((item: any) => item.section === sectionId); // Filtra pelo ID do setor
    } catch (error) {
      message.error("Erro ao carregar subseções para o setor");
      return [];
    }
  };

  const fetchSubsectionsForLine = async (sectionId: number) => {
    
    try {
      const response = await fetch(`/sub_sections/?section=${sectionId}`); 
      const data = await response.json();
      return data.filter((item: any) => item.section === sectionId); // Filtra pela linha de produção
    } catch (error) {
      message.error("Erro ao carregar subseções para a linha de produção");
      return [];
    }
  };

  return { subsections, loading };
};