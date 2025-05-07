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
export const createSection = async (
  section: Partial<SectionItem>
): Promise<void> => {
  await api.post("/sections/", section);
};

// Atualizar uma seção (PUT)
export const updateSection = async (
  id: number,
  section: Partial<SectionItem>
): Promise<void> => {
  await api.put(`/sections/${id}/`, section);
};

// Excluir uma seção
export const deleteSection = async (id: number): Promise<void> => {
  await api.delete(`/sections/${id}/`);
};

// Buscar tipos de seção (SETOR, LINHA, EQUIPAMENTO)
export const getTypeSections = async (): Promise<
  { id: number; name: string }[]
> => {
  const response = await api.get("/typesection/");
  return response.data;
};
// 🔹 Buscar dados de energia por seção (mock por enquanto)
export const getSectionMeasurements = async (sectionId: number) => {
  // Endpoint real: `/api/section-measurements/?section_id=${sectionId}`
  // Mockado até a API existir
  return [
    { id: 1, energia_ativa_kWh: 10.0, interval: 0, section: sectionId },
    { id: 2, energia_ativa_kWh: 200.0, interval: 10, section: sectionId },
    { id: 3, energia_ativa_kWh: 3000.0, interval: 20, section: sectionId },
    { id: 4, energia_ativa_kWh: 300.0, interval: 30, section: sectionId },
    { id: 5, energia_ativa_kWh: 2000.12, interval: 40, section: sectionId },
  ];
};
