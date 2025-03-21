import { create } from "zustand";
import { SectionItem } from "@/types/sections"; // Importa o tipo atualizado
import api from "@/services/api"; // Importa a API

interface SectionState {
  sections: SectionItem[];
  loading: boolean;
  fetchSections: () => Promise<void>;
  addSection: (data: Partial<SectionItem>) => Promise<void>;
  updateSection: (id: number, data: Partial<SectionItem>) => Promise<void>;
  deleteSection: (id: number) => Promise<void>;
}

export const useSectionStore = create<SectionState>((set) => ({
  sections: [],
  loading: false,

  fetchSections: async () => {
    set({ loading: true });
    try {
      const response = await api.get<SectionItem[]>("/sections/");
      
      // Garante que `sections_filhas` sempre esteja presente
      const sectionsWithChildren = response.data.map((section) => ({
        ...section,
        sections_filhas: section.sections_filhas || [],
      }));

      set({ sections: sectionsWithChildren });
      console.log("Seções carregadas:", sectionsWithChildren);
    } catch (error) {
      console.error("Erro ao buscar seções:", error);
    } finally {
      set({ loading: false });
    }
  },

  addSection: async (data) => {
    try {
      const response = await api.post("/sections/", data);
      set((state) => ({
        sections: [...state.sections, { ...response.data, sections_filhas: [] }],
      }));
      console.log("Seção adicionada:", response.data);
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
      console.log(`Seção ${id} atualizada.`);
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
      console.log(`Seção ${id} excluída.`);
    } catch (error) {
      console.error("Erro ao excluir seção:", error);
    }
  },
}));