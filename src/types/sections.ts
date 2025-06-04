// types/sections.ts
export interface SectionItem {
  id: number;
  name: string;
  description: string | null;
  is_monitored: boolean;
  monitoring: number | null;
  device_iots_ids?: number[];

  // Associações
  setor: number | null;
  productionLine: number | null;
  equipament: number | null;
  DeviceIot?: {
    id: number;
    name: string;
    // ...outros campos
  } | null;

  // Tipo da seção ("SETOR", "LINHA", "EQUIPAMENTO")
  type_section: number | null;

  // Referência à seção pai
  secticon_parent: number | null;

  // Sub-seções aninhadas
  sections_filhas?: SectionItem[];

  // Campos adicionais
  estimated_consumption?: number;
  power?: number | null;
  tension?: number | null;
  min_consumption?: number | null;
  max_consumption?: number | null;

  // Tipo literal opcional para renderização
  type?: "sector" | "productionLine" | "equipment";
}
