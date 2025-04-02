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

// Função auxiliar para tratar erros do Axios
function isAxiosError(error: unknown): error is { response: { data: any } } {
  return typeof error === "object" && error !== null && "response" in error;
}

export const useSectionStore = create<SectionState>((set, get) => ({
  sections: [],
  loading: false,

  // Função para buscar todas as seções e construir a hierarquia
  fetchSections: async () => {
    set({ loading: true });

    try {
      const response = await api.get<SectionItem[]>("/sections/");
      const allSections = response.data;

      // Criação do mapa de seções com `sections_filhas` vazias
      const sectionMap: Record<number, SectionItem> = {};
      allSections.forEach((section) => {
        sectionMap[section.id] = { ...section, sections_filhas: [] };
      });

      // Construção da hierarquia pai → filhos
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
      if (isAxiosError(error)) {
        console.error("❌ Erro ao buscar seções:", error.response.data);
      } else {
        console.error("❌ Erro ao buscar seções:", String(error));
      }
    } finally {
      set({ loading: false });
    }
  },

  // Função para adicionar uma nova seção
  addSection: async (data) => {
    try {
      if (!data.type_section || typeof data.type_section !== "number") {
        throw new Error("`type_section` deve ser um ID numérico.");
      }

      const response = await api.post("/sections/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("✅ Seção criada:", response.data);
      await get().fetchSections();
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("❌ Erro ao adicionar seção:", error.response.data);
      } else {
        console.error("❌ Erro ao adicionar seção:", String(error));
      }
    }
  },

  // Função para atualizar uma seção existente
  updateSection: async (id, data) => {
    try {
      // Garantindo que o campo description tenha um valor padrão
      if (typeof data.description !== "string") {
        data.description = data.description || "";
      }

      const response = await api.patch(`/sections/${id}/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(`✅ Seção ${id} atualizada com sucesso:`, response.data);
      await get().fetchSections();
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("❌ Erro ao atualizar seção:", error.response.data);
      } else {
        console.error("❌ Erro ao atualizar seção:", String(error));
      }
    }
  },

  // Função para deletar uma seção
  deleteSection: async (id) => {
    try {
      await api.delete(`/sections/${id}/`);
      console.log(`🗑️ Seção ${id} excluída.`);
      await get().fetchSections();
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("❌ Erro ao excluir seção:", error.response.data);
      } else {
        console.error("❌ Erro ao excluir seção:", String(error));
      }
    }
  },
}));