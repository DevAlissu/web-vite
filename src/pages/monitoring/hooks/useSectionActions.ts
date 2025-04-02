import { useState } from "react";
import { message } from "antd";
import { SectionItem } from "@/types/sections";
import { useSectionStore } from "@/store/sectionStore";

export const useSectionActions = () => {
  const [sectionToConfigure, setSectionToConfigure] = useState<SectionItem | null>(null);
  const { deleteSection, fetchSections } = useSectionStore();

  const handleOpenConfig = (section: SectionItem) => {
    setSectionToConfigure(section);
  };

  const handleCloseConfig = () => {
    setSectionToConfigure(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSection(id);
      await fetchSections(); // garante atualização visual após excluir hierarquias
      message.success("Seção excluída com sucesso.");
    } catch (err) {
      console.error(err);
      message.error("Erro ao excluir seção.");
    }
  };

  const handleEdit = (id: number) => {
    // Aqui você pode redirecionar ou setar um estado global de edição
    console.log("Editar seção com ID:", id);
  };

  return {
    sectionToConfigure,
    handleOpenConfig,
    handleCloseConfig,
    handleDelete,
    handleEdit,
  };
};