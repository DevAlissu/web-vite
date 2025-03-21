import { useEffect } from "react";
import { useSectionStore } from "@/store/sectionStore";
import { getSections, createSection, updateSection, deleteSection } from "@/services/SectionsService";
import { SectionItem } from "@/types/sections";

export const useSection = () => {
  const { sections, fetchSections, loading } = useSectionStore();

  useEffect(() => {
    fetchSections();
  }, []);

  const addSection = async (data: Partial<SectionItem>) => {
    await createSection(data);
    fetchSections(); // Atualiza os dados após a criação
  };

  const editSection = async (id: number, data: Partial<SectionItem>) => {
    await updateSection(id, data);
    fetchSections();
  };

  const removeSection = async (id: number) => {
    await deleteSection(id);
    fetchSections();
  };

  return { sections, loading, addSection, editSection, removeSection };
};