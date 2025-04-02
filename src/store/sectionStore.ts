import { create } from "zustand";
import { SectionItem } from "@/types/sections";
import api from "@/services/api";

interface SectionState {
  sections: SectionItem[];
  loading: boolean;
  fetchSections: () => Promise<void>;
  addSection: (data: Partial<SectionItem>) => Promise<void>;
  updateSection: (id: number, data: Partial<SectionItem>) => Promise<void>;
  deleteSection: (id: number) => Promise<void>;
}

export const useSectionStore = create<SectionState>((set, get) => ({
  sections: [],
  loading: false,

  fetchSections: async () => {
    set({ loading: true });

    try {
      const response = await api.get<SectionItem[]>("/sections/");
      const allSections = response.data;

      // Cria um mapa com todas as seções, adicionando `sections_filhas` vazias
      const sectionMap: Record<number, SectionItem> = {};
      allSections.forEach((section) => {
        sectionMap[section.id] = { ...section, sections_filhas: [] };
      });

      // Constrói a hierarquia pai → filhos
      const rootSections: SectionItem[] = [];
      allSections.forEach((section) => {
        if (section.secticon_parent) {
          const parent = sectionMap[section.secticon_parent];
          if (parent) {
            parent.sections_filhas?.push(sectionMap[section.id]);
          }
        } else {
          rootSections.push(sectionMap[section.id]);
        }
      });

      set({ sections: rootSections });
      console.log("✅ Seções carregadas com hierarquia:", rootSections);
    } catch (error) {
      console.error("❌ Erro ao buscar seções:", error);
    } finally {
      set({ loading: false });
    }
  },

  addSection: async (data) => {
    try {
      if (!data.type_section || typeof data.type_section !== "number") {
        throw new Error("`type_section` deve ser um ID numérico.");
      }
  
      const response = await api.post("/sections/", data);
      console.log("✅ Seção criada:", response.data);
      await get().fetchSections();
    } catch (error) {
      console.error("❌ Erro ao adicionar seção:", error);
    }
  },

  updateSection: async (id, data) => {
    try {
      await api.put(`/sections/${id}/`, data);
      console.log(`✅ Seção ${id} atualizada.`);
      await get().fetchSections();
    } catch (error) {
      console.error("❌ Erro ao atualizar seção:", error);
    }
  },

  deleteSection: async (id) => {
    try {
      await api.delete(`/sections/${id}/`);
      console.log(`🗑️ Seção ${id} excluída.`);
      await get().fetchSections();
    } catch (error) {
      console.error("❌ Erro ao excluir seção:", error);
    }
  },
}));