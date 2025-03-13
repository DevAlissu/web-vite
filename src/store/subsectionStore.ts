import { create } from "zustand";
import { SubsectionItem } from "@/types/subsectionTypes";
import api from "@/services/api";

interface SubsectionState {
  subsections: SubsectionItem[];
  loading: boolean;
  fetchSubsections: () => Promise<void>;
  createSubsection: (data: Partial<SubsectionItem>) => Promise<void>;
  updateSubsection: (id: number, data: Partial<SubsectionItem>) => Promise<void>;
  deleteSubsection: (id: number) => Promise<void>;
}

export const useSubsectionStore = create<SubsectionState>((set) => ({
  subsections: [],
  loading: false,

  fetchSubsections: async () => {
    set({ loading: true });
    try {
      const response = await api.get<SubsectionItem[]>("/sub_sections/");
      set({ subsections: response.data });
    } catch (error) {
      console.error("Erro ao buscar subseções:", error);
    } finally {
      set({ loading: false });
    }
  },

  createSubsection: async (data) => {
    try {
      const response = await api.post("/sub_sections/", data);
      set((state) => ({
        subsections: [...state.subsections, response.data],
      }));
    } catch (error) {
      console.error("Erro ao criar subseção:", error);
    }
  },

  updateSubsection: async (id, data) => {
    try {
      await api.put(`/sub_sections/${id}/`, data);
      set((state) => ({
        subsections: state.subsections.map((s) =>
          s.id === id ? { ...s, ...data } : s
        ),
      }));
    } catch (error) {
      console.error("Erro ao atualizar subseção:", error);
    }
  },

  deleteSubsection: async (id) => {
    try {
      await api.delete(`/sub_sections/${id}/`);
      set((state) => ({
        subsections: state.subsections.filter((s) => s.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao excluir subseção:", error);
    }
  },
}));
