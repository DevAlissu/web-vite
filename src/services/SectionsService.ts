import api from "./api";
import { SectionItem } from "../types/sectionTypes";
import { Subsection } from "../types/subsectionTypes";

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

// Criar um tipo de seção
export const createTypeSection = async (name: string): Promise<void> => {
  await api.post("/type_sections/", { name });
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

// ---------------------
// API para Subseções
// ---------------------

// Buscar todas as subseções para uma seção específica
export const getSubsections = async (sectionId: number): Promise<Subsection[]> => {
  const response = await api.get(`/sub_sections/?section=${sectionId}`);
  return response.data;
};

// Criar uma nova subseção
export const createSubsection = async (data: Omit<Subsection, "id">): Promise<Subsection> => {
  const response = await api.post("/sub_sections/", data);
  return response.data;
};

// Atualizar uma subseção (PUT)
export const updateSubsection = async (id: number, data: Omit<Subsection, "id">): Promise<Subsection> => {
  const response = await api.put(`/sub_sections/${id}/`, data);
  return response.data;
};

// Excluir uma subseção
export const deleteSubsection = async (id: number): Promise<void> => {
  await api.delete(`/sub_sections/${id}/`);
};