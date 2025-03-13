import { create } from "zustand";
import { SectionItem } from "@/types/sectionTypes";
import { Subsection } from "@/types/subsectionTypes"; // Defina o tipo de subseção, se necessário
import api from "@/services/api";

interface SectionState {
  sections: SectionItem[];
  subsections: Subsection[]; // Novo estado para subseções
  loading: boolean;
  fetchSections: () => Promise<void>;
  fetchSubsections: (sectionId: number) => Promise<void>; // Função para buscar subseções
  addSection: (data: Partial<SectionItem>) => Promise<void>;
  updateSection: (id: number, data: Partial<SectionItem>) => Promise<void>;
  deleteSection: (id: number) => Promise<void>;
  addSubsection: (data: Partial<Subsection>, sectionId: number) => Promise<void>; // Função para adicionar subseção
  deleteSubsection: (id: number) => Promise<void>; // Função para excluir subseção
}

export const useSectionStore = create<SectionState>((set) => ({
  sections: [],
  subsections: [],
  loading: false,

  fetchSections: async () => {
    set({ loading: true });
    try {
      const response = await api.get<SectionItem[]>("/sections/");
      set({ sections: response.data });
    } catch (error) {
      console.error("Erro ao buscar seções:", error);
    } finally {
      set({ loading: false });
    }
  },

  fetchSubsections: async (sectionId: number) => {
    set({ loading: true });
    try {
      const response = await api.get<Subsection[]>(`/api/sub_sections/?section=${sectionId}`);
      set({ subsections: response.data });
    } catch (error) {
      console.error("Erro ao buscar subseções:", error);
    } finally {
      set({ loading: false });
    }
  },

  addSection: async (data) => {
    try {
      const response = await api.post("/sections/", data);
      set((state) => ({
        sections: [...state.sections, response.data],
      }));
    } catch (error) {
      console.error("Erro ao adicionar seção:", error);
    }
  },

  updateSection: async (id, data) => {
    try {
      await api.put(`/sections/${id}/`, data);
      set((state) => ({
        sections: state.sections.map((s) =>
          s.id === id ? { ...s, ...data } : s
        ),
      }));
    } catch (error) {
      console.error("Erro ao atualizar seção:", error);
    }
  },

  deleteSection: async (id) => {
    try {
      await api.delete(`/sections/${id}/`);
      set((state) => ({
        sections: state.sections.filter((s) => s.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao excluir seção:", error);
    }
  },

  addSubsection: async (data, sectionId) => {
    try {
      const response = await api.post("/api/sub_sections/", { ...data, section: sectionId });
      set((state) => ({
        subsections: [...state.subsections, response.data],
      }));
    } catch (error) {
      console.error("Erro ao adicionar subseção:", error);
    }
  },

  deleteSubsection: async (id) => {
    try {
      await api.delete(`/api/sub_sections/${id}/`);
      set((state) => ({
        subsections: state.subsections.filter((sub) => sub.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao excluir subseção:", error);
    }
  },
}));