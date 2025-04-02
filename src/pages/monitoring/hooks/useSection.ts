import { useEffect } from "react";
import { useSectionStore } from "@/store/sectionStore";

export const useSection = () => {
  const {
    sections,
    fetchSections,
    addSection,
    updateSection,
    deleteSection,
    loading,
  } = useSectionStore();

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  return {
    sections,
    loading,
    addSection,
    editSection: updateSection,
    removeSection: deleteSection,
  };
};