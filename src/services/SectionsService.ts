// services/sectionService.ts
import api from "./api";
import { SectionItem } from "../types/sections";

// Buscar todas as seções
export const getSections = async (): Promise<SectionItem[]> => {
  const response = await api.get("/sections/");
  return response.data;
};

// Buscar uma seção específica
export const getSectionById = async (id: number): Promise<SectionItem> => {
  const response = await api.get(`/sections/${id}/`);
  return response.data;
};

// Criar uma nova seção
export const createSection = async (section: Partial<SectionItem>): Promise<void> => {
  await api.post("/sections/", section);
};

// Atualizar uma seção (PUT)
export const updateSection = async (id: number, section: Partial<SectionItem>): Promise<void> => {
  await api.put(`/sections/${id}/`, section);
};

// Excluir uma seção
export const deleteSection = async (id: number): Promise<void> => {
  await api.delete(`/sections/${id}/`);
};

// Buscar tipos de seção (SETOR, LINHA, EQUIPAMENTO)
export const getTypeSections = async (): Promise<{ id: number; name: string }[]> => {
  const response = await api.get("/typesection/");
  return response.data;
};